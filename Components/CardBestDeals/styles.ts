import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1
  },
  scrollview: {
    marginBottom: 25
  },
  containerCard: {
    paddingRight: 10
  },
  imgCard: {
    borderRadius: 10,
    height: 256,
    width: 256
  },
  title: {
    fontSize: 24,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    color: '#05233A',
    padding: 5
  },
  text: {
    padding: 5,
    fontSize: 16,
    fontFamily: 'Corbel',
    fontWeight: 'bold'
  },
  textTown: {
    padding: 5,
    fontSize: 16,
    fontFamily: 'Corbel',
    fontWeight: 'bold'
  },
  textCountry: {
    padding: 5,
    fontSize: 16,
    fontFamily: 'Corbel'
  }
})

export default styles
