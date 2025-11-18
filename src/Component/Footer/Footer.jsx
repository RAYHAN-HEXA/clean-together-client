import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-secondary py-10 px-5 md:px-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
            Clean <span className="text-primary">Bangla</span>
            <img
              className="bg-primary rounded-full w-8"
              src="/Logo.png"
              alt=""
            />
          </h2>
          <p className="text-sm text-center md:text-left">
            A community movement for a cleaner, greener Bangladesh.
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-primary mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/feature" className="hover:text-primary">
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-primary mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-primary">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-primary mb-3">Connect</h3>
          <p className="mb-3">Follow us on social media</p>
          <div className="flex justify-center md:justify-end gap-3 text-xl">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-primary"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-primary"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
