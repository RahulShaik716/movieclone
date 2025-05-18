import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import type { TVShowDetails } from "~/server/schema/TV.schema";
import type { MovieGenre } from "~/server/schema/movie.schema";
import { useRouter } from "next/navigation";

export default function TVDetails({ tv }: { tv: TVShowDetails }) {
  const [imdb, setImdb_id] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const castScroll = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: tvDetails, isLoading: tvDetailsLoading } =
    api.tvshows.getTVShowDetails.useQuery({
      series_id: tv.id.toString(),
    });
  const seasonsPerPage = 5;
  // Automatically switch pages based on the selected season
  useEffect(() => {
    const page = Math.floor(selectedSeason / seasonsPerPage);
    setCurrentPage(page);
  }, [selectedSeason]);

  const { data: seasonDetails, isLoading: seasonLoading } =
    api.tvshows.getSeasonDetails.useQuery({
      series_id: tv.id.toString(),
      season_number: selectedSeason?.toString(),
    });

  const { data: cast, isLoading: castLoading } =
    api.tvshows.getTVShowCredits.useQuery({
      series_id: tv.id.toString(),
    });

  if (!tvDetails || castLoading || seasonLoading)
    return <div className="mb-10 h-80 p-4">Loading...</div>;

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    (tvDetails?.seasons?.length ?? 0) / seasonsPerPage,
  );

  // Get the seasons for the current page
  const paginatedSeasons = tvDetails.seasons?.slice(
    currentPage * seasonsPerPage,
    (currentPage + 1) * seasonsPerPage,
  );

  return (
    <div className="max-w-8xl flex h-fit flex-col rounded-lg bg-black pt-[10vh] text-white shadow-lg">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Image
          width={1000}
          height={800}
          className="aspect-video h-auto w-full object-contain"
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt={tv.name}
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
            src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
            alt={tv.name}
            unoptimized
          />
          <div className="flex max-w-[66ch] flex-col gap-y-0.5">
            <p className="font-[Oswald] text-3xl font-bold">{tv.name}</p>
            <p className="mt-2 text-lg">Overview:</p>
            <p className="text-md font-sans font-light">{tvDetails.overview}</p>

            <p className="text-md font-thin">
              Release Date : {new Date(tvDetails.first_air_date).toDateString()}
            </p>
            <div className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
              <div className="flex w-full flex-row">
                {`Genres:`}&nbsp;
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(9ch,1fr))] gap-y-1">
                  {tvDetails.genres
                    .map((genre: MovieGenre) => genre.name)
                    .join(", ")}
                </div>
              </div>
              <div className=""> Seasons : {tvDetails.number_of_seasons}</div>
              <div className="">
                Rating : {Math.round(tvDetails.vote_average)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Producers
        </h2>
        <div className="search-bar max-w-5xl overflow-x-auto overflow-y-hidden px-2 py-4 whitespace-nowrap">
          <div className="flex justify-center gap-4">
            {tvDetails.production_companies.map((producer) => (
              <div
                key={producer.id}
                className="flex max-w-[100px] min-w-[100px] flex-shrink-0 flex-col items-center"
              >
                <div className="relative h-24 w-24 shadow-md">
                  {producer.logo_path ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={`https://image.tmdb.org/t/p/original${producer.logo_path}`}
                      alt={producer.name}
                      className="bg-opacity-50 h-full w-full bg-white object-contain p-2 shadow-md backdrop-blur-lg"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white p-2 text-center text-sm text-wrap text-black shadow-md backdrop-blur-md">
                      {producer.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          BroadCast Networks
        </h2>
        <div className="search-bar max-w-5xl overflow-x-auto overflow-y-hidden px-2 py-4 whitespace-nowrap">
          <div className="flex justify-center gap-4">
            {tvDetails.networks.map((network) => (
              <div
                key={network.id}
                className="flex max-w-[100px] min-w-[100px] flex-shrink-0 flex-col items-center"
              >
                <div className="relative h-24 w-24 shadow-md">
                  {network.logo_path ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                      alt={network.name}
                      className="bg-opacity-50 h-full w-full bg-white object-contain p-2 shadow-md backdrop-blur-lg"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white p-2 text-center text-sm text-wrap text-black shadow-md backdrop-blur-md">
                      {network.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-white">Cast</h2>
        <div className="jusity-start relative flex max-w-5xl items-center px-2 py-4 whitespace-nowrap">
          <div
            className="search-bar flex justify-start gap-4 overflow-x-auto overflow-y-hidden px-10"
            ref={castScroll}
          >
            {cast?.cast.map((actor) => (
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
                  <p className="max-h-24 truncate overflow-hidden text-xs text-wrap text-gray-400">
                    {actor.roles.map((role) => role.character).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* select menu for seasons */}
      <div className="flex justify-between">
        <div className="flex justify-center gap-4 py-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`rounded px-4 py-2 ${
                currentPage === index
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700"
              }`}
              onClick={() => setCurrentPage(index)}
            >
              Page {index + 1}
            </button>
          ))}
        </div>
        <div className="p-2">
          <select
            className="bg-black p-2 text-white"
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            value={selectedSeason}
          >
            {tvDetails.seasons.map((season, index) => (
              <option key={index} value={season.season_number} className="p-2">
                {season.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Render Seasons */}
      <div className="flex w-full items-center justify-center gap-x-4 py-2">
        {paginatedSeasons?.map((season, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-xl px-4 py-2 ${
              selectedSeason === index + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-700"
            }`}
            onClick={() => setSelectedSeason(index + 1)}
          >
            {season.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {seasonDetails?.episodes?.map((episode, index) => (
          <div className="mb-4 flex flex-row gap-x-4 px-2 py-4" key={index}>
            <Image
              width={1000}
              height={1000}
              className="aspect-video h-[15vh] w-[12vw] cursor-pointer rounded-lg object-fill shadow-md backdrop-blur-md"
              src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
              alt={episode?.name}
              unoptimized
              onClick={() => {
                setSelectedEpisode(episode.episode_number);
                sessionStorage.setItem(
                  "watch_url",
                  `https://vidsrc.to/embed/tv/${imdb}/${selectedSeason}/${episode.episode_number}`,
                );
                router.push(`/player`);
              }}
            />
            <div className="text-white">
              <p>
                {index + 1} . {episode.name}
              </p>
              <p className="font-sans font-light">{episode.air_date}</p>
              <p>Duration : {episode.runtime} min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
