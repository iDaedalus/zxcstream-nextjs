// components/WatchlistButton.tsx
"use client";
import { useWatchlist } from "@/lib/watchlist";
import { MovieCard } from "../card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export default function Watchlist() {
  const {
    watchlist,
    removeFromWatchlist,
    clearWatchlist,
    count,
  } = useWatchlist();

  return (
    <div className="min-h-screen w-[90%] mx-auto  flex flex-col gap-5">
      <div className="w-full flex justify-between items-center mt-25">
        <p className="text-foreground relative font-semibold text-[1.1rem] lg:text-2xl  lg:border-l-4 border-l-2 border-blue-800 lg:pl-6 pl-3 flex items-center gap-2">
          Watchlist {count > 0 && <span>({count})</span>}
        </p>
        {watchlist.length > 0 && (
          <Button size="sm" variant="outline" onClick={clearWatchlist}>
            Remove All
          </Button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-1 justify-center items-center h-full">
          <p>No watchlist found</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-6 grid-cols-3 lg:gap-5 gap-3 h-full w-full">
          {watchlist.map((meow) => (
            <div key={meow.id} className="relative">
              <MovieCard movie={meow} />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-1.5 left-1.5"
                onClick={() => removeFromWatchlist(meow.id, meow.media_type)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
