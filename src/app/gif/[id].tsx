import { GiphyGif } from "@/src/types/trendingDatatypes";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { shareAsync } from "expo-sharing";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Gif() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [isShareLoading, setIsShareLoading] = useState(false);
  const params = useLocalSearchParams();
  const gif: GiphyGif = JSON.parse(params.data as string);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Gif Details",
    });
  }, [navigation]);

  const downloadGif = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const result = await FileSystem.downloadAsync(
          gif.images.original.url,
          FileSystem.documentDirectory + gif.id + ".gif"
        );

        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          gif.id + ".gif",
          "image/gif"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("Download", "Gif Downloaded Successfully");
          })
          .catch((e) => console.log(e));
      }
    } else {
      shareGif();
    }
  };

  const shareGif = async () => {
    setIsShareLoading(true);
    const result = await FileSystem.downloadAsync(
      gif.images.original.url,
      FileSystem.documentDirectory + gif.id + ".gif"
    );
    shareAsync(result.uri);
    setIsShareLoading(false);
  };

  return (
    <View className="dark:bg-[#111827] bg-[#f3f4f6] flex-1 items-center pt-8 px-4">
      <Pressable
        className="w-full rounded-2xl items-center bg-white dark:bg-gray-700 self-start"
        onPress={() => setIsPlaying(!isPlaying)}
      >
        <Image
          style={{ width: "100%", height: 300, borderRadius: 8 }}
          source={{
            uri: isPlaying
              ? gif.images.fixed_height.url
              : gif.images.fixed_height_still.url,
          }}
        />
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          className="absolute justify-center items-start bottom-4 right-4 bg-black/50 p-2 rounded-full"
        >
          <Feather
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Pressable>

      <View className="mt-8 dark:bg-gray-700 bg-white p-3 w-full rounded-lg">
        <Text className="dark:text-white text-xl font-semibold">
          {gif.title}
        </Text>
      </View>

      <View className="flex-row items-center mt-8 gap-4">
        <TouchableOpacity
          onPress={downloadGif}
          className="grow dark:bg-gray-700 bg-white p-3 rounded-lg flex-row gap-4 items-center"
        >
          <Entypo
            name="download"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text className="text-xl dark:text-white font-semibold">
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isShareLoading}
          onPress={shareGif}
          className="grow dark:bg-gray-700 bg-white p-3 rounded-lg flex flex-row gap-4 items-center"
        >
          {isShareLoading ? (
            <ActivityIndicator size={30} />
          ) : (
            <AntDesign
              name="sharealt"
              size={24}
              color={isDarkMode ? "white" : "black"}
            />
          )}
          <Text className="text-xl dark:text-white font-semibold">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
