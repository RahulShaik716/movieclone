import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
type Props = {
  movie: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
};
export default function MovieCard(prop: Props) {
  const router = useRouter();
  return (
    <div
      className="relative flex cursor-pointer flex-col items-start justify-center text-white shadow-orange-500 backdrop-blur-md hover:shadow-lg"
      onClick={() => {
        const query = encodeURIComponent(JSON.stringify(prop.movie));
        router.push(`/movie?data=${query}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${prop.movie.poster_path ?? prop.movie.backdrop_path}`}
        width={1000}
        height={1000}
        alt="movie"
        className="aspect-video h-72 w-72 object-fill"
        unoptimized
      />
      <div className="absolute bottom-20 left-2 flex flex-col items-center gap-y-1">
        <div className="bg-opacity-50 relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <Rating rating={prop.movie.vote_average} />
          <span className="text-xs font-bold text-white">{`${Math.round(prop.movie.vote_average * 10)}`}</span>
        </div>
      </div>
      <div className="w-full p-2">
        <h2 className="w-full truncate text-lg">{prop.movie.title}</h2>
        <p className="text-md opacity-50">
          {new Date(prop.movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
}
