import React from 'react'
import { Text, TextInput, View } from 'react-native';
import style, { blackLight, grey, primary } from '../../../assets/styles/variables'

function CustomInput({
    placeholder =  '',
    width = '100%',
    value = '',
    color = blackLight,
    background = grey,
    size = 11,
    icon,
    autoFocus = false,
    editable = true,
    selectTextOnFocus = true,
    keyboardType = ''
}) {
  return (
    <View
    style = {{position : 'relative', height: 50}}
    >
    
    <TextInput
    selectionColor={color}
    autoFocus = {autoFocus}
    placeholder={placeholder}
    onChangeText={(text) => onclik(text)}
    value={value}
    editable={editable}
    selectTextOnFocus={selectTextOnFocus}
    cursorColor = {primary}
    placeholderTextColor = {color}
    keyboardType={keyboardType}
    style = {{
      position : 'relative',
      width : width,
      backgroundColor : background,
      height : 50,
      paddingLeft : icon ? 30 : 15,
      paddingRight : 15,
      paddingVertical : 5,
      borderRadius : 10 ,
      color : color,
      fontSize : size,
      fontFamily : 'Inter'
      
    }}/>

    {icon && 
      <Text
      style = {{
        position : 'absolute',
        top: 15,
        left : 8,
        height : 50,
        width: 50,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
      }}
      > 
      {icon}
      </Text>
      }
    </View>
  )
}

export default CustomInput