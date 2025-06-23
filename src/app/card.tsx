"use client";

import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import type { MovieType } from "@/lib/getMovieData";
import { useState } from "react";

export function MovieCard({ movie }: { movie: MovieType }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  console.log(imageError);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;

  const fallbackUrl = "/placeholder.svg?height=750&width=500";

  const displayTitle = movie.name || movie.title;
  const releaseYear =
    movie.release_date || movie.first_air_date
      ? new Date(movie.release_date || movie.first_air_date).getFullYear()
      : null;

  return (
    <div className="group cursor-pointer w-full">
      {/* Image Container */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60 animate-pulse" />
        )}

        {/* Movie Poster */}
        <img
          src={posterUrl || fallbackUrl}
          alt={displayTitle}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge
            variant="secondary"
            className="bg-black/80 text-white border-0 text-xs font-medium"
          >
            {movie.media_type === "tv" ? "TV Series" : "Movie"}
          </Badge>

          {movie.vote_average > 0 && (
            <Badge
              variant="secondary"
              className="bg-amber-500/90 text-white border-0 text-xs font-medium"
            >
              ★ {movie.vote_average.toFixed(1)}
            </Badge>
          )}
        </div>
      </div>

      {/* Movie Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {displayTitle}
        </h3>

        {releaseYear && (
          <p className="text-muted-foreground text-xs">{releaseYear}</p>
        )}
      </div>
    </div>
  );
}
