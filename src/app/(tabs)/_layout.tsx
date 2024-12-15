import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function tabLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView className="w-full h-full">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 50,
            left: "27%",
            right: "28%",
            width: "45%",
            alignSelf: "center",
            backgroundColor: isDarkMode ? "#111827" : "#f3f4f6",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          },
          tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Feather size={24} name="home" color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Feather name="user" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
