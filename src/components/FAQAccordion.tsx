"use client";
import React, { useState, useRef, useEffect } from "react";

interface FAQ {
  question: string;
  answer: string;
}

// Move faqs array outside component to prevent recreation on each render
const faqs: FAQ[] = [
  {
    question: "WHAT INSPIRES YOUR WRITING?",
    answer:
      "The quiet seasons of the heart (kokoro) are my muse. I draw inspiration from moments of loneliness, the comfort found in stillness, and the gentle hope that blooms like spring (haru) after a long winter.",
  },
  {
    question: "WHY THE NAME 'HARU MEMOIRS'?",
    answer:
      "Haru means 'Spring' in Japanese, representing renewal and warmth. It's also the name of my cat, who taught me about quiet comfort. This space is a memoir of my journey toward healing, like spring returning to a frozen heart.",
  },
  {
    question: "WHO IS YOUR WRITING FOR?",
    answer:
      "It is for anyone who feels unseen or finds it hard to speak their feelings aloud. I hope my letters and poems provide a voice for your own silent emotions.",
  },
  {
    question: "DO YOU OFFER WORKSHOPS?",
    answer:
      "Yes, I focus on helping others express their inner world through writing. We explore how to turn feelings into words, finding clarity and comfort in the process.",
  },
  {
    question: "WHAT ARE YOU WRITING NOW?",
    answer:
      "I am constantly documenting the shifting seasons of life—capturing the 'mono no aware' (the pathos of things) and sharing small steps toward emotional growth.",
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

export default FAQAccordion;
