import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const series_id = searchParams.get("series_id") ?? "1";
  const results = await api.tvshows.getTVShowExternalIds({
    series_id: series_id,
  });
  return NextResponse.json(results);
}
