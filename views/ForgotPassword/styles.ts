import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  containerHeader: {
    marginBottom: 30
  },

  containerMessage: {
    alignItems: 'center'
  },
  imgLock: {
    width: '100%',
    height: '100%'
  },
  title: {
    textAlign: 'center',
    color: '#1B4298',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    marginBottom: 50
  },
  logo: {
    width: 140
  },

  texto: {
    width: 320,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Corbel',
    lineHeight: 18,
    marginBottom: 30
  },
  containerInput: {
    width: '100%'
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#DEE9FF',
    borderRadius: 15,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    //shadowBlur: 4,
    elevation: 5,
    padding: 15
  },
  resetButton: {
    padding: 12,
    backgroundColor: '#C3606E',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Corbel'
  },
  footer: {
    marginTop: 30
  },
  textFooter: {
    color: '#1B4298',
    fontSize: 14,
    fontFamily: 'Corbel',
    textDecorationLine: 'underline'
  }
})

export default styles
