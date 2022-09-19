import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { IconButton, TextInput } from 'react-native-paper'

// import { Container } from './styles';

const Maps = ({ navigation }: { navigation: any }) => {
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', zIndex: 2, width: '90%', marginLeft: '85%' }}>
        <IconButton icon={'close'} size={20} color={'black'} onPress={() => navigation.goBack()} />
      </View>
      <View style={{ position: 'absolute', zIndex: 2, width: '90%', marginLeft: '5%', top: 30 }}>
        <TextInput
          mode={'flat'}
          underlineColor={'transparent'}
          activeUnderlineColor={'transparent'}
          outlineColor={'transparent'}
          activeOutlineColor={'transparent'}
          placeholder={'Search here'}
          placeholderTextColor={'black'}
          style={styles.inputSearch}
          value={''}
          onChangeText={() => {
            return
          }}
          theme={{
            fonts: {
              light: {
                fontFamily: 'Corbel'
              },
              medium: {
                fontFamily: 'Corbel'
              },
              regular: {
                fontFamily: 'Corbel'
              },
              thin: {
                fontFamily: 'Corbel'
              }
            }
          }}
        />
      </View>
      <MapView
        style={{ height: '55%', width: '100%', marginBottom: 15 }}
        region={position}
        onPress={(e) =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }
      >
        <Marker
          coordinate={position}
          title={'Marcador'}
          description={'Testando o marcador no mapa'}
        />
      </MapView>
      <View style={{ height: '50%', backgroundColor: 'white' }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputSearch: {
    height: 40,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 16,
    marginVertical: 7,
    fontFamily: 'Corbel',
    paddingLeft: 20
  }
})
export default Maps
