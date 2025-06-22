import SwiperBackdrops from "./swiper";

import NavBar from "./navBar";
import Ten from "./ten";
import ClassicMovies from "./classic";
import GenreMovies from "./genre";
import RuntimeMovies from "./hidden-gems";
import Footer from "./footer";
export default function Home() {
  return (
    <main>
      <NavBar />
      <SwiperBackdrops />
      <Ten />
      <ClassicMovies />
      <GenreMovies />
      <RuntimeMovies />
      <Footer />
    </main>
  );
}
