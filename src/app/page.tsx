import SwiperBackdrops from "./swiper";
import NavBar from "./navBar";
import Ten from "./ten";
import Oscar from "./oscar";
export default function Home() {
  return (
    <main>
      <NavBar />
      <SwiperBackdrops />
      <Ten />
      <Oscar/>
    </main>
  );
}
