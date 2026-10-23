import React from "react";
import Image from "next/image";
import Newsletter from "@/ui/newsletter";
import PageTransition from "@/components/PageTransition";
import NewsletterPopupWrapper from "@/components/NewsletterPopupWrapper";
import { IMAGES } from "@/constants/images";
import { getShimmerDataUrl } from "@/utils/image";

const HomePage = () => {

  const blogCategories = [
    {
      id: 2,
      title: "POETRY",
      description:
        "Moments of renewal and soft beginnings gentle verses that bloom like sakura after winter's stillness.",
      count: "Haru (Spring)",
      image: IMAGES.home.categories.poetry,
      color: "accent-cool",
    },
    {
      id: 5,
      title: "LETTERS",
      description:
        "Warm musings and wanderings letters written in sunlight, about books, travels, and fleeting joys.",
      count: "Natsu (Summer)",
      image: IMAGES.home.categories.letters,
      color: "primary-light",
    },
    {
      id: 3,
      title: "SELF REFLECTION",
      description:
        "Thoughtful writings on change and impermanence where fading colors reveal deeper meaning.",
      count: "Aki (Autumn)",
      image: IMAGES.home.categories.selfReflection,
      color: "primary-dark",
    },
    {
      id: 4,
      title: "JOURNALS",
      description:
        "Quiet records of solitude and peace words written beside the hush of falling snow.",
      count: "Fuyu (Winter)",
      image: IMAGES.home.categories.journals,
      color: "primary-light",
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-text-ui">
        {/* Newsletter Popup */}
        <NewsletterPopupWrapper />

        {/* Hero Section */}
        <section className="grid grid-cols-12 min-h-screen">
          {/* Left Side - Hero Content */}
          <div className="col-span-12 xl:col-span-8 flex flex-col">
            {/* Hero Text */}
            <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
              <div className="max-w-2xl xl:max-w-3xl">
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-12 md:w-16 h-px bg-accent-warm"></div>
                  <span className="text-xs md:text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
                    INSPIRED BY HARU
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-garamond font-light text-text-ui leading-tight mb-6 md:mb-8">
                  WRITING THROUGH
                  <br />
                  <span className="text-heading-accent">SEASONS</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-xl xl:text-2xl font-montserrat leading-relaxed text-primary-dark/80 mb-8 md:mb-12 max-w-xl">
                  Writing from the spaces between change where silence turns
                  into story, and moments unfold like sakura in spring.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <a
                    href="/blogs"
                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-primary-dark text-white font-montserrat text-xs md:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui text-center"
                  >
                    <span className="relative z-10">EXPLORE BLOGS</span>
                    <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </a>
                  <a
                    href="/about"
                    className="px-6 md:px-8 py-3 md:py-4 border border-primary-dark text-primary-dark font-montserrat text-xs md:text-sm uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300 text-center"
                  >
                    ABOUT CHRISTINA
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="col-span-12 xl:col-span-4 relative overflow-hidden min-h-[500px] xl:min-h-full">
            <div className="absolute inset-0 bg-[#5b4c3a]/10 z-10"></div>
            <Image
              src={IMAGES.home.hero}
              alt="Coastal writing inspiration"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={getShimmerDataUrl(800, 1000)}
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={85}
            />
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white z-20">
              <p className="text-xs md:text-sm font-montserrat uppercase tracking-wider opacity-90">
                HARU MEMOIR BY CHRISTINA
              </p>
              <p className="text-xs opacity-70 mt-1 md:mt-2">
                Exploring themes of impermanence, tenderness, and belonging
              </p>
            </div>
          </div>
        </section>

        {/* Blog Categories Section */}
        <section className="border-t border-primary-light/30">
          <div className="p-6 md:p-8 lg:p-12 xl:p-16">
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light text-text-ui mb-6 md:mb-8">
                WRITING THROUGH
                <br />
                <span className="text-heading-accent">SEASONS</span>
              </h2>
              <p className="text-base md:text-lg font-montserrat text-primary-dark/80 max-w-2xl">
                Stories that follow the rhythm of change — gentle reflections
                that bloom, fade, and return like time itself.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {blogCategories.map((category) => (
                <article
                  key={category.id}
                  className="group border border-primary-light/30 hover:border-primary-dark/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getShimmerDataUrl(600, 400)}
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-4">
                      <span className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                        {category.count}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-garamond font-light mb-4 group-hover:text-primary-dark transition-colors duration-300">
                      <a
                        href={`/blogs?category=${category.title.replace(
                          /\s+/g,
                          "_"
                        )}`}
                      >
                        {category.title}
                      </a>
                    </h3>

                    <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 mb-6">
                      {category.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                        <span>CATEGORY</span>
                        <span>{category.count}</span>
                      </div>
                      <a
                        href={`/blogs?category=${category.title.replace(
                          /\s+/g,
                          "_"
                        )}`}
                        className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60 group-hover:text-primary-dark transition-colors duration-300"
                      >
                        EXPLORE →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Abstract Section */}
        <section className="border-t border-primary-light/30">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-6 p-6 md:p-8 lg:p-12 xl:p-16">
              <div className="max-w-lg xl:max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light text-text-ui leading-tight mb-6 md:mb-8">
                  ABOUT
                  <br />
                  <span className="text-heading-accent">CHRISTINA</span>
                </h2>

                <p className="text-base md:text-lg font-montserrat leading-relaxed text-primary-dark/80 mb-6 md:mb-8">
                  My name is Christina Samuel, but here I write as Christy — a
                  name tied to precious 思い出 (omoide — memories). I started
                  this blog because speaking my feelings has never been easy;
                  when the 心 (kokoro — heart) feels misunderstood, writing
                  becomes gentler than words spoken aloud. My stories reflect
                  the changing 季節 (kisetsu — seasons) within me. Through Haru
                  Memoirs, I hope my writing brings comfort to those who
                  struggle to voice their emotions. This space is my 春 (haru —
                  spring), where feelings bloom softly and the 心 (kokoro —
                  heart) can rest.
                </p>

                <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                  <div className="border-l-2 border-accent-warm pl-4 md:pl-6">
                    <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                      SEASONAL STORYTELLING
                    </h4>
                    <p className="text-xs leading-relaxed text-primary-dark/80">
                      Stories shaped by the 季節 (kisetsu) of the heart — gentle
                      shifts, quiet changes, and the beauty found in things that
                      fade.
                    </p>
                  </div>

                  <div className="border-l-2 border-accent-cool pl-4 md:pl-6">
                    <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                      MEMOIR WRITING
                    </h4>
                    <p className="text-xs leading-relaxed text-primary-dark/80">
                      Personal reflections that explore belonging, loneliness,
                      understanding, and the small 思い出 (omoide) that shape
                      who we become.
                    </p>
                  </div>
                </div>

                <a
                  href="/about"
                  className="inline-flex items-center text-xs md:text-sm font-montserrat uppercase tracking-wider text-primary-dark hover:text-accent-warm transition-colors duration-300"
                >
                  LEARN MORE ABOUT THE JOURNEY →
                </a>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-6 relative overflow-hidden min-h-[480px] xl:min-h-full">
              <Image
                src={IMAGES.home.author}
                alt="Christina - Author"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                loading="lazy"
                placeholder="blur"
                blurDataURL={getShimmerDataUrl(800, 600)}
              />
              <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white z-20">
                <p className="text-xs md:text-sm font-montserrat opacity-90">
                  "Every story is a bridge between worlds"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Abstract Section */}
        <section className="border-t border-primary-light/30 bg-primary-light/10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-7 p-8 lg:p-16 flex flex-col justify-center xl:order-last">
              <h3 className="text-3xl md:text-4xl font-garamond font-light mb-6 md:mb-8 text-primary-dark">
                START A
                <br />
                <div className="flex items-center gap-4">
                  <span>CONVERSATION</span>
                </div>
              </h3>

              <p className="text-sm md:text-base font-montserrat leading-relaxed text-primary-dark/80 mb-12 max-w-xl">
                Whether you're interested in workshops, have a story to share,
                or want to collaborate on cultural preservation projects, I'd
                love to hear from you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2 text-primary-dark">
                    WRITING WORKSHOPS
                  </h4>
                  <p className="text-xs text-primary-dark/60">
                    Monthly memoir writing sessions along the coast
                  </p>
                </div>
                <div>
                  <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2 text-primary-dark">
                    COLLABORATION
                  </h4>
                  <p className="text-xs text-primary-dark/60">
                    Cultural projects and storytelling initiatives
                  </p>
                </div>
                <div>
                  <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2 text-primary-dark">
                    SPEAKING EVENTS
                  </h4>
                  <p className="text-xs text-primary-dark/60">
                    Literary festivals and heritage celebrations
                  </p>
                </div>
                <div>
                  <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2 text-primary-dark">
                    MEDIA INQUIRIES
                  </h4>
                  <p className="text-xs text-primary-dark/60">
                    Interviews and podcast appearances
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-5 bg-primary-dark text-white overflow-hidden relative min-h-[320px] xl:min-h-full xl:order-first">
              <Image
                src={IMAGES.home.contactPreview}
                alt="Get in touch"
                fill
                className="object-cover opacity-70"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={80}
                loading="lazy"
                placeholder="blur"
                blurDataURL={getShimmerDataUrl(600, 400)}
              />
              <div className="absolute inset-0 bg-[#5b4c3a]/50 flex items-center justify-center p-6 md:p-8 lg:p-16 z-10">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-garamond font-light mb-4 md:mb-6">
                    LET'S CONNECT
                  </h3>
                  <p className="text-xs md:text-sm font-montserrat opacity-90 mb-8 max-w-xs mx-auto">
                    Share your stories, discuss collaborations, or join our
                    community of coastal storytellers.
                  </p>
                  <a
                    href="/contact-us"
                    className="inline-block px-6 md:px-8 py-3 border border-white text-white text-xs md:text-sm font-montserrat uppercase tracking-wider hover:bg-white hover:text-primary-dark transition-all duration-300"
                  >
                    GET IN TOUCH
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Newsletter />
        {/* <InstagramFeedMinimal /> */}
      </div>
    </PageTransition>
  );
};

export default HomePage;
