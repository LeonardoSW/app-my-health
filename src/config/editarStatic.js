import React, { useEffect, useState } from 'react';

//const [newTitle, setNewTitle] = useState('');

class editarStatic {

    static id = '';
    static title = '';
    static dosagem = '';
    static date = '';
    static dateNextDose = '';
    static urlImage = '';

    static addFill(props){
        this.id = props.id;
        this.title = props.title;
        this.dosagem = props.dosagem;
        this.date = props.date;
        this.dateNextDose = props.dateNextDose;
        this.urlImage = props.urlImage;
    }

    static clear() {
        this.id = '';
        this.title = '';
        this.dosagem = '';
        this.date = '';
        this.dateNextDose = '';
        this.urlImage = '';
        console.log('limpou!')
    }
}

export default editarStatic