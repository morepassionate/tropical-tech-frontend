/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import config from '../../config/config.json'

import styles from './styles'
import { dataHotel } from '../../data'

function CardPropertyType(props: any) {
  const navigation = useNavigation()

  const [data, setData] = useState(null)
  const [code, setCode] = useState(null)
  const [code1, setCode1] = useState(null)
  const [code2, setCode2] = useState(null)

  const [hotelName, setHotelName] = useState(null)
  const [hotelName1, setHotelName1] = useState(null)
  const [hotelName2, setHotelName2] = useState(null)

  const [gallery, setGallery] = useState('')
  const [gallery1, setGallery1] = useState('')
  const [gallery2, setGallery2] = useState('')

  // useEffect(() => {
  //   getHotels()
  // }, [])

  //Pegar o id do usuário
  async function getHotels() {
    //console.log(config.urlRoot);
    let response = await fetch(`${config.urlRoot}hotels`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let json = await response.json()

    //setData(json);
    setCode(json.hotels[20].code)
    setCode1(json.hotels[21].code)
    setCode2(json.hotels[22].code)

    setHotelName(json.hotels[20].name.content)
    setHotelName1(json.hotels[21].name.content)
    setHotelName2(json.hotels[22].name.content)

    setGallery(config.hotel.urlPhotoBg + json.hotels[20].images[0].path)
    setGallery1(config.hotel.urlPhotoBg + json.hotels[21].images[0].path)
    setGallery2(config.hotel.urlPhotoBg + json.hotels[22].images[0].path)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Type</Text>
      <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
        {dataHotel.map((item, index) => {
          const limit = 9
          const min = 5
          if (index > min && index < limit) {
            return (
              <TouchableOpacity
                key={`${item.name}-${index}`}
                onPress={() =>
                  navigation.navigate('HotelDetails' as never, { code: index } as never)
                }
              >
                <View style={styles.containerCard}>
                  <Image style={styles.imgCard} source={{ uri: item.image }} />
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        })}
      </ScrollView>
    </View>
  )
}

export default CardPropertyType
