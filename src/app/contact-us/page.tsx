// "use client";

// import React, { useState } from "react";

// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<string | null>(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Prevent submission if required fields are empty
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.subject ||
//       !formData.message
//     ) {
//       setSubmitStatus("error");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       // Replace this URL with your actual backend endpoint
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSubmitStatus("success");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background text-text-ui">
//       {/* Hero Section */}
//       <div className="grid grid-cols-12 min-h-screen">
//         {/* Left Side - Title and Info */}
//         <div className="col-span-12 lg:col-span-5 flex flex-col">
//           {/* Header */}
//           <div className="p-8 lg:p-12 border-b border-primary-light/30">
//             <h1 className="text-6xl lg:text-8xl font-garamond font-light tracking-wider leading-tight">
//               GET IN
//               <br />
//               <span className="text-heading-accent">TOUCH</span>
//             </h1>
//             <div className="mt-8 flex gap-8 text-sm font-montserrat uppercase tracking-widest">
//               <span className="text-heading-accent">CONTACT</span>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
//             <div className="space-y-8">
//               <div className="text-sm font-montserrat">
//                 <h3 className="font-medium mb-4 uppercase tracking-wider">
//                   REACH OUT
//                 </h3>
//                 <p className="text-xs leading-relaxed text-primary-dark/80 mb-6">
//                   Share your stories, discuss collaborations, or inquire about
//                   writing workshops along the Malabar Coast.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                     RESPONSE TIME
//                   </h4>
//                   <p className="text-xs leading-relaxed text-primary-dark/80">
//                     Typically within 24-48 hours
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                     COLLABORATION
//                   </h4>
//                   <p className="text-xs leading-relaxed text-primary-dark/80">
//                     Open to literary projects,
//                     <br />
//                     workshops, and cultural exchanges
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Hero Image */}
//         <div className="col-span-12 lg:col-span-7 relative overflow-hidden">
//           <div className="absolute inset-0 bg-primary-dark/20"></div>
//           <img
//             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop"
//             alt="Writing and correspondence"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-8 left-8 text-white">
//             <p className="text-xs font-montserrat uppercase tracking-wider opacity-90">
//               LET'S CREATE TOGETHER
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Form Section */}
//       <div className="grid grid-cols-12 border-t border-primary-light/30">
//         <div className="col-span-12 lg:col-span-8 p-8 lg:p-12">
//           <div className="max-w-4xl">
//             <h2 className="text-4xl lg:text-6xl font-garamond font-light mb-12 tracking-wide">
//               SEND A<br />
//               <span className="text-heading-accent">MESSAGE</span>
//             </h2>

//             <div className="space-y-8">
//               {/* Name and Email Row */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
//                     FULL NAME *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
//                     placeholder="Your name"
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
//                     EMAIL ADDRESS *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>

//               {/* Subject */}
//               <div className="space-y-3">
//                 <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
//                   SUBJECT *
//                 </label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
//                   placeholder="What would you like to discuss?"
//                 />
//               </div>

//               {/* Message */}
//               <div className="space-y-3">
//                 <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
//                   MESSAGE *
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   required
//                   rows={6}
//                   className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40 resize-none"
//                   placeholder="Share your thoughts, ideas, or questions..."
//                 />
//               </div>

//               <div className="pt-8">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="group relative px-12 py-4 bg-primary-dark text-white font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <span className="relative z-10">
//                     {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
//                   </span>
//                   <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                 </button>
//               </div>

//               {/* Status Messages */}
//               {submitStatus && (
//                 <div
//                   className={`mt-6 p-4 ${
//                     submitStatus === "success"
//                       ? "bg-green-50 text-green-800 border-l-4 border-green-400"
//                       : "bg-red-50 text-red-800 border-l-4 border-red-400"
//                   }`}
//                 >
//                   <p className="text-sm font-montserrat">
//                     {submitStatus === "success"
//                       ? "Thank you! Your message has been sent successfully. I'll get back to you soon."
//                       : "Sorry, there was an error sending your message. Please try again or contact me directly."}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-span-12 lg:col-span-4 bg-primary-light/10 p-8 lg:p-12">
//           <h3 className="text-2xl font-garamond font-light mb-8">CONNECT</h3>

//           <div className="space-y-8">
//             <div className="border-l-2 border-primary-dark pl-6">
//               <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                 WRITING INQUIRIES
//               </h4>
//               <p className="text-xs leading-relaxed text-primary-dark/80">
//                 Collaboration opportunities, guest writing, memoir
//                 consultations, and workshop bookings.
//               </p>
//             </div>

//             <div className="border-l-2 border-accent-warm pl-6">
//               <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                 CULTURAL PROJECTS
//               </h4>
//               <p className="text-xs leading-relaxed text-primary-dark/80">
//                 Heritage documentation, storytelling initiatives, and community
//                 writing programs.
//               </p>
//             </div>

//             <div className="border-l-2 border-accent-cool pl-6">
//               <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
//                 MEDIA & EVENTS
//               </h4>
//               <p className="text-xs leading-relaxed text-primary-dark/80">
//                 Speaking engagements, podcast appearances, and literary event
//                 participation.
//               </p>
//             </div>
//           </div>

//           {/* Additional Contact Info */}
//           <div className="mt-12 pt-8 border-t border-primary-light/30">
//             <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-4">
//               OTHER WAYS TO CONNECT
//             </h4>
//             <div className="space-y-3 text-xs text-primary-dark/80">
//               <p>Follow the journey on social media</p>
//               <p>Subscribe to the newsletter</p>
//               <p>Join writing workshops</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Image Section */}
//       <div className="grid grid-cols-12 border-t gap-1 border-primary-light/30">
//         <div className="col-span-12 lg:col-span-6 bg-primary-dark text-white overflow-hidden relative">
//           <img
//             src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
//             alt="Coastal writing inspiration"
//             className="w-full h-96 lg:h-full object-cover opacity-70"
//           />
//           <div className="absolute inset-0 bg-primary-dark/40 flex items-center justify-center p-8 lg:p-12">
//             <div className="text-center">
//               <h3 className="text-3xl font-garamond font-light mb-4">
//                 FROM THE COAST
//               </h3>
//               <p className="text-sm font-montserrat leading-relaxed opacity-90 max-w-md">
//                 Every message is an opportunity to share stories and create
//                 meaningful connections across cultures and experiences.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-12 lg:col-span-6 overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
//             alt="Ocean horizon"
//             className="w-full h-96 lg:h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import { submitContactForm } from "@/functions/services/contact/contact";
import Newsletter from "@/ui/newsletter";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Prevent submission if required fields are empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus("error");
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setSubmitStatus(null), 1000);
        }, 1000);
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactForm(formData);
      
      // Start flow: Mount element but keep invisible (opacity-0)
      setSubmitStatus("success");
      setIsVisible(false);
      
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Trigger fade-in after a slight delay to allow DOM to paint
      setTimeout(() => {
        setIsVisible(true);
        
        // Start fading out after 1 second of visibility
        setTimeout(() => {
          setIsVisible(false);
          
          // Remove from DOM after fade-out transition (1s) completes
          setTimeout(() => {
            setSubmitStatus(null);
          }, 1000);
        }, 1000);
      }, 50);

    } catch (error: any) {
      console.error("Contact form submission error:", error);
      
      // Check if it's a rate limit error
      if (error?.isRateLimited || error?.response?.status === 429) {
        const retryAfter = error?.retryAfter || error?.response?.data?.retryAfter || 900;
        
        setRemainingCooldown(retryAfter);
        
        // Set invisible first, then set status, then fade in
        setIsVisible(false);
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          setSubmitStatus("rate-limited");
          
          // Update countdown
          const interval = setInterval(() => {
            setRemainingCooldown((prev) => {
              const newRemaining = prev - 1;
              if (newRemaining <= 0) {
                clearInterval(interval);
                setIsVisible(false);
                setTimeout(() => setSubmitStatus(null), 1000);
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
      } else {
        setSubmitStatus("error");
        setIsVisible(false);
        
        setTimeout(() => {
          setIsVisible(true);
          
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              setSubmitStatus(null);
            }, 1000);
          }, 1000);
        }, 50);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-text-ui">
      {/* Hero Section */}
      <div className="grid grid-cols-12 min-h-screen">
        {/* Left Side - Title and Info */}
        <div className="col-span-12 xl:col-span-5 flex flex-col">
          {/* Header */}
          <div className="p-8 lg:p-12 border-b border-primary-light/30">
            <h1 className="text-6xl lg:text-8xl font-garamond font-light tracking-wider leading-tight">
              GET IN
              <br />
              <span className="text-heading-accent">TOUCH</span>
            </h1>
            <div className="mt-8 flex gap-8 text-sm font-montserrat uppercase tracking-widest">
              <span className="text-heading-accent">CONTACT</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="text-sm font-montserrat">
                <h3 className="font-medium mb-4 uppercase tracking-wider">
                  REACH OUT
                </h3>
                <p className="text-xs leading-relaxed text-primary-dark/80 mb-6">
                  Share your reflections, explore creative collaborations, or connect about seasonal writing and gentle storytelling.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                    RESPONSE TIME
                  </h4>
                  <p className="text-xs leading-relaxed text-primary-dark/80">
                    Typically within 24-48 hours
                  </p>
                </div>

                <div>
                  <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                    COLLABORATION
                  </h4>
                  <p className="text-xs leading-relaxed text-primary-dark/80">
                    Open to creative projects,
                    <br />
                    seasonal writing, and contemplative exchanges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-7 relative overflow-hidden min-h-[500px] xl:min-h-full">
          <div className="absolute inset-0 bg-primary-dark/20 z-10"></div>
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1765482920/contact-us-3rd-option_ahjgvu.jpg"
            alt="Writing and correspondence"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute bottom-8 left-8 text-white z-20">
            <p className="text-xs font-montserrat uppercase tracking-wider opacity-90">
              WHERE SILENCE TURNS INTO STORY
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-12 border-t border-primary-light/30">
        <div className="col-span-12 xl:col-span-8 p-8 lg:p-12">
          <div className="max-w-4xl">
            <h2 className="text-4xl lg:text-6xl font-garamond font-light mb-12 tracking-wide">
              SEND A<br />
              <span className="text-heading-accent">MESSAGE</span>
            </h2>

            <div className="space-y-8">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40 autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40 autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-3">
                <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40"
                  placeholder="What would you like to discuss?"
                />
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="block text-sm font-montserrat font-medium uppercase tracking-wider">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-0 py-4 text-base font-montserrat bg-transparent border-0 border-b-2 border-primary-light/50 focus:border-primary-dark focus:outline-none transition-colors duration-300 placeholder-primary-dark/40 resize-none"
                  placeholder="Share your thoughts, ideas, or questions..."
                />
              </div>

              <div className="pt-8">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative px-12 py-4 bg-primary-dark text-white font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:bg-text-ui disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                  </span>
                  <div className="absolute inset-0 bg-accent-warm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={`mt-6 p-6 border-l-4 transition-all duration-1000 ease-in-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } ${
                    submitStatus === "success"
                      ? "bg-primary-light/10 border-accent-cool"
                      : submitStatus === "rate-limited"
                      ? "bg-accent-warm/5 border-accent-warm"
                      : "bg-primary-dark/5 border-primary-dark"
                  }`}
                >
                  <p className="text-sm font-montserrat text-primary-dark">
                    {submitStatus === "success" ? (
                      <>
                        <span className="font-medium uppercase tracking-wider block mb-2">
                          MESSAGE SENT
                        </span>
                        Thank you for reaching out. Your message has been
                        received and I'll respond within 24-48 hours.
                      </>
                    ) : submitStatus === "rate-limited" ? (
                      <>
                        <span className="font-medium uppercase tracking-wider block mb-2">
                          PLEASE WAIT
                        </span>
                        To prevent spam, please wait {Math.floor(remainingCooldown / 60)}:
                        {String(remainingCooldown % 60).padStart(2, "0")} before
                        sending another message.
                      </>
                    ) : (
                      <>
                        <span className="font-medium uppercase tracking-wider block mb-2">
                          SUBMISSION ERROR
                        </span>
                        {!formData.name ||
                        !formData.email ||
                        !formData.subject ||
                        !formData.message
                          ? "Please fill in all required fields before submitting."
                          : "There was an issue sending your message. Please try again or reach out directly through social media."}
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 xl:col-span-4 bg-primary-light/10 p-8 lg:p-12">
          <h3 className="text-2xl font-garamond font-light mb-8">CONNECT</h3>

          <div className="space-y-8">
            <div className="border-l-2 border-primary-dark pl-6">
              <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                CREATIVE INQUIRIES
              </h4>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                Seasonal writing collaborations, gentle storytelling projects, and contemplative workshops.
              </p>
            </div>

            <div className="border-l-2 border-accent-warm pl-6">
              <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                THOUGHTFUL PROJECTS
              </h4>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                Exploring themes of impermanence, creative exchanges, and mindful writing initiatives.
              </p>
            </div>

            <div className="border-l-2 border-accent-cool pl-6">
              <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-2">
                SPEAKING & SHARING
              </h4>
              <p className="text-xs leading-relaxed text-primary-dark/80">
                Conversations on seasonal writing, creative gatherings, and literary reflections.
              </p>
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-12 pt-8 border-t border-primary-light/30">
            <h4 className="font-montserrat font-medium text-sm uppercase tracking-wider mb-4">
              OTHER WAYS TO CONNECT
            </h4>
            <div className="space-y-3 text-xs text-primary-dark/80">
              <p>Follow seasonal reflections on social media</p>
              <p>Subscribe for gentle monthly writings</p>
              <p>Join contemplative writing circles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image Section */}
      <div className="grid grid-cols-12 border-t gap-1 border-primary-light/30">
        <div className="col-span-12 md:col-span-6 bg-primary-dark text-white overflow-hidden relative min-h-[400px] lg:min-h-[500px]">
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/v1764268024/from-the-coast-left_lvfbfq.jpg"
            alt="Coastal writing inspiration"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-primary-dark/40 flex items-center justify-center p-8 lg:p-12 z-10">
            <div className="text-center">
              <h3 className="text-3xl font-garamond font-light mb-4">
                SPACES BETWEEN CHANGE
              </h3>
              <p className="text-sm font-montserrat leading-relaxed opacity-90 max-w-md mx-auto">
                Every message is an invitation to connect, reflect, and explore the gentle rhythm of seasonal writing together.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 overflow-hidden relative min-h-[400px] lg:min-h-[500px]">
          <Image
            src="https://res.cloudinary.com/dwtbvdlzg/image/upload/w_800,h_600,c_fill/v1764268024/from-the-coast-right_f9k1gy.jpg"
            alt="Cherry blossoms"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      </div>
    </PageTransition>
  );
};

export default ContactUsPage;
