import React from "react"
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native'

import editarStatic from "../config/editarStatic"
import Moment from 'moment';

import { useDispatch, useSelector } from 'react-redux'; 
import { reducerSetVacina } from '../redux/editarSlice';


function CardVacinaComponent(props){
    Moment.locale('en');
    var imagemSrc = props.imageUrl
    var nav = props.nav

    const dispatch = useDispatch()

    return(
        <TouchableOpacity 
            onPress={() => handlerDataRedux()}
            style = {styles.containerCardVacina}>

            <Text style = {styles.titleText}>
                {props.title}
            </Text>
            <View style = {styles.containerDose}>
                <Text style = {styles.doseText}>
                    {props.dosagem}</Text>
            </View>
            <Text style = {styles.dateText}>{props.date}</Text>
            <View style = {styles.containerImage}>
                <Image 
                style = {styles.imageVacina}
                source={require('../images/vacina1.png')} />
            </View>
            <View style = {styles.containerProximaVacina}>
                <Text style = {styles.proximaVacina}>
                    Proxima dose em: {Moment(props.dateNextDose).format('DD-MM-yyy')}</Text>
            </View>
        </TouchableOpacity>)

        function handlerDataStatic() // virou legado rs
        {
            editarStatic.addFill(props);
            props.nav.navigation.navigate('Editar Vacina', {update: editarStatic.id});
        }

        function handlerDataRedux()
        {
            console.log('clicando: ' + props.id)
            dispatch(reducerSetVacina({ id: props.id, dataVacinacao:  props.date, vacina: props.title, dose: props.dosagem, proximaVacinacao: props.dateNextDose }))
            props.nav.navigation.navigate('Editar Vacina');
        }
}

const styles = StyleSheet.create({
    containerCardVacina:{
        marginTop:10,
        width:"48%",
        height:140,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#FFF"
    },
    titleText:{
        marginTop: 2,
        color: "#3F92C5",
        fontSize:20
    },
    containerDose:{
        backgroundColor:"#3F92C5"
    },
    doseText:{
        color: "#FFF",
        textAlign: "center",
        fontSize:10,
        width:60
    },
    dateText:{
        marginTop:3,
        fontSize: 10,
        color:"#A7A7A7"
    },
    containerImage:{
        display:"flex",
        alignItems: "center",
        width: 140,
        height:65
    },
    imageVacina:{
        width: "90%",
        height: "100%"
    },
    containerProximaVacina:{
        width: "100%",
        marginRight: 10
    },
    proximaVacina:{
        textAlign: "right",
        fontSize: 10,
        color: "#FD7979"
    }
});

export default CardVacinaComponent;