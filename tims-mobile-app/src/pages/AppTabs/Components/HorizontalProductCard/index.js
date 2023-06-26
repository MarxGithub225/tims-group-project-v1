import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'; 
import { black, blackLight, deviceHeight, deviceWith, greyLight, mediumSize, smallSize, white } from '../../../../../assets/styles/variables';
function HorizontalProductCard(props) {
    const {image, price, title} = props
    const {navigate} = useNavigation();

    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);

    const styles = StyleSheet.create({
        product : {
          backgroundColor : mode === 'dark' ? '#222E34' :white,
          position: 'relative',
          height: deviceHeight / 5.5,
          paddingHorizontal: 10,
          marginBottom: 15,
          flexDirection : 'row',
          alignItems : 'center',
          shadowColor: "rgba(57, 63, 74, 0.25)",
          borderRadius: 10,
          shadowOffset: {
            width: -20,
            height: 40,
          },
          shadowOpacity: 1,
          shadowRadius: 100,
          elevation: 5,
          imageStyle : {
              width: '100%',
              height: '70%',
              resizeMode : 'contain'
          },
          content : {
            marginLeft : 10,
            backgroundColor : mode === 'dark' ? '#222E34' :white,
            flexDirection : 'column',
            width: deviceWith / 1.72,
            justifyContent : 'space-between'
          }
        },
        imageContent : {
          width: deviceWith / 4,
          borderRadius: 10,
          padding : 10,
          backgroundColor : greyLight
        },
        title : {
          fontSize: smallSize,
          fontFamily : 'Inter',
          color: mode === 'dark' ? white :black,
          textTransform : 'capitalize',
          marginBottom : 10
        },
        price : {
          fontSize: smallSize,
          color: blackLight,
          fontFamily: 'Inter'
        },
        wish : {
            position : 'absolute',
            elevation: 5,
            right: 13,
            top: 13
        }
      })

  return (
    <TouchableOpacity  onPress={() => navigate('DETAILSROOT')} style = {styles.product}>
        <View style = {styles.imageContent}>
          <Image
              source={image}
              style = {styles.product.imageStyle}
          />
        </View>

        <View style = {styles.product.content} >
          <Text style = {styles.title} numberOfLines={2}>
          {title}
          </Text>

          <Text style = {styles.price}>
            {price} MAD
          </Text>

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
            <Text> <Ionicons name='chevron-down-circle-outline' size={35} color={blackLight} /> </Text>
            <Text
            style = {{
              fontSize : smallSize,
              fontFamily : 'InterBold',
              color : mode === 'dark' ? white : black
            }}
            > 1 </Text>
            <Text> <Ionicons name='chevron-up-circle-outline' size={35} color={blackLight} /> </Text>

          </View>

          <View
          style = {{
            flexDirection : 'row',
            justifyContent : 'center',
            alignItems : 'center',
            borderRadius : 100,
            borderColor : blackLight,
            borderWidth : 2,
            width : 25,
            height : 25
          }}
          > 
          <Text><Ionicons name='trash-outline' size={18} color={blackLight} /></Text> 
          
          </View>
          </View>
        </View>
    </TouchableOpacity>
  )
}

export default HorizontalProductCard
