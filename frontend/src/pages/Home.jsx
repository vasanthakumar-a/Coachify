import { useEffect, useState } from "react";
import { useCoaches } from "../hooks/useCoaches";
import CoachCard from "../../components/CoachCard";

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from "primereact/inputtext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: coaches, isLoading, isError } = useCoaches(debouncedSearch);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading coaches. Please try again.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Coach</h1>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search"> </InputIcon>
        <InputText
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </IconField>
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
