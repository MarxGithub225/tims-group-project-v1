import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { black, blackLight, miniSize, smallSize, userbg, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 
import { Start } from '../../../../utils/rates';
import RateItem from '../RateItem';

function Rate() {

    let first_name = "Marx";
    let last_name = "NGuessan";
    const {navigate} = useNavigation();

    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);
  return (
    <View>
        <View style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
              marginBottom: 15,
              marginTop : 25
            }}>
              <Text style = {[styles.header, {color: mode === 'dark' ?  white : black}]}>Avis :</Text>
              <TouchableOpacity 
              onPress={() => navigate('RATESROOT')}
              ><Text style = {styles.seemore}>Voir tout</Text></TouchableOpacity>
            </View>

            <RateItem/>
    </View>
  )
}

export default Rate

const styles = StyleSheet.create({
   header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'Inter'
    },
    name : {
        fontSize: smallSize,
        marginTop: 3,
        fontFamily : 'Inter'
    },
    nameCharAt : {
        fontSize: smallSize,
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
        fontSize: smallSize
    },
    ratingNumber : {
        fontFamily : 'Inter',
        fontSize : smallSize
    },
    rating : {
        color : blackLight,
        fontSize : smallSize
    },
    seemore : {
        fontFamily : 'Inter',
        fontSize: miniSize,
        color: blackLight
    },
    
  });