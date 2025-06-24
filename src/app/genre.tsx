"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Heart, Laugh, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "./card";
import type { MovieType } from "@/lib/getMovieData";

export default function GenreMovies() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<string>("28");

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const genreOptions = [
    { label: "Action", value: "28", icon: <Zap /> },
    { label: "Romance", value: "10749", icon: <Heart /> },
    { label: "Comedy", value: "35", icon: <Laugh /> },
    { label: "Horror", value: "27", icon: <Skull /> },
  ];

  useEffect(() => {
    async function fetchGenreMovies() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=popularity.desc`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenreMovies();
  }, [genre, apiKey]);

  const getGenreLabel = () => {
    const selectedGenre = genreOptions.find((g) => g.value === genre);
    return selectedGenre ? selectedGenre.label : "Genre";
  };

  return (
    <div className="w-[95%] lg:w-[90%] mt-8 mx-auto space-y-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-foreground text-base lg:text-2xl lg:border-l-4 lg:border-cyan-600 lg:pl-6 flex items-center gap-2 font-semibold">
          {getGenreLabel()} Movies
        </p>

        <div className="relative">
          {genreOptions.map(({ label, value, icon }) => (
            <Button
              key={value}
              onClick={() => setGenre(value)}
              className={`bg-transparent border-b border-white/50 rounded-[unset] text-foreground ${
                genre === value ? `border-cyan-400` : ""
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
        slidesPerView={6}
        spaceBetween={15}
        className="!pb-15"
        navigation={{
          nextEl: ".runtime-button-next",
          prevEl: ".runtime-button-prev",
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 15,
          },
        }}
      >
        {loading ? (
          <SwiperSlide className="relative w-full">
            <div className="flex w-full justify-evenly">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={` rounded-sm bg-zinc-500 ${
                    index >= 3 ? "hidden lg:block" : ""
                  }`}
                />
              ))}
            </div>
          </SwiperSlide>
        ) : (
          movies.map((movie, index) => (
            <SwiperSlide key={movie.id} className="relative ">
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
        <div className="genre-button-prev swiper-button-prev"></div>
        <div className="genre-button-next swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
