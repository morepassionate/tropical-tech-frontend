import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import { Button, Checkbox, IconButton, TextInput } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import FilterIcon from '../../assets/icons/Filter'
import LocationIcon from '../../assets/icons/Location'
import SortIcon from '../../assets/icons/Sort'
import CardBestDeals from '../../Components/CardBestDeals'
import CardDestinationIdea from '../../Components/CardDestinationIdeas'
import CardMostPopular from '../../Components/CardMostPopular'
import LightButton from '../../Components/LightButton'
import COLORS from '../../Constants/styles'
import { dataHotel, destinationIdeas, popularHotels } from '../../data'
import RenderHotelComponent from './components/RenderHotel'
import styles from './styles'

type ItemProps = {
  name: string
  image: string
  ratings: number
  reviews: number
  location: {
    lat: number
    lon: number
    address: string
  }
  beds: number
  value: number
  taxesAndChargesInclude: boolean
  freeCancellation: boolean
  noPrepaymentNeeded: boolean
  city: string
  country: string
  description: string
}

const Offers = ({ navigation }: any) => {
  const [destinationIndex, setDestinationIndex] = useState(0)
  const [travellingForWork, setTravellingForWork] = useState(false)
  const [modalSearch, setModalSearch] = useState(false)
  const [modalSort, setModalSort] = useState(false)
  const [modalFilterPrice, setModalFilterPrice] = useState(false)
  const [sort, setSort] = useState('') //Lower, Higher, Distance, Top
  const [placeSearch, setPlaceSearch] = useState('')
  const [dateSearch, setDateSearch] = useState('')
  const [personsAndRooms, setPersonsAndRooms] = useState('')
  const [filterActive, setFilterActive] = useState('Normal') //Normal ,Search, SortAsc, SortDesc, Price

  const searchFilter = dataHotel.filter((item) => {
    return (
      item.city.charAt(0) === placeSearch.charAt(0) ||
      item.country.charAt(0) === placeSearch.charAt(0)
    )
  })

  const sortFilterAsc = dataHotel.sort((item) => {
    return item.value > 0 ? -1 : 1
  })

  const sortFilterDesc = dataHotel.sort((item) => {
    return item.value > item.value ? -1 : 1
  })

  const priceFilter = dataHotel.sort((item) => {
    return item.ratings > item.ratings ? -1 : 1
  })

  const getRenderActive = (item: string) => {
    switch (item) {
      case 'Normal':
        return dataHotel
      case 'Search':
        return searchFilter
      case 'SortAsc':
        return sortFilterAsc
      case 'SortDesc':
        return sortFilterDesc
      case 'Price':
        return priceFilter
      default:
        return []
    }
  }
  useEffect(() => {
    setFilterActive('Normal')
    console.log(getRenderActive(filterActive))
  }, [])

  const previousPrices = [10, 20, 25, 30, 15, 19]
  const mostPrices = [40, 35, 55, 15, 20, 25, 27, 30, 15, 10]

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.carouselItem}>
        <Image style={styles.imgHotel} source={{ uri: item.img }} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
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
        {/* <Text style={styles.mostPopularText}>Most popular</Text> */}
        <CardMostPopular />
      </View>
      {getRenderActive(filterActive).map((item, index) => {
        if (index < 3) {
          return (
            <View
              style={[styles.marginHorizontal15, { marginBottom: 10 }]}
              key={`${item.name}-${index}`}
            >
              <RenderHotelComponent
                hotelName={item.name}
                imageHotel={item.image}
                numberOfBeds={item.beds}
                ratings={item.ratings}
                value={item.value}
                freeCancellation={item.freeCancellation}
                noPrepaymentNeeded={item.noPrepaymentNeeded}
                taxesAndCharges={item.taxesAndChargesInclude}
                reviewsCount={item.reviews}
                onPressCard={() =>
                  navigation.navigate('HotelDetails', {
                    code: index
                  })
                }
              />
            </View>
          )
        }
      })}

      <CardDestinationIdea />
      {dataHotel.map((item, index) => {
        if (index < 6 && index >= 3) {
          return (
            <View
              style={[styles.marginHorizontal15, { marginBottom: 10 }]}
              key={`${item.name}-${index}`}
            >
              <RenderHotelComponent
                hotelName={item.name}
                imageHotel={item.image}
                numberOfBeds={item.beds}
                ratings={item.ratings}
                value={item.value}
                freeCancellation={item.freeCancellation}
                noPrepaymentNeeded={item.noPrepaymentNeeded}
                taxesAndCharges={item.taxesAndChargesInclude}
                reviewsCount={item.reviews}
                onPressCard={() =>
                  navigation.navigate('HotelDetails', {
                    code: index
                  })
                }
              />
            </View>
          )
        }
      })}

      <CardBestDeals />
      {dataHotel.map((item, index) => {
        if (index >= 6) {
          return (
            <View
              style={[styles.marginHorizontal15, { marginBottom: 10 }]}
              key={`${item.name}-${index}`}
            >
              <RenderHotelComponent
                hotelName={item.name}
                imageHotel={item.image}
                numberOfBeds={item.beds}
                ratings={item.ratings}
                value={item.value}
                freeCancellation={item.freeCancellation}
                noPrepaymentNeeded={item.noPrepaymentNeeded}
                taxesAndCharges={item.taxesAndChargesInclude}
                reviewsCount={item.reviews}
                onPressCard={() =>
                  navigation.navigate('HotelDetails', {
                    code: index
                  })
                }
              />
            </View>
          )
        }
      })}
      <Button style={styles.loadMore} labelStyle={{ color: 'white' }}>
        Load more
      </Button>
      <Modal
        animationType={'slide'}
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
              labelStyle={{
                textTransform: 'capitalize',
                paddingTop: 5,
                color: COLORS.primary
              }}
              style={styles.modalSearch}
              onPress={() => {
                setModalSearch(false)
                setFilterActive('Search')
              }}
            >
              Search
            </Button>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
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
              height: '30%',
              borderRadius: 20,
              paddingHorizontal: 22
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
                setFilterActive('SortAsc')
              }}
            >
              <Text style={styles.text16}>Price Lower</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortTexts}
              onPress={() => {
                setModalSort(false)
                setFilterActive('SortDesc')
              }}
            >
              <Text style={styles.text16}>Price Higher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortTexts}
              onPress={() => {
                setModalSort(false)
                setSort('Distance')
              }}
            >
              <Text style={styles.text16}>Distance from city center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortTexts}
              onPress={() => {
                setModalSort(false)
                setSort('Top')
              }}
            >
              <Text style={styles.text16}>Top revived</Text>
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
              width: '70%',
              height: '45%',
              borderRadius: 20,
              padding: 10,
              marginTop: 20
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
            <Text style={styles.text16}>The average price of an experience is 000€.</Text>
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
                      height: item,
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
                      height: item,
                      backgroundColor: '#5163B0',
                      marginHorizontal: 2,
                      alignSelf: 'flex-end'
                    }}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                height: 2,
                width: '90%',
                backgroundColor: '#5163B0',
                marginLeft: '5%',
                marginBottom: 50
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 40
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#DEE9FF',
                  borderRadius: 12,
                  width: '35%'
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16, paddingHorizontal: 5 }}>
                  min. price
                </Text>
                <Text
                  style={{
                    fontFamily: 'Corbel-Bold',
                    fontSize: 16,
                    paddingHorizontal: 5
                  }}
                >
                  €0
                </Text>
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
                style={{
                  borderWidth: 1,
                  borderColor: '#DEE9FF',
                  borderRadius: 12,
                  width: '35%'
                }}
              >
                <Text style={{ fontFamily: 'Corbel', fontSize: 16, paddingHorizontal: 5 }}>
                  max. price
                </Text>
                <Text
                  style={{
                    fontFamily: 'Corbel-Bold',
                    fontSize: 16,
                    paddingHorizontal: 5
                  }}
                >
                  €0
                </Text>
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
                onPress={() => setModalFilterPrice(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default Offers
