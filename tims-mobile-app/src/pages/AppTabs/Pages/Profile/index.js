import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { blackBg, white } from '../../../../../assets/styles/variables';
import ProfileListItem from '../../Components/ProfileListItem';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { useSelector } from 'react-redux'; 

function ProfilePage({navigation}) {
  const {navigate} = useNavigation();
  const [showSearch, setSearch] = useState(false)
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg : white}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Profile'}
        />
        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
          <View
          style = {{
            padding : 15
          }}
          >
            <ProfileListItem
            icon={'person-outline'}
            label={'Nom'}
            value={'Marx N\'Guessan'}
            link={'UPDATEPROFILESROOT'}
            />

            <ProfileListItem
              icon={'mail-outline'}
              label={'E-mail'}
              value={'nguessanmarx@gmail.com'}
              />

            <ProfileListItem
              icon={'phone-portrait-outline'}
              label={'Téléphone'}
              value={'0787467290'}
              link={'UPDATEPROFILESROOT'}
              />

            <ProfileListItem
              icon={'pin-outline'}
              label={'Adresses'}
              value={'Abidjan, Cocody - pharmacie dokui 00225'}
              link={'ADDRESSESROOT'}
              />

            <ProfileListItem
              icon={'card-outline'}
              label={'Cartes bancaires'}
              value={'**** **** **** 1234'}
              link={'BANKCARDSROOT'}
              />    
          </View>
        
        </ScrollView>
    </View>
  )

}

export default ProfilePage