"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IMAGES } from "@/constants/images";
import { getShimmerDataUrl } from "@/utils/image";

const UnsubscribeContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "invalid"
  >("loading");

  useEffect(() => {
    if (!email) {
      setStatus("invalid");
      return;
    }

    const unsubscribe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v2/newsletter/unsubscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!res.ok) throw new Error("Failed");

        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    unsubscribe();
  }, [email]);

  if (status === "loading") {
    return (
      <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center items-center">
        <p className="text-lg md:text-xl font-montserrat leading-relaxed text-primary-dark/80">
          Unsubscribing...
        </p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center items-center">
        <p className="text-lg md:text-xl font-montserrat leading-relaxed text-primary-dark/80">
          Invalid unsubscribe link.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center items-center">
        <p className="text-lg md:text-xl font-montserrat leading-relaxed text-primary-dark/80">
          Something went wrong. Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
      <div className="max-w-2xl xl:max-w-3xl">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="w-12 md:w-16 h-px bg-accent-warm"></div>
          <span className="text-xs md:text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
            NEWSLETTER
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-garamond font-light text-text-ui leading-tight mb-6 md:mb-8">
          YOU'VE BEEN
          <br />
          <span className="text-heading-accent">UNSUBSCRIBED</span>
        </h1>

        <p className="text-lg md:text-xl font-montserrat leading-relaxed text-primary-dark/80 mb-8 md:mb-12 max-w-xl">
          We're sorry to see you go. Your email has been removed from our
          newsletter list and you will no longer receive our seasonal
          reflections.
        </p>

        <div className="space-y-6 mb-12">
          <div className="border-l-2 border-accent-warm pl-6 py-4">
            <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80">
              If you change your mind, you can always resubscribe anytime to
              receive our gentle writings that follow the rhythm of change.
            </p>
          </div>
        </div>

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
            EXPLORE STORIES
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-light/30">
          <p className="text-xs font-montserrat text-primary-dark/60 leading-relaxed">
            If you have any questions or concerns, please{" "}
            <Link
              href="/contact-us"
              className="underline hover:text-primary-dark transition-colors duration-300"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

const UnsubscribePage = () => {
  return (
    <div className="min-h-screen bg-background text-text-ui">
      <section className="grid grid-cols-12 min-h-screen">
        {/* Left Side - Content */}
        <div className="col-span-12 xl:col-span-8 flex flex-col">
          <Suspense
            fallback={
              <div className="flex-1 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center items-center">
                <p className="text-lg md:text-xl font-montserrat leading-relaxed text-primary-dark/80">
                  Loading...
                </p>
              </div>
            }
          >
            <UnsubscribeContent />
          </Suspense>
        </div>

        {/* Right Side - Image */}
        <div className="col-span-12 xl:col-span-4 relative overflow-hidden min-h-[500px] xl:min-h-full">
          <div className="absolute inset-0 bg-[#5b4c3a]/10 z-10"></div>
          <Image
            src={IMAGES.shared.newsletterWide}
            alt="Newsletter - Seasonal reflections"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getShimmerDataUrl(1200, 800)}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white z-20">
            <p className="text-xs md:text-sm font-montserrat uppercase tracking-wider opacity-90">
              HARU MEMOIRS
            </p>
            <p className="text-xs opacity-70 mt-1 md:mt-2">
              Thank you for being part of our story circle
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnsubscribePage;
