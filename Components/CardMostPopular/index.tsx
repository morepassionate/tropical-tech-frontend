import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, LogBox, ImageEditor } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as Progress from 'react-native-progress'
import { HotelInfoProps } from '../../Constants/data'

import { hotelbedImg } from '../../Constants/styles'
import styles from './styles'
import { useRecoilValue } from 'recoil'
import { isLoadingMostPopular, mostpopular } from '../../assets/atoms/HotelHomeData'

interface CardMostPropsType {
  numberofadults: number
  isOfferPage?: boolean
}

const CardMostPopular = (props: CardMostPropsType) => {
  const isOfferPage = props.isOfferPage
  const numberofadults = props.numberofadults
  const navigation = useNavigation()
  const mostPopularHotels = useRecoilValue(mostpopular)
  const isLoading = useRecoilValue(isLoadingMostPopular)

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
                      navigation.navigate(
                        'HotelDetails' as never,
                        {
                          code: item.code,
                          price: item.price,
                          ratings: item.ratings,
                          reviewsCount: item.reviewsCount,
                          cancellationPolicies: item.cancellationPolicies,
                          from: item.from,
                          to: item.to,
                          currency: item.currency,
                          image: item.image,
                          numberofadults: numberofadults,
                          rateKey: item.rateKey,
                          rateType: item.rateType,
                          taxes: item.taxes
                        } as never
                      )
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
              if (index >= min && index < limit) {
                return (
                  <TouchableOpacity
                    key={`${item.name}!${index}`}
                    onPress={() =>
                      navigation.navigate(
                        'HotelDetails' as never,
                        {
                          code: item.code,
                          price: item.price,
                          ratings: item.ratings,
                          reviewsCount: item.reviewsCount,
                          cancellationPolicies: item.cancellationPolicies,
                          from: item.from,
                          to: item.to,
                          currency: item.currency,
                          image: item.image,
                          numberofadults: numberofadults,
                          rateKey: item.rateKey,
                          rateType: item.rateType,
                          taxes: item.taxes
                        } as never
                      )
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
