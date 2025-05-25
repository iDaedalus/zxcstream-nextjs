"use client";
import { useState, useEffect } from "react";

export default function Trailer({
  id,
  mediaType,
}: {
  id: number;
  mediaType: string;
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
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    }
    fetchTrailer();
  }, [id, mediaType, apiKey]);

  return (
    <iframe
      width="100%"
      height="100%"
      src={
        videoKey
          ? `https://www.youtube.com/embed/${videoKey}?autoplay=1&loop=1&playlist=${videoKey}`
          : `https://www.youtube.com/embed/xvFZjo5PgG0`
      }
      title="Trailer"
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
}
