"use client";
import type { MovieType } from "@/lib/getMovieData";
import Image from "next/image";
import CircularProgress from "./rating-progress";
import Link from "next/link";

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
    <Link
      href={`/${movie.media_type}/${movie.id}`}
      prefetch={true}
      className="relative h-full w-full flex flex-col gap-1"
    >
      <div className="relative h-full w-full aspect-[9/12.5] overflow-hidden flex justify-center items-center  rounded-md">
        <Image
          src={posterUrl || fallbackUrl}
          alt={movie.name || movie.title || "poster"}
          width={300}
          height={417}
          className=" object-cover"
        />
        <div className="absolute top-1.5 right-1.5">
          <CircularProgress value={movie.vote_average} />
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <h1 className="truncate text-xs font-light lg:text-sm">
          {movie.name || movie.title}
        </h1>
        {releaseYear && (
          <p className=" text-xs font-light lg:text-sm">{releaseYear}</p>
        )}
      </div>
    </Link>
  );
}
