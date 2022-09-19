import { StyleSheet } from 'react-native'
import theme from '../../Constants/styles'

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    backgroundColor: theme.white
  },
  closeStyle: {
    alignSelf: 'flex-end',
    marginTop: 40
  },
  goingText: {
    fontFamily: 'Corbel',
    fontSize: 24,
    marginBottom: 17
  },
  container: {
    marginHorizontal: 22
  },
  inputStyle: {
    height: 43,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: theme.primary70,
    textAlign: 'center'
  },
  innerContainer: {
    marginLeft: 26
  },
  rowContent: {
    flexDirection: 'row'
  },
  text18: {
    fontFamily: 'Corbel',
    color: theme.primary90,
    fontSize: 18,
    marginTop: 25
  },
  text16: {
    fontFamily: 'Corbel',
    fontSize: 16,
    marginLeft: 18,
    top: 15
  },
  buttonOptions: {
    marginTop: 19
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: theme.primary,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
    justifyContent: 'center'
  },
  buttonStyle: {
    elevation: 4,
    width: 163,
    height: 45,
    justifyContent: 'center',
    backgroundColor: theme.white,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 70
  },
  labelButtonStyle: {
    color: theme.primary,
    fontSize: 16,
    fontFamily: 'Corbel',
    textTransform: 'capitalize'
  }
})

export default styles
