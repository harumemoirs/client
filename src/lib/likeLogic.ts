/**
 * Like System Logic Layer
 * 
 * Provides all logic functions for the anonymous like system.
 * Works with any blog category: letters, poetry, self-reflection, journals.
 */

import { getOrCreateBrowserId } from "./browserId";

export interface LikeStatusResponse {
  liked: boolean;
  likeCount: number;
}

export interface ToggleLikeResult {
  liked: boolean;
  change: 0 | 1;
  likeCount: number;
}

/**
 * Checks if the current browser has already liked a specific post
 * 
 * @param postId - The unique identifier for the post
 * @returns Promise<boolean> - true if liked, false otherwise
 */
export const hasLiked = async (postId: string): Promise<boolean> => {
  const browserId = getOrCreateBrowserId();
  
  if (!browserId) {
    console.warn("Browser ID not available (SSR context)");
    return false;
  }

  try {
    const params = new URLSearchParams({
      postId,
      browserId,
    });

    const response = await fetch(`/api/likes/status?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch like status: ${response.statusText}`);
    }

    const data: LikeStatusResponse = await response.json();
    return data.liked;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
};

/**
 * Likes a post for the current browser
 * 
 * @param postId - The unique identifier for the post
 * @param title - The title of the post
 * @returns Promise<LikeStatusResponse> - Updated like status and count
 */
export const likePost = async (
  postId: string,
  title: string
): Promise<LikeStatusResponse> => {
  const browserId = getOrCreateBrowserId();

  if (!browserId) {
    throw new Error("Browser ID not available");
  }

  try {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        browserId,
        title,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to like post: ${response.statusText}`);
    }

    const data: LikeStatusResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

/**
 * Unlikes a post for the current browser
 * 
 * @deprecated This function is disabled. Likes are permanent and cannot be undone.
 * @param postId - The unique identifier for the post
 * @returns Promise<LikeStatusResponse> - Throws error as unliking is not allowed
 */
export const unlikePost = async (postId: string): Promise<LikeStatusResponse> => {
  throw new Error("Unliking is not allowed. Likes are permanent.");
};

/**
 * Toggles the like status for a post (like if not already liked)
 * Once a post is liked, it cannot be unliked (likes are permanent)
 * This is the primary function for implementing optimistic UI updates
 * 
 * @param params - Object containing postId, title, and currentLiked status
 * @returns Promise<ToggleLikeResult> - New like state, change delta (0 or 1), and count
 */
export const toggleLike = async ({
  postId,
  title,
  currentLiked,
}: {
  postId: string;
  title: string;
  currentLiked: boolean;
}): Promise<ToggleLikeResult> => {
  try {
    // If already liked, do nothing (likes are permanent)
    if (currentLiked) {
      const status = await getLikeStatus(postId);
      return {
        liked: true,
        change: 0,
        likeCount: status.likeCount,
      };
    }

    // Not liked yet, so like it
    const result = await likePost(postId, title);

    return {
      liked: result.liked,
      change: result.liked ? 1 : 0,
      likeCount: result.likeCount,
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

/**
 * Fetches the complete like status for a post
 * Useful for initial page load or refreshing state
 * 
 * @param postId - The unique identifier for the post
 * @returns Promise<LikeStatusResponse> - Like status and count
 */
export const getLikeStatus = async (postId: string): Promise<LikeStatusResponse> => {
  const browserId = getOrCreateBrowserId();

  if (!browserId) {
    return { liked: false, likeCount: 0 };
  }

  try {
    const params = new URLSearchParams({
      postId,
      browserId,
    });

    const response = await fetch(`/api/likes/status?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch like status: ${response.statusText}`);
    }

    const data: LikeStatusResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching like status:", error);
    return { liked: false, likeCount: 0 };
  }
};
