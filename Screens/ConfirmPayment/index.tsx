import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import { Button, IconButton, Paragraph } from 'react-native-paper'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import AuthStatus from '../../assets/atoms/AuthStatus'
import PurchaseAtom, { PurchaseProps } from '../../assets/atoms/Purchase'
import CashbackAtom from '../../assets/atoms/Purchase/cashback'
import UserData from '../../assets/atoms/UserData'
import MasterCardIcon from '../../assets/icons/MasterCard'
import COLORS from '../../Constants/styles'
import { dataHotel } from '../../data'
import styles from './styles'

const ConfirmPayment = ({ navigation, route }: any) => {
  const mock = [
    { title: 'Date', info: 'Day, Date' },
    { title: 'Check-in time', info: '08:00' },
    { title: 'Check-out time', info: '18:00' },
    { title: 'Guests', info: '1 adult' }
  ]
  const [addNewCard, setAddNewCard] = useState(false)
  const code = route.params?.hotelId
  const authStatus = useRecoilValue(AuthStatus)
  const userData = useRecoilValue(UserData)
  const [purchase, setPurchase] = useRecoilState(PurchaseAtom)
  const setCashback = useSetRecoilState(CashbackAtom)
  useEffect(() => {
    // console.log(code)
  }, [])
  return (
    <ScrollView>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      <View style={styles.container}>
        <IconButton
          icon={'chevron-left'}
          size={30}
          style={styles.notMargin}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ textAlign: 'center' }}>Confirm and Pay</Text>
        <View style={[styles.rowContainer, { marginTop: 40 }]}>
          <View style={{ width: '40%' }}>
            <Image
              source={{
                uri:
                  dataHotel[code]?.image ??
                  'https://cdn.pixabay.com/photo/2016/11/21/17/34/las-vegas-1846684__340.jpg'
              }}
              resizeMode={'cover'}
              style={{ width: 100, height: 100, borderRadius: 12 }}
            />
            <View style={[styles.rowContainer, { alignItems: 'center' }]}>
              <IconButton icon={'star'} size={12} />
              <Text>{`4.91(155)`}</Text>
            </View>
          </View>
          <View style={{ width: '60%' }}>
            <Text style={styles.title}>{`${dataHotel[code].name}`}</Text>
            <Text style={styles.vertical12}>{`${dataHotel[code].country}`}</Text>
            <Text style={styles.vertical12}> nº nights</Text>
            <Text style={styles.vertical12}>Languages spoken: English, Portuguese and Spanish</Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.title}>Your experience</Text>
        {mock.map((item, index) => (
          <View style={styles.experiences} key={index}>
            <Text style={styles.boldText}>{item.title}</Text>
            <Text style={styles.info}>{item.info}</Text>
          </View>
        ))}
        <TouchableOpacity style={{ alignItems: 'flex-end' }}>
          <Text style={{ textDecorationLine: 'underline' }}>Edit</Text>
        </TouchableOpacity>
        <View style={[styles.line, { marginTop: 30 }]} />
        <Text style={styles.title}>Price details</Text>
        <View style={{ marginTop: 40 }}>
          <View style={[styles.rowContainer, { justifyContent: 'space-between' }]}>
            <Text
              style={{
                fontFamily: 'Corbel',
                fontSize: 16,
                lineHeight: 19
              }}
            >{`${dataHotel[code].value.toFixed(2)}$ X 1 adult`}</Text>
            <Text
              style={{
                fontFamily: 'Corbel',
                fontSize: 16,
                lineHeight: 19
              }}
            >{`${dataHotel[code].value.toFixed(2)}$`}</Text>
          </View>
          <View style={[styles.rowContainer, { justifyContent: 'space-between', marginTop: 15 }]}>
            <Text style={[styles.boldText, { fontSize: 16 }]}>{`Total ($)`}</Text>
            <Text
              style={{
                fontFamily: 'Corbel',
                fontSize: 16,
                lineHeight: 19
              }}
            >{`${dataHotel[code].value.toFixed(2)}$`}</Text>
          </View>
        </View>
        {authStatus?.isAuthenticated ? (
          <>
            <View style={[styles.line, { marginTop: 30 }]} />
            <Text style={[styles.title]}>Cashback</Text>
            <View style={[styles.rowContainer, { justifyContent: 'space-between', marginTop: 12 }]}>
              <Text
                style={{
                  fontFamily: 'Corbel',
                  fontSize: 16,
                  lineHeight: 19
                }}
              >{`Earnings`}</Text>

              <View style={styles.pinCashback}>
                <Text style={styles.pinText}>{`${
                  (dataHotel[code].value * 10) / 100
                }$ CASHBACK`}</Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={[styles.line, { marginTop: 30 }]} />
            <Text style={[styles.title]}>Sign in to earn Cashback</Text>
          </View>
        )}
        <View style={[styles.line, { marginTop: 38 }]} />
        <Text style={[styles.title, { marginTop: 15, marginBottom: 15 }]}>Things to know</Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: 'Corbel',
            lineHeight: 19,
            marginBottom: 15
          }}
        >
          Guest requirements
        </Text>
        <Text style={{ fontFamily: 'Corbel', fontSize: 16, lineHeight: 19, marginBottom: 15 }}>
          Up to 10 guests, ages 18 and up can attend
        </Text>
        <Text
          style={{
            fontFamily: 'Corbel',
            fontSize: 16,
            lineHeight: 19,
            textDecorationLine: 'underline'
          }}
        >
          Learn more
        </Text>
        <View style={[styles.line, { marginTop: 25 }]} />
        <Text style={styles.title}>Pay with</Text>
        <View style={[styles.rowContainer, { justifyContent: 'space-between', marginTop: 24 }]}>
          <View style={[styles.rowContainer, { width: '30%', alignItems: 'center' }]}>
            {userData && userData?.creditCard.length > 0 ? (
              <>
                {userData?.creditCard?.map((item, index) => (
                  <View key={index}>
                    <MasterCardIcon />
                    <Text
                      style={{ marginLeft: 20, fontFamily: 'Corbel', fontSize: 16 }}
                    >{`**** ${item.cardNumber.slice(15, 19)}`}</Text>
                  </View>
                ))}
              </>
            ) : (
              <>
                <Text
                  style={{ marginLeft: 20, fontFamily: 'Corbel', fontSize: 16 }}
                >{`Add card`}</Text>
                {!addNewCard && <Text style={styles.requiredCard}>{`Required for purchase`}</Text>}
              </>
            )}
          </View>
          <TouchableOpacity
            style={{ width: '70%', alignItems: 'flex-end', justifyContent: 'center' }}
            onPress={() => navigation.navigate('ManagePayment')}
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: 'Corbel',
                fontSize: 16,
                lineHeight: 19
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.line, { marginTop: 30 }]} />
        <Text style={styles.policy}>Cancellation policy</Text>
        <Text style={{ fontFamily: 'Corbel', fontSize: 16, lineHeight: 19, marginBottom: 15 }}>
          Any experience can be cancelled and fully refunded within 24 hours of purchase, or at
          least 7 days before the experience starts.
        </Text>
        <TouchableOpacity>
          <Text style={{ textDecorationLine: 'underline', fontFamily: 'Corbel', fontSize: 16 }}>
            Learn more
          </Text>
        </TouchableOpacity>
        <View style={[styles.line, { marginTop: 19 }]} />
        <Text style={{ marginTop: 22, fontSize: 16, lineHeight: 19, fontFamily: 'Corbel' }}>
          By selecting the button below, you agree to the{' '}
          <Text
            style={{ textDecorationLine: 'underline', fontFamily: 'Corbel', fontWeight: 'bold' }}
          >
            Guest Release and Waiver, the Cancellation Policy, the Guest Refund Policy and
            social-distancing and other COVID-19-related guidelines.
          </Text>{' '}
          Payment Terms between you and UHR.
        </Text>
        <Button
          mode={'contained'}
          style={styles.buttonStyle}
          labelStyle={{ color: 'white', fontFamily: 'Corbel' }}
          onPress={() => {
            if (userData?.creditCard.length === 0 || userData?.creditCard.length === undefined) {
              navigation.navigate('ReservationAccepted')
              setAddNewCard(true)
              return
            } else {
              if (purchase?.length === 0 || purchase?.length === undefined) {
                setPurchase([
                  {
                    day: new Date().toUTCString(),
                    outValue: dataHotel[code].value,
                    transactionName: `Reservation-${dataHotel[code].name}`,
                    type: 'OUT'
                  }
                ])
                setCashback([
                  {
                    day: new Date().toUTCString(),
                    inValue: authStatus?.isAuthenticated ? (dataHotel[code].value * 10) / 100 : 0,
                    transactionName: `Reservation-${dataHotel[code].name}`,
                    type: 'IN'
                  }
                ])
              } else {
                setPurchase((prevStatus) => [
                  ...(prevStatus || []),
                  {
                    day: new Date().toUTCString(),
                    outValue: dataHotel[code].value,
                    transactionName: `Reservation-${dataHotel[code].name}`,
                    type: 'OUT'
                  }
                ])
                setCashback((prevStatus) => [
                  ...(prevStatus || []),
                  {
                    day: new Date().toUTCString(),
                    inValue: authStatus?.isAuthenticated ? (dataHotel[code].value * 10) / 100 : 0,
                    transactionName: `Reservation-${dataHotel[code].name}`,
                    type: 'IN'
                  }
                ])
              }
              navigation.navigate('ReservationAccepted')
            }
          }}
        >
          <Text style={{ fontSize: 18, lineHeight: 22, fontWeight: 'bold', fontFamily: 'Corbel' }}>
            Confirm and pay
          </Text>
        </Button>
      </View>
    </ScrollView>
  )
}

export default ConfirmPayment
