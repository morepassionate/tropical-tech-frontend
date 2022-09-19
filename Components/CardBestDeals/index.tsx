/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import config from '../../config/config.json'

import styles from './styles'
const img1 = require('../../assets/img/img1.png')
const img2 = require('../../assets/img/img2.png')
const img3 = require('../../assets/img/img3.png')
const img4 = require('../../assets/img/img2.png')
const img5 = require('../../assets/img/img1.png')
import { dataHotel } from '../../data'

function CardBestDeals(props: any) {
  const navigation = useNavigation()

  const [data, setData] = useState(null)
  const [code, setCode] = useState(null)
  const [code1, setCode1] = useState(null)
  const [code2, setCode2] = useState(null)
  const [code3, setCode3] = useState(null)
  const [code4, setCode4] = useState(null)
  const [code5, setCode5] = useState(null)
  const [hotelName, setHotelName] = useState(null)
  const [hotelName1, setHotelName1] = useState(null)
  const [hotelName2, setHotelName2] = useState(null)
  const [hotelName3, setHotelName3] = useState(null)
  const [hotelName4, setHotelName4] = useState(null)
  const [hotelName5, setHotelName5] = useState(null)

  const [country, setCountry] = useState(null)
  const [description, setDescription] = useState(null)
  const [gallery, setGallery] = useState('')
  const [gallery1, setGallery1] = useState('')
  const [gallery2, setGallery2] = useState('')
  const [gallery3, setGallery3] = useState(null)
  const [gallery4, setGallery4] = useState(null)
  const [gallery5, setGallery5] = useState(null)

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

    // setData(json);
    setCode(json.hotels[7].code)
    setCode1(json.hotels[11].code)
    setCode2(json.hotels[12].code)

    setHotelName(json.hotels[7].name.content)
    setHotelName1(json.hotels[11].name.content)
    setHotelName2(json.hotels[12].name.content)

    setGallery(config.hotel.urlPhotoBg + json.hotels[7].images[0].path)
    setGallery1(config.hotel.urlPhotoBg + json.hotels[11].images[0].path)
    setGallery2(config.hotel.urlPhotoBg + json.hotels[12].images[0].path)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Deals</Text>
      <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
        {dataHotel.map((item, index) => {
          const limit = 5
          const min = 1
          if (index > min && index < limit) {
            return (
              <TouchableOpacity
                key={`${item.name}#${index}`}
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

export default CardBestDeals
