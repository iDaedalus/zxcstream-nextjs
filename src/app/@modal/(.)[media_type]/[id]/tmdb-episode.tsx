import { SeasonsType } from "@/lib/getMovieData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  Clock,
  Eye,
  EyeClosed,
  Play,
} from "lucide-react";
import useEpisode from "@/lib/fetch-episodes";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
export default function TmdbEpisode({
  id,
  seasons,
}: {
  id: string;
  seasons: SeasonsType[];
}) {
  const [season, setSeason] = useState("1");
  const [open, setOpen] = useState(false);
  const [antiSpoiler, setAntiSpoiler] = useState(true);
  const { episode, loading } = useEpisode({ id, season });
  console.log(episode);

  return (
    <div>
      <div className="flex justify-between w-full items-center">
        <p className="text-foreground relative font-semibold text-[1.1rem] lg:text-xl  lg:border-l-4 border-l-2 border-blue-800 lg:pl-6 pl-3 flex items-center gap-2">
          Episodes
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setAntiSpoiler(!antiSpoiler)}
            variant="outline"
          >
            {antiSpoiler ? <EyeClosed /> : <Eye />}
          </Button>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=" justify-between"
              >
                {seasons ? `Season ${season}` : "Select Season"}

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="  p-0">
              <Command>
                <CommandInput placeholder="Search season..." />
                <CommandList>
                  <CommandEmpty>No season found.</CommandEmpty>
                  <CommandGroup>
                    {seasons
                      .filter(
                        (season) =>
                          season.episode_count > 0 && season.air_date !== null
                      )
                      .map((season) => (
                        <CommandItem
                          key={season.id}
                          value={season.season_number}
                          onSelect={() => {
                            setSeason(season.season_number);
                            setOpen(false);
                          }}
                        >
                          {season.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col py-5 gap-3">
        {episode.length > 0 ? (
          loading ? (
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="aspect-square w-full gap-2 flex flex-col p-2 border rounded-md"
                  key={index}
                >
                  <Skeleton className=" flex-1" />

                  <div className="flex gap-2">
                    <p className="flex-1">Episode {index + 1}</p>
                    <Skeleton className=" w-10" />
                  </div>
                  <Skeleton className="h-4" />
                  <Skeleton className="h-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
              {antiSpoiler
                ? episode
                    .filter((f) => f.still_path !== null)
                    .map((meow) => (
                      <Link
                        className="aspect-square w-full gap-2 flex flex-col p-2 border rounded-md"
                        key={meow.episode_number}
                        href={`/watch/tv/${id}/${season}/${meow.episode_number}`}
                        prefetch={true}
                      >
                        <div className="relative flex-1 flex justify-center items-center">
                          <Skeleton className="h-full w-full" />
                          <div className="absolute flex justify-center items-center  gap-2">
                            <EyeClosed strokeWidth={1.5} className="h-6 w-6" />
                            <p className="text-sm">Anti Spoiler</p>
                          </div>
                          {meow.runtime && (
                            <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 text-xs px-2 py-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {meow.runtime}m
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <h3 className="font-semibold text-sm lg:text-sm  line-clamp-1  flex-1">
                            {meow.episode_number}. {meow.name}
                          </h3>
                          <Skeleton className=" w-10" />
                        </div>
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                      </Link>
                    ))
                : episode
                    .filter((f) => f.still_path !== null)
                    .map((meow) => (
                      <Link
                        href={`/watch/tv/${id}/${season}/${meow.episode_number}`}
                        prefetch={true}
                        className="group p-2 border rounded-md flex flex-col"
                        key={meow.episode_number}
                      >
                        <div className="relative overflow-hidden rounded-md flex-1">
                          <img
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                            src={
                              meow.still_path
                                ? `https://image.tmdb.org/t/p/w500${meow.still_path}`
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s"
                            }
                            alt={meow.name}
                          />

                          {meow.runtime && (
                            <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 text-xs px-2 py-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {meow.runtime}m
                            </Badge>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center gap-2 mt-2">
                            <h3 className="font-semibold text-sm lg:text-sm  line-clamp-1 group-hover:text-primary transition-colors flex-1">
                              {meow.episode_number}. {meow.name}
                            </h3>
                            {meow.vote_average > 0 && (
                              <span className="flex items-center gap-1 text-sm">
                                ⭐ {meow.vote_average.toFixed(1)}
                              </span>
                            )}
                          </div>
                          {meow.overview && (
                            <p className="text-muted-foreground text-xs lg:text-sm line-clamp-2 lg:line-clamp-3 leading-relaxed mt-1">
                              {meow.overview}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
            </div>
          )
        ) : (
          "No Episodes Available"
        )}
      </div>
    </div>
  );
}
