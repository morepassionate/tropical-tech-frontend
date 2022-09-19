import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import BankCardIcon from '../../../assets/icons/BankCard'
import PaypalIcon from '../../../assets/icons/Paypal'
import COLORS from '../../../Constants/styles'

// import { Container } from './styles';

const PayWith = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <View style={styles.container}>
        <IconButton
          style={styles.close}
          icon={'close'}
          size={24}
          color={'#8296CA'}
          onPress={() => navigation.navigate('Profile')}
        />
        <Text style={styles.title}>Pay with</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CardDetails')}>
          <View style={styles.innerButton}>
            <BankCardIcon />
            <Text style={styles.text16}>Credit or debit card</Text>
          </View>
          <IconButton icon={'chevron-right'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CardDetails')}>
          <View style={styles.innerButton}>
            <PaypalIcon />
            <Text style={styles.text16}>Paypal</Text>
          </View>
          <IconButton icon={'chevron-right'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    marginHorizontal: 22
  },
  close: {
    alignSelf: 'flex-end',
    margin: 0
  },
  notMargin: {
    margin: 0
  },
  title: {
    fontSize: 32,
    fontFamily: 'Corbel-Bold',
    marginBottom: 40
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingBottom: 15
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text16: {
    fontFamily: 'Corbel',
    fontSize: 16,
    marginLeft: 10
  }
})

export default PayWith
