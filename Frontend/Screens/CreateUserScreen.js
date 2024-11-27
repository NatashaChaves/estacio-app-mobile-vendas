import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles'; 


const CreateUserScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleCreateAccount  = async () => {
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
              source={require('../assets/ponto-das-cameras.png')}
              style={styles.logo}
            />
          </View>
    
          <Text style={styles.title}>Crie sua conta</Text>
    
          {/* Nome */}
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor={styles.forgotPasswordText.color}
            value={name}
            onChangeText={setName}
          />
    
          {/* E-mail */}
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor={styles.forgotPasswordText.color}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
    
          {/* Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor={styles.forgotPasswordText.color}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // A senha será oculta se showPassword for falso
        />
        <TouchableOpacity 
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)} // Alterna entre ver/ocultar senha
        >
            <Icon 
            name={showPassword ? 'visibility' : 'visibility-off'} // Icone de olho aberto ou fechado
            size={24} 
            color={'#ff9900'} 
            />
        </TouchableOpacity>
      </View>
    
          {/* Botão para criar conta */}
          <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccount}>
            <Text style={styles.loginButtonText}>Criar Conta</Text>
          </TouchableOpacity>
    
          {/* Voltar para a tela de login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.forgotPasswordText}>Já tem uma conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      );
};


export default CreateUserScreen;