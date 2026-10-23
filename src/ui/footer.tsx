"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useNavigation, ROUTES, type RouteValue } from "@/utils/navigation";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/constants/images";
import { getShimmerDataUrl } from "@/utils/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const { navigateTo, navigateToExternal, navigationState } = useNavigation();
  const pathname = usePathname();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe path checking function
  const isCurrentPath = (path: RouteValue): boolean => {
    if (!mounted) return false;
    return pathname === path;
  };

  const handleNavigation = async (
    href: RouteValue,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await navigateTo(href);
    } catch (error) {
      console.error("Navigation failed:", error);
      // Fallback to default browser navigation
      window.location.href = href;
    }
  };

  const handleExternalNavigation = (url: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigateToExternal(url, "_blank");
  };

  const navigationLinks = [
    { name: "HOME", href: ROUTES.HOME as RouteValue },
    { name: "BLOGS", href: "/blogs" as RouteValue },
    { name: "ABOUT", href: ROUTES.ABOUT as RouteValue },
    { name: "CONTACT", href: ROUTES.CONTACT as RouteValue },
  ];

  const socialLinks = [
    {
      name: "INSTAGRAM",
      href: "https://www.instagram.com/harumemoirs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      description: "Moments between seasons",
    },
    {
      name: "TWITTER",
      href: "https://x.com/harumemoirs",
      description: "Thoughts and updates",
    },
  ];

  return (
    <footer className="bg-background border-t border-primary-light/30">
      {/* Main Footer Content */}
      <div className="grid grid-cols-12">
        {/* Left Section - Brand & Description */}
        <div className="col-span-12 lg:col-span-6 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-primary-light/30">
          <div className="max-w-lg">
            {/* Logo */}
            <div className="mb-8">
              <a
                href={ROUTES.HOME}
                onClick={(e) => handleNavigation(ROUTES.HOME, e)}
                className="group cursor-pointer"
              >
                <h2 className="text-4xl lg:text-5xl font-garamond font-light tracking-wider text-text-ui mb-2 group-hover:text-primary-dark transition-colors duration-300">
                  HARU
                </h2>
                <p className="text-sm font-montserrat uppercase tracking-widest text-primary-dark/70 group-hover:text-primary-dark transition-colors duration-300">
                  MEMOIRS BY CHRISTINA
                </p>
              </a>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 mb-4">
                Inspired by Haru the season of return. Writing from the spaces between change where silence turns into story, and moments unfold like sakura in spring.
              </p>
              <p className="text-xs font-montserrat leading-relaxed text-primary-dark/60">
                Exploring themes of impermanence, tenderness, and belonging through gentle reflections on life's shifting seasons.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Navigation & Links */}
        <div className="col-span-12 lg:col-span-6 p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-montserrat font-medium uppercase tracking-wider mb-6">
                EXPLORE
              </h3>
              <nav className="space-y-4">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(link.href, e)}
                    className={`group block py-1 ${
                      navigationState.isNavigating
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-montserrat transition-colors duration-300 ${
                        mounted && isCurrentPath(link.href)
                          ? "text-primary-dark"
                          : "text-primary-dark/80 group-hover:text-primary-dark"
                      }`}
                    >
                      {link.name}
                    </span>
                    <div
                      className={`h-px bg-accent-warm transition-all duration-300 mt-1 ${
                        mounted && isCurrentPath(link.href)
                          ? "w-8"
                          : "w-0 group-hover:w-8"
                      }`}
                    ></div>
                  </a>
                ))}
              </nav>
            </div>

            {/* Social & Connect */}
            <div>
              <h3 className="text-sm font-montserrat font-medium uppercase tracking-wider mb-6">
                CONNECT
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    onClick={(e) =>
                      social.href !== "#"
                        ? handleExternalNavigation(social.href, e)
                        : e.preventDefault()
                    }
                    className="group block py-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-montserrat text-primary-dark/80 group-hover:text-primary-dark transition-colors duration-300">
                        {social.name}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-accent-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="text-xs text-primary-dark/60 group-hover:text-primary-dark/80 transition-colors duration-300 mt-1">
                      {social.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Quote Section */}
      <div className="border-t border-primary-light/30 bg-primary-light/5">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-8 p-8 md:p-12 flex items-center">
            <div className="max-w-2xl">
              <blockquote className="text-lg md:text-xl font-garamond font-light leading-relaxed text-primary-dark/90 italic mb-4">
                "In the spaces between change, we find the stories that bloom, fade, and return like time itself."
              </blockquote>
              <cite className="text-xs font-montserrat uppercase tracking-wider text-primary-dark/60">
                — CHRISTINA, HARU MEMOIR
              </cite>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4 overflow-hidden relative min-h-[300px] md:min-h-full">
            <Image
              src={IMAGES.shared.footer}
              alt="Coastal landscape"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL={getShimmerDataUrl(600, 400)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-light/30 bg-primary-light/10">
        <div className="px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="text-xs font-montserrat text-primary-dark/80">
                © {currentYear} Haru Memoirs by Christina. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href={ROUTES.PRIVACY}
                  onClick={(e) => handleNavigation(ROUTES.PRIVACY, e)}
                  className="text-xs font-montserrat text-primary-dark/80 hover:text-primary-dark transition-colors duration-300"
                >
                  Privacy
                </a>
                <a
                  href={ROUTES.TERMS}
                  onClick={(e) => handleNavigation(ROUTES.TERMS, e)}
                  className="text-xs font-montserrat text-primary-dark/80 hover:text-primary-dark transition-colors duration-300"
                >
                  Terms
                </a>
              </div>
            </div>

            {/* Design Credit */}
            <div className="flex items-center space-x-3">
              <p className="text-xs font-montserrat text-primary-dark/80">
                Developed and Maintained by{" "}
                <a
                  href="https://kairosartifex.site"
                  onClick={(e) =>
                    handleExternalNavigation("https://kairosartifex.site", e)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary-dark transition-colors duration-300"
                >
                  Kairos
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
