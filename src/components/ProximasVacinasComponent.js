import React from "react";

import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Moment from 'moment';

export default function ProximasVacinasComponent(props){
    Moment.locale('en');
    var nomeVacina = props.nome;
    var dataVacina = props.data;
    
    return  <TouchableOpacity style={styles.container}>
                <View>
                    <Text style={styles.nomeVacina}>
                        {nomeVacina}
                    </Text>
                    <Text style={styles.dataVacina}>
                        {Moment(dataVacina).format('DD-MM-yyy')}
                    </Text>
                </View>
            </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        width: 300,
        height:50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop:10
        
    },
    nomeVacina:{
        color: '#3F92C5',
        fontSize: 20,
        marginLeft:10
    },
    dataVacina:{
        color:'#8B8B8B',
        marginLeft: 10
    }
})


