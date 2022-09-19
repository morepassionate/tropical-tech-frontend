/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

import config from '../../config/config.json'

import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'
const touch = require('../../assets/img/touch-icon.png')
const touchComplete = require('../../assets/img/icon-complete.png')

const LoginTouch = (props: any) => {
  const [icon, setIcon] = useState(touch)
  const [display, setDisplay] = useState('none')
  const [show, setShow] = useState('none')
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [login, setLogin] = useState(false)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    verifyLogin()
  }, [])

  useEffect(() => {
    if (login === true) {
      biometric()
    }
  }, [login])

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

  function alert(msg: string) {
    console.log(msg)
  }

  //Chama Biometria
  async function biometric() {
    let compatible = await LocalAuthentication.hasHardwareAsync()
    if (compatible) {
      let biometricRecords = await LocalAuthentication.isEnrolledAsync()
      if (!biometricRecords) {
        alert('Biometria não cadastrada!')
      } else {
        let result = await LocalAuthentication.authenticateAsync()
        if (result.success) {
          setTimeout(() => {
            setDisplay('flex')
          }, 400)

          setFill(100)
          setTimeout(() => {
            setDisplay('none')
          }, 5000)

          setTimeout(() => {
            setIcon(touchComplete)
            setShow('flex')
          }, 5000)
          setTimeout(() => {
            sendForm()
          }, 3000)
        } else {
          setEmail(null)
          setPassword(null)
        }
      }
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
      alert('usuário ou senha inválidos')
      /*setTimeout(()=>{
        setDisplay('none');
      }, 5000);*/
      await AsyncStorage.clear()
    } else {
      let userData = await AsyncStorage.setItem('userData', JSON.stringify(json))
      setTimeout(() => {
        props.navigation.navigate('Home')
      }, 3000)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/img/logo-login.png')} />
        <Text style={styles.title}>Touch ID</Text>
      </View>

      <ImageBackground style={styles.iconTouch} source={icon}>
        <AnimatedCircularProgress
          size={193}
          duration={5000}
          width={8}
          fill={fill}
          tintColor="#1B4298"
          //onAnimationComplete={() => }
          backgroundColor="#fff"
          style={styles.circle}
        />
      </ImageBackground>
      <View style={styles.containerMessage}>
        <Text style={styles.texto}>Place and hold your finger on the fingerprint reader</Text>
        <Text style={display === 'none' ? styles.messageNone : styles.messageFlex}>
          One moment...
        </Text>
        <Image
          style={show === 'none' ? styles.doneIconNone : styles.doneIconFlex}
          source={require('../../assets/img/donebutton.png')}
        />
      </View>
      <View style={styles.btnContainer}>
        <LinearGradient
          style={styles.btnEmail}
          colors={['#DEE9FF', '#1B4298']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('LoginPasscode')}
          >
            <Text style={styles.buttonText}>Log in with email</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

export default LoginTouch
