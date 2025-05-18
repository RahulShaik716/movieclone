import { useRef } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import type { MovieSchema } from "~/server/schema/movie.schema";

export default function SimilarMovies({ movieId }: { movieId: string }) {
  const { data: similarMovies } = api.movie.getSimilarMovies.useQuery({
    movieId: movieId.toString(),
  });
  const router = useRouter();
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

  return (
    <div className="p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-white">
        Recommend Movies
      </h1>
      <div className="relative px-10">
        <div
          ref={scrollRef}
          className="search-bar flex w-full flex-row gap-x-4 overflow-x-auto"
        >
          {similarMovies?.results.map((movie: MovieSchema) => (
            <div
              key={movie.id}
              className="h-fit max-w-sm min-w-fit"
              onClick={() => {
                const query = encodeURIComponent(JSON.stringify(movie));
                router.push(`/movie?data=${query}`);
              }}
            >
              {movie.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  width={500}
                  height={300}
                  alt="movie"
                  className="aspect-auto h-auto w-full max-w-md rounded-lg object-contain"
                  unoptimized
                />
              ) : (
                <div className="flex aspect-video h-full w-md items-center justify-center rounded-lg bg-white px-4 text-xl text-black"></div>
              )}
              <div className="text-md flex w-full justify-center rounded px-2 py-1 font-bold text-white">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
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
