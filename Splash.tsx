import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function Splash({navigation}) {
    
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Home')
        },3000)
    },[])
    return (
    
    <View style={styles.back}>
      <Image style={styles.txt} source={require('./logo.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    back:{
        // backgroundColor:'#f5e1ce',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        width:150,
        height: 150,
    }
})