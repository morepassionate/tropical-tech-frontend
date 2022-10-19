/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { TextInput, View, TouchableOpacity, Text, Image, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios'

import styles from './styles'

const imgTick = require('../../assets/img/big-tick.png')
const config = require('../../config/config')

const SignupStep2 = (props: any) => {
  const [addressL1, setAddressL1] = useState('')
  const [addressL2, setAddressL2] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [avatar, setAvatar] = useState(props.route.params.avatar_url)
  const [userId, setUserId] = useState(null)
  const [enable, setEnable] = useState(true)

  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false)
  const [progress, setProgress] = useState(false)

  //console.log(props.route.params.avatar_url);
  useEffect(() => {
    getUser()
  }, [])

  //Pegar o id do usuário
  async function getUser() {
    let response = await AsyncStorage.getItem('userData')
    let json = !!response && JSON.parse(response)
    setUserId(json.id)
  }

  const pickImageDocument = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      setProgress(true)
      sendForm(result.uri)
      setModalVisible(false)
    }
  }
  const pickFromGallery = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
    if (result.type === 'success') {
      setProgress(true)
      sendForm(result.uri)
      setModalVisible(false)
    }
  }

  //Envio sem documento
  async function sendNoDoc() {
    setEnable(false)
    let response = await fetch(`${config.urlRoot}signup/step3`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        addressL1: addressL1,
        addressL2: addressL2,
        state: state,
        city: city,
        postal: postal
      })
    })
    let json = await response.json()
    if (json.success === true) {
      props.navigation.navigate('SignupStep3')
    } else {
      setErrorMsg(json.message)
      setVisible(true)
    }
  }

  //Envio do form com documentos
  async function sendForm(imageDoc: string) {
    let typeDocument = imageDoc.slice(-3) // pegando as 3 ultimas letra pra pegar o tipo
    const formData = new FormData() //adicionando informações da imagem em um formData
    formData.append('document', {
      name: 'document',
      uri: imageDoc,
      type: 'image/' + typeDocument
    })
    formData.append('data', true)
    formData.append('id', userId)
    formData.append('addressL1', addressL1)
    formData.append('addressL2', addressL2)
    formData.append('state', state)
    formData.append('city', city)
    formData.append('postal', postal)
    let response = await fetch(`${config.urlRoot}signup/upload-document`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      },
      body: formData
    })
    let json = await response.json()
    if (json.success === true) {
      setProgress(false)
      setModalSuccessVisible(true)
      setTimeout(() => {
        setModalSuccessVisible(false)
      }, 3000)
      setTimeout(() => {
        props.navigation.navigate('SignupStep3', { avatar_url: avatar })
      }, 3000)
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
      <View style={styles.loginLogomarca}>
        <View style={styles.imgSquare}>
          <Image source={{ uri: avatar }} style={styles.imgLoaded} />
        </View>
        <Text style={styles.title}>Create account</Text>
      </View>

      <View style={styles.loginForm}>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Address line 1"
            onChangeText={(text) => setAddressL1(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Address line 2"
            onChangeText={(text) => setAddressL2(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="State/Province/Region"
            onChangeText={(text) => setState(text)}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="City/Town"
            onChangeText={(text) => setCity(text)}
            // required={true}
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Postal/Zip code"
            onChangeText={(text) => setPostal(text)}
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.textBtnSignup}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please upload proof of address such as a Utility Bill or Bank Statement showing your
              name.{' '}
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={pickImageDocument}
            >
              <Text style={styles.textStyle}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={pickFromGallery}>
              <Text style={styles.textStyle}>Select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonUploadLater]}
              onPress={() => sendNoDoc()}
            >
              <Text style={styles.textUploadLater}>Upload later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => {
          setModalSuccessVisible(!modalSuccessVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please upload proof of address such as a Utility Bill or Bank Statement showing your
              name.{' '}
            </Text>
            <View style={styles.containerUpload}>
              <Text style={styles.titleUpload}>Upload successful</Text>
              <Image style={styles.imgTick} source={imgTick} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={progress}
        onRequestClose={() => {
          setProgress(!progress)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>One moment...</Text>
            <Progress.Circle
              color="#1B4298"
              borderWidth={5}
              size={50}
              indeterminate={true}
              style={styles.progress}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default SignupStep2
