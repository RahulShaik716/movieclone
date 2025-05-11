"use client";

import { useState, useEffect } from "react";
import MovieCard from "./_components/card";
import Image from "next/image";
import Button from "./_components/Button";
import TVCard from "./_components/TVCard";
import NowPlaying from "./_components/NowPlaying";
import UpcomingMovies from "./_components/UpcomingMovies";
import PopularMovies from "./_components/Popular";
import TopRated from "./_components/TopRated";
import GenreGrid from "./_components/GenreGrid";
import TrendingMovies from "./_components/TrendingMovies";
export default function Home() {
  return (
    <main className="w-full bg-black">
      {/* <div className="mx-auto flex w-full justify-center gap-x-4 p-2 py-4 text-white">
        <Button onClick={() => setShowMovies(true)}> Movies</Button>
        <Button onClick={() => setShowMovies(false)}> TV Shows</Button>
      </div> */}
      {/* {showMovies && (
        <section className="max-w-8xl container mx-auto grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-8 p-10">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      )}
      {!showMovies && (
        <section className="max-w-8xl container mx-auto grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-8 p-10">
          {tvshows.map((tvshow) => (
            <TVCard key={tvshow.id} tv={tvshow} />
          ))}
        </section>
      )}
      <div className="flex justify-center gap-4 p-4">
        <Button onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}>
          <Image
            src="/chevron_left.svg"
            width={1024}
            height={1024}
            alt="Previous Page"
            className="h-6 w-6 object-contain"
          />
        </Button>
        <button
          onClick={() => setPageNo((prev) => prev + 1)}
          className="rounded bg-orange-700 px-2 py-1 text-white hover:bg-gray-600"
        >
          <Image
            src="/chevron_right.svg"
            width={1024}
            height={1024}
            alt="Next Page"
            className="h-6 w-6 object-contain text-white"
          />
        </button>
      </div> */}

      <TrendingMovies />
      <div className="w-full">
        <NowPlaying />
        <UpcomingMovies />
        <PopularMovies />
        <TopRated />
        <GenreGrid />
      </div>
    </main>
  );
}
