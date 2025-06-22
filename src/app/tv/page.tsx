"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Filter,
  X,
  Zap,
  Palette,
  Laugh,
  Shield,
  FileText,
  Drama,
  Users,
  Wand2,
  Music,
  HelpCircle,
  Heart,
  Rocket,
  Tv,
  Swords,
  Mountain,
  Check,
  ChevronsUpDown,
  Baby,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

import type { MovieType } from "@/lib/getMovieData";

const tvGenres = [
  {
    name: "Action & Adventure",
    id: 10759,
    icon: Zap,
    description: "High-energy shows with thrilling adventures",
  },
  {
    name: "Animation",
    id: 16,
    icon: Palette,
    description: "Animated series for all ages",
  },
  {
    name: "Comedy",
    id: 35,
    icon: Laugh,
    description: "Funny and entertaining shows",
  },
  {
    name: "Crime",
    id: 80,
    icon: Shield,
    description: "Criminal investigations and police procedurals",
  },
  {
    name: "Documentary",
    id: 99,
    icon: FileText,
    description: "Real-life stories and educational content",
  },
  {
    name: "Drama",
    id: 18,
    icon: Drama,
    description: "Emotional and character-driven series",
  },
  {
    name: "Family",
    id: 10751,
    icon: Users,
    description: "Perfect for family viewing",
  },
  {
    name: "Kids",
    id: 10762,
    icon: Baby,
    description: "Shows designed for children",
  },
  {
    name: "Mystery",
    id: 9648,
    icon: HelpCircle,
    description: "Puzzles and unsolved mysteries",
  },
  {
    name: "News",
    id: 10763,
    icon: Newspaper,
    description: "News programs and current affairs",
  },
  {
    name: "Reality",
    id: 10764,
    icon: Tv,
    description: "Reality TV and competition shows",
  },
  {
    name: "Sci-Fi & Fantasy",
    id: 10765,
    icon: Rocket,
    description: "Science fiction and fantasy series",
  },
  {
    name: "Soap",
    id: 10766,
    icon: Heart,
    description: "Soap operas and melodramas",
  },
  {
    name: "Talk",
    id: 10767,
    icon: Music,
    description: "Talk shows and interviews",
  },
  {
    name: "War & Politics",
    id: 10768,
    icon: Swords,
    description: "Political dramas and war stories",
  },
  {
    name: "Western",
    id: 37,
    icon: Mountain,
    description: "Wild west and frontier stories",
  },
];

const tvNetworks = [
  {
    name: "Netflix",
    id: 213,
    icon: Tv,
    description: "Streaming platform originals",
  },
  {
    name: "HBO",
    id: 49,
    icon: Drama,
    description: "Premium cable network",
  },
  {
    name: "Amazon Prime Video",
    id: 1024,
    icon: Rocket,
    description: "Amazon's streaming service",
  },
  {
    name: "Disney+",
    id: 2739,
    icon: Wand2,
    description: "Disney's streaming platform",
  },
  {
    name: "Apple TV+",
    id: 2552,
    icon: Tv,
    description: "Apple's streaming service",
  },
  {
    name: "Hulu",
    id: 453,
    icon: Tv,
    description: "Popular streaming platform",
  },
  {
    name: "BBC One",
    id: 4,
    icon: Newspaper,
    description: "British public broadcaster",
  },
  {
    name: "NBC",
    id: 6,
    icon: Tv,
    description: "Major US television network",
  },
  {
    name: "CBS",
    id: 16,
    icon: Tv,
    description: "American television network",
  },
  {
    name: "ABC",
    id: 2,
    icon: Tv,
    description: "American broadcast network",
  },
  {
    name: "FOX",
    id: 19,
    icon: Tv,
    description: "American television network",
  },
  {
    name: "The CW",
    id: 71,
    icon: Drama,
    description: "American broadcast network",
  },
];

export default function TVShowWebsite() {
  const [tvShows, setTVShows] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedNetworks, setSelectedNetworks] = useState<number[]>([]);
  const [showNetworks, setShowNetworks] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);

  // Simple year list
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  // Fetch TV shows function - with pagination
  const fetchTVShows = async (page = 1, append = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`;

      if (selectedYear) {
        url += `&first_air_date_year=${selectedYear}`;
      }

      if (selectedGenres.length > 0) {
        url += `&with_genres=${selectedGenres.join(",")}`;
      }

      if (selectedNetworks.length > 0) {
        url += `&with_networks=${selectedNetworks.join(",")}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (append) {
        setTVShows((prev) => [...prev, ...(data.results || [])]);
      } else {
        setTVShows(data.results || []);
      }

      setCurrentPage(page);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Error:", error);
      if (!append) setTVShows([]);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  // Fetch TV shows when filters change - reset to page 1
  useEffect(() => {
    setCurrentPage(1);
    fetchTVShows(1, false);
  }, [selectedYear, selectedGenres, selectedNetworks]);

  // Handle genre selection
  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const toggleNetwork = (networkId: number) => {
    if (selectedNetworks.includes(networkId)) {
      setSelectedNetworks(selectedNetworks.filter((id) => id !== networkId));
    } else {
      setSelectedNetworks([...selectedNetworks, networkId]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedYear("");
    setSelectedGenres([]);
    setSelectedNetworks([]);
  };

  // Load more TV shows
  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchTVShows(currentPage + 1, true);
    }
  };

  return (
    <div className="min-h-screen w-[95%] lg:w-[90%] mx-auto">
      <NavBar />
      {/* Header Section */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-3 lg:mt-25 mt-20">
        <div className="">
          <h1 className="text-4xl font-bold mb-2 zxczxc lg:tracking-[-6px] tracking-[-3px]">
            TV Shows
          </h1>
          <p className="lg:text-lg text-sm text-muted-foreground">
            Discover and explore thousands of TV series
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
                      {tvGenres.map((genre) => (
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

          {/* Networks Filter - Combobox on small screens, Button on large screens */}
          <div className="lg:hidden">
            <Popover open={networkOpen} onOpenChange={setNetworkOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={networkOpen}
                  className="w-full justify-between"
                >
                  <Filter className="h-4 w-4 mr-2 hidden lg:block" />
                  {selectedNetworks.length > 0
                    ? `${selectedNetworks.length} Network${
                        selectedNetworks.length > 1 ? "s" : ""
                      }`
                    : "Networks"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search networks..." />
                  <CommandList>
                    <CommandEmpty>No network found.</CommandEmpty>
                    <CommandGroup>
                      {tvNetworks.map((network) => (
                        <CommandItem
                          key={network.id}
                          value={network.name}
                          onSelect={() => {
                            toggleNetwork(network.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedNetworks.includes(network.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {network.name}
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
              onClick={() => setShowNetworks(!showNetworks)}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2 hidden lg:block" />
              Networks ({selectedNetworks.length})
            </Button>
          </div>

          {/* Clear Button */}
          {(selectedYear ||
            selectedGenres.length > 0 ||
            selectedNetworks.length > 0) && (
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
              {tvGenres.map((genre) => {
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

        {/* Networks Selection - Only show on large screens */}
        {showNetworks && (
          <div className="hidden lg:block rounded-lg mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tvNetworks.map((network) => {
                const IconComponent = network.icon;
                const id = `network-${network.id}`;
                return (
                  <div
                    key={network.id}
                    className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
                  >
                    <Checkbox
                      id={id}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby={`${id}-description`}
                      checked={selectedNetworks.includes(network.id)}
                      onCheckedChange={() => toggleNetwork(network.id)}
                    />
                    <div className="flex grow items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={id}>
                          {network.name}{" "}
                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            (Network)
                          </span>
                        </Label>
                        <p
                          id={`${id}-description`}
                          className="text-muted-foreground text-xs"
                        >
                          {network.description}
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

      {/* TV Shows Grid */}
      <div className="mx-auto mt-8">
        <div>
          {/* Active Filters */}
          {(selectedYear ||
            selectedGenres.length > 0 ||
            selectedNetworks.length > 0) && (
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
                const genre = tvGenres.find((g) => g.id === genreId);
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
              {selectedNetworks.map((networkId) => {
                const network = tvNetworks.find((n) => n.id === networkId);
                return (
                  <Badge key={networkId} variant="secondary">
                    {network?.name}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleNetwork(networkId)}
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
        ) : tvShows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No TV shows found</p>
            <p className="text-gray-400">Try different filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-2">
            {tvShows.map((show) => (
              <Link href={`/tv/${show.id}`} key={show.id} prefetch={true}>
                <MovieCard movie={show} />
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && tvShows.length > 0 && currentPage < totalPages && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              size="lg"
              className="px-8"
            >
              {loadingMore ? "Loading..." : "Load More TV Shows"}
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
