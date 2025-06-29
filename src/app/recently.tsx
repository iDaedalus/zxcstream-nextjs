"use client";
import { useState, useEffect } from "react";
import { Tally1, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";
import { localWatchlist } from "./@modal/(.)watch/[...params]/page";
import ReusableBackdropSwiper from "./reusableBackdropSwiper";

const allServers = [
  { label: "Alpha", value: "Alpha", icon: <Tally1 /> },
  { label: "Beta", value: "Beta", icon: <Tally2 /> },
  { label: "Delta", value: "Delta", icon: <Tally3 /> },
  { label: "Gamma", value: "Gamma", icon: <Tally4 /> },
  { label: "Epsilon", value: "Epsilon", icon: <Tally5 /> },
];

export default function RecentlyWatched() {
  const [recentData, setRecentData] = useState<localWatchlist[]>([]);
  const [decade, setDecade] = useState("Alpha");
  const [loading, setLoading] = useState(true);

  // Load watch history once
  useEffect(() => {
    setLoading(true);
    try {
      const raw = JSON.parse(localStorage.getItem("recentlyWatch") || "[]");
      setRecentData(raw);
    } catch {
      setRecentData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Dynamically find servers with unfinished data
  const serversWithData = allServers.filter((server) =>
    recentData.some(
      (item) => item.serverName === server.value && !item.isComplete
    )
  );

  // Ensure selected server is valid
  useEffect(() => {
    if (
      !serversWithData.find((s) => s.value === decade) &&
      serversWithData.length > 0
    ) {
      setDecade(serversWithData[0].value);
    }
  }, [serversWithData, decade]);

  // Filter movies for selected server
  const movies = recentData
    .filter((item) => item.serverName === decade && !item.isComplete)
    .slice(0, 11);

  return (
    <ReusableBackdropSwiper
      title="Resume on"
      data={movies}
      loading={loading}
      media={decade}
      setMedia={setDecade}
      mediaOptions={serversWithData}
      numbering={false}
    />
  );
}
