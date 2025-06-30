"use client";

import { useState, useEffect } from "react";
import { Tally1, Tally2, Tally3, Tally4, Tally5 } from "lucide-react";
import type { SaveProgressType } from "./@modal/(.)watch/save-progress";
import ReusableBackdropSwiper from "./reusableBackdropSwiper";

const allServers = [
  { label: "Server 1", value: "Server 1", icon: <Tally1 /> },
  { label: "Server 2", value: "Server 2", icon: <Tally2 /> },
  { label: "Server 3", value: "Server 3", icon: <Tally3 /> },
  { label: "Server 4", value: "Server 4", icon: <Tally4 /> },
  { label: "Server 5", value: "Server 5", icon: <Tally5 /> },
];

export default function RecentlyWatched() {
  const [recentData, setRecentData] = useState<SaveProgressType[]>([]);
  const [decade, setDecade] = useState("Alpha");
  const [loading, setLoading] = useState(true);

  const loadRecentData = () => {
    setLoading(true);
    try {
      const raw = JSON.parse(localStorage.getItem("recentlyWatch") || "[]");
      setRecentData(raw);
    } catch {
      setRecentData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentData();

    // Listen for custom storage events
    const handleStorageChange = () => {
      loadRecentData();
    };

    window.addEventListener("storage-update", handleStorageChange);

    return () => {
      window.removeEventListener("storage-update", handleStorageChange);
    };
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
