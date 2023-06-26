import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, blackBg, blackLight, deviceWith, greyLight, mediumSize,  primary, secondary, smallSize, white } from '../../../../../assets/styles/variables';
import CustomTextarea from '../../../../common/CustomTextarea';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { useSelector } from 'react-redux'; 
import Slider from '@react-native-community/slider';
import ValidateButton from '../ValidateButton';
function RateForm({navigation}) {

  const [searchValue, setSearchValue] = useState('');
  const [note, setNote] = useState(0);
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);

  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg :white, position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        close={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Ajouter une note'}
        />


        <View style = {{
          padding : 15,
          marginBottom: 35
        }}>
          <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Décrivez  votre expérience :</Text>

          <CustomTextarea
          value={searchValue}
          onchange={setSearchValue}
          placeholder = {'Rechercher un produit, marque...'}
          background={ mode === 'dark' ?  '#222E34' : greyLight}
          color={blackLight}
          />

          <View
          style = {{
            marginTop: 25
          }}
          >
            <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Note :</Text>

            <Text style = {{
              textAlign : 'center',
              color : mode === 'dark' ? white : black
            }}>{note}</Text>
            <View  
            style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center'
            }}
            >
              <Text style = {{fontSize: smallSize, fontFamily : 'Inter', color : mode === 'dark' ? white : black}}>0</Text>
              <Slider
                style={{width: deviceWith /1.3, height: 40}}
                minimumValue={0}
                maximumValue={5}
                minimumTrackTintColor={greyLight}
                maximumTrackTintColor={greyLight}
                thumbTintColor={mode === 'dark' ? secondary : primary}
                onValueChange={(value) => setNote(value)}
                value={note}
                step={1}
                
              />
              <Text style = {{fontSize: smallSize,  fontFamily : 'Inter', color : mode === 'dark' ? white : black}}>5</Text>
            </View>
          </View>
        </View>

        <ValidateButton label={'Envoyer'} link = {''} />
        
    </View>
  )
}

export default RateForm

const styles = StyleSheet.create({
  header : {
    fontWeight: 'bold',
    fontSize: smallSize,
    color: black,
    fontFamily: 'Inter',
    marginBottom: 20
  },
});