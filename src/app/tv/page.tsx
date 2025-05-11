"use client";
import { notFound, useSearchParams } from "next/navigation";
import TVDetails from "~/app/_components/TV/TVDetails";

export default function TVPage() {
  const searchParams = useSearchParams();
  if (!searchParams.get("data")) return notFound();

  let tv;
  try {
    tv = JSON.parse(decodeURIComponent(searchParams.get("data")));
  } catch {
    return notFound();
  }

  if (!tv) {
    return <p className="text-white">No Show ID provided.</p>;
  }

  return (
    <div>
      <TVDetails tv={tv} />
    </div>
  );
}
