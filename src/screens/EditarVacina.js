import React, { useEffect, useState } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Moment from 'moment';
import editarStatic from '../config/editarStatic';

import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function EditarVacina(props){
    Moment.locale('en');
    
    const [newTitle, setNewTitle] = useState('');
    const [newDose, setNewDose] = useState('');
    const [newImage, setNewImage] = useState('');

    // useEffect(() => {
    //     setNewTitle(editarStatic.title)
    //     setDate(new  Date(editarStatic.date))
    //     setDatePv(new  Date(editarStatic.dateNextDose))
    // //}, [props.route.params.update]) // virou legado static
    // }, []) virou legado

    
    console.log(useSelector((state) => state))
    const id = useSelector((state) => state.editar.id)
    const editarTitulo = useSelector((state) => state.editar.vacina)
    const editarDataVacinacao = useSelector((state) => state.editar.dataVacinacao)
    const editarDose = useSelector((state) => state.editar.dose)
    const editarProximaVacinacao = useSelector((state) => state.editar.proximaVacinacao)
    
    useEffect(() => {
        setNewTitle(editarTitulo)
        setDate(new  Date(editarDataVacinacao))
        setDatePv(new  Date(editarProximaVacinacao))
        setDose(editarDose)
    }, [id])

    
    const [pickerResponse, setPickerResponse] = useState(null);    
    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    const [fileResponse, setFileResponse] = useState([]);

    const [date, setDate] = useState(new Date(editarDataVacinacao));
    const [openV, setOpen] = useState(false);

    const [datePv, setDatePv] = useState(new Date(editarProximaVacinacao));
    const [openPV, setOpenPv] = useState(false);
    
    const openGallery = () => {
        const options = {
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
        };
        launchImageLibrary(options, setPickerResponse);
      };
    
      const [dose, setDose] = useState('');
      function alterarDose(novaDose) {
        setDose(novaDose);
    }

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
                        <TextInput onChangeText={setNewTitle} value={newTitle} style={styles.inputVacina}/>
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
                <View style = {styles.btnSalvar}>
                        <TouchableOpacity
                            onPress={handlerSave}>
                            <Text style={styles.textsStyle}>Salvar Alteraçoes</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.btnExcluir}>
                    <TouchableOpacity
                        onPress={handlerDelete}>
                        <Text style={styles.textsStyle}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            function handlerSave() {
                
                updateDoc(doc(db, "medicaldata", id), {
                    title: newTitle,
                    dosagem: dose,
                    date: Moment(date).format('yyy-MM-DD'),
                    dateNextDose: Moment(datePv).format('yyy-MM-DD')
                })
                .then((result) => {
                    props.navigation.goBack(); 
                })
                .catch((error) => {
                    console.log(error)
                })
            }

            function handlerDelete() {
                
                deleteDoc(doc(db, "medicaldata", id))
                .then((result) => {
                    props.navigation.goBack(); 
                })
                .catch((error) => {
                    console.log(error)
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
    btnSalvar:{
        alignItems: 'center',
        width:150,
        padding:5,
        backgroundColor:'#37BD6D',
        marginBottom: 10
    },
    btnExcluir:{
        alignItems: 'center',
        width:100,
        padding:5,
        backgroundColor:'#FD7979'
    },
})