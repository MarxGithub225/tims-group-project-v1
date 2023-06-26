import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { black, blackBg, blackLight, deviceHeight, deviceWith, grey, mediumSize,  primary, secondary, smallSize, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux';
import CustomInput from '../../../../common/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import ValidateButton from '../../Components/ValidateButton';



function Filter(props) {
  const {navigate} = useNavigation();
  const [showSearch, setSearch] = useState(false)
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
        setMode(theme.mode);
  }, [theme]);

  const [fromValue, setFromValue] = useState(50);
  const [toValue, setToValue] = useState(5000);
  const [value, setValue] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor :  mode === 'dark' ? blackBg : white}}>
       <View style={{flexDirection: 'row', alignItems : 'center', justifyContent : 'space-between',  paddingTop: 15, backgroundColor :  mode === 'dark' ? blackBg :white, paddingHorizontal: 15}}>
        
       <Text
           onPress={() => props.navigation()}
          style = {{
            fontFamily : 'Inter',
            color :  mode === 'dark' ? secondary :primary
          }}
          ><Ionicons size={45} name='close-outline' /></Text>
        <Text
          style = {{
            fontFamily : 'Inter',
            color :  mode === 'dark' ? white :black
          }}
          >Filtrer</Text>

       </View>
        
        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
          <View style ={{
            marginBottom: 50
          }}>
            <View
            style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
              padding : 15,
            }}
            >
              <CustomInput
                value={fromValue}
                onclik={() => console.log('okkk')}
                width = {deviceWith/2.3}
                placeholder = {'Min'}
                size={smallSize}
                background = {mode === 'dark' ? '#222E34' : grey}
                keyboardType = {'numeric'}
              />

              <CustomInput
                value={toValue}
                onclik={() => console.log('okkk')}
                width = {deviceWith/2.3}
                placeholder = {'Max'}
                size={smallSize}
                background = {mode === 'dark' ? '#222E34' : grey}
                keyboardType = {'numeric'}
              />
            </View>

            <Text style ={{
              paddingHorizontal : 15,
              fontFamily : 'InterBold',
              marginTop : 20,
              color :  mode === 'dark' ? white :black
            }}>
              Prix (MAD)
            </Text>
            <RangeSlider min={20} max={5000}
                  fromValueOnChange={value => setFromValue(value)}
                  toValueOnChange={value => setToValue(value)}
                  knobColor='red'
                  valueLabelsBackgroundColor='black'
                  inRangeBarColor={mode === 'dark' ? secondary : primary}
                  outOfRangeBarColor={grey}
                  showValueLabels = {false}
                  knobSize={15}
                  barHeight = {5}
                  styleSize={'small'}
                  fromKnobColor = {mode === 'dark' ? secondary : primary}
                  toKnobColor = {mode === 'dark' ? secondary : primary}
            />
          </View>
        
        </ScrollView>

        <ValidateButton label={'Appliquer'} link = {''} />
    </View>
  )

}

export default Filter

const styles = StyleSheet.create({
  
})
