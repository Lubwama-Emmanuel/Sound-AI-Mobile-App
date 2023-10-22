import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";

import Home from "./screens/Home";
import { colors } from "./constants/Global";
import Recordings from "./screens/Recordings";
import IconButton from "./ui/IconButton";
import { init } from "./utils/database";

// REASON FOR THE APK NOT LOADING
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isCheckingLoading, setIsCheckingLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      // await init();

      setIsCheckingLoading(false);

      SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (isCheckingLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      {/* <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary800,
            },
            headerTintColor: colors.primary50,
            contentStyle: {
              backgroundColor: colors.primary300,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
        </Stack.Navigator> */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.primary800,
            tabBarInactiveTintColor: colors.primary50,
            headerStyle: {
              backgroundColor: colors.primary500,
            },
            headerTintColor: colors.primary800,
            tabBarStyle: {
              backgroundColor: colors.primary500,
            },
          }}
          sceneContainerStyle={{
            backgroundColor: colors.primary50,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Recorder",
              tabBarIcon: ({ color }) => (
                <IconButton name="mic" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Recordings"
            component={Recordings}
            options={{
              title: "Saved Recordings",
              tabBarIcon: ({ color }) => (
                <IconButton name="list" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
