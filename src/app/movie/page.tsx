"use client";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MovieDetails from "../_components/details";
import type { MovieSchema } from "~/server/schema/movie.schema";

function MovieContent() {
  const searchParams = useSearchParams();
  if (!searchParams.get("data")) return notFound();

  let movie: MovieSchema | null = null;
  try {
    const dataParam = searchParams.get("data");
    movie = JSON.parse(decodeURIComponent(dataParam!)) as MovieSchema;
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

export default function MoviePage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading movie...</div>}>
      <MovieContent />
    </Suspense>
  );
}
