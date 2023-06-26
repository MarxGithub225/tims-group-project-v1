import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { blackLight, deviceWith, greyLight,  primary, smallSize, white, black } from '../../../../../assets/styles/variables'
import { useSelector } from 'react-redux'; 
function ProfileListItem({icon, label, value, link}) {

    const {navigate} = useNavigation()

    const theme = useSelector(state => state.theme);
      const [mode, setMode] = useState(theme.mode);
      useEffect(() => { 
              setMode(theme.mode);
        }, [theme]);
  return (
    <View
    style = {{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : 30
    }}
    >
       <View
       style = {{
           flexDirection : 'row',
           alignItems : 'center'
       }}
       >
       <Text style = {{fontFamily : 'InterBold',}} > <Ionicons name={icon} size={25} color = {mode === 'dark' ? white : black}/> </Text>
       <Text
        style = {{
            color : mode === 'dark' ? white : black,
            fontFamily : 'InterBold',
            marginLeft : 5
        }}
        >
            {label}
        </Text>

        
       </View>

        <View
            style = {{
                flexDirection : 'row',
                alignItems : 'center',
            }}
        >
            <Text
            style = {styles.value}
            numberOfLines={1}
            >
                {value}
            </Text>
            {link ? <TouchableOpacity style = {styles.seemore}
            onPress={() => navigate(link)}
            >
                <Ionicons size={20} color={mode === 'dark' ? white : blackLight} name='chevron-forward-outline'  />
            </TouchableOpacity> : <Text></Text>}
        </View>
    </View>
  )
}

export default ProfileListItem

const styles = StyleSheet.create({
    seemore : {
        fontWeight: '400',
        color: greyLight,
        width : 30,
        flexDirection :'row',
        justifyContent : 'flex-end'
    },

    value : {
        fontFamily: 'Inter',
        fontSize: smallSize,
        color: blackLight,
        maxWidth : deviceWith / 2
    },
})