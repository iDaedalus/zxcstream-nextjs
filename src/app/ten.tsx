"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LazyImage from "./observer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film, Tv, LibraryBig} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface weeklyTypes {
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

export default function Ten() {
  const [weekly, setWeekly] = useState<weeklyTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const [media, setMedia] = useState<string>("all");
  const router = useRouter();
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
      <div className="w-full flex items-center justify-between">
        <p className="text-foreground relative zxczxc text-xl lg:text-2xl tracking-[-3px] lg:border-l-4 lg:border-blue-800 lg:pl-6 flex items-center gap-2">
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
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={45}
        className=" !pb-5"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          320: {
            spaceBetween: 28,
          },

          1280: {
            spaceBetween: 45,
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
          weekly.map((meow, index) => (
            <SwiperSlide
              onClick={() => router.push(`/${meow.media_type}/${meow.id}`)}
              key={meow.id}
              className="relative ten first:ml-7"
            >
              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="cursor-pointer h-full w-full">
                  <p className="numbering">{index + 1}</p>
                  <LazyImage
                    className="h-full w-full object-cover rounded-sm"
                    src={`https://image.tmdb.org/t/p/w500/${meow.poster_path}`}
                    alt="Lazy loaded"
                    placeholder="/images/blur.jpg"
                  />
                </div>
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
