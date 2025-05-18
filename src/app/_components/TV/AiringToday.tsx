import { api } from "~/trpc/react";
import HorizantalCard from "../MovieHCard";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import MovieSkeleton from "../MovieSkeleton";
import HorizantalTVCard from "./HorizantalTVCard";
import ScrollButton from "../ScrollButton";
import ChevronLeft from "public/ChevronLeft";
import ChevronRight from "public/ChevronRight";
import type { TVShow } from "~/server/schema/TV.schema";

export default function AiringToday() {
  const airingTodayScroll = useRef<HTMLDivElement>(null);
  const { data: airingTodayTvShows, isLoading: airingTodayTvShowsLoading } =
    api.tvshows.getAiringTodayShows.useQuery({
      pageNo: 1,
    });

  const scrollToEnd = () => {
    if (airingTodayScroll.current) {
      airingTodayScroll.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  const scrollToStart = () => {
    if (airingTodayScroll.current) {
      airingTodayScroll.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  if (airingTodayTvShowsLoading) {
    return (
      <div className="mb-10 h-80 p-4">
        <h1 className="mb-2 px-10 text-2xl font-bold text-white">
          Airing Today
        </h1>
        {/* generate a skeletion similar to the card below */}
        <MovieSkeleton />
      </div>
    );
  }
  return (
    <div className="relative p-4">
      <h1 className="mb-2 px-10 text-2xl font-bold text-orange-500">
        Airing Today
      </h1>
      <div
        className="search-bar flex w-full cursor-pointer flex-row gap-x-4 overflow-x-auto px-10"
        ref={airingTodayScroll}
      >
        {airingTodayTvShows?.results.map((tvShow: TVShow) => (
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
