import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

export default function UserAccount() {
  const { user, setLogin } = useContext(AppContext);
  const [consultations, setConsultations] = useState([]);
  const formatEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const maskedName = name.slice(0, 2) + "...";
    return maskedName + "@" + domain;
  };

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
          setConsultations(data.consultationDetails);
        }
      } catch (e) {
        console.log(e);
      }
    }
    handleReload();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mx-6 sm:px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">User Account</h1>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-600 pb-4 mb-4">
          <h2 className="text-lg sm:text-3xl font-semibold mb-2 pb-2 border-b border-gray-600">
            User Details
          </h2>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-base sm:text-lg text-gray-300">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-300">
              <span className="font-semibold">Email:</span>{" "}
              {formatEmail(user.email)}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg sm:text-3xl font-semibold mb-4">
            Upcoming Consultations
          </h2>
          {consultations.length > 0 ? (
            <ul className="space-y-3">
              {consultations.map((consultation, index) => (
                <li
                  key={index}
                  className="border border-gray-600 rounded-lg p-3"
                >
                  <span className="font-semibold">{consultation.name}</span>
                  <span className="text-gray-400 ml-2">
                    {" "}
                    - {formatDate(consultation.date)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base sm:text-lg">No upcoming consultations.</p>
          )}
        </div>
      </div>
    </div>
  );
}
