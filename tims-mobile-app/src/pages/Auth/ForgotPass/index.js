import React, {  } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { blackLight, danger, greyLight, largeSize, primary, smallSize, white } from '../../../../assets/styles/variables'

import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '../../../common/Buttons'
import AppHeader from '../../../common/AppHeader/AppHeader'

function ForgotPass({navigation} ) {
  const {navigate} = useNavigation();
  
  return (
    <ScrollView  showsVerticalScrollIndicator= {false} style = {{flex: 1, backgroundColor: "#FFF", position : 'relative'}}>
    <SafeAreaView style={{flex: 1, position : 'relative', padding: 20, backgroundColor: "#FFF", flexDirection : 'column', justifyContent : 'space-between', position : 'relative'}}>
      
    <AppHeader
        navigationProps={navigation}
        showSearch = {false}
        hideCart = {true}
        back = {true}
        title = {' '}
        />
      <View style = {{marginBottom: 50}}>
        <Text
          style = {{
            fontFamily : 'InterBold',
            textAlign : 'center',
            fontSize: largeSize
          }}
          >
              Récupération de compte
        </Text>

        <Text
        style = {{
          fontSize : smallSize,
          fontFamily : 'Inter',
          marginRight : 5,
          textAlign: 'center'
        }}
        >
            Je m'en rappelle maintenant ! <Text onPress={() => navigate('LOGINROOT')} style = {{fontSize : smallSize,fontFamily : 'InterBold',textAlign : 'center', color: primary}}>connexion </Text>
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
      style={{
        flexDirection : 'column',
        justifyContent : 'space-between',
        marginBottom: 50
      }}
      
      >
          <Text
          style = {{
            fontSize : smallSize,
            fontFamily : 'Inter',
            textAlign : 'center',
            marginBottom : 20,
          }}
          >
              Veuillez renseigner votre adresse e-mail.
          </Text>
          <View>
            <View
            style = {{
              marginBottom : 20
            }}
            >
              <Text
              style = {{
                fontSize : smallSize,
                fontFamily : 'Inter',
              }}
              >
                  Adresse e-mail <Text style = {{color: danger}}>*</Text>
              </Text>
              <TextInput style = {styles.input}
              cursorColor = {primary}
              underlineColorAndroid = "transparent"
              placeholder = ""
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              />
            </View>
            

            
          </View>

          
      </View>
      
      <View
            style = {{
              marginVertical : 20
            }}
            >
              <Buttons
                  value = {"Recupérer"}
                  color = {"#FFF"}
                  background = '#E73A5D'
                  size={smallSize}
                  fontFamily = {"InterBold"}
                  radius = {50}
                  onclik = {() => navigate("CODEVERIFYROOT")}
              />
            </View>
    </SafeAreaView>

    
    </ScrollView>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  input : {
    borderBottomWidth : 2,
    borderBottomColor : greyLight
  }
})