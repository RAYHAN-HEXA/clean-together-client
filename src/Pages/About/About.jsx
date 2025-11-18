// AboutPage.jsx
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import CountUp from "react-countup";
import {
  FaRecycle,
  FaLeaf,
  FaUsers,
  FaLightbulb,
  FaBroom,
  FaTree,
  FaCity,
} from "react-icons/fa";
import SectionHeader from "../../Component/Shared/SectionHeader";
import Faq from "../Faq/Faq";

/**
 * Industry-level About Page
 * - Tailwind for layout & styling
 * - AOS for scroll animations (cards, sections)
 * - GSAP for one-time hero entrance polish
 * - Typewriter for cycling titles (one-by-one effect)
 *
 * Required packages:
 * npm i aos gsap react-simple-typewriter react-awesome-reveal react-countup react-icons
 *
 * Note:
 * - Ensure Tailwind is configured in your project.
 * - You can tune AOS settings in useEffect or via data-aos attributes.
 */

/* ---------------------------
   Content data (easily editable)
   --------------------------- */
const STEPS = [
  {
    id: "01",
    title: "Provide Details",
    desc: "Tell us what, where and when — attach a picture if possible.",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPfE-1OWIxpaheFnlXNoKaQHRD8bOArIoObkO8nDHeGUw2UqHG",
  },
  {
    id: "02",
    title: "Choose Plan",
    desc: "Pick a plan or let us recommend the best action for your issue.",
    img: "data:image/jpeg;base64,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",
  },
  {
    id: "03",
    title: "We Take Action",
    desc: "Local volunteers & partners step in to clean and restore the area.",
    img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSw6jffwgSq2t20RgIg3w1zIXyqDQjUHxo-530Rux4HHkVNFZrN",
  },
  {
    id: "04",
    title: "Enjoy & Inspire",
    desc: "Share results, inspire others and help the movement grow.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUmnNQVqDxfpsPs6awK0_APwFqdwdJ-wH76lTI8rpGefDyPSd8",
  },
];

const CORE_VALUES = [
  {
    icon: <FaRecycle size={40} className="text-primary" />,
    title: "Responsibility",
    desc: "Every citizen plays a part.",
  },
  {
    icon: <FaLeaf size={40} className="text-green-500" />,
    title: "Sustainability",
    desc: "Long-term solutions for the planet.",
  },
  {
    icon: <FaUsers size={40} className="text-blue-500" />,
    title: "Community",
    desc: "Together we achieve more.",
  },
  {
    icon: <FaLightbulb size={40} className="text-yellow-500" />,
    title: "Innovation",
    desc: "Creative ways to solve civic issues.",
  },
];

/* ---------------------------
   Component
   --------------------------- */
const AboutPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP hero entrance (one-time)
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="bg-base-200 text-base-content">
      <title>About - CleanTogether</title>
      {/* =========================
         HERO / ABOUT US SECTION
         ========================= */}
      <section
        aria-label="About hero"
        className="relative min-h-[72vh] flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Background image (subtle, blurred) */}
        <div
          className="absolute inset-0 bg-black/75 bg-cover bg-center opacity-20 scale-105 filter blur-sm"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OH7nL0RGqUv_aKfuH0hI40zpqbELR7iXlhoi-2psiOTLJML6')",
          }}
          aria-hidden
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/45" aria-hidden />

        {/* Content box */}
        <div
          ref={heroRef}
          className="relative max-w-5xl mx-auto text-left z-10 py-12"
        >
          {/* Typewriter Title (one-by-one) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            <Typewriter
              words={[
                "About Us",
                "The CleanTogether Movement",
                "Join the Change",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </h1>

          {/* Short description */}
          <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed mb-6">
            CleanTogether is a people-first civic movement — reporting issues,
            coordinating local action and building cleaner communities across
            Bangladesh through simple technology and community power.
          </p>

          {/* Call to action (breadcrumb-like) */}
          <div className="flex gap-4 items-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2 text-white font-semibold transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Home
            </a>

            <span className="text-white/70">→</span>

            <button
              className="rounded-full px-6 py-2 bg-transparent border-2 border-white/20 text-white/90 font-medium hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-current="page"
              aria-label="About page"
            >
              About
            </button>
          </div>
        </div>
      </section>

      {/* =========================
         STEPS / HOW IT WORKS
         ========================= */}
      <section
        aria-label="How it works"
        className="pb-20 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionHeader
            title={
              <Typewriter
                words={["Get Cleaner Space", "in Four Easy Steps"]}
                loop={true}
                cursor
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1400}
              />
            }
            description={
              "Report an issue, choose a plan, let the community act — then enjoy a cleaner space. Simple, transparent, and community-driven."
            }
            titleProps={{ className: "text-gray-900 font-extrabold" }}
            descProps={{ className: "text-gray-600" }}
          />
        </div>

        {/* responsive grid of cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className="bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300 "
              data-aos="fade-up"
              data-aos-duration="3000"
              aria-labelledby={`step-title-${s.id}`}
            >
              <div className="relative h-48">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  {s.id}
                </div>
              </div>

              <div className="p-5">
                <h3
                  id={`step-title-${s.id}`}
                  className="text-lg font-semibold text-gray-900 mb-2"
                >
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
         OUR STORY (centered with image)
         ========================= */}
      <section
        aria-label="Our story"
        className="bg-base-200 pb-20 px-6 md:px-12"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <SectionHeader
              title={<Typewriter words={["Our Story"]} loop={false} cursor />}
              description={
                "CleanTogether started when a small group of youth decided to stop complaining and start fixing. From one street clean-up to many city campaigns, we've grown by mobilizing neighbors, volunteers, and local authorities to act together."
              }
              titleProps={{ className: "text-primary" }}
              descProps={{
                className:
                  "text-base-content/70 leading-relaxed text-[17px] mb-6",
              }}
            />

            <div className="flex gap-8">
              <div>
                <h3 className="text-3xl font-extrabold text-green-500">10k+</h3>
                <p className="text-sm text-base-content/60">Issues Reported</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-green-500">95%</h3>
                <p className="text-sm text-base-content/60">
                  Community Engagement
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300"
              data-aos="zoom-in"
              data-aos-delay="120"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-pBsBzJY9buWVCpBSnMy2VdUwcLBizM_Ww&s"
                alt="Our story"
                className="w-full h-[360px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
         MISSION + CORE VALUES
         ========================= */}
      <section
        aria-label="Mission and core values"
        className="bg-base-200 pb-20 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto grid  md:grid-cols-2 gap-12 items-center">
          {/* Mission image */}
          <div data-aos="fade-right">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0cTLab6CmyNZx5N5vru6Jbjhxt8UJ7cCM2lg9wUi9CfcARhGTWMoyR8Q&s"
              alt="Mission"
              className=" rounded-2xl shadow-2xl object-contain w-96"
              loading="lazy"
            />
          </div>

          {/* Mission text + values */}
          <div data-aos="fade-left" data-aos-delay="80">
            <SectionHeader
              title={<Typewriter words={["Our Mission"]} loop={false} cursor />}
              description={
                "To empower citizens with simple tools to report civic issues, encourage transparency, and collaborate with local stakeholders for long-term, sustainable improvements."
              }
              titleProps={{ className: "text-primary" }}
              descProps={{
                className: "text-base-content/70 leading-relaxed mb-6",
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CORE_VALUES.map((v, i) => (
                <div
                  key={i}
                  className="bg-base-200 p-5 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="flex items-center gap-4">
                    {v.icon}
                    <div>
                      <h4 className="font-semibold">{v.title}</h4>
                      <p className="text-sm text-base-content/70">{v.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
         TEAM
         ========================= */}
      <section className="pb-20 px-6 md:px-12 bg-base-200">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <SectionHeader
            title={<Typewriter words={["Meet Our Team"]} loop={false} cursor />}
            description={
              "A small, dedicated team working across cities and communities."
            }
            titleProps={{ className: "text-primary font-bold" }}
            descProps={{ className: "text-base-content/70 mt-3" }}
          />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sakib Ahmed",
              role: "Founder & Leader",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
            {
              name: "Nusrat Jahan",
              role: "Coordinator",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Rafiul Islam",
              role: "Campaign Manager",
              img: "https://randomuser.me/api/portraits/men/52.jpg",
            },
          ].map((m, i) => (
            <article
              key={m.name}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary/50"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-center">{m.name}</h3>
              <p className="text-primary text-center">{m.role}</p>
            </article>
          ))}
        </div>
      </section>
      <Faq></Faq>
    </div>
  );
};

export default AboutPage;
