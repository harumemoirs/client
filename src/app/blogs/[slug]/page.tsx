import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Newsletter from "@/ui/newsletter";
import BlogLikeButton from "@/components/BlogLikeButton";
import { getStoryBySlug } from "@/functions/services/main/story";
import { IMAGES } from "@/constants/images";
import { getShimmerDataUrl } from "@/utils/image";

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { type } = await searchParams;
  const story = await getStoryBySlug(slug, type);

  if (!story) {
    return {
      title: "Story Not Found | Haru Memoirs",
    };
  }

  const coverImage =
    story.imageUrls?.[0] || story.image || IMAGES.blogs.fallbackCover;

  return {
    title: `${story.title} | Haru Memoirs`,
    description: story.excerpt || "Sharing the quiet seasons of the heart.",
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [{ url: coverImage, alt: story.title }],
    },
  };
}

export default async function IndividualBlogPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { type } = await searchParams;

  const blog = await getStoryBySlug(slug, type);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background text-text-ui flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-garamond font-light mb-4">
            Story Not Found
          </h1>
          <p className="text-primary-dark/80 mb-8 max-w-md mx-auto">
            The story you're looking for doesn't exist or may have been moved.
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

  const initialLikes = parseInt(String(blog.likeCount || blog.likes || "0")) || 0;
  const coverImage =
    blog.imageUrls?.[0] || blog.image || IMAGES.blogs.fallbackCover;

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

              {/* Interactive Like Button Component */}
              <BlogLikeButton
                blogId={blog.id}
                blogType={blog.type || "blog"}
                initialLikes={initialLikes}
              />
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-garamond font-light tracking-wider leading-tight mb-6">
              {blog.title}
            </h1>
            <div className="flex gap-6 text-sm font-montserrat uppercase tracking-wider text-primary-dark/75">
              <span>{blog.date || "SEASONAL MEMOIR"}</span>
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
                  {blog.excerpt || "A quiet season of the heart."}
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-primary-light/30 pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={IMAGES.blogs.authorAvatar}
                    alt="Christy"
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16"
                    placeholder="blur"
                    blurDataURL={getShimmerDataUrl(128, 128)}
                    quality={85}
                  />
                  <div>
                    <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider">
                      Christy
                    </h4>
                    <p className="text-xs text-primary-dark/75">Author</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Writer of letters, poems, and reflections, sharing the quiet
                  seasons of the heart.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Featured Image with High Priority */}
        <div className="col-span-12 xl:col-span-7 relative overflow-hidden">
          <div className="relative h-[50vh] xl:h-full overflow-hidden">
            <Image
              src={coverImage}
              alt={blog.title || "Story Cover"}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 60vw"
              quality={85}
              priority
              placeholder="blur"
              blurDataURL={getShimmerDataUrl(1200, 800)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/20 to-primary-dark/60"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 xl:p-12 text-white">
              <div className="max-w-4xl">
                <p className="text-xs font-montserrat uppercase tracking-wider opacity-90 mb-2">
                  {new Date(
                    blog.createdAt || blog.date || Date.now()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
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
              <div className="space-y-6 overflow-hidden">
                <div
                  className="text-base font-montserrat leading-relaxed text-text-ui whitespace-pre-wrap break-words max-w-full"
                  style={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {blog.content || blog.synopsis || "No content available."}
                </div>
              </div>
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 xl:col-span-4 bg-primary-light/10 p-8 lg:p-12 xl:p-12">
            <h2 className="text-2xl font-garamond font-light mb-8">
              MORE STORIES
            </h2>

            <p className="text-sm text-primary-dark/80">
              No related stories found.
            </p>

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
        <div className="col-span-12 xl:col-span-6 bg-primary-dark text-white overflow-hidden relative min-h-[384px] xl:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format&q=80"
            alt="Share your story"
            fill
            className="object-cover opacity-70"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={getShimmerDataUrl(800, 600)}
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
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80"
            alt="Heritage"
            fill
            className="object-cover"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={getShimmerDataUrl(800, 600)}
          />
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
