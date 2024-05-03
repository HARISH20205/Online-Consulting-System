import Services from "../components/Services";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
export default function HomePage() {
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
      <section className="text-center py-6 bg-gradient-to-r from-gray-600 to-gray-700 text-stone-50">
        <h1 className="text-3xl animate-text-reveal">#BeAwareOfScams!</h1>
      </section>
      <section className="py-12 md:px-4 lg:px-0">
        <Services />
      </section>
      <section className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center px-5 ">
          <h1 className="text-3xl font-bold mb-4">Perks</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Free Consult</h2>
              <p>Get a free consultation with our experts.</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Choose Your Consultant
              </h2>
              <p>Select your own consultant based on your needs.</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Toll-Free Support</h2>
              <p>Access our toll-free number for support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="container mx-auto text-center px-5 ">
          <h1 className="text-3xl font-bold mb-4 ">Why Choose Us?</h1>
          <p className="text-lg mb-4">
            We provide reliable and professional online consulting services to
            help you achieve your goals.
          </p>
          <p className="text-lg mb-4">
            Our experienced consultants are dedicated to delivering personalized
            solutions tailored to your needs.
          </p>
          <p className="text-lg mb-4">
            Contact us today to discover how we can assist you in reaching your
            expectations.
          </p>
          <NavLink
            to="/services"
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 rounded-full inline-block transition duration-300 ease-in-out"
          >
            Get Started
          </NavLink>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-gray-600 to-gray-700 text-stone-50">
        <div className="container mx-auto text-center px-5">
          <h1 className="text-3xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg mb-4">
            Our mission is to provide exceptional consulting services that
            empower individuals and businesses to thrive in the digital age.
          </p>
          <p className="text-lg mb-4">
            We are committed to delivering innovative solutions, fostering
            client success, and building long-term partnerships.
          </p>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 Online Consulting. All rights reserved.</p>
          <p>Contact: ocsupport@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
