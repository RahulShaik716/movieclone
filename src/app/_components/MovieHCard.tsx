import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HorizantalCard({
  movie,
}: {
  movie: {
    id: number;
    title: string;
    backdrop_path: string | null;
  };
}) {
  const router = useRouter();
  if (!movie.backdrop_path) return;
  return (
    <div
      key={movie.id}
      className="h-fit max-w-sm min-w-fit"
      onClick={() => {
        const query = encodeURIComponent(JSON.stringify(movie));
        router.push(`/movie?data=${query}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        width={500}
        height={300}
        alt="movie"
        className="aspect-auto h-auto w-full max-w-md rounded-lg object-contain"
        unoptimized
      />
      <div className="text-md flex w-full justify-center rounded px-2 py-1 font-bold text-orange-500">
        {movie.title}
      </div>
    </div>
  );
}
