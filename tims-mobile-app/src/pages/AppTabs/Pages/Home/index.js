import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CustomText from '../../../../common/Text';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import HomeBrandSlider from '../../Components/HomeBrandSlider';
import HomeSearch from '../../Components/HomeSearch';
import ProductList from '../../Components/ProductList';
import { bigSize, blackLight, mediumSize,  white, blackBg, black } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 

const product1 = require('../../../../../assets/images/Electro/full_product.jpeg');
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
    title : 'Lunettes Anti-rayons Bleu - beautyshoes-SEA-COD',
    price : 900,
    image :  product1
  },
  {
    id : 1,
    title : 'Téléphone Samsung A10',
    price : 900,
    image :  product2
  },
  {
    id : 2,
    title : 'Marmite automatique',
    price : 900,
    image :  product3
  },
  {
    id : 3,
    title : 'Ordinateur portable Asus',
    price : 900,
    image :  product4
  },
  {
    id : 4,
    title : 'Fer à repasser ultra',
    price : 900,
    image :  product5
  },
  {
    id : 5,
    title : 'Headset 2.4 head of taken two',
    price : 900,
    image :  product6
  },
  {
    id : 6,
    title : 'Hp Noir 2G - 500G',
    price : 900,
    image :  product7
  },
  {
    id : 7,
    title : 'Boîte à café Expresso',
    price : 900,
    image :  product8
  },
  {
    id : 8,
    title : 'Téléphone slim',
    price : 900,
    image :  product9
  },
]

const deviceWith = Dimensions.get('window').width;
function Home({navigation}) {
  const {navigate} = useNavigation();
  const [showSearch, setSearch] = useState(false)
  
  function handleScroll(event) {
   if(event.nativeEvent.contentOffset.y > 150) {
    setSearch(true)
   }else {
    setSearch(false)
   }
  }

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor : white}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {showSearch}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        onScroll={handleScroll}
        scrollEventThrottle={1}
        >
          <View style={{ paddingHorizontal : 15 }}>
          <CustomText
            value = {`Salut Marx`}
            fontWeight={'600'}
            fontSize = {mediumSize}
            color={mode === 'dark' ? white : black}
            />

            <CustomText
              value = {`Bienvenue chez TIM'S.`}
              fontWeight={'400'}
              color={blackLight}
              />

              <View style = {{marginTop: 20}}>
                <HomeSearch/>
              </View>
          </View>
        
          <HomeBrandSlider/>
          <View><ProductList
          header = {'Nouveautés'}
          type = {'new-product'}
          seemore = {true}
          data = {_data}
          link = {'NEWPRODUCTSROOT'}
          />

          <ProductList
          header = {'Meilleurs produits'}
          type = {'best-product'}
          seemore = {true}
          data = {_data}
          link = {'BESTSPRODUCTSROOT'}
          />

          <ProductList
          header = {'Les plus consultés'}
          type = {'best-product'}
          seemore = {false}
          max = {10000000000000000000000000000}
          data = {_data}
          />

          </View>
        </ScrollView>
    </View>
  )

}

export default Home

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
