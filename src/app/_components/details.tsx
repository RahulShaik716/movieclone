"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { api } from "~/trpc/react";
import SimilarMovies from "./SimilarMovies";
import MoviePlayer from "./MoviePlayer";
import ScrollButton from "./ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import ReactPlayer from "react-player";
import Sound from "public/Sound";
import type {
  MovieDetailsSchema,
  MovieGenre,
} from "~/server/schema/movie.schema";

import { useRouter } from "next/navigation";
// {
//   "adult": false,
//   "backdrop_path": "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
//   "belongs_to_collection": {
//       "id": 1461530,
//       "name": "The Minecraft Movie Collection",
//       "poster_path": "/8jMQ2sVZ1RRiYSpcb7Yommo7V4r.jpg",
//       "backdrop_path": "/48TbIdb60bjLvVhj6W71YNvDM2p.jpg"
//   },
//   "budget": 150000000,
//   "genres": [
//       {
//           "id": 10751,
//           "name": "Family"
//       },
//       {
//           "id": 35,
//           "name": "Comedy"
//       },
//       {
//           "id": 12,
//           "name": "Adventure"
//       },
//       {
//           "id": 14,
//           "name": "Fantasy"
//       }
//   ],
//   "homepage": "https://www.minecraft-movie.com",
//   "id": 950387,
//   "imdb_id": "tt3566834",
//   "origin_country": [
//       "US"
//   ],
//   "original_language": "en",
//   "original_title": "A Minecraft Movie",
//   "overview": "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
//   "popularity": 473.4577,
//   "poster_path": "/iPPTGh2OXuIv6d7cwuoPkw8govp.jpg",
//   "production_companies": [
//       {
//           "id": 174,
//           "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
//           "name": "Warner Bros. Pictures",
//           "origin_country": "US"
//       },
//       {
//           "id": 923,
//           "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
//           "name": "Legendary Pictures",
//           "origin_country": "US"
//       },
//       {
//           "id": 110691,
//           "logo_path": "/i0D9b0veZbValgEFiJjSd0mbb9C.png",
//           "name": "Mojang Studios",
//           "origin_country": "SE"
//       },
//       {
//           "id": 829,
//           "logo_path": "/aXqwCvJSCDbTclkxAYfsT1l4Dsa.png",
//           "name": "Vertigo Entertainment",
//           "origin_country": "US"
//       },
//       {
//           "id": 159602,
//           "logo_path": "/e3KodIPxOSC6xpzgIBISB4COQcu.png",
//           "name": "On the Roam",
//           "origin_country": "US"
//       },
//       {
//           "id": 216687,
//           "logo_path": "/kKVYqekveOvLK1IgqdJojLjQvtu.png",
//           "name": "Domain Entertainment",
//           "origin_country": "US"
//       }
//   ],
//   "production_countries": [
//       {
//           "iso_3166_1": "SE",
//           "name": "Sweden"
//       },
//       {
//           "iso_3166_1": "US",
//           "name": "United States of America"
//       }
//   ],
//   "release_date": "2025-03-31",
//   "revenue": 717824380,
//   "runtime": 101,
//   "spoken_languages": [
//       {
//           "english_name": "English",
//           "iso_639_1": "en",
//           "name": "English"
//       }
//   ],
//   "status": "Released",
//   "tagline": "Be there and be square.",
//   "title": "A Minecraft Movie",
//   "video": false,
//   "vote_average": 6.2,
//   "vote_count": 725
// }
export default function MovieDetails({ movie }: { movie: MovieDetailsSchema }) {
  const [play, setPlay] = useState(false);
  const [movieDetails, setMovieDetails] = useState<
    MovieDetailsSchema | undefined
  >();
  const [cast, setCast] = useState([]);
  const castScroll = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: videoDetails, isLoading: isVideoLoading } =
    api.movie.getMovieTrailers.useQuery({
      movieId: movie.id.toString(),
    });

  const { mutate: getCast, isPending: castLoading } =
    api.movie.getMovieCast.useMutation({
      onSuccess: (data) => {
        console.log(data);
        setCast(data.cast);
      },
      onError: (error) => {
        console.error("Error fetching movie data:", error);
      },
    });
  useEffect(() => {
    async function fetchImdbId() {
      console.log(movie.id);
      const response = await fetch(`/api/imdb?id=${movie.id}`);
      const data = await response.json();
      console.log(data);
      setMovieDetails(data);
      setImdb_id(data.imdb_id);
    }
    void fetchImdbId();
    getCast({ movieId: movie.id.toString() });
  }, [movie.id]);

  if (!movieDetails) {
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
                    // ` https://multiembed.mov/?video_id=${movie.id}&tmdb=1`,
                    //  `https://getsuperembed.link/?video_id=${movieDetails.imdb_id}`,
                    // `https://fsapi.xyz/movie/${movieDetails.imdb_id}`,
                    //  `https://vidsrc.xyz/embed/movie/${movie.id}`,
                    // `https://vidcloud.io/${movieDetails.imdb_id}.html`,
                  );
                  router.push("/player");
                }}
              >
                Watch Now
              </Button>
              <Button onClick={() => {}}> Watch Trailer </Button>
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
            {movieDetails.production_companies &&
              movieDetails.production_companies.map((actor) => (
                <div
                  key={actor.id}
                  className="flex max-w-[100px] min-w-[100px] flex-shrink-0 flex-col items-center"
                >
                  <div className="relative h-24 w-24 shadow-md">
                    {actor.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${actor.logo_path}`}
                        alt={actor.name}
                        className="bg-opacity-50 h-full w-full bg-white object-contain p-2 shadow-md backdrop-blur-lg"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white p-2 text-center text-sm text-wrap text-black shadow-md backdrop-blur-md">
                        {actor.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <SimilarMovies movieId={movie.id} />
      {/* {play && <MoviePlayer imdb={movieDetails.imdb_id} setPlay={setPlay} />} */}
    </div>
  );
}
