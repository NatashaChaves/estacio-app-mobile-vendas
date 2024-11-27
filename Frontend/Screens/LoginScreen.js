// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log(password)
    setError('');
    try {
      // Enviar credenciais para o backend
      const response = await axios.post('http://localhost:3000/login', { email, password });

      // Armazenar o token JWT no AsyncStorage
     
      await AsyncStorage.setItem('token', response.data.token);

      // Navegar para a tela inicial
      navigation.replace('Home');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Erro de rede');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source= {require('../assets/ponto-das-cameras.png')}  
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Bem-vindo de volta!</Text>

      {/* Campo de E-mail */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão de Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link para recuperar a senha */}
      <TouchableOpacity onPress={() => console.log('Recuperar senha')}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Link para criar uma nova conta */}
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Novo por aqui? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateUserScreen')}>
          <Text style={styles.createAccountLink}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default LoginScreen;
