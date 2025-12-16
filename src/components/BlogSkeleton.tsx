import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-text-ui animate-pulse">
      {/* Hero Section */}
      <div className="grid grid-cols-12 min-h-screen xl:h-screen">
        {/* Left Side - Article Info */}
        <div className="col-span-12 xl:col-span-5 flex flex-col">
          {/* Header */}
          <div className="p-8 lg:p-12 xl:p-12 border-b border-primary-light/30">
            {/* Back Link */}
            <div className="mb-6 h-4 w-32 bg-primary-light/20 rounded"></div>
            
            <div className="mb-4 flex justify-between items-center">
              {/* Category */}
              <div className="h-3 w-24 bg-primary-light/20 rounded"></div>
              {/* Like Button */}
              <div className="h-8 w-16 bg-primary-light/20 rounded border border-primary-light/30"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-4 mb-6">
              <div className="h-10 lg:h-14 w-full bg-primary-light/20 rounded"></div>
              <div className="h-10 lg:h-14 w-3/4 bg-primary-light/20 rounded"></div>
            </div>
            
            {/* Date */}
            <div className="h-4 w-32 bg-primary-light/20 rounded"></div>
          </div>

          {/* Article Meta */}
          <div className="flex-1 p-8 lg:p-12 xl:p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                {/* About Heading */}
                <div className="h-3 w-32 bg-primary-light/20 rounded mb-4"></div>
                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-primary-light/20 rounded"></div>
                  <div className="h-3 w-full bg-primary-light/20 rounded"></div>
                  <div className="h-3 w-2/3 bg-primary-light/20 rounded"></div>
                </div>
              </div>

              {/* Author Info */}
              <div className="border-t border-primary-light/30 pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary-light/20"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-primary-light/20 rounded"></div>
                    <div className="h-2 w-16 bg-primary-light/20 rounded"></div>
                  </div>
                </div>
                {/* Author Bio */}
                <div className="space-y-2">
                  <div className="h-2 w-full bg-primary-light/20 rounded"></div>
                  <div className="h-2 w-3/4 bg-primary-light/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Featured Image Skeleton */}
        <div className="col-span-12 xl:col-span-7 relative bg-primary-light/10">
          <div className="h-[50vh] xl:h-full w-full"></div>
        </div>
      </div>
      
      {/* Footer/Content Skeleton (Optional, just to fill space if needed) */}
       <div className="border-t border-primary-light/30 h-96"></div>
    </div>
  );
};

export default BlogSkeleton;
