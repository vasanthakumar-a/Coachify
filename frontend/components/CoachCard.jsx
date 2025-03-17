/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function CoachCard({ coach }) {
  return (
    <div key={coach.id} className="border p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mt-2">{coach.username}</h2>
      <p className="text-gray-600">{coach.specialization.name}</p>
      <Link to={`/coach/${coach.id}`} className="text-blue-500 mt-2 inline-block">
        View Profile
      </Link>
    </div>
  );
}