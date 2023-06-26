import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { black, blackBg, blackLight, grey, greyLight, mediumSize,  primary, smallSize, white } from '../../../../../assets/styles/variables';
import HorizontalProductCard from '../../Components/HorizontalProductCard';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'; 
import ValidateButton from '../../Components/ValidateButton';

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

function Cart({navigation}) {
  const {navigate} = useNavigation();

  const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg :'#FEFEFE', position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {'Panier'}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
         
        <View  style = {{
            padding : 15
        }}>
                {_data.map((p, index) => (
                    <HorizontalProductCard
                    key = {index}
                    image = {p.image}
                    title = {p.title}
                    price = {p.price}
                    />
                ))}

                <View  style = {{
                    marginTop : 20
                }}>
                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 15
                    }}>
                    <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Adresse de livraison</Text>
                    <TouchableOpacity style = {styles.seemore}
                    onPress={() => navigate('ADDRESSESROOT')}
                    >
                        <Ionicons size={30} color={mode === 'dark' ? white : black}  name='chevron-forward-outline'  />
                    </TouchableOpacity>
                    </View>  

                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center'
                    }}>
                        <View
                        style = {{
                            flexDirection : 'row',
                            alignItems : 'center'
                        }}
                        >
                            <Image source={require('../../../../../assets/icons/Location.png')}/>
                            <View
                            style = {{
                                flexDirection : 'column',
                                marginLeft : 15
                            }}
                            >
                                <Text style = {[styles.address, {color : mode === 'dark' ? white : black}]} numberOfLines={1}>
                                Dokui, Abidjan
                                </Text>

                                <Text style = {[styles.city, {color: mode === 'dark' ? grey : black}]}>
                                Côte d'Ivoire
                                </Text>
                            </View>
                        </View>

                        <Ionicons name='checkmark-circle' color={'#4AC76D'} size={30} />
                    </View>  
                </View>

                <View  style = {{
                    marginTop : 20
                }}>
                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 15
                    }}>
                    <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Mode de paiement</Text>
                    <TouchableOpacity style = {styles.seemore}
                    onPress={() => navigate('BANKCARDSROOT')}
                    >
                        <Ionicons size={30} color={mode === 'dark' ? white : black} name='chevron-forward-outline'  />
                    </TouchableOpacity>
                    </View>  

                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center'
                    }}>
                        <View
                        style = {{
                            flexDirection : 'row',
                            alignItems : 'center'
                        }}
                        >
                            <Image source={require('../../../../../assets/icons/Visa.png')}/>
                            <View
                            style = {{
                                flexDirection : 'column',
                                marginLeft : 15
                            }}
                            >
                                <Text style = {[styles.address, {color : mode === 'dark' ? white : black}]} numberOfLines={1}>
                                Visa Card
                                </Text>
                                <Text style = {[styles.city, {color: mode === 'dark' ? grey : black}]}>
                                **** **** **** 7690
                                </Text>
                            </View>
                        </View>

                        <Ionicons name='checkmark-circle' color={'#4AC76D'} size={30} />
                    </View>  
                </View>

                <View  style = {{
                    marginTop : 20
                }}>
                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 15
                    }}>
                    <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>Détails de la commande : </Text>
                    
                    </View>  

                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 15
                    }}>
                    <Text style = {styles.detailsLabel}>Sous total : </Text>
                    <Text style = {[styles.detailsValue, {color : mode === 'dark' ? white : black}]}>
                        99 MAD
                    </Text>
                    </View>  

                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 15
                    }}>
                    <Text style = {styles.detailsLabel}>Côut de livraison : </Text>
                    <Text style = {[styles.detailsValue, {color : mode === 'dark' ? white : black}]}>
                        99 MAD
                    </Text>
                    </View>  

                    <View style = {{
                        flexDirection : 'row',
                        justifyContent : 'space-between',
                        alignItems : 'center',
                        marginBottom: 65
                    }}>
                    <Text style = {styles.detailsLabel}>Total : </Text>
                    <Text style = {[styles.detailsValue, {color : mode === 'dark' ? white : black}]}>
                        99 MAD
                    </Text>
                    </View>  
                </View>

                <View>
                    
                </View>

        </View>
            
        </ScrollView>

        <ValidateButton
        label={'Acheter'}
        link={'ORDERSUCCEEDFORMROOT'}
        />
    </View>
  )

}

export default Cart

const styles = StyleSheet.create({
      header : {
        fontSize: smallSize,
        color: black,
        fontFamily: 'InterBold'
      },
      seemore : {
        fontWeight: '400',
        color: blackLight,
        width : 50,
        flexDirection :'row',
        justifyContent : 'flex-end'
      },
      detailsLabel : {
        fontFamily: 'Inter',
        color: blackLight
      },
      detailsValue : {
        fontFamily: 'InterBold',
        fontSize: smallSize,
        color: black
      },
      address : {
        fontSize: mediumSize,
        color: black,
        textTransform : 'capitalize',
        marginBottom: 5,
        fontFamily: 'Inter'
      },
      city : {
        fontSize: smallSize,
        color: blackLight,
        fontFamily: 'Inter'
      },
})
