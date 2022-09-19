/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { TextInput, View, TouchableOpacity, Text, Image, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Snackbar } from 'react-native-paper'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Moment from 'moment'

import styles from './styles'
const imgTick = require('../../assets/img/big-tick.png')
const config = require('../../config/config')

const SignupStep4 = (props: any) => {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [issueDate, setIssueDate] = useState('')
  const [expireDate, setExpireDate] = useState('')
  const [idNumber, setIdNumber] = useState('')

  const [avatar, setAvatar] = useState(props.route.params.avatar_url)
  const [userId, setUserId] = useState(null)
  const [enable, setEnable] = useState(true)

  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const [modalVisibleDoc, setModalVisibleDoc] = useState(false)
  const [modalDocSuccessVisible, setModalDocSuccessVisible] = useState(false)
  const [progressDoc, setProgressDoc] = useState(false)
  const [isIssueDateVisible, setIsIssueDateVisible] = useState(false)
  const [isExpireDateVisible, setIsExpireDateVisible] = useState(false)

  const typesOfIds = ['Passport', 'Nacional ID', "Driver's License"]
  const countries = ['Brazil', 'USA', 'Spain', 'Italy']

  const showIssueDate = (text: string) => {
    setIsIssueDateVisible(true)
  }
  const showExpireDate = (text: string) => {
    setIsExpireDateVisible(true)
  }

  const hideIssueDate = () => {
    setIsIssueDateVisible(false)
  }
  const hideExpireDate = () => {
    setIsExpireDateVisible(false)
  }

  const handleConfirmIssueDate = (date: Date) => {
    setIssueDate(Moment(date).format('YYYY-MM-DD'))
    hideIssueDate()
  }
  const handleConfirmExpireDate = (date: Date) => {
    setExpireDate(Moment(date).format('YYYY-MM-DD'))
    hideExpireDate()
  }

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

  const pickImageDocumentDoc = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      setModalVisibleDoc(false)
      setProgressDoc(true)
      sendDocForm(result.uri)
    }
  }
  const pickFromGalleryDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({})
    if (result.type === 'success') {
      setModalVisibleDoc(false)
      setProgressDoc(true)
      sendDocForm(result.uri)
    }
  }

  //Envio sem documento
  async function sendNoDocForm() {
    setEnable(false)
    let response = await fetch(`${config.urlRoot}signup/step5`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        typeOfId: selectedType,
        countryOfIssue: selectedCountry,
        issueDate: issueDate,
        expireDate: expireDate,
        number: idNumber
      })
    })
    let json = await response.json()
    if (json.success === true) {
      props.navigation.navigate('VerificationCode')
    } else {
      setErrorMsg(json.message)
      setVisible(true)
    }
  }

  //Envio do form com documentos
  async function sendDocForm(imageDoc: string) {
    let typeDocument = imageDoc.slice(-3) // pegando as 3 ultimas letra pra pegar o tipo
    const formData = new FormData() //adicionando informações da imagem em um formData
    formData.append('id', {
      name: 'document',
      uri: imageDoc,
      type: 'image/' + typeDocument
    })
    formData.append('data', true)
    formData.append('id', userId)
    formData.append('typeOfId', selectedType)
    formData.append('countryOfIssue', selectedCountry)
    formData.append('issueDate', issueDate)
    formData.append('expireDate', expireDate)
    formData.append('number', idNumber)
    let response = await fetch(`${config.urlRoot}signup/step5/upload-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      },
      body: formData
    })
    let json = await response.json()
    if (json.success === true) {
      setProgressDoc(false)
      setModalDocSuccessVisible(true)
      setTimeout(() => {
        setModalDocSuccessVisible(false)
      }, 3000)
      setTimeout(() => {
        props.navigation.navigate('VerificationCode')
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
        <SelectDropdown
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          data={typesOfIds}
          defaultButtonText="Type of ID"
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-right' : 'chevron-down'}
                color={'#DEE9FF'}
                size={14}
              />
            )
          }}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
          onSelect={(selectedItem, index) => {
            setSelectedType(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <SelectDropdown
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          data={countries}
          defaultButtonText="Country of issue"
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-right' : 'chevron-down'}
                color={'#DEE9FF'}
                size={14}
              />
            )
          }}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
          onSelect={(selectedItem, index) => {
            setSelectedCountry(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Issue date"
            value={issueDate}
            keyboardType="numeric"
            onChangeText={(text) => showIssueDate(text)}
          />
          <DateTimePickerModal
            isVisible={isIssueDateVisible}
            mode="date"
            onConfirm={handleConfirmIssueDate}
            onCancel={hideIssueDate}
            display="default"
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="Expire date"
            value={expireDate}
            keyboardType="numeric"
            onChangeText={(text) => showExpireDate(text)}
          />
          <DateTimePickerModal
            isVisible={isExpireDateVisible}
            mode="date"
            onConfirm={handleConfirmExpireDate}
            onCancel={hideExpireDate}
            display="default"
          />
        </View>
        <View style={styles.inputBottom}>
          <TextInput
            style={styles.input}
            placeholder="ID Number"
            onChangeText={(text) => setIdNumber(text)}
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
          <TouchableOpacity onPress={() => setModalVisibleDoc(true)}>
            <Text style={styles.textBtnSignup}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleDoc}
        onRequestClose={() => {
          setModalVisibleDoc(!modalVisibleDoc)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please provide a copy of a valid identification document such as a Passport, National
              ID or Driver’s License{' '}
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={pickImageDocumentDoc}
            >
              <Text style={styles.textStyle}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={pickFromGalleryDoc}
            >
              <Text style={styles.textStyle}>Select from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonUploadLater]}
              onPress={() => sendNoDocForm()}
            >
              <Text style={styles.textUploadLater}>Upload later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDocSuccessVisible}
        onRequestClose={() => {
          setModalDocSuccessVisible(!modalDocSuccessVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Please provide a copy of a valid identification document such as a Passport, National
              ID or Driver’s License{' '}
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
        visible={progressDoc}
        onRequestClose={() => {
          setProgressDoc(!progressDoc)
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

export default SignupStep4
