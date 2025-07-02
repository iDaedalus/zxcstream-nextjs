"use client";
import { MovieType } from "@/lib/getMovieData";
import { MovieCard } from "./card";
import { movieGenres } from "./filter";
import { tvGenres } from "./filter";
import { productionCompanies } from "./filter";
import { tvNetworks } from "./filter";
import { keywordTopics } from "./filter";
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
  CalendarIcon,
  Check,
  ChevronsUpDown,
  FactoryIcon,
  Globe,
  Info,
  ListFilter,
  LoaderCircleIcon,
  LucideIcon,
  Play,
  Plus,
  RotateCcw,
  Tag,
  TagsIcon,
  X,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { tmdbRegions } from "./filter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
interface ReusableCategoryProps {
  movies: MovieType[];
  loading: boolean;
  totalPages: number;
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
  keywordId: string;
  setKeywordId: (id: string | ((prev: string) => string)) => void;

  selectedRegion: string;
  setSelectedRegion: (id: string | ((prev: string) => string)) => void;
  fromYear: number;
  setFromYear: (fromYear: number | ((prev: number) => number)) => void;
  toYear: number;
  setToYear: (toYear: number | ((prev: number) => number)) => void;
  voteMin: number;
  setVoteMin: (voteMin: number | ((prev: number) => number)) => void;
  voteMax: number;
  setVoteMax: (voteMax: number | ((prev: number) => number)) => void;
}
export default function ReusableCategory({
  movies,
  media_type,
  loading,
  loadingMore,
  category,
  totalPages,
  page,
  setPage,
  selectedGenres,
  setSelectedGenres,
  selectedCompanies,
  setSelectedCompanies,
  selectedNetworks,
  setSelectedNetworks,
  keywordId,
  setKeywordId,
  selectedRegion,
  setSelectedRegion,
  fromYear,
  setFromYear,
  toYear,
  setToYear,
  voteMin,
  setVoteMin,
  voteMax,
  setVoteMax,
}: ReusableCategoryProps) {
  const [openTag, setOpenTag] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [openRangeA, setOpenRangeA] = useState(false);
  const [openRangeB, setOpenRangeB] = useState(false);
  const [openYearA, setOpenYearA] = useState(false);
  const [openYearB, setOpenYearB] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const rating = Array.from({ length: 10 }, (_, i) => i + 1);
  const resetFilter = () => {
    setPage(1);

    setSelectedGenres([]);
    setSelectedCompanies([]);
    setSelectedNetworks([]);

    setKeywordId("");

    setSelectedRegion("");

    setFromYear(0);
    setToYear(0);
    setVoteMin(0);
    setVoteMax(0);
  };

  console.log(keywordId);
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
          movies?.slice(0, 1).map((meow) => (
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
                    href={`/watch/${media_type}/${meow.id}${
                      media_type === "tv" ? "/1/1" : ""
                    }`}
                    prefetch={true}
                    scroll={false}
                  >
                    <Button variant="secondary">
                      <Play />
                      Play Now
                    </Button>
                  </Link>
                  <Link
                    href={`/${media_type}/${meow.id}`}
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
                  href={`/${media_type}/${meow.id}`}
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

              <Image
                className="absolute h-full w-full object-cover object-[center_40%] mask-gradient blur-[2px] lg:blur-[0] opacity-70"
                src={`https://image.tmdb.org/t/p/original/${meow.backdrop_path}`}
                alt="Lazy loaded"
                priority
                fill
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
              movies?.slice(0, 1).map((meow) => (
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

      <div className="space-y-4 mt-9   w-[95%] lg:w-[90%] mx-auto">
        <div className="flex items-center justify-between w-full ">
          <h1 className="lg:text-2xl text-xl whitespace-nowrap  font-bold flex gap-2">
            <p className="text-foreground relative font-semibold text-[1.1rem] lg:text-2xl  lg:border-l-4 border-l-2 border-blue-800 lg:pl-6 pl-3 flex items-center gap-2">
              {category?.charAt(0).toUpperCase() +
                (keywordId || category)?.slice(1)}
              &nbsp;
              {media_type === "movie" ? "Movies" : "TV Shows"}
            </p>
          </h1>

          <div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <ListFilter />
                  <span className="">
                    Select Filter
                    {selectedGenres.length +
                      (media_type === "movie"
                        ? selectedCompanies.length
                        : selectedNetworks.length) +
                      (selectedRegion ? 1 : 0) +
                      (keywordId ? 1 : 0) +
                      (fromYear ? 1 : 0) +
                      (toYear ? 1 : 0) +
                      (voteMin ? 1 : 0) +
                      (voteMax ? 1 : 0) ===
                    0 ? (
                      ""
                    ) : (
                      <Badge
                        className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                        variant="secondary"
                      >
                        {selectedGenres.length +
                          (media_type === "movie"
                            ? selectedCompanies.length
                            : selectedNetworks.length) +
                          (selectedRegion ? 1 : 0) +
                          (keywordId ? 1 : 0) +
                          (fromYear ? 1 : 0) +
                          (toYear ? 1 : 0) +
                          (voteMin ? 1 : 0) +
                          (voteMax ? 1 : 0)}
                      </Badge>
                    )}
                  </span>
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

                <Tabs defaultValue="genre" className="w-full p-3">
                  <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                    <TabsTrigger
                      value="genre"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <TagsIcon
                        className="-ms-0.5 me-1.5 opacity-60 hidden lg:block"
                        size={16}
                        aria-hidden="true"
                      />
                      Genres
                      {selectedGenres.length === 0 ? (
                        ""
                      ) : (
                        <Badge
                          className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                          variant="secondary"
                        >
                          {selectedGenres.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="production"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <FactoryIcon
                        className="-ms-0.5 me-1.5 opacity-60 hidden lg:block"
                        size={16}
                        aria-hidden="true"
                      />
                      {media_type === "movie" ? "Studios" : "Networks"}

                      {(media_type === "movie"
                        ? selectedCompanies.length
                        : selectedNetworks.length) > 0 && (
                        <Badge
                          className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                          variant="secondary"
                        >
                          {media_type === "movie"
                            ? selectedCompanies.length
                            : selectedNetworks.length}
                        </Badge>
                      )}
                    </TabsTrigger>

                    <TabsTrigger
                      value="year"
                      className="bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <CalendarIcon
                        className="-ms-0.5 me-1.5 opacity-60 hidden lg:block"
                        size={16}
                        aria-hidden="true"
                      />
                      More
                      {(selectedRegion ? 1 : 0) +
                        (keywordId ? 1 : 0) +
                        (fromYear ? 1 : 0) +
                        (toYear ? 1 : 0) +
                        (voteMin ? 1 : 0) +
                        (voteMax ? 1 : 0) ===
                      0 ? (
                        ""
                      ) : (
                        <Badge
                          className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                          variant="secondary"
                        >
                          {(selectedRegion ? 1 : 0) +
                            (keywordId ? 1 : 0) +
                            (fromYear ? 1 : 0) +
                            (toYear ? 1 : 0) +
                            (voteMin ? 1 : 0) +
                            (voteMax ? 1 : 0)}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {/* Genre Tab - Scrollable */}
                  <TabsContent
                    value="genre"
                    className="mt-3 max-h-96 overflow-y-auto pr-2"
                  >
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                      {(media_type === "movie" ? movieGenres : tvGenres).map(
                        (genre) => {
                          const GenreIcon = genre.icon;
                          return (
                            <div
                              key={genre.id}
                              className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50 ${genre.color}`}
                            >
                              <Checkbox
                                checked={selectedGenres.includes(
                                  genre.id.toString()
                                )}
                                onCheckedChange={() => {
                                  setSelectedGenres((prev) =>
                                    prev.includes(genre.id.toString())
                                      ? prev.filter(
                                          (g) => g !== genre.id.toString()
                                        )
                                      : [...prev, genre.id.toString()]
                                  );
                                }}
                                className="order-1 after:absolute after:inset-0"
                              />
                              <div className="flex grow items-center gap-3">
                                <GenreIcon className={genre.iconColor} />
                                <div className="grid gap-2">
                                  <Label>{genre.name}</Label>
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

                  {/* Production Tab - Scrollable */}
                  <TabsContent
                    value="production"
                    className="mt-3 max-h-96 overflow-y-auto pr-2"
                  >
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                      {(media_type === "movie"
                        ? productionCompanies
                        : tvNetworks
                      ).map((company) => {
                        const GenreIcon = company.icon;
                        return (
                          <div
                            key={company.id}
                            className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50`}
                          >
                            {media_type === "movie" ? (
                              <Checkbox
                                checked={selectedCompanies.includes(
                                  company.id.toString()
                                )}
                                onCheckedChange={() => {
                                  setSelectedCompanies((prev) =>
                                    prev.includes(company.id.toString())
                                      ? prev.filter(
                                          (g) => g !== company.id.toString()
                                        )
                                      : [...prev, company.id.toString()]
                                  );
                                }}
                                className="order-1 after:absolute after:inset-0"
                              />
                            ) : (
                              <Checkbox
                                checked={selectedNetworks.includes(
                                  company.id.toString()
                                )}
                                onCheckedChange={() => {
                                  setSelectedNetworks((prev) =>
                                    prev.includes(company.id.toString())
                                      ? prev.filter(
                                          (g) => g !== company.id.toString()
                                        )
                                      : [...prev, company.id.toString()]
                                  );
                                }}
                                className="order-1 after:absolute after:inset-0"
                              />
                            )}
                            <div className="flex grow items-center gap-3">
                              <GenreIcon />
                              <div className="grid gap-2">
                                <Label>{company.name}</Label>
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

                  {/* More Tab - Scrollable */}
                  <TabsContent
                    value="year"
                    className="mt-3 max-h-96 overflow-y-auto pr-2"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <div className="space-y-1 flex-1">
                          <p className="text-xs text-muted-foreground">Tags</p>
                          <Popover open={openTag} onOpenChange={setOpenTag}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openTag}
                                className="w-full justify-between bg-transparent"
                              >
                                <Tag />
                                {keywordId
                                  ? keywordTopics.find(
                                      (framework) =>
                                        framework.value === keywordId
                                    )?.label
                                  : "Tag"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search tag..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {keywordTopics.map((framework) => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.label}
                                        onSelect={() => {
                                          setKeywordId(framework.value);
                                          setOpenTag(false);
                                        }}
                                      >
                                        {framework.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            keywordId === framework.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-1 flex-1">
                          <p className="text-xs text-muted-foreground">
                            Region
                          </p>
                          <Popover
                            open={openRegion}
                            onOpenChange={setOpenRegion}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRegion}
                                className="w-full justify-between bg-transparent"
                              >
                                <Globe />
                                {selectedRegion
                                  ? tmdbRegions.find(
                                      (framework) =>
                                        framework.value === selectedRegion
                                    )?.label
                                  : "Region"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search region..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {tmdbRegions.map((framework) => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.label}
                                        onSelect={() => {
                                          setSelectedRegion(framework.value);
                                          setOpenRegion(false);
                                        }}
                                      >
                                        {framework.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            selectedRegion === framework.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Separator className="w-full  mt-3" />
                      <div className="space-y-1 ">
                        <p className="text-xs text-muted-foreground">
                          Year Range
                        </p>
                        <div className="flex gap-3 items-center">
                          <Popover open={openYearA} onOpenChange={setOpenYearA}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openYearA}
                                className="flex-1 justify-between bg-transparent"
                              >
                                {fromYear || "From"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search year..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No year found.</CommandEmpty>
                                  <CommandGroup>
                                    {years.map((year) => (
                                      <CommandItem
                                        key={year}
                                        value={year.toString()}
                                        onSelect={() => {
                                          setFromYear(year);
                                          setOpenYearA(false);
                                        }}
                                      >
                                        {year}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            fromYear === year
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          —
                          <Popover open={openYearB} onOpenChange={setOpenYearB}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openYearB}
                                className="flex-1 justify-between bg-transparent"
                              >
                                {toYear || "To"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search year..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No year found.</CommandEmpty>
                                  <CommandGroup>
                                    {years.map((year) => (
                                      <CommandItem
                                        key={year}
                                        value={year.toString()}
                                        onSelect={() => {
                                          setToYear(year);
                                          setOpenYearB(false);
                                        }}
                                      >
                                        {year}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            toYear === year
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <Separator className="w-full mt-3" />
                      <div className="space-y-1 ">
                        <p className="text-xs text-muted-foreground">
                          Rating Range
                        </p>
                        <div className="flex gap-3 items-center">
                          <Popover
                            open={openRangeA}
                            onOpenChange={setOpenRangeA}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRangeA}
                                className="flex-1 justify-between bg-transparent"
                              >
                                {voteMin || "Min."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search rating..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No rating found.</CommandEmpty>
                                  <CommandGroup>
                                    {rating.map((rate) => (
                                      <CommandItem
                                        key={rate}
                                        value={rate.toString()}
                                        onSelect={() => {
                                          setVoteMin(rate);
                                          setOpenRangeA(false);
                                        }}
                                      >
                                        ⭐ {rate}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            voteMin === rate
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          —
                          <Popover
                            open={openRangeB}
                            onOpenChange={setOpenRangeB}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRangeB}
                                className="flex-1 justify-between bg-transparent"
                              >
                                {voteMax || "Max."}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search rating..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No rating found.</CommandEmpty>
                                  <CommandGroup>
                                    {rating.map((rate) => (
                                      <CommandItem
                                        key={rate}
                                        value={rate.toString()}
                                        onSelect={() => {
                                          setVoteMax(rate);
                                          setOpenRangeB(false);
                                        }}
                                      >
                                        ⭐ {rate}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            voteMax === rate
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <div className="w-full flex gap-3">
                      <Button onClick={resetFilter} className="flex-1">
                        <RotateCcw /> Reset
                      </Button>
                      <Button className="flex-1" variant="outline">
                        <X /> Close
                      </Button>
                    </div>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="grid lg:grid-cols-6 grid-cols-3 w-full lg:gap-5  gap-2.5">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-[2/3] w-full bg-zinc-500"
                />
              ))
            : movies?.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
              ))}
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loadingMore || page >= totalPages}
            className="h-full w-full aspect-[2/3] flex-col "
          >
            <Plus />
            <div className="flex gap-1">
              {loadingMore ? (
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
              ) : null}
              {page >= totalPages
                ? "No more results."
                : loadingMore
                ? "Loading..."
                : "Load More"}
            </div>
            <p>
              {page} / {totalPages}
            </p>
          </Button>
          {loadingMore && (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-full w-full bg-zinc-500" />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
