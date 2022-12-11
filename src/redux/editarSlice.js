import { createSlice } from "@reduxjs/toolkit";

const initicalValues ={
    id: '',
    dataVacinacao: '',
    vacina: '',
    dose: '',
    proximaVacinacao: '',
};

export const editarSlice = createSlice({
    name: 'editar',
    initialState: initicalValues,
    reducers:{
        reducerSetVacina: (state, action) => {
            state.id = action.payload.id;
            state.dataVacinacao = action.payload.dataVacinacao;
            state.vacina = action.payload.vacina;
            state.dose = action.payload.dose;
            state.proximaVacinacao = action.payload.proximaVacinacao;
        }
    }
})

export const {reducerSetVacina} = editarSlice.actions

export default editarSlice.reducer