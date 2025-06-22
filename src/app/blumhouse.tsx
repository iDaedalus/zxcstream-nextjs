"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Bookmark, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Trailer from "./trailer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
interface MovieTypes {
  id: string;
  title?: string;
  tagline: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  profile_path: string;
}
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BLUMHOUSE_ID = 3172;
export default function Blumhouse() {
  const router = useRouter();
  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlumhouseMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=${BLUMHOUSE_ID}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlumhouseMovies();
  }, []);

  return (
    <div className="w-[95%] lg:w-[90%] mt-20 mx-auto space-y-4">
      <p className="text-white relative zxczxc text-xl lg:text-2xl tracking-[-3px] lg:border-l-4 lg:border-blue-800 lg:pl-6 flex items-center gap-2">
        BLUMHOUSE
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView="auto"
        className=" !pb-5"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          320: {
            spaceBetween: 15,
          },

          1280: {
            spaceBetween: 20,
          },
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
          movies.map((meow, index) => (
            <SwiperSlide key={meow.id} className="relative ten ">
              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div
                      onClick={() => router.push(`/movie/${meow.id}`)}
                      className="cursor-pointer h-full w-full"
                    >
                      <img
                        loading="lazy"
                        className="h-full w-full object-cover rounded-sm"
                        src={`https://image.tmdb.org/t/p/w500/${meow.poster_path}`}
                        alt={meow.title}
                        onError={(e) => {
                          e.currentTarget.src = "/fallback.jpg";
                        }}
                      />
                    </div>
                  </HoverCardTrigger>

                  <HoverCardContent className="w-[400px]">
                    <div className="aspect-video">
                      <Trailer id={meow.id} mediaType="movie" type="modal" />
                    </div>
                    <div className="p-4">
                      <div className="flex w-full justify-between items-center mb-1">
                        <p className="font-semibold text-base">
                          {index + 1}. {meow.title}
                        </p>
                        <p className="font-semibold text-yellow-500 mb-1 flex items-center gap-1.5">
                          <Star className="" size={15} />
                          {meow.vote_average?.toFixed(1)}
                        </p>
                      </div>
                      <p className="text-sm line-clamp-3">{meow.overview}</p>
                      <div className="mt-5 flex justify-center items-center w-full gap-2">
                        <Button className="flex-1">
                          <Play />
                          Play now
                        </Button>
                        <Button variant="outline" className=" text-black">
                          <Bookmark />
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            </SwiperSlide>
          ))
        )}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
