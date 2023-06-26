import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { black, blackLight, deviceHeight, deviceWith, greyLight, mediumSize, smallSize, white } from '../../../../../assets/styles/variables';
function OrderProductCard(props) {
  const {image, price, title} = props
    const {navigate} = useNavigation();

    const styles = StyleSheet.create({
        product : {
          backgroundColor : white,
          position: 'relative',
          height: deviceHeight / 5,
          paddingHorizontal: 10,
          marginBottom: 15,
          flexDirection : 'row',
          alignItems : 'center',
          borderRadius: 10,
          borderWidth : 1,
          borderColor : greyLight,
          
          imageStyle : {
              width: '100%',
              height: '70%',
              resizeMode : 'contain'
          },
          content : {
            marginLeft : 10,
            backgroundColor : white,
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
          color: black,
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
        },
        seemore : {
          fontWeight: '400',
          color: blackLight,
          width : 30,
          flexDirection :'row',
          justifyContent : 'flex-end'
        },
        value : {
            fontWeight: '400',
            fontSize: smallSize,
            color: blackLight,
            maxWidth : deviceWith / 2
        },
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
          <Text style = {styles.title} numberOfLines={1}>
          {title}
          </Text>

          <Text style = {styles.price}>
            {price} MAD
          </Text>

          <View  
          style = {{
            flexDirection : 'column',
            marginTop: 10
          }}
          >

          <View  
          style = {{
            flexDirection : 'row',
            alignItems : 'center'
          }}
          >
            <Text style = {{fontFamily: 'Inter'}}> SKU : </Text>
            
            <Text style = {{fontFamily: 'Inter'}}> HSBCUDLK </Text>

          </View>

          <View  
          style = {{
            flexDirection : 'row',
            alignItems : 'center'
          }}
          >
            <Text style = {{fontFamily: 'Inter'}}> Color : </Text>
            
            <View
            style = {{
              width : 15,
              height : 15,
              backgroundColor : black
            }}
            />

          </View>

          <View  
          style = {{
            flexDirection : 'row',
            alignItems : 'center'
          }}
          >
            <Text style = {{fontFamily: 'Inter'}}> Variation : </Text>
            
            <Text style = {{fontFamily: 'Inter'}}> XL </Text>

          </View>

          
          </View>
        </View>
    </TouchableOpacity>
  )
}

export default OrderProductCard
