import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import COLORS from '../../Constants/styles'

type SwitchProps = {
  onPress?: () => void
  title?: string
  isSelected?: boolean
  icon?: string
  isNotSubtitle?: boolean
  style?: StyleProp<ViewStyle>
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { onPress, title, isSelected, icon, style } = props

  return (
    <View style={style}>
      {isSelected ? (
        <>
          <TouchableOpacity onPress={onPress} style={styles.buttonActive}>
            <View style={styles.containerIconActive}>
              <Icon name={'check'} size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.containerIcon}>
              <Icon name={'close'} size={24} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default Switch

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 37,
    backgroundColor: '#DEE9FF',
    marginTop: 8,
    // marginLeft: 16,
    borderRadius: 20
  },

  containerIcon: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },

  containerIconActive: {
    backgroundColor: '#1B4298',
    width: 40,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },

  buttonActive: {
    width: 60,
    height: 37,
    backgroundColor: '#DEE9FF',
    marginTop: 8,
    // marginLeft: 16,
    borderRadius: 20,
    alignItems: 'flex-end'
  },

  title: {
    fontFamily: 'Corbel-Bold',
    fontSize: 14,
    color: 'black',
    marginLeft: -4
  },

  description: {
    fontFamily: 'Corbel',
    fontSize: 10,
    color: 'black',
    // marginLeft: 16,
    marginTop: 8
  }
})
