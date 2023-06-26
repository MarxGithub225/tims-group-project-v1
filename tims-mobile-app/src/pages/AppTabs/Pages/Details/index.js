import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AppHeader from '../../Components/HomeHeader/AppHeader';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useRef } from 'react';
import ReadMore from 'react-native-read-more-text';
import Rate from '../../Components/Rate';
import { black, blackLight, greyLight,  primary, smallSize, white, blackBg, secondary, mediumSize } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 
import ValidateButton from '../../Components/ValidateButton';

const SLIDER_WIDTHBASE = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTHBASE;

const SLIDER_WIDTHBASE_OPTION = Dimensions.get('window').width/4
const ITEM_WIDTH_OPTION = SLIDER_WIDTHBASE_OPTION/1.3;

const SLIDER_WIDTH = Dimensions.get('window').width;

const deviceHeight = Dimensions.get('window').height;
const text = 'Qu\'est-ce que le Lorem Ipsum?Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique informatique, sans que son contenu n\'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.Pourquoi l\'utiliser?On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L\'avantage du Lorem Ipsum sur un texte générique comme \'Du texte. Du texte. Du texte.\' est qu\'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour \'Lorem Ipsum\' vous conduira vers de nombreux sites qui n\'en sont encore qu\'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d\'y rajouter de petits clins d\'oeil, voire des phrases embarassantes).D\'où vient-il?Contrairement à une opinion répandue, le Lorem Ipsum n\'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s\'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d\'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l\'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", proviennent de la section 1.10.32.L\'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).';

function Details({navigation}) {
  const isCarousel = useRef(null)
  const isOption = useRef(null)
  const isColor = useRef(null)
  const [activeSlide, setActive] = useState(0);

  const {navigate} = useNavigation();

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
          setMode(theme.mode);
  }, [theme]);
  
  const ProductImages = () => {
    return  <Image
    source={require('../../../../../assets/images/Electro/61fe89057e8fc.jpeg')}
    style = {{
      width: '100%',
      height: deviceHeight / 2.1,
      resizeMode : 'contain'
    }}
    />
  }

  const OptionsItem= ({ item, index }) => {
    return (
      <View style={styles.option} key={index}>

        <View style={item.active ? [styles.optionContentBordered, {borderColor : mode === 'dark' ?  secondary : primary}] : styles.optionContent}>
           <Text style={styles.label}>{item.label}</Text>
        </View>
         
      </View>
    )
  }

  const ColorsItem= ({ item, index }) => {
    return (
      <View style={{
        width : 50,
        height : 50,
        borderRadius : 100,
        backgroundColor : item.color,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
      }} key={index}>

        {item.active && <View style={{
          backgroundColor : white,
          borderRadius : 100,
          width : 15,
          height : 15,
        }}>
           
        </View>}
         
      </View>
    )
  }
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

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: mode === 'dark' ? secondary:primary, marginTop: 5, fontSize: smallSize}} onPress={handlePress}>
        Voir plus
      </Text>
    );
  }
 
  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: mode === 'dark' ? secondary:primary, marginTop: 5, fontSize: smallSize}} onPress={handlePress}>
        Voir moins
      </Text>
    );
  }


  const _handleTextReady = () => {
   
  }
  return (
    <View style={{flex: 1, backgroundColor : mode === 'dark' ?  blackBg : white, position : 'relative', paddingBottom: 30}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        back = {true}
        title = {'Détails'}
        />

        <ScrollView
        showsHorizontalScrollIndicator = {false}
        showsVerticalScrollIndicator = {false}
        >
         

            <View style = {{
              backgroundColor : mode === 'dark' ?  white : 'transparent'
            }}>
                <Carousel
                  ref={isCarousel}
                  data={[0, 1, 2, 3, 4, 5]}
                  renderItem={() => <ProductImages width = '100%' />}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  activeSlideAlignment={'start'}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  onSnapToItem={(index) => setActive(index ) }
                />

                <PaginationRender/>
            </View>
            <View style = {{
              paddingHorizontal : 15,
              paddingBottom : 25
            }}>
            <View style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
              marginTop : mode === 'dark' ?  15 : 0 
            }}>
              <Text style = {{
                fontWeight : '600',
                color : mode === 'dark' ?  white :black,
                width : SLIDER_WIDTH/1.6,
                fontFamily: 'InterBold'
              }}>
                ORDINATEUR MACBOOK
              </Text>

              <View
              style = {{
                flexDirection : 'column',
                justifyContent : 'center',
                alignItems : 'center',
                paddingHorizontal: 15,
              }}
              >
                <Text style = {{
                    fontSize : smallSize,
                    fontWeight : '500',
                    color : blackLight,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    textDecorationColor : blackLight
                }}>
                  299 MAD
                </Text>

                <Text style = {{
                  fontSize : smallSize,
                  fontWeight : '600',
                  color : mode === 'dark' ?  white : black,
                  fontFamily: 'Inter'
                }}>
                  99 MAD
                </Text>
              </View>
            </View>

            <View style = {{
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            marginBottom: 15,
            marginTop : 25
          }}>
            <Text style = {[styles.header, {color: mode === 'dark' ?  white : black}]}>Options :</Text>
            </View>

            <View>
            <Carousel
              ref={isOption}
              data={[{label: 'S', active : true}, {label: 'M', active : false},{label: 'L', active : false}, {label: 'XL', active : false}, {label: '2XL', active : false}, {label: '3XL', active : false}]}
              renderItem={OptionsItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH_OPTION}
              activeSlideAlignment={'start'}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
            />
            </View>

            <View style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
              marginBottom: 15,
              marginTop : 25
            }}>
              <Text style = {[styles.header, {color: mode === 'dark' ?  white : black}]}>Couleurs :</Text>
            </View>

            <View>
              <Carousel
                ref={isColor}
                data={[{color: '#FFC833', active : true}, {color: '#002395', active : false},{color: '#ED2939', active : false}, {color: '#53D1B6', active : false}, {color: '#5C61F4', active : false}, {color: '#223263', active : false}]}
                renderItem={ColorsItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH_OPTION}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />
            </View>


            <View style = {{
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center',
              marginBottom: 15,
              marginTop : 25
            }}>
              <Text style = {[styles.header, {color: mode === 'dark' ?  white : black}]}>Description :</Text>
            </View>

            <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}
                onReady={_handleTextReady}>
                <Text style={{fontSize: smallSize, fontFamily : 'Inter', color : mode === 'dark' ?  greyLight : black}}>
                  {text}
                </Text>
            </ReadMore>
            </View>

            <View
            style = {{
              paddingHorizontal: 15
            }}
            >
             <Rate/>
            </View>
        </ScrollView>


        <ValidateButton
        label={'Ajouter au panier'}
        link={'CARTROOT'}
        />

        
    </View>
  )

}

export default Details

const styles = StyleSheet.create({
  header : {
    fontSize: mediumSize,
    color: black,
    fontFamily: 'Inter'
  },
  option : {
    paddingHorizontal : 8
  },
  optionContent : {
    height: 50,
    backgroundColor: greyLight,
    borderRadius : 10,
    padding : 10,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  optionContentBordered : {
    height: 50,
    backgroundColor: greyLight,
    borderRadius : 10,
    padding : 10,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 3,
    borderColor: black
  },
  label : {
    fontSize: 20,
    color: black,
    fontFamily: 'Inter'
  }
})
