"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronsUpDown, Film, Tv } from "lucide-react";
import { Spotlight, SpotLightItem } from "@/components/ui/main-spotlight";
import SpotlightBorderWrapper from "@/components/border";
import NavBar from "../app/navBar";
import { useRouter } from "next/navigation";
import useSearch from "@/lib/useSearch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MovieCard } from "../app/card";

export default function Dash() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("movie");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [timeWord, settimeWord] = useState("");
  const { result, loading } = useSearch({ query, value, page });
  const router = useRouter();
  console.log(result);
  useEffect(() => {
    const hours = new Date().getHours();
    const sleep = hours >= 18 ? "tonight" : "today";
    settimeWord(sleep);
  }, []);

  return (
    <div className="bg-[var(--custom-bg)] ">
      <div className="absolute overflow-hidden z-10 w-full h-screen">
        <div className="relative top-20 isolate z-0 flex w-full  items-start justify-center lg:scale-100 scale-60 ">
          {/* Optional Blur Layer */}
          <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

          {/* Main glow */}
          <div className="absolute inset-auto z-50 h-40 w-[28rem] -translate-y-[-30%] rounded-full bg-blue-500/60 opacity-80 blur-3xl " />

          {/* Lamp effect pulse */}
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            transition={{ ease: "easeInOut", delay: 0.8, duration: 1.2 }}
            className="absolute top-10 z-30 h-36 -translate-y-[20%] rounded-full bg-blue-500/60 blur-2xl "
          />

          {/* Top line */}
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            transition={{ ease: "easeInOut", delay: 0.8, duration: 1.2 }}
            className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-blue-500/60 "
          />

          {/* Left conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(from 80deg at center top, rgba(37, 99, 235, 0.6), transparent, transparent)",
            }}
            className="absolute inset-auto right-1/2 h-56 w-[30rem]"
          >
            <div className="absolute w-full left-0 bg-[var(--custom-bg)] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-full left-0 bg-[var(--custom-bg)] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            style={{
              backgroundImage:
                "conic-gradient(from 280deg at center top, transparent, transparent, rgba(37, 99, 235, 0.6)) ",
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem]"
          >
            <div className="absolute w-40 h-full right-0 bg-[var(--custom-bg)] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-[var(--custom-bg)] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
        </div>
      </div>
      <main className="min-h-screen w-full bg-gradient-to-b from-[var(--custom-bg)] to-blue-500/10">
        <NavBar />

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", delay: 0.8, duration: 1 }}
          className="relative z-10 text-center px-4 flex flex-col justify-end  w-full lg:w-1/2 space-y-5 mx-auto h-[53vh]"
        >
          <div className="text-foreground mt-4 font-bold text-base lg:text-5xl zxc">
            <span>
              {" "}
              Dive into endless hours of free streaming{" "}
              <span className="hidden lg:inline">with</span>
            </span>
            <span className="lg:text-5xl text-[2.6rem] zxczxc ml-2 tracking-[-5px] lg:tracking-[-8px]">
              ZXC
              <motion.span
                className="bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text font-bold text-blue-800/70 pr-2 drop-shadow-md text-shadow"
                initial={{ backgroundPosition: "200% 0" }}
                animate={{ backgroundPosition: "-200% 0" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear",
                }}
              >
                [STREAM]
              </motion.span>
            </span>
            <p className="text-right mr-8 text-xs lg:text-base line-through">
              subscription
            </p>
          </div>

          <div className="relative mt-8 flex gap-4 justify-center items-center">
            <Search size={20} className="absolute left-3 text-foreground/50" />
            <SpotlightBorderWrapper className="w-full">
              <Input
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className=" text-foreground text-xs lg:text-[0.9rem] lg:pr-30 "
                placeholder={`What are you watching ${timeWord} ..`}
                type="search"
              />
            </SpotlightBorderWrapper>
            <div className="absolute right-[1px]">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" role="combobox" aria-expanded={open}>
                    {value === "movie" ? (
                      <>
                        <Film />
                        Movie
                      </>
                    ) : (
                      <>
                        <Tv />
                        TV Show
                      </>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[120px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setValue("movie");
                            setOpen(false);
                          }}
                          className="p-0"
                        >
                          <span
                            className={` ${
                              value === "movie" ? "bg-blue-800" : ""
                            } flex items-center gap-2  w-full px-2 py-1 rounded-sm font-semibold`}
                          >
                            <Film /> Movie
                          </span>
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setValue("tv");
                            setOpen(false);
                          }}
                          className="p-0"
                        >
                          <span
                            className={` ${
                              value === "tv" ? "bg-blue-800" : ""
                            } flex items-center gap-2  w-full px-2 py-1 rounded-sm
                              font-semibold`}
                          >
                            <Tv /> TV Show
                          </span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </motion.div>

        <div className="w-full lg:w-3/4 mt-15 px-4 lg:px-0 mx-auto">
          <AnimatePresence mode="wait">
            {query.trim() !== "" && (
              <motion.div
                key="search-info"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="text-gray-300 text-xs lg:text-base flex items-center justify-between py-5"
              >
                <h2>
                  Search results for:{" "}
                  <span className="font-semibold text-blue-800">{query}</span>
                </h2>
                <div>
                  <span className="font-semibold text-blue-800">
                    {value === "movie" ? (
                      <div className="flex items-center gap-1">
                        <Film size={20} /> Movie
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Tv size={20} /> TV Show
                      </div>
                    )}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {loading && query.trim() !== "" ? (
            <div className="w-9 h-9 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto mt-15"></div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="results-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {result.length === 0 && query.trim() !== "" ? (
                  <motion.p
                    key="no-results"
                    className="text-white h-20 flex items-center justify-center text-xs lg:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    NO RESULTS FOUND
                  </motion.p>
                ) : (
                  <Spotlight>
                    <div className="grid lg:grid-cols-6 grid-cols-3 gap-2">
                      {result.map((meow) => (
                        <SpotLightItem key={meow.id}>
                          <div
                            onClick={() => router.push(`/${value}/${meow.id}`)}
                            className=" z-10 w-full h-full   bg-black"
                          >
                            <MovieCard movie={meow} />
                          </div>
                        </SpotLightItem>
                      ))}
                    </div>
                  </Spotlight>
                )}

                {query.trim() !== "" && result.length !== 0 && (
                  <Pagination className="text-white mt-10 mb-10">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                          }
                        />
                      </PaginationItem>
                      {page > 1 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setPage(page - 1)}>
                            {page - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink isActive className="text-black">
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink onClick={() => setPage(page + 1)}>
                          {page + 1}
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage((prev) => prev + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
