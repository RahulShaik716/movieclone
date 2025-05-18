import { api } from "~/trpc/react";
import MovieByGenre from "./Genre";
import type { MovieGenre } from "~/server/schema/movie.schema";

export default function GenreGrid() {
  const { data: genres, isLoading: isLoadingGenres } =
    api.movie.getAllGenreIds.useQuery();
  if (isLoadingGenres) {
    return <div className="mb-10 h-80 p-4">Loading...</div>;
  }
  return (
    <div>
      {genres?.genres.map((genre: MovieGenre) => (
        <MovieByGenre genre={genre} key={genre.id} /> // use the HorizantalCard component here
      ))}
    </div>
  );
}
