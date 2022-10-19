import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'

// import { Container } from './styles';

type IncrementProps = {
  title: string
  subTitle: string
  inputValue: number
  onChangeText: () => void
  Increment: () => void
  Decrement: () => void
}

const IncrementDecrementInputComponent: React.FC<IncrementProps> = (props) => {
  const { inputValue, onChangeText, subTitle, title, Increment, Decrement } = props
  return (
    <View style={{ flexDirection: 'row', padding: 27 }}>
      <View style={{ width: '55%' }}>
        <Text style={{ fontSize: 24, fontFamily: 'Corbel-Bold' }}>{title}</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Corbel' }}>{subTitle}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '15%' }}>
        <TouchableOpacity onPress={Decrement}>
          <Text
            style={{
              marginRight: 8,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 7,
              textAlign: 'center'
            }}
          >
            -
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            height: 35,
            backgroundColor: 'white',
            borderWidth: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopColor: '#DEE9FF',
            borderBottomColor: '#DEE9FF',
            borderLeftColor: '#DEE9FF',
            borderRightColor: '#DEE9FF',
            width: 60,
            textAlignVertical: 'center'
          }}
        >
          {inputValue.toString()}
        </Text>
        <TouchableOpacity onPress={Increment}>
          <Text
            style={{
              marginLeft: 8,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 5,
              textAlign: 'center'
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default IncrementDecrementInputComponent
