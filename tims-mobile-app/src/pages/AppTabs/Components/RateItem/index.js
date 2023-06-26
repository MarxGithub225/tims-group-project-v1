import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, blackLight,  smallSize, userbg, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 
import { Start } from '../../../../utils/rates';

function RateItem({hideScore}) {

    let first_name = "Marx";
    let last_name = "NGuessan";

    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);
  return (
    <View>

        <View
        style = {{
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center'
        }}
        >
            <View
            style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}
            >
                <View style = {styles.userName}>
                    <Text style = {styles.nameCharAt}>{last_name.charAt(0)}</Text>
                    <Text style = {styles.nameCharAt}>{first_name.charAt(0)}</Text>
                </View>

                <View
                
                style = {{
                    flexDirection : 'column',
                    justifyContent: 'flex-start',
                    marginLeft : 15
                }}
                >
                    <Text style = {[styles.name, , {color: mode === 'dark' ?  white : black}]}>{last_name} {first_name}</Text>
                    <Text  style = {styles.date}><Ionicons name='time-outline' /> 13 Sep, 2020</Text>
                </View>
            </View>

            {!hideScore && <View>
                <Text > <Text style = {[styles.ratingNumber , {color: mode === 'dark' ?  white : black}]} >4.8</Text> <Text style = {styles.rating} > avis</Text> </Text>
                {Start(4)}
            </View>}
        </View>

        

        <Text
        style = {{
            color : blackLight,
            fontSize : smallSize,
            marginTop: 10,
            marginBottom: 55,
            fontFamily : 'Inter'
        }}
        >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque malesuada eget vitae amet...
        </Text>
    </View>
  )
}

export default RateItem

const styles = StyleSheet.create({
   
    name : {
        marginTop: 3,
        fontFamily : 'Inter'
    },
    nameCharAt : {
        fontFamily : 'Inter'
    },
    userName : {
        textTransform : 'uppercase',
        width : 43,
        height: 43,
        borderRadius: 100,
        backgroundColor : userbg,
        flexDirection: 'row', 
        justifyContent : 'center',
        alignItems : 'center',
        
    },
    date : {
        color : blackLight,
        fontSize: smallSize,
        fontFamily : 'Inter'
    },
    ratingNumber : {
        fontFamily : 'Inter',
    },
    rating : {
        color : blackLight,
        fontFamily : 'Inter'
    }
    
  });