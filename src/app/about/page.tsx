"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Newsletter from "@/ui/newsletter";
import PageTransition from "@/components/PageTransition";
// import InstagramFeedMinimal from "@/custom/InstagramFeed";
interface FAQ {
  question: string;
  answer: string;
}

// Move faqs array outside component to prevent recreation on each render
const faqs: FAQ[] = [
  {
    question: "WHAT INSPIRES YOUR COASTAL WRITING?",
    answer:
      "The Malabar Coast has been my home and muse for decades. Growing up surrounded by ancient spice routes, monsoon rhythms, and multi-generational stories has deeply influenced my perspective. I draw inspiration from the intersection of tradition and modernity, the way old stories echo in contemporary experiences.",
  },
  {
    question: "HOW DO YOU APPROACH MEMOIR WRITING?",
    answer:
      "I believe memoir is not just personal history, but cultural archaeology. My approach involves layering family narratives with historical context, exploring how individual stories reflect broader social and cultural shifts. Each memoir becomes a bridge between the intimate and the universal.",
  },
  {
    question: "WHAT CAN I EXPECT FROM YOUR WORKSHOPS?",
    answer:
      "My workshops focus on uncovering your unique voice and perspective. We explore techniques for capturing sensory memories, structuring personal narratives, and weaving cultural context into individual stories. Sessions are intimate, collaborative, and designed to help you discover the stories only you can tell.",
  },
  {
    question: "DO YOU WORK WITH INTERNATIONAL WRITERS?",
    answer:
      "Absolutely. While my work is rooted in coastal Indian traditions, the themes of heritage, displacement, and cultural identity resonate globally. I offer virtual consultations and workshops for writers worldwide who are exploring their own cultural narratives and family stories.",
  },
  {
    question: "WHAT'S YOUR CURRENT WRITING PROJECT?",
    answer:
      "I'm completing a memoir collection titled 'Salt & Stories' that explores three generations of women in my family against the backdrop of changing coastal Kerala. The book examines how place shapes identity and how stories travel through time and migration.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openItem, setOpenItem] = useState<number>(0);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const newHeights: Record<number, number> = {};
    faqs.forEach((_, index) => {
      if (contentRefs.current[index]) {
        newHeights[index] = contentRefs.current[index]!.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const toggleItem = (index: number): void => {
    if (openItem !== index) {
      setOpenItem(index);
    }
  };

  return (
    <div className="grid grid-cols-12 border-t border-primary-light/30">
      <div className="col-span-12 xl:col-span-8 p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 lg:mb-12 max-w-2xl sm:max-w-none lg:max-w-none">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light">
            FREQUENTLY
            <br />
            <span className="text-heading-accent">ASKED</span>
          </h2>
          <p className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60 mt-2 lg:mt-4">
            QUESTIONS
          </p>
        </div>

        <div className="space-y-1 max-w-2xl sm:max-w-none lg:max-w-none">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-primary-light/30">
              <button
                onClick={() => toggleItem(index)}
                className="w-full py-4 md:py-6 flex justify-between items-center transition-colors duration-300"
              >
                <span className="text-xs md:text-sm font-montserrat uppercase tracking-wider text-left transition-colors duration-300 pr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-xl md:text-2xl font-garamond font-light transition-all duration-300 ease-in-out flex-shrink-0 ${
                    openItem === index ? "transform rotate-180" : ""
                  }`}
                >
                  {openItem === index ? "−" : "+"}
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  height:
                    openItem === index ? `${heights[index] + 24}px` : "0px",
                }}
              >
                <div
                  ref={(el: HTMLDivElement | null) => {
                    contentRefs.current[index] = el;
                  }}
                  className="pb-4 md:pb-6"
                >
                  <p className="text-xs md:text-sm font-montserrat leading-relaxed text-primary-dark/80 pr-4 md:pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 xl:col-span-4 bg-primary-light/10 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-start lg:justify-center">
        <div className="mb-8 max-w-2xl sm:max-w-none lg:max-w-none">
          <h3 className="text-xl md:text-2xl font-garamond font-light mb-6">
            STILL CURIOUS?
          </h3>
          <p className="text-xs font-montserrat leading-relaxed text-primary-dark/80 mb-6">
            Have a question that's not covered here? I'd love to hear from you
            and discuss your writing journey, cultural storytelling, or memoir
            projects.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-l-2 border-primary-dark pl-4 md:pl-6">
            <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2">
              PERSONAL CONSULTATIONS
            </h4>
            <p className="text-xs leading-relaxed text-primary-dark/80">
              One-on-one sessions to discuss your specific writing goals and
              challenges.
            </p>
          </div>

          <div className="border-l-2 border-accent-warm pl-4 md:pl-6">
            <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-2">
              CUSTOM WORKSHOPS
            </h4>
            <p className="text-xs leading-relaxed text-primary-dark/80">
              Tailored writing workshops for groups, organizations, or
              institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-text-ui overflow-x-hidden">
      {/* Hero Section */}
      <div className="grid grid-cols-12 min-h-screen">
        {/* Left Side - Title and Navigation */}
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          {/* Header */}
          <div className="p-6 md:p-8 lg:p-12 xl:p-16 border-b border-primary-light/30">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-garamond font-light tracking-wider break-words max-w-xs sm:max-w-none">
              MALABAR MEMOIRS BY CHRISTINA
            </h1>
            <div className="mt-4 md:mt-6">
              <span className="text-xs md:text-sm font-montserrat uppercase tracking-widest text-primary-dark">
                From the coast, writing my way home
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
            <nav className="space-y-6 text-right max-w-sm sm:max-w-none ml-auto">
              <div className="text-sm font-montserrat uppercase tracking-wider">
                <h3 className="font-medium mb-4">ABOUT</h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Welcome to
                  <br />
                  Malabar Memoirs
                  <br />
                  Stories & Essays
                </p>
              </div>

              <div className="mt-8 md:mt-12 text-sm font-montserrat uppercase tracking-wider">
                <h3 className="font-medium mb-2">AUTHOR'S JOURNEY</h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  From coastal tales to
                  <br />
                  literary expressions
                </p>
              </div>
            </nav>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="col-span-12 lg:col-span-6 grid grid-rows-2 gap-1 min-h-[50vh] lg:min-h-full">
          <div className="grid grid-cols-2 gap-1">
            <div className="bg-[#5b4c3a]/90 overflow-hidden relative">
              <Image
                src="https://res.cloudinary.com/dwtbvdlzg/image/upload/w_500,h_400,c_fill/v1764270160/hero-1st-left-2ndoption_vwkkk2.jpg"
                alt="Coastal landscape"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 25vw"
                priority
              />
            </div>
            <div className="bg-[#5b4c3a] overflow-hidden relative">
              <Image
                src="https://res.cloudinary.com/dwtbvdlzg/image/upload/w_500,h_400,c_fill/v1764270229/hero-2nd-right-2ndoption_e5qrrp.jpg"
                alt="Writing desk"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 25vw"
                priority
              />
            </div>
          </div>
          <div className="bg-[#5b4c3a]/95 overflow-hidden relative">
            <Image
              src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764270282/hero-3rd-bottom-1stoption_skluef.jpg"
              alt="Ocean horizon"
              fill
              className="object-cover opacity-85"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-12 border-t border-primary-light/30">
        <div className="col-span-12 xl:col-span-8 p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-2xl sm:max-w-none lg:max-w-none">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light mb-6 md:mb-8 tracking-wide">
                ABOUT
                <br />
                <span className="text-heading-accent">CHRISTY</span>
              </h2>
              <p className="text-sm font-montserrat leading-relaxed mb-6 md:mb-8">
                My name is Christina Samuel, but here I write as Christy — a name given by the people I love, a small 思い出 (omoide) I carry close to my heart. I started this blog because I've never been good at speaking my feelings; in a world where the 心 (kokoro) — the true heart — is so often misunderstood, expressing yourself can feel almost impossible, so I began writing, turning quiet emotions into letters, poems, journals, and reflections, hoping my words might help someone else feel seen.
              </p>
              <p className="text-sm font-montserrat leading-relaxed mb-6 md:mb-8">
                Most of what I write comes from the shifting 季節 (kisetsu) of my inner world — moments of loneliness and sudden warmth, misunderstandings and the longing to be understood, forgotten love, soft ache, and the gentle search for meaning — sometimes about a person, sometimes about life, and sometimes simply about myself.
              </p>
              <p className="text-sm font-montserrat leading-relaxed mb-6 md:mb-8">
                Through Haru Memoirs, I want readers to feel comfort, especially those who cannot voice their feelings; if they cannot speak their heart aloud, I hope they can borrow mine and share them with someone they trust, growing slowly like spring returning after a long winter. To me, writing is the voice of feelings that cannot be spoken aloud. This space is my 春 (haru) — a quiet spring where emotions bloom softly, where every word becomes a small step toward healing, and where the 心 (kokoro) can finally rest, even for a moment.
              </p>
            </div>

            <div className="relative min-h-[300px] xl:min-h-full">
              <Image
                src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764664442/author_chro9a.jpg"
                alt="Author portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 bg-primary-light/10 p-6 md:p-8 lg:p-12 xl:p-16">
          <h3 className="text-xl md:text-2xl font-garamond font-light mb-6 md:mb-8">
            BIO
          </h3>
          <div className="space-y-6 md:space-y-8 max-w-sm sm:max-w-none">
            <div className="border-l-2 border-primary-dark pl-4 md:pl-6">
              <p className="text-xs leading-relaxed text-primary-dark/80">
                A writer of letters, poems, and reflections, sharing the quiet seasons (季節 — kisetsu) of the heart (心 — kokoro). Here, words become gentle steps toward understanding, comfort, and growth — a space where emotions bloom softly like 春 (haru).
              </p>
            </div>

            <div className="border-l-2 border-accent-warm pl-4 md:pl-6">
              <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                EARLY SEASONS
              </h4>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                I don't have many warm childhood memories; I grew up mostly in loneliness, learning early how a quiet 心 (kokoro) can be misunderstood. Yet even in that stillness, there was a soft 幽玄 (yūgen) — a hidden beauty — in the small things I held close. I found comfort in Japanese culture, in distant 季節 (kisetsu) that felt more like home than the world around me, and in the gentle presence of my cat Haru, who brought me the only warmth I understood.
              </p>
            </div>

            <div className="border-l-2 border-accent-cool pl-4 md:pl-6">
              <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                物の哀れ (MONO NO AWARE)
              </h4>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                The ache that stayed with me is the tender 物の哀れ (mono no aware) of growing up unseen — the bittersweet truth that everything fades, yet leaves a trace. Those early seasons shaped me, and now I write to give voice to the feelings my younger self never knew how to speak.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-12 border-t border-primary-light/30">
        <div className="col-span-12 xl:col-span-4 overflow-hidden relative min-h-[300px] xl:min-h-full">
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764270461/portfolio-3rdoption_p6yoyt.jpg"
            alt="Sunset over water"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 33vw"
          />
        </div>

        <div className="col-span-12 xl:col-span-8 p-6 md:p-8 lg:p-12 xl:p-16">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light">
              PORTFOLIO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl sm:max-w-none lg:max-w-none">
            <div>
              <h3 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-4">
                MEMOIR WRITINGS
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary-light/30">
                  <span className="text-xs md:text-sm">COASTAL MEMORIES</span>
                  <span className="text-xs text-primary-dark/60">1</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary-light/30">
                  <span className="text-xs md:text-sm">FAMILY STORIES</span>
                  <span className="text-xs text-primary-dark/60">2</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary-light/30">
                  <span className="text-xs md:text-sm">CULTURAL ESSAYS</span>
                  <span className="text-xs text-primary-dark/60">3</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary-light/30">
                  <span className="text-xs md:text-sm">TRAVEL NARRATIVES</span>
                  <span className="text-xs text-primary-dark/60">4</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-4">
                PUBLICATIONS
              </h3>
              <p className="text-xs leading-relaxed text-primary-dark/80 mb-4">
                Featured in various literary magazines and journals, exploring
                themes of heritage, identity, and place.
              </p>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                Currently working on a memoir collection celebrating the rich
                cultural tapestry of the Malabar region.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services/Offerings Section */}
      <div className="grid grid-cols-12 border-t border-primary-light/30">
        <div className="col-span-12 p-6 md:p-8 lg:p-12 xl:p-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond font-light mb-8 lg:mb-12">
            SERVICES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 lg:mb-12 max-w-2xl sm:max-w-none lg:max-w-none">
            <div>
              <p className="text-xs font-montserrat leading-relaxed mb-6 md:mb-8">
                Offering personalized writing workshops, memoir consultations,
                and cultural storytelling sessions for those looking to capture
                their own heritage narratives.
              </p>

              <div className="bg-primary-dark/90 p-4 md:p-6 text-white overflow-hidden relative">
                 <div className="w-full h-24 md:h-32 relative mb-4">
                  <Image
                    src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764270631/about-page-services_xzbpcc.jpg"
                    alt="Writing workshop"
                    fill
                    className="object-cover opacity-90"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                 </div>
                <h4 className="font-montserrat text-xs uppercase tracking-wider relative z-10">
                  WORKSHOPS
                </h4>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                  MEMOIR GUIDANCE
                </h4>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Personal consultations for aspiring memoirists looking to
                  craft their family stories.
                </p>
              </div>

              <div>
                <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                  CULTURAL RESEARCH
                </h4>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Collaborative research projects exploring regional histories
                  and traditions.
                </p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                  STORYTELLING
                </h4>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Live storytelling sessions celebrating coastal heritage and
                  family traditions.
                </p>
              </div>

              <div>
                <h4 className="font-montserrat font-medium text-xs md:text-sm uppercase tracking-wider mb-2">
                  WRITING RETREATS
                </h4>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Immersive writing experiences along the Malabar Coast for
                  creative inspiration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <FAQAccordion />

      {/* Contact Section */}
      <div className="grid grid-cols-12 border-t border-primary-light/30">
        <div className="col-span-12 lg:col-span-6 p-6 md:p-8 lg:p-12 xl:p-16 flex items-center justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary-light/50 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-garamond font-light mb-4">
                HARU <br />
                MEMOIRS
              </h3>
              <p className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                Get in Touch
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 bg-primary-dark text-white overflow-hidden relative min-h-[300px] xl:min-h-full">
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/w_800,h_600,c_fill/v1764270116/get-in-touch-4thoption_koszeg.jpg"
            alt="Architectural detail"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[#5b4c3a]/40 flex items-end p-6 md:p-8 lg:p-12 xl:p-16 z-10">
            <div>
              <p className="text-xs font-montserrat uppercase tracking-wider mb-4">
                CONNECT WITH CHRISTINA
              </p>
              <p className="text-xs md:text-sm leading-relaxed opacity-90">
                Share your story, discuss potential collaborations, or learn
                more about coastal memoir writing.
              </p>
            </div>
          </div>
        </div>
      </div>
        <Newsletter />
        {/* <InstagramFeedMinimal /> */}
      </div>
    </PageTransition>
  );
};

export default AboutUsPage;
