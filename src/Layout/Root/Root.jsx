import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Root = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const smootherRef = useRef(null);

  useEffect(() => {
    // Kill any existing smoother to avoid duplicates
    try {
      if (ScrollSmoother.get()) ScrollSmoother.get().kill();
    } catch {
      // ignore
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2, // slightly lower value for snappier feel and less input lag
      effects: true,
    });
    smootherRef.current = smoother;

    // 🎯 Optimized cursor follow using GSAP quickSetter (avoids many tweens stacking)
    // Only enable custom cursor on large screens to avoid mobile overhead
    const cursor = document.getElementById("cursor");
    let setX, setY;
    let mouseListenerAdded = false;
    const moveCursor = (e) => {
      // fallback if quickSetter not available
      if (setX && setY) {
        setX(e.clientX);
        setY(e.clientY);
      } else if (cursor) {
        // minimal set via transform for performance
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const isLargeScreen = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 1024px)").matches;
    if (isLargeScreen && cursor && gsap.quickSetter) {
      // set initial CSS for cursor to avoid layout thrashing
      cursor.style.position = "fixed";
      cursor.style.top = "0";
      cursor.style.left = "0";
      cursor.style.pointerEvents = "none";
      cursor.style.willChange = "transform";
      setX = gsap.quickSetter(cursor, "x", "px");
      setY = gsap.quickSetter(cursor, "y", "px");

      window.addEventListener("mousemove", moveCursor);
      mouseListenerAdded = true;
    }

    // 📈 Throttled scroll progress tracker using requestAnimationFrame and passive listener
    let ticking = false;
    const updateProgress = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY || window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollPercent(scrolled);
          document.documentElement.style.setProperty("--scroll-progress", scrolled);
          ticking = false;
        });
      }
    };

    if (!mouseListenerAdded) {
      // if not added above (small screens), don't attach a no-op listener
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      try {
        smootherRef.current?.kill?.();
      } catch {
        // ignore
      }
      if (mouseListenerAdded) window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor (hidden on small screens; shown only on lg+) */}
      <div id="cursor" className="hidden lg:block">
        <svg viewBox="0 0 36 36" className="progress-ring">
          <path
            className="progress-ring__circle"
            stroke="hsl(var(--p))"
            strokeWidth="3"
            fill="transparent"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
            style={{
              strokeDasharray: "100, 100",
              strokeDashoffset: `${100 - scrollPercent}`,
              transition: "stroke-dashoffset 0.2s ease",
            }}
          />
        </svg>
      </div>

      {/* Right-side scroll percentage */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-6 bottom-6 z-[9999] flex flex-col items-center cursor-pointer group"
      >
        <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 border-3">
          <svg
            className="absolute top-0 left-0"
            viewBox="0 0 36 36"
            width="56"
            height="56"
          >
            <path
              stroke="hsl(var(--b1))" /* contrast border on primary bg */
              strokeWidth="4"
              fill="none"
              strokeDasharray="100,100"
              strokeDashoffset={100 - scrollPercent}
              style={{ transition: "stroke-dashoffset 0.2s ease" }}
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
            />
          </svg>
          <span className="text-sm font-semibold text-white ">
            {Math.round(scrollPercent)}%
          </span>
        </div>
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Root;
