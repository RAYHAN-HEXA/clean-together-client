import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Typewriter } from "react-simple-typewriter";
import IssueCard from "../IssueCard/IssueCard";
import AOS from "aos";
import "aos/dist/aos.css";
import HowItWorks from "../HowItWorks/HowItWorks";

const Allissues = () => {
  const axiosSecure = useAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [category, setCategory] = useState("all");

  //   Fetch all issues
  useEffect(() => {
    axiosSecure.get("/all-issues").then((data) => {
      setIssues(data.data);
    });
  }, [axiosSecure]);

  //   Filter + Sort Logic
  const filteredIssues = issues
    .filter((issue) => issue.title.toLowerCase().includes(search.toLowerCase()))
    .filter((issue) =>
      category === "all" ? true : issue.category === category
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className=" py-10 md:py-16 lg:pb-20 bg-base-200  ">
      <title>All Issues - CleanTogether</title>
      <div className="container mx-auto ">
        {/* --- Section Title --- */}
        <div data-aos="fade-right">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
            Discover & Support{" "}
            <span className="text-primary">
              <Typewriter
                words={[
                  "Reported Issues",
                  "Local Problems",
                  "Community Efforts",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>
        </div>

        {/* --- Description --- */}
        <div data-aos="fade-left">
          <p className="text-center text-base-content/70 max-w-2xl mx-auto pt-3 pb-8 text-sm sm:text-base">
            Explore all the ongoing issues reported by citizens. You can view
            details, track their status, and stay informed about community
            improvements.
          </p>
        </div>

        {/* --- Search Bar (Top Center) --- */}
        <div data-aos="zoom-in" className="flex justify-center mb-8 sm:mb-10">
          <div className="relative w-full sm:w-3/4 md:w-1/2">
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-base-content/60 absolute right-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>

        {/* --- Sort Controls (Below Search) --- */}
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 max-w-4xl mx-auto"
        >
          {/* Left: Category Sort */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
            <label className="text-base-content/70 font-medium text-sm sm:text-base">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered select-sm sm:select-md bg-base-100 w-full sm:w-auto"
            >
              <option value="all">All</option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">
                Broken Public Property
              </option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>

          {/* Right: Sort by Date */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-base-content/70 font-medium text-sm sm:text-base">
              Sort:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered select-sm sm:select-md bg-base-100 w-full sm:w-auto"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* --- Issue Cards --- */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-12"
        >
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard issue={issue} key={issue._id}></IssueCard>
            ))
          ) : (
            <p className="text-center text-base-content/70 col-span-full py-10">
              No issues found matching your search.
            </p>
          )}
        </div>
      </div>
      {/* How It Works */}
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Allissues;
