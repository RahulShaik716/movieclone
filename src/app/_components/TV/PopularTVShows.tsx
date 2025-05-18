import { api } from "~/trpc/react";

import { useRef } from "react";

import MovieSkeleton from "../MovieSkeleton";
import HorizantalTVCard from "./HorizantalTVCard";
import ScrollButton from "../ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import type { TVShow } from "~/server/schema/TV.schema";

export default function PopularTVShows() {
  const popularScroll = useRef<HTMLDivElement>(null);
  const { data: popularTVShows, isLoading: popularTVShowsLoading } =
    api.tvshows.getPopularTVShows.useQuery({
      pageNo: 1,
    });

  const scrollToEnd = () => {
    if (popularScroll.current) {
      popularScroll.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (popularScroll.current) {
      popularScroll.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  if (popularTVShowsLoading) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Popular TV Shows
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Popular TV Shows
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={popularScroll}
      >
        {popularTVShows?.results.map((tvShow: TVShow) => (
          <HorizantalTVCard tvShow={tvShow} key={tvShow.id} />
        ))}
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
