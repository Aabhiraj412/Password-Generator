import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    SafeAreaView,
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native'
import React, { useState } from 'react'


import * as Yup from 'yup'
import { Formik,Form,Field } from 'formik'
// import {Slider} from 'react-native-slider'
// import Slider from '@react-native-community/slider'
import Nav from './Components/Nav'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
// import { SafeAreaView } from 'react-native-safe-area-context'

const pass = Yup.object().shape({
    passlength: Yup.number()
    .min(4,'Length Must be atleast 4 digits')
    .max(16,'Length Cant exceed 16 digits')
    .required('Requited Field')
})
export default function AppPro() {

    const [password,setpass] = useState('')
    const [generated,setgenerated] = useState(false)
    const [lower, setlower] = useState(true)
    const [upper, setupper] = useState(false)
    const [number, setnumber] = useState(false)
    const [symbol, setsymbol] = useState(false)

    const generatePassString = (passlength: number)=>{
        let charList = ''

        const upperchar = 'QWERTYUIOPASDFGHJKLZXCVBNM'
        const lowerchar = 'qwertyuiopasdfghjklzxcvbnm'
        const num   = '0147852369'
        const sym   = '~!@#$%^&*()_+{}|:"<>?`-=[];,./'

        if(lower){
            charList += lowerchar
        }
        if (upper){
            charList += upperchar
        }
        if (number){
            charList += num
        }
        if (symbol){
            charList += sym
        }
        const passString = create(charList,passlength)

        setpass(passString)
        setgenerated(true)
    }

    const create = (characters: string, passlength: number)=>{
        let res = ''
        for(let i=0; i<passlength; i++){
            const chIndex = Math.round(Math.random()*characters.length)
            res += characters.charAt(chIndex)
        }
        return res
    }

    const reset = ()=>{
        setpass('')
        setgenerated(false)
        setlower(true)
        setupper(false)
        setnumber(false)
        setsymbol(false)
    }
  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={
        {backgroundColor: 'white'}}>
        <Nav/>
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.formContainer}>
                {/* <Text style={styles.title}>Pass Generator</Text> */}
                <Formik
                    initialValues={{ passlength:'' }}
                    validationSchema={pass}
                    onSubmit={values=>{
                        console.log(values)
                        generatePassString(+values.passlength) 
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    isValid,
                    handleChange,
                    handleSubmit,
                    handleReset,
                    /* and other goodies */
                }) => (
                    <>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputColumn}>
                            <Text style={styles.title}>
                                PassWord Length:
                            </Text>
                            <TextInput 
                            style={styles.inputStyles}
                            value={values.passlength}
                            onChangeText={handleChange('passlength')}
                            // onChangeText={handleChange('passlength')}
                            placeholder="Ex: 8"
                            keyboardType='numeric'
                            />
                            {/*<Slider
                            style={styles.slider}
                            />*/}
                        </View>
                        {touched.passlength && errors.passlength && (
                                <Text style={styles.errortxt}>
                                    {errors.passlength}
                                </Text>
                        )}
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputColumn}>
                            <Text style={styles.title}>Include LowerCase:</Text>
                            <BouncyCheckbox
                            style={{backgroundColor:"white",borderRadius:50,width:25}}
                            disableBuiltInState
                            isChecked={lower}
                            onPress={()=>setlower(!lower)}
                            fillColor='#3D251e'
                            />
                        </View>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputColumn}>
                            <Text style={styles.title}>Include UpperCase:</Text>
                            <BouncyCheckbox
                            style={{backgroundColor:"white",borderRadius:50,width:25}}
                            disableBuiltInState
                            isChecked={upper}
                            onPress={()=>setupper(!upper)}
                            fillColor='#3D251e'
                            />
                        </View>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputColumn}>
                            <Text style={styles.title}>Include Numbers:</Text>
                            <BouncyCheckbox
                            style={{backgroundColor:"white",borderRadius:50,width:25}}
                            disableBuiltInState
                            isChecked={number}
                            onPress={()=>setnumber(!number)}
                            fillColor='#3D251e'
                            />
                        </View>
                    </View>
                    <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                            <Text style={styles.title}>Include Symbols:</Text>
                            <BouncyCheckbox
                            style={{backgroundColor:"white",borderRadius:50,width:25}}
                            disableBuiltInState
                            isChecked={symbol}
                            onPress={()=>{setsymbol(!symbol)}}
                            fillColor='#3D251e'
                            />
                        </View>
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity
                        disabled={!isValid}
                        onPress={handleSubmit}
                        >
                            <Text style={styles.btns}>Generate Pass</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> {
                            handleReset()
                            reset()
                        }}>
                            <Text style={styles.btns}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                )}
            </Formik>
            </View>
            {generated ? (
                <View style={styles.result}>
                    <Text style={styles.restxt}>Password</Text>
                    <Text selectable={true} style={styles.pass}>{password}</Text>
                </View>
            ):null}
        </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    appContainer:{
        
    },
    result:{
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderWidth:2,
        borderColor:'black',
        borderRadius:20,
        backgroundColor:'white'
    },
    slider:{
        width: 100,
        height: 20,
    },
    restxt:{
        fontSize: 20,
        color: 'black',
    },
    pass:{
        textAlign: 'center',
        fontSize: 30,
        padding:10,
        color: 'black'
    },
    formContainer:{
    
    },
    title:{
        color: "black",
        fontSize: 15
    },
    inputWrapper:{

    },
    errortxt:{
        textAlign:'center',
        color: 'red'
    },
    inputColumn:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding:10,
        margin:10,

    },
    inputStyles:{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth:2,
        borderRadius:20,
        width:'60%',
        margin:10,
        padding:10
    },
    formAction:{
        paddingVertical:10,
        marginTop:20,
        paddingHorizontal:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    btns:{
        backgroundColor: '#3D251e',
        color: 'white',
        padding: 20,
        width: 150,
        height: 65,
        textAlign: 'center',
        borderRadius: 20,
        borderWidth:2,
        borderColor: 'black',
        fontSize:18

    }
})