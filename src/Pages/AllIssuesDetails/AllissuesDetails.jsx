import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const AllissuesDetails = ({ issue }) => {
  const {
    title,
    category,
    location,
    description,
    image,
    amount,
    email,
    date,
    status,
  } = issue;

  const suggestedBudget = 500; // Example budget
  const collectedAmount = 350; // Example collected value

  return (
    <section className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg overflow-hidden">
        {/* --- Image --- */}
        <img src={image} alt={title} className="w-full h-56 object-cover" />

        {/* --- Content --- */}
        <div className="p-6 space-y-4">
          {/* Category */}
          <span className="inline-block text-xs font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {category}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-base-content">{title}</h2>

          {/* Description */}
          <p className="text-sm text-base-content/70 leading-relaxed">
            {description}
          </p>

          {/* Location & Date */}
          <div className="text-sm space-y-1 pt-2">
            <p className="flex items-center gap-2 text-base-content/80">
              <FaMapMarkerAlt className="text-primary" />
              <span>{location}</span>
            </p>
            <p className="flex items-center gap-2 text-base-content/70">
              <FaCalendarAlt className="text-primary" />
              <span>
                Reported On: {new Date(date).toLocaleDateString("en-GB")}
              </span>
            </p>
          </div>

          {/* Suggested Fix Budget */}
          <div className="pt-3 border-t">
            <p className="text-sm font-semibold text-base-content/80">
              Suggested Fix Budget:{" "}
              <span className="text-base-content font-bold">
                ${suggestedBudget}.00
              </span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-green-600">
                ${collectedAmount} Collected
              </span>
              <span className="text-base-content/70">
                ${suggestedBudget} Goal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${(collectedAmount / suggestedBudget) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-5">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>

        {/* --- Contributors Table --- */}
        <div className="bg-base-100 px-6 pb-6">
          <h3 className="text-lg font-semibold mt-6 mb-3 text-base-content">
            Community Supporters
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-base-content/90">
                  Anika Rahman
                </span>
              </div>
              <span className="font-semibold">$100.00</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-base-content/90">
                  Fahim Ahmed
                </span>
              </div>
              <span className="font-semibold">$75.00</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/60.jpg"
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-base-content/90">
                  Sadia Islam
                </span>
              </div>
              <span className="font-semibold">$50.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllissuesDetails;
