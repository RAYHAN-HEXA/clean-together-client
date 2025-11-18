import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center my-3">
        <BeatLoader color="#2e8b57" />
      </div>
    );
  }

  // Logout with SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            navigate("/");
            toast.success("Logout Successfully");
            Swal.fire("Logged Out!", "You have been logged out.", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left: Logo */}
        <NavLink
          to="/"
          className="text-3xl logo-font font-bold flex items-center gap-1"
        >
          {/* <span className="text-primary"> */}
          Clean <span className="text-primary">Together</span>
          {/* </span> */}
          <img
            className="w-8 border rounded-full bg-primary"
            src="/Logo.png"
            alt="logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-5 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base font-medium hover:text-primary/75 ${
                isActive ? "text-primary" : "text-base-content"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/issues"
            className={({ isActive }) =>
              `text-base font-medium hover:text-primary/75 ${
                isActive ? "text-primary" : "text-base-content"
              }`
            }
          >
            All Issues
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/add-issue"
                className={({ isActive }) =>
                  `text-base font-medium hover:text-primary/75 ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                Add Issues
              </NavLink>
              <NavLink
                to="/my-issues"
                className={({ isActive }) =>
                  `text-base font-medium hover:text-primary/75 ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                My Issues
              </NavLink>
              <NavLink
                to="/my-contribution"
                className={({ isActive }) =>
                  `text-base font-medium hover:text-primary/75 ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                My Contribution
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex gap-3 items-center">
          <ThemeToggle />

          {user ? (
            <div className="relative group">
              {/* Profile Image */}
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                }
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border-2  cursor-pointer transition-all duration-200 "
              />

              {/* Dropdown Menu */}
              <div
                className="absolute right-0 mt-3 w-44 bg-base-100 border rounded-xl shadow-lg opacity-0 invisible 
      group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 
      transition-all duration-300 origin-top-right z-50"
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-base-200 text-left transition-all duration-200"
                >
                  <FaUser className="text-primary" /> Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-base-200 text-left text-red-500 transition-all duration-200"
                >
                  <TbLogout2 /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn btn-primary btn-outline duration-300"
              >
                Login
              </Link>
              <Link to={"/register"} className="btn btn-primary duration-300">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Section */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />

          <button
            className="btn btn-ghost"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-xl border-l border-base-300 transform transition-transform duration-300 z-40 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Close Button */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold text-primary">Menu</h3>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="transition-transform duration-300 hover:rotate-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <NavLink
            onClick={() => setMobileMenuOpen(false)}
            to="/"
            className={({ isActive }) =>
              `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                isActive ? "text-primary font-semibold" : "text-base-content"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setMobileMenuOpen(false)}
            to="/issues"
            className={({ isActive }) =>
              `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                isActive ? "text-primary font-semibold" : "text-base-content"
              }`
            }
          >
            All Issues
          </NavLink>

          {user && (
            <>
              <NavLink
                onClick={() => setMobileMenuOpen(false)}
                to="/add-issue"
                className={({ isActive }) =>
                  `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-base-content"
                  }`
                }
              >
                Add Issues
              </NavLink>

              <NavLink
                onClick={() => setMobileMenuOpen(false)}
                to="/my-issues"
                className={({ isActive }) =>
                  `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-base-content"
                  }`
                }
              >
                My Issues
              </NavLink>

              <NavLink
                onClick={() => setMobileMenuOpen(false)}
                to="/my-contribution"
                className={({ isActive }) =>
                  `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-base-content"
                  }`
                }
              >
                My Contribution
              </NavLink>

              <NavLink
                onClick={() => setMobileMenuOpen(false)}
                to="/profile"
                className={({ isActive }) =>
                  `hover:text-primary/75 hover:bg-base-200 px-3 py-2 rounded ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-base-content"
                  }`
                }
              >
                Profile
              </NavLink>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-primary text-white mt-2 flex items-center gap-2 justify-center"
              >
                <TbLogout2 /> Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                to={"/login"}
                className="btn btn-primary btn-outline w-full mt-2"
              >
                Login
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                to={"/register"}
                className="btn btn-primary w-full mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Background Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
