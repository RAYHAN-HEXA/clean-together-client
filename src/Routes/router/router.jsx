import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../../Layout/Root/Root";
import Home from "../../Pages/Home/Home";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Register from "../../Component/AuthRegLogin/Register/Register";
import Login from "../../Component/AuthRegLogin/Login/Login";
import Profile from "../../Pages/Profile/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Feature from "../../Pages/Feature/Feature";
import ResetPass from "../../Component/AuthRegLogin/ResetPass/ResetPass";
import About from "../../Pages/About/About";
import Allissues from "../../Pages/Allissues/Allissues";
import AddIssue from "../../Pages/AddIssue/AddIssue";
import IssueDetails from "../../Pages/IssueDetails/IssueDetails";
import MyIssues from "../../Pages/MyIssues/MyIssues";
import MyContribution from "../../Pages/MyContribution/MyContribution";
import Refund from "../../Pages/Legal/Refund";
import Privacy from "../../Pages/Legal/Privacy";
import Terms from "../../Pages/Legal/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/issues",
        Component: Allissues,
      },
      {
        path: "/my-contribution",
        element: (
          <PrivateRoute>
            <MyContribution />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "/issues/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-issue",
        element: (
          <PrivateRoute>
            <AddIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        Component: Register,
      },

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/reset-password",
        Component: ResetPass,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/refund",
        Component: Refund,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/feature",
        element: (
          <PrivateRoute>
            <Feature />
          </PrivateRoute>
        ),
      },

      {
        path: "/*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
