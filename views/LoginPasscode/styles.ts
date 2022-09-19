import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  textLogin: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1B4298',
    fontFamily: 'Corbel'
  },

  img: {},

  loginMsg: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'red',
    marginTop: 10,
    marginBottom: 15,
    display: 'none'
  },
  loginLogomarca: {
    marginBottom: 10
  },
  loginForm: {
    width: '100%',
    marginBottom: 80
  },
  inputBottom: {},
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
  loginButton: {
    padding: 12,
    backgroundColor: '#1B4298',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff'
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
    //backgroundColor: 'rgba(27, 102, 253, 0.5)',
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
  }
})

export default styles
