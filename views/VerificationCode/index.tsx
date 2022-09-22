/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { TextInput, Snackbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
const logo = require('../../assets/img/logo-login.png')
const config = require('../../config/config')

const VerificationCode = (props: any) => {
  const [userId, setUserId] = useState(null)
  const [code, setCode] = useState('')
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [modalDocSuccessVisible, setModalDocSuccessVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false)

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
      props.navigation.navigate('SignupComplete')
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
          // textAlign: 'center',
        }}
      >
        {errorMsg}
      </Snackbar>
      <Text style={styles.title}>Thank you for signing up!</Text>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.description}>
        We have just sent you an email to activate your account.
      </Text>
      <Text style={styles.description}>Enjoy!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="ENTER VERIFICATION CODE"
          keyboardType="numeric"
          maxLength={4}
          onChangeText={(text) => setCode(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={() => verifyCode()}>
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VerificationCode
