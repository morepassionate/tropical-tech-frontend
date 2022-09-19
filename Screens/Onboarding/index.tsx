import React, { useEffect, useState } from 'react'
import { View, Text, Image, Modal, StyleSheet } from 'react-native'
import { useRecoilState, useSetRecoilState } from 'recoil'
import FirstAccess from '../../assets/atoms/FirstAccess'
import LightButton from '../../Components/LightButton'
import COLORS from '../../Constants/styles'

// import { Container } from './styles';

const Onboarding = ({ navigation }: any) => {
  const [modalBook, setModalBook] = useState(false)
  const [modalCashback, setModalCashback] = useState(false)
  const [pagination, setPagination] = useState(1)
  const setFirstAccess = useSetRecoilState(FirstAccess)

  useEffect(() => {
    setTimeout(() => {
      setModalBook(true)
    }, 500)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Image source={require('../../assets/img/uhr-logo-blue.png')} />
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalBook}
        onRequestClose={() => setModalBook(false)}
        style={styles.modal}
      >
        <>
          <View style={{ flex: 0.8 }}></View>
          <View style={styles.modalBook}>
            <Text style={styles.title}>Book Travel</Text>
            <Text style={styles.text}>
              UHR app allows you to search and book your next travel accommodation.
            </Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.skip}>
                <LightButton
                  text="Skip"
                  textStyle={styles.textSkip}
                  style={styles.skipButton}
                  onPress={() => {
                    setModalBook(false)
                    setFirstAccess({ isFirstAccess: false })
                  }}
                />
              </View>
              <View style={styles.skip}>
                <LightButton
                  text=">"
                  style={styles.chevron}
                  textStyle={styles.chevronText}
                  onPress={() => {
                    setModalBook(false)
                    setModalCashback(true)
                    setPagination(2)
                  }}
                />
              </View>
            </View>
            <View style={styles.dotsContainer}>
              <View style={[styles.dots, pagination === 1 ? { opacity: 1 } : { opacity: 0.3 }]} />
              <View style={[styles.dots, pagination === 2 ? { opacity: 1 } : { opacity: 0.3 }]} />
            </View>
          </View>
        </>
      </Modal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalCashback}
        onRequestClose={() => setModalCashback(false)}
        style={styles.modal}
      >
        <>
          <View style={{ flex: 0.8 }}></View>
          <View style={styles.modalBook}>
            <Text style={styles.title}>Earn Cashback</Text>
            <Text style={styles.text}>
              Sign up for an account today and earn discounts & cashback even when you spend.{' '}
            </Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.skipCashback}>
                <LightButton
                  text=">"
                  style={styles.chevron}
                  textStyle={styles.chevronText}
                  onPress={() => {
                    setFirstAccess({ isFirstAccess: false })
                    setModalCashback(false)
                  }}
                />
              </View>
            </View>
            <View style={styles.dotsContainer}>
              <View style={[styles.dots, pagination === 1 ? { opacity: 1 } : { opacity: 0.3 }]} />
              <View style={[styles.dots, pagination === 2 ? { opacity: 1 } : { opacity: 0.3 }]} />
            </View>
          </View>
        </>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    elevation: 5
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
  welcome: {
    marginBottom: 50,
    color: COLORS.primary,
    fontFamily: 'Corbel-Bold',
    fontSize: 32
  },
  modalBook: {
    flex: 0.5,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 40
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  skip: {
    width: '50%',
    alignItems: 'flex-end'
  },
  skipCashback: {
    width: '100%'
  },
  textSkip: {
    paddingHorizontal: 50
  },
  skipButton: {
    borderRadius: 20,
    left: 40
  },
  chevron: {
    alignSelf: 'flex-end',
    marginRight: 10,
    borderRadius: 30
  },
  chevronText: {
    paddingHorizontal: 12,
    fontSize: 30,
    bottom: 2,
    color: COLORS.primary,
    fontFamily: 'Corbel-Bold'
  },
  title: {
    fontFamily: 'Corbel-Bold',
    fontSize: 32,
    color: COLORS.primary
  },
  text: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dots: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    marginHorizontal: 3
  }
})

export default Onboarding
