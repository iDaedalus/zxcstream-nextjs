import SwiperBackdrops from "./swiper";


import Ten from "./ten";
import ClassicMovies from "./classic";
import GenreMovies from "./genre";
import RuntimeMovies from "./hidden-gems";
export default function Home() {
  return (
    <main>
      <SwiperBackdrops />
      <div className="lg:space-y-20 space-y-10">
        <Ten />
        <ClassicMovies />
        <GenreMovies />
        <RuntimeMovies />
       
      </div>
    </main>
  );
}
