import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { black, greyLight } from '../../../../../assets/styles/variables';

function CloseDrawer(props) {
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
      };
  return (
    <View
            style  = {{
                flexDirection : 'row',
                justifyContent : 'flex-end',
                alignItems : 'center',
                marginTop: 40,
            }}
            >
            <TouchableOpacity
             onPress={toggleDrawer}
                style  = {{
                    flexDirection : 'row',
                    justifyContent : 'center',
                    alignItems : 'center',
                    width : 40,
                    height : 40,
                    borderRadius: 100,
                backgroundColor : greyLight,
                }} >
                <Ionicons
                name="close-outline" 
                color={black}
                size={35}
                />
            </TouchableOpacity>
            </View>
  )
}

export default CloseDrawer