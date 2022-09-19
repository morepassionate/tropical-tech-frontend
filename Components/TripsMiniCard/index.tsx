import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import COLORS from '../../Constants/styles'

const TripsMiniCard = () => {
  return (
    <View style={styles.borderCard}>
      <View style={styles.cardTitle}>
        <View style={[styles.rowContent, { alignItems: 'center' }]}>
          <Text
            style={{ fontSize: 16, fontFamily: 'Corbel', color: COLORS.primary }}
          >{`confirmation code:`}</Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 24,
              fontFamily: 'Corbel',
              color: COLORS.primary
            }}
          >
            KFDKADBFS
          </Text>
        </View>
        <IconButton
          icon={'dots-vertical'}
          size={20}
          style={styles.notMargin}
          color={COLORS.primary}
        />
      </View>
      <View style={[styles.rowContent, { marginTop: 9 }]}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/11/17/09/28/hotel-1831072__340.jpg'
          }}
          resizeMode={'cover'}
          style={{ width: 65, height: 65, borderRadius: 10, marginLeft: 11 }}
        />
        <View style={{ marginLeft: 19 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Corbel' }}>Hotel Name</Text>
          <Text style={{ fontSize: 16, fontFamily: 'Corbel' }}>Area</Text>
          <View
            style={[
              styles.rowContent,
              {
                alignItems: 'center',
                marginTop: 2,
                justifyContent: 'space-between',
                width: '60%'
              }
            ]}
          >
            <View style={styles.pinCashback}>
              <Text style={styles.pinText}>{`0 CASHBACK`}</Text>
            </View>
            <Text style={{ fontFamily: 'Corbel', fontSize: 18 }}>$ 00</Text>
          </View>
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
  )
}

const styles = StyleSheet.create({
  borderCard: {
    borderWidth: 1.75,
    borderColor: COLORS.primary,
    height: 205,
    width: '100%',
    borderRadius: 12,
    marginBottom: 10
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    borderRadius: 10,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center'
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
  },
  notMargin: {
    margin: 0
  },
  rowContent: {
    flexDirection: 'row'
  },
  cardTitle: {
    backgroundColor: '#B8D8EB',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default TripsMiniCard
