import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { deviceHeight, deviceWith, largeSize, mediumSize, smallSize } from "../../../assets/styles/variables";
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from "../../common/Buttons";
import { useNavigation } from "@react-navigation/native";
function WelcomeUi() {
  const {navigate} = useNavigation();
  return <SafeAreaView style={styles.container}>
          <View  style={styles.logoArea}>
            <Image source={require('../../../assets/logo.png')} style={styles.backgroundImage}/>
          </View>

          <View style = {{justifyContent: 'center', alignItems: 'center', marginVertical: 25}}>
            <Text style = {{fontFamily: 'InterBold', fontSize: largeSize}}>Bienvenue,</Text>
            <Text style = {{fontFamily: 'Inter', fontSize: mediumSize}}>Faites le meilleur du shopping.</Text>
          </View>


              <View style = {styles.actionButtons}>
                <View
                style = {{
                  marginBottom : 20
                }}
                >
                  <Buttons
                      value = {"Connexion"}
                      color = {"#FFF"}
                      background = '#E73A5D'
                      size={smallSize}
                      fontFamily = {"InterBold"}
                      radius = {50}
                      onclik = {() => navigate("LOGINROOT")}
                  />
                </View>
    
                <View
                >
                  <Buttons
                      value = {'Inscription'}
                      color = {"#FFF"}
                      background = '#F4A607'
                      size={smallSize}
                      fontFamily = {"InterBold"}
                      radius = {50}
                      onclik = {() => navigate("REGISTERROOT")}
                  />
                </View>
    
                
              </View>
        </SafeAreaView>
}
export default WelcomeUi;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      flexDirection:'column',
      position: 'relative'
    },
    logoArea: {
      width: deviceWith / 1.5,
      height: deviceHeight /12,
      borderRadius: 10
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      resizeMode: 'cover'
    },
    imageStyle : {
      width: deviceWith/1.7,
      height: deviceHeight / 2,
      resizeMode: 'cover'
    },
    actionButtons : {
      marginTop: 100,
      width: deviceWith,
      paddingHorizontal: 20
  }
  });