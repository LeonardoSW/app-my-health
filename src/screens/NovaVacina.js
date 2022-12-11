import React, { useEffect, useState } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Moment from 'moment';
import { RadioButton } from 'react-native-paper';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

import Geolocation from '@react-native-community/geolocation'


export default function NovaVacina(props){
    Moment.locale('en');

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    // useEffect( () => {
    //     Geolocation.watchPosition( (position) => {
    //       setLatitude(position.coords.latitude)
    //       setLongitude(position.coords.longitude)
    //     },
    //     (error) => {
    //       alert(error)
    //     },
    //     {
    //       distanceFilter: 1
    //     }
    //     )
    //   }, [])

    //   const getLocation = () => {
    //     Geolocation.getCurrentPosition( (position) => {
    //       setLatitude(position.coords.latitude)
    //       setLongitude(position.coords.longitude)
    //     })
    //   }

    const [pickerResponse, setPickerResponse] = useState(null);    
    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    const [date, setDate] = useState(new Date("2016-01-04"));
    const [openV, setOpen] = useState(false);

    const [datePv, setDatePv] = useState(new Date("2016-01-02"));
    const [openPV, setOpenPv] = useState(false);

    const [vacina, setVacina] = useState('');

    const [dose, setDose] = useState('');

    const openGallery = () => {
        const options = {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
        };
        launchImageLibrary(options, setPickerResponse);
      };

    useEffect(() => {
        setVacina('');
    }, [props.route.params.render])

    return  <View style={styles.countainer}>
                <View style = {styles.globalContainer}>
                    <View style={styles.dataVacinacao}>
                        <Text style={styles.textsStyle1}>Data Vacinação</Text>
                        
                        <View style = { styles.boxDataVacinacao}>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}>
                                <Text style={styles.textsStyleDados}>{ Moment(date).format('DD-MM-yyy') }</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <DatePicker modal 
                            open = {openV} 
                            date={date}
                            mode = 'date'
                            onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            }}
                            onCancel={() => {
                            setOpen(false)
                            }}
                        />

                    </View>

                    <View style={styles.nomeVacina}>
                        <Text style={styles.textsStyle}>Vacina</Text>
                        <TextInput 
                            style={styles.inputVacina}
                            onChangeText={setVacina}
                            value = {vacina}/>
                    </View>
                    
                    <View style ={ styles.areaChecks}>
                        <Text style={styles.textsStyle3}>Dose</Text>
                        
                        <View style={styles.checkBoxT1}>
                            <RadioButton
                                value = '1ª dose'
                                status = {dose === '1ª dose' ? 'checked' : 'unchecked'}
                                onPress = { () => alterarDose('1ª dose')}
                            />
                            <Text style={styles.textsStyle4}>1ª dose</Text>                            
                        </View>
                        
                        <View style={styles.checkBoxT1}>
                            <RadioButton
                                value = '2ª dose'
                                status = {dose === '2ª dose' ? 'checked' : 'unchecked'}
                                onPress = { () => alterarDose('2ª dose')}
                            />
                            <Text style={styles.textsStyle4}>2ª dose</Text>
                        </View>

                        <View style={styles.checkBoxT1}>
                            <RadioButton
                                value = '3ª dose'
                                status = {dose === '3ª dose' ? 'checked' : 'unchecked'}
                                onPress = { () => alterarDose('3ª dose')}
                            />
                            <Text style={styles.textsStyle4}>3ª dose</Text>
                        </View>

                    </View>

                    <View style={styles.checkBoxT1}>
                        <RadioButton
                            value = 'Dose única'
                            status = {dose === 'Dose única' ? 'checked' : 'unchecked'}
                            onPress = { () => alterarDose('Dose única')}
                        />
                        <Text style={styles.textsStyle4}>Dose única</Text>
                    </View>

                    <View style = {styles.selecionarImagem}>
                        <View style ={styles.boxSelecionarImagem} >
                            <Text style={styles.textsStyle}>Comprovante</Text>
                            <View>
                                <TouchableOpacity
                                onPress={openGallery}>
                                    <Text style = {styles.btnSelecionarImagem}>Selecionar Imagem...</Text>
                                </TouchableOpacity>
                                {
                                    uri && (
                                    <Image source={{uri}} style=
                                        {{height:90, width:150,margin:10}}>
                                    </Image>
                                    )
                                }
                            </View>
                        </View>
                    </View>

                    <View style={styles.boxProximaVacina}>
                        <Text style={styles.textsStyle4}>Próxima Vacinação</Text>
                        <View style = { styles.boxDataVacinacao}>
                            <TouchableOpacity
                                onPress={() => setOpenPv(true)}>
                                <Text style={styles.textsStyleDados}>{ Moment(datePv).format('DD-MM-yyy') }</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <DatePicker modal 
                            open = {openPV} 
                            date={datePv}
                            mode = 'date'
                            onConfirm={(datePv) => {
                            setOpenPv(false)
                            setDatePv(datePv)
                            }}
                            onCancel={() => {
                            setOpenPv(false)
                            }}
                        />
                    </View>
                </View>
                <View style = {styles.btnCadastrar}>
                        <TouchableOpacity
                            onPress={() => CriarVacina()}>
                            <Text style={styles.textsStyle}>Cadastrar</Text>
                        </TouchableOpacity>
                </View>
            </View>

            function alterarDose(novaDose) {
                setDose(novaDose);
            }

            function CriarVacina() {
                addDoc(collection(db, "medicaldata"), {
                    title: vacina,
                    dosagem: dose,
                    date: Moment(date).format('yyy-MM-DD'),
                    dateNextDose: Moment(datePv).format('yyy-MM-DD')
                })
                .then(() => {
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.log("erro tela nova vacina" + error)
                })
            }
}

const styles = StyleSheet.create({
    countainer:{
        width: '100%',
        height: '100%',
        backgroundColor: '#ADD4D0',
        alignItems: 'center'
    },
    globalContainer:{
        marginTop: 40,
        height: '75%',
        alignItems: 'center',
    },
    textsStyle1:{
        color: '#FFFFFF',
        marginRight: 10,
    },
    textsStyle2:{
        marginRight: 10,
        marginLeft: 2,
        color: "#fff"
    },
    textsStyle3:{
        color: '#FFFFFF',
        marginRight: 15,
    },
    textsStyle4:{
        color: '#FFFFFF',
        marginRight: 10,
    },
    textsStyle:{
        color: '#FFFFFF'
    },
    textsStyleDados:{
        color: '#3F92C5'
    },
    dataVacinacao:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15
    },
    boxDataVacinacao:{
        width: 125,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    nomeVacina:{
        marginTop: 15,
        marginLeft: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    inputVacina:{
        width: 100,
        marginLeft:30,
        backgroundColor: '#FFF'
    },
    areaChecks:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxT1:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    checkBoxT1_2:{
        backgroundColor: '#000',
        height: 10,
        width: 10,
        borderRadius: 10
    },
    checkBoxT2:{
        backgroundColor: '#FFF',
        height: 10,
        width: 10,
        borderRadius: 10
    },
    checkBoxT3:{
        backgroundColor: '#FFF',
        height: 10,
        width: 10,
        borderRadius: 10
    },
    checkBoxTUnica:{
        backgroundColor: '#FFF',
        height: 10,
        width: 10,
        borderRadius: 10
    },
    boxSelecionarImagem:{
        display:'flex',
        flexDirection:'row',
        marginTop:15
    },
    selecionarImagem:{
        display: 'flex',
        flexDirection: 'row'
    },
    btnSelecionarImagem:{
        color: '#FFF',
        backgroundColor: '#419ED7',
        padding:3,
        marginLeft:20,
        width: 140
    },
    boxProximaVacina:{
        marginTop: 15,
        display:'flex',
        flexDirection:'row'
    },
    btnCadastrar:{
        alignItems: 'center',
        width:110,
        padding:5,
        backgroundColor:'#37BD6D'
    },
})