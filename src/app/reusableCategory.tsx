import { MovieType } from "@/lib/getMovieData";
import { MovieCard } from "./card";
import { movieGenres } from "./filter";
import { tvGenres } from "./filter";
import { productionCompanies } from "./filter";
import { tvNetworks } from "./filter";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BoxIcon,
  Calendar,
  HouseIcon,
  Info,
  ListFilter,
  LoaderCircleIcon,
  PanelsTopLeftIcon,
  Play,
  Plus,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
interface ReusableCategoryProps {
  data: MovieType[];
  loading: boolean;
  loadingMore: boolean;
  category: string;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  media_type: string;
  selectedGenres: string[];
  setSelectedGenres: (
    genres: string[] | ((prev: string[]) => string[])
  ) => void;
  selectedCompanies: string[];
  setSelectedCompanies: (
    companies: string[] | ((prev: string[]) => string[])
  ) => void;
  selectedNetworks: string[];
  setSelectedNetworks: (
    networks: string[] | ((prev: string[]) => string[])
  ) => void;
  yearSelected: number | null;
  setYearSelected: (
    year: number | null | ((prev: number | null) => number | null)
  ) => void;
}
export default function ReusableCategory({
  data,
  loading,
  loadingMore,
  category,
  page,
  setPage,
  media_type,
  selectedGenres,
  setSelectedGenres,
  selectedCompanies,
  setSelectedCompanies,
  selectedNetworks,
  setSelectedNetworks,
  yearSelected,
  setYearSelected,
}: ReusableCategoryProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  console.log(page);
  return (
    <main>
      <div className="relative lg:h-[75vh] h-[50vh] w-full ">
        {loading ? (
          <div className="absolute w-full lg:w-1/2 lg:bottom-15 bottom-0 right-[unset] lg:right-25  z-20 text-white zxc flex justify-center">
            <div className=" flex-col items-end gap-1 hidden lg:flex w-full">
              <Skeleton className="h-5 w-40 lg:h-8 lg:w-70 bg-zinc-500" />
              <Skeleton className="h-8 w-54 lg:h-15 lg:w-full  bg-zinc-500" />
              <Skeleton className="w-[90%] h-4 lg:h-5 lg:w-full  bg-zinc-500" />
              <Skeleton className="w-1/2 h-4 lg:h-5 lg:w-90  bg-zinc-500" />
              <Skeleton className="h-6 w-6 lg:h-8 lg:w-8 bg-zinc-500" />
            </div>
            <div className=" grid grid-cols-3 w-[180px] gap-3 lg:hidden">
              <Skeleton className="h-5 w-full  bg-zinc-500" />
              <Skeleton className="h-5 w-full  bg-zinc-500" />
              <Skeleton className="h-5 w-full  bg-zinc-500" />
              <Skeleton className="h-8 w-full col-span-3  bg-zinc-500" />
            </div>
          </div>
        ) : (
          data?.slice(5, 6).map((meow) => (
            <div key={meow.id} className=" overflow-hidden bg-amber-300">
              <div className="absolute w-[calc(100%-40px)] lg:w-1/2 bottom-15 right-5 lg:right-25 z-10 text-white   flex-col items-end hidden lg:flex">
                <span className="lg:text-5xl text-3xl tracking-[-5px] lg:tracking-[-9px] font-bold zxczxc text-right mt-1 mb-2 lg:mt-2 lg:mb-4 drop-shadow-lg drop-shadow-black/50">
                  {(meow.title || meow.name)?.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-yellow-500">
                    {(meow.title || meow.name)?.split(" ").pop()}
                  </span>
                </span>
                <p className="text-right text-xs lg:text-base line-clamp-3 zxc">
                  {meow.overview || "No description available."}
                </p>
                <div className="mt-5 space-x-2">
                  <Link
                    href={`watch/${meow.media_type}/${meow.id}`}
                    prefetch={true}
                    scroll={false}
                  >
                    <Button variant="secondary">
                      <Play />
                      Play Now
                    </Button>
                  </Link>
                  <Link
                    href={`${meow.media_type}/${meow.id}`}
                    prefetch={true}
                    scroll={false}
                  >
                    <Button variant="outline">
                      <Info />
                      More Info
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 transform translate-x-[50%] right-[50%] lg:hidden grid grid-cols-3 gap-3 z-20 ">
                <Badge className="w-full" variant="outline">
                  {meow.media_type === "movie" ? "Movie" : "TV"}
                </Badge>
                <Badge className="w-full" variant="outline">
                  {meow.media_type === "movie"
                    ? meow.release_date?.slice(0, 4) || "N/A"
                    : meow.first_air_date?.slice(0, 4) || "N/A"}
                </Badge>
                <Badge className="w-full" variant="outline">
                  {meow.media_type === "movie"
                    ? meow.release_dates?.results
                        ?.find((r) => r.iso_3166_1 === "US")
                        ?.release_dates?.find((r) => r.type === 3)
                        ?.certification || "NR"
                    : meow.content_ratings?.results?.find(
                        (r) => r.iso_3166_1 === "US"
                      )?.rating || "NR"}
                </Badge>
                <Link
                  href={`/${meow.media_type}/${meow.id}`}
                  className="w-full  col-span-3 "
                  prefetch={true}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs w-full"
                  >
                    <Play />
                    Watch Now
                  </Button>
                </Link>
              </div>

              <img
                className="absolute h-full w-full object-cover object-[center_40%] mask-gradient blur-[2px] lg:blur-[0]"
                src={`https://image.tmdb.org/t/p/original/${meow.backdrop_path}`}
                alt="Lazy loaded"
              />
            </div>
          ))
        )}
        <div className="absolute bottom-20 lg:hidden z-10  w-full overflow-hidden  pointer-events-none flex items-center ">
          <div className="h-full w-full flex justify-center items-center">
            {loading ? (
              <div className=" flex justify-center items-center">
                <Skeleton className="aspect-[9/13] !w-[170px]   bg-zinc-500" />
              </div>
            ) : (
              data?.slice(5, 6).map((meow) => (
                <div
                  key={meow.id}
                  className="aspect-[9/13] !w-[170px] swiper-slide relative"
                >
                  <img
                    className="absolute h-full w-full object-cover object-center rounded-lg "
                    src={`https://image.tmdb.org/t/p/w500/${meow.poster_path}`}
                    alt="Lazy loaded"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between lg:w-[90%] mx-auto lg:p-4 p-2">
        <h1 className="lg:text-2xl text-xl whitespace-nowrap  font-bold flex gap-2">
          <p>{category}</p>
          <p> {media_type === "movie" ? "Movies" : "TV Shows"}</p>
        </h1>
        <div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <ListFilter /> <span className="">Filter</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="sr-only">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
              </div>

              <Tabs defaultValue="genre" className="w-full p-3 overflow-auto">
                <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                  <TabsTrigger
                    value="genre"
                    className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  >
                    <HouseIcon
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Genres
                    <Badge
                      className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      {selectedGenres.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="production"
                    className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  >
                    <PanelsTopLeftIcon
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    {media_type === "movie" ? "Companies" : "Networks"}
                    <Badge
                      className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      {media_type === "movie"
                        ? selectedCompanies.length
                        : selectedNetworks.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="year"
                    className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                  >
                    <BoxIcon
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Year
                    <Badge
                      className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      {yearSelected ? 1 : 0}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="genre" className="mt-3 ">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 ">
                    {(media_type === "movie" ? movieGenres : tvGenres).map(
                      (genre) => {
                        const GenreIcon = genre.icon;
                        return (
                          <div
                            key={genre.id}
                            className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50 ${genre.color}`}
                          >
                            <Checkbox
                              key={genre.id}
                              checked={selectedGenres.includes(
                                genre.id.toString()
                              )}
                              onCheckedChange={() => {
                                setSelectedGenres(
                                  (prev) =>
                                    prev.includes(genre.id.toString())
                                      ? prev.filter(
                                          (g) => g !== genre.id.toString()
                                        ) // remove
                                      : [...prev, genre.id.toString()] // add
                                );
                              }}
                              className="order-1 after:absolute after:inset-0"
                            />

                            <div className="flex grow items-center gap-3">
                              <GenreIcon className={`${genre.iconColor}`} />
                              <div className="grid gap-2">
                                <Label className="">{genre.name}</Label>
                                <p className="text-muted-foreground text-xs truncate">
                                  {genre.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="production" className="mt-3">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                    {(media_type === "movie"
                      ? productionCompanies
                      : tvNetworks
                    ).map((company) => {
                      const GenreIcon = company.icon;
                      return (
                        <div
                          key={company.id}
                          className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50 ${company.color}`}
                        >
                          <Checkbox
                            checked={
                              media_type === "movie"
                                ? selectedCompanies.includes(
                                    company.id.toString()
                                  )
                                : selectedNetworks.includes(
                                    company.id.toString()
                                  )
                            }
                            onCheckedChange={() => {
                              if (media_type === "movie") {
                                setSelectedCompanies(
                                  (prev) =>
                                    prev.includes(company.id.toString())
                                      ? prev.filter(
                                          (g) => g !== company.id.toString()
                                        ) // remove
                                      : [...prev, company.id.toString()] // add
                                );
                              } else {
                                setSelectedNetworks(
                                  (prev) =>
                                    prev.includes(company.id.toString())
                                      ? prev.filter(
                                          (g) => g !== company.id.toString()
                                        ) // remove
                                      : [...prev, company.id.toString()] // add
                                );
                              }
                            }}
                            className="order-1 after:absolute after:inset-0"
                          />
                          <div className="flex grow items-center gap-3">
                            <GenreIcon className={`${company.iconColor}`} />
                            <div className="grid gap-2">
                              <Label className="">{company.name}</Label>
                              <p className="text-muted-foreground text-xs truncate">
                                {company.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="year">
                  <div className="grid grid-cols-3 gap-3 p-4">
                    {years.map((yearOption) => (
                      <Button
                        key={yearOption}
                        onClick={() => {
                          setYearSelected((prev) =>
                            prev === yearOption ? null : yearOption
                          );
                        }}
                        variant="outline"
                        className={`text-center !py-3 ${
                          yearSelected === yearOption
                            ? "!border-blue-800 text-blue-800 "
                            : ""
                        }`}
                      >
                        <Calendar />
                        {yearOption}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 grid-cols-3 lg:w-[90%] mx-auto gap-3 p-2">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-[2/3] w-full bg-zinc-500"
              />
            ))
          : data?.map((movie) => (
              <Link
                key={movie.id}
                href={`/${media_type}/${movie.id}`}
                prefetch={true}
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
        <Button
          variant="outline"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loadingMore}
          className="h-full w-full aspect-[2/3]"
        >
          {loadingMore ? (
            <LoaderCircleIcon
              className="-ms-1 animate-spin"
              size={16}
              aria-hidden="true"
            />
          ) : null}
          {loadingMore ? "Loading..." : "Load More"}
          <Plus />
        </Button>
        {loadingMore && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-full w-full bg-zinc-500" />
            ))}
          </>
        )}
      </div>
      <div className="w-full flex justify-center"></div>
    </main>
  );
}
