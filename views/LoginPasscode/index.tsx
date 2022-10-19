import React, { useState, useEffect } from 'react'
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform
} from 'react-native'
import { Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'
import config from '../../config/config.json'

const Login = (props: any) => {
  const [display, setDisplay] = useState('none')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    verifyLogin()
  }, [])

  /*useEffect(()=>{
    if(login === true){
      biometric();
    }
  }, [login]);*/

  //Verifica se o user já possui algum login
  async function verifyLogin() {
    let response = await AsyncStorage.getItem('userData')
    let json = !!response && (await JSON.parse(response))
    if (json !== null) {
      setEmail(json.email)
      setPassword(json.password)
      setLogin(true)
    }
  }

  //Envio do form de login
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    let json = await response.json()
    if (json === 'error') {
      setVisible(true)
      setErrorMsg('User or password is wrong!')
      await AsyncStorage.clear()
    } else {
      let userData = await AsyncStorage.setItem('userData', JSON.stringify(json))
      props.navigation.navigate('Home')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'X'
        }}
        theme={{
          colors: {
            onSurface: 'rgba(211, 47, 47, 0.8)',
            surface: '#fff'
          }
          //   textAlign: 'center'
        }}
      >
        {errorMsg}
      </Snackbar>
      <View style={styles.loginLogomarca}>
        <Image source={require('../../assets/img/logo-login.png')} />
        <Text style={styles.textLogin}>Log in</Text>
      </View>
      <View>
        <Text style={styles.loginMsg}>Usuário ou senha inválidos</Text>
      </View>
      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.loginButton} onPress={() => sendForm()}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.text}>Forgot password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxSignUp}>
        <Text style={styles.textSignup}>Don't have an account?</Text>
        <LinearGradient
          style={styles.btnSignup}
          colors={['rgba(27,102,253,0.5)', '#DEE9FF']}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.textBtnSignup}>Sign up</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login
