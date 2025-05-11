export default function MovieSkeleton() {
  return (
    <div className="search-bar flex h-80 w-full flex-row gap-x-4 overflow-x-auto p-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex h-72 w-3xl animate-pulse flex-col">
          <div className="aspect-video h-64 w-full rounded-lg bg-white"></div>
          <div className="mx-auto mt-2 h-6 w-3/4 rounded bg-orange-500"></div>
        </div>
      ))}
    </div>
  );
}
