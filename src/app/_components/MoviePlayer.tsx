import Button from "./Button";

export default function MoviePlayer({
  imdb,
  setPlay,
}: {
  imdb: string;
  setPlay: (play: boolean) => void;
}) {
  return (
    <div className="absolute inset-0 z-20 min-h-screen min-w-screen bg-white">
      <div className="p-2">
        <Button onClick={() => setPlay(false)}>Back</Button>
      </div>
      <iframe
        className="aspect-video h-full w-full object-contain shadow-md"
        src={`https://vidsrc.to/embed/movie/${imdb}`}
        title="Movie"
        allowFullScreen
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}
