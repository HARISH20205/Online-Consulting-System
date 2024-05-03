import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";

export default function NavBar() {
  const { setLogout, isLoggedIn, handleMessage } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const sessionId = sessionStorage.getItem("id");
    try {
      const response = await fetch("http://localhost:8080/logout", {
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
        sessionStorage.removeItem("id");
        setLogout();
        handleMessage(data.message);
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav
      className="flex md:justify-between justify-evenly  items-center py-5 md:px-10 pr-5 text-center border-b-2 sticky top-0 left-0 z-10 bg-white border-gray-500"
      style={{ minHeight: "73.6px" }}
    >
      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex justify-end">
          <MdOutlineCancel
            onClick={() => setShowMenu(false)}
            className="m-5 text-3xl cursor-pointer"
          />
        </div>
        <section className="text-black text-2xl">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className="block py-4 px-6 border-b border-t border-slate-600 text-center"
          >
            Home
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/login"
              className="block py-4 px-6 border-b border-slate-600 text-center"
            >
              Login
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/signup"
              className="block py-4 px-6 border-b border-slate-600 text-center"
            >
              Signup
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/account"
              className="block py-4 px-6 border-b border-slate-600 text-center"
            >
              Account
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              onClick={(e) => {
                handleLogout(e);
                setShowMenu(false);
              }}
              className="block py-4 px-6 border-b border-slate-600 text-center cursor-pointer"
            >
              Logout
            </NavLink>
          )}

          <NavLink
            to="/help"
            onClick={() => setShowMenu(false)}
            className="block py-4 px-6 border-b border-slate-600 text-center"
          >
            Help
          </NavLink>
        </section>
      </div>

      {/* Hamburger menu */}
      <ul className="md:hidden text-3xl">
        <GiHamburgerMenu onClick={() => setShowMenu(true)} />
      </ul>
      <ul className="md:text-2xl text-xl">
        <NavLink to="/">Online Consulting Services</NavLink>
      </ul>
      <ul className="hidden md:flex gap-10 text-lg text-center pt-1">
        <NavLink to="/" className="cursor-pointer">
          Home
        </NavLink>
        {!isLoggedIn && (
          <NavLink to="/login" className="cursor-pointer">
            Login
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/signup" className="cursor-pointer">
            Signup
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/account" className="cursor-pointer">
            Account
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink onClick={handleLogout} className="cursor-pointer">
            Logout
          </NavLink>
        )}
        <NavLink to="/help" className="cursor-pointer">
          Help
        </NavLink>
      </ul>
    </nav>
  );
}
