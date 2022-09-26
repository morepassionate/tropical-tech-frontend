/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress'

import { HotelInfoProps } from '../../Constants/data'
import styles from './styles'
import { hotelbedImg } from '../../Constants/styles'
import { recentsearches, isLoadingRecentSearches } from '../../assets/atoms/HotelHomeData'
import { useRecoilValue } from 'recoil'

function CardUpcomingTrips(props: { numberofadults: number }) {
  const numberofadults = props.numberofadults
  const navigation = useNavigation()
  const recentSearchedHotels = useRecoilValue(recentsearches)
  const isLoading = useRecoilValue(isLoadingRecentSearches)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      {recentSearchedHotels.length !== 0 || !isLoading.isLoading ? (
        <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
          {recentSearchedHotels.map((item: HotelInfoProps, index: number) => {
            return (
              <TouchableOpacity
                key={`${item.name}*${index}`}
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
                      numberofadults
                    } as never
                  )
                }
              >
                <View style={styles.containerCard}>
                  <Image style={styles.imgCard} source={{ uri: `${hotelbedImg}${item.image}` }} />
                  <Text>
                    <Text style={styles.textPlace}> Place </Text>
                    <Text style={styles.text}>
                      {' '}
                      {item.from} - {item.to}{' '}
                    </Text>
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

export default CardUpcomingTrips
