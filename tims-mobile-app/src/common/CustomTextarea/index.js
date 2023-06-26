import React from 'react'
import { Text, TextInput, View } from 'react-native';
import { blackLight, deviceHeight, grey } from '../../../assets/styles/variables';

function CustomTextarea({
    placeholder,
    width,
    value,
    color = blackLight,
    background = grey,
    size = 11,
    onchange,
    icon,
    autoFocus = false
}) {
  return (
  
    
    <TextInput
    multiline
    numberOfLines={5}
    maxLength={255}
    selectionColor={color}
    placeholder={placeholder}
    onChange={(text) => onchange(text)}
    value={value}
    placeholderTextColor = {color} 
    style = {{
      width : width,
      backgroundColor : background,
      height : deviceHeight /6,
      paddingHorizontal : 15,
      paddingVertical : 5,
      borderRadius : 10,
      color : color,
      fontSize : size, 
      fontFamily : 'Inter'
    }}/>
  )
}

export default CustomTextarea