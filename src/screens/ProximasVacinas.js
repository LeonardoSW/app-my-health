import React, { useEffect, useState } from 'react'
import {Text, View, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ProximasVacinasComponent from '../components/ProximasVacinasComponent'


import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../config/firebase'

export default function ProximasVacinas(props){
    
    const [listaVacinas, setListaVacinas] = useState([])
    const q = query( collection(db, "medicaldata"))

    useEffect( () => {
        onSnapshot(q, (result) =>{
            const listAlunos = []
            result.forEach((doc) => {                
                if(new Date(doc.data().dateNextDose) > new Date()){
                    listAlunos.push({
                        id: doc.id,
                        title: doc.data().title,
                        dosagem: doc.data().dosagem,
                        date: doc.data().date,
                        dateNextDose: doc.data().dateNextDose
                    })
                }
            })
        setListaVacinas(listAlunos)
        })
    }, [])


    return(
        <View style={styles.container}>
            <View style ={styles.globalContainer}>
                <FlatList
                    style = {styles.flat}
                    data={listaVacinas}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ProximasVacinasComponent
                                                 nome = {item.title}
                                                 data = {item.dateNextDose} />}
                    />
            </View>
            <TouchableOpacity 
            style = {styles.button}
            onPress = { () => props.navigation.navigate('Nova Vacina', {render: new Date().toLocaleString()})}>
                <Text style={styles.text}>
                    Nova Vacina
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create (
    {
        container:{
            width: '100%',
            height:'100%',
            backgroundColor: '#ADD4D0',
            alignItems: 'center'
        },
        globalContainer:{
            width: "100%",
            height:'80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        flat:{
            display:'flex',
            marginTop:10,
            height: '80%'
        },
        button:{
            marginTop:20,
            backgroundColor: '#37BD6D',
            width: 100,
            paddingVertical:4,
            alignItems:'center'
        },
        text:{
            color:'#fff'
        }

    })