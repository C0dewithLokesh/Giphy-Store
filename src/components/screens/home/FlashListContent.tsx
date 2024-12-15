import { GiphyGif, GiphyResponse } from "@/src/types/trendingDatatypes";
import { InfiniteData } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { memo } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";

interface FlashListContentProps {
  data: InfiniteData<GiphyResponse, unknown> | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
}

function FlashListContent(props: FlashListContentProps) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } =
    props;
  const router = useRouter();

  const allGifs = data?.pages.flatMap((page) => page.data) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  const navigateGif = (gif: GiphyGif) => {
    router.push({
      pathname: `/gif/[id]`,
      params: {
        id: gif.id,
        data: JSON.stringify(gif),
      },
    });
  };

  return (
    <View className="flex-1 w-full pt-6 px-4">
      <FlatList
        data={allGifs}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
        }}
        columnWrapperStyle={{ gap: 16 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigateGif(item)}
            className="rounded-xl overflow-hidden self-start w-[48%] h-[150px] bg-gray-300"
          >
            <Image
              style={{ width: "100%", height: 150 }}
              contentFit="cover"
              source={{ uri: item.images.fixed_height.url }}
              transition={500}
            />
          </Pressable>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
}

export default memo(FlashListContent);
