import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCoachById } from "../api/coaches"; // API call function
import { Button } from "primereact/button"; // PrimeReact UI
import { Card } from "primereact/card";

export default function CoachDetail() {
  const { id } = useParams(); // Get coach ID from URL
  const navigate = useNavigate();

  // Fetch coach details
  const { data: coach, isLoading, isError } = useQuery({
    queryKey: ["coach", id],
    queryFn: () => getCoachById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading coach details.</p>;

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-1/2 p-4">
        <div className="flex flex-col items-center">
          <img src={'coach.photo'} alt={coach.username} className="w-40 h-40 rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{coach.username}</h2>
          <p className="text-gray-500">{coach.specialization.name}</p>
          <p className="mt-2">{coach.bio}</p>

          <Button
            label="Book Now"
            icon="pi pi-calendar"
            className="mt-4"
            onClick={() => navigate(`/book/${id}`)}
          />
        </div>
      </Card>
    </div>
  );
}
