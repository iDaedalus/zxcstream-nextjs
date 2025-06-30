"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { MovieType } from "@/lib/getMovieData";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/app/card";
import { LoaderCircleIcon, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function SimpleStaggerSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<MovieType[]>([]);
  const [loadingMore, setloadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      async function fetchQuery() {
        if (!query) return;

        try {
          if (page === 1) {
            setLoading(true);
          } else {
            setloadingMore(true);
          }

          const movieEndpoint = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}&api_key=${apiKey}&include_adult=false&region=JP`;

          const tvEndpoint = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
            query
          )}&page=${page}&api_key=${apiKey}&include_adult=false&region=JP`;

          const [resMovie, resTv] = await Promise.all([
            fetch(movieEndpoint),
            fetch(tvEndpoint),
          ]);

          const [dataMovie, dataTv] = await Promise.all([
            resMovie.json(),
            resTv.json(),
          ]);

          const maxPages = Math.max(dataMovie.total_pages, dataTv.total_pages);
          setTotalPages(maxPages);

          const mediaMovie = dataMovie.results.map((meow: MovieType) => ({
            ...meow,
            media_type: "movie",
          }));

          const mediaTv = dataTv.results.map((meow: MovieType) => ({
            ...meow,
            media_type: "tv",
          }));

          const combined = [...mediaMovie, ...mediaTv];

          const filter = combined.filter(
            (meow: MovieType) =>
              meow.poster_path && meow.vote_average > 3 && meow.vote_count > 100
          );

          if (page === 1) {
            setResult(filter);
          } else {
            setResult((prev) => [...prev, ...filter]);
          }
        } catch (err) {
          console.error("Failed to fetch TMDB data:", err);
        } finally {
          setLoading(false);
          setloadingMore(false);
        }
      }

      fetchQuery();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen lg:pt-30 pt-15 pb-15 w-full">
      <motion.div
        className="grid lg:grid-cols-6 grid-cols-3 lg:w-[90%] w-[95%] mx-auto lg:gap-5 gap-2 "
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          className="space-x-2 lg:col-span-6 col-span-3 flex"
          variants={item}
        >
          <p>{totalPages} pages results for</p>
          <p className="text-blue-800">&apos;{query}&apos;</p>
        </motion.span>

        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <motion.div key={index} variants={item}>
                <Skeleton className="aspect-[2/3] w-full bg-zinc-500" />
              </motion.div>
            ))
          : result.map((meow) => (
              <motion.div key={meow.id} variants={item}>
                <MovieCard movie={meow} />
              </motion.div>
            ))}

        <motion.div variants={item}>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loadingMore || page >= totalPages}
            className="h-full w-full aspect-[2/3] flex-col"
          >
            <Plus />
            <div className="flex gap-1">
              {loadingMore ? (
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
              ) : null}
              {page >= totalPages
                ? "No more results"
                : loadingMore
                ? "Loading..."
                : "Load More"}
            </div>
            <p>
              {page} / {totalPages}
            </p>
          </Button>
        </motion.div>

        {loadingMore &&
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={`loading-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Skeleton className="h-full w-full bg-zinc-500" />
            </motion.div>
          ))}
      </motion.div>

      {!loading && result.length === 0 && (
        <motion.p
          className="text-center col-span-full text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No results found.
        </motion.p>
      )}
    </div>
  );
}

// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { MovieType } from "@/lib/getMovieData";
// import { Button } from "@/components/ui/button";
// import { MovieCard } from "@/app/card";
// import { LoaderCircleIcon, Plus } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// export default function InterceptionSearch() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("q");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [result, setResult] = useState<MovieType[]>([]);
//   const [loadingMore, setloadingMore] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       async function fetchQuery() {
//         if (!query) return;

//         try {
//           if (page === 1) {
//             setLoading(true);
//           } else {
//             setloadingMore(true);
//           }
//           const movieEndpoint = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
//             query
//           )}&page=${page}&api_key=${apiKey}&include_adult=false&region=JP`;
//           const tvEndpoint = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
//             query
//           )}&page=${page}&api_key=${apiKey}&include_adult=false&region=JP`;

//           const [resMovie, resTv] = await Promise.all([
//             fetch(movieEndpoint),
//             fetch(tvEndpoint),
//           ]);

//           const [dataMovie, dataTv] = await Promise.all([
//             resMovie.json(),
//             resTv.json(),
//           ]);

//           const maxPages = Math.max(dataMovie.total_pages, dataTv.total_pages);
//           setTotalPages(maxPages);

//           const mediaMovie = dataMovie.results.map((meow: MovieType) => ({
//             ...meow,
//             media_type: "movie",
//           }));
//           const mediaTv = dataTv.results.map((meow: MovieType) => ({
//             ...meow,
//             media_type: "tv",
//           }));

//           const combined = [...mediaMovie, ...mediaTv];

//           const filter = combined.filter(
//             (meow: MovieType) =>
//               meow.poster_path && meow.vote_average > 3 && meow.vote_count > 100
//           );

//           if (page === 1) {
//             setResult(filter);
//           } else {
//             setResult((prev) => [...prev, ...filter]);
//           }
//         } catch (err) {
//           console.error("Failed to fetch TMDB data:", err);
//         } finally {
//           setLoading(false);
//           setloadingMore(false);
//         }
//       }

//       fetchQuery();
//     }, 500);

//     return () => clearTimeout(debounceTimer);
//   }, [query, page]);
//   useEffect(() => {
//     setPage(1);
//   }, [query]);

//   return (
//     <div className="overflow-auto h-screen w-full">
//       <div className="grid lg:grid-cols-6 grid-cols-3 lg:w-[90%] w-[95%] mx-auto lg:gap-5 gap-2 lg:mt-30  mt-15 mb-15">
//         <span className="space-x-2 lg:col-span-6 col-span-3 flex">
//           <p> {totalPages} pages results for</p>
//           <p className="text-blue-800">'{query}'</p>
//         </span>
//         {loading
//           ? Array.from({ length: 6 }).map((_, index) => (
//               <Skeleton
//                 key={index}
//                 className="aspect-[2/3] w-full bg-zinc-500"
//               />
//             ))
//           : result.map((meow) => <MovieCard movie={meow} key={meow.id} />)}

//         <Button
//           variant="outline"
//           onClick={() => setPage((prev) => prev + 1)}
//           disabled={loadingMore || page >= totalPages}
//           className="h-full w-full aspect-[2/3] flex-col "
//         >
//           <Plus />
//           <div className="flex gap-1">
//             {loadingMore ? (
//               <LoaderCircleIcon
//                 className="-ms-1 animate-spin"
//                 size={16}
//                 aria-hidden="true"
//               />
//             ) : null}

//             {page >= totalPages
//               ? "No more results"
//               : loadingMore
//               ? "Loading..."
//               : "Load More"}
//           </div>
//           <p>
//             {page} / {totalPages}
//           </p>
//         </Button>
//         {loadingMore &&
//           Array.from({ length: 6 }).map((_, index) => (
//             <Skeleton key={index} className="h-full w-full bg-zinc-500" />
//           ))}
//       </div>
//       {!loading && result.length === 0 && (
//         <p className="text-center col-span-full text-gray-400">
//           No results found.
//         </p>
//       )}
//     </div>
//   );
// }
