import FlashListContent from "@/src/components/screens/home/FlashListContent";
import Header from "@/src/components/screens/home/Header";
import { useGetAllTrendingGifs } from "@/src/hooks/api/useGetAllTrendingGifs";
import useInfiniteGifSearch from "@/src/hooks/api/useInfiniteGifSearch";
import { debounce } from "@/src/utils/debounce";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllTrendingGifs();
  const {
    data: searchResults,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasMoreSearchResults,
    isFetchingNextPage: isFetchingMoreSearchResults,
    isLoading: isSearchLoading,
    refetch,
  } = useInfiniteGifSearch({ searchText });

  const debouncedSearch = useCallback(
    debounce(() => {
      if (searchText) {
        refetch();
      }
    }, 800),
    [searchText]
  );

  return (
    <View className="dark:bg-[#111827] bg-[#f3f4f6] flex-1 items-center">
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        debouncedSearch={debouncedSearch}
      />
      <FlashListContent
        data={searchText ? searchResults : data}
        fetchNextPage={searchText ? fetchNextSearchPage : fetchNextPage}
        hasNextPage={searchText ? hasMoreSearchResults : hasNextPage}
        isFetchingNextPage={
          searchText ? isFetchingMoreSearchResults : isFetchingNextPage
        }
        isLoading={searchText ? isSearchLoading : isLoading}
      />
    </View>
  );
}
