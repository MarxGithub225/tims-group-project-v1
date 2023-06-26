import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Buttons({
    borderColor = 'transparent',
    borderWidth= 0,
    value,
    color = '',
    background = '',
    border = false,
    size = 11,
    fontWeight = "",
    fontFamily = "Inter",
    textTransform = "none",
    radius = 10,
    width,
    height,
    onclik = () => {}
}) {
  return (
    <TouchableOpacity 
    onPress={() => {
      if(onclik) {
        onclik()
      }
    }}
    style = {[styles.customButton, {width: width, height: height, backgroundColor : background, borderWidth : border ? borderWidth : 0, borderColor : border ? borderColor : 'transparent', borderRadius: radius}]} >
      <Text style = {{color: color, fontSize: size, fontFamily : fontFamily, fontWeight: fontWeight, textTransform: textTransform}}>{value} </Text>
    </TouchableOpacity>
  )
}

export default Buttons

const styles = StyleSheet.create({
  customButton : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingHorizontal : 10,
    paddingVertical: 15
},
});