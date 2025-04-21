import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const movieRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        pageNo: z.number(),
      }),
    )
    .query((input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${input.input.pageNo}`;
      const response = fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }).then((res) => res.json());
      return response;
    }),
  getImdbId: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      }),
    )
    .query((input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${input.input.movieId}?language=en-US`;
      const response = fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }).then((res) => res.json());
      return response;
    }),
});
