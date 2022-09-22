/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress'

import styles from './styles'
import { HotelInfoProps } from '../../Constants/data'
import { useRecoilValue } from 'recoil'
import { hotelData, IsLoading } from '../../assets/atoms/HotelData'

function CardDestinationIdea() {
  const navigation = useNavigation()
  const destinationIdeas = useRecoilValue(hotelData)
  const isLoading = useRecoilValue(IsLoading)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destination Ideas</Text>
      {destinationIdeas.length !== 0 || !isLoading.isLoading ? (
        <ScrollView horizontal style={styles.scrollview} showsHorizontalScrollIndicator={false}>
          {destinationIdeas.map((item: HotelInfoProps, index) => {
            const limit = Math.floor((destinationIdeas.length * 2) / 3)
            const min = Math.floor(destinationIdeas.length / 3)
            if (index >= min && index < limit) {
              return (
                <TouchableOpacity
                  key={`${item.name}@${index}`}
                  onPress={() =>
                    navigation.navigate('HotelDetails' as never, { code: index } as never)
                  }
                >
                  <View style={styles.containerCard}>
                    <Image style={styles.imgCard} source={{ uri: item.image }} />
                    <Text>
                      <Text style={styles.textTown}>{item.name} </Text>
                      <Text style={styles.textCountry}>{item.country}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
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

export default CardDestinationIdea
