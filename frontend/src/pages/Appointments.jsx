import { useQuery } from "@tanstack/react-query";
import { getUserAppointments } from "../api/appointments.js";
import { Card } from "primereact/card";
import { useParams } from "react-router-dom";

export default function Appointments() {
  const { userId } = useParams();
  // Fetch user appointments
  const { data: appointments, isLoading, isError } = useQuery({
    queryKey: ["appointments", userId],
    queryFn: () => getUserAppointments(userId),
  });

  if (isLoading) return <p>Loading appointments...</p>;
  if (isError) return <p>Error fetching appointments.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4 shadow-md">
              <h3 className="text-lg font-semibold">{appointment.coach.firstName}</h3>
              <p className="text-gray-500">Date: {appointment.from}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
