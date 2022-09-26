/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress'

import styles from './styles'
import { HotelInfoProps } from '../../Constants/data'
import { useRecoilValue } from 'recoil'
import { bestdeals, isLoadingBestDeals } from '../../assets/atoms/HotelHomeData'
import { hotelbedImg } from '../../Constants/styles'

function CardBestDeals(props: { numberofadults: number }) {
  const numberofadults = props.numberofadults
  const navigation = useNavigation()
  const bestDealHotels = useRecoilValue(bestdeals)
  const isLoading = useRecoilValue(isLoadingBestDeals)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    console.log('bestDealHotels', bestDealHotels)
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Deals</Text>
      {bestDealHotels.length !== 0 || !isLoading.isLoading ? (
        <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
          {bestDealHotels.map((item: HotelInfoProps, index) => {
            return (
              <TouchableOpacity
                key={`${item.name}#${index}`}
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
                      image: item.image,
                      currency: item.currency,
                      numberofadults: numberofadults
                    } as never
                  )
                }
              >
                <View style={styles.containerCard}>
                  <Image style={styles.imgCard} source={{ uri: `${hotelbedImg}${item.image}` }} />
                  <Text>
                    <Text style={styles.textTown}>{item.name} </Text>
                    {/* <Text style={styles.textCountry}>{item.country}</Text> */}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
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

export default CardBestDeals
