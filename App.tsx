//import { AppLoading } from 'expo';
import React from 'react'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import Navigation from './Navigation'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { RecoilRoot } from 'recoil'
import AppLoading from 'expo-app-loading'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

const App = (props) => {
  const [fontsLoaded] = useFonts({
    'Corbel-Bold': require('./assets/fonts/corbel-bold.ttf'),
    'Corbel-Italic': require('./assets/fonts/corbeli.ttf'),
    Corbel: require('./assets/fonts/corbel.ttf')
  })

  const theme = {
    ...DefaultTheme
  }

  if (!fontsLoaded) {
    return <AppLoading />
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
