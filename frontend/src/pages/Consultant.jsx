import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function Consultant() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { isLoggedIn, setLogin } = useContext(AppContext);
  const { cid } = useParams();
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
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  async function bookConsult() {
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      alert("Please select a date that is not in the past.");
      return;
    }

    const sessionId = sessionStorage.getItem("id");
    try {
      const response = await fetch(
        `http://localhost:8080/${cid}/appointConsult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consultantId: cid,
            sessionId: sessionId,
            date: selectedDate,
          }),
        }
      );
      if (response.ok) {
        navigate("/account");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col mt-10 p-10 items-center justify-center mx-5 rounded-md  bg-slate-600">
      <h2 className="text-2xl font-semibold mb-6 text-white">Select a Date</h2>
      <div className="w-full max-w-md text-center bg-white rounded-lg shadow-lg p-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          required
          className="w-full border text-center border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-slate-500 focus:ring focus:ring-slate-500 focus:ring-opacity-50 "
          calendarClassName=" z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-2"
        />
        <button
          onClick={bookConsult}
          className="mt-4 w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-md transition duration-300 focus:outline-none"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
