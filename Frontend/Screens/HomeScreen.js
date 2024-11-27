// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          // Verifique o token com o backend (opcional)
          const response = await axios.get('http://localhost:3000/protected-route', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (err) {
          console.log('Token inválido', err);
          navigation.replace('Login');
        }
      } else {
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      {user ? (
        <>
          <Text>Bem-vindo, {user.email}</Text>
          <Button title="Sair" onPress={handleLogout} />
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
