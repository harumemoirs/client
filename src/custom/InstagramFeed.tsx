"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { InstagramEmbed } from "react-social-media-embed";

const InstagramFeedMinimal: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  // Fix hydration issue by only rendering Instagram embeds on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const instagramPosts = [
    {
      url: "https://www.instagram.com/harumemoirs/reel/DP_LDhGEnIR/",
      title: "Spring's Gentle Return",
      description:
        "Watching sakura bloom in quiet corners soft beginnings that remind us renewal comes in whispers.",
    },
    {
      url: "https://www.instagram.com/harumemoirs/p/DRwO1VgjYvX/",
      title: "Summer's Warm Wanderings",
      description:
        "Letters written in sunlight about fleeting joys, books, and the beauty of warm, unhurried days.",
    },
    {
      url: "https://www.instagram.com/p/DBoWZPgsDsz/",
      title: "Autumn's Fading Colors",
      description:
        "Thoughtful reflections on change and impermanence where falling leaves reveal deeper meaning.",
    },
    {
      url: "https://www.instagram.com/p/DEsG_u4MYvp/",
      title: "Winter's Quiet Solitude",
      description:
        "Words written beside the hush of snow peaceful records of stillness and contemplation.",
    },
    {
      url: "https://www.instagram.com/p/DEr_ekmMFyi/",
      title: "Between the Seasons",
      description:
        "Capturing the liminal spaces where silence turns into story and moments gently unfold.",
    },
    {
      url: "https://www.instagram.com/p/DEtxHGgzWGq/",
      title: "Tender Observations",
      description:
        "Finding beauty in impermanence small moments of tenderness that bloom and fade like time itself.",
    },
  ];

  return (
    <div className="bg-background text-text-ui border-t border-primary-light/30">
      <div className="p-6 md:p-8 lg:p-12 xl:p-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light text-text-ui mb-6 md:mb-8">
            MOMENTS
            <br />
            <span className="text-primary-dark">BETWEEN SEASONS</span>
          </h2>
          <p className="text-base md:text-lg font-montserrat text-primary-dark/80 max-w-2xl">
            Follow along as we share gentle observations, seasonal reflections,
            and the quiet beauty found in life's shifting moments.
          </p>
        </div>

        {/* Grid of Instagram Posts*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {instagramPosts.map((post, index) => (
            <article
              key={index}
              className={`group bg-white border border-primary-light/30 hover:border-primary-dark/50 transition-all duration-300 ${
                // Hide posts beyond 6 on tablet to maintain 3×2 grid
                index >= 6 ? "md:hidden lg:block" : ""
              }`}
              onMouseEnter={() => setHoveredPost(index)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Instagram Embed Container with same aspect ratio as blog categories */}
              <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden relative">
                {isClient ? (
                  <div className="w-full h-full">
                    <div className="w-full h-full [&>div]:!w-full [&>div]:!h-full [&_iframe]:!w-full [&_iframe]:!h-full [&_blockquote]:!w-full [&_blockquote]:!h-full [&_blockquote]:!m-0">
                      <InstagramEmbed url={post.url} width="100%" />
                    </div>
                  </div>
                ) : (
                  // Placeholder during SSR to prevent hydration mismatch
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-2 border-primary-dark/30 rounded-full mx-auto mb-4"></div>
                      <p className="text-sm text-primary-dark/60">
                        Loading Instagram post...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Info */}
              <div className="p-6 md:p-8">
                <div className="mb-4"></div>

                <h3 className="text-xl md:text-2xl font-garamond font-light mb-4 group-hover:text-primary-dark transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 mb-6">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Follow Link */}
        <div className="mt-16 text-center">
          <Link
            href="https://www.instagram.com/technova_club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 md:px-8 py-3 md:py-4 border border-primary-dark text-primary-dark font-montserrat text-xs md:text-sm uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300"
          >
            FOLLOW ON INSTAGRAM
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeedMinimal;
