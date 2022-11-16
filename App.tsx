import React, { useEffect } from 'react'
import { View } from 'react-native'
import * as Font from 'expo-font'
import Navigation from './views/Navigation'
import Constants from 'expo-constants'
import { RecoilRoot } from 'recoil'
import * as SplashScreen from 'expo-splash-screen'
import { DefaultTheme } from 'react-native-paper'

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
