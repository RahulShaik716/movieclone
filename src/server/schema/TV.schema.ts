// {
//   adult: false,
//   backdrop_path: "/7dowXHcFccjmxf0YZYxDFkfVq65.jpg",
//   created_by: [
//     {
//       id: 35796,
//       credit_id: "5e84f06a3344c600153f6a57",
//       name: "Craig Mazin",
//       original_name: "Craig Mazin",
//       gender: 2,
//       profile_path: "/uEhna6qcMuyU5TP7irpTUZ2ZsZc.jpg",
//     },
//     {
//       id: 1295692,
//       credit_id: "5e84f03598f1f10016a985c0",
//       name: "Neil Druckmann",
//       original_name: "Neil Druckmann",
//       gender: 2,
//       profile_path: "/bVUsM4aYiHbeSYE1xAw2H5Z1ANU.jpg",
//     },
//   ],
//   episode_run_time: [
//   ],
//   first_air_date: "2023-01-15",
//   genres: [
//     {
//       id: 18,
//       name: "Drama",
//     },
//   ],
//   homepage: "https://www.hbo.com/the-last-of-us",
//   id: 100088,
//   in_production: true,
//   languages: [
//     "en",
//   ],
//   last_air_date: "2025-04-20",
//   last_episode_to_air: {
//     id: 5517229,
//     name: "Through the Valley",
//     overview: "As a storm brews in the mountains, the people of Jackson Hole prepare for the worst amid increased sightings of Infected. Meanwhile, Abby weighs her options.",
//     vote_average: 7.842,
//     vote_count: 38,
//     air_date: "2025-04-20",
//     episode_number: 2,
//     episode_type: "standard",
//     production_code: "",
//     runtime: 57,
//     season_number: 2,
//     show_id: 100088,
//     still_path: "/kuLqJ52voLz1yqf5ksnaaKAsCrT.jpg",
//   },
//   name: "The Last of Us",
//   next_episode_to_air: {
//     id: 5994269,
//     name: "Episode 3",
//     overview: "",
//     vote_average: 4,
//     vote_count: 3,
//     air_date: "2025-04-27",
//     episode_number: 3,
//     episode_type: "standard",
//     production_code: "",
//     runtime: 60,
//     season_number: 2,
//     show_id: 100088,
//     still_path: "/yYxtVmduEAJWPyckZv4rqqinvoe.jpg",
//   },
//   networks: [
//     {
//       id: 49,
//       logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
//       name: "HBO",
//       origin_country: "US",
//     },
//   ],
//   number_of_episodes: 16,
//   number_of_seasons: 2,
//   origin_country: [
//     "US",
//   ],
//   original_language: "en",
//   original_name: "The Last of Us",
//   overview: "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
//   popularity: 443.9684,
//   poster_path: "/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
//   production_companies: [
//     {
//       id: 125281,
//       logo_path: "/3hV8pyxzAJgEjiSYVv1WZ0ZYayp.png",
//       name: "PlayStation Productions",
//       origin_country: "US",
//     },
//     {
//       id: 11073,
//       logo_path: "/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png",
//       name: "Sony Pictures Television",
//       origin_country: "US",
//     },
//     {
//       id: 23217,
//       logo_path: "/kXBZdQigEf6QiTLzo6TFLAa7jKD.png",
//       name: "Naughty Dog",
//       origin_country: "US",
//     },
//     {
//       id: 119645,
//       logo_path: null,
//       name: "Word Games",
//       origin_country: "US",
//     },
//     {
//       id: 115241,
//       logo_path: null,
//       name: "The Mighty Mint",
//       origin_country: "US",
//     },
//     {
//       id: 3268,
//       logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
//       name: "HBO",
//       origin_country: "US",
//     },
//   ],
//   production_countries: [
//     {
//       iso_3166_1: "US",
//       name: "United States of America",
//     },
//   ],
//   seasons: [
//     {
//       air_date: "2023-01-15",
//       episode_count: 9,
//       id: 144593,
//       name: "Season 1",
//       overview: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
//       poster_path: "/pMfG5XIlmvCL9bQQiJKdTvmF2FW.jpg",
//       season_number: 1,
//       vote_average: 7.9,
//     },
//     {
//       air_date: "2025-04-13",
//       episode_count: 7,
//       id: 405376,
//       name: "Season 2",
//       overview: "After five years of peace following the events of the first season, Joel and Ellie's collective past catches up to them, drawing them into conflict with each other and a world even more dangerous and unpredictable than the one they left behind.",
//       poster_path: "/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
//       season_number: 2,
//       vote_average: 6.2,
//     },
//   ],
//   spoken_languages: [
//     {
//       english_name: "English",
//       iso_639_1: "en",
//       name: "English",
//     },
//   ],
//   status: "Returning Series",
//   tagline: "Every path has a price.",
//   type: "Scripted",
//   vote_average: 8.58,
//   vote_count: 5722,
// }
// generate types for whole object using commented response above
// const iframeSrc = `https://vidsrc.dev/embed/tv/${tvId}/${season}/${episode}`;
export interface TVShowDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  } | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
