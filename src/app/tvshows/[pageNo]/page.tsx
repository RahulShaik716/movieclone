"use client";
import AiringToday from "~/app/_components/TV/AiringToday";
import OnTheAir from "~/app/_components/TV/OnTheAir";
import PopularTVShows from "~/app/_components/TV/PopularTVShows";
import TopRatedTVShows from "~/app/_components/TV/TopRatedTVShows";
import TVGenreGrid from "~/app/_components/TV/TVGenreGrid";

export default function Index() {
  return (
    <main className="w-full text-orange-500">
      <AiringToday />
      <OnTheAir />
      <PopularTVShows />
      <TopRatedTVShows />
      <TVGenreGrid />
    </main>
  );
}
