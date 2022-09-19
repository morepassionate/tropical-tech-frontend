/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { TextInput, View, TouchableOpacity, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Moment from 'moment'
import SelectDropdown from 'react-native-select-dropdown'
// import Flag from 'react-native-flags'
import Flag from 'react-native-country-flag'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import styles from './styles'
const iconLogo = require('../../assets/img/profile-icon.png')
const imgTick = require('../../assets/img/big-tick.png')
import config from '../../config/config.json'

const SignupStep1 = (props: any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birth, setBirth] = useState('')
  const [phone, setPhone] = useState('')
  const [ddi, setDDI] = useState('+55')
  const [avatar, setAvatar] = useState(
    'https://res.cloudinary.com/uhr-app/image/upload/v1648511083/avatar/avatar.png'
  )
  const [userId, setUserId] = useState(null)

  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const showDatePicker = (text: string) => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    setBirth(Moment(date).format('YYYY-MM-DD'))
    hideDatePicker()
  }
  useEffect(() => {
    getUser()
  }, [])

  //Pegar o id do usuário
  async function getUser() {
    let response = await AsyncStorage.getItem('userData')
    let json = !!response && JSON.parse(response)
    setUserId(json.id)
  }

  const countries = [
    <Flag isoCode="DE" size={24} />,
    <Flag isoCode="BR" size={24} />,
    <Flag isoCode="US" size={24} />
  ]

  const pickAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      setAvatar(result.uri)
    }
  }

  //Envio do form
  async function sendForm() {
    if (firstName != null || lastName != null || birth != null || phone != null)
      if (avatar === null) {
        let response = await fetch(`${config.urlRoot}signup/step1`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            birthDay: birth,
            phone: phone
          })
        })
        let json = await response.json()
        if (json.success === true) {
          console.log(json)
          props.navigation.navigate('SignupStep2')
        } else {
          setErrorMsg(json.message)
          setVisible(true)
        }
      } else {
        let typeAvatar = avatar.slice(-3) // pegando as 3 ultimas letra pra pegar o tipo
        const formData = new FormData() //adicionando informações da imagem em um formData
        formData.append('profile', {
          name: 'profile',
          uri: avatar,
          type: 'image/' + typeAvatar
        })
        //formData.append('name', avatar);
        formData.append('data', true)
        formData.append('userId', userId)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('birthDay', birth)
        formData.append('phone', phone)
        let response = await fetch(`${config.urlRoot}signup/upload-avatar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          },
          body: formData
        })
        let json = await response.json()
        if (json.success === true) {
          props.navigation.navigate('SignupStep2', {
            avatar_url: json.avatar_url
          })
        } else {
          setErrorMsg(json.message)
          setVisible(true)
        }
      }
    else {
      setErrorMsg('All fields are required')
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
        <TouchableOpacity onPress={pickAvatar}>
          {avatar ? (
            <View style={styles.imgSquare}>
              <Image
                source={{
                  uri: avatar
                }}
                style={styles.imgLoaded}
              />
            </View>
          ) : (
            <Image style={styles.img} source={iconLogo} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>Create account</Text>
      </View>

      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Birth of date"
            value={birth}
            keyboardType="numeric"
            onChangeText={(text) => showDatePicker(text)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date(2005, 12, 31)}
            display="default"
          />
        </View>
        <View style={styles.phone}>
          <SelectDropdown
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.buttonText}
            data={countries}
            defaultValueByIndex={1}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#DEE9FF'}
                  size={12}
                />
              )
            }}
            onSelect={(selectedItem, index) => {
              switch (index) {
                case 0:
                  setDDI('+44')
                  break

                case 1:
                  setDDI('+55')
                  break

                case 2:
                  setDDI('+53')
                  break

                default:
                  break
              }
            }}
            buttonTextAfterSelection={(selectedItem, _index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
          <TextInput
            style={[styles.input, styles.inputPhone, styles.ddi]}
            editable={false}
            placeholder="Phone Number"
            value={ddi}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={[styles.input, styles.inputPhone]}
            placeholder="Phone number"
            keyboardType="numeric"
            onChangeText={(text) => setPhone(ddi + text)}
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

export default SignupStep1
