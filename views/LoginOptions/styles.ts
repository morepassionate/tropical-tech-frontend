import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    textAlign: 'center',
    color: '#1B4298',
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Corbel'
  },
  logo: {
    width: 200
  },
  buttons: {
    top: 150,
    width: '100%'
  },
  loginButton: {
    opacity: 5
  },
  btnSignup: {
    marginTop: 10,
    padding: 5,
    opacity: 5,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15
  },

  signupButtonText: {
    textAlign: 'center',
    color: '#1B4298',
    fontSize: 18,
    fontFamily: 'Corbel',
    fontWeight: '500'
  },
  signupButton: {}
})

export default styles
