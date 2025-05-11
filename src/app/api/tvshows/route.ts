import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageNo = searchParams.get("pageNo") ?? "1";

  const { results } = await api.tvshows.getTVShows({ pageNo: Number(pageNo) });
  return NextResponse.json(results);
}
