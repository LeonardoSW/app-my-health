import React from "react"
import {StyleSheet, Image, Text, View} from 'react-native'

function CabecalhoComponent(props){
    return (
        <View style={styles.cabecalho}>
                <Image 
                    source={ require("../images/icon-vacina.png")}
                    style={styles.icon}/>
                <Text style={styles.cabecalhoText}>{props.textoCabecalho}</Text>
            </View>
    );
}

const styles = StyleSheet.create(
    {
        cabecalho:{
            width: "100%",
            height:"10%",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"center",
            flexDirection: "row",
            backgroundColor:"#c1e7e3"
        },
        cabecalhoText:{
            fontSize:30,
            marginLeft: "2%",
            color: "#419ed7"
        },
        icon:
        {
            width: 50,
            height: 50,
            marginLeft: 15
        }
    })

export default CabecalhoComponent;