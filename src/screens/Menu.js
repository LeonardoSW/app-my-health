import Login from '../screens/Login'
import Home from '../screens/Home'

import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyDrawer from '../components/MyDrawer';
import ProximasVacinas from './ProximasVacinas';
import NovaVacina from './NovaVacina';
import EditarVacina from './EditarVacina';
import CardVacinaComponent from '../components/CardVacinaComponent';


const Drawer = createDrawerNavigator();

export default function Menu(props) {
    return (
      <NavigationContainer independent = {true}>
        <Drawer.Navigator drawerContent={(props) => <MyDrawer {...props}/>}>
          <Drawer.Screen options={{headerTintColor:'#419ED7', headerStyle: {backgroundColor:'#C1E7E3', height:50}}} name='Minhas Vacinas' component={Home} />
          <Drawer.Screen options={{headerTintColor:'#419ED7', headerStyle: {backgroundColor:'#C1E7E3', height:50}}} name='Proximas Vacinas' component={ProximasVacinas}/>
          <Drawer.Screen name='Nova Vacina' component={NovaVacina} options= {{ drawerItemStyle:{height: 0}, headerTintColor: '#419ED7', headerStyle: {backgroundColor:'#C1E7E3', height:50} }}/>
          <Drawer.Screen name='Editar Vacina' component={EditarVacina} options= {{ drawerItemStyle:{height: 0}, headerTintColor: '#419ED7', headerStyle: {backgroundColor:'#C1E7E3', height:50} }}/>
          <Drawer.Screen name='Vacina Comp' component={CardVacinaComponent} options= {{drawerItemStyle:{height: 0}, headerTintColor: '#419ED7', headerStyle: {backgroundColor:'#C1E7E3', height:50}}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    drawerMenu:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  })