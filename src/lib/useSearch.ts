import { useEffect, useState } from "react";

interface SearchTypes {
  query: string;
  value: string;
  page: number;
}

interface weeklyTypes {
  id: string;
  title?: string;
  tagline: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  profile_path: string;
}

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function useSearch({ query, value, page }: SearchTypes) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<weeklyTypes[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResult([]);
      return;
    }

    setLoading(true);
    const debounceTimer = setTimeout(() => {
      const fetchData = async () => {
        try {
          const endpoint = `https://api.themoviedb.org/3/search/${value}?query=${encodeURIComponent(
            query
          )}&page=${page}&api_key=${apiKey}&include_adult=false`;

          const response = await fetch(endpoint);
          const data = await response.json();
          setResult(data.results);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [query, value, page]);

  return { result, loading };
}
