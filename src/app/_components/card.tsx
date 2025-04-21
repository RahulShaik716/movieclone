import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  movie: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
};
export default function MovieCard(prop: Props) {
  const router = useRouter();
  return (
    <div
      className="relative flex flex-col items-start justify-center gap-y-2 rounded-lg text-white shadow-md"
      onClick={() => {
        const query = encodeURIComponent(JSON.stringify(prop.movie));
        router.push(`/movie?data=${query}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${prop.movie.backdrop_path}`}
        width={1000}
        height={1000}
        alt="movie"
        className="h-72 w-48 rounded-lg object-cover"
        unoptimized
      />
      <div className="absolute bottom-18 left-2 flex flex-col items-center gap-y-1">
        <div className="bg-opacity-50 relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <svg className="absolute h-full w-full" viewBox="0 0 36 36">
            <circle
              className="text-gray-300"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
            <circle
              className="text-green-500"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${prop.movie.vote_average * 10}, 100`}
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
          </svg>
          <span className="text-xs font-bold text-white">{`${Math.round(prop.movie.vote_average * 10)}`}</span>
        </div>
      </div>
      <h2 className="w-full truncate">{prop.movie.original_title}</h2>
      <p className="opacity-50">{prop.movie.release_date}</p>
    </div>
  );
}
