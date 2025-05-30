"use client";
import { useEffect, useState } from "react";
interface GenreType {
  id: number;
  name: string;
}
interface CompanyTypes {
  id: number;
  name: string;
}
interface ResultsType {
  key: string;
  site: string;
  iso_639_1: string;
  type: string;
}
interface RecommendationTypes {
  results: RecommendationShowTypes[];
}
interface RecommendationShowTypes {
  id: string;
  title?: string;
  name?: string;
  poster_path: string;
  media_type: string;
}
interface TrailerTypes {
  results: ResultsType[];
}
interface CreatedByTypes {
  id: number;
  name: string;
}
interface LanguagesType {
  name: string;
}
interface CollectionType {
  id: string;
  name: string;
  parts: CollectionPartsType[];
}
interface CollectionPartsType {
  id: string;
  name: string;
}
interface SeasonsType {
  id: number;
  episode_count: number;
  season_number: string;
  name: string;
  air_date: string;
}
interface LogoTypes {
  logos: ImageTypes[];
}
interface ImageTypes {
  file_path: string;
}
interface CreditsTypes {
  cast: CastsTypes[];
}
interface CastsTypes {
  id: string;
  name: string;
}
interface ContentRatingsTypes {
  results: ContentRatingsResultTypes[];
}
interface ContentRatingsResultTypes {
  iso_3166_1: string;
  rating: string;
}
interface MovieType {
  id: number;
  title?: string;
  tagline: string;
  name?: string;
  status: string;
  vote_average: number;
  belongs_to_collection: CollectionType;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  runtime: number;
  release_date: string;
  first_air_date: string;
  number_of_seasons: string;
  number_of_episodes: string;
  genres: GenreType[];
  seasons: SeasonsType[];
  production_companies: CompanyTypes[];
  credits: CreditsTypes;
  created_by: CreatedByTypes[];
  spoken_languages: LanguagesType[];
  videos: TrailerTypes;
  images: LogoTypes;
  content_ratings: ContentRatingsTypes;
  recommendations: RecommendationTypes;
  similar: RecommendationTypes;
}
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function GetMovieData({
  id,
  media_type,
}: {
  id: string;
  media_type: string;
}) {
  const [show, setShow] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,images,credits,recommendations,similar,reviews,external_ids,watch/providers,content_ratings,release_dates,translations&include_image_language=en,null`
        );

        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, media_type]);

  return { show, loading };
}
