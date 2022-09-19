/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
const bg = require('../../assets/img/splash.png')
import styles from './styles'

const Welcome = (props: any) => {
  return (
    <ImageBackground style={styles.container} source={bg}>
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Signup')}>
          <Text style={styles.txtBtn}>Get started</Text>
        </TouchableOpacity>
        <View style={styles.containerBtn}>
          <Text style={styles.txtAccount}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.linkLogin}
            onPress={() => props.navigation.navigate('Signin')}
          >
            <Text style={styles.txtLogin}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Welcome
