"use client";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import type { MovieSchema } from "~/server/schema/movie.schema";
import { useSession } from "next-auth/react";

export default function MovieBanner({
  movie,
  activeMovieId,
}: {
  movie: MovieSchema;
  activeMovieId: number | undefined;
}) {
  const router = useRouter();
  console.log("activeMovieId", activeMovieId);
  const { data: session } = useSession();
  return (
    <div className="relative h-full w-full overflow-hidden" key={movie.id}>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        width={1000}
        height={1000}
        className="aspect-video h-full w-full rounded-lg object-fill"
      />
      <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-50"></div>
      <div className="absolute top-0 left-2 z-10 h-screen w-screen">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex max-w-4xl flex-row gap-x-4 text-white">
            <Image
              width={1000}
              height={1000}
              className="aspect-video h-[35vh] w-[12vw] rounded-lg object-fill shadow-md backdrop-blur-md"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              unoptimized
            />
            <div className="flex max-w-[66ch] flex-col gap-y-0.5">
              <p className="font-[Oswald] text-3xl font-bold">{movie.title}</p>
              <div className="mt-2 flex flex-row gap-x-2">
                {session?.user.email && (
                  <Button
                    onClick={() => {
                      sessionStorage.setItem(
                        "watch_url",
                        `https://vidsrc.to/embed/movie/${movie.id}`,
                      );
                      router.push("/player");
                    }}
                  >
                    Watch Now
                  </Button>
                )}
                {/* <Button onClick={() => {}}> Watch Trailer </Button> */}
              </div>
              <p className="mt-2 text-lg">Overview:</p>
              <p className="text-md font-sans font-light">{movie.overview}</p>

              <p className="text-md font-thin">
                Release Date : {new Date(movie.release_date).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
