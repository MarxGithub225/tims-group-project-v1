import { Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { black, blackBg, blackLight, deviceHeight, deviceWith, grey, greyLight, mediumSize, miniSize, smallSize, white } from '../../../../../assets/styles/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; 
const data = [
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

const SLIDER_WIDTHBASE = Dimensions.get('window').width / 2.4
const ITEM_HORIZONTAL_MARGIN = 15;
const ITEM_WIDTH = SLIDER_WIDTHBASE/1.3;
const SLIDER_WIDTH = Dimensions.get('window').width;
export default function HomeBrandSlider (props) {

  const theme = useSelector(state => state.theme);
      const [mode, setMode] = useState(theme.mode);
      useEffect(() => { 
              setMode(theme.mode);
        }, [theme]);

    const {navigate} = useNavigation()
    const isCarousel = useRef(null)
    const CarouselCardItem = ({ item, index }) => {
        return (
          <TouchableOpacity style={styles.container} key={index}
          onPress={() => navigate('BRANDROOT')}
          >
            <View style={[styles.content, {backgroundColor : mode === 'dark' ?  '#222E34' : grey}]}>
              <View style={[styles.imageContent, {backgroundColor : mode === 'dark' ?  '#222E34' : grey}]}>
                <Image
                  source={item.imgUrl}
                  style={styles.image}
                />
              </View>
              <Text style={[styles.header, {color : mode === 'dark' ?  white : '#222'}]}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )
      }

    return (
        <View style = {{
          padding : 15
        }}>
          <View style = {{
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            paddingVertical : 15
          }}>
           <Text style = {[styles.partners, {color : mode === 'dark' ? white : black}]}>Nos partenaires</Text>
           <TouchableOpacity onPress={() => navigate('PARTNERSROOT')}>
           <Text 
          
           style = {[styles.seemore, {color : mode === 'dark' ? white : blackLight}]}>Voir tout</Text>
           </TouchableOpacity>
          </View>
        <Carousel
            ref={isCarousel}
            data={data}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
        />
     </View>
    );
    
}

const styles = StyleSheet.create({
    partners : {
      fontWeight: '500',
      fontSize: smallSize,
      color: black,
      fontFamily: 'InterBold'
    },
    seemore : {
      fontWeight: '200',
      fontSize: miniSize,
      color: blackLight,
      fontFamily: 'Inter'
    },
    container: {
     paddingRight : 4
    },
    content : {
      flexDirection : 'row',
      alignItems : 'center',
      backgroundColor :  grey,
      height: 40,
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius : 5
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
      width: deviceWith/15,
      height: deviceHeight/15,
      resizeMode : 'contain',
    },
    header: {
      color: "#222",
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 11,
      fontFamily: 'Inter'
    }
  })

