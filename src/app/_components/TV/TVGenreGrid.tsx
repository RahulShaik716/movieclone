import { api } from "~/trpc/react";
import TVByGenre from "./TVByGenre";

import type { TVShowGenre } from "~/server/schema/TV.schema";

export default function TVGenreGrid() {
  const { data: genres, isLoading: isLoadingGenres } =
    api.tvshows.getTVShowGenres.useQuery();
  if (isLoadingGenres) {
    return <div className="mb-10 h-80 p-4">Loading...</div>;
  }
  return (
    <div>
      {genres?.genres.map((genre: TVShowGenre) => (
        <TVByGenre genre={genre} key={genre.id} /> // use the HorizantalCard component here
      ))}
    </div>
  );
}
