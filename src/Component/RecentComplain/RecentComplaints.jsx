import React, { useEffect, useState } from "react";
import { FaTrash, FaBuilding, FaHammer, FaRoad } from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import RecentComplaintsCards from "./RecentComplaintsCards";
import { Fade, Zoom } from "react-awesome-reveal";
import { SECTION_HEADING, SECTION_DESC } from "../Shared/SectionStyles";
import SectionHeader from "../Shared/SectionHeader";
import { Typewriter } from "react-simple-typewriter";

const RecentComplaints = () => {
  const categories = [
    {
      id: 1,
      name: "Garbage",
      icon: <FaTrash />,
      bg: "bg-green-100 dark:bg-green-900/40",
      text: "text-green-700 dark:text-green-300",
      description: "Report garbage accumulation or unclean areas.",
    },
    {
      id: 2,
      name: "Illegal Construction",
      icon: <FaBuilding />,
      bg: "bg-yellow-100 dark:bg-yellow-900/40",
      text: "text-yellow-700 dark:text-yellow-300",
      description: "Report any unauthorized construction activities.",
    },
    {
      id: 3,
      name: "Broken Public Property",
      icon: <FaHammer />,
      bg: "bg-blue-100 dark:bg-blue-900/40",
      text: "text-blue-700 dark:text-blue-300",
      description: "Report broken benches, lights, or other public assets.",
    },
    {
      id: 4,
      name: "Road Damage",
      icon: <FaRoad />,
      bg: "bg-red-100 dark:bg-red-900/40",
      text: "text-red-700 dark:text-red-300",
      description: "Report potholes, cracks, or damaged roads.",
    },
  ];

  const [recentIssues, setRecentIssues] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/recent-issues").then((data) => {
      setRecentIssues(data.data);
    });
  }, [axiosSecure]);

  return (
    <div className="bg-base-200 transition-colors duration-300">
      <div className="container mx-auto">
        <section className="py-12 md:py-16 lg:pb-20 px-6 lg:px-10">
          {/* Title */}{" "}
          <div className="text-center mt-4">
            {/* Title */}
            <Fade cascade direction="right" triggerOnce>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4 leading-tight">
                Report Community{" "}
                <span className="text-primary">
                  <Typewriter
                    words={["Issues", "Concerns", "Problems", "Suggestions"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={60}
                    delaySpeed={1300}
                  />
                </span>
              </h2>

              <SectionHeader
                description={
                  "Select a category to view or report issues. Explore different types of community problems easily."
                }
                titleProps={{
                  className: "text-base-content",
                  "data-aos": undefined,
                }}
                descProps={{ className: "pb-10" }}
              />
            </Fade>

            {/* Description */}
          </div>
          {/* Category Cards */}
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1700"
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex flex-col items-center justify-center gap-3 
                  p-8 rounded-2xl shadow-md border border-base-300
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                  ${cat.bg}`}
                >
                  <div
                    className={`text-5xl ${cat.text} drop-shadow-md transition-transform duration-300 hover:rotate-6`}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-center text-lg md:text-xl text-base-content">
                    {cat.name}
                  </h3>
                  <p className="text-sm md:text-base text-center leading-snug text-base-content/80">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Complaints Section */}
        <section className=" px-6 lg:px-10">
          <div data-aos="fade-up-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4 leading-tight">
              Our Recent{" "}
              <span className="text-primary">
                <Typewriter
                  words={["Complaints", "Feedback", "Suggestions"]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={1300}
                />
              </span>
            </h2>
          </div>

          <div data-aos="fade-up-right">
            <p className="text-center  md:text-lg text-base-content/70 max-w-2xl mx-auto pt-3 pb-6">
              Explore the latest issues reported by the community. Stay informed
              and track ongoing complaints effectively.
            </p>
          </div>

          {/* Recent issues cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 items-center">
            {recentIssues.map((issue) => (
              <RecentComplaintsCards issue={issue} key={issue._id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecentComplaints;
