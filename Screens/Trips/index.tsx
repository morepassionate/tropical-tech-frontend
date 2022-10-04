import React, { useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Modal,
  Platform,
  NativeModules,
  Linking
} from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import LightButton from '../../Components/LightButton'
import TripsCard from '../../Components/TripsCard'
import TripsMiniCard from '../../Components/TripsMiniCard'
import COLORS from '../../Constants/styles'
import { dataHotel } from '../../data'
import { openInbox } from 'react-native-email-link'
import styles from './styles'

const Trips = ({ navigation }: any) => {
  const [viewStatus, setViewStatus] = useState('Upcoming') //Upcoming or Completed
  const [completedOrCancelled, setCompletedOrCancelled] = useState('Completed') //Completed or Cancelled
  const [upcomingTripsModal, setUpcomingTripsModal] = useState(false)
  const [modalMessageProperty, setModalMessageProperty] = useState(false)
  const [modalHotelImage, setModalHotelImage] = useState('')
  const [hotelName, setHotelName] = useState('')

  const emailTestSend = 'teste@email.com'
  const smsNumber = '999999999'
  const yourMessage = 'Minha mensagem de teste'
  const phoneNumber = '+5561991538781'

  const mock = ['', '', '']
  const RenderMenuOptions = () => (
    <View style={{ height: 100, alignItems: 'center' }}>
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => setViewStatus('Upcoming')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.bordertop,
            viewStatus === 'Upcoming'
              ? { backgroundColor: COLORS.blue }
              : { backgroundColor: 'white' }
          ]}
        >
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png'
              }}
              resizeMode={'cover'}
              style={styles.perfilImg}
            />
          </View>
          <Text
            style={[
              styles.menuText,
              viewStatus === 'Upcoming' ? { color: 'white' } : { color: COLORS.primary90 }
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewStatus('Completed')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.borderbottom,
            viewStatus === 'Completed'
              ? { backgroundColor: COLORS.blue }
              : { backgroundColor: 'white' }
          ]}
        >
          <Text
            style={[
              styles.menuText,
              viewStatus === 'Completed' ? { color: 'white' } : { color: COLORS.primary90 }
            ]}
          >
            Completed or cancelled
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  return (
    <ScrollView>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      <RenderMenuOptions />
      {viewStatus === 'Upcoming' && (
        <View style={styles.margin8}>
          {dataHotel.map((item, index) => (
            <TripsCard
              key={`${item}@${index}`}
              hotelName={item.name}
              imageHotel={item.image}
              numberOfBeds={item.beds}
              ratings={item.ratings}
              reviewsCount={item.reviews}
              value={item.value}
              cashbackValue={10}
              onPressCard={() => navigation.navigate('HotelDetails', { code: index })}
              onPressDots={() => {
                setUpcomingTripsModal(true)
                setModalHotelImage(item.image)
              }}
            />
          ))}
        </View>
      )}
      {viewStatus === 'Completed' && (
        <View>
          <View style={styles.rowContent}>
            <View style={styles.completedMenu}>
              <TouchableOpacity
                onPress={() => setCompletedOrCancelled('Completed')}
                style={[
                  { borderBottomWidth: 5 },
                  completedOrCancelled === 'Completed'
                    ? { borderBottomColor: COLORS.blue }
                    : { borderBottomColor: '#CFD5D7' }
                ]}
              >
                <Text style={{ textAlign: 'center' }}>COMPLETED</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.completedMenu}>
              <TouchableOpacity
                onPress={() => setCompletedOrCancelled('Cancelled')}
                style={[
                  { borderBottomWidth: 5 },
                  completedOrCancelled === 'Cancelled'
                    ? { borderBottomColor: COLORS.blue }
                    : { borderBottomColor: '#CFD5D7' }
                ]}
              >
                <Text style={{ textAlign: 'center' }}>CANCELLED</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <View style={{ marginBottom: 10 }} />
            {completedOrCancelled === 'Completed' && (
              <>
                {mock.map((item, index) => (
                  <TripsMiniCard key={`${item}@${index}`} />
                ))}
              </>
            )}
            {completedOrCancelled === 'Cancelled' && <TripsMiniCard />}
          </View>
        </View>
      )}
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={upcomingTripsModal}
        onRequestClose={() => {
          setUpcomingTripsModal(!upcomingTripsModal)
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(18, 52, 123, 0.8)',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 450,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30
          }}
        >
          <>
            <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#5691B5'}
                style={{ margin: 0, alignSelf: 'flex-end' }}
                onPress={() => setUpcomingTripsModal(false)}
                rippleColor={'white'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/01/10/19/49/singapore-1132358__340.jpg'
                  }}
                  resizeMode={'cover'}
                  style={{ width: 65, height: 65, borderRadius: 12, marginHorizontal: 20 }}
                />
                <View>
                  <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 18 }}>{'Grand Hotel'}</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Area</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Date - Date</Text>
                </View>
              </View>
              <LightButton
                text="View booking"
                style={{ marginTop: 20, borderRadius: 12 }}
                textStyle={{ color: 'black', textTransform: 'capitalize', fontFamily: 'Corbel' }}
                onPress={() => {
                  setUpcomingTripsModal(false)
                  navigation.navigate('HotelDetails', { code: 4 })
                }}
              />
              <LightButton
                text="Message property"
                style={{ marginTop: 20, borderRadius: 12 }}
                textStyle={{ color: 'black', textTransform: 'capitalize' }}
                onPress={() => {
                  setUpcomingTripsModal(false)
                  setModalMessageProperty(true)
                }}
              />
              <LightButton
                onPress={() => {
                  return
                }}
                text="Change dates"
                style={{ marginTop: 20, borderRadius: 12 }}
                textStyle={{ color: 'black', textTransform: 'capitalize' }}
              />
              <Button
                mode={'contained'}
                style={{ marginTop: 20, borderRadius: 12, backgroundColor: '#C3606E' }}
                labelStyle={{ color: 'white', textTransform: 'capitalize' }}
              >
                Cancel booking
              </Button>
            </View>
          </>
        </View>
      </Modal>

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalMessageProperty}
        onRequestClose={() => {
          setModalMessageProperty(false)
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(18, 52, 123, 0.8)',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 400,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30
          }}
        >
          <>
            <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#5691B5'}
                style={{ margin: 0, alignSelf: 'flex-end' }}
                onPress={() => setModalMessageProperty(false)}
                rippleColor={'white'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/01/10/19/49/singapore-1132358__340.jpg'
                  }}
                  resizeMode={'cover'}
                  style={{ width: 65, height: 65, borderRadius: 12, marginHorizontal: 20 }}
                />
                <View>
                  <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 18 }}>{'Grand Hotel'}</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Area</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Date - Date</Text>
                </View>
              </View>
              <LightButton
                text="Send e-mail"
                style={{ marginTop: 40, marginBottom: 8 }}
                onPress={() => {
                  setModalMessageProperty(false)
                  if (Platform.OS === 'android') {
                    Linking.openURL(`mailto:?to=${emailTestSend}`) // iOS
                    return
                  }
                }}
              />
              <LightButton
                text="Send SMS"
                style={{ marginVertical: 8 }}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    Linking.openURL(`sms:${smsNumber}?body=${yourMessage}`) // iOS
                    return
                  }
                }}
              />
              <LightButton
                text="Call"
                style={{ marginVertical: 8 }}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    Linking.openURL(`tel:${phoneNumber}`)
                    return
                  }
                }}
              />
            </View>
          </>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Trips
