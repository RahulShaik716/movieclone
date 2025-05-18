import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import { useRef } from "react";
import MovieSkeleton from "./MovieSkeleton";
import HorizantalCard from "./MovieHCard";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function NowPlaying() {
  const searchParams = useSearchParams();
  const pageNo = searchParams.get("pageNo") ?? "1";
  const nowPlaying = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => {
    if (nowPlaying.current) {
      nowPlaying.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (nowPlaying.current) {
      nowPlaying.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading } =
    api.movie.getNowPlayingMovies.useQuery({
      pageNo,
    });
  if (nowPlayingLoading || !nowPlayingMovies) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Now Playing
        </h1>
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Now Playing
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={nowPlaying}
      >
        {nowPlayingMovies?.results.map((movie: MovieSchema) => (
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
