import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useEpisode from "@/lib/fetch-episodes";
import { useRouter } from "next/navigation";

export default function EpisodeMetaData({
  id,
  season,
}: {
  id: string;
  season: string;
}) {
  const { episode, loading } = useEpisode({ id, season });
  console.log(episode);
  const router = useRouter();
  return (
    <div className="flex flex-col py-5 gap-5">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <Skeleton className="aspect" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))
        : episode
            .filter((f) => f.still_path !== null)
            .map((meow) => (
              <div
                key={meow.id}
                onClick={() =>
                  router.push(
                    `/watch/tv/${id}/${season}/${meow.episode_number}`
                  )
                }
                className="border-2 p-3 rounded-sm flex gap-3 cursor-pointer"
              >
                <div className="relative w-[35%] flex justify-center items-center">
                  <Badge className="absolute rounded-xs bottom-2 right-2 bg-blue-800/50 border border-blue-800 text-foreground">
                    {meow.runtime} minutes
                  </Badge>
                  <img
                    className="rounded-sm h-full w-full object-cover"
                    src={
                      meow.still_path
                        ? `https://image.tmdb.org/t/p/w500${meow.still_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&s"
                    }
                    alt={meow.name}
                  />
                </div>

                <div className="w-[65%]">
                  <div className="py-1 line-clamp-1 w-full">
                    E{meow.episode_number}. {meow.name}
                  </div>
                  <p className="line-clamp-3 text-muted-foreground">
                    {" "}
                    {meow.overview}
                  </p>
                </div>
              </div>
            ))}
    </div>
  );
}
