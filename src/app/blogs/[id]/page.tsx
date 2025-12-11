"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Newsletter from "@/ui/newsletter";
import Link from "next/link";
import { getOrCreateBrowserId } from "@/lib/browserId";
import { getAllBlogs } from "@/functions/services/main/blogs";
import { getAllJournals } from "@/functions/services/main/journal";
import { getAllLetters } from "@/functions/services/main/letter";
import { getAllPoems } from "@/functions/services/main/poem";
import { toggleBlogLike, checkBlogLike } from "@/functions/services/like/blog";
import { toggleJournalLike, checkJournalLike } from "@/functions/services/like/journal";
import { toggleLetterLike, checkLetterLike } from "@/functions/services/like/letter";
import { togglePoemLike, checkPoemLike } from "@/functions/services/like/poem";

const IndividualBlogPage = () => {
  const params = useParams();
  const blogId = params?.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // API states
  const [blog, setBlog] = useState<any>(null);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Fetch blog data - fetch all blogs and filter by ID
  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      
      try {
        setBlogLoading(true);
        setBlogError(null);
        
        // Fetch all blogs from all categories and find the one matching ID
        const [blogsRes, journalsRes, lettersRes, poemsRes] = await Promise.allSettled([
          getAllBlogs(1, 100), // Fetch more to ensure we get the blog
          getAllJournals(1, 100),
          getAllLetters(1, 100),
          getAllPoems(1, 100),
        ]);

        let foundBlog = null;
        let contentType = "";

        // Search in blogs (self-reflection)
        if (blogsRes.status === "fulfilled") {
          const blogs = blogsRes.value.blogs || blogsRes.value.data || [];
          foundBlog = blogs.find((b: any) => b.id === blogId);
          if (foundBlog) {
            contentType = "SELF_REFLECTION";
          }
        }

        // Search in journals if not found
        if (!foundBlog && journalsRes.status === "fulfilled") {
          const journals = journalsRes.value.journals || journalsRes.value.data || [];
          foundBlog = journals.find((j: any) => j.id === blogId);
          if (foundBlog) {
            contentType = "JOURNALS";
          }
        }

        // Search in letters if not found
        if (!foundBlog && lettersRes.status === "fulfilled") {
          const letters = lettersRes.value.letters || lettersRes.value.data || [];
          foundBlog = letters.find((l: any) => l.id === blogId);
          if (foundBlog) {
            contentType = "LETTERS";
          }
        }

        // Search in poems if not found
        if (!foundBlog && poemsRes.status === "fulfilled") {
          const poems = poemsRes.value.poems || poemsRes.value.data || [];
          foundBlog = poems.find((p: any) => p.id === blogId);
          if (foundBlog) {
            contentType = "POETRY";
          }
        }

        if (!foundBlog) {
          throw new Error("Content not found");
        }

        // Set both category and type for proper API service selection
        let type;
        switch (contentType) {
          case "SELF_REFLECTION":
            type = "blog";
            break;
          case "JOURNALS":
            type = "journal";
            break;
          case "LETTERS":
            type = "letter";
            break;
          case "POETRY":
            type = "poem";
            break;
        }

        setBlog({
          ...foundBlog,
          category: contentType,
          type: type
        });
        
        setRelatedPosts([]);
      } catch (err: any) {
        console.error("Error fetching content:", err);
        setBlogError(err.message || "Failed to load content");
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // NOTE: Like count is now initialized from the checkLike API response, not from blog.likes
  // which may be stale/cached data from the main blog API

  // Initialize browser ID and fetch like status
  useEffect(() => {
    const fingerprint = getOrCreateBrowserId();

    // Immediately set like count from blog data if available
    if (blog?.likeCount !== undefined || blog?.likes !== undefined) {
      const initialCount = parseInt(blog.likeCount || blog.likes || "0");
      setLikeCount(initialCount);
      console.log('📊 Initial like count from blog data:', initialCount);
    }

    // Check localStorage FIRST for instant feedback
    let hasLocalLike = false;
    if (fingerprint && blogId) {
      const likedKey = `hm_liked_${fingerprint}_${blogId}`;
      hasLocalLike = localStorage.getItem(likedKey) === 'true';
      if (hasLocalLike) {
        console.log('Found in localStorage: User has liked this post');
        setIsLiked(true);
      }
    }

    // Then verify with API in background
    const fetchLikeData = async () => {
      if (!blogId || !blog || !fingerprint) return;

      try {
        let status;
        
        console.log('🔍 Checking like status with API:', { blogId, blogType: blog.type });
        
        switch (blog.type) {
          case "blog":
            status = await checkBlogLike(blogId, fingerprint);
            break;
          case "journal":
            status = await checkJournalLike(blogId, fingerprint);
            break;
          case "letter":
            status = await checkLetterLike(blogId, fingerprint);
            break;
          case "poem":
            status = await checkPoemLike(blogId, fingerprint);
            break;
          default:
            return;
        }

        console.log('API Response:', status);

        const liked = status?.liked ?? status?.isLiked ?? false;
        const count = status?.likeCount ?? status?.likes ?? status?.totalLikes ?? status?.count ?? 0;
        
        console.log('Parsed:', { liked, count, hasLocalLike });
        
        // IMPORTANT: Only update if API explicitly confirms, or if there's no localStorage value
        if (liked) {
          // API confirms liked - update state and localStorage
          setIsLiked(true);
          const likedKey = `hm_liked_${fingerprint}_${blogId}`;
          localStorage.setItem(likedKey, 'true');
        } else {
          // Re-check localStorage to see if user liked while API was in flight
          const likedKey = `hm_liked_${fingerprint}_${blogId}`;
          const currentLocalLike = localStorage.getItem(likedKey) === 'true';
          
          if (!currentLocalLike && !hasLocalLike) {
             // API says not liked AND we don't have it in localStorage (initially or currently) - set to false
             setIsLiked(false);
          }
        }
        // If API says false but localStorage says true - KEEP localStorage (API might be wrong)
        
        if (count > 0) setLikeCount(count);
      } catch (error) {
        console.error("❌ API check failed:", error);
        // Keep localStorage state on error
      }
    };

    if (blog && fingerprint) {
      fetchLikeData();
    }
  }, [blogId, blog]);

  if (blogLoading) {
    return (
      <div className="min-h-screen bg-background text-text-ui flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-garamond font-light mb-4">
            Loading Story...
          </h1>
        </div>
      </div>
    );
  }

  if (blogError || !blog) {
    return (
      <div className="min-h-screen bg-background text-text-ui flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-garamond font-light mb-4">
            Story Not Found
          </h1>
          <p className="text-primary-dark/80 mb-8">
            {blogError || "The story you're looking for doesn't exist."}
          </p>
          <Link
            href="/blogs"
            className="inline-block px-8 py-3 border border-primary-dark text-primary-dark font-montserrat text-sm uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300"
          >
            Return to Stories
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    if (isLiked || loading || !blog) return;

    const fingerprint = getOrCreateBrowserId();
    if (!fingerprint) return;

    // setLoading(true); // Don't show loading state for optimistic update
    setIsLiked(true);
    setLikeCount((prev) => prev + 1);
    
    // Save to localStorage immediately
    const likedKey = `hm_liked_${fingerprint}_${blogId}`;
    localStorage.setItem(likedKey, 'true');

    try {
      let result;
      
      switch (blog.type) {
        case "blog":
          result = await toggleBlogLike(blogId, fingerprint);
          break;
        case "journal":
          result = await toggleJournalLike(blogId, fingerprint);
          break;
        case "letter":
          result = await toggleLetterLike(blogId, fingerprint);
          break;
        case "poem":
          result = await togglePoemLike(blogId, fingerprint);
          break;
      }

      const serverCount = result?.likeCount ?? result?.likes;
      if (typeof serverCount === 'number') {
        setLikeCount(serverCount);
      }
      console.log('✅ Like successful!');
    } catch (error: any) {
      console.error("Like error:", error);
      
      // If error says "already liked", keep the liked state
      const errorMsg = error?.message?.toLowerCase() || '';
      if (errorMsg.includes('already liked')) {
        console.log('✅ Already liked - keeping liked state');
        return; // Don't revert
      }
      
      // Otherwise revert
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
      localStorage.removeItem(likedKey);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-background text-text-ui">
      {/* Hero Section */}
      <div className="grid grid-cols-12 min-h-screen xl:h-screen">
        {/* Left Side - Article Info */}
        <div className="col-span-12 xl:col-span-5 flex flex-col">
          {/* Header */}
          <div className="p-8 lg:p-12 xl:p-12 border-b border-primary-light/30">
            <div className="mb-6">
              <Link
                href="/blogs"
                className="text-sm font-montserrat uppercase tracking-wider text-primary-dark/75 hover:text-primary-dark transition-colors duration-300"
              >
                ← BACK TO STORIES
              </Link>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <span className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/75">
                {blog.category?.replace("_", " ") || "STORY"}
              </span>
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={isLiked || loading}
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
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-garamond font-light tracking-wider leading-tight mb-6">
              {blog.title}
            </h1>
            <div className="flex gap-6 text-sm font-montserrat uppercase tracking-wider text-primary-dark/75">
              <span>{blog.date}</span>
            </div>
          </div>

          {/* Article Meta */}
          <div className="flex-1 p-8 lg:p-12 xl:p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-4">
                  ABOUT THIS STORY
                </h2>
                <p className="text-sm leading-relaxed text-primary-dark/80">
                  {blog.excerpt}
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-primary-light/30 pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="https://res.cloudinary.com/dwtbvdlzg/image/upload/w_800,h_600,c_fill/v1764664442/author_chro9a.jpg"
                    alt="Christy"
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16"
                  />
                  <div>
                    <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider">
                      Christy
                    </h4>
                    <p className="text-xs text-primary-dark/75">Author</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Writer of letters, poems, and reflections, sharing the quiet seasons of the heart.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Featured Image */}
        <div className="col-span-12 xl:col-span-7 relative overflow-hidden">
          <div className="relative h-[50vh] xl:h-full overflow-hidden">
            <Image
              src={blog.imageUrls?.[0] || blog.image || "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1765380884/hero-1st-left_bc863k.jpg"}
              alt={blog.title || "Untitled"}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 60vw"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/20 to-primary-dark/60"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 xl:p-12 text-white">
              <div className="max-w-4xl">
                <p className="text-xs font-montserrat uppercase tracking-wider opacity-90 mb-2">
                  {new Date(blog.createdAt || blog.date || Date.now()).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <h1 className="text-3xl md:text-5xl xl:text-6xl font-garamond font-light leading-tight">
                  {blog.title || "Untitled"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Section */}
      <div className="border-t border-primary-light/30">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 p-8 lg:p-12 xl:p-16">
            <article className="max-w-4xl mx-auto prose prose-lg">
              {/* Article Content */}
              <div className="space-y-6">
                <p className="text-base font-montserrat leading-relaxed text-text-ui whitespace-pre-line">
                  {blog.content || blog.synopsis || "No content available."}
                </p>
              </div>
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 xl:col-span-4 bg-primary-light/10 p-8 lg:p-12 xl:p-12">
            <h2 className="text-2xl font-garamond font-light mb-8">
              MORE STORIES
            </h2>

            {relatedPosts.length > 0 ? (
              <div className="space-y-8">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.id}`}
                    className="group block"
                  >
                    <div className="border-l-2 border-primary-light/50 group-hover:border-primary-dark pl-6 transition-all duration-300">
                      <div className="mb-2">
                        <span className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/75">
                          {post.category.replace("_", " ")}
                        </span>
                      </div>
                      <h4 className="font-garamond text-lg font-light mb-2 group-hover:text-primary-dark transition-colors duration-300">
                        {post.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-primary-dark/80 mb-2">
                        {post.excerpt.slice(0, 100)}...
                      </p>
                      <div className="flex gap-4 text-xs font-montserrat uppercase tracking-wider text-primary-dark/75">
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-primary-dark/80">
                No related stories found.
              </p>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-primary-light/30">
              <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-4">
                SHARE THIS STORY
              </h4>
              <div className="space-y-3 text-xs text-primary-dark/80">
                <p>Connect with others through storytelling</p>
                <p>Preserve heritage together</p>
                <p>Build community through shared narratives</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-primary-light/30">
              <Link
                href="/blogs"
                className="inline-block w-full px-6 py-3 border border-primary-dark text-primary-dark font-montserrat text-sm uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300 text-center"
              >
                VIEW ALL STORIES
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="grid grid-cols-12 border-t gap-1 border-primary-light/30">
        <div className="col-span-12 xl:col-span-6 bg-primary-dark text-white overflow-hidden relative">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
            alt="Share your story"
            fill
            className="object-cover opacity-70"
            quality={80}
          />
          <div className="absolute inset-0 bg-primary-dark/40 flex items-center justify-center p-8 lg:p-12 xl:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-garamond font-light mb-4">
                SHARE YOUR STORY
              </h2>
              <p className="text-sm font-montserrat leading-relaxed opacity-90 max-w-md mb-6">
                Have a story, poem, or reflection you'd like to share? Join our
                community of storytellers.
              </p>
              <Link
                href="/contact-us"
                className="inline-block px-8 py-3 border border-white text-white text-sm font-montserrat uppercase tracking-wider hover:bg-white hover:text-primary-dark transition-all duration-300"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-6 overflow-hidden relative min-h-[384px] xl:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
            alt="Heritage"
            fill
            className="object-cover"
            quality={80}
          />
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default IndividualBlogPage;
