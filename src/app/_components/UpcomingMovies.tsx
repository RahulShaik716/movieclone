import { useRef } from "react";
import { api } from "~/trpc/react";

import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import MovieSkeleton from "./MovieSkeleton";
import HorizantalCard from "./MovieHCard";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function UpcomingMovies() {
  const pageNo = 1;
  const UpcomingScroll = useRef<HTMLDivElement>(null);

  const { data: UpcomingMovies, isLoading: UpcomingMoviesLoading } =
    api.movie.getUpcomingMovies.useQuery({
      pageNo: pageNo.toString(),
    });

  const scrollToEnd = () => {
    if (UpcomingScroll.current) {
      UpcomingScroll.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (UpcomingScroll.current) {
      UpcomingScroll.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  if (UpcomingMoviesLoading) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Upcoming Movies
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Upcoming Movies
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={UpcomingScroll}
      >
        {UpcomingMovies?.results.map((movie: MovieSchema) => (
          <HorizantalCard movie={movie} key={movie.id} /> // use the HorizantalCard component here
        ))}
        <ScrollButton onClick={scrollToStart} direction="left">
          <ChevronLeft />
        </ScrollButton>
        <ScrollButton onClick={scrollToEnd} direction="right">
          <ChevronRight />
        </ScrollButton>
      </div>
    </div>
  );
}
