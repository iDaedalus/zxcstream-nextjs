// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import GetMovieData from "@/lib/getMovieData";
// import { Info, Play, Star } from "lucide-react";

// export default function Featured({
//   id,
//   media_type,
// }: {
//   id: string;
//   media_type: string;
// }) {
//   const { show, loading } = GetMovieData({ id, media_type });

//   console.log(show);
//   return (
//     <div>
//       {loading ? (
//         <div className="relative lg:h-[75vh] h-[50vh] w-full flex justify-center items-center ">
//           <div className="w-9 h-9 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
//         </div>
//       ) : (
//         show && (
//           <div className="relative lg:h-[75vh] h-[50vh] w-full flex justify-center ">
//             <img
//               className=" h-full w-full object-cover object-[center_40%] mask-gradient opacity-70"
//               src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
//               alt={show.title || show.name}
//             />
//             <div className="absolute bottom-15 w-[90%] ">
//               {show.images?.logos?.find((meow) => meow.iso_639_1 === "en")
//                 ?.file_path ? (
//                 <img
//                   className="aspect-[16/5] w-[28%] object-contain drop-shadow-xs drop-shadow-black/50 "
//                   src={`https://image.tmdb.org/t/p/original/${
//                     show.images?.logos?.find((meow) => meow.iso_639_1 === "en")
//                       ?.file_path
//                   }`}
//                   alt="Lazy loaded"
//                 />
//               ) : (
//                 <h1 className="zxczxc text-4xl mb-5 tracking-[-3px]">
//                   {show.title || show.name}
//                 </h1>
//               )}
//               <div className="flex items-center gap-3 mt-3 text-white/80 text-sm">
//                 <p>
//                   {(show.release_date || show.first_air_date)?.split("-")[0]}
//                 </p>
//                 &bull;
//                 <p className="flex items-center gap-1">
//                   <Star className="text-yellow-500 h-4 w-4" />
//                   {show.vote_average?.toFixed(1)}/10
//                 </p>
//                 &bull;
//                 <p>
//                   {media_type === "movie"
//                     ? show.release_dates?.results?.find(
//                         (r) => r.iso_3166_1 === "US"
//                       )?.release_dates?.[0]?.certification || "NR"
//                     : show.content_ratings?.results?.find(
//                         (r) => r.iso_3166_1 === "US"
//                       )?.rating || "NR"}
//                 </p>
//               </div>

//               <p className="w-1/2 text-lg line-clamp-4 mt-3">{show.overview}</p>

//               <div className="space-x-3 mt-5">
//                 <Button size="lg">
//                   <Play />
//                   Play Now
//                 </Button>
//                 <Button variant="outline" size="lg">
//                   <Info />
//                   More Info
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// }
