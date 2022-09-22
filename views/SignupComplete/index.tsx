/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { TextInput, Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
const logo = require('../../assets/img/logo-login.png')
import config from '../../config/config.json'

const SignupComplete = (props: any) => {
  const [userId, setUserId] = useState(null)
  const [code, setCode] = useState(null)
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  //Pegar o id do usuário
  async function getUser() {
    let response = await AsyncStorage.getItem('userData')
    let json = !!response && JSON.parse(response)
    setUserId(json.id)
    generateCode(json.id)
  }

  /* useEffect(()=>{
    generateCode();
  }, []);*/

  async function generateCode(id: number) {
    //getUser();
    // console.log('ID 123 = ' + id)
    let response = await fetch(`${config.urlRoot}signup/generateCode`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }

  async function verifyCode() {
    //console.log(code);
    let response = await fetch(`${config.urlRoot}signup/verifyCode`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        code: code
      })
    })
    let json = await response.json()
    if (json.success === true) {
      // console.log('OK - Success - ' + json)
      // props.navigation.navigate('SignupStep2');
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
          //   textAlign: 'center'
        }}
      >
        {errorMsg}
      </Snackbar>
      <Text style={styles.title}>Success!</Text>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.subtitle}>Activation is complete and your account has been created.</Text>
      <Text style={styles.description}>
        Find out more about how UHR app works by visiting our website www.uhrewards.com
      </Text>
      <Text style={styles.description2}>
        If you have any questions, suggestions or comments, please send us an email at
        support@uhrewards.com
      </Text>
      <Text style={styles.description}>Enjoy!</Text>

      <View style={styles.form}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.navigation.navigate('LoginPasscode')}
        >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignupComplete
