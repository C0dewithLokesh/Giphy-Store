import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Header({
  searchText,
  setSearchText,
  debouncedSearch,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearch: () => void;
}) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const handleThemeChange = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem(
      "theme",
      colorScheme === "dark" ? "light" : "dark"
    );
  };

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    debouncedSearch();
  };

  return (
    <View className="dark:bg-[#111827] bg-[#f3f4f6] w-full p-4 gap-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-3xl text-[#9333ea] font-bold">Giphy Store</Text>
        <TouchableOpacity
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          onPress={handleThemeChange}
        >
          {isDarkMode ? (
            <Feather name="sun" size={20} color="#e5e7eb" />
          ) : (
            <Feather name="moon" size={20} color="#1f2937" />
          )}
        </TouchableOpacity>
      </View>

      <View className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-4 flex-row items-center gap-2">
        <Feather name="search" size={24} color="#9ca3af" />
        <TextInput
          value={searchText}
          placeholder="Search Gifs..."
          className="w-full bg-transparent focus:outline-none dark:text-gray-100 text-base placeholder:text-gray-500"
          onChangeText={handleOnChangeText}
        />
      </View>
    </View>
  );
}
