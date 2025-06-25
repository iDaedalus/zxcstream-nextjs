// // app/@modal/(.)search/page.tsx
// import { Suspense } from "react";
// import InterceptionSearch from "./searchFunction";

// export default function Page() {
//   return (
//     <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
//       <InterceptionSearch />
//     </Suspense>
//   );
// }

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieType } from "@/lib/getMovieData";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/app/card";
import { Funnel } from "lucide-react";
import Link from "next/link";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function InterceptionSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [page, setPage] = useState("1");
  const [result, setResult] = useState<MovieType[]>([]);

  useEffect(() => {
    async function fetchQuery() {
      if (!query) return;
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
    <div className="fixed   inset-0 z-10 bg-background bg-[radial-gradient(ellipse_at_top,_rgba(30,64,175,0.3)_0%,_transparent_70%)] overflow-hidden">
      <div className="overflow-auto h-screen w-full">
        <div className="grid lg:grid-cols-6 grid-cols-3 w-[90%] mx-auto lg:gap-5 gap-3 lg:mt-30  mt-20">
          <span className="col-start-1 lg:col-start-1 flex items-end space-x-2">
            <p> Search results for:</p>
            <p className="text-blue-800"> {query}</p>
          </span>
          <p className="col-start-3 lg:col-start-6 flex justify-end">
            <Button className="">
              <Funnel />
            </Button>
          </p>
          {result.map((meow) => (
            <Link key={meow.id} href={`/${meow.media_type}/${meow.id}`}>
              <MovieCard movie={meow} />
            </Link>
          ))}
        </div>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}
