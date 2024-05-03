import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function Services() {
  const [serviceData, setServiceData] = useState([]);
  const { isLoggedIn } = useContext(AppContext);
  useEffect(() => {
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
    <div className="container mx-auto pb-8">
      <div>
        <h1 className="text-3xl pl-7 mb-4">
          Top Services{" "}
          <span className="text-lg underline">
            <NavLink to="/services">Explore</NavLink>
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mx-2 mx-6">
        {serviceData.map((service, index) => (
          <div
            key={index}
            className="bg-slate-700 text-white rounded-lg shadow-lg hover:shadow-xl p-4 h-80"
          >
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <div className="flex justify-between items-center px-3">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              {isLoggedIn && (
                <NavLink
                  to={`/${service._id}/consultants`}
                  className="underline"
                >
                  View
                </NavLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
