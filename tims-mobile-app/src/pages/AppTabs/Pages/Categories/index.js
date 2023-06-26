import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'; 
import { Dimensions, StyleSheet, View, ImageBackground, Text, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import ProductCard from '../../Components/ProductCard';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useRef } from 'react';
import Buttons from '../../../../common/Buttons';
import { bigSize, mediumSize,  primary, secondary, smallSize, white, blackBg, greyLight, black, grey, deviceWith, miniSize } from '../../../../../assets/styles/variables';
import DashedLine from 'react-native-dashed-line';

const _categories = [
  {
    category : 'électronique',
    subCategories : [
      {
        label : 'Téléphone android',
        image : require('../../../../../assets/images/Category/Electronique/telephone-android.png')
      },
      {
        label : 'Iphone',
        image : require('../../../../../assets/images/Category/Electronique/iphone.png')
      },
      {
        label : 'Tablettes',
        image : require('../../../../../assets/images/Category/Electronique/tablettes.png')
      },
      {
        label : 'Téléphone à touches',
        image : require('../../../../../assets/images/Category/Electronique/telephone-touches.png')
      },
      {
        label : 'Téléphones fixes',
        image : require('../../../../../assets/images/Category/Electronique/telephones-fixes.png')
      },
      {
        label : 'Accessoires téléphoniques',
        image : require('../../../../../assets/images/Category/Electronique/accessoires-telephoniques.png')
      },
      {
        label : 'Montres connectées',
        image : require('../../../../../assets/images/Category/Electronique/montres-connectees.jpeg')
      },
      {
        label : 'Ordinateurs portables',
        image : require('../../../../../assets/images/Category/Electronique/ordinateurs-portables.png')
      },
      {
        label : 'Ordinateurs de bureau',
        image : require('../../../../../assets/images/Category/Electronique/ordinateurs-bureau.png')
      },
      {
        label : 'Imprimantes et Scanners',
        image : require('../../../../../assets/images/Category/Electronique/imprimantes-scanners.png')
      },
      {
        label : 'Accessoires informatiques',
        image : require('../../../../../assets/images/Category/Electronique/accessoires-informatiques.png')
      },
      {
        label : 'Télévisions',
        image : require('../../../../../assets/images/Category/Electronique/televisions.png')
      },
      {
        label : 'Audio et Hi-fi',
        image : require('../../../../../assets/images/Category/Electronique/audio-hifi.png')
      },
      {
        label : 'Projecteurs',
        image : require('../../../../../assets/images/Category/Electronique/projecteurs.png')
      },
      {
        label : 'Modems et Routeurs',
        image : require('../../../../../assets/images/Category/Electronique/modems-routeurs.png')
      },
      {
        label : 'Caméras de surveillance',
        image : require('../../../../../assets/images/Category/Electronique/cameras-surveillance.png')
      },
      {
        label : 'Accessoires électronique',
        image : require('../../../../../assets/images/Category/Electronique/accessoires-electroniques.png')
      },
      {
        label : 'Consoles & Jeux',
        image : require('../../../../../assets/images/Category/Electronique/consoles-jeux.png')
      }
    ]
  },
  {
    category : 'électroménager',
    subCategories : [
      {
        label : 'Refrigérateurs',
        image : require('../../../../../assets/images/Category/Electromenager/refrigerateurs.png')
      },
      {
        label : 'Congelateur',
        image : require('../../../../../assets/images/Category/Electromenager/congelateur.png')
      },
      {
        label : 'Climatiseurs',
        image : require('../../../../../assets/images/Category/Electromenager/climatiseurs.png')
      },
      {
        label : 'Bouilloires',
        image : require('../../../../../assets/images/Category/Electromenager/bouilloires.png')
      },
      {
        label : 'Café & Expresso',
        image : require('../../../../../assets/images/Category/Electromenager/cafe-expresso.png')
      },
      {
        label : 'Robots de cuisine',
        image : require('../../../../../assets/images/Category/Electromenager/robots-cuisine.png')
      },
      {
        label : 'Mixeurs et Blendeurs',
        image : require('../../../../../assets/images/Category/Electromenager/mixeurs-blendeurs.png')
      },
      {
        label : 'Micro-ondes',
        image : require('../../../../../assets/images/Category/Electromenager/micro-ondes.png')
      },
      {
        label : 'Machine à laver',
        image : require('../../../../../assets/images/Category/Electromenager/machine-a-laver.png')
      },
      {
        label : 'Lave vaisselle',
        image : require('../../../../../assets/images/Category/Electromenager/lave-vaisselle.png')
      },
      {
        label : 'Friteuses',
        image : require('../../../../../assets/images/Category/Electromenager/friteuses.png')
      },
      {
        label : 'Fours',
        image : require('../../../../../assets/images/Category/Electromenager/fours.png')
      },
      {
        label : 'Fers à repasser',
        image : require('../../../../../assets/images/Category/Electromenager/fers-a-repasser.png')
      },
      {
        label : 'Cuisinière',
        image : require('../../../../../assets/images/Category/Electromenager/cuisiniere.png')
      },
      {
        label : 'Aspirateurs',
        image : require('../../../../../assets/images/Category/Electromenager/aspirateurs.png')
      }
    ]
  },
  {
    category : 'Mode',
    subCategories : [
      {
        label : 'Vêtements femme',
        image : require('../../../../../assets/images/Category/Mode/vetement_femme.png')
      },
      {
        label : 'Vêtements homme',
        image : require('../../../../../assets/images/Category/Mode/vetement_homme.png')
      },
      {
        label : 'Chaussures femme',
        image : require('../../../../../assets/images/Category/Mode/chaussure_femme.png')
      },
      {
        label : 'Chaussures homme',
        image : require('../../../../../assets/images/Category/Mode/chaussure_homme.png')
      },
      {
        label : 'Bijoux femme',
        image : require('../../../../../assets/images/Category/Mode/bijoux_femme.png')
      },
      {
        label : 'Bijoux homme',
        image : require('../../../../../assets/images/Category/Mode/bijoux_homme.png')
      },
      {
        label : 'Sacs à main',
        image : require('../../../../../assets/images/Category/Mode/sac_a_main.png')
      },
      {
        label : 'Pour bébé',
        image : require('../../../../../assets/images/Category/Mode/mode_bebe.png')
      },
    ]
  }
]
function Categories({navigation}) {

const {navigate} = useNavigation();

const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ? blackBg : grey}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        title = {'Catégories'}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
         <View style = {{
           padding: 15,
         }}>

           {
             _categories.map((cat, index) => (
               <View
               key={index}
               style = {{
                  paddingVertical : 15,
                  padding : 5,
                  shadowColor: "#000000",
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1,

                  elevation: 1,
                  width : '100%',
                  backgroundColor : mode === 'dark' ? blackBg : white,
                  marginBottom : 25
               }}
               >
                 <View
                 style = {{
                   flexDirection : 'row',
                   alignItems : 'center',
                   paddingVertical : 5, 
                   justifyContent : 'space-between',
                   paddingHorizontal : 10
                 }}
                 > 

                 <Text
                 style = {{
                   color : mode === 'dark' ? white : black,
                   fontSize : smallSize,
                   textTransform : 'uppercase',
                   fontFamily : 'InterBold'
                 }}
                 >{cat.category}</Text>

                 <TouchableOpacity onPress={() => navigate('CATEGORIESSROOT')} >
                  <Text
                  style = {{
                    color : mode === 'dark' ? secondary : primary,
                    fontSize : miniSize,
                    textTransform : 'uppercase',
                    fontFamily : 'Inter'
                  }}
                  >Voir tout</Text>

                 </TouchableOpacity>

                 </View>

                 <View
                style = {{
                    paddingVertical : 5
                }}
                >
                  <DashedLine dashLength={1}
                    dashColor={grey}
                    />
                </View>

                <View
                   style = {{
                    flexDirection : 'row',
                    justifyContent: 'space-between',
                    alignItems : 'center',
                    flexWrap : 'wrap'
                  }}
                   >
                     {cat.subCategories.map((sub, key) => (
                        <TouchableOpacity
                        onPress={() => navigate('CATEGORIESSROOT')}
                        key={key}
                        style = {{
                          width : deviceWith / 2.5,
                          paddingVertical : 2,
                          paddingHorizontal : 5,
                          marginBottom: 10
                        }}
                        >
                          <Image
                          source={sub.image}
                          style = {{
                            width : '100%',
                            height : 90,
                            resizeMode : 'contain'
                          }}
                          />
                        
                          <Text
                          numberOfLines={1}
                            style = {{
                              color : mode === 'dark' ? white : black,
                              fontSize : 12,
                              fontFamily : 'Inter',
                              textAlign : 'center'
                            }}
                            >{sub.label}</Text>
                        </TouchableOpacity>
                      ))}
                   </View>
                 
               </View>
             ))
           }
        </View>
         
        </ScrollView>
    </View>
  )

}

export default Categories

const styles = StyleSheet.create({
  image: {
    position : 'relative',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    marginVertical: 15
  },
  overlay : {
    position : 'absolute',
    top : 0,
    left: 0,
    width : '100%',
    height : 120,
    backgroundColor : 'rgba(0,0,0,.5)',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  title : {
    fontFamily : 'Inter',
    fontSize : mediumSize,
    color : white,
    textTransform : 'uppercase'
  }
})
