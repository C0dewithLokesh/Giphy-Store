import { getSearchResults } from "@/src/api/getGifSearchResults";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteGifSearch = ({ searchText }: { searchText?: string }) => {
  return useInfiniteQuery({
    queryKey: ["searchGifs"],
    queryFn: ({ pageParam = 0 }) => getSearchResults({ searchText, pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return nextOffset < lastPage.pagination.total_count
        ? nextOffset
        : undefined;
    },
    initialPageParam: 0,
    enabled: !!searchText,
  });
};

export default useInfiniteGifSearch;
