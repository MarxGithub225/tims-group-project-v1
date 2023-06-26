import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ScrollView ,StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { blackLight, deviceHeight, greyLight, mediumSize, smallSize, white, blackBg, black, primary, largeSize, secondary } from '../../../../assets/styles/variables'
import AppHeader from '../../../common/AppHeader/AppHeader'

import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '../../../common/Buttons';

function NewPass({navigation} ) {
  const [hidePasse, setHidePass] = useState(true)
  const {navigate} = useNavigation();
  const theme = useSelector((state) => state.theme);
  const [mode, setMode] = useState(theme.mode);
  useEffect(() => { 
        setMode(theme.mode);
  }, [theme]);
  return (
    <ScrollView showsVerticalScrollIndicator= {false} style={{flex: 1, backgroundColor :  mode === 'dark' ? blackBg : white, position : 'relative', paddingBottom: 30}}>
      <SafeAreaView style={{flex: 1, position : 'relative', padding: 20, backgroundColor: mode === 'dark' ? blackBg : "#FFF"}}>
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
                Nouveau mot de passe
            </Text>

          </View>

          <View
          style = {{
            marginTop : 50
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
                Veuillez renseigner votre nouveau mot de passe.
                
            </Text>

            <View
            style = {{
              marginBottom : 20
            }}
            >
              <Text
              style = {{
                fontSize : smallSize,
                fontFamily : 'Inter',
                color: mode === 'dark' ? white : ''
              }}
              >
                  Mot de passe
              </Text>
              <View  
              style = {{
                position : 'relative'
              }}
              >
                <TextInput style = {styles.input}
                cursorColor = {primary}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                secureTextEntry={hidePasse}
                />

              <Text
                onPress={() => setHidePass(!hidePasse)}
                style = {{
                  position : 'absolute',
                  right : 0,
                  bottom : 10
                }}
                >
                    {!hidePasse ?<Ionicons size={largeSize} color = {mode === 'dark' ? white : ''} name='eye-outline' />:
                    <Ionicons size={largeSize} color = {mode === 'dark' ? white : ''} name='eye-off-outline' />}
                </Text>
              </View>
            </View>

            <View
            style = {{
              marginBottom : 20
            }}
            >
              <Text
              style = {{
                fontSize : smallSize,
                fontFamily : 'Inter',
                color: mode === 'dark' ? white : ''
              }}
              >
                  Confirmer
              </Text>
              <View  
              style = {{
                position : 'relative'
              }}
              >
                <TextInput style = {styles.input}
                cursorColor = {primary}
                underlineColorAndroid = "transparent"
                placeholder = ""
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                secureTextEntry={hidePasse}
                />

              <Text
                onPress={() => setHidePass(!hidePasse)}
                style = {{
                  position : 'absolute',
                  right : 0,
                  bottom : 10
                }}
                >
                    {!hidePasse ?<Ionicons size={largeSize} color = {mode === 'dark' ? white : ''} name='eye-outline' />:
                    <Ionicons size={largeSize} color = {mode === 'dark' ? white : ''} name='eye-off-outline' />}
                </Text>
              </View>
            </View>

           
          </View>

          <Text
            style = {{
              fontSize : smallSize,
              fontFamily : 'Inter',
              textAlign : 'center'
            }}
            >
                
            </Text>
       </View>


          <View
            style = {{
              marginVertical : 20
            }}
            >
              <Buttons
                  value = {"Enregistrer"}
                  color = {"#FFF"}
                  background = {mode === 'dark' ? secondary: '#E73A5D'}
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

export default NewPass

const styles = StyleSheet.create({
  input : {
    borderBottomWidth : 1,
    borderBottomColor : greyLight,
  }
})