"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  MovieDetailsSchema,
  MovieSchema,
} from "~/server/schema/movie.schema";
import type { TVShow, TVShowDetails } from "~/server/schema/TV.schema";
import { api } from "~/trpc/react";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    (MovieDetailsSchema | TVShowDetails | TVShow | MovieSchema)[]
  >([]);
  const { mutate: searchMovie, isPending: isLoading } =
    api.movie.searchMovie.useMutation({
      onSuccess: (data) => {
        console.log(data);
        setSearchResults((results) => [...results, ...data.results]);
      },
      onError: (error) => {
        console.error("Error fetching movie data:", error);
      },
    });
  const { mutate: searchTVShow, isPending: isTvLoading } =
    api.tvshows.searchTVShow.useMutation({
      onSuccess: (data) => {
        console.log(data);
        setSearchResults((results) => [...results, ...data.results]);
      },
      onError: (error) => {
        console.error("Error fetching movie data:", error);
      },
    });
  useEffect(() => {
    const fetchData = () => {
      searchMovie({ query: search });
      searchTVShow({ query: search });
    };
    if (search.length > 3) {
      const timer = setTimeout(() => void fetchData(), 1000);

      return () => clearTimeout(timer);
    }
  }, [search, searchMovie, searchTVShow]);

  return (
    <div className="relative flex items-center justify-center">
      <input
        type="search"
        placeholder="Search..."
        className="w-full max-w-md rounded-md bg-transparent p-1 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
          setSearchResults([]);
        }}
        value={search}
      />

      {(isLoading || isTvLoading) && (
        <div className="absolute top-14 z-10 mt-2 w-full max-w-md rounded-md bg-black p-4 shadow-lg">
          <div className="search-bar mt-2 max-h-60 overflow-y-auto">
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="absolute top-14 z-10 mt-2 rounded-md bg-black p-4 shadow-lg">
          <div className="search-bar mt-2 max-h-[60vh] w-lg overflow-y-auto">
            {searchResults.map((result, index: number) => (
              <div
                key={index}
                className="mb-2 flex w-full flex-row gap-x-1 p-1 text-white"
                onClick={() => {
                  const query = encodeURIComponent(JSON.stringify(result));
                  if ("title" in result) {
                    window.location.href = `/movie?data=${query}`;
                  } else {
                    window.location.href = `/tv?data=${query}`;
                  }
                }}
              >
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${
                      "poster_path" in result && result.poster_path
                        ? result.poster_path
                        : "backdrop_path" in result && result.backdrop_path
                          ? result.backdrop_path
                          : ""
                    }`}
                    width={1000}
                    height={1000}
                    alt="movie"
                    className="aspect-video h-32 w-24 object-contain"
                    unoptimized
                  />
                </div>
                <div className="">
                  <h2 className="text-md max-w-sm truncate font-bold">
                    {"title" in result ? result.title : result.name}
                  </h2>
                  <p className="">Rating : {Math.round(result.vote_average)}</p>
                  <p className="text-sm opacity-50">
                    {new Date(
                      "release_date" in result && result.release_date
                        ? new Date(result.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                            },
                          )
                        : "first_air_date" in result && result.first_air_date
                          ? new Date(result.first_air_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              },
                            )
                          : "N/A",
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
