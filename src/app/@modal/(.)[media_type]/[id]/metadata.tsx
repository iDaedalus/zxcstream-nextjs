import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCollection from "@/app/collectionFetch";
import EpisodeList from "@/app/fetchEpisode";
import {
  Bookmark,
  ChevronsUpDown,
  LayoutGrid,
  LibraryBig,
  Play,
  Star,

} from "lucide-react";
import { useRouter } from "next/navigation";
import GetMovieData from "@/lib/getMovieData";
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
export default function DrawerMetadata({
  id,
  media_type,
  setOpen,
  setNavigate,
}: {
  id: string;
  media_type: string;
  setOpen: (open: boolean) => void;
  setNavigate: (navigate: boolean) => void;
}) {
  const [seasonOpen, setSeasonOpen] = useState(false);
  const { show, loading } = GetMovieData({ id, media_type });
  const [season, setSeason] = useState("1");

  const trailerKey = show?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const logoImage = show?.images?.logos[0].file_path;
  const collection = useCollection(show?.belongs_to_collection?.id);

  const router = useRouter();
  return (
    <div className="overflow-y-auto meow">
      {loading ? (
        <div className="h-full w-full">
          <div className="relative aspect-[16/8] flex justify-center items-center overlay">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-blue-800"></div>
          </div>
          <div className="h-full w-full px-10 py-5 flex gap-10">
            <span className="w-[65%] space-y-1">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-21 w-full" />
            </span>
            <span className="w-[35%]  space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex justify-center items-center aspect-video overflow-hidden mask-gradient">
            <iframe
              width="100%"
              height="150%"
              className="fade-in transition-opacity duration-300 opacity-100 aspect-video  pointer-events-none "
              src={`https://www.youtube-nocookie.com/embed/${trailerKey?.key}?autoplay=1&loop=1&playlist=${trailerKey?.key}&controls=0&showinfo=0&&modestbranding=1&&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <div className="absolute lg:left-8 lg:bottom-12 left-3 bottom-8 lg:w-[35%] w-[50%] z-50">
              <img
                src={`https://image.tmdb.org/t/p/w500/${logoImage}`}
                alt="logo"
              />
              <div className="space-x-3 hidden lg:block">
                <Button
                  onClick={() => {
                    router.push(
                      `/watch/${media_type}/${id}${
                        media_type === "tv" ? "/1/1" : ""
                      }`
                    );

                    setOpen(false);
                    setNavigate(true);
                  }}
                  variant="outline"
                  className="mt-8"
                >
                  <Play />
                  Play Now
                </Button>
                <Button>
                  <Bookmark />
                </Button>
              </div>
            </div>
          </div>
          {show && (
            <div className="px-3 py-5 lg:px-10 flex flex-col gap-5">
              <div className="w-full flex flex-col lg:flex-row lg:gap-10 gap-5">
                <span className="lg:w-[65%] w-full">
                  <div className="flex gap-3 items-center mb-5 lg:hidden">
                    <Button
                      onClick={() => {
                        router.push(
                          `/watch/${media_type}/${id}${
                            media_type === "tv" ? "/1/1" : ""
                          }`
                        );

                        setOpen(false);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <Play />
                      Play Now
                    </Button>
                    <Button>
                      <Bookmark />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>
                      {new Date(show.release_date).getFullYear() ||
                        new Date(show.first_air_date).getFullYear()}
                    </span>
                    ·
                    <span>
                      {show.runtime
                        ? `${Math.floor(show.runtime / 60)}h ${
                            show.runtime % 60
                          }m`
                        : `S${show.number_of_seasons} E${show.number_of_episodes}`}
                    </span>
                    ·
                    <span className="flex items-center text-yellow-300 gap-1">
                      <Star className="h-4 w-4 flex items-center" />
                      {String(show.vote_average)[0]}/10
                    </span>
                  </div>
                  <p className="mt-5">{show.overview}</p>
                </span>
                <span className="lg:w-[35%] w-full flex flex-col gap-5">
                  <span>
                    <span className="text-muted-foreground">Genres:</span>
                    <span> {show.genres.map((g) => g.name).join(", ")}</span>
                  </span>

                  <span>
                    <span className="text-muted-foreground">Production: </span>
                    {show.production_companies.map((g) => g.name).join(", ")}
                  </span>

                  <span className="flex gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{show.status}</span>
                  </span>
                </span>
              </div>
              <div className="w-full ">
                {media_type === "movie" &&
                  show.belongs_to_collection !== null && (
                    <div className="space-y-3">
                      <h1 className="flex gap-2 items-center text-xl font-semibold">
                        <LibraryBig />
                        {show.belongs_to_collection.name}
                      </h1>
                      <div className="grid lg:grid-cols-4 grid-cols-3 lg:gap-5 gap-3">
                        {collection?.parts.map((meow) => (
                          <div
                            key={meow.id}
                            className="overflow-hidden rounded-lg"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${meow.poster_path}`}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {media_type === "tv" && (
                  <div className="w-full mt-5">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-semibold flex items-center gap-3">
                        <LayoutGrid />
                        Episodes
                      </h1>
                      <Popover open={seasonOpen} onOpenChange={setSeasonOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={seasonOpen}
                            className="w-[260px] justify-between"
                          >
                            {season ? `Season ${season}` : "Select Season"}

                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[260px] p-0">
                          <Command>
                            <CommandInput placeholder="Search season..." />
                            <CommandList>
                              <CommandEmpty>No season found.</CommandEmpty>
                              <CommandGroup>
                                {show.seasons.map((season) => (
                                  <CommandItem
                                    key={season.id}
                                    value={season.season_number}
                                    onSelect={() => {
                                      setSeason(season.season_number);
                                      setSeasonOpen(false);
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
                    <EpisodeList id={id} season={season} />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
