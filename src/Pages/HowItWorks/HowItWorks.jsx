import React from "react";
import logo from "../../../public/logo.png";
import { Fade, Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const HowItWorks = () => {
  return (
    <section className=" bg-base-200  text-base-content">
      <div className="px-4 container py-12 md:py-16 lg:pb-20 mx-auto  text-center">
        {/* Section Title */}
        <Fade direction="up" triggerOnce>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4  leading-tight
">
            How CleanTogether
            <span className="text-primary">
              <Typewriter
                words={[" Works", " Helps", " Impacts"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1200}
              />
            </span>
          </h2>
          <p
            className="text-base-content/70 max-w-2xl mx-auto pt-3 pb-6
"
            data-aos="fade-up"
          >
            Discover how CleanTogether helps you report, track, and resolve
            community issues easily. The process is{" "}
            <span className="font-semibold text-primary">simple</span>,{" "}
            <span className="font-semibold text-primary">safe</span>, and{" "}
            <span className="font-semibold text-primary">impactful</span> for
            everyone.
          </p>
        </Fade>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side (Step 1 & 2) */}
          <Fade direction="left" cascade damping={0.2} triggerOnce>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-base-100 shadow-md rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-r-4 border-primary/60 hover:border-primary hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/20 text-primary rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Create an Account</h3>
                </div>
                <p className="text-base-content/80">
                  Sign up quickly and set up your profile to start reporting
                  local issues in your community.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-base-100 shadow-md rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-r-4 border-primary/60 hover:border-primary hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/20 text-primary rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Report an Issue</h3>
                </div>
                <p className="text-base-content/80">
                  Post your community concern with images and location to alert
                  authorities or volunteers.
                </p>
              </div>
            </div>
          </Fade>

          {/* Center Logo */}
          <Zoom triggerOnce>
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt="CleanTogether Logo"
                className="h-96 w-auto  bg-primary  rounded-2xl shadow-xl p-6"
              />
            </div>
          </Zoom>

          {/* Right side (Step 3 & 4) */}
          <Fade direction="right" cascade damping={0.2} triggerOnce>
            <div className="space-y-8">
              {/* Step 3 */}
              <div className="bg-base-100 shadow-md rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/20 text-primary rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Track & Support</h3>
                </div>
                <p className="text-base-content/80">
                  Follow progress on reported issues and support cleanup drives
                  or awareness campaigns.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-base-100 shadow-md rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 border-l-4 border-primary/60 hover:border-primary hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/20 text-primary rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">Make a Difference</h3>
                </div>
                <p className="text-base-content/80">
                  Join others in keeping your city clean and safe — together we
                  build a better community!
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
