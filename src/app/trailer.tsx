"use client";
import { useState, useEffect } from "react";
interface Video {
  type: string;
  site: string;
  key: string;
}
export default function Trailer({
  id,
  mediaType,
  type = "default",
}: {
  id: string;
  mediaType: string;
  type: string;
}) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setVideoKey(trailer.key);
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    }
    fetchTrailer();
  }, [id, mediaType, apiKey]);

  return (
    <iframe
      width="100%"
      height={type === "default" ? "100%" : "140%"}
      className="fade-in transition-opacity duration-300 opacity-100"
      src={
        videoKey
          ? `https://www.youtube.com/embed/${videoKey}?autoplay=1&loop=1&playlist=${videoKey}`
          : `https://www.youtube.com/embed/xvFZjo5PgG0`
      }
      title="Trailer"
      allow="autoplay; encrypted-media"
      allowFullScreen
      key={videoKey}
    ></iframe>
  );
}
