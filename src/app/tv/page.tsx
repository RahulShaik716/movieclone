"use client";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TVDetails from "~/app/_components/TV/TVDetails";
import type { TVShow } from "~/server/schema/TV.schema";

function TVContent() {
  const searchParams = useSearchParams();
  if (!searchParams.get("data")) return notFound();

  let tv: TVShow | null = null;
  try {
    tv = JSON.parse(decodeURIComponent(searchParams.get("data")!)) as TVShow;
  } catch {
    return notFound();
  }

  if (!tv) {
    return <p className="text-white">No Show ID provided.</p>;
  }

  return <TVDetails tv={tv} />;
}

export default function TVPage() {
  return (
    <Suspense
      fallback={<div className="p-4 text-white">Loading TV show...</div>}
    >
      <TVContent />
    </Suspense>
  );
}
