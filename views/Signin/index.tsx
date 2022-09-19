/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'
const logo = require('../../assets/img/logo-login.png')

const Signin = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome</Text>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.navigation.navigate('LoginOption')}
        >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <LinearGradient
          style={styles.btnSignup}
          colors={['rgba(27,102,253,0.5)', '#DEE9FF']}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => props.navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

export default Signin
