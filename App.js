import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
//import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {


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
  return (
    <NavigationContainer>{
      <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text style={{fontFamily:"SourceSansPro-Black"}}>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
      }</NavigationContainer>

  );
}
