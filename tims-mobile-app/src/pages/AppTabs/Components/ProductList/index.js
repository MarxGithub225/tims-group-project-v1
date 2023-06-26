import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View } from 'react-native';
import { black, blackBg, blackLight, deviceWith, grey, mediumSize, miniSize,  smallSize, white } from '../../../../../assets/styles/variables';
import ProductCard from '../ProductCard';
import { useSelector } from 'react-redux'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
function ProductList(props) {
  const {header, seemore, max = 6, type, data, link} =  props;

  const theme = useSelector(state => state.theme);
  const [mode, setMode] = useState(theme.mode);
  const {navigate} = useNavigation()
  useEffect(() => { 
          setMode(theme.mode);
    }, [theme]);
  return (
    <View style = {{
      flex: 1,
      backgroundColor : mode === 'dark' ? blackBg :  grey,
      paddingVertical: 15
    }}>
        {header && <View style = {{
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            marginBottom: 10,
            paddingHorizontal : 15,
          }}>

           <Text style = {[styles.header, {color : mode === 'dark' ? white : black}]}>{header}</Text>
           {seemore && <TouchableOpacity onPress={() => navigate(link)}>
           <Text style = {[styles.seemore, {color : mode === 'dark' ? white : blackLight}]}>Voir tout</Text>
           </TouchableOpacity>}
        </View>}
        <View
        style = {{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingHorizontal: 8
        }}
        >
          {data.slice(0, max).map((item, index) => {
          const isPair = ((index+1) % 2) === 0 ? true : false
          return <ProductCard
          isPair = {isPair}
          key = {index}
          image = {item.image}
          title = {item.title}
          price = {item.price}
          />
        })}

        </View>

        

       
    </View>
  )
}

export default ProductList;

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  header : {
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
  
})