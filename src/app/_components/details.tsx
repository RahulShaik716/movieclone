export default function MovieDetails({ movie }) {
  console.log(movie);
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-800 p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
      <p className="mt-2 text-gray-300">{movie.overview}</p>
      <p className="mt-2 text-gray-400">Release Date: {movie.release_date}</p>

      <iframe
        className="mt-4 h-[80vh] w-[90vw] rounded-lg shadow-md"
        src={`https://vidsrc.xyz/embed/movie/${movie.imdb_id}`}
        title="Movie Trailer"
        allowFullScreen
      ></iframe>
    </div>
  );
}
