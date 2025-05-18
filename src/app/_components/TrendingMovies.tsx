import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import MovieBanner from "./MovieBanner";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function TrendingMovies() {
  const { data: movies, isLoading: isLoadingMovies } =
    api.movie.getTrendingMovies.useQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Automatically change the index every second
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // Change slide every 20 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  const handleNext = () => {
    if (movies && currentIndex < movies.results.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (movies) {
      setCurrentIndex(0); // Loop back to the first slide
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (movies) {
      setCurrentIndex(movies.results.length - 1); // Go to the last slide
    }
  };

  if (isLoadingMovies || !movies) {
    return <div className="mb-10 h-80 p-4">Loading...</div>;
  }

  return (
    <div className="relative">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies?.results.map((movie: MovieSchema) => (
          <div key={movie.id} className="w-full flex-shrink-0">
            <MovieBanner
              movie={movie}
              activeMovieId={
                movies.results[currentIndex]?.id ?? movies.results[0]?.id
              }
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 rounded bg-orange-500 p-2 text-white shadow-md hover:bg-orange-600"
        disabled={currentIndex === 0}
      >
        <ChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded bg-orange-500 p-2 text-white shadow-md hover:bg-orange-600"
        disabled={movies && currentIndex === movies.results.length - 1}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
