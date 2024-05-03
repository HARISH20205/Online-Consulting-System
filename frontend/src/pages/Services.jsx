import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export default function ServicesPage() {
  const [serviceData, setServiceData] = useState([]);
  const { isLoggedIn, setLogin } = useContext(AppContext);
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
    async function getServices() {
      try {
        const response = await fetch("http://localhost:8080/getServices");
        if (response.ok) {
          const data = await response.json();
          setServiceData(data.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getServices();
  }, []);
  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-3xl pl-7 mb-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mx-14 mx-6 ">
        {serviceData.map((service, index) => (
          <NavLink
            to={isLoggedIn ? `/${service._id}/consultants` : "/login"}
            key={index}
            className="bg-slate-700 text-white rounded-lg shadow-lg  p-4 h-80 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100"
          >
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between items-center px-3">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            </div>
          </NavLink>
        ))}
      </div>
      <p className="mx-auto my-7 w-4/5  text-white py-7 px-5 text-xl text-center rounded-lg bg-slate-700">
        We take immense pride in being a trusted and legitimate consulting firm,
        dedicated to providing exceptional services to our clients.
        <br /> With a strong foundation built on integrity, expertise, and
        client satisfaction, we have earned a reputation as a reliable partner
        for all your consulting needs.
      </p>
    </div>
  );
}
