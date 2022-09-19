import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import UserData from '../../../assets/atoms/UserData'
import LockIcon from '../../../assets/icons/Lock'
import LightButton from '../../../Components/LightButton'
import COLORS from '../../../Constants/styles'
import { TextInputMask } from 'react-native-masked-text'

// import { Container } from './styles';

const CardDetails = ({ navigation }: { navigation: any }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryIn, setExpiryIn] = useState('')
  const [cvv, setCvv] = useState(0)
  const [postcode, setPostcode] = useState('')
  const [userData, setUserData] = useRecoilState(UserData)
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <IconButton
          style={styles.close}
          icon={'close'}
          size={24}
          color={'#8296CA'}
          onPress={() => navigation.navigate('Profile')}
        />
        <Text style={styles.title}>Add card details</Text>

        <View style={styles.rowContent}>
          <Text style={styles.cardText}>Card number</Text>
          <LockIcon />
        </View>
        <TextInputMask
          type={'credit-card'}
          style={styles.input}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard'
          }}
          placeholder={'0000 0000 0000 0000'}
          value={cardNumber}
          onChangeText={(e) => setCardNumber(e)}
        />

        <View style={styles.cardInfos}>
          <View style={styles.singular}>
            <Text style={[styles.cardText, { marginTop: 40, marginLeft: 10 }]}>Expiry</Text>
            <TextInputMask
              type={'custom'}
              style={[styles.input]}
              keyboardType={'number-pad'}
              options={{
                mask: '99/99'
              }}
              placeholder={'MM/YY'}
              value={expiryIn}
              onChangeText={(e) => setExpiryIn(e)}
            />
          </View>
          <View style={styles.singular}>
            <Text style={[styles.cardText, { marginTop: 40, marginLeft: 10 }]}>CVV</Text>
            <TextInputMask
              type={'custom'}
              style={[styles.input]}
              keyboardType={'number-pad'}
              options={{
                mask: '999'
              }}
              placeholder={'123'}
              value={cvv.toString()}
              onChangeText={(e) => setCvv(Number(e))}
            />
          </View>
          <View style={styles.singular}>
            <Text style={[styles.cardText, { marginTop: 40, marginLeft: 10 }]}>Postcode</Text>
            <TextInputMask
              type={'custom'}
              style={[styles.input]}
              options={{
                mask: 'AA9 9AA'
              }}
              placeholder={'Aa9 9Aa'}
              value={postcode}
              onChangeText={(e) => setPostcode(e)}
            />
          </View>
        </View>

        <LightButton
          text="Save"
          style={styles.button}
          colorsLinear={
            cardNumber.length > 0 && expiryIn.length > 0 && cvv > 0 && postcode.length > 0
              ? ['#DEE9FF', '#1B66FD']
              : ['#CFD5D7', '#CFD5D7']
          }
          textStyle={[
            styles.labelStyle,
            cardNumber.length > 0 && expiryIn.length > 0 && cvv > 0 && postcode.length > 0
              ? { color: '#4A5CAE' }
              : { color: 'white' }
          ]}
          onPress={() => {
            if (cardNumber.length > 0 && expiryIn.length > 0 && cvv > 0 && postcode.length > 0) {
              if (userData?.creditCard.length === 0 || userData?.creditCard.length === undefined) {
                setUserData((prevStatus) => ({
                  ...(prevStatus || {}),
                  creditCard: [
                    {
                      cardNumber: cardNumber,
                      expiry: expiryIn,
                      cvv,
                      postcode
                    }
                  ],
                  favoritesList: []
                }))
              } else {
                setUserData((prevStatus) => ({
                  ...(prevStatus || {}),
                  creditCard: [
                    ...(prevStatus?.creditCard || []),
                    {
                      cardNumber: cardNumber,
                      cvv,
                      expiry: expiryIn,
                      postcode
                    }
                  ],
                  favoritesList: []
                }))
              }
              setCardNumber('')
              setExpiryIn('')
              setCvv(0)
              setPostcode('')
              navigation.navigate('Profile')
            } else {
              return
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 22
  },
  close: {
    alignSelf: 'flex-end',
    margin: 0
  },
  notMargin: {
    margin: 0
  },
  title: {
    fontSize: 32,
    fontFamily: 'Corbel-Bold',
    marginBottom: 40
  },
  rowContent: {
    flexDirection: 'row'
  },
  cardText: {
    marginRight: 14,
    fontSize: 16,
    fontFamily: 'Corbel-Bold'
  },
  input: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue,
    fontFamily: 'Corbel',
    fontSize: 16
  },
  cardInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  singular: {
    width: '31%'
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: 30
  },
  labelStyle: {
    fontFamily: 'Corbel-Bold',
    fontSize: 16,
    paddingHorizontal: 40
  }
})

export default CardDetails
