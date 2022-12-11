import React from "react"
import {StyleSheet, Text, TextInput , View, TouchableOpacity, Alert} from 'react-native'

import CabecalhoComponent from '../components/CabecalhoComponent'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const textoCabecalho = "MyHealth";

function Recovery({navigation}){
    
    const [email, onChangeEmail] = React.useState("");

    return(
        <View style={styles.container}>
            <CabecalhoComponent textoCabecalho={textoCabecalho}/>
            <View style={styles.textInputArea}>
                <Text style = {styles.textStyle}>E-mail</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText = {onChangeEmail}
                />
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity 
                onPress={() => RecuperarSenha()}
                style={styles.button}
                >
                    <Text style = {styles.textStyle}>Recuperar senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    
    
    function RecuperarSenha(){
        if(email == ""){
            alert("Campo email não pode ser vazio!");
            return null;
        }

        auth().sendPasswordResetEmail(email, undefined)
              .then( () => {
                alert('Email de recuperação de senha enviado para ' + email);
              })
              .catch( error => {
                if(error.code == "auth/user-not-found")
                    alert("Usuário não encontrado.");
                
                console.log(error);
              });

        navigation.goBack();
    }
}

function PressButton(){
    alert('teste tela 2');
}
const styles = StyleSheet.create(
    {
        container:{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent:"flex-start",
            alignItems: "center",
            backgroundColor:"#add4d0",
        },
        cabecalho:{
            width: "100%",
            height:"10%",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"center",
            flexDirection: "row",
            backgroundColor:"#abc"
        },
        icon:
        {
            width: 50,
            height: 50,
            marginLeft: 15
        },
        cabecalhoText:{
            fontSize:30,
            marginLeft: "2%"
        },
        textInputArea:{
            display: "flex",
            flexDirection:"row",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "40%",
            width: "100%",
        },
        textInput:{
            backgroundColor: "#fff",
            marginLeft: 6,
            width: "75%"
        },
        buttonArea:{
            height:"50%",
            width: "100%",
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
        },
        button:{
            width:"50%",
            display:"flex",
            alignItems:"center",
            padding:6,
            backgroundColor:"#49b976"
        },
        textStyle:{
            color: "#FFF"
        }
    });

export default Recovery;