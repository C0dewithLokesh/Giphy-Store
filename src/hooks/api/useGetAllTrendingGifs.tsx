import { getTrendingGifs } from "@/src/api/getAllTrendingGifs";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllTrendingGifs = () => {
  return useInfiniteQuery({
    queryKey: ["trendingGifs"],
    queryFn: getTrendingGifs,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return nextOffset < lastPage.pagination.total_count
        ? nextOffset
        : undefined;
    },
    initialPageParam: 0,
  });
};
