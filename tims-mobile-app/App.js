import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/utils/store';
import AppNavContainer from './src/navigations';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native';
export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Inter': require('./assets/fonts/inter.ttf'),
    'InterBold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }
  return <SafeAreaView style={{ flex: 1 }}>
    <WebView source={{ uri: 'https://6tims.com/' }}  />
  </SafeAreaView>
}


