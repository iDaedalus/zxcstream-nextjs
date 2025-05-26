"use client";

import { SpotLightItem, Spotlight } from "@/components/ui/main-spotlight";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface MovieTypes {
  id: number;
  title?: string;
  tagline: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  profile_path: string;
}
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const OSCAR_ID = 1064213;
export default function Oscar() {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieTypes | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(movie);
  useEffect(() => {
    async function fetchOscar() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${OSCAR_ID}?api_key=${apiKey}&language=en-US`
        );
        const data = await res.json();

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOscar();
  }, []);

  return (
    <Spotlight>
      <SpotLightItem className="lg:h-[320px] h-[240px] rounded-md lg:w-[90%] w-[95%] mx-auto mt-20 shadow-md">
        <div className="relative h-full rounded-md overflow-hidden z-10">
          {loading ? (
            <p>loading...</p>
          ) : (
            movie && (
              <>
                <img
                  loading="lazy"
                  className="absolute h-[200%] w-full object-cover brightness-10"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg";
                  }}
                />
                <div className="relative lg:gap-5 gap-2 z-10 h-full w-full flex lg:py-4 lg:px-8 p-2 ">
                  <div className="lg:w-[200px] w-[150px] rounded-md overflow-hidden">
                    <img
                      loading="lazy"
                      className="h-full w-full object-cover "
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      onError={(e) => {
                        e.currentTarget.src = "/fallback.jpg";
                      }}
                    />
                    ;
                  </div>
                  <div className="lg:w-[calc(100%-220px)] w-[calc(100%-150px)] text-gray-300 lg:py-3 py-1">
                    <Badge>Oscar 97th Academy Awards Winner</Badge>
                    <p className="lg:text-2xl text-lg font-bold lg:mt-2 mt-1">
                      {movie.title}
                    </p>
                    <span className="flex gap-3 text-xs items-center lg:mt-2">
                      <p>{new Date(movie.release_date).getFullYear()}</p>|
                      <p className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4" />
                        {String(movie.vote_average)[0]}/10
                      </p>
                      |<Badge>Movie</Badge>
                    </span>
                    <p className="lg:mt-4 mt-2 lg:text-base text-xs">
                      {movie.overview}
                    </p>
                    <Button className="lg:mt-9 mt-3">
                      Watch Now <ArrowRight />
                    </Button>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </SpotLightItem>
    </Spotlight>
  );
}

{
}
