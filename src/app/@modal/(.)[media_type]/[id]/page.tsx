"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Trailer from "@/app/trailer";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Star } from "lucide-react";

interface PageProps {
  params: Promise<{ media_type: string; id: string }>;
}
interface GenreType {
  id: number;
  name: string;
}
interface CompanyTypes {
  id: number;
  name: string;
}
interface CreatedByTypes {
  id: number;
  name: string;
}
interface LanguagesType {
  name: string;
}
interface CollectionType {
  name: string;
}
interface SeasonsType {
  id: number;
  episode_count: number;
  season_number: number;
}
interface MovieType {
  id: number;
  title?: string;
  tagline: string;
  name?: string;
  status: string;
  vote_average: number;
  belongs_to_collection: CollectionType;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type: string;
  runtime: number;
  release_date: string;
  first_air_date: string;
  number_of_seasons: string;
  number_of_episodes: string;
  genres: GenreType[];
  seasons: SeasonsType[];
  production_companies: CompanyTypes[];
  created_by: CreatedByTypes[];
  spoken_languages: LanguagesType[];
}
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function InterceptModal({ params }: PageProps) {
  const { media_type, id } = use(params);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
        );
        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log(show);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        router.back();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [open, router]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="relative aspect-[16/8] overflow-hidden flex justify-center items-center overlay">
          {/* <Trailer id={id} mediaType={media_type} type="modal" /> */}
          <img
            className="absolute h-full w-full object-cover object-[center_40%] mask-gradient backdrop"
            src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`}
            alt=""
          />
        </div>
        <DrawerHeader className="sr-only">
          <DrawerTitle>{show?.title || show?.name}</DrawerTitle>
        </DrawerHeader>
        {show && (
          <div className=" w-full px-10 py-5 flex gap-10">
            <span className="  w-[65%]">
              <div className="flex items-center gap-3">
                <span>
                  {new Date(show.release_date).getFullYear() ||
                    new Date(show.first_air_date).getFullYear()}
                </span>
                ·
                <span>
                  {show.runtime
                    ? `${Math.floor(show.runtime / 60)}h ${show.runtime % 60}m`
                    : `S${show.number_of_seasons} E${show.number_of_episodes}`}
                </span>
                ·
                <span className="flex items-center text-yellow-300 gap-1">
                  <Star className="h-4 w-4 flex items-center" />
                  {String(show.vote_average)[0]}/10
                </span>
              </div>
              <p className="mt-5">{show.overview}</p>
            </span>
            <span className=" w-[35%]">
              <span className="flex gap-2">
                <p className="text-muted-foreground">Genres:</p>
                <p>{show.genres.map((g) => g.name).join(", ")}</p>
              </span>
            </span>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
