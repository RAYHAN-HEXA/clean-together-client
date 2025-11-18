import React from "react";
import SectionHeader from "../../Component/Shared/SectionHeader";

const Terms = () => {
  return (
    <div className="bg-base-200 min-h-screen py-16">
      <title>Terms - CleanTogether</title>
      <div className="container mx-auto px-4">
        <SectionHeader
          title={"Terms & Conditions"}
          description={
            "Please read these terms and conditions carefully before using the CleanTogether platform."
          }
          titleProps={{ className: "heading-font text-primary" }}
          descProps={{
            className: "text-base-content/70 max-w-3xl mx-auto mb-8",
          }}
        />

        <article className="bg-base-100 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Acceptance of terms</h3>
            <p className="text-base-content/70 leading-relaxed">
              By accessing or using CleanTogether, you agree to be bound by these
              Terms and all applicable laws. If you disagree with any part of
              the terms, you must not use the service.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              User responsibilities
            </h3>
            <ul className="list-disc list-inside text-base-content/70 leading-relaxed">
              <li>Provide accurate information when reporting issues.</li>
              <li>
                Respect privacy and do not post content that violates others'
                rights.
              </li>
              <li>
                Do not use the platform for illegal or malicious activities.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Content and moderation
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              CleanTogether may review, moderate, and remove content that violates
              the terms or community guidelines. We do not guarantee action on
              every report, but we encourage accurate and constructive reports.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Limitation of liability
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              To the extent permitted by law, CleanTogether is not liable for any
              indirect or consequential damages arising from use of the
              platform. Use at your own risk.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p className="text-base-content/70 leading-relaxed">
              If you have questions about these Terms, contact us at
              <a
                className="text-primary font-semibold ml-1"
                href="mailto:contact@CleanTogether.org"
              >
                contact@CleanTogether.org
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Terms;
