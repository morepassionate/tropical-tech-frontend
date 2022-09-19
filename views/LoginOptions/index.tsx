import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import styles from './styles'

const LoginOption = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome</Text>
        <Image style={styles.logo} source={require('../../assets/img/logo-login.png')} />
      </View>
      <View style={styles.buttons}>
        <LinearGradient
          style={styles.btnSignup}
          colors={['#DEE9FF', '#1B4298']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
        >
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => props.navigation.navigate('LoginPasscode')}
          >
            <Text style={styles.signupButtonText}>Log in with passcode</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          style={styles.btnSignup}
          colors={['#DEE9FF', '#1B4298']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.2 }}
        >
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => props.navigation.navigate('LoginTouch')}
          >
            <Text style={styles.signupButtonText}>Login with touch</Text>
          </TouchableOpacity>
        </LinearGradient>
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

export default LoginOption
