import { View } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import { useSelector } from 'react-redux'; 
import { blackLight, primary, secondary } from '../../assets/styles/variables';
import React, { useState, useEffect } from 'react'
export function Start (rate) {
    const theme = useSelector(state => state.theme);
    const [mode, setMode] = useState(theme.mode);
    useEffect(() => { 
            setMode(theme.mode);
    }, [theme]);

    switch (rate) {

        case 0:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    {[0, 1, 2, 3, 4].map((i, index) => {
                        return <AntDesign name='star' key={index} color={blackLight}  />
                    })}
            </View>)
            break;

        case 1:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    <AntDesign name='staro' color={mode === 'dark' ? secondary : primary}  />
                    {[0, 1, 2, 3].map((i, index) => {
                        return <AntDesign name='star' key={index} color={blackLight}  />
                    })}
            </View>)
            break;

        case 2:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    {[0, 1].map((i, index) => {
                        return <AntDesign name='staro' key={index} color={mode === 'dark' ? secondary : primary}  />
                    })}
                    {[0, 1, 2].map((i, index) => {
                        return <AntDesign name='star' key={index} color={blackLight}  />
                    })}
            </View>)
            break;

        case 3:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    {[0, 1, 2].map((i, index) => {
                        return <AntDesign name='staro' key={index} color={mode === 'dark' ? secondary : primary}  />
                    })}
                    {[0, 1].map((i, index) => {
                        return <AntDesign name='star' key={index} color={blackLight}  />
                    })}
            </View>)
            break;

        case 4:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    {[0, 1, 2, 3].map((i, index) => (
                         <AntDesign name='staro' key={index} color={mode === 'dark' ? secondary : primary}  />
                    ))}
                    <AntDesign name='star' color={blackLight}  />
                  
            </View>)
            break;

        case 5:
            return (<View style = {{
                flexDirection : 'row',
                alignItems : 'center'
            }}>
                    {[0, 1, 2, 3, 4].map((i, index) => {
                        return <AntDesign name='staro' key={index} color={mode === 'dark' ? secondary : primary}  />
                    })}
                  
            </View>)
            break;
    
        default:
            return ;
            break;
    }
}
