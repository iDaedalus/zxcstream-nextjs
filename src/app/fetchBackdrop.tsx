import { useEffect, useState } from "react";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function TmdbBackdrop({
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
      const backdrop = data.backdrops?.[0];

      const imageUrl = backdrop
        ? `https://image.tmdb.org/t/p/w1280${backdrop.file_path}`
        : null;

      setImage(imageUrl);
    }
    fetchImage();
  }, []);

  return image ? (
    <img
      className=" pointer-events-none"
      src={image}
      alt="TMDB Logo"
    />
  ) : null;
}
