// olde newsletter code
// "use client";
// import React, { useState, useEffect } from "react";

// interface NewsletterPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<string | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);

//   // Handle popup visibility with smooth transitions
//   useEffect(() => {
//     if (isOpen) {
//       setShouldRender(true);
//       // Slight delay to ensure DOM is ready for animation
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//       }, 10);
//       return () => clearTimeout(timer);
//     } else {
//       setIsVisible(false);
//       // Wait for animation to complete before unmounting
//       const timer = setTimeout(() => {
//         setShouldRender(false);
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen]);

//   const handleSubmit = async () => {
//     if (!email) {
//       setSubmitStatus("error");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       // Replace this URL with actual backend endpoint
//       const response = await fetch("/api/newsletter", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setSubmitStatus("success");
//         setEmail("");
//         setTimeout(() => {
//           onClose();
//         }, 2000);
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       console.error("Error subscribing to newsletter:", error);
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle escape key press
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && isOpen) {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [isOpen, onClose]);

//   // Prevent body scroll when popup is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!shouldRender) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop with fade animation */}
//       <div
//         className={`absolute inset-0 bg-primary-dark/80 backdrop-blur-sm transition-all duration-300 ease-out ${
//           isVisible ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={onClose}
//       />

//       {/* Popup Content with scale and fade animation */}
//       <div
//         className={`relative bg-background border border-primary-light/30 max-w-4xl w-full mx-4 overflow-hidden shadow-2xl transform transition-all duration-300 ease-out ${
//           isVisible
//             ? "opacity-100 scale-100 translate-y-0"
//             : "opacity-0 scale-95 translate-y-4"
//         }`}
//       >
//         {/* Close Button with subtle hover animation */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-primary-dark/60 hover:text-primary-dark hover:bg-primary-light/20 transition-all duration-200 hover:scale-110"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* Left Side - Image with parallax effect */}
//           <div className="relative overflow-hidden h-64 lg:h-auto">
//             <div className="absolute inset-0 bg-primary-dark/20"></div>
//             <img
//               src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
//               alt="Coastal writing inspiration"
//               className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
//                 isVisible ? "scale-100" : "scale-110"
//               }`}
//             />
//             <div
//               className={`absolute bottom-4 left-4 text-white transition-all duration-500 delay-150 ease-out ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-4"
//               }`}
//             >
//               <p className="text-xs font-montserrat uppercase tracking-wider opacity-90">
//                 HARU STORIES
//               </p>
//               <p className="text-xs opacity-70 mt-1">
//                 Stories • Heritage • Community
//               </p>
//             </div>
//           </div>

//           {/* Right Side - Form with staggered animations */}
//           <div className="p-6 md:p-8 lg:p-12">
//             <div
//               className={`mb-6 transition-all duration-500 delay-100 ease-out ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-6"
//               }`}
//             >
//               <h3 className="text-2xl md:text-3xl font-garamond font-light text-text-ui mb-3">
//                 JOIN OUR
//                 <br />
//                 <span className="text-primary-dark">STORY CIRCLE</span>
//               </h3>
//               <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 hidden xl:block">
//                 Subscribe to receive monthly stories, coastal wisdom, and
//                 writing insights directly from the Haru shores.
//               </p>
//             </div>

//             {submitStatus === "success" ? (
//               <div
//                 className={`text-center py-6 transition-all duration-500 delay-200 ease-out ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-6"
//                 }`}
//               >
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
//                   <svg
//                     className="w-8 h-8 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h4 className="text-lg font-garamond font-light text-primary-dark mb-2">
//                   Welcome to the Circle!
//                 </h4>
//                 <p className="text-sm font-montserrat text-primary-dark/80">
//                   Thank you for joining our storytelling community.
//                 </p>
//               </div>
//             ) : (
//               <div
//                 className={`space-y-6 transition-all duration-500 delay-200 ease-out ${
//                   isVisible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-6"
//                 }`}
//               >
//                 {/* Email Input */}
//                 <div className="space-y-2">
//                   <label className="block text-xs font-montserrat font-medium uppercase tracking-wider text-primary-dark/80">
//                     EMAIL ADDRESS
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-0 py-3 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-all duration-300 placeholder-primary-dark/40 focus:scale-[1.02] transform"
//                     placeholder="your@email.com"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className="group relative w-full px-8 py-4 bg-primary-dark text-white font-montserrat text-xs uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70"
//                   >
//                     <span className="relative z-10">
//                       {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
//                     </span>
//                     <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                   </button>
//                 </div>

//                 {/* Error Message with slide animation */}
//                 {submitStatus === "error" && (
//                   <div className="mt-4 p-3 bg-red-50 text-red-800 border-l-4 border-red-400 animate-slide-in-left">
//                     <p className="text-xs font-montserrat">
//                       Please enter a valid email address to subscribe.
//                     </p>
//                   </div>
//                 )}

//                 {/* Benefits - Hidden on mobile and tablet */}
//                 <div
//                   className={`pt-4 border-t border-primary-light/30 hidden xl:block transition-all duration-500 delay-300 ease-out ${
//                     isVisible
//                       ? "opacity-100 translate-y-0"
//                       : "opacity-0 translate-y-6"
//                   }`}
//                 >
//                   <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-3 text-primary-dark/80">
//                     WHAT YOU'LL RECEIVE
//                   </h4>
//                   <div className="space-y-2 text-xs text-primary-dark/70">
//                     <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
//                       <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
//                       <span>New stories and essays from the coast</span>
//                     </div>
//                     <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
//                       <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
//                       <span>Writing tips and memoir guidance</span>
//                     </div>
//                     <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
//                       <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
//                       <span>Exclusive workshop announcements</span>
//                     </div>
//                   </div>
//                 </div>

//                 <p
//                   className={`text-xs font-montserrat text-primary-dark/60 leading-relaxed hidden xl:block transition-all duration-500 delay-400 ease-out ${
//                     isVisible
//                       ? "opacity-100 translate-y-0"
//                       : "opacity-0 translate-y-6"
//                   }`}
//                 >
//                   Delivered monthly • Your privacy is protected
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Hook to manage popup visibility
// export const useNewsletterPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Check if popup has been shown in this session
//     const hasShownPopup = sessionStorage.getItem("newsletter-popup-shown");

//     if (!hasShownPopup) {
//       // Show popup after 3 seconds
//       const timer = setTimeout(() => {
//         setIsOpen(true);
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const closePopup = () => {
//     setIsOpen(false);
//     // Mark as shown for this session
//     sessionStorage.setItem("newsletter-popup-shown", "true");
//   };

//   return { isOpen, closePopup };
// };

// export default NewsletterPopup;

// new code with improved validation and error handling
"use client";
import React, { useState, useEffect } from "react";
import { subscribe } from "@/functions/services/newsletter/newsletter";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle popup visibility with smooth transitions
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Slight delay to ensure DOM is ready for animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const trimmed = email.trim();

    // Client-side validation
    if (!trimmed) {
      setSubmitStatus("invalid-empty");
      setIsFeedbackVisible(false);
      setTimeout(() => {
        setIsFeedbackVisible(true);
        setTimeout(() => {
          setIsFeedbackVisible(false);
          setTimeout(() => setSubmitStatus(null), 1000);
        }, 1000);
      }, 50);
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setSubmitStatus("invalid-email");
      setIsFeedbackVisible(false);
      setTimeout(() => {
        setIsFeedbackVisible(true);
        setTimeout(() => {
          setIsFeedbackVisible(false);
          setTimeout(() => setSubmitStatus(null), 1000);
        }, 1000);
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await subscribe(trimmed);
      setSubmitStatus("success");
      setEmail("");
      setIsFeedbackVisible(false);

      // Animation sequence for success
      setTimeout(() => {
        setIsFeedbackVisible(true); // Fade in
        
        // Wait 1s visible then fade out
        setTimeout(() => {
          setIsFeedbackVisible(false); // Fade out
          
          // Close popup after fade out completes (1s transition)
          setTimeout(() => {
            onClose();
          }, 1000);
        }, 1000);
      }, 50);
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      // Check if it's a server error or network error
      if (error.message && error.message.includes("Failed to subscribe")) {
        setSubmitStatus("server-error");
      } else {
        setSubmitStatus("network-error");
      }
      
      setIsFeedbackVisible(false);
      setTimeout(() => {
        setIsFeedbackVisible(true);
        setTimeout(() => {
          setIsFeedbackVisible(false);
          setTimeout(() => setSubmitStatus(null), 1000);
        }, 1000);
      }, 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with fade animation */}
      <div
        className={`absolute inset-0 bg-[#5b4c3a]/80 backdrop-blur-sm transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Popup Content with scale and fade animation */}
      <div
        className={`relative bg-background border border-primary-light/30 max-w-4xl w-full mx-4 overflow-hidden shadow-2xl transform transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Close Button with subtle hover animation */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-primary-dark/60 hover:text-primary-dark hover:bg-primary-light/20 transition-all duration-200 hover:scale-110"
          aria-label="Close newsletter popup"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Image with parallax effect */}
          <div className="relative overflow-hidden h-64 lg:h-auto">
            <div className="absolute inset-0 bg-primary-dark/20"></div>
            <img
              src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268054/newsletter_m5xiwj.jpg"
              alt="Coastal writing inspiration"
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                isVisible ? "scale-100" : "scale-110"
              }`}
            />
            <div
              className={`absolute bottom-4 left-4 text-white transition-all duration-500 delay-150 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xs font-montserrat uppercase tracking-wider opacity-90">
                HARU STORIES
              </p>
              <p className="text-xs opacity-70 mt-1">
                Stories • Heritage • Community
              </p>
            </div>
          </div>

          {/* Right Side - Form with staggered animations */}
          <div className="p-6 md:p-8 lg:p-12">
            <div
              className={`mb-6 transition-all duration-500 delay-100 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-garamond font-light text-text-ui mb-3">
                JOIN OUR
                <br />
                <span className="text-primary-dark">STORY CIRCLE</span>
              </h3>
              <p className="text-sm font-montserrat leading-relaxed text-primary-dark/80 hidden xl:block">
                Subscribe to receive monthly stories, coastal wisdom, and
                writing insights directly from the Haru shores.
              </p>
            </div>

            {/* Status / Form area - add aria-live for screen readers */}
            <div aria-live="polite" aria-atomic="true">
              {submitStatus === "success" ? (
              <div
                className={`text-center py-6 transition-all duration-1000 ease-in-out ${
                  isVisible && isFeedbackVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-garamond font-light text-primary-dark mb-2">
                  Welcome to the Circle!
                </h4>
                <p className="text-sm font-montserrat text-primary-dark/80">
                  Thank you for joining our storytelling community.
                </p>
              </div>
              ) : (
                <div
                  className={`space-y-6 transition-all duration-500 delay-200 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                >
                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat font-medium uppercase tracking-wider text-primary-dark/80">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-0 py-3 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-all duration-300 placeholder-primary-dark/40 focus:scale-[1.02] transform"
                      placeholder="your@email.com"
                      aria-label="Email address"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 bg-primary-dark text-white font-montserrat text-xs uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}
                      </span>
                      <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </div>

                  {/* Status Messages - same style as contact/newsletter */}
                  {submitStatus && submitStatus !== "success" && (
                    <div
                      className={`mt-6 p-6 border-l-4 transition-all duration-1000 ease-in-out ${
                        isFeedbackVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      } ${
                        submitStatus === "invalid-email" ||
                        submitStatus === "invalid-empty"
                          ? "bg-primary-dark/5 border-primary-dark"
                          : submitStatus === "server-error" ||
                            submitStatus === "network-error"
                          ? "bg-primary-dark/5 border-primary-dark"
                          : "bg-primary-dark/5 border-primary-dark"
                      }`}
                    >
                      <p className="text-sm font-montserrat text-primary-dark">
                        {submitStatus === "invalid-empty" ? (
                          <>
                            <span className="font-medium uppercase tracking-wider block mb-2">
                              EMAIL REQUIRED
                            </span>
                            Please enter your email address.
                          </>
                        ) : submitStatus === "invalid-email" ? (
                          <>
                            <span className="font-medium uppercase tracking-wider block mb-2">
                              INVALID EMAIL
                            </span>
                            Please enter a valid email address (example:
                            name@example.com).
                          </>
                        ) : submitStatus === "server-error" ? (
                          <>
                            <span className="font-medium uppercase tracking-wider block mb-2">
                              SUBSCRIPTION ERROR
                            </span>
                            The server responded with an error. Please try again
                            later.
                          </>
                        ) : submitStatus === "network-error" ? (
                          <>
                            <span className="font-medium uppercase tracking-wider block mb-2">
                              NETWORK ERROR
                            </span>
                            Could not connect to the server. Check your
                            connection or try again later.
                          </>
                        ) : (
                          <>
                            <span className="font-medium uppercase tracking-wider block mb-2">
                              ERROR
                            </span>
                            There was a problem subscribing. Please try again.
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Benefits - Hidden on mobile and tablet */}
                  <div
                    className={`pt-4 border-t border-primary-light/30 hidden xl:block transition-all duration-500 delay-300 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    <h4 className="font-montserrat font-medium text-xs uppercase tracking-wider mb-3 text-primary-dark/80">
                      WHAT YOU'LL RECEIVE
                    </h4>
                    <div className="space-y-2 text-xs text-primary-dark/70">
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                        <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
                        <span>New stories and essays from the coast</span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                        <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
                        <span>Writing tips and memoir guidance</span>
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                        <div className="w-1 h-1 bg-accent-warm rounded-full"></div>
                        <span>Exclusive workshop announcements</span>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`text-xs font-montserrat text-primary-dark/60 leading-relaxed hidden xl:block transition-all duration-500 delay-400 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    Delivered monthly • Your privacy is protected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook to manage popup visibility
export const useNewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasShownPopup = sessionStorage.getItem("newsletter-popup-shown");

    if (!hasShownPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Mark as shown for this session
    sessionStorage.setItem("newsletter-popup-shown", "true");
  };

  return { isOpen, closePopup };
};

export default NewsletterPopup;
