import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function LoginPage() {
  const { setLogin, message, isLoggedIn, resetMessage, handleMessage } =
    useContext(AppContext);
  const [showMessage, setShowMessage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function handleReload() {
      const sessionId = sessionStorage.getItem("id");
      if (!sessionId) {
        return;
      }
      try {
        const response = await fetch("http://localhost:8080/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: sessionId,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setLogin(data.user, data.consultationDetails);
        }
      } catch (e) {
        console.log(e);
      }
    }
    handleReload();
    if (isLoggedIn) {
      navigate("/");
    }
    const timer = setTimeout(() => {
      setShowMessage(false);
      resetMessage();
    }, 1500);

    return () => clearTimeout(timer);
  }, [message]);

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("id", data.sessionId);
        setLogin(data.user, data.consultationDetails);
        handleMessage("Login successful");
        navigate("/");
      } else {
        handleMessage("Invalid Credentials");
        setShowMessage(true);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="relative">
      {showMessage && message && (
        <p className="text-gray-800 absolute top-4 left-0 w-full rounded-sm  bg-white text-center py-2 animate-fadeIn">
          {message}
        </p>
      )}
      <div
        className="h-full flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-800 "
        style={{ height: "calc(100vh - 74.6px)" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-7">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                required={true}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Login
            </button>
            <div className="text-right">
              Don't have an Account?{" "}
              <NavLink to="/signup" className="underline">
                Signup
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
