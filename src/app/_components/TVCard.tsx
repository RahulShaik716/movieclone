import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "./Rating";
// adult: false,
// backdrop_path: '/qhfPZOCZPTzArvMq78180NqzbWd.jpg',
// genre_ids: [ 10766 ],
// id: 14743,
// origin_country: [ 'ES' ],
// original_language: 'ca',
// original_name: 'El Cor de la Ciutat',
// overview: 'El cor de la ciutat is a TVC television soap opera first broadcast on TV3 on 11 September 2000 and last broadcast on 23 December 2009. The show is the most watched fiction program in Catalonia, Spain, especially among female audiences, drawing around 28-33% of the audience with as much as 40% during season finales. El cor de la ciutat follows the lives of the people who live and work in the neighbourhood of Sants and Sant Andreu in Barcelona, Catalonia, Spain.',
// popularity: 382.4915,
// poster_path: '/xQ83cJA8AxoQMZe8ADApWrRZB1v.jpg',
// first_air_date: '2000-09-11',
// name: 'El Cor de la Ciutat',
// vote_average: 5.3,
// vote_count: 5
// }
type Props = {
  tv: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
  };
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
