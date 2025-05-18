import { useRef } from "react";
import MovieSkeleton from "./MovieSkeleton";
import HorizantalCard from "./MovieHCard";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import { api } from "~/trpc/react";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function TopRated() {
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    api.movie.getTopRatedMovies.useQuery({
      pageNo: "1",
    });
  const topRatedScroll = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => {
    if (topRatedScroll.current) {
      topRatedScroll.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (topRatedScroll.current) {
      topRatedScroll.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };
  if (topRatedLoading) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Top Rated Movies
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Top Rated Movies
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={topRatedScroll}
      >
        {topRatedMovies?.results.map((movie: MovieSchema) => (
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
