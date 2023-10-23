import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import { colors } from "./constants/Global";
import Recordings from "./screens/Recordings";
import IconButton from "./ui/IconButton";
import { init } from "./utils/database";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }

      SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
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
