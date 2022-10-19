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
    // textAlign: 'center',
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
  },
  dropdown: {
    width: '22%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#4A5CAE',
    color: '#fff',
    paddingTop: 0,
    paddingBottom: 5
  },
  buttonText: {
    color: '#fff'
  },
  phone: {
    flexDirection: 'row',
    paddingLeft: 0
  },
  ddi: {
    width: '12%',
    borderRadius: 0,
    paddingRight: 0
  },
  inputPhone: {
    width: '66%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },

  imgSquare: {
    backgroundColor: '#4A5CAE',
    padding: 20,
    borderRadius: 16
  },
  imgLoaded: {
    width: 70,
    height: 70
  }
})

export default styles
