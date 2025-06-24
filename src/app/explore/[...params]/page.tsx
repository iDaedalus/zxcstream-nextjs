"use client";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap,
  Compass,
  Palette,
  Laugh,
  Shield,
  FileText,
  Drama,
  Users,
  Wand2,
  Clock,
  Skull,
  Music,
  HelpCircle,
  Heart,
  Rocket,
  Tv,
  GhostIcon as Thriller,
  Swords,
  Mountain,
  Funnel,
  ChevronsUpDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NavBar from "@/app/navBar";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const movieGenres = [
  {
    name: "Action",
    id: 28,
    icon: Zap,
    description: "High-energy films with intense sequences",
    color: "text-red-700 border-red-950",
    iconColor: "text-red-600",
  },
  {
    name: "Adventure",
    id: 12,
    icon: Compass,
    description: "Exciting journeys and exploration",
    color: "text-orange-700 border-orange-950",
    iconColor: "text-orange-600",
  },
  {
    name: "Animation",
    id: 16,
    icon: Palette,
    description: "Animated films for all ages",
    color: "text-purple-700 border-purple-950",
    iconColor: "text-purple-600",
  },
  {
    name: "Comedy",
    id: 35,
    icon: Laugh,
    description: "Funny and entertaining movies",
    color: "text-yellow-700 border-yellow-950",
    iconColor: "text-yellow-600",
  },
  {
    name: "Crime",
    id: 80,
    icon: Shield,
    description: "Criminal activities and investigations",
    color: "text-gray-700 border-gray-950",
    iconColor: "text-gray-600",
  },
  {
    name: "Documentary",
    id: 99,
    icon: FileText,
    description: "Real-life stories and facts",
    color: "text-blue-700 border-blue-950",
    iconColor: "text-blue-600",
  },
  {
    name: "Drama",
    id: 18,
    icon: Drama,
    description: "Emotional and character-driven stories",
    color: "text-indigo-700 border-indigo-950",
    iconColor: "text-indigo-600",
  },
  {
    name: "Family",
    id: 10751,
    icon: Users,
    description: "Perfect for family movie nights",
    color: "text-green-700 border-green-950",
    iconColor: "text-green-600",
  },
  {
    name: "Fantasy",
    id: 14,
    icon: Wand2,
    description: "Magical worlds and creatures",
    color: "text-violet-700 border-violet-950",
    iconColor: "text-violet-600",
  },
  {
    name: "History",
    id: 36,
    icon: Clock,
    description: "Stories from the past",
    color: "text-amber-700 border-amber-950",
    iconColor: "text-amber-600",
  },
  {
    name: "Horror",
    id: 27,
    icon: Skull,
    description: "Scary and suspenseful films",
    color: "text-red-700 border-red-950",
    iconColor: "text-red-600",
  },
  {
    name: "Music",
    id: 10402,
    icon: Music,
    description: "Musical performances and stories",
    color: "text-pink-700 border-pink-950",
    iconColor: "text-pink-600",
  },
  {
    name: "Mystery",
    id: 9648,
    icon: HelpCircle,
    description: "Puzzles and unsolved cases",
    color: "text-slate-700 border-slate-950",
    iconColor: "text-slate-600",
  },
  {
    name: "Romance",
    id: 10749,
    icon: Heart,
    description: "Love stories and relationships",
    color: "text-rose-700 border-rose-950",
    iconColor: "text-rose-600",
  },
  {
    name: "Science Fiction",
    id: 878,
    icon: Rocket,
    description: "Futuristic and sci-fi themes",
    color: "text-cyan-700 border-cyan-950",
    iconColor: "text-cyan-600",
  },
  {
    name: "TV Movie",
    id: 10770,
    icon: Tv,
    description: "Made-for-television films",
    color: "text-teal-700 border-teal-950",
    iconColor: "text-teal-600",
  },
  {
    name: "Thriller",
    id: 53,
    icon: Thriller,
    description: "Suspenseful and edge-of-seat films",
    color: "text-red-700 border-red-950",
    iconColor: "text-red-600",
  },
  {
    name: "War",
    id: 10752,
    icon: Swords,
    description: "Military conflicts and battles",
    color: "text-stone-700 border-stone-950",
    iconColor: "text-stone-600",
  },
  {
    name: "Western",
    id: 37,
    icon: Mountain,
    description: "Wild west and frontier stories",
    color: "text-orange-700 border-orange-950",
    iconColor: "text-orange-600",
  },
];

const productionCompanies = [
  {
    name: "Marvel Studios",
    id: 420,
    icon: Shield,
    description: "Superhero and action films",
    color: "text-red-700 border-red-950",
    iconColor: "text-red-600",
  },
  {
    name: "Warner Bros.",
    id: 174,
    icon: Drama,
    description: "Major Hollywood studio",
    color: "text-blue-700 border-blue-950",
    iconColor: "text-blue-600",
  },
  {
    name: "Universal Pictures",
    id: 33,
    icon: Rocket,
    description: "Global entertainment company",
    color: "text-purple-700 border-purple-950",
    iconColor: "text-purple-600",
  },
  {
    name: "Disney",
    id: 2,
    icon: Wand2,
    description: "Family and animated films",
    color: "text-pink-700 border-pink-950",
    iconColor: "text-pink-600",
  },
  {
    name: "Sony Pictures",
    id: 5,
    icon: Tv,
    description: "Entertainment and media",
    color: "text-yellow-700 border-yellow-950",
    iconColor: "text-yellow-600",
  },
  {
    name: "Paramount Pictures",
    id: 4,
    icon: Mountain,
    description: "Classic Hollywood studio",
    color: "text-indigo-700 border-indigo-950",
    iconColor: "text-indigo-600",
  },
  {
    name: "20th Century Studios",
    id: 25,
    icon: Clock,
    description: "Major film studio",
    color: "text-orange-700 border-orange-950",
    iconColor: "text-orange-600",
  },
  {
    name: "Netflix",
    id: 178464,
    icon: Tv,
    description: "Streaming platform originals",
    color: "text-red-700 border-red-950",
    iconColor: "text-red-600",
  },
  {
    name: "A24",
    id: 41077,
    icon: Palette,
    description: "Independent film company",
    color: "text-green-700 border-green-950",
    iconColor: "text-green-600",
  },
  {
    name: "Blumhouse Productions",
    id: 3172,
    icon: Skull,
    description: "Horror and thriller films",
    color: "text-gray-700 border-gray-950",
    iconColor: "text-gray-600",
  },
  {
    name: "Pixar",
    id: 3,
    icon: Palette,
    description: "Computer animation studio",
    color: "text-cyan-700 border-cyan-950",
    iconColor: "text-cyan-600",
  },
  {
    name: "Lucasfilm",
    id: 1,
    icon: Rocket,
    description: "Star Wars and adventure films",
    color: "text-amber-700 border-amber-950",
    iconColor: "text-amber-600",
  },
];

import { useEffect, useState } from "react";
import { MovieType } from "@/lib/getMovieData";
import { MovieCard } from "@/app/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export default function MovieWebsite() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const [movie, setMovie] = useState<MovieType[]>();
  const [year, setYear] = useState(currentYear);
  const [page, setPage] = useState(1);
  const path = usePathname();
  const [, , media_type, category] = path.split("/");
  console.log("Type:", media_type); // "movie"
  console.log("Category:", category); // "popular"
  // const randomNumber = Math.floor(Math.random() * 5) + 1;
  const randomNumber = 0;
  useEffect(() => {
    async function fetchPopularMovies() {
      let url = "";

      if (category === "popular") {
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&language=en-US&page=${page}`;
      } else if (category === "top-rated") {
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=100&primary_release_year=${year}&language=en-US&page=${page}`;
      } else if (category === "now-playing") {
        url =
          media_type === "movie"
            ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&primary_release_year=${year}&language=en-US&page=${page}`
            : `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&first_air_date_year=${year}&language=en-US&page=${page}`;
      } else if (category === "coming-soon") {
        const today = new Date().toISOString().split("T")[0];
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=primary_release_date.asc&${
          media_type === "movie"
            ? `primary_release_date.gte=${today}&primary_release_year=${year}`
            : `first_air_date.gte=${today}&first_air_date_year=${year}`
        }&language=en-US&page=${page}`;
      } else {
        // fallback: show popular
        url = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&language=en-US&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (page === 1) {
          // First page: set featured movie and initialize list
          setMovie(data.results);
        } else {
          // Subsequent pages: append to existing list
          setMovie((prev = []) => [...prev, ...data?.results]);
        }
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        return [];
      }
    }

    fetchPopularMovies();
  }, [media_type, year, page]);

  return (
    <main>
      <NavBar />

      {movie?.[randomNumber] && (
        <div
          key={movie[randomNumber].id}
          className="relative lg:h-[75vh] h-[50vh] overflow-hidden "
        >
          <div className="absolute w-[calc(100%-40px)] lg:w-1/2 bottom-15 right-5 lg:right-25  z-20 text-white zxc flex flex-col items-end  ">
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
                  <TabsTrigger value="production">Production</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <TabsContent value="genre" className="mt-3 ">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 ">
                    {movieGenres.map((genre) => {
                      const GenreIcon = genre.icon;
                      return (
                        <div
                          key={genre.id}
                          className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50 ${genre.color}`}
                        >
                          <Checkbox className="order-1 after:absolute after:inset-0" />
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
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="production" className="mt-3">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                    {productionCompanies.map((company) => {
                      const GenreIcon = company.icon;
                      return (
                        <div
                          key={company.id}
                          className={`relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50 ${company.color}`}
                        >
                          <Checkbox className="order-1 after:absolute after:inset-0" />
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
                  <div className="grid grid-cols-3">
                    {years.map((year) => (
                      <p
                        key={year}
                        onClick={() => setYear(year)}
                        className="text-center p-4"
                      >
                        {year}
                      </p>
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
