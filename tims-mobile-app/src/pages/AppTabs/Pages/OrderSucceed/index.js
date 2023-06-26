import React, {useEffect, useState  } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { black, blackLight, deviceHeight, deviceWith, grey, mediumSize,  primary, white, blackBg, smallSize } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; 
import Buttons from '../../../../common/Buttons';
import ValidateButton from '../../Components/ValidateButton';

const orderSucceedBg = require('../../../../../assets/images/orderSucceedBg.png');
const orderSucceedBgBlack = require('../../../../../assets/images/orderSucceedBgBlack.png');
const orderSucceed = require('../../../../../assets/images/orderSucceed.png');
const orderSucceedBlack = require('../../../../../assets/images/orderSucceedBlack.png');


function OrderSucceed({navigation}) {
  const {navigate} = useNavigation();

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);
 
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg :white, position : 'relative', }}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Paiement'}
        />


       
        <ImageBackground 
        source={mode === 'dark' ?  orderSucceedBgBlack :orderSucceedBg}
        style = {{
            padding : 15,
            height : deviceHeight/2.7,
            width : deviceWith,
          }}>

           <Image
           source={mode === 'dark' ?  orderSucceedBlack :orderSucceed}
           style = {{
            height : deviceHeight/3.5,
            width : deviceWith/1.1,
            resizeMode : 'contain'
           }}
           />
          </ImageBackground>

       <View
       style ={{
         padding : 15,
         marginBottom : 45
       }}
       >
       <Text style = {
         [styles.header, {color : mode === 'dark' ? white : black}]
       }>
       Commande confirmée
       </Text>

       <Text style = {[styles.label, {color : mode === 'dark' ? white : black}]} >
       Votre commande a bien été réçu, nous vous contacterons très bientôt.
       </Text>
       </View>

       <View style = {{
          flexDirection : 'row',
          justifyContent : 'center'
        }}>
          <Buttons
            value = 'Retour aux commandes'
            color = {blackLight}
            background = {grey}
            size={smallSize}
          />
        </View>

        <ValidateButton
        label={"Continuer l'achat"}
        link={'APPROOT'}
        />
        
    </View>
  )
}

export default OrderSucceed

const styles = StyleSheet.create({
  header : {
    fontSize: mediumSize,
    color: black,
    fontFamily: 'InterBold',
    marginBottom: 20, 
    textAlign : 'center'
  },
  label: {
    color: black,
    fontSize: smallSize,
    fontFamily: 'Inter',
    marginTop: 10,
    textAlign : 'center'
  },
});