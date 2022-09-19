import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import PersonLocationIcon from '../../assets/icons/PersonLocationIcon'
import COLORS from '../../Constants/styles'

// import { Container } from './styles';

type TripsCardProps = {
  hotelName: string
  imageHotel: string
  ratings: number
  numberOfBeds: number
  value: number
  cashbackValue?: number
  reviewsCount: number
  onPressCard?: () => void
  onPressDots?: () => void
}

const TripsCard: React.FC<TripsCardProps> = (props) => {
  const {
    hotelName,
    imageHotel,
    numberOfBeds,
    ratings,
    value,
    cashbackValue,
    reviewsCount,
    onPressCard,
    onPressDots
  } = props
  return (
    <TouchableOpacity style={styles.borderMain} activeOpacity={0.5} onPress={onPressCard}>
      <View style={styles.imgContainer}>
        <View style={styles.cashbackContainer}>
          <View style={[styles.rowContent]}>
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontFamily: 'Corbel' }}
            >{`Confirmation code:`}</Text>
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
        <View style={styles.codeConfirmation}>
          <View
            style={[
              styles.rowContent,
              { alignItems: 'center', justifyContent: 'space-between', width: '95%' }
            ]}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontFamily: 'Corbel', marginLeft: 28 }}
            >{`KFDKADBFS`}</Text>
            <IconButton
              icon={'dots-vertical'}
              size={24}
              color={COLORS.white}
              style={styles.notMargin}
              onPress={onPressDots}
              rippleColor={COLORS.primary90}
            />
          </View>
        </View>
        <View
          style={[
            styles.rowContent,
            {
              marginBottom: 8,
              justifyContent: 'space-between',
              width: '70%',
              marginTop: 45,
              marginHorizontal: 28
            }
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
        <View style={{ marginHorizontal: 24 }}>
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
        </View>
        <View style={styles.rowContentLined}>
          <View style={{ width: '44%', marginLeft: 15 }}>
            <Text style={[styles.startEnd]}>Starts</Text>
            <Text style={[styles.corbel]}>Fri, 8 Oct</Text>
            <Text style={[styles.corbel, { marginBottom: 10 }]}>8:00</Text>
          </View>
          <View style={styles.leftBorder}>
            <View style={{ marginLeft: 20 }}>
              <Text style={[styles.startEnd]}>Ends</Text>
              <Text style={[styles.corbel]}>Sun, 10 Oct</Text>
              <Text style={[styles.corbel, { marginBottom: 10 }]}>8:00</Text>
            </View>
          </View>
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
    maxHeight: 390,
    flexDirection: 'row',
    marginBottom: 10
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
    width: '45%'
  },
  imgStyle: {
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  infoContainer: {
    width: '55%'
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
    backgroundColor: COLORS.primary,
    width: '100%',
    opacity: 0.8,
    borderTopLeftRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeConfirmation: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: COLORS.primary90,
    width: '100%',
    borderTopRightRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContentLined: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.primary90,
    marginHorizontal: 0,
    marginTop: 20
  },
  startEnd: {
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginBottom: 7
  },
  leftBorder: {
    width: '45%',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primary90
  },
  corbel: {
    fontFamily: 'Corbel'
  }
})

export default TripsCard
