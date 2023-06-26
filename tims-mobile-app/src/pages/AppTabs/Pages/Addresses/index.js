import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, blackLight, greyLight,  primary, smallSize, white, blackBg, grey, mediumSize, secondary } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { RadioButton, Switch } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'; 
import CustomInput from '../../../../common/CustomInput';
import ValidateButton from '../../Components/ValidateButton';
import {Picker} from '@react-native-picker/picker';
function Addresses({navigation}) {

  const [searchValue, setSearchValue] = useState('');
  const [note, setNote] = useState(0);
  const [checked, setChecked] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);

  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg :white, position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Adresses'}
        />


       <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
       >
        <View style = {{
            padding : 15,
            marginBottom: 35
          }}>
                      <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Mes adresses :</Text>
                      <View style = {{
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          alignItems : 'center',
                          marginBottom: 15
                      }}>
                        <TouchableOpacity onPress={() => { setChecked(0) }}><Text style = {[styles.detailsLabel, {color : mode === 'dark' ? white : black}]}>Adresse 1</Text></TouchableOpacity>
                        <RadioButton
                          value={0}
                          color={mode === 'dark' ?  secondary :primary}
                          status={checked === 0 ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(0) }}
                        />
                      </View>  

                      <View style = {{
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          alignItems : 'center',
                          marginBottom: 15
                      }}>
                        <TouchableOpacity onPress={() => { setChecked(1) }}><Text style = {[styles.detailsLabel, {color : mode === 'dark' ? white : black}]}>Adresse 2 </Text></TouchableOpacity>
                        <RadioButton
                         color={mode === 'dark' ?  secondary :primary}
                          value={1}
                          status={checked === 1 ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(1) }}
                        />
                      </View>  

                      <View style = {{
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          alignItems : 'center',
                          marginBottom: 65
                      }}>
                      <TouchableOpacity onPress={() => { setChecked(2) }}><Text style = {[styles.detailsLabel, {color : mode === 'dark' ? white : black}]}>Adresse 3 </Text></TouchableOpacity>
                      <RadioButton
                         color={mode === 'dark' ?  secondary :primary}
                          value={2}
                          status={checked === 2 ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(2) }}
                          uncheckedColor={black}
                          
                        />
                      </View>  

            <Text style = {[[styles.header, {color : mode === 'dark' ? white : black}], {textAlign : 'center'}]}>Ajouter une adresse :</Text>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Adresse :</Text>
              <CustomInput
              value={searchValue}
              onclik={setSearchValue}
              placeholder = {''}
              background={greyLight}
              color={blackLight}
              />
            </View>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Région :</Text>
              <Picker
              style={{ height: 50, width: "100%", backgroundColor : grey, paddingHorizontal: 15, borderRadius : 10 }}
              onValueChange={(itemValue, itemIndex) => {console.log('')}}
            >
              <Picker.Item label="Région 1" value="Région 1" />
              <Picker.Item label="Région 2" value="Région 2" />
            </Picker> 
            </View>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Ville :</Text>
              <Picker
              style={{ height: 50, width: "100%", backgroundColor : grey, paddingHorizontal: 15, borderRadius : 10 }}
              onValueChange={(itemValue, itemIndex) => {console.log('')}}
            >
              <Picker.Item label="Ville 1" value="Ville 1" />
              <Picker.Item label="Ville 2" value="Ville 2" />
            </Picker> 
            </View>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Code postal :</Text>
              <CustomInput
              value={searchValue}
              onclik={setSearchValue}
              placeholder = {''}
              background={greyLight}
              color={blackLight}
              />
            </View>

            <View style = {{
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                marginBottom: 15
            }}>
              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Adresse par défaut ? </Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch}  color={mode === 'dark' ?  secondary :primary}  />
            </View>  
           
          </View>
       </ScrollView>

        
        <ValidateButton label={'Enregister'} link = {''} />
        
    </View>
  )
}

export default Addresses

const styles = StyleSheet.create({
  header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'InterBold',
    marginBottom: 20
  },
  detailsLabel : {
    fontFamily : 'Inter',
    fontSize: mediumSize,
  },
  label : {
    fontSize: mediumSize,
    color: black,
    fontFamily: 'Inter',
    marginBottom: 10
  },
});