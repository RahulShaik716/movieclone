import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HorizantalTVCard({
  tvShow,
}: {
  tvShow: {
    id: number;
    name: string;
    backdrop_path: string | null;
  };
}) {
  const router = useRouter();
  return (
    <div
      key={tvShow.id}
      className="h-fit max-w-sm min-w-fit"
      onClick={() => {
        const query = encodeURIComponent(JSON.stringify(tvShow));
        router.push(`/tv?data=${query}`);
      }}
    >
      {tvShow.backdrop_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
          width={500}
          height={300}
          alt="movie"
          className="aspect-auto h-auto w-full max-w-md rounded-lg object-contain"
          unoptimized
        />
      ) : (
        <div className="flex aspect-video h-full w-xs items-center justify-center rounded-lg bg-white px-4 text-xl text-black">
          {tvShow.name}
        </div>
      )}
      <div className="text-md flex w-full justify-center rounded px-2 py-1 font-bold text-orange-500">
        {tvShow.name}
      </div>
    </div>
  );
}
