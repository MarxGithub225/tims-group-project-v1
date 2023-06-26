import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { blackBg, deviceHeight, deviceWith, grey, mediumSize,  primary, secondary, smallSize, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux';
import CustomInput from '../../../../common/CustomInput';




function SearchPage({navigation}) {
  const {navigate} = useNavigation();
  const [showSearch, setSearch] = useState(false)
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
        setMode(theme.mode);
  }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor :  mode === 'dark' ? blackBg : white}}>
       <View style={{flexDirection: 'row', alignItems : 'center', justifyContent : 'space-between',  paddingTop: deviceHeight/19 + 10, backgroundColor :  mode === 'dark' ? blackBg :white, paddingHorizontal: 15}}>
        <CustomInput
          autoFocus = {true}
          value={''}
          onclik={() => console.log('okkk')}
          width = {deviceWith/1.35}
          placeholder = {'Rechercher un produit, marque...'}
          size={smallSize}
          background = {mode === 'dark' ? '#222E34' : grey}
        />

        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <Text
          style = {{
            fontFamily : 'Inter',
            color :  mode === 'dark' ? secondary :primary
          }}
          >Annuler</Text>
        </TouchableOpacity>

       </View>
        
        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
          
        
        </ScrollView>
    </View>
  )

}

export default SearchPage

const styles = StyleSheet.create({
  
})
