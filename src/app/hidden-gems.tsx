"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Coffee, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "./card";
import type { MovieType } from "@/lib/getMovieData";

export default function RuntimeMovies() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [runtime, setRuntime] = useState<string>("quick");

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const runtimeOptions = [
    {
      label: "Quick Watch",
      value: "quick",
      icon: <Zap />,
      range: "with_runtime.lte=90",
      description: "Under 90 min",
    },
    {
      label: "Coffee Break",
      value: "coffee",
      icon: <Coffee />,
      range: "with_runtime.gte=90&with_runtime.lte=120",
      description: "90-120 min",
    },
    {
      label: "Standard",
      value: "standard",
      icon: <Clock />,
      range: "with_runtime.gte=120&with_runtime.lte=150",
      description: "2-2.5 hours",
    },
    {
      label: "Epic",
      value: "epic",
      icon: <Hourglass />,
      range: "with_runtime.gte=150",
      description: "2.5+ hours",
    },
  ];

  useEffect(() => {
    async function fetchRuntimeMovies() {
      try {
        setLoading(true);
        const selectedRuntime = runtimeOptions.find((r) => r.value === runtime);
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&${selectedRuntime?.range}&sort_by=vote_average.desc&vote_count.gte=500`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRuntimeMovies();
  }, [runtime, apiKey]);

  const getRuntimeLabel = () => {
    const selectedRuntime = runtimeOptions.find((r) => r.value === runtime);
    return selectedRuntime ? selectedRuntime.label.toUpperCase() : "RUNTIME";
  };

  return (
    <div className="w-[95%] lg:w-[90%] mt-8 mx-auto space-y-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-foreground text-xl lg:text-2xl tracking-[-3px] lg:border-l-4 lg:border-teal-600 lg:pl-6 flex items-center gap-2 zxczxc">
          {getRuntimeLabel()} PICKS ⏱️
        </p>

        <div className="relative flex flex-wrap gap-1">
          {runtimeOptions.map(({ label, value, icon, description }) => (
            <Button
              key={value}
              onClick={() => setRuntime(value)}
              className={`bg-transparent border-b border-white/50 rounded-[unset] text-foreground text-xs lg:text-sm ${
                runtime === value ? `border-teal-400` : ""
              }`}
              title={description}
            >
              {icon}
              <p className="hidden lg:block">{label}</p>
            </Button>
          ))}
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={45}
        className="!pb-13"
        navigation={{
          nextEl: ".runtime-button-next",
          prevEl: ".runtime-button-prev",
        }}
        breakpoints={{
          320: { spaceBetween: 28 },
          1280: { spaceBetween: 45 },
        }}
      >
        {loading ? (
          <SwiperSlide className="relative w-full">
            <div className="flex w-full justify-evenly">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={`ten rounded-sm bg-zinc-500 ${
                    index >= 3 ? "hidden lg:block" : ""
                  }`}
                />
              ))}
            </div>
          </SwiperSlide>
        ) : (
          movies.map((movie, index) => (
            <SwiperSlide key={movie.id} className="relative ten">
              <Link href={`/movie/${movie.id}`} prefetch={true} scroll={false}>
                <motion.div
                  className="h-full w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="cursor-pointer h-full w-full">
                    <MovieCard movie={movie} />
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))
        )}
        <div className="runtime-button-prev swiper-button-prev"></div>
        <div className="runtime-button-next swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
