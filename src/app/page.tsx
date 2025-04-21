"use client";

import { useState, useEffect } from "react";
import MovieCard from "./_components/card";

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(`/api/movies?pageNo=${pageNo}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      setMovies(data);
    }
    fetchMovies();
  }, [pageNo]);

  return (
    <main className="bg-black">
      <section className="container mx-auto grid max-w-7xl grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-1 gap-y-8 p-10">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
      <div className="flex justify-center gap-4 p-4">
        <button
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
          className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
        >
          Prev
        </button>
        <button
          onClick={() => setPageNo((prev) => prev + 1)}
          className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </main>
  );
}
