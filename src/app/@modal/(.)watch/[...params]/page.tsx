"use client";

import { useParams } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import GetMovieData from "@/lib/getMovieData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Power, TriangleAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getServers } from "./servers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface localWatchlist {
  id: string;
  media_type: string;
  backdrop: string;
  serverName: string;
  title: string;
  releaseDate: number;
  duration: number;
  currentTime: number;
  isComplete: boolean;
  season: number;
  episode: number;
}

export default function WatchPage() {
  const router = useRouter();
  const { params } = useParams() as { params?: string[] };
  const media_type = params?.[0];
  const id = params?.[1];
  const season = params?.[2];
  const episode = params?.[3];
  const [openDialog, setOpenDialog] = useState(true);
  const [selected, setSelected] = useState("Server 1");
  const [sandboxEnabled, setSandboxEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const servers = useMemo(
    () => getServers(id || "", season, episode),
    [id, season, episode]
  );
  const { show } = GetMovieData({ id: id || "", media_type: media_type || "" });
  console.log(open);
  useEffect(() => {
    if (
      !id ||
      !media_type ||
      (!show?.title && !show?.name) ||
      currentTime === 0 ||
      duration === 0
    )
      return;

    const backdrop = show?.images?.backdrops?.find(
      (meow) => meow.iso_639_1 === "en"
    )?.file_path;
    const releaseDate = show?.first_air_date || show?.release_date;
    const title = show?.title || show?.name || "N/A";
    const watchingData = {
      id,
      media_type,
      backdrop,
      serverName: selected,
      releaseDate,
      title,
      duration,
      currentTime,
      isComplete,
      season: season || null,
      episode: episode || null,
    };

    const insertLocal = JSON.parse(
      localStorage.getItem("recentlyWatch") || "[]"
    );

    const filteredId = insertLocal.filter(
      (item: localWatchlist) => item.id !== id
    );

    const combineUpdate = [watchingData, ...filteredId];

    localStorage.setItem("recentlyWatch", JSON.stringify(combineUpdate));
  }, [
    currentTime,
    isComplete,
    id,
    media_type,
    show,
    selected,
    season,
    episode,
    duration,
  ]);

  useEffect(() => {
    if (selected !== "Server 1" && selected !== "Server 3") return;

    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = ["https://vidsrc.cc", "https://vidlink.pro"];
      if (!allowedOrigins.includes(event.origin)) return;

      const { data } = event;
      if (data?.type !== "PLAYER_EVENT") return;

      const { event: eventType, currentTime, duration } = data.data;

      // Update states
      if (["play", "pause", "seeked", "timeupdate"].includes(eventType)) {
        setCurrentTime(currentTime);
        setDuration(duration);
      }

      if (eventType === "ended") {
        setIsComplete(true);
      }

      console.log(`Player ${eventType} at ${currentTime}s / ${duration}s`);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [selected]);
  useEffect(() => {
    setIsLoading(true);
  }, [selected, sandboxEnabled]);
  if (!id || !media_type) {
    return <div>Error: Missing media ID or type.</div>;
  }

  const current = servers.find((server) => server.name === selected);

  const src =
    media_type === "movie"
      ? current?.movieLink
      : media_type === "tv"
      ? current?.tvLink
      : "";
  if (!openDialog) {
    router.back();
  }
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="h-full w-full min-w-full p-0"
          showCloseButton={false}
        >
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="  w-full h-full overflow-auto flex flex-col bg-background"
          >
            <div className="relative flex-1">
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                    <p className="text-white text-sm">Loading video...</p>
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                className="absolute z-40 top-3 right-3"
                onClick={() => setOpen(true)}
              >
                Switch Server <ArrowUpDown />
              </Button>

              {src && (
                <iframe
                  key={`${src}-${sandboxEnabled}`}
                  src={src}
                  onLoad={() => setIsLoading(false)}
                  title="Video Player"
                  className="h-full w-full"
                  allowFullScreen
                  frameBorder={0}
                  {...(sandboxEnabled && {
                    sandbox: "allow-scripts allow-same-origin allow-forms",
                  })}
                />
              )}

              <span
                className="absolute transform translate-y-[70%] top-[70%] translate-x-[50%] right-[50%] bg-black/50 p-4 rounded-full z-20 cursor-pointer"
                onClick={() => router.back()}
              >
                <Power strokeWidth={3} />
              </span>
            </div>

            <div className="w-full flex justify-between items-center px-2 py-3 text-xs bg-black bord truncate gap-5">
              <p className="flex-1 text-left">Server {selected}</p>

              <p className="flex-1 text-center">
                {sandboxEnabled ? "Sandbox Enabled" : "Sandbox Disabled"}
              </p>
              {/* {currentTime ? <>1313</> : <>1212</>} */}
              {media_type === "movie" ? (
                <p className="flex-1 text-right">Movie</p>
              ) : (
                <div className="flex items-center gap-3 flex-1 text-right">
                  <p>TV Show</p>
                  <p>
                    S{season}E{episode}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <div className="w-full p-4 flex justify-between items-start gap-3">
            <span>
              <p>
                Sandbox{" "}
                <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                  (Adblocker)
                </span>
              </p>
              <p className="text-muted-foreground text-xs">
                Some server do not support by sandbox, you must turn it off
                before they work
              </p>
            </span>
            <div className="inline-flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
              <Switch
                id="sandbox"
                checked={sandboxEnabled}
                onCheckedChange={setSandboxEnabled}
              />
              <Label htmlFor="sandbox" className="sr-only">
                Colored switch
              </Label>
            </div>
          </div>

          <div className="p-4 grid lg:grid-cols-2 grid-cols-1 gap-2 overflow-auto">
            <div className="lg:col-span-2 col-span-1">Select Servers</div>
            {servers.map((server) => (
              <div
                key={server.name}
                onClick={() => {
                  {
                    setSelected(server.name);
                    setIsLoading(true);
                    setOpen(false);
                  }
                }}
                className={`border-input relative flex items-center gap-2 rounded-md border p-4 shadow-xs outline-none cursor-pointer ${
                  server.name === selected
                    ? "!border-blue-500 text-blue-400"
                    : "hover:border-gray-400 text-white"
                }`}
              >
                <div className="flex grow items-start gap-3">
                  <svg
                    className="shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="16" fill="#090A15" />
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M8.004 19.728a.996.996 0 0 1-.008-1.054l7.478-12.199a.996.996 0 0 1 1.753.104l6.832 14.82a.996.996 0 0 1-.618 1.37l-10.627 3.189a.996.996 0 0 1-1.128-.42l-3.682-5.81Zm8.333-9.686a.373.373 0 0 1 .709-.074l4.712 10.904a.374.374 0 0 1-.236.506L14.18 23.57a.373.373 0 0 1-.473-.431l2.63-13.097Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="grid grow gap-2">
                    <Label>
                      {server.name}
                      <span className=" text-xs leading-[inherit] font-normal text-green-500">
                        {server.isRecommended ? "(Recommended)" : ""}
                      </span>
                    </Label>
                    <p className="text-muted-foreground text-xs">
                      {server.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
