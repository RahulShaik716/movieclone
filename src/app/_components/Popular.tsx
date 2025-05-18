import { api } from "~/trpc/react";
import MovieSkeleton from "./MovieSkeleton";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import HorizantalCard from "./MovieHCard";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function PopularMovies() {
  const popularScroll = useRef<HTMLDivElement>(null);
  const { data: popularMovies, isLoading: popularMoviesLoading } =
    api.movie.getPopularMovies.useQuery({
      pageNo: "1",
    });
  const router = useRouter();
  const scrollToEnd = () => {
    if (popularScroll.current) {
      popularScroll.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (popularScroll.current) {
      popularScroll.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };
  console.log(popularMovies);
  if (popularMoviesLoading) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Popular Movies
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Popular Movies
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={popularScroll}
      >
        {popularMovies.results.map((movie: MovieSchema) => (
          <HorizantalCard movie={movie} key={movie.id} />
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
