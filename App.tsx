import React, { useEffect } from 'react'
import { View } from 'react-native'
import * as Font from 'expo-font'
import Navigation from './Navigation'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { RecoilRoot } from 'recoil'
import AppLoading from 'expo-app-loading'
import * as SplashScreen from 'expo-splash-screen'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

// SplashScreen.preventAutoHideAsync()

const App = (props: any) => {
  const [fontsLoaded] = Font.useFonts({
    'Corbel-Bold': require('./assets/fonts/corbel-bold.ttf'),
    'Corbel-Italic': require('./assets/fonts/corbeli.ttf'),
    Corbel: require('./assets/fonts/corbel.ttf')
  })

  const theme = {
    ...DefaultTheme
  }

  useEffect(() => {
    ;(async () => {
      if (!fontsLoaded) SplashScreen.preventAutoHideAsync()
      else {
        await SplashScreen.hideAsync()
      }
    })()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <>
        {/* <StatusBar style="auto" /> */}
        <View style={{ marginTop: Constants.statusBarHeight }} />
        <RecoilRoot>
          <Navigation />
        </RecoilRoot>
      </>
    )
  }
}

export default App
