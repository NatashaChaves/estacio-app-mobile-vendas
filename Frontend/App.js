import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, ActivityIndicator  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import LoginScreen from './Screens/LoginScreen';  // Tela de login
import HomeScreen from './Screens/HomeScreen';    // Tela inicial
import CreateUserScreen from './Screens/CreateUserScreen';    // Tela inicial

const Stack = createNativeStackNavigator();
const App = () => {

const [isLoggedIn, setIsLoggedIn] = useState(null); // Estado para saber se o usuário está logado

useEffect(() => {
  // Função para verificar se o usuário está autenticado
  const checkSession = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Recupera o token JWT armazenado
      if (!token) {
        setIsLoggedIn(false); // Se não houver token, o usuário não está logado
        return;
      }

      // Envia uma solicitação para o backend para verificar o token
      const response = await axios.get('http://localhost:3000/check-session', {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho
        },
      });

      if (response.status === 200) {
        setIsLoggedIn(true); // Se o token for válido, o usuário está logado
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false); // Se ocorrer algum erro, o usuário não está logado
    }
  };

  checkSession(); // Chama a função para verificar a sessão

}, []);

if (isLoggedIn === null) {
  // Enquanto a verificação da sessão não terminar, exibe o carregamento
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} /> 
    </Stack.Navigator>
  </NavigationContainer>
);
};


export default App;
