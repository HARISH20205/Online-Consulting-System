import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Consultants() {
  const { setLogin, isLoggedIn } = useContext(AppContext);
  const [consultants, setConsultants] = useState([]);
  const { cid } = useParams();
  const navigate = useNavigate();
  console.log(isLoggedIn);
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
          setLogin(data.user);
        }
      } catch (e) {
        console.log(e);
      }
    }
    async function getConsultants() {
      try {
        const response = await fetch(
          `http://localhost:8080/${cid}/consultants`
        );
        if (response.ok) {
          const data = await response.json();
          setConsultants(data.data);
        }
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    }
    handleReload();
    // if (!isLoggedIn) {
    //   navigate("/");
    // }
    getConsultants();
  }, [cid]);

  let serviceName;
  if (consultants.length > 0) {
    serviceName = consultants[0].serviceName;
  }
  return (
    <div className="container mx-auto py-8">
      {serviceName && (
        <p className="text-center text-3xl pb-7">{serviceName} Consultants</p>
      )}
      <div className="md:flex gap-3 justify-center md:w-3/4 md:mx-auto">
        {consultants.length > 0 ? (
          consultants.map((consultant) => (
            <div
              key={consultant._id}
              className="bg-gray-900 text-white mt-5 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 mx-auto md:mx-0 hover:scale-105 w-2/3 md:w-80"
            >
              <h2 className="text-2xl font-semibold mb-2">{consultant.name}</h2>
              <p className="text-gray-300 mb-2">
                Experience: {consultant.experience} years
              </p>
              <p className="text-gray-300 mb-2">Age: {consultant.age}</p>
              <p className="text-gray-300 mb-4">
                Rating: {consultant.avgRating}
              </p>
              <NavLink
                to={`/consultant/${consultant._id}`}
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Book Now
              </NavLink>
            </div>
          ))
        ) : (
          <p className="text-center text-2xl">No Consultants Found</p>
        )}
      </div>
    </div>
  );
}
