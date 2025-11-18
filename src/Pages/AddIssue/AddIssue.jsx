import React, { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useNavigate } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";

const AddIssue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // 🌀 Initialize AOS once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const payload = {
        ...data,
        amount: data.amount ? Number(data.amount) : 0,
        email: user?.email || data.email || "",
        date: new Date().toISOString(),
        status: "ongoing",
        image: data.image || "",
      };

      const res = await axiosSecure.post("/all-issues", payload);
      if (res.data?.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Issue has been reported",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate("/issues");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: "Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <title>Add Issue - CleanTogether</title>

      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="max-w-3xl mx-auto my-10 bg-base-100 rounded-2xl shadow-md border border-base-200"
      >
        <div className="p-8">
          {/*  Title with Typewriter */}
          <h1
            data-aos="zoom-in"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
          >
            Report
            <span className="text-primary">
              <Typewriter
                words={[" an Issue", " a Problem", " a Concern"]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center text-base-content/70 max-w-2xl mx-auto pt-3 pb-8 text-sm sm:text-base"
          >
            Please provide clear details so volunteers and officials can help
            faster.
          </p>

          {/* ✍️ Form Section */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div>
              <label className="font-medium">Issue Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Large garbage pile on the main road"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Category</label>
                <select
                  name="category"
                  defaultValue="Garbage"
                  className="select select-bordered w-full"
                >
                  <option>Garbage</option>
                  <option>Illegal Construction</option>
                  <option>Broken Public Property</option>
                  <option>Road Damage</option>
                </select>
              </div>

              <div>
                <label className="font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Street name or landmark"
                  required
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Provide a clear description..."
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div>
              <label className="font-medium">Photo URL</label>
              <input
                type="url"
                name="image"
                placeholder="Paste an image link (optional)"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Suggested Budget (৳)</label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-50 cursor-not-allowed"
              />
            </div>

            <button
              data-aos="zoom-in"
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full text-white mt-5"
            >
              {submitting ? "Submitting..." : "Submit Issue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIssue;
