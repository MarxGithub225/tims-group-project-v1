import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { black, blackBg, blackLight, deviceHeight, deviceWith, smallSize, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux';
function ProductCard(props) {
    const {image, price, title, isPair} = props
    const {navigate} = useNavigation();

    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);
    const styles = StyleSheet.create({
        content : {
          marginVertical: 8,
          position: 'relative',
          width : deviceWith/2.14,
          height : deviceHeight / 2.35,
          backgroundColor : white,
          shadowRadius: 10,
          elevation: 1,
          borderRadius: 5,
          flexDirection : 'column',
          justifyContent : 'space-between',
          imageStyle : {
              width: '100%',
              height: '75%',
          },
          
        },
        title : {
          fontSize: smallSize,
          color: black,
          fontFamily : 'Inter',
          paddingHorizontal: 5
        },
        price : {
          fontSize: smallSize,
          color: black,
          fontFamily: 'InterBold',
          paddingHorizontal: 15,
          marginBottom: 5
        },
        wish : {
            position : 'absolute',
            elevation: 5,
            right:13,
            top:13,
        }
      })

  return (
        <TouchableOpacity style = {styles.content} onPress={() => navigate('DETAILSROOT')}>
            <Image
                source={image}
                style = {styles.content.imageStyle}
            />
            

            <Text style = {[styles.title, {color : black}]} numberOfLines={2}>
            {title}
            </Text>

            <Text style = {[styles.price, {color : black}]}>
             {price} MAD
            </Text>

            <TouchableOpacity style = {styles.wish}>
            <Image source={require('../../../../../assets/icons/HeartIcon.png')} />
            </TouchableOpacity>
        </TouchableOpacity>
  )
}

export default ProductCard
