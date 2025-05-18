import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type {
  Season,
  TVShowAggregateCredits,
  TVShowDetails,
  TVShowExternalIds,
  TVShowGenresList,
  TVShowResults,
} from "~/server/schema/TV.schema";

export const tvrouter = createTRPCRouter({
  getTVShows: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=${input.input.pageNo}&sort_by=popularity.desc`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults[];
      console.log(json);
      return json;
    }),
  // https://api.themoviedb.org/3/tv/{series_id}
  getTVShowDetails: publicProcedure
    .input(
      z.object({
        series_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${input.series_id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowDetails;
      console.log(json);
      return json;
    }),
  getTVShowExternalIds: publicProcedure
    .input(
      z.object({
        series_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${input.series_id}/external_ids`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowExternalIds;
      console.log(json);
      return json;
    }),
  searchTVShow: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .mutation(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${input.input.query}&page=1&include_adult=true`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;
      console.log(json);
      return json;
    }),
  getAiringTodayShows: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;
      console.log(json);
      return json;
    }),
  getOnTheAir: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;
      console.log(json);
      return json;
    }),
  getPopularTVShows: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;
      console.log(json);
      return json;
    }),
  getTopRatedTVShows: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;
      console.log(json);
      return json;
    }),
  getTVShowGenres: publicProcedure.query(async () => {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const json = (await response.json()) as TVShowGenresList;
    console.log(json);
    return json;
  }),
  getTVShowsByGenre: publicProcedure
    .input(
      z.object({
        genreId: z.string(),
        pageNo: z.number(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false&page=${input.input.pageNo}&with_genres=${input.input.genreId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowResults;

      console.log(json);
      return json;
    }),
  getTVShowCredits: publicProcedure
    .input(
      z.object({
        series_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${input.series_id}/aggregate_credits`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as TVShowAggregateCredits;
      console.log(json);

      return json;
    }),
  getSeasonDetails: publicProcedure
    .input(
      z.object({
        series_id: z.string(),
        season_number: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${input.input.series_id}/season/${input.input.season_number}?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as Season;
      return json;
    }),
});
