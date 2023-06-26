import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { WebView } from 'react-native-webview';

const Stack = createStackNavigator();
function NavigationComponent({onReady}) {
  return  <WebView source={{ uri: 'https://6tims.com/' }} style={{ flex: 1 }} />
}

export default NavigationComponent;
