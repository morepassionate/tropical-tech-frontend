/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress'

import { HotelInfoProps } from '../../Constants/data'
import styles from './styles'
import { hotelbedImg } from '../../Constants/styles'
import { hotelData, IsLoading } from '../../assets/atoms/HotelData'
import { useRecoilValue } from 'recoil'

function CardUpcomingTrips() {
  const navigation = useNavigation()
  const recentSearchedHotels = useRecoilValue(hotelData)
  const isLoading = useRecoilValue(IsLoading)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Searches</Text>
      {recentSearchedHotels.length !== 0 || !isLoading.isLoading ? (
        <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
          {recentSearchedHotels.map((item: HotelInfoProps, index: number) => {
            const limit = Math.floor(recentSearchedHotels.length / 3)
            if (index < limit)
              return (
                <TouchableOpacity
                  key={`${item.name}*${index}`}
                  onPress={() =>
                    navigation.navigate('HotelDetails' as never, { code: index } as never)
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
