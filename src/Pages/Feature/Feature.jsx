import React, { useEffect } from "react";
import {
  FaMapMarkedAlt,
  FaUsers,
  FaHandsHelping,
  FaChartLine,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";
import Newsletter from "../NewsLetter/NewsLetter";
import SectionHeader from "../../Component/Shared/SectionHeader";

const Feature = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <div className="w-full bg-base-200">
      {/* Helmet */}
      <title>Features - CleanTogether</title>
      {/* Features Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-10 container mx-auto">
        <div className="text-center mb-8">
          <SectionHeader
            title={
              <>
                Why Choose
                <span className="ml-2 text-primary">
                  <Typewriter
                    words={["", "CleanTogether ", " for Clean Communities"]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={40}
                  />
                </span>
              </>
            }
            description={
              "Empowering citizens to report, track, and resolve local cleanliness issues — fast, transparently, and together."
            }
            titleProps={{
              "data-aos": "fade-down",
              "data-aos-duration": "800",
              className: "heading-font",
            }}
            descProps={{
              "data-aos": "fade-up",
              "data-aos-duration": "900",
              className: "text-lg font-medium max-w-2xl mx-auto",
            }}
          />
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Card 1 - Local Reporting */}
          <div className="p-6 border-t-4 border-primary/50 hover:border-primary hover:-translate-y-1 text-center group card w-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl bg-base-300/70">
            <div className="flex justify-center mb-4">
              <FaMapMarkedAlt className="text-5xl text-primary transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Report Locally</h3>
            <p className="text-sm md:text-base transition-colors duration-300">
              Quickly report garbage, illegal dumping, and damaged public
              property with photos and accurate locations.
            </p>
          </div>

          {/* Card 2 - Volunteer Community */}
          <div className="p-6 border-t-4 border-primary/50 hover:border-primary hover:-translate-y-1 text-center group card w-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl bg-base-300/70">
            <div className="flex justify-center mb-4">
              <FaHandsHelping className="text-5xl text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Community & Volunteers
            </h3>
            <p className="text-sm md:text-base">
              Join cleanup drives, coordinate volunteers, and track local
              campaigns to keep neighborhoods clean.
            </p>
          </div>

          {/* Card 3 - Transparent Tracking */}
          <div className="p-6 border-t-4 border-primary/50 hover:border-primary hover:-translate-y-1 text-center group card w-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl bg-base-300/70">
            <div className="flex justify-center mb-4">
              <FaChartLine className="text-5xl text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent Tracking</h3>
            <p className="text-sm md:text-base">
              Monitor reports, view resolution status, and see measurable impact
              across communities.
            </p>
          </div>

          {/* Card 4 - Trusted Network */}
          <div className="p-6 border-t-4 border-primary/50 hover:border-primary hover:-translate-y-1 text-center group card w-full shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl bg-base-300/70">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-5xl text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
            <p className="text-sm md:text-base">
              Collaborate with local authorities, NGOs, and neighbors for
              faster, coordinated action.
            </p>
          </div>
        </div>
      </section>
      {/*  */}
      {/*  */}
      <Newsletter></Newsletter>
    </div>
  );
};

export default Feature;
