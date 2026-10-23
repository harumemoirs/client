"use client";

import React, { useState, useEffect } from "react";
import { getOrCreateBrowserId } from "@/lib/browserId";
import { toggleBlogLike, checkBlogLike } from "@/functions/services/like/blog";
import {
  toggleJournalLike,
  checkJournalLike,
} from "@/functions/services/like/journal";
import {
  toggleLetterLike,
  checkLetterLike,
} from "@/functions/services/like/letter";
import { togglePoemLike, checkPoemLike } from "@/functions/services/like/poem";

interface BlogLikeButtonProps {
  blogId: string | number;
  blogType: string;
  initialLikes?: number;
}

export default function BlogLikeButton({
  blogId,
  blogType,
  initialLikes = 0,
}: BlogLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fingerprint = getOrCreateBrowserId();
    if (!fingerprint || !blogId) return;

    // 1. Check localStorage first for instant feedback (0ms)
    const likedKey = `hm_liked_${fingerprint}_${blogId}`;
    const hasLocalLike = localStorage.getItem(likedKey) === "true";
    if (hasLocalLike) {
      setIsLiked(true);
    }

    // 2. Verify with API in background
    const verifyLikeStatus = async () => {
      try {
        let status;
        const idStr = String(blogId);

        switch (blogType) {
          case "blog":
            status = await checkBlogLike(idStr, fingerprint);
            break;
          case "journal":
            status = await checkJournalLike(idStr, fingerprint);
            break;
          case "letter":
            status = await checkLetterLike(idStr, fingerprint);
            break;
          case "poem":
            status = await checkPoemLike(idStr, fingerprint);
            break;
          default:
            return;
        }

        const liked = status?.liked ?? status?.isLiked ?? false;
        const count =
          status?.likeCount ??
          status?.likes ??
          status?.totalLikes ??
          status?.count ??
          0;

        if (liked) {
          setIsLiked(true);
          localStorage.setItem(likedKey, "true");
        } else if (!hasLocalLike) {
          setIsLiked(false);
        }

        if (typeof count === "number" && count > 0) {
          setLikeCount(count);
        }
      } catch (err) {
        // Fall back to localStorage state
      }
    };

    verifyLikeStatus();
  }, [blogId, blogType]);

  const handleLike = async () => {
    if (isLiked || loading || !blogId) return;

    const fingerprint = getOrCreateBrowserId();
    if (!fingerprint) return;

    // Optimistic UI update
    setIsLiked(true);
    setLikeCount((prev) => prev + 1);

    const likedKey = `hm_liked_${fingerprint}_${blogId}`;
    localStorage.setItem(likedKey, "true");

    try {
      let result;
      const idStr = String(blogId);

      switch (blogType) {
        case "blog":
          result = await toggleBlogLike(idStr, fingerprint);
          break;
        case "journal":
          result = await toggleJournalLike(idStr, fingerprint);
          break;
        case "letter":
          result = await toggleLetterLike(idStr, fingerprint);
          break;
        case "poem":
          result = await togglePoemLike(idStr, fingerprint);
          break;
      }

      const serverCount = result?.likeCount ?? result?.likes;
      if (typeof serverCount === "number") {
        setLikeCount(serverCount);
      }
    } catch (error: any) {
      const errorMsg = error?.message?.toLowerCase() || "";
      if (errorMsg.includes("already liked")) {
        return; // Keep liked state
      }

      // Revert if true error
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
      localStorage.removeItem(likedKey);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLiked || loading}
      aria-label={isLiked ? "Liked this story" : "Like this story"}
      className={`flex items-center gap-2 px-4 py-2 border text-sm font-montserrat uppercase tracking-wider transition-all duration-300 ${
        isLiked
          ? "border-primary-dark bg-primary-dark text-white cursor-not-allowed"
          : loading
          ? "border-primary-light/60 text-primary-dark/75 cursor-wait opacity-50"
          : "border-primary-light/60 text-primary-dark/75 hover:border-primary-dark hover:text-primary-dark hover:bg-primary-light/10"
      }`}
    >
      <svg
        className={`w-4 h-4 ${
          isLiked ? "fill-white" : "fill-none stroke-current"
        } ${loading ? "animate-pulse" : ""}`}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}
