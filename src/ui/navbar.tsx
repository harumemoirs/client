"use client";

import React, { useState, useEffect } from "react";
import {
  useNavigationWithGlobal,
  ROUTES,
  type RouteValue,
} from "@/utils/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { navigateTo, navigationState } = useNavigationWithGlobal();
  const pathname = usePathname();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe path checking function
  const isCurrentPath = (path: RouteValue): boolean => {
    if (!mounted) return false;
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = async (
    href: RouteValue,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await navigateTo(href);
      setIsMenuOpen(false); // Close mobile menu after navigation
    } catch (error) {
      console.error("Navigation failed:", error);
      // Fallback to default browser navigation
      window.location.href = href;
    }
  };

  const navigationItems = [
    {
      name: "HOME",
      href: ROUTES.HOME as RouteValue,
      description: "The season of return",
    },
    {
      name: "BLOGS",
      href: "/blogs" as RouteValue,
      description: "Gentle reflections through seasons",
    },
    {
      name: "ABOUT",
      href: ROUTES.ABOUT as RouteValue,
      description: "Writing from the spaces between change",
    },
    {
      name: "CONTACT",
      href: ROUTES.CONTACT as RouteValue,
      description: "Connect with Christina",
    },
  ];

  // Prevent hydration mismatch by not rendering active states until mounted
  if (!mounted) {
    return (
      <>
        {/* Main Navbar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled
              ? "bg-background/95 backdrop-blur-md border-b border-primary-light/30"
              : "bg-transparent"
          }`}
        >
          <div className="px-8 lg:px-12">
            <div className="flex items-center justify-between h-20 lg:h-24">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href={ROUTES.HOME} className="group">
                  <h1 className="text-2xl lg:text-3xl font-garamond font-light tracking-wider text-text-ui group-hover:text-primary-dark transition-colors duration-300">
                    HARU
                    <span className="block text-lg lg:text-xl text-primary-dark/70 font-montserrat uppercase tracking-widest mt-1">
                      MEMOIRS
                    </span>
                  </h1>
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-12">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative py-2"
                  >
                    <span className="text-sm font-montserrat font-medium uppercase tracking-wider text-text-ui group-hover:text-primary-dark transition-colors duration-300">
                      {item.name}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-warm group-hover:w-full transition-all duration-300"></div>
                  </a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden relative w-6 h-6 focus:outline-none"
                aria-label="Toggle navigation"
              >
                <div
                  className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                    isMenuOpen ? "top-3 rotate-45" : "top-1"
                  }`}
                ></div>
                <div
                  className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "top-3"
                  }`}
                ></div>
                <div
                  className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                    isMenuOpen ? "top-3 -rotate-45" : "top-5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </nav>

        {/* Spacer for fixed navbar */}
        <div className="h-20 lg:h-24"></div>
      </>
    );
  }

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-primary-light/30"
            : "bg-transparent"
        }`}
      >
        <div className="px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href={ROUTES.HOME}
                className="group"
                onClick={(e) => handleNavigation(ROUTES.HOME, e)}
              >
                <h1 className="text-2xl lg:text-3xl font-garamond font-light tracking-wider text-text-ui group-hover:text-primary-dark transition-colors duration-300">
                  HARU
                  <span className="block text-lg lg:text-xl text-primary-dark/70 font-montserrat uppercase tracking-widest mt-1">
                    MEMOIRS
                  </span>
                </h1>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigation(item.href, e)}
                  className={`group relative py-2 ${
                    isCurrentPath(item.href) ? "text-primary-dark" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-montserrat font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isCurrentPath(item.href)
                        ? "text-primary-dark"
                        : "text-text-ui group-hover:text-primary-dark"
                    }`}
                  >
                    {item.name}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-accent-warm transition-all duration-300 ${
                      isCurrentPath(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-6 h-6 focus:outline-none"
              aria-label="Toggle navigation"
              disabled={navigationState.isNavigating}
            >
              <div
                className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                  isMenuOpen ? "top-3 rotate-45" : "top-1"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "top-3"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-text-ui transition-all duration-300 ${
                  isMenuOpen ? "top-3 -rotate-45" : "top-5"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-background shadow-2xl transform transition-transform duration-500 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8 pt-28">
            {/* Mobile Navigation */}
            <nav className="space-y-8">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`transform transition-all duration-500 ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavigation(item.href, e)}
                    className={`group block py-4 border-b border-primary-light/20 ${
                      navigationState.isNavigating
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`text-lg font-montserrat font-medium uppercase tracking-wider transition-colors duration-300 ${
                          isCurrentPath(item.href)
                            ? "text-primary-dark"
                            : "text-text-ui group-hover:text-primary-dark"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <div
                        className={`w-2 h-2 rounded-full bg-accent-warm transition-opacity duration-300 ${
                          isCurrentPath(item.href)
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs font-montserrat text-text-ui/70 mt-1 group-hover:text-text-ui transition-colors duration-300">
                      {item.description}
                    </p>
                  </a>
                </div>
              ))}
            </nav>

            {/* Mobile Footer */}
            <div className="mt-12 pt-8 border-t border-primary-light/20">
              <p className="text-xs font-montserrat text-text-ui/70 leading-relaxed">
                Writing from the spaces between change
                <br />
                where silence turns into story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Navbar;
