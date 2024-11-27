
import { StyleSheet } from 'react-native';

// Definindo o tema escuro
const darkTheme = {
  backgroundColor: '#121212', // Cor de fundo escura
  textColor: '#fff', // Cor do texto clara
  primaryColor: '#ff9900', // Cor primária (laranja)
  inputBackgroundColor: '#333', // Cor de fundo dos inputs
  inputTextColor: '#fff', // Cor do texto no input
  placeholderColor: '#aaa', // Cor do texto de placeholder
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    color: darkTheme.textColor,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: darkTheme.inputBackgroundColor,
    color: darkTheme.inputTextColor,
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: darkTheme.primaryColor,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: darkTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: darkTheme.placeholderColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountText: {
    color: darkTheme.placeholderColor,
    fontSize: 16,
  },
  createAccountLink: {
    color: darkTheme.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    position: 'relative', // Necessário para o posicionamento absoluto do botão
    marginBottom: 15,
  },
  showPasswordButton: {
    position: 'absolute',  // Posiciona o botão dentro do campo de senha
    right: 10,             // Coloca o botão à direita
    top: 15,               // Ajusta a posição vertical
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPasswordButton: {
    position: 'absolute',  // Posiciona o ícone dentro do campo de senha
    right: 10,             // Coloca o ícone à direita
    top: 12,               // Ajusta a posição vertical do ícone
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;