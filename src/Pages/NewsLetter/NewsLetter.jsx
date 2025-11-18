import React from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Subscribed with CleanTogether: ",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
  };

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold  mb-3 ">
          Stay <span className="text-primary">Informed</span>
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto mb-8">
          Subscribe to receive updates on community reports, cleanup drives, and
          ways to get involved with{" "}
          <span className="font-semibold text-primary">CleanTogether</span>.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-duration="900"
          className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            name="email"
            type="email"
            placeholder="Your email address"
            className="input input-bordered w-full sm:flex-1 bg-base-100 border-primary/40 focus:border-primary focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto text-white font-semibold  transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
