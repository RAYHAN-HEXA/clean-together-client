import React from "react";
import { FaHandsHelping } from "react-icons/fa";
import SectionHeader from "../../Component/Shared/SectionHeader";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";

const JoinCleanDrive = () => {
  return (
    <section className="bg-primary/10 py-16 pt-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex flex-col items-center justify-center"
        >
          {/* Icon */}
          <FaHandsHelping className="text-primary text-6xl mb-4 animate-bounce" />

          {/* Header with Typewriter effect */}
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Join Our Next{" "}
            <span className="text-primary">
              <Typewriter
                words={["Clean Drive", "Green Mission", "Eco Movement"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1300}
              />
            </span>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Become a part of our mission to make our communities cleaner and
            healthier. Every small effort counts — together we can make a big
            impact!
          </p>

          {/* Button */}
          <Link
            to="/about"
            data-aos="zoom-in"
            data-aos-delay="200"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-500 ease-in-out hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinCleanDrive;
