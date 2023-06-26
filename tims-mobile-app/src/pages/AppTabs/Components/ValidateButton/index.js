import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'; 
import { mediumSize,  primary, secondary, white } from '../../../../../assets/styles/variables'

function ValidateButton({label, link}) {
    const {navigate} = useNavigation();
    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);
  return (
    <View style = {{
        position : 'absolute',
        bottom: 0,
        width : '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor :  mode === 'dark' ?  secondary : primary,
        flexDirection : 'row',
        justifyContent : 'center'
      }}
      
      >
          <TouchableOpacity onPress={() => navigate(link)} >
              <Text style = {{color : white, fontFamily : 'InterBold', fontSize : mediumSize}}>
              {label}
              </Text>
          </TouchableOpacity>
        
      </View>
  )
}

export default ValidateButton