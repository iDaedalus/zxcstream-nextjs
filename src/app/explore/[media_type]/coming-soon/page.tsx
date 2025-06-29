"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieType } from "@/lib/getMovieData";
import ReusableCategory from "@/app/reusableCategory";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export default function ComingSoon() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearSelected, setYearSelected] = useState<number | null>(null);

  const path = usePathname();

  const [, , media_type] = path.split("/");

  const genreParam = selectedGenres.join(",");
  const companyParam = selectedCompanies.join(",");
  const networkParam = selectedNetworks.join(",");
  const [totalPages, setTotalPages] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [genreParam, companyParam, networkParam, yearSelected]);
  useEffect(() => {
    async function fetchPopular() {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        const endpoint = `https://api.themoviedb.org/3/discover/${media_type}?api_key=${apiKey}&sort_by=primary_release_date.asc&language=en-US&page=${page}${
          genreParam ? `&with_genres=${genreParam}` : ""
        }${
          media_type === "movie"
            ? `&primary_release_date.gte=${today}`
            : `&first_air_date.gte=${today}`
        }${
          media_type === "movie"
            ? companyParam
              ? `&with_companies=${companyParam}`
              : ""
            : networkParam
            ? `&with_networks=${networkParam}`
            : ""
        }${
          media_type === "movie"
            ? yearSelected
              ? `&primary_release_year=${yearSelected}`
              : ""
            : yearSelected
            ? `&first_air_date_year=${yearSelected}`
            : ""
        }`;
        const res = await fetch(endpoint);
        const data = await res.json();
        setTotalPages(data.total_pages);
        const media = data.results.map((movie: MovieType) => ({
          ...movie,
          media_type,
        }));
        if (page === 1) {
          setMovies(media);
        } else {
          setMovies((prev) => [...prev, ...media]);
        }
      } catch (error) {
        console.error(error, "error");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }
    fetchPopular();
  }, [page, genreParam, companyParam, networkParam, yearSelected, apiKey]);
  console.log(movies);
  return (
    <ReusableCategory
      data={movies}
      loading={loading}
      totalPages={totalPages}
      loadingMore={loadingMore}
      category="Coming-Soon"
      page={page}
      setPage={setPage}
      media_type={media_type}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      selectedCompanies={selectedCompanies}
      setSelectedCompanies={setSelectedCompanies}
      selectedNetworks={selectedNetworks}
      setSelectedNetworks={setSelectedNetworks}
      yearSelected={yearSelected}
      setYearSelected={setYearSelected}
    />
  );
}
