import { useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { useCoach } from "../hooks/useCoaches";

Modal.setAppElement("#root");

export default function Booking() {
  const { coachId } = useParams();
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data: coach, isLoading, isError } = useCoach(coachId);

  if (isLoading) return <p>Loading coach details...</p>;
  if (isError) return <p className="text-red-500">Failed to load coach details.</p>;
  if (!coach) return <p className="text-gray-500">Coach not found.</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Book a Session with {coach.username}</h1>
      <p className="text-gray-600">{coach.specialization.name}</p>

      {/* Calendar */}
      <div className="mt-4">
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Confirm Booking Button */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setModalIsOpen(true)}
      >
        Confirm & Pay
      </button>

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold">Booking Confirmation</h2>
        <p><strong>Coach:</strong> {coach.username}</p>
        <p><strong>Specialization:</strong> {coach.specialization.name}</p>
        <p><strong>Date:</strong> {date.toDateString()}</p>

        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Pay Now
          </button>
        </div>
      </Modal>
    </div>
  );
}
