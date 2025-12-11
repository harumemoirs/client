"use client";
import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background text-text-ui">
      {/* 404 Hero Section */}
      <section className="grid grid-cols-12 min-h-screen">
        {/* Left Side - 404 Content */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
          <div className="p-6 md:p-8 lg:p-12 xl:p-16">
            <div className="max-w-2xl xl:max-w-3xl">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 md:w-16 h-px bg-accent-warm"></div>
                <span className="text-xs md:text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
                  PAGE NOT FOUND
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-garamond font-light text-text-ui leading-tight mb-6 md:mb-8">
                404
              </h1>

              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light text-heading-accent leading-tight mb-6 md:mb-8">
                LOST IN THE
                <br />
                <span className="text-text-ui">SEASONS</span>
              </h2>

              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl font-montserrat leading-relaxed text-primary-dark/80 mb-8 md:mb-12 max-w-xl">
                Like cherry blossoms carried by the wind, this page has drifted
                away. Let's guide you back to familiar shores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Link
                  href="/"
                  className="group relative px-6 md:px-8 py-3 md:py-4 bg-primary-dark text-white font-montserrat text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui text-center"
                >
                  <span className="relative z-10">RETURN HOME</span>
                  <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                <Link
                  href="/blogs"
                  className="px-6 md:px-8 py-3 md:py-4 border border-primary-dark text-primary-dark font-montserrat text-xs md:text-sm uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300 text-center"
                >
                  EXPLORE BLOGS
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 relative overflow-hidden min-h-96 lg:min-h-full">
          <div className="absolute inset-0 bg-[#5b4c3a]/10"></div>
          <img
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268054/hero-section_ynlism.jpg"
            alt="Lost in the seasons"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white">
            <p className="text-xs md:text-sm font-montserrat uppercase tracking-wider opacity-90">
              HARU MEMOIRS
            </p>
            <p className="text-xs opacity-70 mt-1 md:mt-2">
              Every ending is a new beginning
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
