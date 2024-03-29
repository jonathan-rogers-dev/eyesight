import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {View} from "react-native"

import LandingScreen from './screens/LandingScreen';
import ModeSelectScreen from './screens/ModeSelectScreen';
import ExploreScreen from './screens/exploreScreens/ExploreScreen';
import NavigationScreen from './screens/navigateScreens/NavigationScreen';
import SelectDestinationScreen from './screens/navigateScreens/SelectDestinationScreen';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
export function ScreenStack() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({            
          'SourceSansPro-Black': require('./assets/fonts/SourceSansPro-Black.ttf'),
          'SourceSansPro-BlackItalic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
          'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
          'SourceSansPro-BoldItalic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
          'SourceSansPro-ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
          'SourceSansPro-ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
          'SourceSansPro-Italic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
          'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
          'SourceSansPro-LightItalic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
          'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
          'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
          'SourceSansPro-SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
        });      

        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      
      } catch (e) {
        
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const screenOptions = {
    headerTintColor: "white",
    headerBackTitleVisible: false,
    headerTitle: "",
    headerShadowVisible: false,
    headerTransparent: true,
    headerTintColor: "black",
  }
  
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={screenOptions}
        >
          <Stack.Screen name="Home" component={LandingScreen} options={{headerTransparent:true, headerTitle:""}} />
          <Stack.Screen name="ModeSelectScreen" component={ModeSelectScreen} />
          <Stack.Screen name="SelectDestinationScreen" component={SelectDestinationScreen} />
          <Stack.Screen name="NavigationScreen" component={NavigationScreen} options={{headerBackVisible: false}}/>
          <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{headerBackVisible: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}