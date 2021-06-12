import React, { Component } from 'react';
import {StyleSheet,View,Image,TouchableOpacity,Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'

// constants
import {icons,SIZES,COLORS,FONTS} from '../constants'

const HeaderBar = ({right})=>{
    const navigation = useNavigation();
    return(
        <View style={{
            paddingHorizontal:SIZES.padding,
            flexDirection:'row'
        }}>
            <View style={{flex:1, alignItems:'flex-start'}}>
                <TouchableOpacity style={{
                    flexDirection:'row',
                    alignItems:'center'
                }} onPress={()=> navigation.goBack()}>
                    <Image source={icons.back_arrow}
                    style={{
                        width:25,
                        height:25,
                        tintColor:COLORS.gray
                    }}/>
                    <Text style={{
                        marginLeft:SIZES.base,
                        ...FONTS.h2
                    }}>Back</Text>
                </TouchableOpacity>
            </View>

            {right && <View style={{flex:1, alignItems:'flex-end'}}>
                <TouchableOpacity>
                    <Image source={icons.star} style={{
                        width:30,
                        height:30
                    }}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default HeaderBar;