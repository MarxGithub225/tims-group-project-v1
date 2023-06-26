import React, { useEffect, useRef, useState } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Dimensions, Image, View } from 'react-native'
import style, { blackBg, blackLight, deviceHeight, miniSize, primary, secondary, greyLight, white } from '../../../assets/styles/variables';
import Home from './Pages/Home';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Categories from './Pages/Categories';
import Cart from './Pages/Cart';
import AllProducts from './Pages/AllProducts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
function AppRootTabNavigator() {
  const {navigate} = useNavigation()

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);

  return <Tab.Navigator
  
  screenOptions={({ route }) => ({
    headerShown : false,
    tabBarStyle : {
      ...style.appRoot.tabShadow,
      display : route.name === 'Panier' ? 'none' : 'flex',
      backgroundColor : mode === 'dark' ? blackBg : white,
      borderTopWidth : 1,
      borderTopColor : mode === 'dark' ? secondary :'white',
      height: deviceHeight / 9
    },
    tabBarLabelStyle : {
      fontSize : miniSize,
      fontFamily : 'Inter',
      marginBottom: 10
    },
    
    tabBarIcon: ({ focused, color, size }) => {
      let IconName;

      if (route.name === 'Accueil') {
        IconName = !focused
          ? <MaterialCommunityIcons size={25} name='home-variant' color={greyLight}/>: <MaterialCommunityIcons size={20} name='home-variant' color={mode === 'dark' ? secondary :primary}/>;
      }
      else if (route.name === 'Categories') {
        IconName = !focused
        ? <MaterialCommunityIcons size={25} name='view-grid' color={greyLight}/>: <MaterialCommunityIcons size={25} name='view-grid' color={mode === 'dark' ? secondary :primary}/>;
      }
      else if (route.name === 'Panier') {
        IconName = !focused
          ? <MaterialCommunityIcons size={25} name='shopping' color={greyLight}/>: <MaterialCommunityIcons size={25} name='shopping' color={mode === 'dark' ? secondary :primary}/>
      }
      else {
        IconName = !focused
        ? <MaterialCommunityIcons size={25} name='heart' color={greyLight}/>: <MaterialCommunityIcons size={25} name='heart' color={mode === 'dark' ? secondary :primary}/>
      }

      // You can return any component that you like here!
      return <TouchableOpacity 
      onPress={() => navigate(route.name )}
      style = {{position : 'relative'}}>{IconName} 
      
      {route.name === 'Panier' && <View
      style = {{
        position : 'absolute',
        top: 0,
        right : 0,
        width : 7,
        height : 7,
        borderRadius : 100,
        backgroundColor : mode === 'dark' ? secondary :primary,

      }}
      /> }
      
      </TouchableOpacity>;
    },
    tabBarActiveTintColor: mode === 'dark' ? secondary : primary,
    tabBarInactiveTintColor: blackLight
  })}
  
  >
    <Tab.Screen name="Accueil" component={Home} />
    <Tab.Screen name="Categories" component={Categories} />
    <Tab.Screen name="Panier" component={Cart} />
    <Tab.Screen name="Favoris" component={AllProducts} />
  </Tab.Navigator>
}

export default AppRootTabNavigator