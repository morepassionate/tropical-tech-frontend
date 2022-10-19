import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  dropdown1RowStyle: {},
  inputBottom: {},

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

  loginForm: {
    width: '100%'
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
    marginTop: 50,
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

  subContainer: {
    width: '100%',
    marginBottom: 15
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#4A5CAE',
    color: '#fff',
    borderRadius: 15,
    height: 50,
    borderColor: '#4A5CAE',
    marginBottom: 15,
    paddingLeft: 25
  },
  buttonContainer: {
    color: '#fff'
  },
  optionStyle: {
    color: '#fff'
  },

  button: {
    borderRadius: 25,
    padding: 14,
    elevation: 2,
    width: 250,
    backgroundColor: '#1B4298',
    marginBottom: 20
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Corbel',
    fontSize: 18
  },
  imgSquare: {
    backgroundColor: '#4A5CAE',
    padding: 20,
    borderRadius: 16
  },
  imgLoaded: {
    width: 70,
    height: 70
  },
  containerUpload: {
    marginTop: 20
  },
  titleUpload: {
    fontSize: 18,
    color: '#1B4298',
    fontFamily: 'Corbel'
  },
  color: {
    color: 'white'
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF'
  },
  dropdown2RowTxtStyle: {
    color: '#444',
    textAlign: 'left'
  },
  dropdown1BtnTxtStyle: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 14
  }
})

export default styles
