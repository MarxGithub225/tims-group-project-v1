import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { black, blackBg, blackLight,  primary, secondary, smallSize, userbg, white } from '../../../../../assets/styles/variables';
import Buttons from '../../../../common/Buttons';
import { Start } from '../../../../utils/rates';
import BottomModal from '../../Components/BottomModal';
import { useSelector } from 'react-redux'; 
import AppHeader from '../../Components/HomeHeader/AppHeader';
import RateItem from '../../Components/RateItem';

function Ratings({navigation}) {

    const modal = [];

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
        title = {'Avis'}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        style = {{
          padding : 15
        }}
        >

           <View
           style = {{
               flexDirection : 'row',
               justifyContent : 'space-between',
               alignItems : 'center',
               marginBottom : 25
           }}
           >
              <View>
                  <Text  style = {{
                    fontFamily : 'Inter',
                    fontWeight : '500',
                    color : mode === 'dark' ? white : black
                  }}>
                    2 Avis
                  </Text>

                  <View style = {{
                    flexDirection : 'row'
                  }} > 
                    
                    <Text style = {[styles.ratingNumber, {color : mode === 'dark' ? white : black}]} >4.8</Text>
                    {Start(4)}
                  </View>
                
              </View>

              <Buttons
                value = {<Text style = {{flexDirection : 'row', alignItems : 'center', fontFamily : 'Inter'}} ><Ionicons name='create-outline' size={25} /> Ajouter une noter </Text>}
                color = {white}
                background = {mode === 'dark' ? secondary : primary}
                onclik={() => modal[1].openModal()}
              />
           </View>

           <RateItem hideScore={true} />
           <RateItem hideScore={true} />

          
        </ScrollView>

        <BottomModal
        navigationProp ={navigation}
        type = {'rateForm'}
        ref={el => {
          modal[1] = el;
        }}
        />
    </View>
  )
}

export default Ratings

const styles = StyleSheet.create({
  name : {
    marginTop: 3,
    fontFamily : 'Inter'
},
nameCharAt : {
    fontWeight : '500'
},
userName : {
  textTransform : 'uppercase',
  width : 43,
  height: 43,
  borderRadius: 100,
  backgroundColor : userbg,
  flexDirection: 'row', 
  justifyContent : 'center',
  alignItems : 'center',
    
},
date : {
    color : blackLight,
    fontSize: smallSize
},
  ratingNumber : {
    fontFamily : 'Inter',
      marginRight : 5
  },
  rating : {
      color : blackLight,
  },
});