import { useEffect, useState } from "react";

type TMDBImage = {
  iso_639_1: string | null;
  file_path: string;
};
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function TmdbImages({
  id,
  mediaType,
}: {
  id: string;
  mediaType: string;
}) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${apiKey}`
      );
      const data = await res.json();
      const englishLogo = data.logos.find(
        (i: TMDBImage) => i.iso_639_1 === "en"
      );
      const imageUrl = englishLogo
        ? `https://image.tmdb.org/t/p/w500/${englishLogo.file_path}`
        : null;

      setImage(imageUrl);
    }
    fetchImage();
  }, []);

  return image ? <img src={image} alt="TMDB Logo" /> : null;
}
