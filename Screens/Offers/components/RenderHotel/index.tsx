import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import PersonLocationIcon from '../../../../assets/icons/PersonLocationIcon'
import COLORS from '../../../../Constants/styles'
// import { Container } from './styles';

type RenderHotelProps = {
  imageHotel: string
  hotelName: string
  ratings: number
  numberOfBeds: number
  value: number
  cashbackValue?: number
  taxesAndCharges?: boolean
  freeCancellation?: boolean
  noPrepaymentNeeded?: boolean
  reviewsCount: number
  onPressCard: () => void
}

const RenderHotelComponent: React.FC<RenderHotelProps> = (props) => {
  const {
    imageHotel,
    hotelName,
    numberOfBeds,
    ratings,
    value,
    cashbackValue,
    noPrepaymentNeeded,
    taxesAndCharges,
    freeCancellation,
    reviewsCount,
    onPressCard
  } = props
  return (
    <TouchableOpacity style={styles.borderMain} onPress={onPressCard}>
      <View style={styles.imgContainer}>
        <View style={styles.cashbackContainer}>
          <View style={[styles.rowContent, { marginTop: 2 }]}>
            <Text
              style={{ color: COLORS.primary, fontSize: 20, fontFamily: 'Corbel' }}
            >{`15%`}</Text>
            <Text style={styles.cashbackText}>CASHBACK</Text>
          </View>
        </View>
        <Image
          source={{
            uri: imageHotel
          }}
          resizeMode={'cover'}
          style={styles.imgStyle}
        />
      </View>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.rowContent,
            { marginBottom: 8, justifyContent: 'space-between', width: '70%' }
          ]}
        >
          <Text style={styles.name}>{hotelName}</Text>
          <IconButton
            icon={'heart'}
            size={17}
            color={COLORS.blue}
            style={styles.notMargin}
            onPress={() => {
              return
            }}
            rippleColor={'white'}
          />
        </View>
        <View>
          <View style={[styles.rowContent, { marginBottom: 8 }]}>
            <IconButton icon={'star'} size={14} color={COLORS.blue} style={styles.notMargin} />
            <Text style={styles.starText}>{ratings.toFixed(2)}</Text>
            <Text style={styles.point}>.</Text>
            <Text style={styles.starText}>{`${reviewsCount ?? 0} reviews`}</Text>
          </View>
          <View style={[styles.rowContent, { marginBottom: 8 }]}>
            <View style={{ marginTop: 4 }}>
              <PersonLocationIcon />
            </View>
            <Text style={styles.areaText}>Area</Text>
            <Text style={styles.point}>.</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.starText}>{`0.0 km from location`}</Text>
          </View>
          <Text style={styles.typeRoomText}>Type of room with type of bathroom</Text>
          {numberOfBeds === 0 ? (
            <Text style={styles.text16}>No of beds</Text>
          ) : (
            <Text style={styles.text16}>{`${numberOfBeds} beds`}</Text>
          )}
          <View style={[styles.rowContent]}>
            <View style={styles.pinCashback}>
              <Text style={styles.pinText}>{`0 CASHBACK`}</Text>
            </View>
            <Text style={styles.value}>{`$ ${0}`}</Text>
          </View>
          {taxesAndCharges && <Text style={styles.includesText}>includes taxes and charges</Text>}
          {freeCancellation && <Text style={styles.includesText}>free cancellation</Text>}
          {noPrepaymentNeeded && <Text style={styles.includesText}>no prepayment needed</Text>}
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
    fontWeight: 'bold'
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
    marginVertical: 24,
    marginHorizontal: 28
  },
  point: {
    fontSize: 24,
    lineHeight: 15,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    marginHorizontal: 8
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
    marginLeft: 24,
    fontSize: 20,
    marginTop: 12
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
    marginVertical: 12
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
