import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, Modal, LogBox } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import PoolIcon from '../../assets/icons/Pool'
import GridGalleryImages from '../../Components/GridGalleryImages'
import Reviews from '../../Components/Reviews'
import COLORS from '../../Constants/styles'
import { commentsReviews } from '../../data'
import MapView, { Marker } from 'react-native-maps'

import styles from './styles'
import { useRecoilState } from 'recoil'
import AuthStatus from '../../assets/atoms/AuthStatus'
import LightButton from '../../Components/LightButton'
import ModalReviews from '../../Components/ModalReviews'
import { getHotelById } from '../../api/apiCaller'
import { hotelbedImg } from '../../Constants/styles'

interface HotelDetailProps {
  hotelName: string
  hotelImg: string
  city: string
  country: string
  description: string
  lastUpadate: string
  gallery: string[]
}

const HotelDetails = ({ navigation, route }: any) => {
  const {
    code,
    price,
    ratings,
    reviewsCount,
    cancellationPolicies,
    image,
    currency,
    from,
    to,
    numberofadults,
    rateKey,
    rateType,
    taxes
  } = route.params
  const numberofnights = (new Date(to).getTime() - new Date(from).getTime()) / 24 / 3600 / 1000

  const [hotelDetailData, setHotelDetailData] = useState({} as HotelDetailProps)
  const [isLoading, setIsLoading] = useState(true)
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [modalConfirm, setModalConfirm] = useState(false)
  const [modalPolicy, setModalPolicy] = useState(false)
  const [authStatus, setAuthStatus] = useRecoilState(AuthStatus)
  const [moreDetailDescription, setMoreDetailDescription] = useState(false)
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  console.log('hotelDetailData', hotelDetailData)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    setMoreDetailDescription(false)
  }, [])
  useEffect(() => {
    getHotelById(code)
      .then((res) => {
        const data = res.data
        setHotelDetailData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log('error', err)
      })
  }, [code])

  const iconsAndInfos = [
    { icon: 'wifi', info: 'Wifi' },
    { icon: 'coffee', info: 'Coffee' },
    { icon: 'paw', info: 'Pets' },
    { icon: PoolIcon, info: 'Pool' },
    { icon: 'youtube-tv', info: 'Digital TV' }
  ]

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.imgContainer}>
        <View style={styles.borderNav} />
        <Image
          source={{
            uri:
              Object.keys(hotelDetailData).length > 1
                ? `${hotelbedImg}${image}`
                : 'There is no image.'
          }}
          resizeMode={'cover'}
          style={{ height: 300, width: '100%' }}
        />
        <View style={styles.hotelNameContainer}>
          <Text style={styles.name}>{hotelDetailData.hotelName}</Text>
          <Text style={styles.city}>{`${hotelDetailData.city},${hotelDetailData.country}`}</Text>
        </View>
      </View>
      <View style={[styles.rowContent, { justifyContent: 'space-between', marginHorizontal: 24 }]}>
        <View>
          <View style={[styles.rowContent, { marginTop: 14 }]}>
            <Text style={{ fontFamily: 'Corbel', fontSize: 12, marginTop: 20 }}>{currency}</Text>
            <Text style={styles.value}>
              {Object.keys(hotelDetailData).length > 1 ? `${price}` : `0`}{' '}
            </Text>
            <Text style={styles.person}>per person</Text>
          </View>
          <View style={styles.pinCashback}>
            <Text style={styles.pinText}>
              {Object.keys(hotelDetailData).length > 1
                ? `${currency}${(price * 10) / 100} CASHBACK`
                : `${currency}0 CASHBACK`}
            </Text>
          </View>
          <Text style={{ marginBottom: 15, fontSize: 16, fontFamily: 'Corbel', color: '#979FA9' }}>
            08 Oct - 10 Oct, 1 guest
          </Text>
        </View>
        <View style={{ justifyContent: 'center', marginTop: 20 }}>
          <Text style={styles.ratings}>
            {Object.keys(hotelDetailData).length > 1 ? `${ratings}` : '0'}
          </Text>

          <Text style={{ color: COLORS.blue, fontFamily: 'Corbel', fontSize: 14 }}>
            {Object.keys(hotelDetailData).length > 1 ? `${reviewsCount} Reviews` : '0 Reviews'}
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
        >{`${hotelDetailData.description}`}</Text>
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
        <Marker
          coordinate={position}
          title={`${hotelDetailData.hotelName}`}
          description={'Hotel'}
        />
      </MapView>
      {/*  */}
      <View style={[styles.marginHorizontal, { marginTop: 19 }]}>
        <Text style={styles.galleryText}>Gallery</Text>
        <GridGalleryImages imagesArray={hotelDetailData.gallery} />
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
          <Text style={styles.font18}>
            {Object.keys(hotelDetailData).length > 1
              ? `${ratings} (${reviewsCount} Reviews)`
              : `${'0'} (${'0'} Reviews)`}
          </Text>
        </TouchableOpacity>
        <View style={styles.reviewsContent}>
          {Object.keys(hotelDetailData).length > 1 && (
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
          )}
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
        {Object.keys(hotelDetailData).length > 1 && (
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.fullRefunds}>
            If cancel: {'\n'}- Before{' '}
            {cancellationPolicies && cancellationPolicies.from.split('T')[1]},
            {cancellationPolicies && cancellationPolicies.from.split('T')[0]} : No cancellations
            charges. {'\n'}- After {cancellationPolicies && cancellationPolicies.from.split('T')[1]}
            ,{cancellationPolicies && cancellationPolicies.from.split('T')[0]} :{' '}
            {cancellationPolicies && cancellationPolicies.amount}
            <Text style={{ fontFamily: 'Corbel', fontSize: 10 }}>({currency})</Text> will be
            charged.
          </Text>
        )}
      </View>
      <View style={styles.line} />
      <Button
        mode={'contained'}
        style={styles.buttonStyle}
        onPress={() => {
          if (authStatus?.isAuthenticated) {
            navigation.navigate('ConfirmPayment', {
              isShow: Object.keys(hotelDetailData).length > 1 ? true : false,
              hotelId: code,
              ratings: ratings,
              reviewsCount: reviewsCount,
              hotelName: hotelDetailData.hotelName,
              hotelImg: image,
              from: from,
              to: to,
              price: price,
              numberofadults: numberofadults,
              country: hotelDetailData.country,
              numberofnights: numberofnights,
              lastUpdate: hotelDetailData.lastUpadate,
              cancellationPolicies: cancellationPolicies,
              currency: currency
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
                  navigation.navigate('ConfirmPayment', {
                    isShow: Object.keys(hotelDetailData).length > 1 ? true : false,
                    hotelId: code,
                    ratings: ratings,
                    reviewsCount: reviewsCount,
                    hotelName: hotelDetailData.hotelName,
                    hotelImg: image,
                    from: from,
                    to: to,
                    price: price,
                    numberofadults: numberofadults,
                    country: hotelDetailData.country,
                    numberofnights: numberofnights,
                    lastUpdate: hotelDetailData.lastUpadate,
                    cancellationPolicies: cancellationPolicies,
                    currency: currency
                  })
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
              {Object.keys(hotelDetailData).length > 1 && (
                <Text style={{ fontFamily: 'Corbel', fontSize: 18 }}>
                  If cancel: {'\n'}- Before{' '}
                  {cancellationPolicies && cancellationPolicies.from.split('T')[1]},
                  {cancellationPolicies && cancellationPolicies.from.split('T')[0]} : No
                  cancellations charges. {'\n'}- After{' '}
                  {cancellationPolicies && cancellationPolicies.from.split('T')[1]},
                  {cancellationPolicies && cancellationPolicies.from.split('T')[0]} :{' '}
                  {cancellationPolicies && cancellationPolicies.amount}
                  <Text style={{ fontFamily: 'Corbel', fontSize: 10 }}>({currency})</Text> will be
                  charged.
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default HotelDetails
