import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { IconButton, ProgressBar, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import { currentLocation } from '../../assets/atoms/HotelHomeData'
import * as Progress from 'react-native-progress'
import { stateData } from '../../data'
import { useRecoilValue } from 'recoil'

// import { Container } from './styles';

const Maps = ({ navigation }: any) => {
  const currentCoordinates = useRecoilValue(currentLocation)
  const [where, setWhere] = useState('')
  const [position, setPosition] = useState<{
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }>({
    latitude: currentCoordinates.latitude,
    longitude: currentCoordinates.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        console.log('where again')
        const params = {
          access_key: 'a7cb1d426ef75fa213f89c8ad28ff346',
          query: where,
          limit: 1
        }
        const { data } = await axios.get('http://api.positionstack.com/v1/forward', { params })
        setPosition({
          ...position,
          latitude: data.data[0].latitude,
          longitude: data.data[0].longitude
        })
      } catch (err) {
        console.log('err', err)
      }
    })()
  }, [where])

  useEffect(() => {
    ;(async () => {
      try {
        console.log('select position')
        const params = {
          access_key: 'a7cb1d426ef75fa213f89c8ad28ff346',
          query: `${position.latitude},${position.longitude}`,
          limit: 1
        }
        const { data } = await axios.get('http://api.positionstack.com/v1/reverse', { params })
        setTitle(data.data[0].region)
        setDescription(data.data[0].label)
      } catch (err) {
        console.log('err', err)
      }
    })()
  }, [position])

  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }

  if (position === null)
    return (
      <Progress.Circle
        color="#1B4298"
        borderWidth={5}
        size={50}
        indeterminate={true}
        style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}
      />
    )

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={{ position: 'absolute', zIndex: 2, width: '90%', marginLeft: '85%' }}>
        <IconButton icon={'close'} size={20} color={'black'} onPress={() => navigation.goBack()} />
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          width: '90%',
          marginLeft: '5%',
          top: 30
        }}
      >
        <Dropdown
          style={styles.inputSearch}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.placeholderStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={stateData}
          search
          labelField="label"
          containerStyle={{ marginTop: -25, borderRadius: 10 }}
          itemContainerStyle={{ margin: 0 }}
          valueField="value"
          placeholder="Search here"
          searchPlaceholder="Search Cities"
          dropdownPosition="auto"
          value={where}
          onChange={(item) => {
            setWhere(item.value)
          }}
          renderItem={renderItem}
        />
      </View>
      <MapView
        style={{ height: 400, width: '100%', marginBottom: 15 }}
        region={position}
        onPress={(e) =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }
      >
        <Marker coordinate={position} title={title} description={description} />
      </MapView>
      <View style={{ height: '50%', backgroundColor: 'white' }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputSearch: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 16,
    marginVertical: 7,
    fontFamily: 'Corbel',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    textAlign: 'center'
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  inputSearchStyle: {
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Corbel'
  }
})
export default Maps
