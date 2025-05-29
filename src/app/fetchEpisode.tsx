import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface MovieType {
  id: number;
  title?: string;
  tagline: string;
  name?: string;
  vote_average: number;
  poster_path: string;
  still_path: string;
  overview: string;
  media_type: string;
  runtime: string;
  episode_number: string;
}

interface EpisodeListProps {
  id: string;
  season: string;
}

export default function EpisodeList({ id, season }: EpisodeListProps) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [episode, setEpisode] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function episodeFetch() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}&language=en-US`
        );
        const data = await res.json();
        setEpisode(data.episodes || []);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
        setEpisode([]);
      }
      setLoading(false);
    }
    if (id && season) episodeFetch();
  }, [id, season, apiKey]);

  return (
    <div className="grid grid-cols-3 gap-2 py-8">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <Skeleton className="aspect" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))
        : episode.map((meow) => (
            <div key={meow.id}>
              <div className="relative aspect rounded-md overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={
                    meow.still_path
                      ? `https://image.tmdb.org/t/p/w500${meow.still_path}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s"
                  }
                  alt={meow.name}
                />
                <Badge className="absolute bottom-2 right-1 bg-blue-800 text-foreground">
                  <Timer /> {meow.runtime}m
                </Badge>
              </div>
              <h1 className="py-1 line-clamp-1 w-full">
                E{meow.episode_number}. {meow.name}
              </h1>
              {/* <p className="text-muted-foreground text-sm line-clamp-3">
                {meow.overview}
              </p> */}
            </div>
          ))}
    </div>
  );
}
