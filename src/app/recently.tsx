"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  Star,
  Tally1,
  Tally2,
  Tally3,
  Tally4,
  Tally5,
} from "lucide-react";
import { localWatchlist } from "./@modal/(.)watch/[...params]/page";
import ReusableBackdropSwiper from "./reusableBackdropSwiper";
export default function RecentlyWatched() {
  const [movies, setMovies] = useState<localWatchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [decade, setDecade] = useState<string>("Alpha");
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const decadeOptions = [
    { label: "Alpha", value: "Alpha", icon: <Tally1 /> },
    { label: "Beta", value: "Beta", icon: <Tally2 /> },
    { label: "Delta", value: "Delta", icon: <Tally3 /> },
    { label: "Gamma", value: "Gamma", icon: <Tally4 /> },
    { label: "Epsilon", value: "Epsilon", icon: <Tally5 /> },
  ];

  useEffect(() => {
    try {
      setLoading(true);
      const data = JSON.parse(localStorage.getItem("recentlyWatch") || "[]");
      console.log(data);
      const filtered = data
        .slice(0, 11)
        .filter(
          (server: localWatchlist) =>
            server.serverName === decade && !server.isComplete
        );

      setMovies(filtered);
    } catch (error) {
      console.warn("Invalid watchHistory data:", error);
    } finally {
      setLoading(false);
    }
  }, [decade, apiKey]);
  return (
    <ReusableBackdropSwiper
      title="Continue Watching on"
      data={movies}
      loading={loading}
      media={decade}
      setMedia={setDecade}
      mediaOptions={decadeOptions}
      numbering={false}
    />
  );
}
