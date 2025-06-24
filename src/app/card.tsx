"use client";
import type { MovieType } from "@/lib/getMovieData";

interface CircularProgressProps {
  value: number;
  className?: string;
  strokeWidth?: number;
}

function CircularProgress({
  value,
  className = "w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10",
  strokeWidth = 3,
}: CircularProgressProps) {
  const progress = (value / 10) * 100; // Convert to percentage (assuming max is 10)

  // Color based on rating
  const getColor = (rating: number) => {
    if (rating >= 7) return "#22c55e"; // green-500
    if (rating >= 5) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  return (
    <div className={`relative ${className}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* Rating text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-[0.6rem] md:text-xs font-semibold drop-shadow-lg">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export function MovieCard({ movie }: { movie: MovieType }) {
  const releaseYear =
    movie.release_date || movie.first_air_date
      ? new Date(movie.release_date || movie.first_air_date).getFullYear()
      : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;
  const fallbackUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s";

  return (
    <div className="relative h-full w-full flex flex-col gap-1">
      <div className="h-full w-full flex justify-center items-center overflow-hidden rounded-md aspect-[9/12.5]">
        <img
          src={posterUrl || fallbackUrl}
          alt={movie.name || movie.title}
          className="flex-1 object-cover"
        />
      </div>

      {movie.vote_average > 0 && (
        <div className="absolute top-0.5 right-0.5 ">
          <div className="bg-black/50 rounded-full p-0.5 backdrop-blur-sm">
            <CircularProgress
              value={movie.vote_average}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
            />
          </div>
        </div>
      )}
      <div className="flex justify-between gap-2">
        <h1 className="truncate text-xs font-light lg:text-sm">
          {movie.name || movie.title}
        </h1>
        {releaseYear && (
          <p className=" text-xs font-light lg:text-sm">{releaseYear}</p>
        )}
      </div>
    </div>
  );
}
