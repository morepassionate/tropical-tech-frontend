import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { Button, Checkbox, IconButton, TextInput } from 'react-native-paper'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Progress from 'react-native-progress'
import { RangeSlider } from '@sharcoux/slider'

import {
  SearchItemType,
  searched,
  isLoadingSearched,
  filterQueryForSearch
} from '../../assets/atoms/HotelHomeData'
import FilterIcon from '../../assets/icons/Filter'
import LocationIcon from '../../assets/icons/Location'
import SortIcon from '../../assets/icons/Sort'
import CardBestDeals from '../../Components/CardBestDeals'
import CardDestinationIdea from '../../Components/CardDestinationIdeas'
import CardMostPopular from '../../Components/CardMostPopular'
import LightButton from '../../Components/LightButton'
import COLORS from '../../Constants/styles'
import RenderHotelComponent from './components/RenderHotel'
import { getSearchedHotelAll } from '../../api/apiCaller'

import styles from './styles'

const Offers = ({ navigation }: any) => {
  const [_, setSearchedMore] = useRecoilState(searched)
  const searchedHotelData = useRecoilValue(searched)
  const isLoading = useRecoilValue(isLoadingSearched)
  const filterQuery = useRecoilValue(filterQueryForSearch)
  const [isLoadmoreLoading, setIsLoadmoreLoading] = useState(false)
  const [travellingForWork, setTravellingForWork] = useState(false)

  const [modalSearch, setModalSearch] = useState(false)
  const [modalSort, setModalSort] = useState(false)
  const [modalFilterPrice, setModalFilterPrice] = useState(false)

  const [filterActive, setFilterActive] = useState('Normal')
  const [personsAndRooms, setPersonsAndRooms] = useState('')
  const [dateSearch, setDateSearch] = useState('')
  const [placeSearch, setPlaceSearch] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const sortFilterAsc = searchedHotelData.slice().sort((a: SearchItemType, b: SearchItemType) => {
    return a.price - b.price
  })

  const sortFilterDesc = searchedHotelData.slice().sort((a: SearchItemType, b: SearchItemType) => {
    return b.price - a.price
  })

  const sortDistanceDesc = searchedHotelData
    .slice()
    .sort((a: SearchItemType, b: SearchItemType) => {
      return b.distance - a.distance
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
    getSearchedHotelAll(filterQuery)
      .then((res) => {
        const data = res.data
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
          <CardMostPopular isOfferPage={true} numberofadults={1} />
        </View>
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
                        taxes: item.taxes
                      })
                    }
                  />
                </View>
              )
            }
          })
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
                        taxes: item.taxes
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
                        taxes: item.taxes
                      })
                    }
                  />
                </View>
              )
            }
          })
        )}
        {!isLoadmoreLoading ? (
          <Button
            mode={'contained'}
            onPress={() => handleLoadmore()}
            style={styles.loadMore}
            labelStyle={{ color: 'white' }}
          >
            Load more
          </Button>
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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={styles.modalSearchContainer}>
              <IconButton
                icon={'close'}
                size={24}
                color={'#8296CA'}
                style={{ alignSelf: 'flex-end' }}
                onPress={() => setModalSearch(false)}
                rippleColor={'white'}
              />
              <TextInput
                mode={'flat'}
                underlineColor={'transparent'}
                activeUnderlineColor={'transparent'}
                outlineColor={'transparent'}
                activeOutlineColor={'transparent'}
                placeholder={'Place'}
                placeholderTextColor={'black'}
                style={styles.inputSearch}
                value={placeSearch}
                onChangeText={(e) => setPlaceSearch(e)}
                theme={{
                  fonts: {
                    light: {
                      fontFamily: 'Corbel'
                    },
                    medium: {
                      fontFamily: 'Corbel'
                    },
                    regular: {
                      fontFamily: 'Corbel'
                    },
                    thin: {
                      fontFamily: 'Corbel'
                    }
                  }
                }}
              />
              <TextInput
                mode={'flat'}
                underlineColor={'transparent'}
                activeUnderlineColor={'transparent'}
                outlineColor={'transparent'}
                activeOutlineColor={'transparent'}
                placeholder={'08 - 10 Mon 2021'}
                placeholderTextColor={'black'}
                style={styles.inputSearch}
                value={dateSearch}
                onChangeText={(e) => setDateSearch(e)}
                theme={{
                  fonts: {
                    light: {
                      fontFamily: 'Corbel'
                    },
                    medium: {
                      fontFamily: 'Corbel'
                    },
                    regular: {
                      fontFamily: 'Corbel'
                    },
                    thin: {
                      fontFamily: 'Corbel'
                    }
                  }
                }}
              />
              <TextInput
                mode={'flat'}
                underlineColor={'transparent'}
                activeUnderlineColor={'transparent'}
                outlineColor={'transparent'}
                activeOutlineColor={'transparent'}
                placeholder={'1 adult ・ no children ・ 1 room'}
                placeholderTextColor={'black'}
                style={styles.inputSearch}
                value={personsAndRooms}
                onChangeText={(e) => setPersonsAndRooms(e)}
                theme={{
                  fonts: {
                    light: {
                      fontFamily: 'Corbel'
                    },
                    medium: {
                      fontFamily: 'Corbel'
                    },
                    regular: {
                      fontFamily: 'Corbel'
                    },
                    thin: {
                      fontFamily: 'Corbel'
                    }
                  }
                }}
              />
              <Button
                icon={{ direction: 'ltr', source: 'magnify' }}
                labelStyle={{ textTransform: 'capitalize', paddingTop: 5, color: COLORS.primary }}
                style={styles.modalSearch}
                onPress={() => {
                  setModalSearch(false)
                }}
              >
                Search
              </Button>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16, color: '#5163B0' }}>
                  I'm travelling for work
                </Text>
                <Checkbox
                  color="#5163B0"
                  onPress={() => setTravellingForWork(!travellingForWork)}
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '65%',
                height: '25%',
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                onPress={() => setModalFilterPrice(false)}
                rippleColor={'white'}
              />
              <Text style={[styles.text16, { marginLeft: '5%', marginBottom: 57 }]}>
                The average price of an experience is 000€.
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
                range={[10, 10000]}
                minimumValue={10}
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
                onValueChange={([minPrice, maxPrice]) => {
                  setMinPrice(String(minPrice)), setMaxPrice(String(maxPrice))
                }}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                <View
                  style={{ borderWidth: 1, borderColor: '#DEE9FF', borderRadius: 12, width: '35%' }}
                >
                  <Text style={{ fontFamily: 'Corbel', fontSize: 16, paddingHorizontal: 5 }}>
                    min. price
                  </Text>
                  <TextInput
                    mode={'flat'}
                    style={{
                      backgroundColor: 'white',
                      fontFamily: 'Corbel-Bold',
                      fontSize: 16,
                      paddingHorizontal: 5,
                      height: 30,
                      borderRadius: 12
                    }}
                    keyboardType="numeric"
                    value={minPrice}
                    onChangeText={(e) => setMinPrice(e.replace(/[^0-9]/g, ''))}
                  ></TextInput>
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
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                      fontFamily: 'Corbel-Bold',
                      fontSize: 16,
                      paddingHorizontal: 5,
                      height: 30,
                      borderRadius: 12
                    }}
                    keyboardType="numeric"
                    value={maxPrice}
                    onChangeText={(e) => setMaxPrice(e.replace(/[^0-9]/g, ''))}
                  ></TextInput>
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
                    setMinPrice(''), setMaxPrice('')
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
      </View>
    </ScrollView>
  )
}

export default Offers
