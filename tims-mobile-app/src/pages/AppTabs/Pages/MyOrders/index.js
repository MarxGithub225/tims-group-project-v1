import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { blackBg, white } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import OrderItems from '../../Components/OrderItems';

import { useSelector } from 'react-redux'; 

function MyOrders({navigation}) {
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);

  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ? blackBg : white}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Mes commandes'}
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
            <OrderItems
            icon={'person-outline'}
            label={'Nom'}
            value={'Marx N\'Guessan'}
            link={'UPDATEPROFILE'}
            />

            <OrderItems
              icon={'mail-outline'}
              label={'E-mail'}
              value={'nguessanmarx@gmail.com'}
              />

            <OrderItems
              icon={'phone-portrait-outline'}
              label={'Téléphone'}
              value={'0787467290'}
              link={'UPDATEPROFILE'}
              />

            <OrderItems
              icon={'pin-outline'}
              label={'Adresses'}
              value={'Abidjan, Cocody - pharmacie dokui 00225'}
              link={'ADDRESSESROOT'}
              />

            
          </View>
        
        </ScrollView>
    </View>
  )

}

export default MyOrders
