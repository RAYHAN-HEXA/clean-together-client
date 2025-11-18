import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/router/router.jsx";
import AuthProvider from "./Provider/AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

//  AOS Import
import AOS from "aos";
import "aos/dist/aos.css";

//  Small Wrapper Component for Initialization
export const RootApp = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-left" reverseOrder={false} />
      <ToastContainer />
    </>
  );
};

// Render
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RootApp />
    </StrictMode>
  </AuthProvider>
);
