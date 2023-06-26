import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { blackLight, blue, deviceWith, grey, primary, secondary, smallSize, white } from '../../../../../assets/styles/variables'
import DashedLine from 'react-native-dashed-line';
import { useSelector } from 'react-redux'; 
function OrderItems({icon, label, value, link}) {

    const {navigate} = useNavigation()
    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
      }, [theme]);
  return (
    <TouchableOpacity
    onPress={() => navigate('ODERDETAILSSROOT')}
    style = {{
        marginBottom : 30,
        borderWidth : 1,
        borderColor : grey,
        borderRadius : 10,
        padding : 15,
        backgroundColor : mode === 'dark' ? white : 'transparent',
    }}
    >
       <Text style = {{
         fontFamily: 'InterBold',
           color: blackLight,
           fontSize : smallSize
       }} >
        Ref. SDG1345KJD
       </Text>

       <Text style = {{
           fontFamily: 'Inter',
           fontSize : smallSize
       }} >
        Date : 12 Juin 2022
       </Text>

       <View
       style = {{
           paddingVertical : 15
       }}
       >
           <DashedLine dashLength={1}
            dashColor={grey}
            />
        </View>
       

    <View
    style = {{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    }}
    >
       <Text
        style = {{
            fontFamily : 'Inter'
        }}
        >
            Etat de la commande
        </Text>

        <Text
        style = {styles.value}
        numberOfLines={1}
        >
            En preparation
        </Text>
    </View>

    <View
    style = {{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    }}
    >
       <Text
        style = {{
            fontFamily : 'Inter'
        }}
        >
            Articles
        </Text>

        <Text
        style = {styles.value}
        numberOfLines={1}
        >
            2 achétés
        </Text>
    </View>

    <View
    style = {{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    }}
    >
       <Text
        style = {{
            fontFamily : 'Inter'
        }}
        >
            Montant
        </Text>

        <Text
        style = {[styles.value, {color : mode === 'dark' ? secondary :primary, fontFamily : 'InterBold'}]}
        numberOfLines={1}
        >
            299 MAD
        </Text>
    </View>
    </TouchableOpacity>
  )
}

export default OrderItems

const styles = StyleSheet.create({
    seemore : {
        fontFamily: 'Inter',
        color: blackLight,
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