import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import ProductList from '../../Components/ProductList';
import { black, blackBg, blackLight,  smallSize, white } from '../../../../../assets/styles/variables';

import { useSelector } from 'react-redux'; 
import { Ionicons } from '@expo/vector-icons';
import BottomModal from '../../Components/BottomModal';
const imgUrl = require('../../../../../assets/brands/adidas.png')
const product1 = require('../../../../../assets/images/Electro/61f6e0b1512f7.jpeg');
const product2 = require('../../../../../assets/images/Electro/61f743260bb45.jpeg');
const product3 = require('../../../../../assets/images/Electro/61f87f4e45e18.jpeg');
const product4 = require('../../../../../assets/images/Electro/61fc18e09909c.jpeg');
const product5 = require('../../../../../assets/images/Electro/61fe866b05158.jpeg');
const product6 = require('../../../../../assets/images/Electro/61fe89057e8fc.jpeg');
const product7 = require('../../../../../assets/images/Electro/61fe99863f59f.jpeg');
const product8 = require('../../../../../assets/images/Electro/61feaa20112a3.jpeg');
const product9 = require('../../../../../assets/images/Electro/61feaf72f36cd.jpeg');

const _data = [
  {
    id : 0,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product1
  },
  {
    id : 1,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product2
  },
  {
    id : 2,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product3
  },
  {
    id : 3,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product4
  },
  {
    id : 4,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product5
  },
  {
    id : 5,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product6
  },
  {
    id : 6,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product7
  },
  {
    id : 7,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product8
  },
  {
    id : 8,
    title : 'Ordinateur macBook',
    price : 900,
    image :  product9
  },
]

const deviceWith = Dimensions.get('window').width;
function AllProducts(props) {
  const modal = [];
  const {navigate} = useNavigation();
  const [showSearch, setSearch] = useState(false)
  
  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);

    const title = () => {
      switch (props.route.name) {
        case 'WISHROOT':
          return 'Mes favoris';
          break;

        case 'Favories':
          return 'Mes favoris';
          break;

        case 'NEWPRODUCTSROOT':
          return 'Nouveautés';
          break;

          case 'BESTSPRODUCTSROOT':
            return 'Meilleurs produits';
            break;

          case 'CATEGORIESSROOT':
            return 'Electronique';
            break;

        default:
          return ''
          break;
      }
    }
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ? blackBg : white}}>
        {props.route.name === 'Favories' ? <AppHeader
        navigationProps={props.navigation}
        title = {<Text>{title()}</Text>}
        /> : 
        
        <AppHeader
        navigationProps={props.navigation}
        showSearch = {false}
        back = {true}
        title = {<Text>{title()}</Text>}
        />}

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
          <View style = {{
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            marginVertical: 15,
            paddingHorizontal : 15
          }}>

           <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>254 Articles</Text>
           <TouchableOpacity onPress={() => modal[0].openModal()}
           style = {{
            flexDirection : 'row',
            alignItems : 'center',
            borderRadius : 10,
            padding : 5,
            backgroundColor : mode === 'dark' ? '#222E34' : 'transparent',
          }}
           >
           <Text style = {[styles.seemore, {color : mode === 'dark' ? white : blackLight}]}> <Ionicons name='filter-outline' size={25} /></Text>
           <Text style = {[styles.seemore, {color : mode === 'dark' ? white : blackLight}]}> Filtrer</Text>
           </TouchableOpacity>
        </View>
          <ProductList
          type = {'best-product'}
          seemore = {false}
          max = {10000000000000000000000000000}
          data = {_data}
          />
        </ScrollView>

        <BottomModal
        navigationProp ={props.navigation}
        type = {'filter'}
        ref={el => {
          modal[0] = el;
        }}
        />
    </View>
  )

}

export default AllProducts

const styles = StyleSheet.create({
  header : {
    fontSize: smallSize,
    color: black,
    fontFamily: 'InterBold'
  },
  seemore : {
    fontWeight: '200',
    fontSize: smallSize,
    color: blackLight,
    fontFamily: 'Inter'
  },
})
