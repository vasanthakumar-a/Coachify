import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

export default function Booking() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Select a Date</h1>
      <Calendar onChange={setDate} value={date} />
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Pay & Confirm
      </button>
    </div>
  );
}
