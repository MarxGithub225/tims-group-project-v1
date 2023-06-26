import React from 'react';
import { Text } from 'react-native';
import style, { black } from '../../../assets/styles/variables'


function CustomText({
  value, 
  color, 
  align, 
  fontStyle, 
  fontWeight, 
  fontSize
 }) {
  return (
    <Text
    style = {{
      color : color, 
      textAlign : align,
      fontStyle : fontStyle,
      fontWeight : fontWeight,
      fontSize : fontSize,
      fontFamily : 'Inter'
    }}
    >
        {value}
    </Text>
  )
}

export default CustomText