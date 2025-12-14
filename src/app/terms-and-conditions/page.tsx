import React from "react";
import Image from "next/image";

const TermsAndConditionsPage = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const termsSections = [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      content: (
        <p>
          Welcome to Haru Memoirs ("Website"). By accessing or using our
          Website, you agree to be bound by these Terms and Conditions and our
          Privacy Policy. If you do not agree to all of these terms, do not use
          this Website.
        </p>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: (
        <>
          <p className="mb-6">
            Unless otherwise stated, Haru Memoirs and/or its licensors own
            the intellectual property rights for all material on this Website.
            All intellectual property rights are reserved. This includes, but is
            not limited to:
          </p>
          <ul className="space-y-3 list-disc list-outside ml-5 mb-6">
            <li>Text, articles, and blog posts</li>
            <li>Graphics, logos, and images</li>
            <li>Website design and layout</li>
          </ul>
          <p>
            You may view and/or print pages from the Website for your own
            personal use, subject to the restrictions set in these terms and
            conditions.
          </p>
        </>
      ),
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: (
        <>
          <p className="mb-6">You agree not to use the Website to:</p>
          <ul className="space-y-3 list-disc list-outside ml-5">
            <li>
              Post any material that is abusive, defamatory, obscene, or
              hateful.
            </li>
            <li>Engage in any activity that is illegal or fraudulent.</li>
            <li>
              Upload or transmit viruses or any other type of malicious code.
            </li>
            <li>
              Engage in spamming or post unauthorized commercial communications.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "user-generated-content",
      title: "User-Generated Content",
      content: (
        <p>
          In these terms and conditions, "your user content" means material
          (including without limitation text, images, audio material) that you
          submit to this website, for whatever purpose (e.g., comments). You
          grant to Haru Memoirs a worldwide, irrevocable, non-exclusive,
          royalty-free license to use, reproduce, and edit any of your user
          content. We reserve the right to remove any of your content from this
          Website at any time, and for any reason, without notice.
        </p>
      ),
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      content: (
        <p>
          Your privacy is important to us. Our Privacy Policy explains how we
          collect, use, and protect your information when you use our Website.
          By using our Website, you agree to the collection and use of
          information in accordance with our Privacy Policy.
        </p>
      ),
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      content: (
        <p>
          In no event shall Haru Memoirs, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from your use of the Website.
        </p>
      ),
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      content: (
        <p>
          The information on this Website is provided "as is," with no
          warranties, express or implied. The content is for informational
          purposes only and should not be considered professional advice.
          Haru Memoirs makes no representations or warranties in relation to
          this Website or the information and materials provided.
        </p>
      ),
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      content: (
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will try to
          provide at least 30 days notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>
      ),
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: (
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:contact@harumemoirs.com"
            className="text-accent-warm hover:text-primary-dark font-medium transition-colors duration-300 group inline-flex items-center"
          >
            contact@harumemoirs.com
          </a>{" "}
          or through our contact form.
        </p>
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
                  LEGAL INFORMATION
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-garamond font-light text-text-ui leading-tight mb-8">
                LEGAL
                <br />
                <span className="text-heading-accent">TERMS</span>
              </h1>

              <p className="text-lg font-montserrat leading-relaxed text-primary-dark/80 mb-8">
                These terms govern your use of Haru Memoirs and outline the
                rights and responsibilities for all visitors and users of our
                platform.
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
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop"
              alt="Legal documents"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-primary-dark/10"></div>
            <div className="absolute bottom-8 left-8 text-primary-dark">
              <p className="text-sm font-montserrat opacity-90">
                Protecting our community
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
                      {termsSections.map((section, index) => (
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

            {/* Terms Content - Full width on mobile and tablet */}
            <div className="col-span-1 lg:col-span-8">
              <div className="space-y-16">
                {termsSections.map((section, index) => (
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
                    {index < termsSections.length - 1 && (
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

export default TermsAndConditionsPage;
