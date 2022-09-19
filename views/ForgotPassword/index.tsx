import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { Snackbar } from 'react-native-paper'

import config from '../../config/config.json'

import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'

const ForgotPassword = (props: any) => {
  const [email, setEmail] = useState('')
  const [successVisible, setSuccessVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [msg, setMsg] = useState(null)
  const onToggleSuccessSnackBar = () => setSuccessVisible(!successVisible)
  const onDismissSuccessSnackBar = () => setSuccessVisible(false)
  const onToggleErrorSnackBar = () => setErrorVisible(!errorVisible)
  const onDismissErrorSnackBar = () => setErrorVisible(false)

  //Envio do form de login
  async function sendForm() {
    let response = await fetch(`${config.urlRoot}forgotpassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    let json = await response.json()
    if (json.success === true) {
      setSuccessVisible(true)
      setMsg(json.message)
    }
    if (json.success === false) {
      setErrorVisible(true)
      setMsg(json.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Forgot password</Text>
        <Image style={styles.imgLock} source={require('../../assets/img/lock.png')} />
      </View>

      <View style={styles.containerMessage}>
        <Text style={styles.texto}>
          Enter your email below to receive your password reset instructions
        </Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.resetButton} onPress={() => sendForm()}>
          <Text style={styles.resetButtonText}>Reset password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('LoginOption')}>
          <Text style={styles.textFooter}>I remember the password</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={errorVisible}
        onDismiss={onDismissErrorSnackBar}
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
        {msg}
      </Snackbar>

      <Snackbar
        visible={successVisible}
        onDismiss={onDismissSuccessSnackBar}
        action={{
          label: 'X'
        }}
        theme={{
          colors: {
            onSurface: 'rgba(0, 119, 104, 0.8)',
            surface: '#fff'
          }
          // textAlign: 'center'
        }}
      >
        {msg}
      </Snackbar>
    </View>
  )
}

export default ForgotPassword
