import React, { useEffect, useState } from 'react'
import CustomInput from '../../../../common/CustomInput'
import { Dimensions, Image, View } from 'react-native';
const deviceWith = Dimensions.get('window').width;
import { TouchableOpacity } from 'react-native-gesture-handler';
import { grey, primary, secondary, smallSize, greyLight, white } from '../../../../../assets/styles/variables';
import { useSelector } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons'
function HomeSearch() {
    const {navigate} = useNavigation()
    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);
  return (
    <TouchableOpacity
    onPress={() => navigate('SEARCHROOT')}
    style = {{
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center'
    }}
    >
    <CustomInput
    value={''}
    onclik={() => console.log('okkk')}
    width = {deviceWith/1.35}
    placeholder = {'Rechercher un produit, marque...'}
    size={smallSize}
    editable={false}
    selectTextOnFocus={false}
    background = {mode === 'dark' ? '#222E34' : grey}
    />

    <View
    style = {{
      height : 50,
      padding: 10,
      width : deviceWith/7,
      backgroundColor :  mode === 'dark' ? secondary : primary,
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius: 10
    }} >
      <EvilIcons name='search' size={25} color={mode === 'dark' ? white : greyLight}/>
    </View>
     
    </TouchableOpacity>
  )
}

export default HomeSearch