import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  LogBox
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { IconButton, RadioButton } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { useRecoilState } from 'recoil'

import {
  getMostPopularHotels,
  getRecentsearchHotels,
  getSearchedHotelAll
} from '../../api/apiCaller'

import CardUpcomingTrips from '../../Components/CardUpcomingTrips'
import CardDestinationIdeas from '../../Components/CardDestinationIdeas'
import CardMostPopular from '../../Components/CardMostPopular'
import CardBestDeals from '../../Components/CardBestDeals'
import LocationIcon from '../../assets/icons/Location'
import IncrementDecrementInputComponent from './components/incrementDecrement'
import LightButton from '../../Components/LightButton'
import CartoonPersonIcon from '../../assets/icons/CartoonPerson'
import DoubleCartoonsIcon from '../../assets/icons/DoubleCartoons'
import FamilyCartoonsIcon from '../../assets/icons/FamilyCartoons'

import { FilterQueryProps } from '../../Constants/data'

import styles from './styles'
import { hotelData, IsLoading } from '../../assets/atoms/HotelData'
import { SearchedHotelData, IsSearchLoading } from '../../assets/atoms/SearchedHotelData'
import { mostPopularHotelData, IsMostPopularLoading } from '../../assets/atoms/MostPopularHotelData'

const Home = (props: any) => {
  const [_, setHotelData] = useRecoilState(hotelData)
  const [isLoading, setIsLoading] = useRecoilState(IsLoading)
  const [__, setSearchedHotelData] = useRecoilState(SearchedHotelData)
  const [isSearchLoading, setIsSearchLoading] = useRecoilState(IsSearchLoading)
  const [___, setMostPopularHotels] = useRecoilState(mostPopularHotelData)
  const [isMostPopularLoading, setIsMostPopularLoading] = useRecoilState(IsMostPopularLoading)

  const [modalWhereVisible, setModalWhereVisible] = useState(false)
  const [modalWhenVisible, setModalWhenVisible] = useState(false)
  const [modalHowManyVisible, setModalHowManyVisible] = useState(false)
  const [modalChoiceRooms, setModalChoiceRooms] = useState(false)
  const onToggleSnackBar = () => setModalWhereVisible(!modalWhereVisible)
  const onDismissSnackBar = () => setModalWhereVisible(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
  const [whereFocus, setWhereFocus] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    getMostPopularHotels()
      .then((res) => {
        setIsMostPopularLoading({ isLoading: false })
        const data = res.data
        console.log('most popular hotels', data)
        setMostPopularHotels(data)
      })
      .catch((err) => {
        setIsMostPopularLoading({ isLoading: false })
        console.log('most popular error', err)
      })

    getRecentsearchHotels()
      .then((res) => {
        setIsLoading({ isLoading: false })
        const data = res.data
        console.log('hotelAtomdata', data)
        setHotelData(data)
      })
      .catch((err) => {
        setIsLoading({ isLoading: false })
        console.log('hotelAtomData', err)
      })
  }, [])

  const [where, setWhere] = useState('')
  const [tabsActive, setTabsActive] = useState('calendar')

  const [dateValue, setDateValue] = useState('')
  const [secondDateValue, setSecondDateValue] = useState('')

  const [numberOfDays, setNumberOfDays] = useState(1)
  const [teste, setTeste] = useState({})

  useEffect(() => {
    if (dateValue && !secondDateValue) {
      setTeste({
        [dateValue]: {
          selected: true,
          color: '#1B4298',
          textColor: '#fff'
        }
      })
    }

    if (dateValue && secondDateValue) {
      setTeste({
        [dateValue]: { selected: true, startingDay: true, color: '#1B4298', textColor: '#fff' },
        [secondDateValue]: {
          selected: true,
          endingDay: true,
          color: '#1B4298',
          textColor: '#fff'
        }
      })
    }
  }, [dateValue])

  const adicionarDiasData = (dias: number) => {
    let hoje = new Date(dateValue)
    let dataVenc = new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000)
    let nine =
      dataVenc.getFullYear() + '-' + 0 + (dataVenc.getMonth() + 1) + '-' + 0 + dataVenc.getDate()
    let notNine =
      dataVenc.getFullYear() + '-' + 0 + (dataVenc.getMonth() + 1) + '-' + dataVenc.getDate()
    return dataVenc.getDate() > 9 ? notNine : nine
  }

  useEffect(() => {
    let day1 = new Date(dateValue)
    let day2 = new Date(secondDateValue)
    let difference = Math.abs(day2.getTime() - day1.getTime())
    let days = difference / (1000 * 3600 * 24)

    let dates = []

    for (let i = 1; i < days + 2; i++) {
      dates.push(adicionarDiasData(i))
    }

    let oi: any = {}

    dates.map((e) => {
      oi[e] = { selected: true, color: '#1B4298', textColor: '#fff' }
    })

    if (dateValue && secondDateValue) {
      setTeste(oi)
    }
  }, [secondDateValue])

  function sendWhen(text: string) {
    setTabsActive('calendar')
    setNumberOfDays(1)
    setModalWhenVisible(false)
  }

  function handleSubmitForm() {
    let filterQuery = {} as FilterQueryProps
    const currentDate = new Date()
    const nextDate = new Date(new Date().getTime() + 24 * 3600 * 1000)

    const stay = {
      checkIn: dateValue === '' ? currentDate.toISOString().split('T')[0] : dateValue,
      checkOut: secondDateValue === '' ? nextDate.toISOString().split('T')[0] : secondDateValue
    }
    filterQuery.stay = stay

    let rooms = 1
    if (radioRoomsValues === 'Shared') {
      rooms = 1
    } else if (radioRoomsValues === 'Single') {
      rooms = 1
    } else if (radioRoomsValues === 'Double') {
      rooms = 2
    } else {
      rooms = 3
    }

    const occupancies = [
      {
        rooms: rooms,
        adults: inputAdults === 0 ? 1 : inputAdults,
        children: inputChildren + inputInfants
      }
    ]
    filterQuery.occupancies = occupancies

    filterQuery.destination = where

    console.log('filterQuery', filterQuery)
    getSearchedHotelAll(filterQuery)
      .then((res) => {
        setIsSearchLoading({ isLoading: false })
        const data = res.data
        console.log('searchedHotelData', data)
        setSearchedHotelData(data)
      })
      .catch((err) => {
        setIsSearchLoading({ isLoading: false })
        console.log('error', err)
      })
  }

  const [inputAdults, setInputAdults] = useState(0)
  const [inputChildren, setInputChildren] = useState(0)
  const [inputInfants, setInputInfants] = useState(0)
  const [radioRoomsValues, setRadioRoomsValues] = useState('Shared') // Shared, Single, Double, Family

  return (
    <>
      <ScrollView>
        <ImageBackground
          style={styles.container}
          source={require('../../assets/img/bg-hotel.jpeg')}
        >
          <View style={styles.loginForm}>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={
                  inputAdults === 0 && inputChildren === 0 && inputInfants === 0
                    ? ''
                    : `Adults-${inputAdults}, Children-${
                        inputChildren + inputInfants
                      }, Room-${radioRoomsValues}`
                }
                placeholder="How many rooms & people?"
                onChangeText={() => {
                  return
                }}
                onFocus={() => {
                  setModalWhenVisible(false)
                  setModalWhereVisible(false)
                  setModalHowManyVisible(true)
                }}
              />
            </View>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={
                  dateValue === '' && secondDateValue === ''
                    ? ''
                    : `${dateValue} - ${secondDateValue}`
                }
                placeholder="When do you want to go?"
                onFocus={() => {
                  setModalWhenVisible(true), setTabsActive('flexible')
                }}
                onChangeText={() => {
                  return
                }}
              />
            </View>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={where === '' ? '' : where}
                onChangeText={() => {
                  return
                }}
                placeholder="Where are you going?"
                onFocus={() => setModalWhereVisible(true)}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => [handleSubmitForm(), props.navigation.navigate('Offers')]}
              >
                <Text style={styles.loginButtonText}>
                  <AntDesign name="search1" size={20} color="#1B4298" style={{ margin: 50 }} />{' '}
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.containerHotels}>
          <CardMostPopular />
          <CardUpcomingTrips />
          <CardDestinationIdeas />
          {/* <CardPropertyType /> */}
          <CardBestDeals />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWhereVisible}
          onRequestClose={() => {
            setModalWhereVisible(!modalWhereVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={!whereFocus ? styles.modalView : styles.modalViewTyping}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalWhereVisible(false), setDateValue(''), setSecondDateValue('')
                }}
                rippleColor={'white'}
              />
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalTitle}>Where are you going?</Text>
                </View>
              </View>
              <View style={styles.inputBottom}>
                <TextInput
                  style={styles.inputModal}
                  value={where}
                  placeholder="Search for destination"
                  onFocus={() => setWhereFocus(true)}
                  onBlur={() => setWhereFocus(false)}
                  onChangeText={(text) => setWhere(text)}
                />
              </View>
              <View style={{ marginLeft: 50, width: '100%' }}>
                {!whereFocus && <Text style={styles.modalText}>Not sure where to go? </Text>}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Everywhere</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Most Popular</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => props.navigation.navigate('Home')}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1B4298',
                        borderRadius: 10
                      }}
                    >
                      <IconButton color={'white'} icon={LocationIcon} size={24} />
                    </View>
                    <Text style={styles.textIcons}>Best deals</Text>
                  </TouchableOpacity>
                )}
                {!whereFocus && (
                  <TouchableOpacity
                    style={[styles.loginWhereModalButton, styles.btnSearch]}
                    onPress={() => setModalWhereVisible(false)}
                  >
                    <Text style={styles.loginButtonText}>
                      <AntDesign name="search1" size={20} color="#1B4298" /> Search
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWhenVisible}
          onRequestClose={() => {
            setModalWhenVisible(!modalWhenVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewTyping}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalWhenVisible(false), setTabsActive('flexible'), setNumberOfDays(1)
                }}
                rippleColor={'white'}
              />
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalTitle}>When do you want to go?</Text>
                </View>
              </View>
              {tabsActive !== 'calendar' && (
                <LightButton
                  text="Calendar"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => {
                    setTabsActive('calendar')
                  }}
                />
              )}
              <View style={{ display: tabsActive === 'calendar' ? 'flex' : 'none' }}>
                <Calendar
                  markingType={'period'}
                  markedDates={teste}
                  style={{
                    marginTop: 60,
                    width: 400,
                    height: 420,
                    borderWidth: 2,
                    borderColor: '#506F9D',
                    borderRadius: 12,
                    marginBottom: 13
                  }}
                  onDayPress={(day) => {
                    if (dateValue) {
                      setSecondDateValue(day.dateString.toString())
                    } else {
                      setDateValue(day.dateString.toString())
                    }
                    if (dateValue && secondDateValue) {
                      setDateValue(day.dateString.toString())
                      setSecondDateValue('')
                    }
                  }}
                />
              </View>

              <View
                style={{
                  display: tabsActive === 'flexible' ? 'flex' : 'none',
                  paddingTop: 30,
                  width: '100%',
                  marginBottom: 150
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Number of Days</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      onPress={() => setNumberOfDays(numberOfDays - 1)}
                      style={{
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          lineHeight: 18,
                          color: '#8296CA'
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderRadius: 30,
                        padding: 5,
                        borderColor: '#506F9D',
                        marginLeft: 10,
                        marginRight: 10,
                        width: 90,
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {numberOfDays}
                    </TextInput>
                    <Pressable
                      onPress={() => setNumberOfDays(numberOfDays + 1)}
                      style={{
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          lineHeight: 17,
                          color: '#8296CA'
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => [setTabsActive('calendar'), setNumberOfDays(0)]}
                      style={{
                        marginLeft: 90
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 2,
                          borderRadius: 30,
                          padding: 5,
                          borderColor: '#506F9D',
                          marginLeft: 10,
                          marginRight: 10,
                          width: 90,
                          paddingVertical: 10,
                          color: '#000',
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}
                      >
                        Any
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginTop: 60 }}>
                  <Text>
                    Go in<Text style={{ fontWeight: 'bold' }}>{'  '}Month</Text>
                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Sep
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Oct
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Dec
                      </Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        width: 80,
                        height: 80,
                        marginRight: 10
                      }}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: 'Corbel',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#1B4298'
                        }}
                      >
                        Dec
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {tabsActive === 'flexible' && (
                <TouchableOpacity
                  style={[styles.calendarBtnSearch]}
                  onPress={() => {
                    setTabsActive('calendar')
                  }}
                >
                  <Text style={styles.loginButtonText}>
                    <AntDesign name="search1" size={20} color="#1B4298" /> Search
                  </Text>
                </TouchableOpacity>
              )}
              {tabsActive === 'calendar' && (
                <TouchableOpacity
                  style={[styles.calendarBtnSearch]}
                  onPress={() => {
                    sendWhen(`${dateValue}${secondDateValue}`)
                  }}
                >
                  <Text style={styles.loginButtonText}>
                    <AntDesign name="search1" size={20} color="#1B4298" /> Search
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalHowManyVisible}
          onRequestClose={() => setModalHowManyVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                height: '50%',
                maxHeight: 400,
                borderRadius: 20
              }}
            >
              <IncrementDecrementInputComponent
                title={'Adults'}
                subTitle={'Ages 13 or above'}
                inputValue={inputAdults}
                onChangeText={() => setInputAdults(inputAdults)}
                Increment={() => setInputAdults(inputAdults + 1)}
                Decrement={() => {
                  if (inputAdults === 0) {
                    setInputAdults(0)
                  } else {
                    setInputAdults(inputAdults - 1)
                  }
                }}
              />
              <IncrementDecrementInputComponent
                title={'Children'}
                subTitle={'Ages 2-12'}
                inputValue={inputChildren}
                onChangeText={() => setInputChildren(inputChildren)}
                Increment={() => setInputChildren(inputChildren + 1)}
                Decrement={() => {
                  if (inputChildren === 0) {
                    setInputChildren(0)
                  } else {
                    setInputChildren(inputChildren - 1)
                  }
                }}
              />
              <IncrementDecrementInputComponent
                title={'Infants'}
                subTitle={'Under 2'}
                inputValue={inputInfants}
                onChangeText={() => setInputInfants(inputInfants)}
                Increment={() => setInputInfants(inputInfants + 1)}
                Decrement={() => {
                  if (inputInfants === 0) {
                    setInputInfants(0)
                  } else {
                    setInputInfants(inputInfants - 1)
                  }
                }}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#05233A',
                  width: '90%',
                  alignSelf: 'center'
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                <LightButton
                  text="Save"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => {
                    setModalHowManyVisible(false)
                    setModalChoiceRooms(true)
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalChoiceRooms}
          onRequestClose={() => setModalChoiceRooms(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                height: '50%',
                maxHeight: 350,
                borderRadius: 20
              }}
            >
              <View style={{ flexDirection: 'row', height: '80%', maxHeight: 300 }}>
                <View style={{ width: '65%', justifyContent: 'center', maxWidth: 350 }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value={'Shared'}
                      status={radioRoomsValues === 'Shared' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Shared')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Shared room</Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Single"
                      status={radioRoomsValues === 'Single' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Single')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Single
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Double"
                      status={radioRoomsValues === 'Double' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Double')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Double
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5
                    }}
                  >
                    <RadioButton
                      value="Family"
                      status={radioRoomsValues === 'Family' ? 'checked' : 'unchecked'}
                      onPress={() => setRadioRoomsValues('Family')}
                    />
                    <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>
                      Private room - Family
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 1,
                    height: '75%',
                    backgroundColor: '#506F9D',
                    alignSelf: 'flex-end'
                  }}
                />
                <View>
                  <Text
                    style={{
                      marginTop: 30,
                      fontSize: 16,
                      fontFamily: 'Corbel-Bold',
                      color: '#05233A',
                      marginLeft: 20
                    }}
                  >
                    Sleeps
                  </Text>
                  <View style={{ justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <CartoonPersonIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <CartoonPersonIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <DoubleCartoonsIcon />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                      <FamilyCartoonsIcon />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#05233A',
                  width: '90%',
                  alignSelf: 'center'
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                <LightButton
                  text="Save"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => setModalChoiceRooms(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  )
}

export default Home
