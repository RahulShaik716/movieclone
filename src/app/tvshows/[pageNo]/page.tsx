"use client";
import { Suspense } from "react";
import AiringToday from "~/app/_components/TV/AiringToday";
import OnTheAir from "~/app/_components/TV/OnTheAir";
import PopularTVShows from "~/app/_components/TV/PopularTVShows";
import TopRatedTVShows from "~/app/_components/TV/TopRatedTVShows";
import TVGenreGrid from "~/app/_components/TV/TVGenreGrid";

export default function Index() {
  return (
    <main className="w-full text-orange-500">
      <Suspense fallback={<div>Loading airing today...</div>}>
        <AiringToday />
      </Suspense>
      <Suspense fallback={<div>Loading on the air...</div>}>
        <OnTheAir />
      </Suspense>
      <Suspense fallback={<div>Loading popular TV shows...</div>}>
        <PopularTVShows />
      </Suspense>
      <Suspense fallback={<div>Loading top rated TV shows...</div>}>
        <TopRatedTVShows />
      </Suspense>
      <Suspense fallback={<div>Loading TV genres...</div>}>
        <TVGenreGrid />
      </Suspense>
    </main>
  );
}
