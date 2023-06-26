import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, blackLight, danger, deviceWith, grey,  primary, smallSize, white, blackBg } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { RadioButton, Switch } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'; 

import { CreditCardInput } from '../../../../common/Bank';
import ValidateButton from '../../Components/ValidateButton';

const BankBg1 = require('../../../../../assets/images/bankImage1.png');
const BankBg2 = require('../../../../../assets/images/bankImage2.png');
const BankBackBg1 = require('../../../../../assets/images/bankImageBack1.png');
const BankBackBg2 = require('../../../../../assets/images/bankImageBack2.png');
function BankCardsForm({navigation}) {

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);
  const [checked, setChecked] = useState(0);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false); 

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  const _onFocus = (field) => console.log("focusing", field);

  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg : white, position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Comptes bancaires'}
        />


       <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
       >
        <View style = {{
            padding : 15,
            marginBottom: 35
          }}>
            
            <View style={styles.bankCard.container}>

            <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Type de carte :</Text>
                      <View style = {{
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          alignItems : 'center',
                          marginBottom: 15
                      }}>
                        <TouchableOpacity onPress={() => { setChecked(0) }} style = {{height : 40, width : deviceWith /2}}><Text style = {[styles.detailsLabel, {color : mode === 'dark' ? white : black}]}>Standard</Text></TouchableOpacity>
                        <RadioButton
                          value={0}
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
                        <TouchableOpacity onPress={() => { setChecked(1) }} style = {{height : 40, width : deviceWith /2}}><Text style = {[styles.detailsLabel, {color : mode === 'dark' ? white : black}]}>Coloré </Text></TouchableOpacity>
                        <RadioButton
                          value={1}
                          status={checked === 1 ? 'checked' : 'unchecked'}
                          onPress={() => { setChecked(1) }}
                        />
                      </View>  

                  <CreditCardInput
                    labels = { {number: "NUMERO DU COMPTE", expiry: "EXP.", cvc: "CVC/CCV", name : 'TITULAIRE DU COMPTE'} }
                    cardFontFamily = 'Inter'
                    requiresName 
                    requiresCVC
                    cardImageFront = {`${checked === 1 ? BankBg1 : BankBg2}`}
                    cardImageBack = {`${checked === 1 ? BankBackBg1 : BankBackBg2}`}
                    cardScale={1.0}
                    labelStyle={styles.bankCard.label}
                    validColor={black}
                    invalidColor={danger}
                    placeholderColor={grey}
                    allowScroll = {true}
                    onFocus={_onFocus}
                    onChange={_onChange} 
                    showInput
                    
                    inputStyle = {[styles.bankCard.input, {
                      position : 'relative',
                      width : '100%',
                      backgroundColor : grey,
                      height : 50,
                      padding : 15,
                      paddingVertical : 5,
                      borderRadius : 10 ,
                      color : blackLight,
                      fontFamily : 'Inter',
                      borderBottomWidth : 0,
                      borderBottomColor : 'transparent'
                    }]}
                    />

                <View style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center',
                    marginTop: 25
                }}>
                  <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Adresse par défaut ? </Text>
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color='#4BC76D'  />
                </View>  
            </View>

            
           
          </View>
       </ScrollView>

        <ValidateButton label={'Enregister le compte'} link = {''} />
        
    </View>
  )
}

export default BankCardsForm

const styles = StyleSheet.create({
  header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'Inter',
    marginBottom: 20
  },
  detailsLabel : {
    fontFamily : 'Inter',
    fontSize: smallSize,
  },
  label : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'InterBold',
    marginBottom: 40
  },
  label : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'Inter',
    marginBottom: 10
  },
  bankCard : {
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    container: {
      
    },
    label: {
      color: black,
      fontSize: smallSize,
      fontFamily: 'Inter',
      marginTop: 10
    },
    input: {
      fontSize: smallSize,
      color: black,
      fontFamily: 'Inter',
    },
  }
});