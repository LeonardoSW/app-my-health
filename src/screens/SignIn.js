import React from "react"
import {StyleSheet, Text, TextInput , View, TouchableOpacity, Alert} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import auth from '@react-native-firebase/auth';


import CabecalhoComponent from '../components/CabecalhoComponent';

const textoCabecalho = "MyHealth";

function SignIn({navigation}){

    const [email, onChangeEmail] = React.useState("");
    const [senha, onChangePass] = React.useState("");

    return(
        <View style={styles.container}>

            <CabecalhoComponent textoCabecalho = {textoCabecalho}/>
            <View style = { styles.textInputArea }>

                <View style={styles.internalTextInputArea}>
                    <Text style={styles.inputTextItens}>Nome Completo</Text>
                    <TextInput style={styles.textInput}
                    />
                </View>

                <View style={styles.checkBoxArea}>
                    <Text style={styles.inputTextItens}>Sexo</Text>
                    <CheckBox
                    />
                    <Text style={styles.inputTextItens}>Masculino</Text>
                    <CheckBox
                    value = {false}
                    />
                    <Text style={styles.inputTextItens}>Feminino</Text>
                </View>

                <View style={styles.internalTextInputArea}>
                    <Text style={styles.inputTextItens}>Data nascimento</Text>
                    <TextInput style={styles.textInput}
                    />
                </View>

                <View style={styles.internalTextInputArea}>
                    <Text style={styles.inputTextItens}>Email</Text>
                    <TextInput style={styles.textInput}
                        onChangeText={onChangeEmail}
                    />
                </View>

                <View style={styles.internalTextInputArea}>
                    <Text style={styles.inputTextItens}>Senha</Text>
                    <TextInput 
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={onChangePass}
                    />
                </View>

                <View style={styles.internalTextInputArea}>
                    <Text style={styles.inputTextItens}>Repetir senha</Text>
                    <TextInput secureTextEntry={true} style={styles.textInput}
                    />
                </View>

            </View>

            <View style = {styles.buttonArea}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {CreateUser}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            </View>

        </View>
    );

    function CreateUser()
    {
        auth().createUserWithEmailAndPassword(email, senha)
            .then( () => {
                alert('Cadastrado com sucesso!');
            })
            .catch( error => {
                if (error.code === 'auth/email-already-in-use')
                    alert('O endereço de email já está cadastrado!');

                else if (error.code === 'auth/invalid-email') 
                    alert('Endereço de email inválido!');

                else
                    console.log(error);
            })

        navigation.goBack();
    }

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
        textInputArea:{
            marginTop: "15%",
            display: "flex",
            flexDirection:"column",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "40%",
            width: "90%",
        },
        internalTextInputArea:{
            display: "flex",
            flexDirection:"row",
            alignItems: "center",
            marginTop: "4%"
        },
        textInput:{
            backgroundColor: "#fff",
            marginLeft: 6,
            width: "70%",
            color: "#419ed7"
        },
        inputTextItens:{
            color: "#fff",
        },
        checkBoxArea:{
            marginTop: '4%',
            display:"flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight:75
        },
        buttonArea:{
            height:"25%",
            width: "100%",
            display: "flex",
            alignItems:"center",
            justifyContent:"flex-end"
        },
        button:{
            width:"30%",
            display:"flex",
            alignItems:"center",
            padding:6,
            backgroundColor:"#49b976"
        },
        buttonText:{
            color: "#FFF"
        }
    });

    export default SignIn;