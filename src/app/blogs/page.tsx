"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Newsletter from "@/ui/newsletter";
import Link from "next/link";
import { getOrCreateBrowserId } from "@/lib/browserId";
import { getAllBlogs } from "@/functions/services/main/blogs";
import { getAllJournals } from "@/functions/services/main/journal";
import { getAllLetters } from "@/functions/services/main/letter";
import { getAllPoems } from "@/functions/services/main/poem";
// Imports removed as toggle functionality is no longer needed on this page

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [likedBlogs, setLikedBlogs] = useState<Set<number>>(new Set());
  
  // API states
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Category counts from API
  const [categoryCounts, setCategoryCounts] = useState({
    ALL: 0,
    LETTERS: 0,
    POETRY: 0,
    SELF_REFLECTION: 0,
    JOURNALS: 0,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const pageParam = urlParams.get("page");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }

    // Initialize browser ID on mount
    getOrCreateBrowserId();
  }, []);

  // Fetch blogs when component mounts or category/page changes
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [selectedCategory, currentPage]);

  // Buffer for "ALL" category to handle mixed pagination
  const [allStoriesBuffer, setAllStoriesBuffer] = useState<any[]>([]);
  const maxBackendPageFetched = React.useRef(0);
  const [hasMoreBackendData, setHasMoreBackendData] = useState(true);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      // Reset buffer if pulling page 1 and we don't have it (or simple reset logic could be applied on cat change)
      // Actually, category change is cleaned up in effect dependency
      
      let allResults: any[] = [];
      let totalCount = 0;
      let maxCategoryTotal = 0;

      if (selectedCategory === "ALL") {
        setIsTransitioning(true);

        // Calculate if we need more data in the buffer
        const requiredItemCount = page * 9;
        
        // Correct Loop Logic:
        // We use a local variable for the buffer to handle synchronous updates during the fetch loop
        let localBuffer = [...allStoriesBuffer];
        let localBackendPage = maxBackendPageFetched.current;
        let localHasMore = hasMoreBackendData;

        // Reset tracking if page 1 and strictly reloading (optional safety, but buffer check handles most)
        if (page === 1 && localBuffer.length === 0) {
            localBackendPage = 0;
            localHasMore = true;
        }

        while (localBuffer.length < requiredItemCount && localHasMore) {
             const nextBackendPage = localBackendPage + 1;
            
            // Fetch from all endpoints in parallel
            const [blogsRes, journalsRes, lettersRes, poemsRes] = await Promise.allSettled([
                getAllBlogs(nextBackendPage, 9),
                getAllJournals(nextBackendPage, 9),
                getAllLetters(nextBackendPage, 9),
                getAllPoems(nextBackendPage, 9),
            ]);

            let newBatch: any[] = [];
            let batchHasData = false;

            const processRes = (res: any, category: string, type: string) => {
                if (res.status === "fulfilled") {
                    const items = (res.value[type === 'blog' ? 'blogs' : type + 's'] || res.value.data || []).map((item: any) => ({
                        ...item,
                        category: category,
                        type: type,
                        sortDate: new Date(item.createdAt || item.date || Date.now()).getTime()
                    }));
                    if (items.length > 0) batchHasData = true;
                    return items;
                }
                return [];
            };

            newBatch.push(...processRes(blogsRes, "SELF_REFLECTION", "blog"));
            newBatch.push(...processRes(journalsRes, "JOURNALS", "journal"));
            newBatch.push(...processRes(lettersRes, "LETTERS", "letter"));
            newBatch.push(...processRes(poemsRes, "POETRY", "poem"));

            if (!batchHasData) {
                localHasMore = false;
                break; 
            }

            localBuffer = [...localBuffer, ...newBatch].sort((a, b) => b.sortDate - a.sortDate);
            localBackendPage = nextBackendPage;
        }

        // Commit updates
        setAllStoriesBuffer(localBuffer);
        maxBackendPageFetched.current = localBackendPage;
        setHasMoreBackendData(localHasMore);

        // Slice for display
        const startIndex = (page - 1) * 9;
        const endIndex = startIndex + 9;
        const displayItems = localBuffer.slice(startIndex, endIndex);

        setBlogs(displayItems);
        
        // Update URL and HasMore
        // Total count logic is approximate for "ALL" because we are buffering. 
        // We can use the counts fetched separately to determine total.
        const totalEstimated = categoryCounts.ALL || 999; 
        setHasMore(localBuffer.length > endIndex || localHasMore);

        // Wait for fade out animation if not initial
        if (page > 1) {
             await new Promise(resolve => setTimeout(resolve, 300));
        }

      } else {
        // Specific Category Logic (Unchanged but wrapped)
        setIsTransitioning(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        let response;
        switch (selectedCategory) {
          case "SELF_REFLECTION":
            response = await getAllBlogs(page, 9);
            allResults = (response.blogs || response.data || []).map((item: any) => ({ ...item, category: "SELF_REFLECTION", type: "blog" }));
            break;
          case "JOURNALS":
            response = await getAllJournals(page, 9);
            allResults = (response.journals || response.data || []).map((item: any) => ({ ...item, category: "JOURNALS", type: "journal" }));
            break;
          case "LETTERS":
            response = await getAllLetters(page, 9);
            allResults = (response.letters || response.data || []).map((item: any) => ({ ...item, category: "LETTERS", type: "letter" }));
            break;
          case "POETRY":
            response = await getAllPoems(page, 9);
            allResults = (response.poems || response.data || []).map((item: any) => ({ ...item, category: "POETRY", type: "poem" }));
            break;
        }
        totalCount = parseInt(response?.pagination?.total || response?.total || response?.totalCount || "0");
        setBlogs(allResults);
        setHasMore((page * 9) < totalCount);
      }
      
      // Common URL updates
      const params = new URLSearchParams(window.location.search);
      if (page > 1) params.set('page', page.toString());
      else params.delete('page');
      
      if (selectedCategory !== 'ALL') params.set('category', selectedCategory);
      else params.delete('category');
      
      const newUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
      window.history.pushState({}, '', newUrl);

    } catch (err: any) {
      console.error("Error fetching content:", err);
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
      setTimeout(() => setIsTransitioning(false), 50);
    }
  };

  // Fetch category counts from all endpoints
  const fetchCategoryCounts = async () => {
    try {
      const [blogsRes, journalsRes, lettersRes, poemsRes] = await Promise.allSettled([
        getAllBlogs(1, 1), // Fetch 1 item just to get total count
        getAllJournals(1, 1),
        getAllLetters(1, 1),
        getAllPoems(1, 1),
      ]);

      // Extract counts from pagination.total (which is a string)
      const counts = {
        SELF_REFLECTION: blogsRes.status === "fulfilled" ? parseInt(blogsRes.value?.pagination?.total || "0") : 0,
        JOURNALS: journalsRes.status === "fulfilled" ? parseInt(journalsRes.value?.pagination?.total || "0") : 0,
        LETTERS: lettersRes.status === "fulfilled" ? parseInt(lettersRes.value?.pagination?.total || "0") : 0,
        POETRY: poemsRes.status === "fulfilled" ? parseInt(poemsRes.value?.pagination?.total || "0") : 0,
        ALL: 0, // Will calculate below
      };
      
      // ALL is sum of all categories
      counts.ALL = counts.SELF_REFLECTION + counts.JOURNALS + counts.LETTERS + counts.POETRY;

      setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  // Fetch counts on mount
  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  // categories with dynamic counts
  const categories = [
    { id: "ALL", name: "ALL STORIES", count: categoryCounts.ALL },
    { id: "LETTERS", name: "LETTERS", count: categoryCounts.LETTERS },
    { id: "POETRY", name: "POETRY", count: categoryCounts.POETRY },
    { id: "SELF_REFLECTION", name: "SELF REFLECTION", count: categoryCounts.SELF_REFLECTION },
    { id: "JOURNALS", name: "JOURNALS", count: categoryCounts.JOURNALS },
  ];

  // Hero images for each category
  const heroImages: Record<string, string> = {
    ALL: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380884/hero-1st-left_bc863k.jpg",
    LETTERS: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380879/get-in-touch-1stoption_ttgjis.jpg",
    POETRY: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380902/3rd-rainy-musing-2ndoption_mzuksx.jpg",
    SELF_REFLECTION: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380939/2nd-reflection-of-soltitude_vckwuw.jpg",
    JOURNALS: "https://res.cloudinary.com/dwtbvdlzg/image/upload/w_1200,h_800,c_fill/v1765380915/3rd-between-two-worlds_dlpa9n.jpg",
  };

  const filteredBlogs =
    selectedCategory === "ALL"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchBlogs(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchBlogs(prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);

    const newUrl =
      categoryId === "ALL"
        ? window.location.pathname
        : `${window.location.pathname}?category=${categoryId}`;
    window.history.pushState({}, "", newUrl);
  };

  // Check for liked blogs in localStorage on mount and when blogs change
  useEffect(() => {
    const fingerprint = getOrCreateBrowserId();
    if (!fingerprint) return;

    const newLikedBlogs = new Set<number>();
    
    // Check all currently loaded blogs
    blogs.forEach(blog => {
      const likedKey = `hm_liked_${fingerprint}_${blog.id}`;
      if (localStorage.getItem(likedKey) === 'true') {
        newLikedBlogs.add(blog.id);
      }
    });

    setLikedBlogs(newLikedBlogs);
  }, [blogs]);


  return (
    <div className="min-h-screen bg-background text-text-ui">
      {/* Hero Section */}
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12 xl:col-span-5 flex flex-col">
          <div className="p-8 lg:p-12 border-b border-primary-light/30">
            <h1 className="text-6xl lg:text-8xl font-garamond font-light tracking-wider leading-tight">
              HARU
              <br />
              <span className="text-heading-accent">STORIES</span>
            </h1>
            <div className="mt-8 text-sm font-montserrat uppercase tracking-widest text-primary-dark">
              EXPLORE • DISCOVER • CONNECT
            </div>
          </div>

          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="text-sm font-montserrat">
                <h3 className="font-medium mb-6 uppercase tracking-wider">
                  BROWSE BY CATEGORY
                </h3>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left py-2 px-4 border-l-2 transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "border-primary-dark bg-primary-light/10 text-primary-dark"
                          : "border-primary-light/30 hover:border-accent-warm hover:pl-6"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm uppercase tracking-wider">
                          {category.name}
                        </span>
                        <span className="text-xs text-primary-dark/60">
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-primary-light/30">
                <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-4">
                  RECENT STORIES
                </h4>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  {filteredBlogs.length} stories capturing personal reflections,
                  poetry, and daily observations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:col-span-12 xl:col-span-7 relative overflow-hidden min-h-[40vh] xl:min-h-full">
          <div className="absolute inset-0 bg-[#5b4c3a]/20 z-10"></div>
          <Image
            src={heroImages[selectedCategory] || heroImages.ALL}
            alt={`${selectedCategory === "ALL" ? "All Stories" : categories.find((c) => c.id === selectedCategory)?.name} - Haru Memoirs`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </div>
      </div>

      {/* Stories Grid Section */}
      <div className="border-t border-primary-light/30">
        <div className="p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="mb-12 md:mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light text-text-ui mb-6 md:mb-8">
                {selectedCategory === "ALL"
                  ? "ALL"
                  : categories.find((c) => c.id === selectedCategory)?.name}
                <br />
                <span className="text-heading-accent">STORIES</span>
              </h2>
              <div className="text-right">
                <p className="text-sm font-montserrat text-primary-dark/60">
                  {loading ? "Loading..." : `Showing ${filteredBlogs.length} Stories`}
                </p>
              </div>
            </div>
          </div>

          {loading && currentPage === 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {/* Loading Skeleton */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-primary-light/30 animate-pulse">
                  <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] bg-primary-light/10"></div>
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="h-3 bg-primary-light/20 rounded w-1/3"></div>
                    <div className="h-6 bg-primary-light/20 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-primary-light/10 rounded"></div>
                      <div className="h-3 bg-primary-light/10 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              <div className="col-span-full text-center py-20">
                <p className="text-lg font-montserrat text-red-600">Error: {error}</p>
              </div>
            </div>
          ) : (
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {filteredBlogs.map((blog: any) => (
              <article
                key={blog.id}
                className="group border border-primary-light/30 hover:border-primary-dark/50 transition-all duration-300"
              >
                <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={blog.imageUrls?.[0] || blog.image || "https://res.cloudinary.com/dwtbvdlzg/image/upload/v1765380884/hero-1st-left_bc863k.jpg"}
                    alt={blog.title || "Untitled"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                      {blog.category?.replace("_", " ") || "STORY"}
                    </span>
                    {/* Like Count Display */}
                    <div
                      className={`flex items-center gap-2 text-sm font-montserrat transition-all duration-300 ${
                        likedBlogs.has(blog.id) 
                          ? "text-[#6AADBD] font-medium" 
                          : "text-primary-dark/60"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${likedBlogs.has(blog.id) ? "fill-[#6AADBD]" : "fill-primary-dark/60"}`}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <span>
                        {parseInt(blog.likeCount || blog.likes || "0")}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-garamond font-light mb-4 group-hover:text-primary-dark transition-colors duration-300">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title || "Untitled"}</Link>
                  </h3>

                  <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 mb-6">
                    {blog.synopsis || blog.excerpt || blog.content?.substring(0, 150) || ""}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                      <span>{new Date(blog.createdAt || blog.date || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60 group-hover:text-primary-dark transition-colors duration-300"
                    >
                      READ MORE →
                    </Link>
                  </div>
                </div>
              </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && blogs.length > 0 && (
            <div className="mt-20 mb-8 border-t border-primary-light/30 pt-12">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-primary-dark/60 hover:text-primary-dark transition-colors duration-300 disabled:opacity-0 disabled:invisible"
                >
                  <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <span>Previous</span>
                </button>
                
                {/* Page Indicator */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-px bg-primary-light/30"></div>
                    <span className="text-sm font-montserrat tracking-wider text-primary-dark/80">
                      Page {currentPage}
                    </span>
                    <div className="w-8 h-px bg-primary-light/30"></div>
                  </div>
                  <p className="text-xs font-montserrat text-primary-dark/50 tracking-wider">
                    {filteredBlogs.length} stories
                  </p>
                </div>
                
                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className="group flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-primary-dark/60 hover:text-primary-dark transition-colors duration-300 disabled:opacity-0 disabled:invisible"
                >
                  <span>Next</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Image Section */}
      <div className="grid grid-cols-12 border-t border-primary-light/30 gap-1">
        <div className="col-span-12 xl:col-span-6 bg-primary-dark text-white overflow-hidden relative min-h-[384px] xl:min-h-full">
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268082/contact-us-left-one_i9tatw.jpg"
            alt="Writing inspiration"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#5b4c3a]/40 flex items-center justify-center p-8 lg:p-12">
            <div className="text-center">
              <h3 className="text-3xl font-garamond font-light mb-4">
                SHARE YOUR STORY
              </h3>
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
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268082/contact-us-right-one_vnmcpw.jpg"
            alt="Coastal heritage"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default BlogsPage;
