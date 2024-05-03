import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export default function HelpPage() {
  const { setLogin, message } = useContext(AppContext);
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
  }, []);
  return (
    <main>
      <section className="text-center py-5 text-gray-700">
        <h1 className="text-3xl animate-text-reveal">#BeAwareOfScams!</h1>
      </section>
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto text-center px-5">
          <h1 className="text-3xl font-bold mb-4">Need Help?</h1>
          <p className="text-lg mb-8">
            We're here to assist you. Check out our resources or contact our
            support team for help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">FAQs</h2>
              <p>
                Browse through frequently asked questions for quick answers.
              </p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
              <p>Reach out to our support team for personalized assistance.</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Knowledge Base</h2>
              <p>
                Explore our knowledge base for in-depth guides and tutorials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center px-5">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            Have a question or need assistance? Contact us using the information
            below.
          </p>
          <p className="text-lg mb-4">Email: help@ocsupport.com</p>
          <p className="text-lg mb-4">Phone: 8756511551</p>
          <p className="text-lg mb-4">Address: Vellore, Tamil Nadu, India</p>
          {/* <NavLink
            to="/contact"
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300 ease-in-out"
          >
            Contact Form
          </NavLink> */}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Online Consulting. All rights reserved.</p>
          <p>Contact: help@ocsupport.com</p>
        </div>
      </footer>
    </main>
  );
}
