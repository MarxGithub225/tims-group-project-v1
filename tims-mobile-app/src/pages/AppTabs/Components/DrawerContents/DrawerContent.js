import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Title,
    Caption,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import {Ionicons, FontAwesome} from '@expo/vector-icons';
import CloseDrawer from '../CloseDrawer';
import { black, secondary,  smallSize, primary, userbg, white, blackBg, greyLight, blackLight } from '../../../../../assets/styles/variables';

import { useSelector, useDispatch } from 'react-redux'; 
import { switchMode } from "../../../../utils/slices/themeSlicer";
import AsyncStorage from '@react-native-async-storage/async-storage';
export function DrawerContent(props) {

    const theme = useSelector(state => state.theme);
    // initialize action dispatcher
    const dispatch = useDispatch();
    // define a component mode state
    const [mode, setMode] = useState(theme.mode);

    const [isEnabled, setIsEnabled] = useState(false); 

    let first_name = "Marx";
    let last_name = "NGuessan";

    const _top_menu = [
        
        {
            icon : 'person-outline',
            label : 'Mon profile',
            action : () => {props.navigation.navigate('PROFILEROOT')}
        },
        {
            icon : 'lock-closed-outline',
            label : 'Mot de passe',
            action : () => {props.navigation.navigate('NEWPASSROOT')}
        },
        {
            icon : 'wallet-outline',
            label : 'Mes commandes',
            action : () => {props.navigation.navigate('MYORDERSROOT')}
        },
        {
            icon : 'heart-outline',
            label : 'Mes favoris',
            action : () => {props.navigation.navigate('WISHROOT')}
        },
        {
            icon : 'key-outline',
            label : 'Support',
            action : () => {props.navigation.navigate('Home')}
        }
    ]

    const handleThemeChange = async () => { 
        try {
            await AsyncStorage.setItem('@theme_storage_Key', mode === 'light' ? 'dark' : 'light')
            dispatch(switchMode(mode === 'light' ? 'dark' : 'light'));
        } catch (e) {
        // saving error
        }
        
    }
    
    // Update the app Incase the theme mode changes
    useEffect(() => { 
        setMode(theme.mode);
    }, [theme]);

    return(
        <View style={{flex:1, padding: 20, backgroundColor : mode === 'dark' ?  blackBg : white}}>

            
            <CloseDrawer  navigationProps={props.navigation} />
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', justifyContent : 'space-between', alignItems : 'center'}}>
                            <View style = {{
                                flexDirection : 'row',
                                alignItems : 'center'
                            }}>
                                <View style = {styles.userName}>
                                    <Text style = {styles.nameCharAt}>{last_name.charAt(0)}</Text>
                                    <Text style = {styles.nameCharAt}>{first_name.charAt(0)}</Text>
                                </View>
                                <View style={{marginLeft:15, flexDirection:'column'}}>
                                    <Title style={[styles.title, {color : mode === 'dark' ? white : black}]}>Marx N'Guessan</Title>
                                    <Caption style={[styles.caption, {color : mode === 'dark' ? greyLight : blackLight}]}>Verifié <FontAwesome name='asterisk' color={'#4AC76D'} /></Caption>
                                </View>
                            </View>

                            
                        </View>
                    </View>

                    <View style = {{
                            flexDirection : 'row',
                            justifyContent : 'space-between',
                            alignItems : 'center',
                            marginLeft : 2,
                            marginTop: 35,
                            marginBottom : 5
                        }}>
                        <View 
                            style = {{
                                flexDirection : 'row',
                                alignItems : 'center'
                            }}
                            onPress={() => console.log('')}
                        >
                            <Ionicons 
                                name={`sunny-outline`}
                                size={30}
                                color={mode === 'dark' ? secondary : primary}
                            />

                            <Text
                            style = {{
                                fontWeight : '300',
                                fontSize : smallSize,
                                marginLeft : 13,
                                color : mode === 'dark' ? secondary : primary,
                                fontFamily : 'Inter'
                            }}
                            >
                                Mode {mode === 'dark' ? 'nuit' : 'jour'}
                            </Text>
                        </View>
                        <Switch
                           style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                            trackColor={{ false: primary, true: secondary }}
                            thumbColor={mode === 'dark' ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor={mode === 'dark' ? secondary : primary}
                            onValueChange={handleThemeChange}
                            value={mode === 'dark' ? true : false}
                        />
                        </View>
                    <Drawer.Section style={styles.drawerSection}>
                        
                        {_top_menu.map((m, index) => (
                            <DrawerItem 
                            key={index}
                            labelStyle = {{
                                fontWeight : '300',
                                fontSize : smallSize,
                                marginLeft : -15,
                                fontFamily : 'Inter',
                                color : mode === 'dark' ? white : black
                            }}
                            icon={({color, size}) => (
                                <Ionicons 
                                name={`${m.icon}`}
                                color={mode === 'dark' ? white : black}
                                size={size}
                                />
                            )}
                            label={`${m.label}`}
                            onPress={m.action}
                        />
                        ))}
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    labelStyle = {{
                        fontWeight : '300',
                        fontSize : smallSize,
                        marginLeft : -15,
                        color : mode === 'dark' ? secondary :primary,
                        fontFamily : 'Inter'
                    }}
                    
                    icon={({color, size}) => (
                        <Ionicons 
                        name="log-out-outline" 
                        color={mode === 'dark' ? secondary :primary}
                        size={size}
                        />
                    )}
                    label="Déconnexion"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    nameCharAt : {
        fontSize: smallSize,
        fontFamily: 'Inter'
    },
    userName : {
        textTransform : 'uppercase',
        width : 43,
        height: 43,
        borderRadius: 100,
        backgroundColor : userbg,
        flexDirection: 'row', 
        justifyContent : 'center',
        alignItems : 'center'
        
    },
    title: {
      marginTop: 3,
      fontFamily : 'Inter'
    },
    caption: {
      fontSize: smallSize,
      flexDirection : 'row',
      alignItems : 'center', 
      fontFamily: 'Inter'
    },
    
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    drawerSection: {
      marginLeft: -15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        marginLeft: -15
    },
    
  });