/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as Progress from 'react-native-progress'
import { HotelInfoProps } from '../../Constants/data'

import { hotelbedImg } from '../../Constants/styles'
import styles from './styles'
import { useRecoilValue } from 'recoil'
import { IsMostPopularLoading, mostPopularHotelData } from '../../assets/atoms/MostPopularHotelData'

const CardMostPopular = () => {
  const navigation = useNavigation()
  const mostPopularHotels = useRecoilValue(mostPopularHotelData)
  const isLoading = useRecoilValue(IsMostPopularLoading)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Popular</Text>
      {mostPopularHotels.length !== 0 || !isLoading.isLoading ? (
        <View>
          <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
            {mostPopularHotels.map((item: HotelInfoProps, index: number) => {
              const limit = Math.floor(mostPopularHotels.length / 2)
              if (index < limit) {
                return (
                  <TouchableOpacity
                    key={`${item.name}%${index}`}
                    onPress={() =>
                      navigation.navigate('HotelDetails' as never, { code: index } as never)
                    }
                  >
                    <View style={styles.containerCard}>
                      <Image
                        style={styles.imgCard}
                        source={{
                          uri: `${hotelbedImg}${item.image}`
                        }}
                      />
                      <View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                          {item.city}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtext}>
                          {item.country}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
          <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
            {mostPopularHotels.map((item: HotelInfoProps, index: number) => {
              const min = Math.floor(mostPopularHotels.length / 2)
              const limit = mostPopularHotels.length
              if (index >= min && index <= limit) {
                return (
                  <TouchableOpacity
                    key={`${item.name}!${index}`}
                    onPress={() =>
                      navigation.navigate('HotelDetails' as never, { code: index } as never)
                    }
                  >
                    <View style={styles.containerCard}>
                      <Image
                        style={styles.imgCard}
                        source={{
                          uri: `${hotelbedImg}${item.image}`
                        }}
                      />
                      <View>
                        <Text style={styles.text}>{item.city}</Text>
                        <Text style={styles.subtext}>{item.country}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
        </View>
      ) : (
        <Progress.Circle
          color="#1B4298"
          borderWidth={5}
          size={50}
          indeterminate={true}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
      )}
    </View>
  )
}

export default CardMostPopular
