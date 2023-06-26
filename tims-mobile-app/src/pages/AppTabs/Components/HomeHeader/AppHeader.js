import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { black, blackBg, blackLight, blue, grey, greyLight, largeSize, mediumSize, primary, secondary, smallSize, white } from '../../../../../assets/styles/variables';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; 
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

function AppHeader(props) {
      const {navigate} = useNavigation()
      const toggleDrawer = () => {
        if(props.close) {
          props.navigationProps();
        }else if(!props.back) {
          props.navigationProps.toggleDrawer()
        }else props.navigationProps.goBack()
      };

      const theme = useSelector(state => state.theme);
      const [mode, setMode] = useState(theme.mode);
      useEffect(() => { 
              setMode(theme.mode);
        }, [theme]);
     
      return (
        <View style={{flexDirection: 'row', alignItems : 'center', justifyContent : (!props.title || !props.hideCart) ? 'space-between' : 'flex-start', paddingTop: !props.close ? deviceHeight/19 + 10 : 20,  paddingHorizontal: 10, paddingBottom: 10, backgroundColor : mode === 'dark' ?  blackBg : white}}>
          <TouchableOpacity onPress={toggleDrawer}
          style = {{
            width : 40,
            height: 40,
            borderRadius: 100,
            backgroundColor : mode === 'dark' ? '#222E34' : grey,
            flexDirection: 'row',
            justifyContent : 'center',
            alignItems : 'center'
          }}
          >
            {/*Donute Button Image */}
            {!props.back ? <>{mode === 'dark' ? <Image source={require('../../../../../assets/icons/MenuIconWhite.png')}/> : <Image source={require('../../../../../assets/icons/MenuIcon.png')}/>}</> : <Ionicons name='arrow-back-outline' color={mode === 'dark' ? white : black} size={30}/>}
          </TouchableOpacity>

          {props.title && <View
          style = {{marginLeft : !props.hideCart ? 0 : deviceWidth / 6}}
          >
            <Text
              style = {{
              fontSize : mediumSize,
              fontFamily : 'InterBold',
              color : mode === 'dark' ? white : black
            }}
            >{props.title}</Text>
          </View>}

          {props.showSearch && <TouchableOpacity onPress={() => navigate('SEARCHROOT')}
          style = {{
            width : 40,
            height: 40,
            flexDirection: 'row', 
            justifyContent : 'center',
            alignItems : 'center'
          }}
          >
            {/*Donute Button Image */}
            <Image source={require('../../../../../assets/icons/Search.png')}/> 
          </TouchableOpacity>}

          {!props.hideCart && <TouchableOpacity onPress={() => navigate('CARTROOT')}
          style = {{
            position : 'relative',
            width : 40,
            height: 40,
            borderRadius: 100,
            backgroundColor : !props.back ? mode === 'dark' ? '#222E34' : grey : 'transparent',
            flexDirection: 'row', 
            justifyContent : 'center',
            alignItems : 'center'
          }}
          >
            {/*Donute Button Image */}
            {mode === 'dark' ? <Image source={require('../../../../../assets/icons/BagWhite.png')}/> : <Image source={require('../../../../../assets/icons/Bag.png')}/>}

            <View
            style = {{
              position : 'absolute',
              top: 6,
              right : 6,
              width : 12,
              height : 12,
              borderRadius : 100,
              backgroundColor :  mode === 'dark' ? secondary : primary,

            }}
            />
          </TouchableOpacity>}
        </View>
      );
}

export default AppHeader