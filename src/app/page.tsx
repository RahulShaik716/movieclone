"use client";
import { Suspense } from "react";
import NowPlaying from "./_components/NowPlaying";
import UpcomingMovies from "./_components/UpcomingMovies";
import PopularMovies from "./_components/Popular";
import TopRated from "./_components/TopRated";
import GenreGrid from "./_components/GenreGrid";
import TrendingMovies from "./_components/TrendingMovies";

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Suspense fallback={<div>Loading trending movies...</div>}>
        <TrendingMovies />
      </Suspense>
      <div className="w-full">
        <Suspense fallback={<div>Loading now playing...</div>}>
          <NowPlaying />
        </Suspense>
        <Suspense fallback={<div>Loading upcoming movies...</div>}>
          <UpcomingMovies />
        </Suspense>
        <Suspense fallback={<div>Loading popular movies...</div>}>
          <PopularMovies />
        </Suspense>
        <Suspense fallback={<div>Loading top rated...</div>}>
          <TopRated />
        </Suspense>
        <Suspense fallback={<div>Loading genres...</div>}>
          <GenreGrid />
        </Suspense>
      </div>
    </main>
  );
}
