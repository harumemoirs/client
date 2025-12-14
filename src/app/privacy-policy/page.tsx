import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const PrivacyPolicyPage = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const policySections = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <p>
          Welcome to Haru Memoirs. We are committed to protecting your
          personal information and your right to privacy. If you have any
          questions or concerns about this privacy notice, or our practices with
          regards to your personal information, please contact us. This privacy
          policy applies to all information collected through our website.
        </p>
      ),
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-6">
            We collect personal information that you voluntarily provide to us
            when you subscribe to our newsletter, leave comments on the blog, or
            otherwise contact us. The personal information we collect may
            include the following:
          </p>
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>
              <strong>Personal Information You Disclose to Us:</strong> We
              collect names and email addresses when you subscribe to our
              newsletter or contact us.
            </li>
            <li>
              <strong>Content You Provide:</strong> We collect comments and
              other content you voluntarily submit to the blog.
            </li>
            <li>
              <strong>Information Automatically Collected:</strong> We
              automatically collect certain information when you visit, use, or
              navigate the website. This information may include device and
              usage information, such as your IP address, browser and device
              characteristics, operating system, and referring URLs.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-6">
            We use the information we collect or receive for the following
            purposes:
          </p>
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>
              <strong>
                To send you marketing and promotional communications.
              </strong>{" "}
              We may use the personal information you send to us for our
              marketing purposes, if this is in accordance with your marketing
              preferences. You can opt-out of our marketing emails at any time.
            </li>
            <li>
              <strong>To respond to your inquiries</strong> and solve any
              potential issues you might have.
            </li>
            <li>
              <strong>To improve our website.</strong> We may use your
              information to analyze website traffic and user behavior to
              improve our content and user experience.
            </li>
            <li>
              <strong>To protect our Services.</strong> We may use your
              information as part of our efforts to keep our website safe and
              secure (for example, for fraud monitoring and prevention).
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "sharing-information",
      title: "Sharing Your Information",
      content: (
        <>
          <p className="mb-6">
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations. More specifically, we may need to process or
            share your data based on the following legal basis:
          </p>
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>
              <strong>Consent:</strong> We may process your data if you have
              given us specific consent to use your personal information in a
              specific purpose.
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content: (
        <p>
          We may use cookies and similar tracking technologies to access or
          store information. We use analytics partners to help analyze usage and
          traffic for our Services. As an example, we may use analytics partners
          to analyze and measure, in the aggregate, the number of unique
          visitors to our Services. You can set your browser to refuse all or
          some browser cookies, or to alert you when cookies are being sent.
        </p>
      ),
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: (
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy policy, unless a
          longer retention period is required or permitted by law. We will
          delete your personal information when we no longer need it for our
          business purposes or when you request deletion, subject to certain
          legal obligations.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      content: (
        <>
          <p className="mb-6">
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>
              The right to access and receive a copy of your personal
              information
            </li>
            <li>The right to rectify or update your personal information</li>
            <li>The right to delete your personal information</li>
            <li>
              The right to restrict the processing of your personal information
            </li>
            <li>
              The right to opt-out of the sale of your personal information
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "updates-to-policy",
      title: "Updates to This Policy",
      content: (
        <p>
          We may update this privacy policy from time to time. The updated
          version will be indicated by an updated "Last updated" date and the
          updated version will be effective as soon as it is accessible. If we
          make material changes to this privacy policy, we may notify you either
          by prominently posting a notice of such changes or by directly sending
          you a notification.
        </p>
      ),
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: (
        <>
          <p className="mb-6">
            If you have questions or comments about this privacy policy, you may
            email us at{" "}
            <a
              href="mailto:contact@harumemoirs.com"
              className="text-accent-warm hover:text-primary-dark font-medium transition-colors duration-300 group inline-flex items-center"
            >
              contact@harumemoirs.com
              <ArrowUpRight
                size={16}
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>{" "}
            or through our contact form.
          </p>
          <div className="border-l-4 border-accent-warm pl-6 py-2">
            <p className="font-montserrat text-base leading-relaxed text-primary-dark/90 italic">
              Haru Memoirs
              <br />
              [Your Business Address Here]
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-ui">
      {/* Hero Section */}
      <section className="border-b border-primary-light/30">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-accent-warm"></div>
                <span className="text-sm font-montserrat uppercase tracking-widest text-primary-dark/70">
                  PRIVACY INFORMATION
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-garamond font-light text-text-ui leading-tight mb-8">
                PRIVACY
                <br />
                <span className="text-heading-accent">POLICY</span>
              </h1>

              <p className="text-lg font-montserrat leading-relaxed text-primary-dark/80 mb-8">
                We are committed to protecting your personal information and
                your right to privacy. Learn how we collect, use, and safeguard
                your data when you visit our platform.
              </p>

              <div className="bg-primary-light/10 p-6 border border-primary-light/30">
                <p className="text-sm font-montserrat text-primary-dark/80">
                  <strong>Last updated:</strong> {currentDate}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-primary-light/10 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop"
              alt="Privacy and security"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-primary-dark/10"></div>
            <div className="absolute bottom-8 left-8 text-primary-dark">
              <p className="text-sm font-montserrat opacity-90">
                Your privacy matters to us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sticky Table of Contents - Hidden on mobile and tablet */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="bg-primary-light/5 p-8 border border-primary-light/30">
                  <h3 className="text-lg font-garamond font-light text-primary-dark mb-6">
                    TABLE OF CONTENTS
                  </h3>
                  <nav>
                    <ul className="space-y-4">
                      {policySections.map((section, index) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="group flex items-start gap-3 py-2"
                          >
                            <span className="text-xs font-montserrat text-accent-warm mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm font-montserrat text-primary-dark/80 group-hover:text-primary-dark transition-colors duration-300">
                              {section.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Privacy Policy Content - Full width on mobile and tablet */}
            <div className="col-span-1 lg:col-span-8">
              <div className="space-y-16">
                {policySections.map((section, index) => (
                  <article key={section.id} id={section.id} className="group">
                    {/* Section Header */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-6 mb-6">
                        <span className="text-4xl font-garamond font-light text-accent-warm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h2 className="text-3xl lg:text-4xl font-garamond font-light text-primary-dark leading-tight mb-4">
                            {section.title}
                          </h2>
                          <div className="w-16 h-px bg-primary-light/50 group-hover:w-32 group-hover:bg-accent-warm transition-all duration-500"></div>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="pl-16 font-montserrat text-base leading-relaxed text-primary-dark/90">
                      {section.content}
                    </div>

                    {/* Section Divider */}
                    {index < policySections.length - 1 && (
                      <div className="mt-16 pt-16 border-t border-primary-light/20"></div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
