import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import SectionHeader from "../Shared/SectionHeader";

const progressCircleStyle = `
  @keyframes slowProgress {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: 125.6;
    }
  }

  .progress-circle {
    animation: slowProgress 3s linear forwards;
    stroke-dasharray: 125.6;
  }
`;

export default function HeroSlider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    // Inject progress circle animation styles
    const style = document.createElement("style");
    style.textContent = progressCircleStyle;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const navigate = useNavigate();
  const handleReport = () => {
    navigate("/add-issue");
  };
  return (
    <div className="w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] text-[#c8e5d5]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-full"
      >
        {/* Slide 1 - Garbage Issue */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://i.ibb.co.com/yBsr1F4M/image.webp"
              alt="Garbage Issue"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <SectionHeader
                  as="h1"
                  title={
                    <span>
                      <Typewriter
                        words={["Report Local Cleanliness Issues", "Report Garbage Problems", "Help Keep Your Area Clean"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={30}
                        delaySpeed={2000}
                      />
                    </span>
                  }
                  description={
                    "Spot garbage buildup, broken footpaths, or illegal dumping in your area and report instantly."
                  }
                  titleProps={{ className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold" }}
                  descProps={{ className: "max-w-xl text-sm sm:text-base md:text-lg mx-auto text-white/90 mt-3" }}
                />

                <div className="mt-6 flex justify-center">
                  <button onClick={handleReport} className="btn btn-primary px-6 py-3 text-sm sm:text-base">
                    Report an issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Community Cleaning */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://i.ibb.co.com/Df3Xnz3b/image-1.webp"
              alt="Community Cleaning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <SectionHeader
                  as="h1"
                  title={
                    <span>
                      <Typewriter
                        words={["Join Community Cleanup Drives", "Volunteer for Cleanliness", "Make Your City Cleaner"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={30}
                        delaySpeed={2000}
                      />
                    </span>
                  }
                  description={
                    "Take part in organized cleanup programs and make your city a cleaner, healthier place."
                  }
                  titleProps={{ className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold" }}
                  descProps={{ className: "max-w-xl text-sm sm:text-base md:text-lg mx-auto text-white/90 mt-3" }}
                />
                <div className="mt-6 flex justify-center">
                  <button onClick={handleReport} className="btn btn-primary px-6 py-3 text-sm sm:text-base">
                    Report an issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Sustainability Action */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1503264116251-35a269479413"
              alt="Sustainability Action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <SectionHeader
                  as="h1"
                  title={
                    <span>
                      <Typewriter
                        words={["Act for a Sustainable Future", "Reduce Waste Today", "Build Green Communities"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={30}
                        delaySpeed={2000}
                      />
                    </span>
                  }
                  description={
                    "Encourage recycling, reduce waste, and support eco-friendly community actions."
                  }
                  titleProps={{ className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold" }}
                  descProps={{ className: "max-w-xl text-sm sm:text-base md:text-lg mx-auto text-white/90 mt-3" }}
                />
                <div className="mt-6 flex justify-center">
                  <button onClick={handleReport} className="btn btn-primary px-6 py-3 text-sm sm:text-base">
                    Report an issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/*  Slide 4 - Recycling & Awareness */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115"
              alt="Recycling Awareness"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12">
              <div className="max-w-4xl mx-auto">
                <SectionHeader
                  as="h1"
                  title={
                    <span>
                      <Typewriter
                        words={["Promote Recycling & Awareness", "Inspire Sustainable Habits", "Spread Environmental Awareness"]}
                        loop={true}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={30}
                        delaySpeed={2000}
                      />
                    </span>
                  }
                  description={
                    "Spread awareness about recycling and inspire others to adopt sustainable habits."
                  }
                  titleProps={{ className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold" }}
                  descProps={{ className: "max-w-xl text-sm sm:text-base md:text-lg mx-auto text-white/90 mt-3" }}
                />
                <div className="mt-6 flex justify-center">
                  <button onClick={handleReport} className="btn btn-primary px-6 py-3 text-sm sm:text-base">
                    Report an issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Progress Circle */}
        <div
          className="autoplay-progress absolute bottom-10 right-10 z-10 hidden lg:flex items-center space-x-2 text-white"
          slot="container-end"
        >
          <svg viewBox="0 0 48 48" ref={progressCircle} className="w-8 h-8">
            <circle cx="24" cy="24" r="20" className="progress-circle" stroke="currentColor" strokeWidth="2" fill="none"></circle>
          </svg>
          <span ref={progressContent} className="text-sm font-medium"></span>
        </div>
      </Swiper>
    </div>
  );
}
