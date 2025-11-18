import React from "react";
import SectionHeader from "../../Component/Shared/SectionHeader";

const Privacy = () => {
  return (
    <div className="bg-base-200 min-h-screen py-16">
      <title>Privacy - CleanTogether</title>
      <div className="container mx-auto px-4">
        <SectionHeader
          title={"Privacy Policy"}
          description={
            "Your privacy matters. This policy explains how CleanTogether collects, uses, and protects your information."
          }
          titleProps={{ className: "heading-font text-primary" }}
          descProps={{
            className: "text-base-content/70 max-w-3xl mx-auto mb-8",
          }}
        />

        <article className="bg-base-100 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Information we collect
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              We collect information you provide when reporting issues (e.g.,
              description, location, images) and account information such as
              email. We may also collect usage data to improve the service.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">How we use your data</h3>
            <p className="text-base-content/70 leading-relaxed">
              Data is used to process reports, coordinate responses, and
              communicate with volunteers and authorities. We do not sell
              personal data to third parties.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Data retention & security
            </h3>
            <p className="text-base-content/70 leading-relaxed">
              We retain data as necessary for the purposes described and take
              reasonable security measures to protect information. No system is
              perfect — please exercise caution when sharing sensitive data.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Your rights</h3>
            <p className="text-base-content/70 leading-relaxed">
              You may request access, correction, or deletion of your personal
              data by contacting us at
              <a
                className="text-primary font-semibold ml-1"
                href="mailto:privacy@CleanTogether.org"
              >
                privacy@CleanTogether.org
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Privacy;
