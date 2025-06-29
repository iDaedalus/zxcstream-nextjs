import SwiperBackdrops from "./swiper";

import Ten from "./ten";
import ClassicMovies from "./classic";
import GenreMovies from "./genre";
import RecentlyWatched from "./recently";
import RuntimeMovies from "./hidden-gems";
export default function Home() {
  return (
    <main>
      <SwiperBackdrops />
      <div className="lg:space-y-20 space-y-10">
        <RecentlyWatched />
        <Ten />
        <ClassicMovies />
        <GenreMovies />
        <RuntimeMovies />
      </div>
    </main>
  );
}
