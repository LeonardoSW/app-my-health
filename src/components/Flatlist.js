import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'

import CardVacina from '../components/CardVacinaComponent'

import {collection, onSnapshot, query} from 'firebase/firestore'
import { db } from '../config/firebase'

export default function(props){

    const filterText = props.filters
    const nav = props.nav
    
    const [listaVacinas, setListaVacinas] = useState([])

    const q = query( collection(db, "medicaldata"))

    useEffect( () => {
        onSnapshot(q, (result) =>{
            const listAlunos = []
            result.forEach((doc) => {
                listAlunos.push({
                    id: doc.id,
                    title: doc.data().title,
                    dosagem: doc.data().dosagem,
                    date: doc.data().date,
                    dateNextDose: doc.data().dateNextDose
                })
            })
        setListaVacinas(listAlunos)
        })
    }, [])

    return(
        <View style = {styles.flatListStyle}>
            <FlatList
                style={styles.flatList}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                //data={listaVacinas}
                data={listaVacinas.filter((vacina) => {
                    if(vacina.title.includes(filterText))
                    return vacina;
                })}

                keyExtractor={item => item.id}
                renderItem={({item}) => <CardVacina
                                            id={item.id}
                                            title={item.title} 
                                            dosagem={item.dosagem}
                                            date={item.date}
                                            dateNextDose={item.dateNextDose}
                                            nav = {nav}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatListStyle:{
        width: "90%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    flatList:{
        display: "flex"
    }
})