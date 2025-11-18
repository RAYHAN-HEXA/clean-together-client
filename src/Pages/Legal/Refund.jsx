import React from "react";
import SectionHeader from "../../Component/Shared/SectionHeader";

const Refund = () => {
  return (
    <div className="bg-base-200 min-h-screen py-16">
      <title>Refund - CleanTogether</title>
      <div className="container mx-auto px-4">
        <SectionHeader
          title={"Refund & Support Policy"}
          description={
            "Information about refunds, dispute resolution, and support for CleanTogether transactions and donations."
          }
          titleProps={{ className: "heading-font text-primary" }}
          descProps={{
            className: "text-base-content/70 max-w-3xl mx-auto mb-8",
          }}
        />

        <article className="bg-base-100 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Donations & payments</h3>
            <p className="text-base-content/70 leading-relaxed">
              Donations or payments processed through CleanTogether are generally
              non-refundable unless explicitly stated. For paid services,
              refunds may be granted in case of processing errors.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Requesting a refund</h3>
            <p className="text-base-content/70 leading-relaxed">
              To request a refund, please contact our support team with your
              transaction details and reason. We'll evaluate and respond within
              7 business days.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Dispute resolution</h3>
            <p className="text-base-content/70 leading-relaxed">
              If you have a dispute, please reach out to support first so we can
              attempt resolution. External dispute mechanisms may be used if
              internal resolution is not possible.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Contact support</h3>
            <p className="text-base-content/70 leading-relaxed">
              Email{" "}
              <a
                className="text-primary font-semibold"
                href="mailto:support@CleanTogether.org"
              >
                support@CleanTogether.org
              </a>{" "}
              with transaction details to start a refund or support request.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Refund;
