import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import StepIndicator from 'react-native-step-indicator';
import { black, blackBg, blackLight, blue, deviceWith, grey, smallSize, primary, white, secondary } from '../../../../../assets/styles/variables';
import OrderProductCard from '../../Components/OrderProductCard';
import DashedLine from 'react-native-dashed-line';
import { useSelector } from 'react-redux'; 
const labels = ["Préparation","En cours de Liv.","Livrée","Annulée"];


const product1 = require('../../../../../assets/images/Electro/61f6e0b1512f7.jpeg');
const product2 = require('../../../../../assets/images/Electro/61f743260bb45.jpeg');

const _data = [
  {
    title : 'ORDINATEUR MACBOOK ORDINATEUR MACBOOK ORDINATEUR MACBOOK ORDINATEUR MACBOOK',
    price : 900,
    image :  product1,
    id :  0
  },
  {
    title : 'ORDINATEUR MACBOOK',
    price : 900,
    image :  product2,
    id :  1
  }
]

function OrderDetails({navigation}) {
  const {navigate} = useNavigation();
  const [currentPosition, setPosition] = useState(3)
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);

  function onPageChange(position){
    setPosition(position);
  }

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: mode === 'dark'? secondary :primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: mode === 'dark'? secondary :primary,
    stepStrokeUnFinishedColor: mode === 'dark'? secondary :primary,
    separatorFinishedColor: mode === 'dark'? secondary :primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: mode === 'dark'? secondary :primary,
    stepIndicatorUnFinishedColor: white,
    stepIndicatorCurrentColor: white,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: mode === 'dark'? secondary :primary,
    stepIndicatorLabelFinishedColor: white,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: mode === 'dark'? secondary :primary,
    labelFontFamily: 'Inter'
  }
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ? blackBg : white}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Commande #SDG1345KJD'}
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

          <StepIndicator
              stepCount = {4}
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
          />

           <View style ={{
             marginVertical : 15
           }}>
            <View
            style = {{
              marginBottom : 10
            }}
            >
            <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Les produits :</Text>

            {_data.map((p, index) => (
                    <OrderProductCard
                    key = {index}
                    image = {p.image}
                    title = {p.title}
                    price = {p.price}
                    />
            ))}
            </View>
            

            <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Détails de livraison :</Text>
            <View
            style = {{
              borderRadius: 10,
              borderWidth : 1,
              borderColor : grey,
              padding : 15,
              marginBottom : 25,
              backgroundColor : mode === 'dark' ? white : 'transparent'
            }}
            >


                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'Inter'
                    }}
                    >
                        Ville
                    </Text>

                    <Text
                    style = {styles.value}
                    numberOfLines={1}
                    >
                        Casablanca
                    </Text>
                </View>

                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'Inter'
                    }}
                    >
                        Adresse
                    </Text>

                    <Text
                    style = {styles.value}
                    numberOfLines={1}
                    >
                        Blvard 2 mars, Cinéma casa
                    </Text>
                </View>

            </View>

            <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Détails du paiement :</Text>
            <View
            style = {{
              borderRadius: 10,
              borderWidth : 1,
              borderColor : grey,
              padding : 15,
              backgroundColor : mode === 'dark' ? white : 'transparent'
            }}
            >


                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'Inter'
                    }}
                    >
                        Articles (2)
                    </Text>

                    <Text
                    style = {styles.value}
                    numberOfLines={1}
                    >
                        598 MAD
                    </Text>
                </View>

                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'Inter'
                    }}
                    >
                        Côut Livraison
                    </Text>

                    <Text
                    style = {styles.value}
                    numberOfLines={1}
                    >
                       10 MAD
                    </Text>
                </View>

                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'Inter'
                    }}
                    >
                        Autre taxe
                    </Text>

                    <Text
                    style = {styles.value}
                    numberOfLines={1}
                    >
                       0.0 MAD
                    </Text>
                </View>

                <View
                style = {{
                    paddingVertical : 15
                }}
                >
                    <DashedLine dashLength={1}
                      dashColor={grey}
                      />
                </View>

                <View
                style = {{
                    flexDirection : 'row',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}
                >
                  <Text
                    style = {{
                        fontSize : smallSize,
                        fontFamily : 'InterBold'
                    }}
                    >
                        Total
                    </Text>

                    <Text
                    style = {{
                      fontSize : smallSize,
                      fontFamily : 'InterBold'
                  }}
                    numberOfLines={1}
                    >
                       608.00 MAD
                    </Text>
                </View>

            </View>
          </View>

          </View>
        
        </ScrollView>
    </View>
  )

}

export default OrderDetails

const styles = StyleSheet.create({
  header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'InterBold',
    marginBottom : 15
  },
  seemore : {
    fontFamily: 'Inter',
    fontSize: smallSize,
    color: blackLight,
    width : 30,
    flexDirection :'row',
    justifyContent : 'flex-end'
},

value : {
    fontFamily: 'Inter',
    fontSize: smallSize,
    color: blackLight,
    maxWidth : deviceWith / 2
},
})
