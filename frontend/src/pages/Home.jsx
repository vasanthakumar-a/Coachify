import { useEffect, useState } from "react";
import { useCoaches } from "../hooks/useCoaches";
import CoachCard from "../../components/CoachCard";
import { useInView } from "react-intersection-observer"; // Detect scroll position

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

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useCoaches(debouncedSearch);

  const { ref, inView } = useInView(); // Hook to detect if user is at bottom

  // Fetch next page when user reaches bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

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

      {data?.pages.map((page) => (
          <>
            {page.coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={ref} className="text-center p-4">
        {isFetchingNextPage ? <p>Loading more...</p> : hasNextPage ? <p>Scroll to load more</p> : <p>No more coaches</p>}
      </div>
    </div>
  );
}
