"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieType } from "@/lib/getMovieData";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/app/card";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function InterceptionSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? ""; // <-- FIXED
  const [page, setPage] = useState("1");
  const [result, setResult] = useState<MovieType[]>([]);
  console.log(result);
  useEffect(() => {
    async function fetchQuery() {
      const endpoint = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&page=${page}&api_key=${apiKey}&include_adult=false`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setResult(data.results);
    }
    fetchQuery();
  }, [query, page]);
  return (
    <div className="fixed h-screen overflow-auto inset-0 z-10 backdrop-blur-2xl bg-background/50">
      {query}
      <div className="grid lg:grid-cols-6 grid-cols-3 w-[90%] mx-auto lg:gap-5 gap-3 lg:mt-30  mt-20">
        {result.map((meow) => (
          <MovieCard key={meow.id} movie={meow} />
        ))}
      </div>
      <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
    </div>
  );
}
