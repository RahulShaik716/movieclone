export interface MovieSchema {
  id: number;
  title: string;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_title: string;
  adult: boolean;
}
export interface MovieSearchResults {
  page: number;
  results: MovieSchema[];
  total_pages: number;
  total_results: number;
}
export interface MovieCastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface RecommendationMovies {
  page: number;
  results: MovieSchema[];
  total_pages: number;
  total_results: number;
}

export interface NowPlayingMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieSchema[];
  total_pages: number;
  total_results: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}
export interface MovieCast {
  id: number;
  cast: MovieCastMember[];
  crew: CrewMember[];
}
export interface MovieDetailsSchema {
  id: number;
  title: string;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_title: string;
  adult: boolean;
  genres: MovieGenre[];
  runtime: number | null;
  tagline: string | null;
  revenue: number | null;
  budget: number | null;
  poster_path: string | null;
  production_companies: ProductionCompany[];
}
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id2: string;
}
export interface MovieTrailerResults {
  id: number;
  results: MovieTrailer[];
}
export interface MovieGenreResults {
  genres: MovieGenre[];
}
