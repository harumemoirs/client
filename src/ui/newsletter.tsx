// olde newsletter code

// "use client";
// import React, { useState } from "react";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);
//   const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     if (!email) {
//       setSubscribeStatus("error");
//       return;
//     }

//     setIsSubscribing(true);
//     setSubscribeStatus(null);

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
//         setSubscribeStatus("success");
//         setEmail("");
//       } else {
//         setSubscribeStatus("error");
//       }
//     } catch (error) {
//       console.error("Error subscribing to newsletter:", error);
//       setSubscribeStatus("error");
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   return (
//     <section className="bg-background border-t border-primary-light/30">
//       <div className="grid grid-cols-12">
//         {/* Left Section - Newsletter Content */}
//         <div className="col-span-12 lg:col-span-8 p-8 lg:p-16">
//           <div className="max-w-3xl">
//             {/* Header */}
//             <div className="mb-12">
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="w-12 h-px bg-accent-warm"></div>
//                 <span className="text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
//                   NEWSLETTER
//                 </span>
//               </div>

//               <h2 className="text-5xl lg:text-7xl font-garamond font-light text-text-ui leading-tight mb-8">
//                 STORIES FROM
//                 <br />
//                 <span className="text-primary-dark">THE COAST</span>
//               </h2>

//               <p className="text-lg font-montserrat leading-relaxed text-primary-dark/80 mb-8 max-w-2xl">
//                 Join our community of storytellers and discover the rich
//                 heritage of Malabar through monthly letters filled with
//                 memories, musings, and cultural narratives.
//               </p>
//             </div>

//             {/* Newsletter Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
//               <div className="border-l-2 border-accent-warm pl-6">
//                 <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                   MONTHLY STORIES
//                 </h3>
//                 <p className="text-xs leading-relaxed text-primary-dark/80">
//                   Intimate narratives exploring coastal life, family traditions,
//                   and cultural heritage.
//                 </p>
//               </div>

//               <div className="border-l-2 border-accent-cool pl-6">
//                 <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                   WRITING INSIGHTS
//                 </h3>
//                 <p className="text-xs leading-relaxed text-primary-dark/80">
//                   Behind-the-scenes glimpses into the memoir writing process and
//                   creative inspiration.
//                 </p>
//               </div>

//               <div className="border-l-2 border-primary-dark pl-6">
//                 <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                   WORKSHOP NEWS
//                 </h3>
//                 <p className="text-xs leading-relaxed text-primary-dark/80">
//                   Early access to writing workshops, retreats, and storytelling
//                   events along the coast.
//                 </p>
//               </div>

//               <div className="border-l-2 border-primary-light pl-6">
//                 <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                   CULTURAL NOTES
//                 </h3>
//                 <p className="text-xs leading-relaxed text-primary-dark/80">
//                   Explorations of Malabar's traditions, festivals, and the
//                   stories that shape our identity.
//                 </p>
//               </div>
//             </div>

//             {/* Subscription Form */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-garamond font-light text-primary-dark mb-6">
//                 Subscribe to receive stories from the coast
//               </h3>

//               <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
//                 <div className="flex-1">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Your email address"
//                     className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
//                   />
//                 </div>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubscribing}
//                   className="group relative px-8 py-4 bg-primary-dark text-white font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <span className="relative z-10">
//                     {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
//                   </span>
//                   <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                 </button>
//               </div>

//               {/* Status Messages */}
//               {subscribeStatus && (
//                 <div
//                   className={`mt-4 p-4 ${
//                     subscribeStatus === "success"
//                       ? "bg-green-50 text-green-800 border-l-4 border-green-400"
//                       : "bg-red-50 text-red-800 border-l-4 border-red-400"
//                   }`}
//                 >
//                   <p className="text-sm font-montserrat">
//                     {subscribeStatus === "success"
//                       ? "Thank you! You've successfully subscribed to our newsletter."
//                       : "Please enter a valid email address to subscribe."}
//                   </p>
//                 </div>
//               )}

//               <p className="text-xs font-montserrat text-primary-dark/60 leading-relaxed">
//                 Delivered monthly • Your privacy is protected
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Visual Element */}
//         <div className="col-span-12 lg:col-span-4 bg-primary-light/10 relative overflow-hidden">
//           <div className="h-full min-h-96 lg:min-h-full relative">
//             <img
//               src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=800&fit=crop"
//               alt="Letter writing and correspondence"
//               className="w-full h-full object-cover opacity-80"
//             />
//             <div className="absolute inset-0 bg-primary-dark/20"></div>

//             {/* Quote Overlay */}
//             <div className="absolute bottom-8 left-8 right-8 text-white">
//               <blockquote className="text-lg font-garamond font-light leading-relaxed italic mb-4">
//                 "Letters carry the weight of memory and the lightness of hope."
//               </blockquote>
//               <cite className="text-xs font-montserrat uppercase tracking-wider opacity-80">
//                 — FROM THE ARCHIVES
//               </cite>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;
// new code with improved validation and error handling
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { subscribe } from "@/functions/services/newsletter/newsletter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);

  const handleSubmit = async () => {
    // Trim once and reuse
    const trimmed = email.trim();

    // client-side validation
    if (!trimmed) {
      setSubscribeStatus("invalid-empty");
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setSubscribeStatus(null), 1000);
        }, 1000);
      }, 50);
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setSubscribeStatus("invalid-email");
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setSubscribeStatus(null), 1000);
        }, 1000);
      }, 50);
      return;
    }

    setIsSubscribing(true);
    setSubscribeStatus(null);

    try {
      await subscribe(trimmed);
      setSubscribeStatus("success");
      setEmail("");
      setIsVisible(false);
      
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setSubscribeStatus(null), 1000);
        }, 1000);
      }, 50);
    } catch (error: any) {
      
      // Check if it's a rate limit error
      if (error.isRateLimited) {
        setRemainingCooldown(error.retryAfter || 900);
        
        // Set invisible first, then set status, then fade in
        setIsVisible(false);
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          setSubscribeStatus("rate-limited");
          
          // Update countdown
          const interval = setInterval(() => {
            setRemainingCooldown((prev) => {
              const newRemaining = prev - 1;
              if (newRemaining <= 0) {
                clearInterval(interval);
                setIsVisible(false);
                setTimeout(() => setSubscribeStatus(null), 1000);
                return 0;
              }
              return newRemaining;
            });
          }, 1000);
          
          // Trigger fade-in animation
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }, 50);
      } else if (error.isAlreadySubscribed) {
        // Handle "already subscribed" gracefully without console error
        setSubscribeStatus("already-subscribed");
        setIsVisible(false);
        
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setSubscribeStatus(null), 1000);
          }, 1000);
        }, 50);
      } else if (error.message && error.message.includes("Failed to subscribe")) {
        setSubscribeStatus("server-error");
        setIsVisible(false);
        
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setSubscribeStatus(null), 1000);
          }, 1000);
        }, 50);
      } else {
        setSubscribeStatus("network-error");
        setIsVisible(false);
        
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setSubscribeStatus(null), 1000);
          }, 1000);
        }, 50);
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="bg-background border-t border-primary-light/30">
      <div className="grid grid-cols-12">
        {/* Left Section - Newsletter Content */}
        <div className="col-span-12 xl:col-span-8 p-8 lg:p-16">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-accent-warm"></div>
                <span className="text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
                  NEWSLETTER
                </span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-garamond font-light text-text-ui leading-tight mb-8">
                SEASONAL
                <br />
                <span className="text-primary-dark">REFLECTIONS</span>
              </h2>

              <p className="text-lg font-montserrat leading-relaxed text-primary-dark/80 mb-8 max-w-2xl">
                Join our community and receive gentle writings that follow the rhythm of change monthly letters exploring impermanence, tenderness, and the beauty of life's shifting seasons.
              </p>
            </div>

            {/* Newsletter Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="border-l-2 border-accent-warm pl-6">
                <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                  SEASONAL WRITINGS
                </h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Gentle reflections that bloom, fade, and return with the rhythm of time and nature's cycles.
                </p>
              </div>

              <div className="border-l-2 border-accent-cool pl-6">
                <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                  POETRY & PROSE
                </h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Verses and musings on impermanence, soft beginnings, and the spaces between change.
                </p>
              </div>

              <div className="border-l-2 border-primary-dark pl-6">
                <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                  CONTEMPLATIVE NOTES
                </h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Thoughtful writings on tenderness, belonging, and finding meaning in life's quiet moments.
                </p>
              </div>

              <div className="border-l-2 border-primary-light pl-6">
                <h3 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                  CREATIVE INSPIRATION
                </h3>
                <p className="text-xs leading-relaxed text-primary-dark/80">
                  Behind-the-scenes glimpses into the writing process and seasonal creative practices.
                </p>
              </div>
            </div>

            {/* Subscription Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-garamond font-light text-primary-dark mb-6">
                Subscribe to receive seasonal reflections and gentle writings
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubscribing}
                  className="group relative px-8 py-4 bg-primary-dark text-white font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
                  </span>
                  <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              {/* Status Messages - same visual style as Contact form */}
              {/* aria-live for screen readers */}
              <div aria-live="polite" aria-atomic="true">
                {subscribeStatus && (
                  <div
                    className={`mt-6 p-6 border-l-4 transition-all duration-1000 ease-in-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${
                      subscribeStatus === "success"
                        ? "bg-primary-light/10 border-accent-cool"
                        : "bg-primary-dark/5 border-primary-dark"
                    }`}
                  >
                    <p className="text-sm font-montserrat text-primary-dark">
                      {subscribeStatus === "success" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            SUBSCRIBED
                          </span>
                          Thank you! You've successfully subscribed to our
                          newsletter.
                        </>
                      ) : subscribeStatus === "invalid-empty" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            EMAIL REQUIRED
                          </span>
                          Please enter your email address.
                        </>
                      ) : subscribeStatus === "invalid-email" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            INVALID EMAIL
                          </span>
                          Please enter a valid email address (example:
                          name@example.com).
                        </>
                      ) : subscribeStatus === "rate-limited" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            PLEASE WAIT
                          </span>
                          To prevent spam, please wait {Math.floor(remainingCooldown / 60)}:
                          {String(remainingCooldown % 60).padStart(2, "0")} before
                          subscribing again.
                        </>
                      ) : subscribeStatus === "already-subscribed" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            ALREADY SUBSCRIBED
                          </span>
                          You're already part of our community! Check your inbox for our monthly letters.
                        </>
                      ) : subscribeStatus === "server-error" ? (
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            SUBSCRIPTION ERROR
                          </span>
                          The server responded with an error. Please try again
                          later.
                        </>
                      ) : (
                        // network-error
                        <>
                          <span className="font-medium uppercase tracking-wider block mb-2">
                            NETWORK ERROR
                          </span>
                          Could not connect to the server. Check your connection
                          or try again later.
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs font-montserrat text-primary-dark/60 leading-relaxed">
                Delivered monthly • Your privacy is protected
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Visual Element */}
        <div className="col-span-12 xl:col-span-4 bg-primary-light/10 relative overflow-hidden">
          <div className="h-full min-h-[400px] xl:min-h-full relative">
            <Image
              src="https://res.cloudinary.com/dwtbvdlzg/image/upload/f_auto,q_auto,w_800/v1764268054/newsletter_m5xiwj.jpg"
              alt="Letter writing and correspondence"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 33vw"
              quality={85}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#5b4c3a]/20"></div>

            {/* Quote Overlay */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <blockquote className="text-lg font-garamond font-light leading-relaxed italic mb-4">
                "Words written in the quiet spaces where seasons turn and stories unfold."
              </blockquote>
              <cite className="text-xs font-montserrat uppercase tracking-wider opacity-80">
                — HARU MEMOIR
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
