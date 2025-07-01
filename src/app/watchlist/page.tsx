// components/WatchlistButton.tsx
"use client";
import { useWatchlist } from "@/lib/watchlist";
import { MovieCard } from "../card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash } from "lucide-react";
import Image from "next/image";
export default function Watchlist() {
  const { watchlist, removeFromWatchlist, clearWatchlist, count } =
    useWatchlist();

  return (
    <div className="lg:w-[90%]  w-[95%] min-h-[calc(100vh-70px)]  mx-auto  flex flex-col gap-10">
      <div className="w-full flex justify-between items-center lg:mt-25 mt-20">
        <p className="text-foreground relative font-semibold text-[1.1rem] lg:text-2xl  lg:border-l-4 border-l-2 border-blue-800 lg:pl-6 pl-3 flex items-center gap-2">
          My Watchlist {count > 0 && <span>({count})</span>}
        </p>
        {watchlist.length > 0 && (
          <Button size="sm" variant="outline" onClick={clearWatchlist}>
            <Trash /> Clear All
          </Button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <h3 className="text-xl font-semibold text-foreground mb-2 mt-3">
            Your watchlist is empty
          </h3>
        
          <Button className="mt-6" variant="outline">
            Browse Movies <ArrowRight />
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-5 gap-3 h-full w-full">
          {watchlist.map((meow) => (
            <div key={meow.id} className="relative">
              <div>
                <div className="relative h-full w-full  overflow-hidden flex justify-center items-center  rounded-md">
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280/${meow.backdrop}`}
                    alt={meow.title || "poster"}
                    width={300}
                    height={417}
                    className=" object-cover"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-1.5 left-1.5"
                onClick={() => removeFromWatchlist(meow.id, meow.media_type)}
              >
                <Trash />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
