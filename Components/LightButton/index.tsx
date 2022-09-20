import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'

// import { Container } from './styles';

type LightButtonProps = {
  text: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress: () => void
  colorsLinear?: string[]
}

const LightButton: React.FC<LightButtonProps> = (props) => {
  const { text, style, onPress, textStyle, colorsLinear } = props
  return (
    <LinearGradient
      colors={colorsLinear ?? ['#DEE9FF', 'rgba(27, 102, 253, 0.7)']}
      style={[styles.linearContainer, style]}
      onTouchStart={onPress}
    >
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearContainer: {
    padding: 0,
    alignItems: 'center',
    height: 43,
    justifyContent: 'center',
    borderRadius: 12
  },
  textStyle: {
    fontFamily: 'Corbel',
    fontSize: 16,
    color: '#4A5CAE',
    fontWeight: 'bold',
    lineHeight: 19,
    alignItems: 'center',
    textAlign: 'center'
  }
})

export default LightButton
