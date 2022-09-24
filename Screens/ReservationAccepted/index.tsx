import React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import { IconButton } from 'react-native-paper'
import EyeIcon from '../../assets/icons/Eye'
import { hotelbedImg } from '../../Constants/styles'

import styles from './styles'

const ReservationAccepted = ({ navigation, route }: any) => {
  const { hotelImg } = route.params
  const mock = [
    { icon: 'map-marker', title: 'Get directions' },
    { icon: 'phone-outgoing', title: 'Call host' },
    { icon: 'message', title: 'Message host' },
    { icon: EyeIcon, title: 'Show hotel' }
  ]

  const position = {
    coords: {
      latitude: -15.79541658608181,
      longitude: -47.88048645481467
    },
    address: null
  }
  const phoneNumber = '+5561991538781'
  const yourMessage = 'Minha mensagem de teste'
  return (
    <ScrollView>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <IconButton
            icon={'chevron-left'}
            size={40}
            style={styles.notMargin}
            onPress={() => navigation.goBack()}
          />
          <Text>location</Text>
          <Text style={styles.point}>.</Text>
          <Text>days</Text>
          <Text style={styles.point}>.</Text>
          <Text>dates</Text>
          <Text style={styles.point}>.</Text>
          <Text>guests</Text>
          <Text style={styles.point}>.</Text>
          <Text>room</Text>
        </View>
        <Text style={styles.h1}>Your reservation is accepted</Text>
        <Image
          source={{
            uri: `${hotelbedImg}${hotelImg}`
          }}
          resizeMode={'cover'}
          style={{ width: '100%', height: 215, borderRadius: 12, marginTop: 8 }}
        />
        <Text style={[styles.corbel, styles.reservation]}>Reservation details</Text>
        <Text style={[styles.corbel]}>Confirmation code</Text>
        <Text style={[styles.corbel]}>{`KFDKADBFS`}</Text>

        <Text style={[styles.corbel, styles.title, { marginTop: 25 }]}>Hotel Name</Text>
        <View style={styles.rowContentLined}>
          <View style={{ width: '50%' }}>
            <Text style={[styles.startEnd]}>Starts</Text>
            <Text style={[styles.corbel]}>Fri, 8 Oct</Text>
            <Text style={[styles.corbel, { marginBottom: 4 }]}>8:00</Text>
          </View>
          <View style={styles.leftBorder}>
            <View style={{ marginLeft: 30 }}>
              <Text style={[styles.startEnd]}>Ends</Text>
              <Text style={[styles.corbel]}>Sun, 10 Oct</Text>
              <Text style={[styles.corbel, { marginBottom: 4 }]}>8:00</Text>
            </View>
          </View>
        </View>
        {mock.map((item, index) => (
          <TouchableOpacity
            key={`${item}@${index}`}
            style={[styles.rowContentLined, { alignItems: 'center', paddingVertical: 5 }]}
            onPress={() => {
              if (index === 0) {
                const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
                const latLng = `${position.coords.latitude},${position.coords.longitude}`
                const label = `Enterprise Name`
                const url: string = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`
                }) as string

                Linking.openURL(url)
              } else if (index === 1) {
                if (Platform.OS === 'android') {
                  Linking.openURL(`tel:${phoneNumber}`)
                  return
                }
              } else if (index === 2) {
                if (Platform.OS === 'android') {
                  Linking.openURL(`sms:${phoneNumber}?body=${yourMessage}`) // iOS
                  return
                }
              } else if (index === 3) {
                navigation.navigate('HotelDetails', { code: 2 })
              }
            }}
          >
            <View
              style={{
                marginHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%'
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton style={styles.notMargin} icon={item.icon} size={26} />
                <Text style={[styles.corbel, { marginLeft: 33, fontSize: 16 }]}>{item.title}</Text>
              </View>
              <IconButton style={styles.notMargin} icon={'chevron-right'} size={32} />
            </View>
          </TouchableOpacity>
        ))}
        <Text
          style={{ marginVertical: 24, fontFamily: 'Corbel', fontWeight: 'bold', fontSize: 16 }}
        >
          Cancellation policy
        </Text>
        <Text style={[styles.corbel, { fontSize: 16 }]}>
          Any experience can be cancelled and fully refunded within 24 hours of purchase, or at
          least 7 days before the experience starts.
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontFamily: 'Corbel',
              fontSize: 16,
              marginTop: 10,
              marginBottom: 50
            }}
          >
            Learn more
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ReservationAccepted
