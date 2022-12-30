import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native'
import { Button, Checkbox, IconButton, RadioButton } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Progress from 'react-native-progress'
import { RangeSlider } from '@sharcoux/slider'
import { Dropdown } from 'react-native-element-dropdown'
import { stateData } from '../../data'
import { Calendar } from 'react-native-calendars'
import { AntDesign } from '@expo/vector-icons'
import CartoonPersonIcon from '../../assets/icons/CartoonPerson'
import DoubleCartoonsIcon from '../../assets/icons/DoubleCartoons'
import FamilyCartoonsIcon from '../../assets/icons/FamilyCartoons'

import {
  SearchItemType,
  searched,
  isLoadingSearched,
  filterQueryForSearch,
  isShowLoadmore
} from '../../assets/atoms/HotelHomeData'
import FilterIcon from '../../assets/icons/Filter'
import LocationIcon from '../../assets/icons/Location'
import SortIcon from '../../assets/icons/Sort'
import CardBestDeals from '../../Components/CardBestDeals'
import CardDestinationIdea from '../../Components/CardDestinationIdeas'
import CardUpcomingTrips from '../../Components/CardUpcomingTrips'
import CardMostPopular from '../../Components/CardMostPopular'
import LightButton from '../../Components/LightButton'
import COLORS from '../../Constants/styles'
import RenderHotelComponent from './components/RenderHotel'
import IncrementDecrementInputComponent from '../../views/Home/components/incrementDecrement'
import { currentLocation } from '../../assets/atoms/HotelHomeData'
import { FilterQueryProps } from '../../Constants/data'
import { getSearchedHotelAll } from '../../api/apiCaller'

import styles from './styles'

const Offers = ({ navigation }: any) => {
  const [________, setSearched] = useRecoilState(searched)
  const [_, setSearchedMore] = useRecoilState(searched)
  const searchedHotelData = useRecoilValue(searched)
  const [__, setFilterQuery] = useRecoilState(filterQueryForSearch)
  const filterQuery = useRecoilValue(filterQueryForSearch)
  const [isLoadmoreLoading, setIsLoadmoreLoading] = useState(false)
  const [travellingForWork, setTravellingForWork] = useState(false)
  const currentCoordinates = useRecoilValue(currentLocation)
  const [______, setFilterQueryForSearch] = useRecoilState(filterQueryForSearch)
  const [isSearchLoading, setIsLoadingSearched] = useRecoilState(isLoadingSearched)
  const isLoading = useRecoilValue(isLoadingSearched)
  const [_________, setIsShowLoadmore] = useRecoilState(isShowLoadmore)
  const isShowLoadmoreButton = useRecoilValue(isShowLoadmore)

  const [modalSearch, setModalSearch] = useState(false)
  const [modalSort, setModalSort] = useState(false)
  const [modalFilterPrice, setModalFilterPrice] = useState(false)

  const [filterActive, setFilterActive] = useState('Normal')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)

  const [modalWhereVisible, setModalWhereVisible] = useState(false)
  const [modalWhenVisible, setModalWhenVisible] = useState(false)
  const [modalHowManyVisible, setModalHowManyVisible] = useState(false)
  const [modalChoiceRooms, setModalChoiceRooms] = useState(false)
  const [initialDate, setInitialDate] = useState('')

  const [where, setWhere] = useState('')
  const [tabsActive, setTabsActive] = useState('calendar')

  const [dateValue, setDateValue] = useState('')
  const [secondDateValue, setSecondDateValue] = useState('')

  const [numberOfDays, setNumberOfDays] = useState(1)
  const [teste, setTeste] = useState({})

  const [inputAdults, setInputAdults] = useState(1)
  const [inputChildren, setInputChildren] = useState(0)
  const [inputInfants, setInputInfants] = useState(0)
  const [radioRoomsValues, setRadioRoomsValues] = useState('Shared') // Shared, Single, Double, Family

  const [isRoomTouched, setIsRoomTouched] = useState(false)
  const [isWhenTouched, setIsWhenTouched] = useState(false)
  const [isWhereTouched, setIsWhereTouched] = useState(false)

  function sendWhen(text: string) {
    setTabsActive('calendar')
    setNumberOfDays(1)
    setModalWhenVisible(false)
  }

  const handleSubmitForm = () => {
    let filterQuery = {} as FilterQueryProps

    filterQuery.currentLocation = currentCoordinates

    const stay = {
      checkIn: dateValue,
      checkOut: secondDateValue
    }
    filterQuery.stay = stay

    let roomType = []
    if (radioRoomsValues === 'Shared') {
      roomType = [
        'DBL.OM',
        'TWN.OM',
        'TWN.H6',
        'TWN.DX-1',
        'TWN.AS',
        'DBT.ST',
        'DBL.ST',
        'DBL.SU',
        'DBL.DX',
        'DBA.AS',
        'DBT.ST-2',
        'DBT.ST-4',
        'DBT.ST-5',
        'DBT.ST-3',
        'DBT.ST-1',
        'DBL.PI',
        'DBL.EJ',
        'DBL.VM',
        'DBL.DX-VM'
      ]
    } else if (radioRoomsValues === 'Single') {
      roomType = [
        'SGL.ST',
        'SUI.EJ',
        'STU.ST',
        'TWN.ST',
        'APT.B1',
        'JSU.EJ',
        'SGL.OM',
        'STU.BL',
        'TPL.KG'
      ]
    } else if (radioRoomsValues === 'Double') {
      roomType = [
        'DBT.ST',
        'DBL.AS-1',
        'DBL.SU',
        'DBL.DX',
        'TPL.DX',
        'DBA.AS',
        'DBL.OM',
        'DBT.ST-2',
        'DBT.ST-4',
        'DBT.ST-3',
        'DBT.ST-1',
        'TWN.PI',
        'DBL.PI',
        'DBL.EJ',
        'TWN.OM',
        'TWN.AS',
        'DBL.VM',
        'DBL.DX-VM'
      ]
    } else {
      roomType = [
        'DBT.ST-5',
        'JSU.ST',
        'QUA.ST',
        'TPL.ST',
        'FAM.CM',
        'QUA.SU',
        'QUA.ST',
        'FAM.SU',
        'FAM.ST',
        'APT.C5',
        'APT.B1-C4',
        'APT.B1-C5'
      ]
    }
    const rooms = {
      included: true,
      room: roomType
    }
    filterQuery.rooms = rooms

    const paxes = [] as { type: string; age: number }[]
    if (inputChildren > 0 || inputInfants > 0) {
      for (let i = 0; i < inputChildren; i++) {
        const item = {
          type: 'CH',
          age: 7
        }
        paxes.push(item)
      }

      for (let i = 0; i < inputInfants; i++) {
        const item = {
          type: 'CH',
          age: 2
        }
        paxes.push(item)
      }
    }

    const occupancies = [
      {
        rooms: 1,
        adults: travellingForWork ? 1 : inputAdults,
        children: travellingForWork ? 0 : inputChildren + inputInfants,
        paxes: travellingForWork ? [] : paxes
      }
    ]
    filterQuery.occupancies = occupancies

    filterQuery.destination = { destination: where }

    const limit = 7
    filterQuery.limit = limit
    let page = 0
    filterQuery.page = page

    setFilterQueryForSearch(filterQuery)
    setIsLoadingSearched({ isLoading: true })
    getSearchedHotelAll(filterQuery)
      .then((res) => {
        setIsLoadingSearched({ isLoading: false })
        const data = res.data
        setSearched(data)
        setInputAdults(1)
        setInputChildren(0)
        setInputInfants(0)
        setRadioRoomsValues('Shared')
        setDateValue('')
        setSecondDateValue('')
        setTeste({})
        setWhere('')
        setIsShowLoadmore(true)
        setIsRoomTouched(false)
        setIsWhenTouched(false)
        setIsWhereTouched(false)
      })
      .catch((err) => {
        setIsLoadingSearched({ isLoading: false })
        setIsRoomTouched(false)
        setIsWhenTouched(false)
        setIsWhereTouched(false)
        console.log('error', err)
      })
  }

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
  }, [dateValue, secondDateValue])

  const adicionarDiasData = (dias: number) => {
    let hoje = new Date(dateValue)
    let dataVenc = new Date(hoje.getTime() + dias * 24 * 60 * 60 * 1000)
    const y = dataVenc.getFullYear(),
      m = dataVenc.getMonth() + 1,
      d = dataVenc.getDate()

    return `${y}-${m > 9 ? m : `0${m}`}-${d > 9 ? d : `0${d}`}`
  }

  useEffect(() => {
    let day1 = new Date(dateValue)
    let day2 = new Date(secondDateValue)
    let difference = Math.abs(day2.getTime() - day1.getTime())
    let days = difference / (1000 * 3600 * 24)

    let dates = []

    for (let i = 0; i < days + 1; i++) {
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

  const sortFilterAsc = searchedHotelData.slice().sort((a: SearchItemType, b: SearchItemType) => {
    return a.price - b.price
  })

  const sortFilterDesc = searchedHotelData.slice().sort((a: SearchItemType, b: SearchItemType) => {
    return b.price - a.price
  })

  const sortDistanceDesc = searchedHotelData
    .slice()
    .sort((a: SearchItemType, b: SearchItemType) => {
      return a.distance - b.distance
    })

  const sortTopDesc = searchedHotelData.slice().sort((a: SearchItemType, b: SearchItemType) => {
    return b.reviewsCount - a.reviewsCount
  })

  const getRangePrice = () => {
    return searchedHotelData.filter(
      (item) => Number(item.price) > Number(minPrice) && Number(item.price) < Number(maxPrice)
    )
  }

  const getRenderActive = (item: string) => {
    switch (item) {
      case 'Normal':
        return searchedHotelData
      case 'SortPriceAsc':
        return sortFilterAsc
      case 'SortPriceDesc':
        return sortFilterDesc
      case 'SortDistanceDesc':
        return sortDistanceDesc
      case 'SortReviewedDesc':
        return sortTopDesc
      case 'MinMaxPrice':
        return getRangePrice()
      default:
        return searchedHotelData
    }
  }

  const handleLoadmore = () => {
    setIsLoadmoreLoading(true)
    const newFilterQuery = { ...filterQuery, page: (filterQuery.page || 0) + 1 }
    setFilterQuery(newFilterQuery)
    getSearchedHotelAll(newFilterQuery)
      .then((res) => {
        const data = res.data
        data.length === 0 && setIsShowLoadmore(false)
        const newData = [...searchedHotelData, ...data]
        setSearchedMore(newData)
        setIsLoadmoreLoading(false)
      })
      .catch((err) => {
        setIsLoadmoreLoading(false)
        console.log('error', err)
      })
  }

  const previousPrices = [100, 200, 300, 400, 500, 600, 400, 300, 800, 320, 569, 769]
  const mostPrices = [400, 350, 550, 150, 200, 250, 270, 300, 539, 600, 456, 345, 234]

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <View style={styles.navContainer}>
          <View style={styles.borderNav} />
          <View style={styles.filterBlueContainer}>
            <Text style={styles.searchText}>Search</Text>
          </View>
          <View style={styles.filterWhiteContainer}>
            <TouchableOpacity style={styles.filterButtons} onPress={() => setModalSort(true)}>
              <SortIcon />
              <Text style={styles.sortText}>sort</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButtons]}
              onPress={() => setModalFilterPrice(true)}
            >
              <View>
                <FilterIcon />
              </View>
              <Text style={styles.filterIconText}>filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButtons]}
              onPress={() => navigation.navigate('Maps')}
            >
              <View>
                <LocationIcon color={COLORS.blue} />
              </View>
              <Text style={styles.locationText}>map</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.innerFilterContainer}
            onPress={() => setModalSearch(true)}
            activeOpacity={0.5}
          >
            <View style={styles.filterTexts}>
              <Text style={styles.normalText}>{`${1} adult`}</Text>
              <Text style={styles.point}>.</Text>
              <Text style={styles.normalText}>no children</Text>
              <Text style={styles.point}>.</Text>
              <Text style={styles.normalText}>{`${1} room`}</Text>
            </View>
            <IconButton
              style={[styles.notMargin]}
              icon={'chevron-right'}
              size={34}
              color={COLORS.blue}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.covidAlert}>Review COVID-19 travel restrictions before you book.</Text>
        <View style={styles.mostPopularContainer}>
          <CardUpcomingTrips numberofadults={1} />
        </View>
        {isLoading.isLoading ? (
          <Progress.Circle
            color="#1B4298"
            borderWidth={5}
            size={50}
            indeterminate={true}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          />
        ) : getRenderActive(filterActive).length !== 0 ? (
          getRenderActive(filterActive).map((item: SearchItemType, index: number) => {
            if (index < 3) {
              return (
                <View
                  style={[styles.marginHorizontal15, { marginBottom: 10 }]}
                  key={`${item.name}-${index}`}
                >
                  <RenderHotelComponent
                    code={item.code}
                    currency={item.currency}
                    hotelName={item.name}
                    ratings={item.ratings}
                    reviewsCount={item.reviewsCount}
                    hotelImage={item.image}
                    country={item.country}
                    city={item.city}
                    address={item.address}
                    coordinates={item.coordinates}
                    distance={item.distance}
                    roomType={item.roomType}
                    freeCancellation={item.freeCancellation}
                    price={item.price}
                    noprepaymentneeded={item.noprepaymentneeded}
                    bedType={item.bedType}
                    from={item.from}
                    to={item.to}
                    onPressCard={() =>
                      navigation.navigate('HotelDetails', {
                        image: item.image,
                        code: item.code,
                        currency: item.currency,
                        price: item.price,
                        ratings: item.ratings,
                        reviewsCount: item.reviewsCount,
                        cancellationPolicies: item.cancellationPolicies,
                        from: item.from,
                        to: item.to,
                        numberofadults: 1,
                        rateKey: item.rateKey,
                        rateType: item.rateType,
                        taxes: item.taxes,
                        coordinates: item.coordinates
                      })
                    }
                  />
                </View>
              )
            }
          })
        ) : (
          isShowLoadmoreButton && (
            <Text
              style={{
                marginLeft: 8,
                color: '#05233A',
                fontFamily: 'Corbel',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              There is no hotels you want.
            </Text>
          )
        )}

        <CardDestinationIdea numberofadults={1} />
        {isLoading.isLoading ? (
          <Progress.Circle
            color="#1B4298"
            borderWidth={5}
            size={50}
            indeterminate={true}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          />
        ) : (
          getRenderActive(filterActive).map((item: SearchItemType, index: number) => {
            if (index < 6 && index >= 3) {
              return (
                <View
                  style={[styles.marginHorizontal15, { marginBottom: 10 }]}
                  key={`${item.name}-${index}`}
                >
                  <RenderHotelComponent
                    code={item.code}
                    hotelName={item.name}
                    ratings={item.ratings}
                    currency={item.currency}
                    reviewsCount={item.reviewsCount}
                    hotelImage={item.image}
                    country={item.country}
                    city={item.city}
                    address={item.address}
                    coordinates={item.coordinates}
                    distance={item.distance}
                    roomType={item.roomType}
                    freeCancellation={item.freeCancellation}
                    price={item.price}
                    noprepaymentneeded={item.noprepaymentneeded}
                    bedType={item.bedType}
                    from={item.from}
                    to={item.to}
                    onPressCard={() =>
                      navigation.navigate('HotelDetails', {
                        image: item.image,
                        code: item.code,
                        currency: item.currency,
                        price: item.price,
                        ratings: item.ratings,
                        reviewsCount: item.reviewsCount,
                        cancellationPolicies: item.cancellationPolicies,
                        from: item.from,
                        to: item.to,
                        numberofadults: 1,
                        rateKey: item.rateKey,
                        rateType: item.rateType,
                        taxes: item.taxes,
                        coordinates: item.coordinates
                      })
                    }
                  />
                </View>
              )
            }
          })
        )}

        <CardBestDeals numberofadults={1} />
        {isLoading.isLoading ? (
          <Progress.Circle
            color="#1B4298"
            borderWidth={5}
            size={50}
            indeterminate={true}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          />
        ) : (
          getRenderActive(filterActive).map((item: SearchItemType, index: number) => {
            if (index >= 6) {
              return (
                <View
                  style={[styles.marginHorizontal15, { marginBottom: 10 }]}
                  key={`${item.name}-${index}`}
                >
                  <RenderHotelComponent
                    code={item.code}
                    hotelName={item.name}
                    ratings={item.ratings}
                    reviewsCount={item.reviewsCount}
                    hotelImage={item.image}
                    country={item.country}
                    currency={item.currency}
                    city={item.city}
                    address={item.address}
                    coordinates={item.coordinates}
                    distance={item.distance}
                    roomType={item.roomType}
                    freeCancellation={item.freeCancellation}
                    price={item.price}
                    noprepaymentneeded={item.noprepaymentneeded}
                    bedType={item.bedType}
                    from={item.from}
                    to={item.to}
                    onPressCard={() =>
                      navigation.navigate('HotelDetails', {
                        image: item.image,
                        code: item.code,
                        currency: item.currency,
                        price: item.price,
                        ratings: item.ratings,
                        reviewsCount: item.reviewsCount,
                        cancellationPolicies: item.cancellationPolicies,
                        from: item.from,
                        to: item.to,
                        numberofadults: 1,
                        rateKey: item.rateKey,
                        rateType: item.rateType,
                        taxes: item.taxes,
                        coordinates: item.coordinates
                      })
                    }
                  />
                </View>
              )
            }
          })
        )}
        {!isLoadmoreLoading ? (
          isShowLoadmoreButton ? (
            <Button
              mode={'contained'}
              onPress={() => handleLoadmore()}
              style={styles.loadMore}
              labelStyle={{ color: 'white' }}
            >
              Load more
            </Button>
          ) : (
            isShowLoadmoreButton && (
              <Text
                style={{
                  marginLeft: 8,
                  color: '#05233A',
                  fontFamily: 'Corbel',
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginVertical: 15,
                  textAlign: 'center'
                }}
              >
                There is no more hotels.
              </Text>
            )
          )
        ) : (
          <Progress.Circle
            color="#1B4298"
            borderWidth={5}
            size={50}
            indeterminate={true}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          />
        )}
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalSearch}
          onRequestClose={() => setModalSearch(false)}
        >
          <View
            style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(18, 52, 123, 0.8)' }}
          >
            <View style={styles.modalSearchContainer}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalSearch(false),
                    setWhere(''),
                    setDateValue(''),
                    setSecondDateValue(''),
                    setInputAdults(1),
                    setInputChildren(0),
                    setInputInfants(0),
                    setRadioRoomsValues('Shared')
                }}
                rippleColor={'white'}
              />
              <TextInput
                placeholder={'Where are you going?'}
                style={
                  isWhereTouched && where === ''
                    ? [styles.inputSearch, { borderColor: 'rgba(255, 0, 0, 0.5)', borderWidth: 2 }]
                    : styles.inputSearch
                }
                value={where === '' ? 'Where are you going?' : where}
                onChangeText={() => {
                  return
                }}
                onFocus={() => {
                  setIsWhereTouched(true)
                  setModalWhereVisible(true), setWhere('')
                }}
              />
              <TextInput
                placeholder={'When do you want to go?'}
                style={
                  isWhenTouched && dateValue === '' && secondDateValue === ''
                    ? [styles.inputSearch, { borderColor: 'rgba(255, 0, 0, 0.5)', borderWidth: 2 }]
                    : styles.inputSearch
                }
                value={
                  dateValue === '' && secondDateValue === ''
                    ? 'When do you want to go?'
                    : `${dateValue} - ${secondDateValue}`
                }
                onFocus={() => {
                  setModalWhenVisible(true), setIsWhenTouched(true)
                  setTabsActive('flexible'), setDateValue(''), setSecondDateValue(''), setTeste({})
                }}
                onChangeText={() => {
                  return
                }}
              />
              <TextInput
                placeholder={'How many rooms & people?'}
                style={
                  isRoomTouched && inputAdults === 0 && inputChildren === 0 && inputInfants === 0
                    ? [styles.inputSearch, { borderColor: 'rgba(255, 0, 0, 0.5)', borderWidth: 2 }]
                    : styles.inputSearch
                }
                value={
                  inputAdults === 0 && inputChildren === 0 && inputInfants === 0
                    ? 'How many rooms & people?'
                    : `Adults-${inputAdults}, Children-${
                        inputChildren + inputInfants
                      }, Room-${radioRoomsValues}`
                }
                onChangeText={() => {
                  return
                }}
                onFocus={() => {
                  setIsRoomTouched(true)
                  setModalHowManyVisible(true)
                  setInputAdults(1)
                  setInputChildren(0)
                  setInputInfants(0)
                  setRadioRoomsValues('Shared')
                }}
              />
              <Button
                icon={{ direction: 'ltr', source: 'magnify' }}
                labelStyle={{
                  textTransform: 'capitalize',
                  paddingVertical: 5,
                  color: COLORS.primary
                }}
                style={styles.modalSearch}
                onPress={() => {
                  setIsRoomTouched(true),
                    setIsWhenTouched(true),
                    setIsWhereTouched(true),
                    isRoomTouched &&
                      isWhenTouched &&
                      isWhereTouched &&
                      (inputAdults !== 0 || inputChildren !== 0 || inputInfants !== 0) &&
                      dateValue !== '' &&
                      secondDateValue !== '' &&
                      where !== '' &&
                      (handleSubmitForm(), setModalSearch(false), setIsShowLoadmore(true))
                }}
              >
                Search
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16, color: '#5163B0' }}>
                  I'm travelling for work
                </Text>
                <Checkbox
                  color="#5163B0"
                  onPress={() => {
                    setTravellingForWork(!travellingForWork), setIsRoomTouched(!isRoomTouched)
                  }}
                  status={travellingForWork ? 'checked' : 'unchecked'}
                  theme={{
                    colors: {
                      text: '#5163B0'
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalSort}
          onRequestClose={() => setModalSort(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(18, 52, 123, 0.8)'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '65%',
                height: 220,
                borderRadius: 20,
                paddingHorizontal: 22,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 5
              }}
            >
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => setModalSort(false)}
                rippleColor={'white'}
              />
              <TouchableOpacity
                style={styles.sortTexts}
                onPress={() => {
                  setModalSort(false)
                  setFilterActive('SortPriceAsc')
                }}
              >
                <Text style={styles.text16}>Price Lower</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortTexts}
                onPress={() => {
                  setModalSort(false)
                  setFilterActive('SortPriceDesc')
                }}
              >
                <Text style={styles.text16}>Price Higher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortTexts}
                onPress={() => {
                  setModalSort(false), setFilterActive('SortDistanceDesc')
                }}
              >
                <Text style={styles.text16}>Distance from city center</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sortTexts}
                onPress={() => {
                  setModalSort(false), setFilterActive('SortReviewedDesc')
                }}
              >
                <Text style={styles.text16}>Top reviwed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalFilterPrice}
          onRequestClose={() => setModalFilterPrice(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(18, 52, 123, 0.8)'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 450,
                borderRadius: 20,
                padding: 30,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 5
              }}
            >
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setMinPrice(0), setMaxPrice(10000), setModalFilterPrice(false)
                }}
                rippleColor={'white'}
              />
              <Text style={[styles.text16, { marginLeft: '5%', marginBottom: 57 }]}>
                The average price of an experience is {'456.56'}€.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginLeft: '10%'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  {previousPrices.map((item, index) => (
                    <View
                      key={`${item}@${index}`}
                      style={{
                        width: 5,
                        height: item / 10,
                        backgroundColor: '#5163B0',
                        opacity: 0.5,
                        marginHorizontal: 2,
                        alignSelf: 'flex-end'
                      }}
                    />
                  ))}
                  {mostPrices.map((item, index) => (
                    <View
                      key={`${item}@${index}`}
                      style={{
                        width: 5,
                        height: item / 10,
                        backgroundColor: '#5163B0',
                        marginHorizontal: 2,
                        alignSelf: 'flex-end'
                      }}
                    />
                  ))}
                </View>
              </View>

              <RangeSlider
                style={{ marginLeft: '5%', marginRight: '5%', marginBottom: 20 }}
                range={[minPrice, maxPrice]}
                minimumValue={0}
                maximumValue={10000}
                step={10}
                minimumRange={10 || 0}
                crossingAllowed={false}
                outboundColor="grey"
                inboundColor="grey"
                thumbTintColor={'rgba(27,102,253,0.5)'}
                thumbStyle={{
                  padding: 12,
                  backgroundColor: 'rgba(27,102,253,0.4)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 5,
                  elevation: 5
                }}
                trackStyle={{ margin: 0 }}
                minTrackStyle={{ marginBottom: 26 }}
                midTrackStyle={{ marginBottom: 26 }}
                maxTrackStyle={{ marginBottom: 26 }}
                vertical={false}
                inverted={false}
                enabled={true}
                trackHeight={2}
                thumbSize={22}
                slideOnTap={true}
                onSlidingComplete={([minPrice, maxPrice]) => {
                  setMinPrice(minPrice), setMaxPrice(maxPrice)
                }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                <View
                  style={{ borderWidth: 1, borderColor: '#DEE9FF', borderRadius: 12, width: '35%' }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, paddingHorizontal: 5 }}>
                    min. price
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        paddingTop: 2,
                        backgroundColor: 'white',
                        fontFamily: 'Corbel-Bold',
                        fontSize: 18,
                        paddingLeft: 5,
                        paddingRight: 2,
                        color: 'black',
                        borderRadius: 12
                      }}
                    >
                      €
                    </Text>
                    <TextInput
                      style={{
                        width: 50,
                        backgroundColor: 'white',
                        fontFamily: 'Corbel-Bold',
                        color: 'black',
                        marginLeft: 2,
                        fontSize: 16,
                        borderRadius: 12
                      }}
                      keyboardType="numeric"
                      value={String(minPrice)}
                      onChangeText={(text) => setMinPrice(Number(text))}
                    ></TextInput>
                  </View>
                </View>
                <View
                  style={{
                    width: 15,
                    height: 1,
                    backgroundColor: '#506F9D',
                    alignSelf: 'center',
                    marginHorizontal: 8
                  }}
                />
                <View
                  style={{ borderWidth: 1, borderColor: '#DEE9FF', borderRadius: 12, width: '35%' }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, paddingHorizontal: 5 }}>
                    max. price
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        paddingTop: 2,
                        backgroundColor: 'white',
                        fontFamily: 'Corbel-Bold',
                        fontSize: 18,
                        paddingLeft: 5,
                        paddingRight: 2,
                        color: 'black',
                        borderRadius: 12
                      }}
                    >
                      €
                    </Text>
                    <TextInput
                      style={{
                        width: 50,
                        backgroundColor: 'white',
                        fontFamily: 'Corbel-Bold',
                        color: 'black',
                        marginLeft: 2,
                        fontSize: 16,
                        borderRadius: 12
                      }}
                      keyboardType="numeric"
                      value={String(maxPrice)}
                      onChangeText={(text) => setMaxPrice(Number(text))}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View
                style={{ height: 1, backgroundColor: '#05233A', width: '90%', alignSelf: 'center' }}
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
                <TouchableOpacity
                  onPress={() => {
                    setMinPrice(0), setMaxPrice(10000)
                  }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                </TouchableOpacity>
                <LightButton
                  text="Save"
                  textStyle={{ paddingHorizontal: 50 }}
                  style={{ borderRadius: 20 }}
                  onPress={() => {
                    setFilterActive('MinMaxPrice')
                    setModalFilterPrice(false), getRangePrice()
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalWhereVisible}
          onRequestClose={() => {
            setModalWhereVisible(!modalWhereVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => {
                  setModalWhereVisible(false), setWhere('')
                }}
                rippleColor={'white'}
              />
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <Text style={styles.modalTitle}>Where are you going?</Text>
                </View>
              </View>
              <View style={styles.inputBottom}>
                <Dropdown
                  style={styles.inputModal}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={stateData}
                  search
                  maxHeight={350}
                  labelField="label"
                  containerStyle={{ margin: 0, borderRadius: 10 }}
                  itemContainerStyle={{ margin: 0 }}
                  valueField="value"
                  placeholder="Search for destination"
                  searchPlaceholder="Search Cities"
                  dropdownPosition="auto"
                  value={where}
                  onChange={(item) => {
                    setWhere(item.value)
                  }}
                  onFocus={() => {
                    setWhere('')
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View style={{ marginLeft: 50, width: '100%' }}>
                {<Text style={styles.modalText}>Not sure where to go? </Text>}
                {
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => {
                      setWhere('Everywhere'), setModalWhereVisible(false)
                    }}
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
                }
                {
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => {
                      setWhere('MostPopular'), setModalWhereVisible(false)
                    }}
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
                }
                {
                  <TouchableOpacity
                    style={styles.icons}
                    onPress={() => {
                      setWhere('BestDeal'), setModalWhereVisible(false)
                    }}
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
                }
                {
                  <TouchableOpacity
                    style={[styles.loginWhereModalButton, styles.btnSearch]}
                    onPress={() => setModalWhereVisible(false)}
                  >
                    <Text style={styles.loginButtonText}>
                      <AntDesign name="search1" size={20} color="#1B4298" /> Search
                    </Text>
                  </TouchableOpacity>
                }
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
                  setDateValue(''), setSecondDateValue(''), setInitialDate(''), setTeste({})
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
              <View
                style={{
                  display: tabsActive === 'calendar' ? 'flex' : 'none',
                  width: '100%',
                  height: 420
                }}
              >
                <Calendar
                  initialDate={initialDate}
                  minDate={new Date().toISOString().split('T')[0].toString()}
                  markingType={'period'}
                  markedDates={teste}
                  style={{
                    marginTop: 30,
                    borderWidth: 2,
                    borderColor: '#506F9D',
                    borderRadius: 12,
                    marginBottom: 13
                  }}
                  onDayPress={(day) => {
                    if (dateValue) {
                      let first = new Date(dateValue)
                      let second = new Date(day.dateString)
                      if (first.getTime() > second.getTime()) {
                        second = first
                        setSecondDateValue(dateValue)
                        setDateValue(day.dateString.toString())
                      } else setSecondDateValue(day.dateString.toString())
                    } else {
                      if (numberOfDays > 1) {
                        let secondday = new Date(day.dateString)
                        secondday = new Date(
                          secondday.setDate(secondday.getDate() + numberOfDays - 1)
                        )
                        setDateValue(day.dateString.toString())
                        setSecondDateValue(secondday.toISOString().split('T')[0].toString())
                      } else {
                        setDateValue(day.dateString.toString())
                      }
                    }
                    if (dateValue && secondDateValue) {
                      if (numberOfDays > 1) {
                        let secondday = new Date(day.dateString)
                        secondday = new Date(
                          secondday.setDate(secondday.getDate() + numberOfDays - 1)
                        )
                        setDateValue(day.dateString.toString())
                        setSecondDateValue(secondday.toISOString().split('T')[0].toString())
                      } else {
                        setDateValue(day.dateString.toString())
                        setSecondDateValue('')
                      }
                    }
                  }}
                />
              </View>

              <View
                style={{
                  display: tabsActive === 'flexible' ? 'flex' : 'none',
                  paddingTop: 30,
                  width: '100%',
                  marginBottom: '25%'
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Number of Days</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      onPress={() => {
                        if (numberOfDays === 1) {
                          setNumberOfDays(1)
                        } else {
                          setNumberOfDays(numberOfDays - 1)
                        }
                      }}
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
                    <Text
                      style={{
                        borderWidth: 2,
                        borderRadius: 30,
                        padding: 5,
                        borderColor: '#506F9D',
                        marginLeft: 10,
                        marginRight: 10,
                        width: 90,
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {numberOfDays}
                    </Text>
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
                  <View
                    style={{
                      marginLeft: 'auto',
                      marginRight: '5%'
                    }}
                  >
                    <Pressable
                      onPress={() => [
                        setTabsActive('calendar'),
                        setNumberOfDays(1),
                        setDateValue(''),
                        setSecondDateValue(''),
                        setTeste({})
                      ]}
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

                  <View
                    style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around' }}
                  >
                    <TouchableOpacity
                      style={styles.monthCard}
                      onPress={() => [setInitialDate('2022-12-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text style={styles.monthText}>Dec</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.monthCard}
                      onPress={() => [setInitialDate('2023-01-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text style={styles.monthText}>Jan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.monthCard}
                      onPress={() => [setInitialDate('2023-02-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text style={styles.monthText}>Feb</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.monthCard}
                      onPress={() => [setInitialDate('2023-03-01'), setTabsActive('calendar')]}
                    >
                      <IconButton
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                        icon={'calendar'}
                        size={24}
                        color={'#1B4298'}
                      ></IconButton>
                      <Text style={styles.monthText}>Mar</Text>
                    </TouchableOpacity>
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
                    setInitialDate('')
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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(18, 52, 123, 0.8)'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '60%',
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
                  if (inputAdults === 1) {
                    setInputAdults(1)
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
                <TouchableOpacity
                  onPress={() => {
                    setInputAdults(1), setInputChildren(0), setInputInfants(0)
                    setRadioRoomsValues('Shared')
                  }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                </TouchableOpacity>
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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(18, 52, 123, 0.8)'
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '60%',
                maxHeight: 400,
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
                <TouchableOpacity
                  onPress={() => {
                    setInputAdults(1), setInputChildren(0), setInputInfants(0)
                    setRadioRoomsValues('Shared')
                  }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16 }}>Clear</Text>
                </TouchableOpacity>
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
      </View>
    </ScrollView>
  )
}

export default Offers
