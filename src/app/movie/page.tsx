"use client";
import { notFound, useSearchParams } from "next/navigation";
import MovieDetails from "../_components/details";
import { useEffect } from "react";

export default function MoviePage() {
  const searchParams = useSearchParams();
  if (!searchParams.get("data")) return notFound();

  let movie;
  try {
    movie = JSON.parse(decodeURIComponent(searchParams.get("data")));
  } catch {
    return notFound();
  }

  if (!movie) {
    return <p className="text-white">No movie ID provided.</p>;
  }

  useEffect(() => {
    async function fetchImdbId() {
      debugger;
      console.log(movie.id);
      const response = await fetch(`/api/imdb?id=${movie.id}`);
      const data = await response.json();
      console.log(data);
      movie.imdb_id = data.imdb_id;
    }
    void fetchImdbId();
  }, []);

  return <MovieDetails movie={movie} />;
}
