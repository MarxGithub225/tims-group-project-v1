import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { blackLight, danger, greyLight, largeSize, mediumSize, miniSize, primary, smallSize, white } from '../../../../assets/styles/variables'

import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '../../../common/Buttons'

function Register({navigation} ) {
  const {navigate} = useNavigation();
  const [hidePasse, setHidePass] = useState(true)
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator= {false} style = {{flex: 1, backgroundColor: "#FFF",}}>
    <SafeAreaView style={{flex: 1, position : 'relative', padding: 20, backgroundColor: "#FFF", flexDirection : 'column', justifyContent : 'space-between'}}>
      <View style = {{marginBottom: 50}}>
        <Text
          style = {{
            fontFamily : 'InterBold',
            textAlign : 'center',
            fontSize: largeSize
          }}
          >
              Inscription
        </Text>

        <Text
        style = {{
          fontSize : smallSize,
          fontFamily : 'Inter',
          marginRight : 5,
          textAlign: 'center'
        }}
        >
            Avez-vous déjà un compte ? <Text onPress={() => navigate('LOGINROOT')} style = {{fontSize : smallSize,fontFamily : 'InterBold',textAlign : 'center', color: primary}}>connexion </Text>
        </Text>

        
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
            fontSize : mediumSize,
            fontFamily : 'Inter',
            textAlign : 'center',
            marginBottom : 20,
          }}
          >
              Veuillez renseigner vos informations
          </Text>
          <View
          style = {{
            marginBottom : 50
          }}
          >
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
                  Prénom(s) <Text style = {{color: danger}}>*</Text>
              </Text>
              <TextInput style = {styles.input}
              cursorColor = {primary}
              underlineColorAndroid = "transparent"
              placeholder = ""
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              />
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
              }}
              >
                 Nom <Text style = {{color: danger}}>*</Text>
              </Text>
              <TextInput style = {styles.input}
              cursorColor = {primary}
              underlineColorAndroid = "transparent"
              placeholder = ""
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              />
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
              Téléphone <Text style = {{color: danger}}>*</Text>
              </Text>
              <TextInput style = {styles.input}
              cursorColor = {primary}
              underlineColorAndroid = "transparent"
              placeholder = ""
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              />
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
              }}
              >
                  Mot de passe <Text style = {{color: danger}}>*</Text>
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
                   {!hidePasse ?<Ionicons size={largeSize} name='eye-outline' />:
                    <Ionicons size={largeSize} name='eye-off-outline' />}
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
              }}
              >
                  Confirmer le mot de passe <Text style = {{color: danger}}>*</Text>
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
                    {!hidePasse ?<Ionicons size={largeSize} name='eye-outline' />:
                    <Ionicons size={largeSize} name='eye-off-outline' />}
                </Text>
              </View>
            </View>

            <View
            style = {{
              marginTop: 50
            }}
            >
              <Buttons
                  value = {"Inscription"}
                  color = {"#FFF"}
                  background = '#E73A5D'
                  size={smallSize}
                  fontFamily = {"InterBold"}
                  radius = {50}
              />
            </View>
          </View>

          <Text
            style = {{
              fontSize : miniSize,
              fontFamily : 'Inter',
              textAlign : 'center',
            }}
            >
                En connectant votre compte, vous confirmez que vous êtes d'accord avec <Text onPress={() => navigate('WELCOMEROOT')} style = {{ fontSize : smallSize, fontFamily : 'InterBold'}} >nos termes et conditions.</Text>
                
            </Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default Register
const styles = StyleSheet.create({
  input : {
    borderBottomWidth : 1,
    borderBottomColor : greyLight,
  }
})