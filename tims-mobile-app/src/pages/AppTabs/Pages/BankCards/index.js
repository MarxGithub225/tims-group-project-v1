import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { black, blackLight, danger, deviceHeight, deviceWith, grey, greyLight,  primary, secondary, smallSize, white, blackBg } from '../../../../../assets/styles/variables';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { CreditCardInput } from '../../../../common/Bank';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Buttons from '../../../../common/Buttons';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';

const BankBg1 = require('../../../../../assets/images/bankImage1.png');
const BankBg2 = require('../../../../../assets/images/bankImage2.png');
const DevileryPaid = require('../../../../../assets/icons/DeliveryPaid.png');

const SLIDER_WIDTHBASE = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTHBASE;
const SLIDER_WIDTH = Dimensions.get('window').width;

function BankCards({navigation}) {
  const {navigate} = useNavigation();
  const isCarousel = useRef(null)
  const [activeSlide, setActive] = useState(0);
  
  const [isSwitchOn, setIsSwitchOn] = React.useState(false); 

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const _onChange = (formData) => console.log('cgang', JSON.stringify(formData, null, " "));
  const _onFocus = (field) => console.log("focusing", field);

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);
  const PaginationRender = () => {
    return (
        <Pagination
          dotsLength={6}
          activeDotIndex={activeSlide}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backgroundColor : mode === 'dark' ?  secondary :primary
          }}
          inactiveDotStyle={{
              backgroundColor : mode === 'dark' ?  primary :secondary
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

  const Cards = ({item, index}) => {
    if(item === 0) {
      return <View style = {{
        position : 'relative',
        flexDirection : 'row',
        justifyContent : 'center'
      }}>
        <View style = {{
          borderWidth : 2,
          borderColor : greyLight,
          width : deviceWith / 1.2,
          height : deviceHeight / 4.25,
          borderRadius : 10,
          padding: 15,
          flexDirection : 'column',
          justifyContent : 'center',
          alignItems : 'center',
          backgroundColor : mode === 'dark' ?  white : 'transparent'
        }}>
          <Image
          source={DevileryPaid}
          style = {{
            width : deviceWith / 3,
            height : deviceHeight / 7,
            resizeMode : 'contain'
          }}
          />
          <Text style = {styles.header2}>Payement à la livraison</Text>
        </View>
        <View
        style = {{
          position : 'absolute',
          top : 15,
          left : 45
        }}
        >
          <FontAwesome name='check' size={35} color={'#4AC76D'} />
        </View>
      </View>
    }
    return <View
    style = {{
      position : 'relative'
    }}
    > 
   
    <CreditCardInput
    labels = { {number: "NUMERO DU COMPTE", expiry: "EXP.", cvc: "CVC/CCV", name : 'TITULAIRE DU COMPTE'} }
    cardFontFamily = 'Inter'
    requiresName 
    requiresCVC
    cardImageFront = {index%2 === 0 ? BankBg1 : BankBg2}
    cardScale={1.0}
    labelStyle={styles.bankCard.label}
    validColor={black}
    invalidColor={danger}
    placeholderColor={grey}
    allowScroll = {true}
    onFocus={_onFocus}
    onChange={_onChange} 
    showInput = {false}
    clickable = {true}
    defaultValue = {{
      number :  "4242 4242",
      expiry :  "06/19",
      cvc :  "300",
      type :  "visa",
      name :  "Sam"
    }}
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

<View
        style = {{
          position : 'absolute',
          top : 15,
          left : 45
        }}
        >
          <FontAwesome name='check' size={35} color={'#4AC76D'} />
        </View>
    </View>
  }
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg : white, position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Paiement'}
        />


       <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
       >
        <View style = {{
            padding : 15,
            marginBottom: 35
          }}>

            <View >
                <Text style = {[styles.header, {color : mode === 'dark' ?  white : black}]}>Choisir une carte :</Text>
                <Carousel
                  ref={isCarousel}
                  data={[0, 1, 2, 3, 4, 5]}
                  renderItem={Cards}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  activeSlideAlignment={'start'}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  onSnapToItem={(index) => setActive(index ) }
                />
                <PaginationRender/>
            </View>

            <View 
            style = {{
              flexDirection : 'row',
              justifyContent : 'center'
            }}
            >
              <Buttons
                  value = {<Text style = {{flexDirection : 'row',alignItems : 'center'}} > <Text> <Ionicons name='add-circle-outline' size={25} /></Text>  <Text>Ajouter une nouvelle carte</Text></Text>}
                   color = {black}
                   background = {mode === 'dark' ?  '#FCE0A7' :'#FFE0E6'}
                   size={smallSize}
                   border =  {true}
                  borderColor =  {mode === 'dark' ?  secondary :primary}
                  borderWidth =  {2}
                  onclik = {() => navigate('BANKCARDSFORMROOT')}
                  />
            </View>

            
           
          </View>
       </ScrollView>

       
        
    </View>
  )
}

export default BankCards

const styles = StyleSheet.create({
  header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'InterBold',
    marginBottom: 20
  },
  header2 : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'Inter',
    marginBottom: 20
  },
  bankCard : {
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
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