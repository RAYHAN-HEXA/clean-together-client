import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const IssueCard = ({ issue }) => {
  const { _id, title, location, category, image, amount } = issue;
  const navigate = useNavigate();
  const handleSeeDetails = (_id) => {
    navigate(`/issues/${_id}`);
  };
  return (
    <div data-aos="zoom-out">
      <div className=" rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ">
        {/* --- Issue Image --- */}
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          {/* Overlay status badge */}
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            {category}
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="p-5">
          {/* Title */}
          <h2 className="text-2xl font-bold  mb-3 text-primary transition-colors duration-200">
            {title}
          </h2>

          {/* Category & Location */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base-content/70 ">Amount:</span>
              <span className="text-base-content/70">৳{amount}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-base-content/70">
              Location:
              {location}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => handleSeeDetails(_id)}
            className="btn bg-primary text-white rounded-lg w-full transition-all duration-200 hover:bg-primary/90"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
