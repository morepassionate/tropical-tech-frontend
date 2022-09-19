import React, { useEffect, useState, useRef } from 'react'
import {
  Image,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
  Pressable,
  SectionList,
  LogBox
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Checkbox, IconButton, RadioButton, Switch } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { ToggleButton } from 'react-native-paper'
import { TextInput as TextInputPaper } from 'react-native-paper'
// import Header from '../../components/Header'
import CardUpcomingTrips from '../../Components/CardUpcomingTrips'
import CardDestinationIdeas from '../../Components/CardDestinationIdeas'
import CardMostPopular from '../../Components/CardMostPopular'
import CardPropertyType from '../../Components/CardPropertyType'
import CardBestDeals from '../../Components/CardBestDeals'
import LocationIcon from '../../assets/icons/Location'
import IncrementDecrementInputComponent from './components/incrementDecrement'
import LightButton from '../../Components/LightButton'
import CartoonPersonIcon from '../../assets/icons/CartoonPerson'
import DoubleCartoonsIcon from '../../assets/icons/DoubleCartoons'
import FamilyCartoonsIcon from '../../assets/icons/FamilyCartoons'

const Home = (props: any) => {
  const [modalWhereVisible, setModalWhereVisible] = useState(false)
  const [modalWhenVisible, setModalWhenVisible] = useState(false)
  const [modalHowManyVisible, setModalHowManyVisible] = useState(false)
  const [modalChoiceRooms, setModalChoiceRooms] = useState(false)
  const onToggleSnackBar = () => setModalWhereVisible(!modalWhereVisible)
  const onDismissSnackBar = () => setModalWhereVisible(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  const [value, setValue] = useState()

  const [where, setWhere] = useState('')
  const [tabsActive, setTabsActive] = useState('calendar')

  const [dateValue, setDateValue] = useState('')
  const [secondDateValue, setSecondDateValue] = useState('')

  const [teste, setTeste] = useState({})

  useEffect(() => {
    if (dateValue && !secondDateValue) {
      setTeste({
        [dateValue]: { selected: true, color: '#1B4298', textColor: '#fff' }
      })
    }

    if (dateValue && secondDateValue) {
      setTeste({
        [dateValue]: { startingDay: true, color: '#1B4298', textColor: '#fff' },
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

  function sendWhere() {
    setModalWhereVisible(false)
    // setWhere(text);
  }
  function sendWen(text: string) {
    setModalWhenVisible(false)
  }
  // function calendar() {
  //   setFlexibleBtn()
  // }
  function sendForm() {
    console.log('sendForm')
  }

  const [inputAdults, setInputAdults] = useState(0)
  const [inputChildren, setInputChildren] = useState(0)
  const [inputInfants, setInputInfants] = useState(0)
  const [radioRoomsValues, setRadioRoomsValues] = useState('Shared') // Shared, Single, Double, Family

  return (
    <>
      {/* <Header /> */}
      <ScrollView>
        <ImageBackground
          style={styles.container}
          source={require('../../assets/img/bg-hotel.jpeg')}
        >
          <View style={styles.loginForm}>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                // value={`Adults-${inputAdults}, Children-${inputChildren}, Infants-${inputInfants}, Room-${radioRoomsValues}`}
                placeholder="How many rooms & people?"
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
                // value={`${dateValue} - ${secondDateValue}`}
                placeholder="When do you want to go?"
                onFocus={() => setModalWhenVisible(true)}
                onChangeText={() => setModalWhenVisible(true)}
              />
            </View>
            <View style={styles.inputBottom}>
              <TextInput
                style={styles.input}
                value={where}
                placeholder="Where are you going?"
                onFocus={() => setModalWhereVisible(true)}
                onChangeText={() => setModalWhereVisible(true)}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.loginButton} onPress={() => sendForm()}>
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
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Where are you going? </Text>
              <View style={styles.inputBottom}>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Search for destination"
                  onChangeText={(text) => setWhere(text)}
                />
              </View>
              <Text style={styles.modalText}>Not sure where to go? </Text>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => props.navigation.navigate('Home')}
              >
                <IconButton icon={LocationIcon} size={24} />
                <Text style={styles.textIcons}>Everywhere</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => props.navigation.navigate('Home')}
              >
                <IconButton icon={LocationIcon} size={24} />
                <Text style={styles.textIcons}>Most Popular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => props.navigation.navigate('Home')}
              >
                <IconButton icon={LocationIcon} size={24} />
                <Text style={styles.textIcons}>Best deals</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.loginButton, styles.btnSearch]}
                onPress={() => sendWhere()}
              >
                <Text style={styles.loginButtonText}>
                  <AntDesign name="search1" size={20} color="#1B4298" /> Search
                </Text>
              </TouchableOpacity>
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
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>When do you want to go? </Text>
              <View style={styles.buttons}>
                <Pressable
                  onPress={() => {
                    setTabsActive('calendar')
                  }}
                  style={
                    tabsActive == 'calendar'
                      ? { backgroundColor: '#fff', padding: 10, borderRadius: 25 }
                      : { padding: 10 }
                  }
                >
                  <Text style={styles.textIcons}>Calendar</Text>
                </Pressable>
                <Pressable
                  style={
                    tabsActive == 'flexible'
                      ? { backgroundColor: '#fff', padding: 10, borderRadius: 25 }
                      : { padding: 10 }
                  }
                  onPress={() => {
                    setTabsActive('flexible')
                  }}
                >
                  <Text style={styles.textIcons}>I'm flexible</Text>
                </Pressable>
              </View>
              <View style={{ display: tabsActive === 'calendar' ? 'flex' : 'none' }}>
                <Calendar
                  markingType={'period'}
                  markedDates={teste}
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
                  display: tabsActive == 'flexible' ? 'flex' : 'none',
                  paddingTop: 15
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Number of Days</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Pressable
                      onPress={() => {
                        return
                      }}
                      style={{
                        borderWidth: 1,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 5,
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#8296CA' }}>-</Text>
                    </Pressable>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderRadius: 15,
                        padding: 5,
                        borderColor: '#506F9D',
                        marginLeft: 10,
                        marginRight: 10,
                        width: 90
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        return
                      }}
                      style={{
                        borderWidth: 1,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 50,
                        marginTop: 5,
                        borderColor: '#506F9D'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#8296CA' }}>+</Text>
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => {
                        return
                      }}
                      style={{
                        borderWidth: 1,
                        alignItems: 'center',
                        borderRadius: 50,
                        borderColor: '#506F9D',
                        marginLeft: 90,
                        padding: 5,
                        width: 50
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', color: '#8296CA' }}>any</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginTop: 25 }}>
                  <Text>
                    Go in<Text style={{ fontWeight: 'bold' }}>Month</Text>
                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        margin: 5
                      }}
                    >
                      <Text>Nov</Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        margin: 5
                      }}
                    >
                      <Text>Nov</Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        margin: 5
                      }}
                    >
                      <Text>Nov</Text>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        padding: 20,
                        borderRadius: 12,
                        borderColor: '#1B4298',
                        margin: 5
                      }}
                    >
                      <Text>Nov</Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, styles.btnSearch]}
                onPress={() => {
                  sendWen(`${dateValue}${secondDateValue}`)
                }}
              >
                <Text style={styles.loginButtonText}>
                  <AntDesign name="search1" size={20} color="#1B4298" /> Search
                </Text>
              </TouchableOpacity>
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
                width: '70%',
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
                onChangeText={() => setInputChildren(inputAdults)}
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
                onChangeText={() => setInputInfants(inputAdults)}
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
                width: '85%',
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
