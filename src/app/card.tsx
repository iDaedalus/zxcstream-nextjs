"use client";
import type { MovieType } from "@/lib/getMovieData";
import { useState } from "react";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

function CircularProgress({
  value,
  size = 35,
  strokeWidth = 2,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / 10) * 100; // Convert to percentage (assuming max is 10)
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Color based on rating
  const getColor = (rating: number) => {
    if (rating >= 7) return "#22c55e"; // green-500
    if (rating >= 5) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Rating text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xs font-semibold drop-shadow-lg">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export function MovieCard({ movie }: { movie: MovieType }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;
  const fallbackUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s";

  const releaseYear =
    movie.release_date || movie.first_air_date
      ? new Date(movie.release_date || movie.first_air_date).getFullYear()
      : null;

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative  mb-3">
        <div className="w-full h-full overflow-hidden rounded-md">
          <img
            src={posterUrl || fallbackUrl}
            alt={movie.name || movie.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />

          {/* Play icon overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-3">
              <Play className="w-6 h-6 text-black fill-black" />
            </div>
          </div>
        </div>

        {movie.vote_average > 0 && (
          <div className="absolute -bottom-2 right-1.5">
            <div className="bg-black/60 rounded-full p-1 backdrop-blur-sm">
              <CircularProgress value={movie.vote_average} />
            </div>
          </div>
        )}
      </div>

      {/* Title and Year */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm line-clamp-1 text-gray-500">
          {movie.name || movie.title}
        </h3>
        {releaseYear && <p className="text-xs text-gray-500">{releaseYear}</p>}
      </div>
    </div>
  );
}
