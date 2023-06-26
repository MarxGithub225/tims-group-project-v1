import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { black, blackBg, danger, deviceHeight, grey, largeSize, mediumSize, smallSize, white } from '../../../../assets/styles/variables'
import Buttons from '../../../common/Buttons'
import AppHeader from '../../../common/AppHeader/AppHeader'
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native'
import {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from '../../../../assets/styles/variables';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

function CodeVerification({navigation}) {
  const {navigate} = useNavigation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [mode === 'dark' ? white : NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);
    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator= {false} style={{flex: 1, backgroundColor :  mode === 'dark' ? blackBg : white, position : 'relative', paddingBottom: 30}}>
      <SafeAreaView style={{flex: 1, position : 'relative', padding: 20, backgroundColor: "#FFF"}}>
        <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {' '}
        />


      <View
       style = {{
         flex : 1,
         flexDirection : 'column',
         paddingBottom : deviceHeight / 15,
         padding : 15
       }}
       >

          <View >
            <Text
            style = {{
              fontSize : mediumSize,
              fontFamily : 'InterBold',
              textAlign : 'center',
              color : mode === 'dark' ? white : black
            }}
            >
                Verification
            </Text>

            <View
            style = {{
              flexDirection : 'row',
              justifyContent : 'center',
              marginTop: 50
            }}
            >
            <Image
            source={require('../../../../assets/icons/PasswordForgot.png')}
            style = {{width: 100, height: 100}}
            />
            </View>

            
          </View>

          <View
          style = {{
            marginTop : 20
          }}
          >
            <Text
            style = {{
              fontSize : largeSize,
              fontFamily : 'Inter',
              textAlign : 'center',
              marginBottom : 50,
              color : mode === 'dark' ? white : black
            }}
            >
                Veuillez renseigner le code de vérification que nous vous avons envoyé dans votre boîte de messagérie.
                
            </Text>

            <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          </View>
            
              <Text onPress={() => navigate('WELCOMEROOT')} style = {{ fontSize : smallSize, fontFamily : 'InterBold', textAlign : 'center', marginTop : 25, color : danger}} >Renvoyer le code.</Text>
                
       </View>


            <View
            style = {{
              marginVertical : 20
            }}
            >
              <Buttons
                  value = {"Vérifier"}
                  color = {"#FFF"}
                  background = '#E73A5D'
                  size={smallSize}
                  fontFamily = {"InterBold"}
                  radius = {50}
                  onclik = {() => navigate("NEWPASSROOT")}
              />
          </View>
          </SafeAreaView>
    </ScrollView>
  )
}

export default CodeVerification

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: black,
    backgroundColor: white,
    borderWidth : 1,
    borderColor : grey
  },

  
  
 
})