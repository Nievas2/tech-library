import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"
import SearchBar from "./components/SearchBar"
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Library } from "@/interfaces/Library";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await axiosInstance.get('/api/library/all/active/1');
        setLibraries(response.data.data.results);
      } catch (error) {
        console.error("Error fetching libraries", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, []);

  const SkeletonCard = () => {
    return (
      <div className="flex w-[322.67px] h-[250px] bg-main/15 flex-col justify-between gap-6 border border-dark dark:border-light rounded-md shadow-xl p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <div className="flex flex-row flex-wrap gap-2 text-sm">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-12 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-center items-center">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-8 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    );
  };

  const renderSkeletons = () => {
    return (
      <div className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mb-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="flex flex-row">
        <div className="flex flex-1">
          <SideBar />
        </div>
        <div className="pt-7 flex flex-col gap-7 px-4 justify-center items-end md:items-center">
          <SearchBar />
          {loading ? (
            renderSkeletons()
          ) : (
            <CardsContainer libraries={libraries} />
          )}
        </div>
      </section>
    </>
  )
}

export default HomePage