import React, { useState, useEffect } from 'react'
import { TextInput, View, TouchableOpacity, Text, Image, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'

import styles from './styles'
import config from '../../config/config.json'

const SignupStep3 = (props: any) => {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [avatar, setAvatar] = useState(props.route.params.avatar_url)
  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [selectedQuestion1, setSelectedQuestion1] = useState('Question 1')
  const [selectedQuestion2, setSelectedQuestion2] = useState('Question 4')
  const [selectedItem, setSelectedItem] = useState(null)
  const [userId, setUserId] = useState(null)

  const questions1 = ['Question 1', 'Question 2', 'Question 3']
  const questions2 = ['Question 4', 'Question 5', 'Question 6']

  useEffect(() => {
    getUser()
  }, [])

  //Pegar o id do usuário
  async function getUser() {
    let response = await AsyncStorage.getItem('userData')
    let json = !!response && JSON.parse(response)
    setUserId(json.id)
  }

  //Envio do form com documentos
  async function sendForm() {
    // console.log(userId)
    let response = await fetch(`${config.urlRoot}signup/step4`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        question1: selectedQuestion1,
        answer1: answer1,
        question2: selectedQuestion2,
        answer2: answer2
      })
    })
    let json = await response.json()
    if (json.success === true) {
      props.navigation.navigate('SignupStep4', {
        avatar_url: avatar
      })
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
      <View style={styles.loginLogomarca}>
        <View style={styles.imgSquare}>
          <Image source={{ uri: avatar }} style={styles.imgLoaded} />
        </View>
        <Text style={styles.title}>Create account</Text>
      </View>
      <SelectDropdown
        buttonStyle={styles.dropdown}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        data={questions1}
        defaultValueByIndex={0}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#DEE9FF'}
              size={14}
            />
          )
        }}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        onSelect={(selectedItem, index) => {
          setSelectedQuestion1(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />

      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Answer"
            onChangeText={(text) => setAnswer1(text)}
          />
        </View>
      </View>
      <SelectDropdown
        buttonStyle={styles.dropdown}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        data={questions2}
        defaultValueByIndex={0}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#DEE9FF'}
              size={14}
            />
          )
        }}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown2RowTxtStyle}
        onSelect={(selectedItem, index) => {
          setSelectedQuestion2(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />
      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Answer"
            onChangeText={(text) => setAnswer2(text)}
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
            <Text style={styles.textBtnSignup}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

export default SignupStep3
