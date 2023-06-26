import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { black, blackLight, greyLight, primary, smallSize, white, blackBg, largeSize, mediumSize } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { RadioButton, Switch } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'; 
import CustomInput from '../../../../common/CustomInput';
import ValidateButton from '../../Components/ValidateButton';
function UpdateProfile({navigation}) {

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
        title = {'Modifier le profile'}
        />


       <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
       >
        <View style = {{
            padding : 15,
            marginBottom: 35
          }}>
                       

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Nom :</Text>
              <CustomInput
              value={'N\'Guessan'}
              onclik={setSearchValue}
              placeholder = {'N\'Guessan'}
              size={smallSize}
              background={greyLight}
              color={blackLight}
              />
            </View>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Prénom(s) :</Text>
              <CustomInput
              value={'Marx'}
              onclik={setSearchValue}
              placeholder = {'Marx'}
              size={smallSize}
              background={greyLight}
              color={blackLight}
              />
            </View>

            <View
            style = {{
              marginBottom: 15
            }}
            >

              <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]}>Téléphone :</Text>
              <CustomInput
              value={'0787467290'}
              onclik={setSearchValue}
              placeholder = {''}
              size={smallSize}
              background={greyLight}
              color={blackLight}
              />
            </View> 
           
          </View>
       </ScrollView>

        
        <ValidateButton label={'Modifier'} link = {''} />
        
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  header : {
    fontWeight: 'bold',
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
    marginBottom: 10
  },
});