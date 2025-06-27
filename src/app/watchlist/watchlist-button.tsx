// components/WatchlistButton.tsx
"use client";
import { Bookmark } from "lucide-react";
import { useWatchlist, WatchlistItem } from "@/lib/watchlist";

interface Props {
  movie: WatchlistItem;
}

export function WatchlistButton({ movie }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inList = isInWatchlist(movie.id, movie.media_type);

  return (
    <div
      onClick={() => toggleWatchlist(movie)}
  
    >
      <Bookmark
        className={`text-blue-800 h-4 w-4 lg:h-6 lg:w-6 drop-shadow-black drop-shadow-2xl  ${
          inList ? "fill-current" : ""
        }`}
      />
    </div>
  );
}
