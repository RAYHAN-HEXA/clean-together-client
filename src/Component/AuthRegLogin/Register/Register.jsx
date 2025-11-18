import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AuthContext } from "../../../Provider/AuthContext/AuthContext";
import { VscEyeClosed } from "react-icons/vsc";
import { FaRegEye } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // get from authProvider/authContext
  const { createUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Create User Mail Pass
  const createUserMailPass = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password Validation Checked
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!regex.test(password)) {
      return Swal.fire({
        position: "top-center",
        icon: "warning",
        title:
          "Password must contain at least 6 characters, one uppercase, one lowercase, one number",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // Create User
    createUser(email, password)
      .then((res) => {
        // Photo and email update
        updateProfile(res.user, { displayName, photoURL })
          .then(() => {
            // email verification
            sendEmailVerification(res.user)
              .then(() => {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "New User Created Successfully",
                  showConfirmButton: false,
                  timer: 1200,
                });
                navigate(location.state || "/");
              })
              .catch((error) => {
                console.log("Email verification error", error);
                toast.error(`Error: ${error.message || error}`);
              });
          })
          .catch((error) => {
            console.log("Profile update error", error);
            toast.error(`Error: ${error.message || error}`);
          });
      })
      .catch((error) => {
        console.log("Create user error", error);
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "This User Already Registered!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Sign In Google
  const signWithGoogle = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "New User Created Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed To Google Sign",
          showConfirmButton: false,
          timer: 1200,
        });
        console.log("Sign in google", error);
      });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      {/* Helmet */}
      <title>Register - CleanTogether </title>
      <div className="bg-base-100 shadow-xl rounded-xl w-full max-w-md p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={createUserMailPass} className="space-y-4">
          {/* Name field */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Enter your full name"
              className="input input-bordered w-full focus:border-primary focus:ring-primary"
              required
            />
          </div>

          {/* Photo field */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Photo URL
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full focus:border-primary focus:ring-primary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-base-content font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full pr-10 focus:border-primary focus:ring-primary"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3  cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEyeClosed /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Terms and condition */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-primary"
              required
            />
            <span className="text-sm text-base-content/70">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms & Conditions
              </a>
            </span>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="btn btn-primary w-full transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center text-sm mt-6 text-base-content/70">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Login here
          </a>
        </p>
        {/* Google Sign-Up */}
        <div className="divider text-base-content/60">OR</div>
        <button
          className="btn btn-outline w-full flex items-center justify-center gap-2 hover:border-primary hover:text-primary"
          onClick={signWithGoogle}
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign Up with Google</span>
        </button>
      </div>
    </section>
  );
};

export default Register;
