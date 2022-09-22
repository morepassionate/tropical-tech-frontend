/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'
const logo = require('../../assets/img/logo-login.png')
import config from '../../config/config.json'
import { useRecoilState } from 'recoil'
import AuthStatus from '../../assets/atoms/AuthStatus'

const Signup = (props: any) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [passLenght, setPassLenght] = useState(0)

  const [authStatus, setAuthStatus] = useRecoilState(AuthStatus)

  //Envio do form
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })
    })
    let json = await response.json()
    if (json.success === true) {
      // console.log('Ok ' + json)
      let userData = await AsyncStorage.setItem('userData', JSON.stringify(json))
      props.navigation.navigate('SignupStep1')
    } else {
      setErrorMsg(json.message)
      setVisible(true)
    }
  }

  return (
    <View style={styles.container}>
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
          // textAlign: 'center'
        }}
      >
        {errorMsg}
      </Snackbar>
      <View style={styles.loginLogomarca}>
        <Image style={styles.img} source={logo} />
        <Text style={styles.title}>Create account</Text>
      </View>

      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            // required={true}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            onChangeText={(text) => setEmail(text)}
            // required={true}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => [setPassword(text), setPassLenght(text.length)]}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
      </View>
      <View style={styles.boxSignUp}>
        <LinearGradient
          style={styles.btnSignup}
          colors={['rgba(27,102,253,0.5)', '#DEE9FF']}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity onPress={() => sendForm()}>
            <Text style={styles.textBtnSignup}>Sign up</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={[styles.skipBtn, styles.btnSignup]}
          colors={['rgba(27,102,253,0.5)', '#DEE9FF']}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity
            onPress={() => {
              //   props.navigation.navigate('Signup')
              setAuthStatus({
                isAuthenticated: true
              })
              props.navigation.navigate('HomeNav')
            }}
          >
            <Text style={styles.textBtnSignup}>Skip</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

export default Signup
