"use client";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { usePathname } from "next/navigation";
import {
  FilterIcon as Funnel,
  ChevronsUpDown,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import { useEffect, useState } from "react";
import type { MovieType } from "@/lib/getMovieData";
import { MovieCard } from "@/app/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export default function MovieWebsite() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const [movie, setMovie] = useState<MovieType[]>();
  const [page, setPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearSelected, setYearSelected] = useState<number | null>(null);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const path = usePathname();

  const [, , media_type, category] = path.split("/");

  const genreParam = selectedGenres.join(",");
  const companyParam = selectedCompanies.join(",");
  const networkParam = selectedNetworks.join(",");

  const randomNumber = 0;
  useEffect(() => {
    async function fetchPopularMovies() {
      let url = "";

      if (category === "popular") {
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&page=${page}${
          genreParam ? `&with_genres=${genreParam}` : ""
        }${
          media_type === "movie"
            ? companyParam
              ? `&with_companies=${companyParam}`
              : ""
            : networkParam
            ? `&with_networks=${networkParam}`
            : ""
        }${
          media_type === "movie"
            ? yearSelected
              ? `&primary_release_year=${yearSelected}`
              : ""
            : yearSelected
            ? `&first_air_date_year=${yearSelected}`
            : ""
        }`;

        console.log(url);
      } else if (category === "top-rated") {
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=100&language=en-US&page=${page}${
          genreParam ? `&with_genres=${genreParam}` : ""
        }${
          media_type === "movie"
            ? companyParam
              ? `&with_companies=${companyParam}`
              : ""
            : networkParam
            ? `&with_networks=${networkParam}`
            : ""
        }${
          media_type === "movie"
            ? yearSelected
              ? `&primary_release_year=${yearSelected}`
              : ""
            : yearSelected
            ? `&first_air_date_year=${yearSelected}`
            : ""
        }`;
      } else if (category === "now-playing") {
        url =
          media_type === "movie"
            ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}${
                genreParam ? `&with_genres=${genreParam}` : ""
              }`
            : `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&first_air_date_year=${yearSelected}&language=en-US&page=${page}${
                genreParam ? `&with_genres=${genreParam}` : ""
              }`;
      } else if (category === "coming-soon") {
        const today = new Date().toISOString().split("T")[0];
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=primary_release_date.asc&${
          media_type === "movie"
            ? `primary_release_date.gte=${today}`
            : `first_air_date.gte=${today}&first_air_date_year=${yearSelected}`
        }&language=en-US&page=${page}`;
      } else {
        // fallback: show popular
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&page=${page}${
          genreParam ? `&with_genres=${genreParam}` : ""
        }`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (page === 1 || filtersChanged) {
          // First page or filters changed: replace results
          setMovie(data.results);
          setFiltersChanged(false);
        } else {
          // Load more: append results
          setMovie((prev = []) => {
            const existingIds = new Set(prev.map((movie) => movie.id));
            const newMovies =
              data?.results?.filter(
                (movie: MovieType) => !existingIds.has(movie.id)
              ) || [];
            return [...prev, ...newMovies];
          });
        }
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        return [];
      }
    }

    fetchPopularMovies();
  }, [
    selectedGenres,
    selectedCompanies,
    selectedNetworks,
    yearSelected,
    page,
    apiKey,
    filtersChanged,
  ]);

  useEffect(() => {
    // Reset page to 1 and mark filters as changed when any filter changes
    setPage(1);
    setFiltersChanged(true);
  }, [selectedGenres, selectedCompanies, selectedNetworks, yearSelected]);

  return (
    <main>
      {movie?.[randomNumber] && (
        <div
          key={movie[randomNumber].id}
          className="relative lg:h-[75vh] h-[50vh] overflow-hidden "
        >
          <div className="absolute w-[calc(100%-40px)] lg:w-1/2 bottom-15 right-5 lg:right-25  z-10 text-white zxc flex flex-col items-end  ">
            <p className="text-right text-sm lg:text-base">
              {movie?.[randomNumber].tagline}
            </p>
            <span className="lg:text-6xl  text-3xl tracking-[-5px] lg:tracking-[-11px] font-bold zxczxc text-right mt-1 mb-2 lg:mt-2 lg:mb-4">
              {(movie?.[randomNumber].title || movie?.[randomNumber].name)
                ?.split(" ")
                .slice(0, -1)
                .join(" ")}{" "}
              <span className="text-yellow-500">
                {(movie?.[randomNumber].title || movie?.[randomNumber].name)
                  ?.split(" ")
                  .pop()}
              </span>
            </span>

            <span className="bg-blue-800/30 border-1 border-blue-800 text-blue-100 mt-3  cursor-pointer">
              <Link
                href={`/movie/${movie?.[randomNumber].id}`}
                prefetch={true}
                scroll={false}
              >
                <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
              </Link>
            </span>
          </div>
          <img
            className="abslute h-full w-full object-cover object-[center_40%] mask-gradient backdrop opacity-backrop"
            src={`https://image.tmdb.org/t/p/original/${movie[randomNumber].backdrop_path}`}
            alt="Lazy loaded"
          />
        </div>
      )}

      {/* The rest of the movies - inside a centered, narrower container */}
      <div className="lg:w-[90%] w-full mx-auto grid lg:grid-cols-6 grid-cols-3 lg:gap-5 gap-2 lg:p-4 p-2">
        <h1 className="col-start-1 lg:text-2xl text-xl whitespace-nowrap  font-bold flex gap-2">
          <p>
            {" "}
            {category === "popular"
              ? "Popular"
              : category === "top-rated"
              ? "Top Rated"
              : category === "now-playing"
              ? "Now Playing"
              : category === "coming-soon"
              ? "Coming Soon"
              : ""}
          </p>

          <p> {media_type === "movie" ? "Movies" : "TV Shows"}</p>
        </h1>
        <div className="lg:col-start-6 col-start-3">
          {category === "popular" || category === "top-rated" ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="lg:gap-5 w-full" variant="outline">
                  <Funnel /> Filter <ChevronsUpDown />
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
                  <TabsList className="w-full">
                    <TabsTrigger value="genre">Genres</TabsTrigger>
                    <TabsTrigger value="production">
                      {media_type === "movie" ? "Companies" : "Networks"}
                    </TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
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
          ) : (
            ""
          )}
        </div>
        {movie
          ?.filter((_, index) => index !== randomNumber)
          .map((data) => (
            <Link key={data.id} href={`/${media_type}/${data.id}`}>
              {" "}
              <MovieCard movie={data} />
            </Link>
          ))}
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex justify-center items-center py-3 mb-20">
        <Button onClick={() => setPage((prev) => prev + 1)}>Load More</Button>
      </div>
    </main>
  );
}
