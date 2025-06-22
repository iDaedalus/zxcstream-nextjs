import { useEffect, useState } from "react";
import { MovieType } from "./getMovieData";
interface SearchTypes {
  query: string;
  value: string;
  page: number;
}

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function useSearch({ query, value, page }: SearchTypes) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MovieType[]>([]);

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
