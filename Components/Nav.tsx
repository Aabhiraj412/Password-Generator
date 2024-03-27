import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Nav() {
  return (
    <View style={styles.nav}>
        <Text style={styles.txt}>Pass Generator</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    nav:{
        justifyContent: 'center',
        height:60,
        backgroundColor:'#3D251e',
    },
    txt:{
        fontSize:20,
        textAlign:'center',
        padding:10,
        color: 'white'
    }
})