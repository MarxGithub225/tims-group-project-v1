import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppRootTabNavigator from './AppRootTabNavigator';
import { Dimensions } from 'react-native';
import { DrawerContent } from './Components/DrawerContents/DrawerContent';
import { white } from '../../../assets/styles/variables';


const Drawer = createDrawerNavigator();

const deviceWidth= Dimensions.get('window').width; 
function AppTabs() {
  
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown : false,
      drawerType : 'front',
      drawerStyle: {
        backgroundColor: white,
        width: deviceWidth / 1.2,
      },
    }}
    drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="DrawerHome" component={AppRootTabNavigator} />
    </Drawer.Navigator>
  );
}

export default AppTabs