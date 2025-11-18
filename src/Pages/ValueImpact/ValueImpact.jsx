import React, { useEffect, useRef } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import CountUp from "react-countup";
import SectionHeader from "../../Component/Shared/SectionHeader";
import {
  FaBroom,
  FaCity,
  FaLeaf,
  FaLightbulb,
  FaRecycle,
  FaTree,
  FaUsers,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

const stats = [
  {
    icon: <FaBroom className="text-primary text-4xl" />,
    end: 50,
    label: "Cleaned Areas",
  },
  {
    icon: <FaTree className="text-success text-4xl" />,
    end: 1000,
    label: "Trees Planted",
  },
  {
    icon: <FaUsers className="text-info text-4xl" />,
    end: 500,
    label: "Volunteers",
  },
  {
    icon: <FaCity className="text-warning text-4xl" />,
    end: 10,
    label: "City Campaigns",
  },
];
const ValueImpact = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP card animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      }
    );
  }, []);
  return (
    <div className="bg-base-200 pb-20">
      {/* Our Core Values */}
      <section className="text-center mb-24">
        <Zoom triggerOnce>
          <div className="text-center py-12 md:py-16 lg:py-20">
            {/* Title with typewriter effect */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Core{" "}
              <span className="text-primary">
                <Typewriter
                  words={["Values", "Beliefs", "Principles", "Ideals"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={90}
                  deleteSpeed={50}
                  delaySpeed={1200}
                />
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Guided by honesty, compassion, and dedication — our values form
              the foundation of everything we do. We believe in delivering
              excellence, fostering trust, and making a meaningful impact in
              every step.
            </p>
          </div>
        </Zoom>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              icon: <FaRecycle size={40} className="text-primary" />,
              title: "Responsibility",
              desc: "Cleanliness is everyone's responsibility.",
            },
            {
              icon: <FaLeaf size={40} className="text-success" />,
              title: "Sustainability",
              desc: "We care for the planet and our future.",
            },
            {
              icon: <FaUsers size={40} className="text-info" />,
              title: "Community",
              desc: "Together, we can make a difference.",
            },
            {
              icon: <FaLightbulb size={40} className="text-warning" />,
              title: "Innovation",
              desc: "Creative solutions for a cleaner world.",
            },
          ].map((value, i) => (
            <Fade key={i} triggerOnce>
              <div className="bg-base-100 p-8 rounded-2xl shadow-md border border-base-300 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-2 duration-300">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-base-content/70">{value.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* 🌱 Our Impact Section */}
      <section className="relative text-center max-w-6xl mx-auto px-6 my-16">
        {/* Header */}
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-center mt-4">
            Our{" "}
            <span className="text-primary">
              <Typewriter
                words={["Impact", "Contribution", "Journey", "Initiative"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1300}
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto pt-3 pb-6 text-center">
            Together, we’re creating a cleaner, greener, and more responsible
            Bangladesh — one action at a time.
          </p>
        </Fade>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
          {stats.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-base-100 p-8 rounded-2xl shadow-md border border-base-300 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-3 duration-500 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-125 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-base-content mb-1">
                <CountUp
                  end={item.end}
                  duration={2.5}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                +
              </h3>
              <p className="text-sm text-base-content/70 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ValueImpact;
