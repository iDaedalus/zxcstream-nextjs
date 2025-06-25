"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Tv, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "./card";
import { MovieType } from "@/lib/getMovieData";

export default function Ten() {
  const [weekly, setWeekly] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  const [media, setMedia] = useState<string>("all");
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const mediaOptions = [
    { label: "All", value: "all", icon: <LibraryBig /> },
    { label: "Movie", value: "movie", icon: <Film /> },
    { label: "TV", value: "tv", icon: <Tv /> },
  ];
  useEffect(() => {
    async function fetchWeekly() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/${media}/week?api_key=${apiKey}`
        );
        const data = await res.json();
        setWeekly(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeekly();
  }, [media]);
  return (
    <div className="w-[95%] lg:w-[90%] mt-8 mx-auto space-y-4">
      <div className="w-full flex items-end justify-between">
        <p className="text-foreground relative font-semibold text-[1.1rem] lg:text-2xl  lg:border-l-4 border-l-2 border-blue-800 lg:pl-6 pl-3 flex items-center gap-2">
          TOP 20
        </p>

        <div className="relative zxc">
          {mediaOptions.map(({ label, value, icon }) => (
            <Button
              key={value}
              onClick={() => setMedia(value)}
              className={`bg-transparent border-b border-white/50 rounded-[unset] text-foreground ${
                media === value ? `border-amber-400` : ""
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
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
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
            spaceBetween: 20,
          },
        }}
      >
        {loading ? (
          <SwiperSlide className="relative !w-auto ">
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
          weekly.map((meow, index) => (
            <SwiperSlide key={meow.id} className="relative ">
              <Link
                href={`/${meow.media_type}/${meow.id}`}
                prefetch={true}
                scroll={false}
              >
                <motion.div
                  className="h-full w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="cursor-pointer h-full w-full">
                    <p className="numbering lg:block hidden">{index + 1}</p>
                    <MovieCard movie={meow} />
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))
        )}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
