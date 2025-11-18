import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router";
const RecentComplaintsCards = ({ issue }) => {
  const timeAgo = moment(issue.date).fromNow();

  //   click see details page to redirect see details page
  const navigate = useNavigate();
  const handleSeeDetails = (_id) => {
    navigate(`/issues/${_id}`);
  };
  return (
    <div data-aos="zoom-out">
      <div
        className="bg-base-100 rounded-2xl  overflow-hidden
      shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-300"
      >
        <div className="p-5">
          {/* Status & Time */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-medium bg-primary/60 p-2 rounded-full uppercase tracking-wide mb-1">
              {issue.category || "General"}
            </p>
            <p className="text-sm text-base-content/70">{timeAgo}</p>
          </div>

          {/* Category */}

          {/* Title */}
          <h3 className="text-lg font-semibold  mb-1">{issue.title}</h3>

          {/* Description */}
          <p className="text-sm  mb-4 line-clamp-2">{issue.description}</p>

          <hr className="my-3" />

          {/* Bottom Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-base-content/70 text-sm">
              <FaMapMarkerAlt />
              <span>{issue.location}</span>
            </div>

            <button
              onClick={() => handleSeeDetails(issue._id)}
              className="btn-primary btn btn-outline  transition"
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentComplaintsCards;
