"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Filter,
  X,
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
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MovieType } from "@/lib/getMovieData";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MovieCard } from "../card";
import NavBar from "../navBar";
import Link from "next/link";
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
import { cn } from "@/lib/utils";

const API_KEY = "47a1a7df542d3d483227f758a7317dff";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const movieGenres = [
  {
    name: "Action",
    id: 28,
    icon: Zap,
    description: "High-energy films with intense sequences",
  },
  {
    name: "Adventure",
    id: 12,
    icon: Compass,
    description: "Exciting journeys and exploration",
  },
  {
    name: "Animation",
    id: 16,
    icon: Palette,
    description: "Animated films for all ages",
  },
  {
    name: "Comedy",
    id: 35,
    icon: Laugh,
    description: "Funny and entertaining movies",
  },
  {
    name: "Crime",
    id: 80,
    icon: Shield,
    description: "Criminal activities and investigations",
  },
  {
    name: "Documentary",
    id: 99,
    icon: FileText,
    description: "Real-life stories and facts",
  },
  {
    name: "Drama",
    id: 18,
    icon: Drama,
    description: "Emotional and character-driven stories",
  },
  {
    name: "Family",
    id: 10751,
    icon: Users,
    description: "Perfect for family movie nights",
  },
  {
    name: "Fantasy",
    id: 14,
    icon: Wand2,
    description: "Magical worlds and creatures",
  },
  {
    name: "History",
    id: 36,
    icon: Clock,
    description: "Stories from the past",
  },
  {
    name: "Horror",
    id: 27,
    icon: Skull,
    description: "Scary and suspenseful films",
  },
  {
    name: "Music",
    id: 10402,
    icon: Music,
    description: "Musical performances and stories",
  },
  {
    name: "Mystery",
    id: 9648,
    icon: HelpCircle,
    description: "Puzzles and unsolved cases",
  },
  {
    name: "Romance",
    id: 10749,
    icon: Heart,
    description: "Love stories and relationships",
  },
  {
    name: "Science Fiction",
    id: 878,
    icon: Rocket,
    description: "Futuristic and sci-fi themes",
  },
  {
    name: "TV Movie",
    id: 10770,
    icon: Tv,
    description: "Made-for-television films",
  },
  {
    name: "Thriller",
    id: 53,
    icon: Thriller,
    description: "Suspenseful and edge-of-seat films",
  },
  {
    name: "War",
    id: 10752,
    icon: Swords,
    description: "Military conflicts and battles",
  },
  {
    name: "Western",
    id: 37,
    icon: Mountain,
    description: "Wild west and frontier stories",
  },
];

const productionCompanies = [
  {
    name: "Marvel Studios",
    id: 420,
    icon: Shield,
    description: "Superhero and action films",
  },
  {
    name: "Warner Bros.",
    id: 174,
    icon: Drama,
    description: "Major Hollywood studio",
  },
  {
    name: "Universal Pictures",
    id: 33,
    icon: Rocket,
    description: "Global entertainment company",
  },
  {
    name: "Disney",
    id: 2,
    icon: Wand2,
    description: "Family and animated films",
  },
  {
    name: "Sony Pictures",
    id: 5,
    icon: Tv,
    description: "Entertainment and media",
  },
  {
    name: "Paramount Pictures",
    id: 4,
    icon: Mountain,
    description: "Classic Hollywood studio",
  },
  {
    name: "20th Century Studios",
    id: 25,
    icon: Clock,
    description: "Major film studio",
  },
  {
    name: "Netflix",
    id: 178464,
    icon: Tv,
    description: "Streaming platform originals",
  },
  {
    name: "A24",
    id: 41077,
    icon: Palette,
    description: "Independent film company",
  },
  {
    name: "Blumhouse Productions",
    id: 3172,
    icon: Skull,
    description: "Horror and thriller films",
  },
  {
    name: "Pixar",
    id: 3,
    icon: Palette,
    description: "Computer animation studio",
  },
  {
    name: "Lucasfilm",
    id: 1,
    icon: Rocket,
    description: "Star Wars and adventure films",
  },
];

export default function MovieWebsite() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  // Simple year list
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  // Fetch movies function - with pagination
  const fetchMovies = async (page = 1, append = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;

      if (selectedYear) {
        url += `&primary_release_year=${selectedYear}`;
      }

      if (selectedGenres.length > 0) {
        url += `&with_genres=${selectedGenres.join(",")}`;
      }

      if (selectedCompanies.length > 0) {
        url += `&with_companies=${selectedCompanies.join(",")}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (append) {
        setMovies((prev) => [...prev, ...(data.results || [])]);
      } else {
        setMovies(data.results || []);
      }

      setCurrentPage(page);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error:", error);
      if (!append) setMovies([]);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  // Fetch movies when filters change - reset to page 1
  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1, false);
  }, [selectedYear, selectedGenres, selectedCompanies]);

  // Handle genre selection
  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const toggleCompany = (companyId: number) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedYear("");
    setSelectedGenres([]);
    setSelectedCompanies([]);
  };

  // Load more movies
  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchMovies(currentPage + 1, true);
    }
  };

  // Get selected genre names for display
  const getSelectedGenreNames = () => {
    return selectedGenres
      .map((id) => movieGenres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  // Get selected company names for display
  const getSelectedCompanyNames = () => {
    return selectedCompanies
      .map((id) => productionCompanies.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="min-h-screen w-[95%] lg:w-[90%] mx-auto">
      <NavBar />
      {/* Header Section */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-3  lg:mt-25 mt-20">
        <div className="">
          <h1 className="text-4xl  font-bold mb-2 zxczxc lg:tracking-[-6px] tracking-[-3px]">
            Movies
          </h1>
          <p className="lg:text-lg text-sm text-muted-foreground">
            Discover and explore thousands of movies
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Year Filter */}
          <Popover open={yearOpen} onOpenChange={setYearOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={yearOpen}
                className="w-full justify-between"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {selectedYear ? selectedYear : "Year"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-0">
              <Command>
                <CommandInput placeholder="Search year..." />
                <CommandList>
                  <CommandEmpty>No year found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="all"
                      onSelect={() => {
                        setSelectedYear("");
                        setYearOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedYear === "" ? "opacity-100" : "opacity-0"
                        )}
                      />
                      All Years
                    </CommandItem>
                    {years.map((year) => (
                      <CommandItem
                        key={year}
                        value={year.toString()}
                        onSelect={(currentValue) => {
                          setSelectedYear(
                            currentValue === selectedYear ? "" : currentValue
                          );
                          setYearOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedYear === year.toString()
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {year}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Genre Filter - Combobox on small screens, Button on large screens */}
          <div className="lg:hidden">
            <Popover open={genreOpen} onOpenChange={setGenreOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={genreOpen}
                  className="w-full justify-between"
                >
                  <Filter className="h-4 w-4 mr-2 hidden lg:block" />
                  {selectedGenres.length > 0
                    ? `${selectedGenres.length} Genre${
                        selectedGenres.length > 1 ? "s" : ""
                      }`
                    : "Genres"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex-1 p-0">
                <Command>
                  <CommandInput placeholder="Search genres..." />
                  <CommandList>
                    <CommandEmpty>No genre found.</CommandEmpty>
                    <CommandGroup>
                      {movieGenres.map((genre) => (
                        <CommandItem
                          key={genre.id}
                          value={genre.name}
                          onSelect={() => {
                            toggleGenre(genre.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedGenres.includes(genre.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {genre.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowGenres(!showGenres)}
            >
              <Filter className="h-4 w-4 mr-2 hidden lg:block" />
              Genres ({selectedGenres.length})
            </Button>
          </div>

          {/* Production Companies Filter - Combobox on small screens, Button on large screens */}
          <div className="lg:hidden">
            <Popover open={companyOpen} onOpenChange={setCompanyOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={companyOpen}
                  className="w-full justify-between"
                >
                  <Filter className="h-4 w-4 mr-2 hidden lg:block" />
                  {selectedCompanies.length > 0
                    ? `${selectedCompanies.length} Studio${
                        selectedCompanies.length > 1 ? "s" : ""
                      }`
                    : "Studios"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search studios..." />
                  <CommandList>
                    <CommandEmpty>No studio found.</CommandEmpty>
                    <CommandGroup>
                      {productionCompanies.map((company) => (
                        <CommandItem
                          key={company.id}
                          value={company.name}
                          onSelect={() => {
                            toggleCompany(company.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCompanies.includes(company.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {company.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden lg:block">
            <Button
              variant="outline"
              onClick={() => setShowCompanies(!showCompanies)}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2 hidden lg:block" />
              Companies ({selectedCompanies.length})
            </Button>
          </div>

          {/* Clear Button */}
          {(selectedYear ||
            selectedGenres.length > 0 ||
            selectedCompanies.length > 0) && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="col-span-3"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto">
        {/* Genre Selection - Only show on large screens */}
        {showGenres && (
          <div className="hidden lg:block rounded-lg mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {movieGenres.map((genre) => {
                const IconComponent = genre.icon;
                const id = `genre-${genre.id}`;
                return (
                  <div
                    key={genre.id}
                    className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
                  >
                    <Checkbox
                      id={id}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby={`${id}-description`}
                      checked={selectedGenres.includes(genre.id)}
                      onCheckedChange={() => toggleGenre(genre.id)}
                    />
                    <div className="flex grow items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={id}>
                          {genre.name}{" "}
                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Genre)
                          </span>
                        </Label>
                        <p
                          id={`${id}-description`}
                          className="text-muted-foreground text-xs"
                        >
                          {genre.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Production Companies Selection - Only show on large screens */}
        {showCompanies && (
          <div className="hidden lg:block rounded-lg mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productionCompanies.map((company) => {
                const IconComponent = company.icon;
                const id = `company-${company.id}`;
                return (
                  <div
                    key={company.id}
                    className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
                  >
                    <Checkbox
                      id={id}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby={`${id}-description`}
                      checked={selectedCompanies.includes(company.id)}
                      onCheckedChange={() => toggleCompany(company.id)}
                    />
                    <div className="flex grow items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={id}>
                          {company.name}{" "}
                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Studio)
                          </span>
                        </Label>
                        <p
                          id={`${id}-description`}
                          className="text-muted-foreground text-xs"
                        >
                          {company.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Movies Grid */}
      <div className="mx-auto mt-8">
        <div>
          {/* Active Filters */}
          {(selectedYear ||
            selectedGenres.length > 0 ||
            selectedCompanies.length > 0) && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {selectedYear && (
                <Badge variant="secondary">
                  Year: {selectedYear}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => setSelectedYear("")}
                  />
                </Badge>
              )}
              {selectedGenres.map((genreId) => {
                const genre = movieGenres.find((g) => g.id === genreId);
                return (
                  <Badge key={genreId} variant="secondary">
                    {genre?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleGenre(genreId)}
                    />
                  </Badge>
                );
              })}
              {selectedCompanies.map((companyId) => {
                const company = productionCompanies.find(
                  (c) => c.id === companyId
                );
                return (
                  <Badge key={companyId} variant="secondary">
                    {company?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleCompany(companyId)}
                    />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
        {loading ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg aspect-[2/3] mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found</p>
            <p className="text-gray-400">Try different filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-2">
            {movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id} prefetch={true}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && movies.length > 0 && currentPage < totalPages && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              size="lg"
              className="px-8"
            >
              {loadingMore ? "Loading..." : "Load More Movies"}
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
