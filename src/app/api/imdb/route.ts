import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const Tmdb_ID = searchParams.get("id");

  const results = await api.movie.getImdbId({ movieId: Tmdb_ID });
  return NextResponse.json(results);
}
