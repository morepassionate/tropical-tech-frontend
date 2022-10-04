import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { IconButton, ProgressBar, TextInput } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import { states } from '../../assets/States/index.json'
import * as Progress from 'react-native-progress'

// import { Container } from './styles';

const Maps = ({ navigation }: any) => {
  let currentLocation = {} as { latitude: number; longitude: number }
  let title = ''
  let description = ''

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('http://ipinfo.io/json')

      currentLocation.latitude = Number(data.loc.split(',')[0])
      currentLocation.longitude = Number(data.loc.split(',')[1])
      title = data.region
      description = `${data.city}, ${data.country}`

      setPosition({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
    })()

    for (let i = 0; i < states.length; i++) {
      let item = { label: states[i].name, value: states[i].name }
      allState.push(item)
    }
    setAllState(allState)
  }, [])

  const [position, setPosition] = useState<{
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  } | null>(null)

  const [allState, setAllState] = useState([] as { label: string; value: string }[])
  const [where, setWhere] = useState('')

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
          data={allState}
          search
          labelField="label"
          containerStyle={{ margin: 0, borderRadius: 10 }}
          itemContainerStyle={{ margin: 0 }}
          valueField="value"
          placeholder="Search here"
          searchPlaceholder="Search Cities"
          dropdownPosition="top"
          value={where}
          onChange={(item) => {
            setWhere(item.value)
          }}
          onFocus={() => {
            setWhere('')
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
