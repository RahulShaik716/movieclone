import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
import type { TVShow } from "~/server/schema/TV.schema";
type Props = {
  tv: TVShow;
};
export default function TVCard(prop: Props) {
  const router = useRouter();
  return (
    <div
      className="relative flex cursor-pointer flex-col items-start justify-center text-white shadow-orange-500 backdrop-blur-md hover:shadow-lg"
      onClick={() => {
        const query = encodeURIComponent(JSON.stringify(prop.tv));
        router.push(`/tv?data=${query}`);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${prop.tv.poster_path ?? prop.tv.backdrop_path}`}
        width={1000}
        height={1000}
        alt="movie"
        className="aspect-video h-72 w-full object-fill"
      />
      <div className="absolute bottom-20 left-2 flex flex-col items-center gap-y-1">
        <div className="bg-opacity-50 relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <Rating rating={prop.tv.vote_average} />
          <span className="text-xs font-bold text-white">{`${Math.round(prop.tv.vote_average * 10)}`}</span>
        </div>
      </div>
      <div className="w-full p-2">
        <h2 className="w-full truncate text-lg">{prop.tv.name}</h2>
        <p className="text-md opacity-50">
          {new Date(prop.tv.first_air_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </p>
      </div>
    </div>
  );
}
