import { api } from "~/trpc/react";
import MovieSkeleton from "./MovieSkeleton";
import HorizantalCard from "./MovieHCard";
import { useRef } from "react";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";

export default function MovieByGenre({ genre }) {
  const { data: movies, isLoading: isLoadingMovies } =
    api.movie.getMoviesByGenre.useQuery({
      genreId: genre.id.toString(),
      pageNo: "1",
    });
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };
  if (isLoadingMovies) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          {genre.name}
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        {genre.name}
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={scrollRef}
      >
        {movies.results.map((movie: any) => (
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
