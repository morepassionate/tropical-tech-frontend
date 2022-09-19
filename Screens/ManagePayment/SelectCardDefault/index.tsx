import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import UserData from '../../../assets/atoms/UserData'
import BankCardIcon from '../../../assets/icons/BankCard'
import MasterCardIcon from '../../../assets/icons/MasterCard'
import Switch from '../../../Components/Switch'
import COLORS from '../../../Constants/styles'

// import { Container } from './styles';

const SelectCardDefault = ({ navigation, route }: { navigation: any; route: any }) => {
  const [userData, setUserData] = useRecoilState(UserData)
  const [defaultValue, setDefaultValue] = useState(false)
  const cardId = route.params?.cardId
  return (
    <View style={styles.container}>
      <IconButton
        icon={'chevron-left'}
        size={28}
        color={'#1B4298'}
        style={styles.chevronLeft}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>{`Card ${userData?.creditCard[cardId].cardNumber.slice(
        15,
        19
      )}`}</Text>

      <View style={styles.cardDetailContainer}>
        {/* CardIcon */}
        <MasterCardIcon />
        {/* CARDICON */}
        <View>
          <Text style={styles.text}>{`Card ${userData?.creditCard[cardId].cardNumber.slice(
            15,
            19
          )}`}</Text>
          <Text style={styles.text}>{`${userData?.creditCard[cardId].expiry}`}</Text>
        </View>
      </View>

      <View style={styles.setDefault}>
        <Text style={styles.defaultText}>Set as default</Text>
        <Switch
          onPress={() => {
            setDefaultValue(!defaultValue)
          }}
          isSelected={defaultValue}
        />
      </View>
      <TouchableOpacity style={{ marginTop: 40 }}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chevronLeft: {
    margin: 0,
    opacity: 0.5,
    marginTop: 30,
    marginBottom: 10
  },
  container: {
    marginHorizontal: 22
  },
  title: {
    fontSize: 32,
    fontFamily: 'Corbel-Bold',
    marginBottom: 70
  },
  text: {
    fontSize: 16,
    fontFamily: 'Corbel',
    marginLeft: 10
  },
  delete: {
    fontFamily: 'Corbel',
    fontSize: 16,
    color: COLORS.primary
  },
  setDefault: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#506F9D',
    borderBottomColor: '#506F9D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  defaultText: {
    fontFamily: 'Corbel-Bold',
    fontSize: 16,
    paddingVertical: 12
  }
})

export default SelectCardDefault
