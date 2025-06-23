"use client";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchTmdb from "./fetchMovie";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LazyImage from "./observer";
import { ChevronRight } from "lucide-react";

let showlist = [
  { id: "1396", media_type: "tv" },
  { id: "823219", media_type: "movie" },
  { id: "1064213", media_type: "movie" },
  { id: "552524", media_type: "movie" },
  { id: "95557", media_type: "tv" },
  { id: "235930", media_type: "tv" },
  { id: "86831", media_type: "tv" },
  { id: "100088", media_type: "tv" },
  { id: "194583", media_type: "tv" },
  { id: "241554", media_type: "tv" },
];

showlist = showlist.sort(() => Math.random() - 0.5);

export default function SwiperBackdrops() {
  const { movies, loading } = useFetchTmdb(showlist);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ type: "progressbar" }}
      slidesPerView={"auto"}
      spaceBetween={10}
      className="relative h-[75vh] w-full"
    >
      {loading ? (
        <SwiperSlide className="swiper-slide relative overflow-hidden">
          <div className="absolute w-[calc(100%-40px)] lg:w-1/2 bottom-15 right-5 lg:right-25  z-10 text-white zxc flex flex-col items-end gap-1">
            <Skeleton className="h-5 w-40 lg:h-8 lg:w-70 bg-zinc-500" />
            <Skeleton className="h-8 w-54 lg:h-15 lg:w-full  bg-zinc-500" />
            <Skeleton className="w-[90%] h-4 lg:h-5 lg:w-full  bg-zinc-500" />
            <Skeleton className="w-1/2 h-4 lg:h-5 lg:w-90  bg-zinc-500" />
            <Skeleton className="h-6 w-6 lg:h-8 lg:w-8 bg-zinc-500" />
          </div>
        </SwiperSlide>
      ) : (
        movies.map((meow) => (
          <SwiperSlide
            key={meow.id}
            className="swiper-slide relative overflow-hidden"
          >
            <div className="absolute w-[calc(100%-40px)] lg:w-1/2 bottom-15 right-5 lg:right-25  z-10 text-white zxc flex flex-col items-end landing-data ">
              <p className="text-right text-sm lg:text-base">{meow.tagline}</p>
              <span className="lg:text-6xl  text-3xl tracking-[-5px] lg:tracking-[-11px] font-bold zxczxc text-right mt-1 mb-2 lg:mt-2 lg:mb-4">
                {(meow.title || meow.name)?.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-yellow-500">
                  {(meow.title || meow.name)?.split(" ").pop()}
                </span>
              </span>

              <span className="bg-blue-800/30 border-1 border-blue-800 text-blue-100 mt-3  cursor-pointer">
                <Link
                  href={`/${meow.media_type}/${meow.id}`}
                  prefetch={true}
                  scroll={false}
                >
                  <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
                </Link>
              </span>
            </div>

            <LazyImage
              className="absolute h-full w-full object-cover object-[center_40%] mask-gradient backdrop opacity-backrop"
              src={`https://image.tmdb.org/t/p/original/${meow.backdrop_path}`}
              alt="Lazy loaded"
              placeholder="/images/blur.jpg"
            />
          </SwiperSlide>
        ))
      )}
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
}
