"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "./card";
import { MovieType } from "@/lib/getMovieData";

export default function ClassicMovies() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [decade, setDecade] = useState<string>("1980");

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const decadeOptions = [
    { label: "80s", value: "1980", icon: <Clock /> },
    { label: "90s", value: "1990", icon: <Calendar /> },
    { label: "2000s", value: "2000", icon: <Star /> },
  ];

  useEffect(() => {
    async function fetchClassicMovies() {
      try {
        setLoading(true);
        const endYear = parseInt(decade) + 9;
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${decade}-01-01&primary_release_date.lte=${endYear}-12-31&sort_by=vote_average.desc&vote_count.gte=1000`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchClassicMovies();
  }, [decade, apiKey]);

  return (
    <div className="w-[95%] lg:w-[90%] mt-8 mx-auto space-y-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-foreground text-xl lg:text-2xl  lg:border-l-4 lg:border-purple-600 lg:pl-6 flex items-center gap-2 font-semibold ">
          Classic Movies
        </p>

        <div className="relative">
          {decadeOptions.map(({ label, value, icon }) => (
            <Button
              key={value}
              onClick={() => setDecade(value)}
              className={`bg-transparent border-b border-white/50 rounded-[unset] text-foreground ${
                decade === value ? `border-purple-400` : ""
              }`}
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
          nextEl: ".classic-button-next",
          prevEl: ".classic-button-prev",
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
        <div className="classic-button-prev swiper-button-prev"></div>
        <div className="classic-button-next swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
