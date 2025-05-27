import { useEffect, useState } from "react";

interface PartsType {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
}

interface CollectionType {
  id: string;
  name: string;
  parts: PartsType[];
}

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function useCollection(id?: string) {
  const [collection, setCollection] = useState<CollectionType | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=en-US`
        );
        if (!res.ok) throw new Error("Failed to fetch collection");
        const data = await res.json();
        setCollection(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchCollection();
    }
  }, [id]);

  return collection;
}
