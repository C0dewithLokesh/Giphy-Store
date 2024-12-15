import Splash from "@/src/components/screens/splash/Splash";
import "@/src/styles/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useColorScheme as useColorSchemeRN } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

type theme = "light" | "dark";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { setColorScheme } = useColorScheme();
  const colorScheme = useColorSchemeRN();
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) || "light";
      if (savedTheme) {
        setColorScheme(savedTheme as theme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 1500);
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {isShowSplashScreen ? (
          <Splash />
        ) : (
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="gif/[id]"
              options={{
                headerStyle: {
                  backgroundColor:
                    colorScheme === "dark" ? "#111827" : "#f3f4f6",
                },
              }}
            />
          </Stack>
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
