"use client";

import { useCategory } from "@/lib/useCategory";
import ReusableCategory from "@/app/reusableCategory";
import { usePathname } from "next/navigation";
export default function PopularData() {
  const path = usePathname();
  const [, , media_type, category] = path.split("/");

  const {
    movies,
    loading,
    loadingMore,
    totalPages,
    page,
    setPage,
    selectedGenres,
    setSelectedGenres,
    selectedCompanies,
    setSelectedCompanies,
    selectedNetworks,
    setSelectedNetworks,
    keywordId,
    setKeywordId,
    selectedRegion,
    setSelectedRegion,
    fromYear,
    setFromYear,
    toYear,
    setToYear,
    voteMin,
    setVoteMin,
    voteMax,
    setVoteMax,
  } = useCategory({ media_type, category });

  return (
    <ReusableCategory
      movies={movies}
      category={category}
      media_type={media_type}
      loading={loading}
      loadingMore={loadingMore}
      totalPages={totalPages}
      page={page}
      setPage={setPage}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
      selectedCompanies={selectedCompanies}
      setSelectedCompanies={setSelectedCompanies}
      selectedNetworks={selectedNetworks}
      setSelectedNetworks={setSelectedNetworks}
      keywordId={keywordId}
      setKeywordId={setKeywordId}
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      fromYear={fromYear}
      setFromYear={setFromYear}
      toYear={toYear}
      setToYear={setToYear}
      voteMin={voteMin}
      setVoteMin={setVoteMin}
      voteMax={voteMax}
      setVoteMax={setVoteMax}
    />
  );
}
