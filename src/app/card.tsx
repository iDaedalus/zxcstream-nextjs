"use client";

import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";
import SpotlightBorderWrapper from "@/components/border";
import type { MovieType } from "@/lib/getMovieData";
import { useState } from "react";

export function MovieCard({ movie }: { movie: MovieType }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;

  const fallbackUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s";

  return (
    <div className="group/card cursor-pointer w-full h-full">
      <div className="space-y-3 sm:space-y-4">
        <SpotlightBorderWrapper>
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted/50 shadow-lg group-hover/card:shadow-2xl transition-all duration-500">
            {/* Loading skeleton */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse" />
            )}

            {/* Main image */}
            <img
              src={posterUrl || fallbackUrl}
              alt={movie.name || movie.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } group-hover/card:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300" />

            {/* Hover overlay with play button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4 border border-white/30 transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white fill-white/20" />
              </div>
            </div>

            {/* Media type badge */}
            <Badge className="absolute top-2 left-2 bg-black/80 text-white border-0 text-xs">
              {movie.media_type === "tv" ? "TV" : "Movie"}
            </Badge>

            {/* Rating badge */}
            {movie.vote_average > 0 && (
              <Badge className="absolute top-2 right-2 bg-yellow-600/90 text-white border-0 text-xs">
                ⭐ {movie.vote_average.toFixed(1)}
              </Badge>
            )}

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0">
              <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2 mb-1">
                {movie.name || movie.title}
              </h3>
              {(movie.release_date || movie.first_air_date) && (
                <p className="text-white/80 text-xs sm:text-sm">
                  {new Date(
                    movie.release_date || movie.first_air_date
                  ).getFullYear()}
                </p>
              )}
            </div>
          </div>
        </SpotlightBorderWrapper>

        {/* Title and year - visible by default */}
      </div>
    </div>
  );
}
