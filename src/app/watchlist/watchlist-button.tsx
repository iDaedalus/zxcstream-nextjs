// components/WatchlistButton.tsx
"use client";
import { useWatchlist } from "@/lib/watchlist";
import { Bookmark } from "lucide-react";
import { MovieType } from "@/lib/getMovieData";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface Props {
  movie: MovieType;
}
export function WatchlistButton({ movie }: Props) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => toggleWatchlist(movie)}>
          <Bookmark
            className={` ${
              isInWatchlist(movie.id, movie.media_type) ? "fill-current" : ""
            }`}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className=" px-2 py-1 text-xs zxc">
        {isInWatchlist(movie.id, movie.media_type)
          ? "Remove to watchlist"
          : "Add to watchlist"}
      </TooltipContent>
    </Tooltip>
  );
}
