import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import ProductList from '../../Components/ProductList';
import { useSelector } from 'react-redux'; 
import { white, blackBg } from '../../../../../assets/styles/variables';

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
function Brand({navigation}) {
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
        title = {<Image source={imgUrl} style ={{width : 30, height: 30, resizeMode : 'contain'}} />}
        back = {true}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >

          <ProductList
          type = {'best-product'}
          seemore = {false}
          max = {10000000000000000000000000000}
          data = {_data}
          />
        </ScrollView>
    </View>
  )

}

export default Brand

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    backgroundColor: white,
    position: "relative",
    height: 50,
    zIndex: 10,
  },
  headerText: {
    color: "#444",
  },
  searchBarWrap: {
    backgroundColor: "#434a5d",
    paddingHorizontal: 12,
    justifyContent: "center",
    height: 45,
  },
  item: {
    backgroundColor: "#716f25",
    padding: 20,
    marginTop: 4,
    marginHorizontal: 4,
  },
  whiteText: {
    color: white,
  },
})
