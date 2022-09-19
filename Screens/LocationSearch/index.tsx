import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import LocationIcon from '../../assets/icons/Location'
import COLORS from '../../Constants/styles'
import styles from './styles'

const LocationSearch = ({ navigation }: any) => {
  return (
    <View style={styles.allPage}>
      <View style={styles.container}>
        <IconButton icon={'close'} size={24} color={COLORS.primary80} style={styles.closeStyle} />
        <Text style={styles.goingText}>Where are you going?</Text>
        <TextInput
          mode={'flat'}
          style={styles.inputStyle}
          activeUnderlineColor={'transparent'}
          underlineColor={'transparent'}
          placeholder={'Search for destination'}
          placeholderTextColor={'#979FA9'}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.text18}>Not sure where to go?</Text>
          <View style={styles.buttonOptions}>
            <TouchableOpacity style={styles.rowContent}>
              <View style={styles.box}>
                <LocationIcon />
              </View>
              <Text style={styles.text16}>Everywhere</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowContent}>
              <View style={styles.box}>
                <LocationIcon />
              </View>
              <Text style={styles.text16}>Most popular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowContent}>
              <View style={styles.box}>
                <LocationIcon />
              </View>
              <Text style={styles.text16}>Best deals</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          icon={{ source: 'magnify', direction: 'ltr', width: 15, height: 15 }}
          labelStyle={styles.labelButtonStyle}
          style={styles.buttonStyle}
        >
          Search
        </Button>
      </View>
    </View>
  )
}

export default LocationSearch
