import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import type {
  MovieCast,
  MovieDetailsSchema,
  MovieGenreResults,
  MovieSearchResults,
  MovieTrailer,
  MovieTrailerResults,
  NowPlayingMovies,
  RecommendationMovies,
} from "~/server/schema/movie.schema";

export const movieRouter = createTRPCRouter({
  getImdbId: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${input.input.movieId}?language=en-US`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as MovieDetailsSchema;
      return json;
    }),
  searchMovie: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .mutation(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${input.input.query}&page=1&include_adult=true`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as MovieSearchResults;
      // TODO: Replace 'any' with a proper type/interface for the expected response
      return json;
    }),
  getMovieCast: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      }),
    )
    .mutation(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${input.input.movieId}/credits?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as MovieCast;
      return json;
    }),
  getSimilarMovies: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      }),
    )
    .query(async (input) => {
      //call tmdb api to get movies
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${input.input.movieId}/recommendations?api_key=${apiKey}&language
=en-US&page=1`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as RecommendationMovies;
      return json;
    }),

  getNowPlayingMovies: publicProcedure
    .input(
      z.object({
        pageNo: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as NowPlayingMovies;
      return json;
    }),
  getUpcomingMovies: publicProcedure
    .input(
      z.object({
        pageNo: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as NowPlayingMovies;
      return json;
    }),
  getPopularMovies: publicProcedure
    .input(
      z.object({
        pageNo: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as RecommendationMovies;
      return json;
    }),
  getTopRatedMovies: publicProcedure
    .input(
      z.object({
        pageNo: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${input.input.pageNo}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as RecommendationMovies;
      return json;
    }),
  getAllGenreIds: publicProcedure.query(async (input) => {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const json = (await response.json()) as MovieGenreResults;
    return json;
  }),
  getMoviesByGenre: publicProcedure
    .input(
      z.object({
        genreId: z.string(),
        pageNo: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${input.input.pageNo}&with_genres=${input.input.genreId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as RecommendationMovies;
      return json;
    }),
  getTrendingMovies: publicProcedure.query(async () => {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const json = (await response.json()) as RecommendationMovies;
    return json;
  }),
  getMovieTrailers: publicProcedure
    .input(
      z.object({
        movieId: z.string(),
      }),
    )
    .query(async (input) => {
      const apiKey = process.env.TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${input.input.movieId}/videos?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const json = (await response.json()) as MovieTrailerResults;
      const video = json.results
        .filter(
          (video: MovieTrailer) =>
            video.type === "Trailer" && video.site === "YouTube",
        )
        .sort((a: MovieTrailer, b: MovieTrailer) => {
          return +b.published_at - +a.published_at;
        });
      return video[0];
    }),
});
