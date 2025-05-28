"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WatchPage() {
  const { params } = useParams() as { params?: string[] };

  const mediaType = params?.[0];
  const id = params?.[1];
  const season = params?.[2];
  const episode = params?.[3];
  const [selected, setSelected] = useState("Server Gamma");
  const router = useRouter();
  console.log(episode);
  const servers = [
    {
      name: "Server Alpha",
      movieLink: `https://vidfast.pro/movie/${id}?autoPlay=true&theme=FF0000`,
      tvLink: `https://vidfast.pro/tv/${id}/${season}/${episode}?autoPlay=true&theme=FF0000`,
    },
    {
      name: "Server Beta",
      movieLink: `https://vidora.su/movie/${id}?colour=fb1533&amp;autoplay=true&amp;autonextepisode=true&amp;backbutton=&amp;pausescreen=true`,
      tvLink: `https://vidora.su/tv/${id}/${season}/${episode}?colour=fb1533&amp;autoplay=true&amp;autonextepisode=true&amp;backbutton=&amp;pausescreen=true`,
    },

    {
      name: "Server Delta",
      movieLink: `https://111movies.com/movie/${id}`,
      tvLink: `https://111movies.com/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server Gamma",
      movieLink: `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true`,
      tvLink: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=true`,
    },
    {
      name: "Server Epsilon",
      movieLink: `https://vidsrc.su/embed/movie/${id}`,
      tvLink: `https://vidsrc.su/embed/tv/${id}/${season}/${episode}`,
    },

    {
      name: "Server Zeta",
      movieLink: `https://vidsrc.xyz/embed/movie/${id}`,
      tvLink: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
  ];
  const current = servers.find((meow) => meow.name === selected);
  const src =
    mediaType === "movie"
      ? current?.movieLink
      : mediaType === "tv"
      ? current?.tvLink
      : "";
  console.log(src);
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed z-[999] inset-0 w-full flex flex-col bg-black overflow-auto meow"
    >
      <div className="relative flex-1 min-h-[90vh]">
        <div
          onClick={() => {
            router.back();
          }}
          className="absolute z-10 top-10 text-white transform  left-5 zxczxc tracking-[-1px] text-md flex items-center cursor-pointer"
        >
          <ArrowLeft strokeWidth={3} className="h-5 w-5" />
          BACK
        </div>
        <iframe
          src={src}
          title="Video Player"
          className="w-full h-full"
          allowFullScreen
          frameBorder={0}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 p-3">
        {servers.map((meow) => (
          <Button
            variant="ghost"
            onClick={() => setSelected(meow.name)}
            className={`flex-1 bg-transparent hover:bg-[unset] hover:border-white border-b-2 border-gray-500 rounded-[unset] ${
              meow.name === selected
                ? "border-blue-800 hover:border-blue-900"
                : ""
            }`}
            key={meow.name}
          >
            {meow.name}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
