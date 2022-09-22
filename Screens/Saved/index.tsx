/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
  Linking
} from 'react-native'

const logo = require('../../assets/img/img3.png')
import Carousel from 'react-native-snap-carousel'

import styles from './styles'
import RenderHotelComponent from '../Offers/components/RenderHotel'
import { dataHotel } from '../../data'
import COLORS from '../../Constants/styles'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import UserData from '../../assets/atoms/UserData'
import { LinearGradient } from 'expo-linear-gradient'
import LightButton from '../../Components/LightButton'
import RenderSavedHotels from './components'

interface Hotels {
  hotelImage: string
  town: string
  city: string
  country: string
}

interface Favorites {
  listName: string
  hotels: Hotels[]
}

const Saved = ({ navigation }: any) => {
  const [viewStatus, setViewStatus] = useState('Saved') //Saved or List
  const [modalAddFavorites, setModalAddFavorites] = useState(false)
  const [newListText, setNewListText] = useState('')
  const [disabledCreateButtonList, setDisabledCreateButtonList] = useState(true)
  const [editList, setEditList] = useState(false)
  const [modalFavoriteInfo, setModalFavoriteInfo] = useState(false)
  const [listFavorites, setListFavorites] = useState<Favorites[] | null>(null)
  const [modalMakeBookingOfFavoriteds, setModalMakeBookingOfFavoriteds] = useState(false)
  const position = {
    coords: {
      latitude: -15.79541658608181,
      longitude: -47.88048645481467
    },
    address: null
  } // change this to correct latitude and longitude of the Hotel

  // const renderItem = ({ item, index }: any) => (
  //   <View style={{ marginBottom: 10 }}>
  //     <RenderSavedHotels
  //       onPressCard={() => navigation.navigate('HotelDetails', { code: index })}
  //       onPressDots={() => setModalMakeBookingOfFavoriteds(true)}
  //       hotelName={item.name}
  //       imageHotel={item.image}
  //       numberOfBeds={item.beds}
  //       ratings={item.ratings}
  //       reviewsCount={item.reviews}
  //       value={item.value}
  //       cashbackValue={10}
  //       children={2}
  //       freeCancellation={item.freeCancellation}
  //       noPrepaymentNeeded={item.noPrepaymentNeeded}
  //       taxesAndCharges={item.taxesAndChargesInclude}
  //     />
  //   </View>
  // )
  const RenderMenuOptions = () => (
    <View style={{ height: 100, alignItems: 'center' }}>
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => setViewStatus('Saved')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.bordertop,
            viewStatus === 'Saved' ? { backgroundColor: COLORS.blue } : { backgroundColor: 'white' }
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
          <View>
            <Text
              style={[
                styles.menuText,
                viewStatus === 'Saved' ? { color: 'white' } : { color: COLORS.primary90 }
              ]}
            >
              Saved
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewStatus('List')}
          activeOpacity={0.9}
          style={[
            styles.rowNav,
            styles.borderbottom,
            viewStatus === 'List' ? { backgroundColor: COLORS.blue } : { backgroundColor: 'white' }
          ]}
        >
          <Text
            style={[
              styles.menuText,
              viewStatus === 'List' ? { color: 'white' } : { color: COLORS.primary90 }
            ]}
          >
            List
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  // const renderItemPopular = ({ item, index }: any) => {
  //   return (
  //     <TouchableOpacity style={styles.carouselItemPopular} activeOpacity={0.6}>
  //       <Image style={styles.imgHotelPopular} source={{ uri: item.hotelImage }} />
  //       <View>
  //         <Text style={styles.popularHotelTitle}>{'teste'}</Text>
  //         <Text style={styles.popularHotelText}>{'teste'}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }
  return (
    <ScrollView>
      <View style={{ height: 40 }}>
        <View style={styles.borderNav} />
      </View>
      <RenderMenuOptions />
      {viewStatus === 'Saved' && (
        <View style={{ marginTop: 20, marginHorizontal: 8 }}>
          {/* <FlatList
						data={dataHotel}
						renderItem={renderItem}
						keyExtractor={(item, index) => `${item}@${index}`}
					/> */}
          <ScrollView>
            {dataHotel.map((item, index) => {
              return (
                <View key={index} style={{ marginBottom: 10 }}>
                  <RenderSavedHotels
                    onPressCard={() => navigation.navigate('HotelDetails', { code: index })}
                    onPressDots={() => setModalMakeBookingOfFavoriteds(true)}
                    hotelName={item.name}
                    imageHotel={item.image}
                    numberOfBeds={item.beds}
                    ratings={item.ratings}
                    reviewsCount={item.reviews}
                    value={item.value}
                    cashbackValue={10}
                    children={2}
                    freeCancellation={item.freeCancellation}
                    noPrepaymentNeeded={item.noPrepaymentNeeded}
                    taxesAndCharges={item.taxesAndChargesInclude}
                  />
                </View>
              )
            })}
          </ScrollView>
        </View>
      )}
      {viewStatus === 'List' && (
        <View>
          {listFavorites?.length === 0 ||
            (listFavorites?.length === undefined && (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/img/important.png')} />
                <Text style={{ fontFamily: 'Corbel', fontSize: 16, textAlign: 'center' }}>
                  {`Currently you don’t have any saved lists.`}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Corbel',
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 15,
                    marginBottom: 70
                  }}
                >
                  Create a list to save your future travel inspiration and compare properties
                  easily.
                </Text>
              </View>
            ))}
          {!!listFavorites && listFavorites?.length > 0 && (
            <>
              {listFavorites?.map((item, index) => (
                <View key={index} style={{ marginBottom: 40 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Corbel-Bold',
                        fontSize: 28,
                        marginLeft: 20,
                        marginBottom: 5
                      }}
                    >
                      {item.listName}
                    </Text>
                    <IconButton
                      icon={'dots-horizontal'}
                      size={20}
                      color={COLORS.primary}
                      onPress={() => setEditList(true)}
                      rippleColor={'white'}
                    />
                  </View>
                  {/* <FlatList
                    data={item.hotels}
                    renderItem={renderItemPopular}
                    horizontal
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `${item}@${index}`}
                    // columnWrapperStyle={{ marginTop: 4 }}
                  /> */}
                  <ScrollView horizontal scrollEnabled showsHorizontalScrollIndicator={false}>
                    {item.hotels.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.carouselItemPopular}
                        activeOpacity={0.6}
                      >
                        <Image style={styles.imgHotelPopular} source={{ uri: item.hotelImage }} />
                        <View>
                          <Text style={styles.popularHotelTitle}>{'teste'}</Text>
                          <Text style={styles.popularHotelText}>{'teste'}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ))}
            </>
          )}
        </View>
      )}
      {viewStatus === 'List' && (
        <Button
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 20,
            width: '50%',
            alignSelf: 'center',
            marginTop: 2,
            marginBottom: 55
          }}
          labelStyle={{ color: 'white' }}
          onPress={() => setModalAddFavorites(true)}
          color={COLORS.primary}
        >
          Create a List
        </Button>
      )}

      {/* MODAL TO CREATE A NEW LIST OF FAVORITES */}

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalAddFavorites}
        style={{ flex: 1 }}
        onRequestClose={() => {
          setModalAddFavorites(false)
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width: '98%',
            height: '98%',
            alignSelf: 'center',
            marginTop: '1.5%',
            borderRadius: 20
          }}
        >
          <>
            <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#5691B5'}
                style={{ margin: 0, alignSelf: 'flex-end' }}
                onPress={() => setModalAddFavorites(false)}
                rippleColor={'white'}
              />
              <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 32 }}>New list</Text>
              <TextInput
                mode={'flat'}
                activeOutlineColor={'transparent'}
                outlineColor={'transparent'}
                underlineColor={'transparent'}
                activeUnderlineColor={'transparent'}
                value={newListText}
                onChangeText={(e) => {
                  setNewListText(e)
                  if (e.length === 0) {
                    setDisabledCreateButtonList(true)
                  } else {
                    setDisabledCreateButtonList(false)
                  }
                }}
                placeholder={'List name'}
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  backgroundColor: '#DEE9FF',
                  height: 48,
                  paddingLeft: 20,
                  marginTop: 55
                }}
              />
              <LightButton
                onPress={() => {
                  setDisabledCreateButtonList(true)
                  setModalAddFavorites(false)
                  if (listFavorites?.length === 0 || listFavorites?.length === undefined) {
                    setListFavorites((prevStatus) => [
                      {
                        listName: newListText,
                        hotels: []
                      }
                    ])
                  } else {
                    setListFavorites((prevStatus) => [
                      ...(prevStatus || []),
                      {
                        listName: newListText,
                        hotels: []
                      }
                    ])
                  }
                  setNewListText('')
                  setModalFavoriteInfo(true)
                }}
                text={'Create'}
                style={{
                  borderRadius: 20,
                  alignSelf: 'flex-end',
                  width: 'auto',
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  marginTop: 50
                }}
                textStyle={[
                  { width: 120, textAlign: 'center' },
                  disabledCreateButtonList ? { color: 'white' } : { color: COLORS.primary }
                ]}
                colorsLinear={
                  disabledCreateButtonList
                    ? ['rgba(207, 213, 215, 1)', 'rgba(207, 213, 215, 0.5)']
                    : ['rgba(222, 233, 255, 1)', 'rgba(27, 102, 253, 0.5)']
                }
              />
            </View>
          </>
        </View>
      </Modal>

      {/* **************************************** */}
      {/* MODAL TO EDIT OR RENAME AN EXISTENCE LIST */}

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={editList}
        onRequestClose={() => {
          setEditList(false)
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 350,
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
                onPress={() => setEditList(false)}
                rippleColor={'white'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/10/25/12/13/landscapes-2887796__340.jpg'
                  }}
                  resizeMode={'cover'}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 12,
                    marginHorizontal: 20
                  }}
                />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 18 }}>List Name</Text>
                </View>
              </View>
              <LightButton
                text="Rename list"
                onPress={() => {
                  return
                }}
                style={{ marginTop: 30 }}
              />
              <LightButton
                text="Share list"
                onPress={() => {
                  return
                }}
                style={{ marginTop: 20 }}
              />
              <LightButton
                text="Delete list"
                onPress={() => {
                  return
                }}
                style={{ marginTop: 20 }}
              />
            </View>
          </>
        </View>
      </Modal>

      {/* **************************** */}
      {/* modal to inform the user that the list has been created */}

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalFavoriteInfo}
        onRequestClose={() => {
          setModalFavoriteInfo(false)
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            width: '98%',
            height: '98%',
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: '1.5%'
          }}
        >
          <>
            <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
              <IconButton
                icon={'chevron-left'}
                size={32}
                color={'#5691B5'}
                style={{ margin: 0, alignSelf: 'flex-start' }}
                onPress={() => setModalFavoriteInfo(false)}
                rippleColor={'white'}
              />
              <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 32 }}>List name</Text>
              <Image
                source={require('../../assets/img/heart.png')}
                style={{ alignSelf: 'center', marginTop: '45%', marginBottom: 10 }}
                resizeMode={'cover'}
              />
              <Text style={{ fontFamily: 'Corbel', fontSize: 16, textAlign: 'center' }}>
                Just tap the heart icon on your search and choose the list to add the property.
              </Text>
              <Button
                mode={'contained'}
                icon={{ direction: 'ltr', source: 'magnify' }}
                labelStyle={{
                  fontSize: 16,
                  fontFamily: 'Corbel-Bold',
                  textTransform: 'capitalize'
                }}
                onPress={() => {
                  setModalFavoriteInfo(false)
                  navigation.navigate('Offers')
                }}
                color={COLORS.primary}
                style={{
                  alignSelf: 'center',
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  marginTop: 100
                }}
              >
                Search
              </Button>
            </View>
          </>
        </View>
      </Modal>

      {/* MODAL TO MAKE BOOKING WITH FAVORITEDS HOTELS */}

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalMakeBookingOfFavoriteds}
        onRequestClose={() => {
          setModalMakeBookingOfFavoriteds(false)
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 350,
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
                onPress={() => setModalMakeBookingOfFavoriteds(false)}
                rippleColor={'white'}
              />
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/10/25/12/13/landscapes-2887796__340.jpg'
                  }}
                  resizeMode={'cover'}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 12,
                    marginHorizontal: 20
                  }}
                />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'Corbel-Bold', fontSize: 18 }}>Hotel Name</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, marginBottom: 10 }}>Area</Text>
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Date - Date</Text>
                </View>
              </View>
              <LightButton
                text="Make a book"
                onPress={() => {
                  setModalMakeBookingOfFavoriteds(false)
                  navigation.navigate('ConfirmPayment')
                }}
                style={{ marginTop: 30 }}
              />
              <LightButton
                text="View on map"
                onPress={() => {
                  setModalMakeBookingOfFavoriteds(false)
                  const scheme = Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q='
                  })
                  const latLng = `${position.coords.latitude},${position.coords.longitude}`
                  const label = `Enterprise Name`
                  const url: string = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`
                  }) as string

                  Linking.openURL(url)
                }}
                style={{ marginTop: 20 }}
              />
            </View>
          </>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Saved
