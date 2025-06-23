"use client";
import { ArrowLeft, Server } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function WatchPage() {
  const { params } = useParams() as { params?: string[] };

  const mediaType = params?.[0];
  const id = params?.[1];
  const season = params?.[2];
  const episode = params?.[3];
  const [selected, setSelected] = useState("Server Alpha");
  const [sandboxEnabled, setSandboxEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const servers = [
    {
      name: "Server Alpha",

      sublabel: "No Ads",
      description: "Fast and clean experience, but limited to movies only.",
      movieLink: `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=true`,
      tvLink: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=true`,
    },
    {
      name: "Server Beta",
      sublabel: "Sandbox required",
      description:
        "Extensive movie collection with fast streaming, but contains ads.",
      movieLink: `https://vidsrc.xyz/embed/movie/${id}`,
      tvLink: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
    {
      name: "Server Delta",
      sublabel: "Sandbox required",
      description: "Reliable streaming with autoplay and next episode support.",
      movieLink: `https://vidora.su/movie/${id}?colour=fb1533&autoplay=true&autonextepisode=true&backbutton=&pausescreen=true`,
      tvLink: `https://vidora.su/tv/${id}/${season}/${episode}?colour=fb1533&autoplay=true&autonextepisode=true&backbutton=&pausescreen=true`,
    },
    {
      name: "Server Gamma",
      sublabel: "Sandbox required",
      description: "Smooth playback with autoplay enabled by default.",
      movieLink: `https://vidsrc.su/embed/movie/${id}`,
      tvLink: `https://vidsrc.su/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server Epsilon",
      sublabel: "Sandbox required",
      description: "Stylized player with autoplay and customizable theme.",
      movieLink: `https://vidfast.pro/movie/${id}?autoPlay=true&theme=FF0000`,
      tvLink: `https://vidfast.pro/tv/${id}/${season}/${episode}?autoPlay=true&theme=FF0000`,
    },
  ];

  const current = servers.find((server) => server.name === selected);
  const src =
    mediaType === "movie"
      ? current?.movieLink
      : mediaType === "tv"
      ? current?.tvLink
      : "";

  // Set loading to true when server changes or sandbox setting changes
  useEffect(() => {
    setIsLoading(true);
  }, [selected, sandboxEnabled]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleServerChange = (serverName: string) => {
    setSelected(serverName);
    setIsLoading(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed z-[999] inset-0 w-full h-screen overflow-auto flex flex-col bg-background"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div
          onClick={() => {
            router.back();
          }}
          className="text-white tracking-[-1px] text-md flex items-center cursor-pointer hover:text-gray-300 transition-colors zxczxc"
        >
          <ArrowLeft strokeWidth={3} className="h-5 w-5 mr-2 c" />
          BACK
        </div>

        <div className="flex gap-3 items-center text-white">
          <p className="text-sm">Sandbox</p>
          <Switch
            checked={sandboxEnabled}
            onCheckedChange={setSandboxEnabled}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[50vh] h-screen w-full flex overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-9 h-9 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-white text-sm">Loading video...</p>
              </div>
            </div>
          )}

          <iframe
            key={`${src}-${sandboxEnabled}`} // Force refresh when sandbox changes
            src={src}
            title="Video Player"
            className="w-full h-full"
            allowFullScreen
            frameBorder={0}
            onLoad={handleIframeLoad}
            {...(sandboxEnabled && {
              sandbox: "allow-scripts allow-same-origin allow-forms",
            })}
          />
        </div>
      </div>

      <div className="border-t border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {servers.map((server) => (
            <div
              className={`border-input relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none cursor-pointer transition-colors  ${
                server.name === selected
                  ? "!border-blue-500 text-blue-400"
                  : "hover:border-gray-400 text-white"
              }`}
              onClick={() => handleServerChange(server.name)}
              key={server.name}
            >
              <div className="flex grow items-center gap-3">
                <Server className="h-5 w-5 flex-shrink-0" />
                <div className="grid gap-2 ">
                  <Label
                    htmlFor={server.name}
                    className="cursor-pointer truncate"
                  >
                    {server.name}{" "}
                    <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                      ({server.sublabel})
                    </span>
                  </Label>
                  <p
                    id={`${server.name}-description`}
                    className="text-muted-foreground text-xs "
                  >
                    {server.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
