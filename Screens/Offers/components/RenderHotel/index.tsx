import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import PersonLocationIcon from '../../../../assets/icons/PersonLocationIcon'
import COLORS from '../../../../Constants/styles'
import { hotelbedImg } from '../../../../Constants/styles'

type RenderHotelProps = {
  code: number
  hotelName: string
  ratings: number
  reviewsCount: number
  hotelImage: string
  country: string
  city: string
  address: string
  coordinates: {
    longitude: number
    latitude: number
  }
  distance: number
  roomType: string
  currency: string
  freeCancellation: boolean
  price: number
  noprepaymentneeded: boolean
  bedType: string
  from: string
  to: string
  onPressCard: () => void
}

const RenderHotelComponent: React.FC<RenderHotelProps> = (props) => {
  const [isFavor, setIsFavor] = useState(false)
  const {
    code,
    hotelName,
    ratings,
    reviewsCount,
    hotelImage,
    country,
    city,
    address,
    coordinates,
    distance,
    roomType,
    freeCancellation,
    price,
    currency,
    noprepaymentneeded,
    bedType,
    from,
    to,
    onPressCard
  } = props
  return (
    <TouchableOpacity style={styles.borderMain} onPress={onPressCard}>
      <View style={styles.imgContainer}>
        <View style={styles.cashbackContainer}>
          <View style={[styles.rowContent, { marginTop: 2 }]}>
            <Text
              style={{ color: COLORS.primary, fontSize: 20, fontFamily: 'Corbel' }}
            >{`10%`}</Text>
            <Text style={styles.cashbackText}>CASHBACK</Text>
          </View>
        </View>
        <Image
          source={{
            uri: `${hotelbedImg}${hotelImage}`
          }}
          resizeMode={'cover'}
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.rowContent,
            { marginBottom: 5, justifyContent: 'space-between', width: '70%' }
          ]}
        >
          <Text style={styles.name}>{hotelName}</Text>
          <IconButton
            icon={'heart'}
            size={17}
            color={!isFavor ? COLORS.grey : COLORS.blue}
            style={[styles.notMargin, { marginLeft: 20 }]}
            onPress={() => {
              return setIsFavor(!isFavor)
            }}
            rippleColor={'blue'}
          />
        </View>
        <View>
          <View style={[styles.rowContent]}>
            <IconButton icon={'star'} size={14} color={COLORS.blue} style={styles.notMargin} />
            <Text style={styles.starText}>{ratings}</Text>
            <Text style={styles.point}>.</Text>
            <Text style={styles.starText}>{`${reviewsCount ?? 0} reviews`}</Text>
          </View>
          <View style={[styles.rowContent, { marginBottom: 10 }]}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <PersonLocationIcon />
            </View>
            <Text style={styles.areaText}>Area</Text>
            <View style={{ marginLeft: 5 }}>
              <Text
                numberOfLines={4}
                ellipsizeMode="tail"
                style={[styles.point, { width: 150, marginTop: 7 }]}
              >
                {address}
              </Text>
              <Text style={[styles.point, { marginTop: 5 }]}>
                {city}
                {','}
              </Text>
              <Text style={styles.point}>{country}</Text>
            </View>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.starText}>{`${distance.toFixed(2)} mile from location`}</Text>
          </View>
          <Text style={styles.typeRoomText}>{roomType}</Text>
          <Text style={styles.text16}>{bedType}</Text>
          <View style={[styles.rowContent]}>
            <View style={styles.pinCashback}>
              <Text style={styles.pinText}>{`0 CASHBACK`}</Text>
            </View>
            <Text style={{ fontFamily: 'Corbel', marginLeft: 5, fontSize: 12, marginTop: 20 }}>
              {currency}
            </Text>
            <Text style={styles.value}>{`${price}`}</Text>
          </View>
          {freeCancellation && <Text style={styles.includesText}>free cancellation</Text>}
          {noprepaymentneeded && <Text style={styles.includesText}>no prepayment needed</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  borderMain: {
    borderWidth: 1.75,
    borderRadius: 10,
    borderColor: COLORS.blue,
    minHeight: 340,
    maxHeight: 360,
    flexDirection: 'row'
  },
  name: {
    fontSize: 18,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    width: 150
  },
  notMargin: {
    margin: 0
  },
  rowContent: {
    flexDirection: 'row'
  },
  text16: {
    fontFamily: 'Corbel',
    fontSize: 16
  },
  imgContainer: {
    width: '40%'
  },
  imgStyle: {
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  infoContainer: {
    width: '60%',
    marginVertical: 15,
    marginHorizontal: 18
  },
  point: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Corbel',
    alignSelf: 'auto',
    marginLeft: 5
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    marginTop: 15,
    borderRadius: 10,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center'
  },
  value: {
    fontFamily: 'Corbel',
    marginLeft: 0,
    fontSize: 20,
    marginTop: 10
  },
  includesText: {
    fontSize: 14,
    fontFamily: 'Corbel',
    color: COLORS.grey,
    marginTop: 8
  },
  typeRoomText: {
    width: '75%',
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5
  },
  areaText: {
    fontFamily: 'Corbel',
    fontSize: 18,
    paddingLeft: 4,
    alignSelf: 'center'
  },
  starText: {
    fontFamily: 'Corbel',
    fontSize: 14
  },
  cashbackText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Corbel',
    alignSelf: 'center',
    top: 3,
    marginLeft: 8
  },
  cashbackContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: COLORS.success,
    width: '100%',
    opacity: 0.8,
    borderTopLeftRadius: 8,
    height: 40,
    alignItems: 'center'
  }
})

export default RenderHotelComponent
