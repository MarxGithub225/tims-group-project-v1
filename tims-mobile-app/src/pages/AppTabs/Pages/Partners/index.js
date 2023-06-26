import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect }  from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import { greyLight,  smallSize, white, black, blackBg, blackLight, deviceWith } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 


const product1 = require('../../../../../assets/images/Electro/61f6e0b1512f7.jpeg');
const product2 = require('../../../../../assets/images/Electro/61f743260bb45.jpeg');
const product3 = require('../../../../../assets/images/Electro/61f87f4e45e18.jpeg');
const product4 = require('../../../../../assets/images/Electro/61fc18e09909c.jpeg');
const product5 = require('../../../../../assets/images/Electro/61fe866b05158.jpeg');
const product6 = require('../../../../../assets/images/Electro/61fe89057e8fc.jpeg');
const product7 = require('../../../../../assets/images/Electro/61fe99863f59f.jpeg');
const product8 = require('../../../../../assets/images/Electro/61feaa20112a3.jpeg');
const product9 = require('../../../../../assets/images/Electro/61feaf72f36cd.jpeg');

const _brand = [
  {
    title: "Adidas",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/adidas.png')
  },
  {
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
  {
    title: "Puma",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/puma.png')
  },{
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
  {
    title: "Adidas",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/adidas.png')
  },
  {
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
  {
    title: "Puma",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/puma.png')
  },{
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
  {
    title: "Adidas",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/adidas.png')
  },
  {
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
  {
    title: "Puma",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require('../../../../../assets/brands/puma.png')
  },{
    title: "Nike",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require('../../../../../assets/brands/nike.png'),
  },
  {
    title: "Fila",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require('../../../../../assets/brands/fils.png'),
  },
];
function Partners({navigation}) {
  const {navigate} = useNavigation();

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg :white}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        back = {true}
        title = {'Nos partenaires'}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
         <View style = {
           {
             paddingVertical : 15,
             flexDirection : 'row',
             alignItems : 'center',
             flexWrap : 'wrap'
           }
         }
         >
            {
              _brand.map((item, index) => (
                <TouchableOpacity style={styles.container} key={index}
                onPress={() => navigate('BRANDROOT')}
                >
                  <View style={[styles.content, {backgroundColor : mode === 'dark' ?  '#222E34' : greyLight}]}>
                    <View style={[styles.imageContent, {backgroundColor : mode === 'dark' ?  '#29363D' : greyLight}]}>
                      <Image
                        source={item.imgUrl}
                        style={styles.image}
                      />
                    </View>
                    <Text style={[styles.header, {color : mode === 'dark' ?  white : '#222'}]}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
         </View>

      
         
        </ScrollView>
    </View>
  )

}

export default Partners

const styles = StyleSheet.create({
  partners : {
    fontWeight: '500',
    color: black,
    fontFamily: 'Inter'
  },
  seemore : {
    fontWeight: '200',
    fontSize: smallSize,
    color: blackLight,
    fontFamily: 'Inter'
  },
  container: {
   width : deviceWith / 2,
   padding: 15,
   
  },
  content : {
    flexDirection : 'row',
    alignItems : 'center',
    backgroundColor :  greyLight,
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius : 10
  },
  imageContent : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : white,
    padding : 5,
    borderRadius : 10
  },
  image: {
    width: 30,
    height: 30,
    resizeMode : 'contain',
  },
  header: {
    color: "#222",
    fontSize: smallSize,
    fontWeight: '500',
    marginLeft: 11,
    fontFamily: 'Inter'
  }
})
