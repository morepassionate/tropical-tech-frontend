import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Image, View } from 'react-native'
import styles from '../assets/css/index'
import {
  ForgotPassword,
  Home,
  LoginOption,
  LoginPasscode,
  LoginTouch,
  Signin,
  Signup,
  SignupComplete,
  SignupStep1,
  SignupStep2,
  SignupStep3,
  SignupStep4,
  VerificationCode,
  Welcome
} from '../views'
import Offers from '../Screens/Offers'
import HotelDetails from '../Screens/HotelDetails'
import ConfirmPayment from '../Screens/ConfirmPayment'
import ReservationAccepted from '../Screens/ReservationAccepted'
import Trips from '../Screens/Trips'
import Account from '../Screens/Account'
import Credits from '../Screens/Credits'
import ManagePayment from '../Screens/ManagePayment'
import PayWith from '../Screens/ManagePayment/PayWith'
import CardDetails from '../Screens/ManagePayment/CardDetails'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import COLORS from '../Constants/styles'
import { IconButton } from 'react-native-paper'
import Saved from '../Screens/Saved'
import Onboarding from '../Screens/Onboarding'
import { useRecoilValue } from 'recoil'
import FirstAccess from '../assets/atoms/FirstAccess'
import Maps from '../Screens/Maps'
import SelectCardDefault from '../Screens/ManagePayment/SelectCardDefault'

// import { Container } from './styles';
const Stack = createNativeStackNavigator()
const HomeNavigator = createMaterialTopTabNavigator()
const HomeTabScreen = () => {
  return (
    <>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/img/logo.png')} style={styles.logo} />
      </View>
      <HomeNavigator.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarPressColor: COLORS.primary,
          swipeEnabled: false,
          tabBarIcon: ({ focused }) => {
            let iconName = ''

            if (route.name === 'Home') {
              iconName = 'home-outline'
            } else if (route.name === 'Offers') {
              iconName = 'tag-outline'
            } else if (route.name === 'Trips') {
              iconName = 'wallet-travel'
            } else if (route.name === 'Saved') {
              iconName = 'star-outline'
            } else if (route.name === 'Account') {
              iconName = 'wallet-outline'
            }

            return (
              <View style={{ alignItems: 'center' }}>
                {focused && <View style={styles.headerRedCircle}></View>}
                <IconButton icon={iconName} color={'white'} style={{ marginTop: 0 }} />
              </View>
            )
          },

          tabBarActiveTintColor: COLORS.error,
          tabBarInactiveTintColor: COLORS.primary,
          tabBarContentContainerStyle: {
            justifyContent: 'center'
          },
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            width: '100%',
            height: 100
          },
          tabBarIconStyle: { marginLeft: 0 },
          tabBarShowLabel: true,
          tabBarLabelStyle: { color: 'white', width: '100%' },
          tabBarIndicatorStyle: { width: 0 },
          tabBarItemStyle: {
            width: '150%',
            marginLeft: 0,
            alignSelf: 'center'
          }
        })}
      >
        <HomeNavigator.Screen name="Home" component={Home} />
        <HomeNavigator.Screen name="Offers" component={OffersFlow} />
        <HomeNavigator.Screen name="Trips" component={Trips} />
        <HomeNavigator.Screen name="Saved" component={Saved} />
        <HomeNavigator.Screen name="Account" component={AccountFlow} />
      </HomeNavigator.Navigator>
    </>
  )
}

const OffersFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Offer" component={Offers} />
      <Stack.Screen name="HotelDetails" component={HotelDetails} />
      <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
      <Stack.Screen name="ReservationAccepted" component={ReservationAccepted} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  )
}

const AccountFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Account} />
      <Stack.Screen name="ManagePayment" component={ManagePayment} />
      <Stack.Screen name="Credits" component={Credits} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen name="PayWith" component={PayWith} />
      <Stack.Screen name="SelectCardDefault" component={SelectCardDefault} />
    </Stack.Navigator>
  )
}

const LoginFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="LoginPasscode" component={LoginPasscode} />
      <Stack.Screen name="LoginTouch" component={LoginTouch} />
      <Stack.Screen name="LoginOption" component={LoginOption} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupStep1" component={SignupStep1} />
      <Stack.Screen name="SignupStep2" component={SignupStep2} />
      <Stack.Screen name="SignupStep3" component={SignupStep3} />
      <Stack.Screen name="SignupStep4" component={SignupStep4} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="SignupComplete" component={SignupComplete} />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  const firstAccess = useRecoilValue(FirstAccess)

  if (firstAccess?.isFirstAccess) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeNav" component={HomeTabScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginRegisterFlow" component={LoginFlow} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Navigation
