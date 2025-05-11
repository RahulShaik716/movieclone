"use client";

import { api } from "~/trpc/react";

export default function PlayerPage() {
  const watchUrl = sessionStorage.getItem("watch_url");

  return (
    <iframe
      className="absolute z-10 mx-auto mt-4 aspect-video h-full w-full rounded-lg p-2 shadow-md"
      src={watchUrl ?? ""}
      title="Video Player"
      allowFullScreen
    ></iframe>
  );
}
