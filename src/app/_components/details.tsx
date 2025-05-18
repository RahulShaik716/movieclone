"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { api } from "~/trpc/react";
import SimilarMovies from "./SimilarMovies";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";

import type {
  MovieCastMember,
  MovieGenre,
  MovieSchema,
  ProductionCompany,
} from "~/server/schema/movie.schema";

import { useRouter } from "next/navigation";

export default function MovieDetails({ movie }: { movie: MovieSchema }) {
  const [cast, setCast] = useState<MovieCastMember[]>([]);
  const castScroll = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { mutate: getCast, isPending: castLoading } =
    api.movie.getMovieCast.useMutation({
      onSuccess: (data) => {
        setCast(data.cast);
      },
      onError: (error) => {
        console.error("Error fetching movie data:", error);
      },
    });

  const { data: movieDetails, isLoading: movieDetailsLoading } =
    api.movie.getImdbId.useQuery({
      movieId: movie.id.toString(),
    });
  useEffect(() => {
    getCast({ movieId: movie.id.toString() });
  }, [movie.id]);

  if (!movieDetails || movieDetailsLoading || castLoading) {
    return <div> No Movie Details Found </div>;
  }
  return (
    <div className="max-w-8xl flex h-fit flex-col rounded-lg bg-black pt-[10vh] text-white shadow-lg">
      <div className="absolute inset-0 h-full w-full">
        <Image
          width={1000}
          height={800}
          className="aspect-video h-auto w-full object-contain"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          unoptimized
        />
      </div>
      <div
        className={`absolute inset-0 h-[118vh] w-full bg-black pt-[10vh] opacity-70`}
      ></div>
      <div className="z-2 flex h-[100vh] flex-col items-start justify-center px-24">
        <div className="flex max-w-4xl flex-row gap-x-4">
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
              <Button
                onClick={() => {
                  console.log("watch trailer");
                }}
              >
                {" "}
                Watch Trailer{" "}
              </Button>
            </div>
            <p className="mt-2 text-lg">Overview:</p>
            <p className="text-md font-sans font-light">{movie.overview}</p>

            <p className="text-md font-thin">
              Release Date : {new Date(movie.release_date).toDateString()}
            </p>
            <div className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
              <div className="flex w-full flex-row">
                {`Genres:`}&nbsp;
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(9ch,1fr))] gap-y-1">
                  {movieDetails.genres
                    .map((genre: MovieGenre) => genre.name)
                    .join(", ")}
                </div>
              </div>
              {!!movieDetails?.revenue && (
                <div className="">
                  <p className="">
                    Revenue:&nbsp;
                    {`$${movieDetails.revenue.toLocaleString()}`}
                  </p>
                </div>
              )}
              <div className="">
                <p className="">
                  Duration:&nbsp;
                  {movieDetails.runtime ? `${movieDetails.runtime} min` : "N/A"}
                </p>
              </div>
              <div>
                <p className="">
                  Budget :{" "}
                  {movieDetails.budget
                    ? `$${movieDetails.budget.toLocaleString()}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">Cast</h2>
        <div className="jusity-start relative flex max-w-5xl items-center px-2 py-4 whitespace-nowrap">
          <div
            className="search-bar flex justify-start gap-4 overflow-x-auto overflow-y-hidden px-10"
            ref={castScroll}
          >
            {cast.map((actor) => (
              <div key={actor.id} className="flex flex-col items-center">
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md">
                  {actor.profile_path ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-300 text-sm text-gray-600">
                      N/A
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="truncate text-sm font-semibold text-wrap">
                    {actor.name}
                  </p>
                  <p className="truncate text-xs text-wrap text-gray-400">
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollButton
            onClick={() => castScroll.current?.scrollBy({ left: -500 })}
            direction="left"
          >
            <ChevronLeft />
          </ScrollButton>
          <ScrollButton
            onClick={() => castScroll.current?.scrollBy({ left: 500 })}
            direction="right"
          >
            <ChevronRight />
          </ScrollButton>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Producers
        </h2>
        <div className="search-bar max-w-5xl overflow-x-auto overflow-y-hidden px-2 py-4 whitespace-nowrap">
          <div className="flex justify-center gap-4">
            {movieDetails.production_companies.map(
              (productionCompany: ProductionCompany) => (
                <div
                  key={productionCompany.id}
                  className="flex max-w-[100px] min-w-[100px] flex-shrink-0 flex-col items-center"
                >
                  <div className="relative h-24 w-24 shadow-md">
                    {productionCompany.logo_path ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={`https://image.tmdb.org/t/p/original${productionCompany.logo_path}`}
                        alt={productionCompany.name}
                        className="bg-opacity-50 h-full w-full bg-white object-contain p-2 shadow-md backdrop-blur-lg"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white p-2 text-center text-sm text-wrap text-black shadow-md backdrop-blur-md">
                        {productionCompany.name}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <SimilarMovies movieId={movie.id.toString()} />
    </div>
  );
}
