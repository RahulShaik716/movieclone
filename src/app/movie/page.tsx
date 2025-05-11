"use client";
import { notFound, useSearchParams } from "next/navigation";
import MovieDetails from "../_components/details";

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

  return (
    <div>
      <MovieDetails movie={movie} />
    </div>
  );
}
