import { useCoaches } from "../hooks/useCoaches";
import CoachCard from "../../components/CoachCard";

export default function Home() {
  const { data: coaches, isLoading } = useCoaches();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Coach</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coaches?.length > 0 ? (
          coaches.map((coach) => <CoachCard key={coach.id} coach={coach} />)
        ) : (
          <p>No coaches available</p>
        )}
      </div>
    </div>
  );
}
