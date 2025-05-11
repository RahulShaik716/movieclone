import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const series_id = searchParams.get("series_id") ?? "1";

  const results = await api.tvshows.getTVShowDetails({
    series_id: series_id,
  });
  console.log(results);
  return NextResponse.json(results);
}
