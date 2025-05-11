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
}

export interface MovieGenre {
  id: number;
  name: string;
}
