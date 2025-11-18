import React, { useEffect, useState, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

gsap.registerPlugin(ScrollTrigger);

const IssueDetails = () => {
  const [detail, setDetail] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // 🔹 Fetch issue details
  useEffect(() => {
    if (!id) return;
    console.debug("IssueDetails: fetching issue id", id);
    axiosSecure
      .get(`/all-issues/${id}`)
      .then((res) => setDetail(res.data))
      .catch((err) => {
        console.error("Failed to fetch issue details", err);
      });
  }, [id, axiosSecure]);

  // 🔹 Fetch contributors
  useEffect(() => {
    axiosSecure
      .get(`/all-contributions/${id}`)
      .then((res) => setContributors(res.data))
      .catch(() => console.error("Failed to fetch contributors"));
  }, [id, axiosSecure]);

  // 🔹 GSAP Page Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
        scrollTrigger: {
          trigger: ".issue-section",
          start: "top 85%",
        },
      });

      tl.from(".issue-image", { opacity: 0, scale: 0.95 })
        .from(".issue-title", { opacity: 0, y: 50 }, "-=0.5")
        .from(".issue-meta", { opacity: 0, y: 30, stagger: 0.2 }, "-=0.5")
        .from(".issue-description", { opacity: 0, y: 30 }, "-=0.3")
        .from(".issue-progress", {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left",
        })
        .from(".contributors-table", { opacity: 0, y: 50 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  // 🔹 Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newContributions = {
      ...data,
      issueId: id,
      category: detail.category,
      date: new Date(),
      status: "ongoing",
    };

    axiosSecure
      .post("/all-contributions", newContributions)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Contribution submitted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setContributors((prev) => [...prev, newContributions]);
          setShowModal(false);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to submit contribution", "error");
      })
      .finally(() => setLoading(false));
  };

  if (!detail) {
    return <p className="text-center py-10">Loading issue details...</p>;
  }

  const totalCollected = contributors.reduce(
    (sum, c) => sum + (Number(c.amount) || 0),
    0
  );

  const percentage =
    detail.amount && detail.amount > 0
      ? Math.min((totalCollected / detail.amount) * 100, 100)
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6 issue-section">
      <title>Issue Details - CleanTogether</title>
      {/* 🔹 Issue Card */}
      <div className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-base-300">
        <img
          src={detail.image || "https://i.ibb.co/QM1k6rq/fallback.jpg"}
          onError={(e) =>
            (e.target.src = "https://i.ibb.co/QM1k6rq/fallback.jpg")
          }
          alt={detail.title}
          className="w-full h-96 object-cover rounded-xl mb-6 issue-image"
        />

        <h2 className="text-3xl font-bold text-base-content mb-3 issue-title">
          {detail.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-base-content/70 pb-4 border-b border-base-300 issue-meta">
          <span className="flex items-center gap-1">
            <FaTag className="text-primary/80" /> {detail.category}
          </span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-warning" /> {detail.location}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-info/90" />
            {new Date(detail.date).toLocaleDateString()}
          </span>
        </div>

        <p className="text-base-content/70 leading-relaxed py-4 issue-description">
          {detail.description}
        </p>

        {/* 🔹 Progress Bar */}
        {detail.amount && (
          <div className="py-4 issue-progress">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-base-content/80">
                Suggested Fix Budget:
              </h3>
              <span className="text-primary font-bold text-lg">
                ৳{detail.amount}
              </span>
            </div>
            <div className="bg-base-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-base-content/70 text-right">
              Collected: <b>৳{totalCollected}</b> / ৳{detail.amount}
            </p>
          </div>
        )}

        {/* 🔹 Contribution Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary gap-2 mx-auto hover:scale-105 duration-500 transition"
          >
            <FaMoneyBillWave /> Pay Clean-Up Contribution
          </button>
        </div>
      </div>

      {/* 🔹 Contributors Table */}
      <div className="bg-base-100 rounded-2xl shadow-md p-6 border border-base-300 contributors-table">
        <h3 className="text-xl font-semibold mb-4 text-base-content">
          Contributors ({contributors.length})
        </h3>

        {contributors.length === 0 ? (
          <div className="bg-base-200 p-6 rounded-xl text-center text-base-content/60">
            No contributions yet. Be the first to support this issue! 🌱
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="table">
              <thead className="bg-base-300 sticky top-0">
                <tr className="text-base-content">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((c, i) => (
                  <tr
                    key={i}
                    className="hover:bg-base-200 transition-colors duration-200"
                  >
                    <td>
                      <img
                        src={c.image || "https://i.ibb.co/8Nf1Q1P/user.png"}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="font-medium">{c.name}</td>
                    <td className="text-primary font-semibold">৳{c.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-base-100 p-8 rounded-2xl w-full max-w-md shadow-xl relative"
          >
            <h2 className="text-xl font-bold mb-5 text-center text-primary">
              Contribute to Cleanup
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="issueTitle" value={detail.title} />

              <div>
                <label className="font-medium">Title </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={detail.title}
                  placeholder="Enter Issue Title"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="font-medium">Amount (৳)</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={detail.amount}
                  placeholder="Enter amount"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Contributor Name"
                className="input input-bordered w-full"
                required
              />

              <input
                type="email"
                name="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                name="address"
                defaultValue={detail.location}
                placeholder="Address"
                className="input input-bordered w-full"
              />

              <textarea
                name="additional"
                defaultValue={detail.description}
                placeholder="Additional Info (optional)"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button
                type="submit"
                className="btn btn-primary w-full text-white mt-3"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Contribution"}
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl text-error hover:rotate-90 transition-transform"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
