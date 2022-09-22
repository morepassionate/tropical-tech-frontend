import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  LogBox
} from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import PoolIcon from '../../assets/icons/Pool'
import GridGalleryImages from '../../Components/GridGalleryImages'
import Reviews from '../../Components/Reviews'
import COLORS from '../../Constants/styles'
import { commentsReviews, dataHotel, gallery } from '../../data'
import MapView, { Marker } from 'react-native-maps'
import config from '../../config/config.json'

import styles from './styles'
import { useRecoilState } from 'recoil'
import AuthStatus from '../../assets/atoms/AuthStatus'
import LightButton from '../../Components/LightButton'
import ModalReviews from '../../Components/ModalReviews'

const HotelDetails = ({ navigation, route }: any) => {
  const code: number = route.params?.code
  // console.log('code=ID', code)
  const [hotelName, setHotelName] = useState('')
  const [background, setBackground] = useState('')
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [city, setCity] = useState(null)
  const [country, setCountry] = useState(null)
  const [description, setDescription] = useState(null)
  const [modalConfirm, setModalConfirm] = useState(false)
  const [modalPolicy, setModalPolicy] = useState(false)
  const [authStatus, setAuthStatus] = useRecoilState(AuthStatus)
  const [moreDetailDescription, setMoreDetailDescription] = useState(false)
  const [reviewModalVisible, setReviewModalVisible] = useState(false)

  useEffect(() => {
    setMoreDetailDescription(false)
    // setReviewModalVisible(false)
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])
  // const [gallery, setGallery] = useState(null)

  // useEffect(() => {
  //   getHotel(code)
  // }, [])
  // useEffect(() => {
  //   fetch(`${config.urlRoot}hotel/details/2`)
  //     .then((resposta) => resposta.json())
  //     .then((body) => console.log(body))
  // }, [])

  //Pegar o id do usuário
  const getHotel = async (id: number) => {
    // console.log('idHotel', id)
    let response = await fetch(`${config.urlRoot}hotel/details/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    let json = await response.json()
    //setBackground(j);
    setHotelName(json.hotel.name.content)
    setCity(json.hotel.city.content)
    setCountry(json.hotel.country.description.content)
    setDescription(json.hotel.description.content)
    setBackground(config.hotel.urlPhotoBg + json.hotel.images[0].path)
    setPosition({
      latitude: json.hotel.coordinates.latitude,
      longitude: json.hotel.coordinates.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
    // setGallery(config.hotel.urlPhotoBg + json.hotel.images.map((item) => item))
  }
  const iconsAndInfos = [
    { icon: 'wifi', info: 'Wifi' },
    { icon: 'coffee', info: 'Coffee' },
    { icon: 'paw', info: 'Pets' },
    { icon: PoolIcon, info: 'Pool' },
    { icon: 'youtube-tv', info: 'Digital TV' }
  ]
  // const renderItem = ({
  //   item
  // }: {
  //   item: { comment: string; datePublish: string; user: string; userImage: string }
  // }) => (
  //   <View style={{ marginRight: 20 }}>
  //     <Reviews
  //       comment={item.comment}
  //       dateOfPost={item.datePublish}
  //       user={item.user}
  //       userImage={item.userImage}
  //     />
  //   </View>
  // )

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.imgContainer}>
        <View style={styles.borderNav} />
        <Image
          source={{ uri: dataHotel[code].image }}
          resizeMode={'cover'}
          style={{ height: 300, width: '100%' }}
        />
        <View style={styles.hotelNameContainer}>
          <Text style={styles.name}>{dataHotel[code].name}</Text>
          <Text style={styles.city}>{`${dataHotel[code].city},${dataHotel[code].country}`}</Text>
        </View>
      </View>
      <View style={[styles.rowContent, { justifyContent: 'space-between', marginHorizontal: 24 }]}>
        <View>
          <View style={[styles.rowContent, { marginTop: 14 }]}>
            <Text style={styles.value}>{`${dataHotel[code].value.toFixed(2)}$`} </Text>
            <Text style={styles.person}>per person</Text>
          </View>
          <View style={styles.pinCashback}>
            <Text style={styles.pinText}>{`${(dataHotel[code].value * 10) / 100}$ CASHBACK`}</Text>
          </View>
          <Text style={{ marginBottom: 15, fontSize: 16, fontFamily: 'Corbel', color: '#979FA9' }}>
            08 Oct - 10 Oct, 1 guest
          </Text>
        </View>
        <View style={{ justifyContent: 'center', marginTop: 20 }}>
          <Text style={styles.ratings}>{`${dataHotel[code].ratings}`}</Text>
          <Text style={{ color: COLORS.blue, fontFamily: 'Corbel', fontSize: 14 }}>
            {`${dataHotel[code].reviews} Reviews`}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={{ height: 130 }}>
        <View style={styles.iconsContainer}>
          {iconsAndInfos.map((item, index) => (
            <View key={index} style={styles.innerIconsContainer}>
              <IconButton
                icon={item.icon}
                size={22}
                color={COLORS.primary90}
                style={styles.notMargin}
              />
              <Text>{item.info}</Text>
            </View>
          ))}
        </View>
        <Button mode={'contained'} style={styles.seeMoreButton} labelStyle={styles.seeMoreText}>
          See more
        </Button>
        <View style={styles.line} />
      </View>
      <View>
        <Text
          numberOfLines={moreDetailDescription ? 1000 : 5}
          style={styles.description}
        >{`${dataHotel[code].description}`}</Text>
        <TouchableOpacity onPress={() => setMoreDetailDescription(!moreDetailDescription)}>
          <Text style={styles.moreReadButton}>
            {!moreDetailDescription ? 'Read More' : 'Read Less'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* MAPA COM DESIGN ESCURO */}
      <MapView
        style={{ height: 180, width: '100%', marginBottom: 15, backgroundColor: 'yellow' }}
        region={position}
        onPress={(e) =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }
      >
        <Marker coordinate={position} title={`${dataHotel[code].name}`} description={'Hotel'} />
      </MapView>
      {/*  */}
      <View style={[styles.marginHorizontal, { marginTop: 19 }]}>
        <Text style={styles.galleryText}>Gallery</Text>
        <GridGalleryImages imagesArray={gallery} />
      </View>
      <View style={styles.line} />
      {/* REVIEWS */}
      <View style={styles.marginHorizontal}>
        <TouchableOpacity
          onPress={() => setReviewModalVisible(true)}
          style={[styles.rowContent, { marginTop: 24, alignItems: 'center' }]}
        >
          <IconButton
            icon={'star'}
            size={12}
            color={COLORS.primary90}
            style={[styles.notMargin, { top: 2 }]}
          />
          <Text style={styles.font18}>{`4.91 (155 Reviews)`}</Text>
        </TouchableOpacity>
        <View style={styles.reviewsContent}>
          {/* <FlatList
            data={commentsReviews}
            keyExtractor={(item, index) => `${item}@${index}`}
            horizontal
            style={{ marginRight: -25 }}
            renderItem={renderItem}
          /> */}
          <ScrollView horizontal style={{ marginRight: -25 }}>
            {commentsReviews.map((item, index) => (
              <View key={index} style={{ marginRight: 20 }}>
                <Reviews
                  comment={item.comment}
                  dateOfPost={item.datePublish}
                  user={item.user}
                  userImage={item.userImage}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <ModalReviews
        modalVisible={reviewModalVisible}
        setModalVisible={() => setReviewModalVisible(false)}
      />
      <View style={styles.line} />
      <View style={styles.marginHorizontal}>
        <TouchableOpacity
          style={[
            styles.rowContent,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 22,
              marginBottom: 10
            }
          ]}
          onPress={() => setModalPolicy(true)}
        >
          <Text style={styles.font24}>Cancellation policy</Text>
          <IconButton icon={'chevron-right'} size={24} style={styles.notMargin} />
        </TouchableOpacity>
        <Text style={styles.fullRefunds}>
          Full refund if within 24 hrs of booking or 7 days before start date
        </Text>
      </View>
      <View style={styles.line} />
      <Button
        mode={'contained'}
        style={styles.buttonStyle}
        onPress={() => {
          if (authStatus?.isAuthenticated) {
            navigation.navigate('ConfirmPayment', {
              hotelId: code
            })
          } else {
            setModalConfirm(true)
          }
        }}
      >
        <Text style={{ fontSize: 18, lineHeight: 22, fontWeight: 'bold', fontFamily: 'Corbel' }}>
          Book
        </Text>
      </Button>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalConfirm}
        onRequestClose={() => {
          setModalConfirm(!modalConfirm)
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: 'white',
              position: 'relative',
              width: '90%',
              alignSelf: 'center',
              height: 385,
              marginVertical: 150,
              borderRadius: 30,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 5
            }}
          >
            <IconButton
              icon={'close'}
              size={24}
              color={'#5691B5'}
              style={{ margin: 0, alignSelf: 'flex-end', marginRight: 20 }}
              onPress={() => setModalConfirm(false)}
              rippleColor={'white'}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <LightButton
                text="Register or Login for Cashback Account"
                style={{
                  marginTop: 75,
                  borderRadius: 25,
                  width: '50%'
                }}
                textStyle={{ color: '#4A5CAE', textTransform: 'capitalize', textAlign: 'center' }}
                onPress={() => {
                  setModalConfirm(false)
                  navigation.navigate('LoginRegisterFlow')
                }}
              />
              <LightButton
                text="Continue Payment"
                style={{
                  marginTop: 75,
                  borderRadius: 25,
                  width: '50%'
                }}
                textStyle={{ color: '#4A5CAE', textTransform: 'capitalize', textAlign: 'center' }}
                onPress={() => {
                  setModalConfirm(false)
                  navigation.navigate('ConfirmPayment', { hotelId: code })
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalPolicy}
        onRequestClose={() => {
          setModalPolicy(!modalPolicy)
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: 'white',
              position: 'relative',
              width: '90%',
              alignSelf: 'center',
              height: '90%',
              marginVertical: 50,
              borderRadius: 30
            }}
          >
            <IconButton
              icon={'close'}
              size={24}
              color={'#5691B5'}
              style={{ margin: 0, alignSelf: 'flex-end', marginRight: 20, marginTop: 10 }}
              onPress={() => setModalPolicy(false)}
              rippleColor={'white'}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
              <Text style={{ fontSize: 24, fontFamily: 'Corbel-Bold', alignSelf: 'flex-start' }}>
                Cancellation policy
              </Text>
              <Text>
                By selecting the button below, you agree to the Guest Release and Waiver, the
                Cancellation Policy, the Guest Refund Policy and social-distancing and other
                COVID-19-related guidelines. Payment Terms between you and UHR.By selecting the
                button below, you agree to the Guest Release and Waiver, the Cancellation Policy,
                the Guest Refund Policy and social-distancing and other COVID-19-related guidelines.
                Payment Terms between you and UHR.By selecting the button below, you agree to the
                Guest Release and Waiver, the Cancellation Policy, the Guest Refund Policy and
                social-distancing and other COVID-19-related guidelines. Payment Terms between you
                and UHR.By selecting the button below, you agree to the Guest Release and Waiver,
                the Cancellation Policy, the Guest Refund Policy and social-distancing and other
                COVID-19-related guidelines. Payment Terms between you and UHR.By selecting the
                button below, you agree to the Guest Release and Waiver, the Cancellation Policy,
                the Guest Refund Policy and social-distancing and other COVID-19-related guidelines.
                Payment Terms between you and UHR.By selecting the button below, you agree to the
                Guest Release and Waiver, the Cancellation Policy, the Guest Refund Policy and
                social-distancing and other COVID-19-related guidelines. Payment Terms between you
                and UHR.By selecting the button below, you agree to the Guest Release and Waiver,
                the Cancellation Policy, the Guest Refund Policy and social-distancing and other
                COVID-19-related guidelines. Payment Terms between you and UHR.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default HotelDetails
