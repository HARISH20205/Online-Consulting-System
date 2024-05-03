import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AppContext } from "./context/AppContext";
import UserAccount from "./pages/UserAccount";
import Consultants from "./pages/Consultants";
import Consultant from "./pages/Consultant";
import ServicesPage from "./pages/Services";
import HelpPage from "./pages/HelpPage";
export default function App() {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: {},
    message: null,
    consultationDetails: null,
  });
  function setLogin(user, consultationDetails) {
    setState(() => {
      return {
        user: user,
        consultationDetails: consultationDetails,
        isLoggedIn: true,
      };
    });
  }
  function setLogout() {
    setState(() => {
      return {
        user: {},
        consultationDetails: null,
        isLoggedIn: false,
      };
    });
  }
  function resetMessage() {
    setState((pre) => {
      return {
        ...pre,
        message: null,
      };
    });
  }
  function handleMessage(msg) {
    setState((pre) => {
      return {
        ...pre,
        message: msg,
      };
    });
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/services",
          element: <ServicesPage />,
        },
        {
          path: "/account",
          element: <UserAccount />,
        },
        {
          path: "/:cid/consultants",
          element: <Consultants />,
        },
        {
          path: "/consultant/:cid",
          element: <Consultant />,
        },
        {
          path: "/help",
          element: <HelpPage />,
        },
      ],
    },
  ]);
  const ctxValue = {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    message: state.message,
    consultationDetails: state.consultationDetails,
    setLogin: setLogin,
    setLogout: setLogout,
    handleMessage: handleMessage,
    resetMessage: resetMessage,
  };
  return (
    <AppContext.Provider value={ctxValue}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
