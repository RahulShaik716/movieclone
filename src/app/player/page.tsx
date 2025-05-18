"use client";
import { useEffect, useState } from "react";

export default function PlayerPage() {
  const [watchUrl, setWatchUrl] = useState<string | null>(null);

  useEffect(() => {
    setWatchUrl(sessionStorage.getItem("watch_url"));
  }, []);

  if (!watchUrl) {
    return <div className="p-4 text-white">Loading player...</div>;
  }

  return (
    <iframe
      className="absolute z-10 mx-auto mt-4 aspect-video h-full w-full rounded-lg p-2 shadow-md"
      src={watchUrl}
      title="Video Player"
      allowFullScreen
    ></iframe>
  );
}
