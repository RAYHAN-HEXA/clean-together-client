import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { VscEyeClosed } from "react-icons/vsc";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithMailPass, signInGoogle } = useContext(AuthContext) || {};
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Clean";
  }, []);

  const from = location.state?.from?.pathname || "/";

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value?.trim();
    const password = form.password?.value;

    if (typeof signInWithMailPass !== "function") {
      console.error("signInWithMailPass not available on AuthContext");
      toast.error("Authentication service unavailable");
      return;
    }

    try {
      await signInWithMailPass(email, password);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Logged In Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("login error", error);
      toast.error("Wrong email or password");
    }
  };

  // Sign In Google
  const signWithGoogle = async () => {
    if (typeof signInGoogle !== "function") {
      console.error("signInGoogle not available on AuthContext");
      toast.error("Google sign-in unavailable");
      return;
    }

    try {
      await signInGoogle();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Signed In Successfully",
        showConfirmButton: false,
        timer: 1200,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed To Google Login",
        showConfirmButton: false,
        timer: 1200,
      });
      console.error("Sign in google error:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="bg-base-100 shadow-xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl heading-font md:text-4xl font-bold text-center mb-8 text-primary">
          Clean TogetherWelcome Back!
        </h2>
        <p className="text-center">Access Your Account to report issues</p>

        <form className="space-y-4" onSubmit={handleLogin}>
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
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <VscEyeClosed /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="text-base-content/70">Remember me</span>
            </label>
            <Link to="/reset-password" className="text-primary cursor-pointer underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-base-content/70">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </p>

        <div className="divider text-base-content/60">OR</div>
        <div className="pt-2">
          <button
            className="btn btn-outline w-full flex items-center justify-center gap-2 hover:border-primary hover:text-primary"
            onClick={signWithGoogle}
            type="button"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;