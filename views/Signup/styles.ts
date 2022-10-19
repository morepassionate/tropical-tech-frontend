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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#1B4298',
    fontFamily: 'Corbel'
  },

  loginLogomarca: {
    marginBottom: 10,
    alignItems: 'center'
  },
  img: {
    // textAlign: 'center'
  },
  inputBottom: {},
  loginForm: {
    width: '100%',
    marginBottom: 30
  },
  loginInput: {
    backgroundColor: '#fff',
    fontSize: 19,
    padding: 7,
    marginBottom: 15
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 30
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
    elevation: 5,
    padding: 15
  },

  text: {
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Corbel'
  },

  textSignup: {
    textDecorationLine: 'none',
    color: '#000',
    textAlign: 'center'
  },
  boxSignUp: {
    width: '100%'
  },
  btnSignup: {
    marginTop: 20,
    padding: 5,
    opacity: 5,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  textBtnSignup: {
    color: '#1B4298',
    fontSize: 18,
    textAlign: 'center'
  },
  skipBtn: {
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default styles
