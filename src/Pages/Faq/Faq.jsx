import React, { useEffect } from "react";

const Faq = () => {
  useEffect(() => {
    // Accordion Logic: Only one open at a time
    const details = document.querySelectorAll("#faqAccordion details");

    details.forEach((targetDetail) => {
      const icon = targetDetail.querySelector("summary span:last-child");

      targetDetail.addEventListener("toggle", () => {
        // Close others
        if (targetDetail.open) {
          details.forEach((detail) => {
            if (detail !== targetDetail) {
              detail.open = false;
              const otherIcon = detail.querySelector("summary span:last-child");
              if (otherIcon) otherIcon.textContent = "+";
            }
          });
          // Change this icon to minus
          if (icon) icon.textContent = "−";
        } else {
          // Change this icon back to plus when closed
          if (icon) icon.textContent = "+";
        }
      });
    });
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 bg-base-200 transition-all duration-300">
      <div className="container mx-auto">
        <div className="flex justify-center flex-col lg:flex-row gap-10 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co.com/62gF5Cy/faq.jpg"
              alt="FAQ Illustration"
              className="w-full max-w-3xl lg:max-w-lg rounded-3xl hover:scale-105 transition-transform duration-300 shadow-xl"
            />
          </div>

          {/* Right Side FAQ */}
          <section className="py-10 px-4 sm:px-6 transition-all duration-300 w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 leading-tight">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>

            <div
              className="space-y-5 mt-5"
              id="faqAccordion"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              {/* FAQ Item */}
              <details className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary">
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center select-none">
                  <span>What is CleanTogether?</span>
                  <span className="text-xl text-primary/60    transition-all duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-base-content/80 leading-relaxed">
                  CleanTogether is a community-driven platform where citizens can
                  report public issues such as garbage, road damage, illegal
                  constructions, and other civic problems to raise awareness and
                  help local authorities take action.
                </p>
              </details>

              <details className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary">
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center select-none">
                  <span>How can I report an issue?</span>
                  <span className="text-xl text-primary/60    transition-all duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-base-content/80 leading-relaxed">
                  Simply log in to your CleanTogether account, go to the “Add
                  Issue” page, fill in the problem details, upload an image
                  (optional), and submit it. Your report will be visible to
                  others and can be tracked from your dashboard.
                </p>
              </details>

              <details className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary">
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center select-none">
                  <span>Is CleanTogether free to use?</span>
                  <span className="text-xl text-primary/60    transition-all duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-base-content/80 leading-relaxed">
                  Yes! CleanTogether is completely free for all users. Our mission
                  is to promote community awareness and encourage responsible
                  reporting for a cleaner and safer Bangladesh.
                </p>
              </details>

              <details className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary">
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center select-none">
                  <span>Can I track the progress of my reported issue?</span>
                  <span className="text-xl text-primary/60    transition-all duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-base-content/80 leading-relaxed">
                  Absolutely! You can visit the “My Issues” section after
                  logging in to see the current status of your submitted
                  reports, updates, and any community contributions.
                </p>
              </details>

              <details className="bg-base-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary">
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center select-none">
                  <span>Who can view the reported issues?</span>
                  <span className="text-xl text-primary/60   transition-all duration-200">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-base-content/80 leading-relaxed">
                  All reported issues are publicly visible on the “All Issues”
                  page so that other citizens and organizations can stay
                  informed and take collective steps toward resolving them.
                </p>
              </details>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Faq;
