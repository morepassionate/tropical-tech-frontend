import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  containerLogo: {
    position: 'absolute',
    top: 70
  },
  containerMessage: {
    position: 'relative',
    alignItems: 'center',
    top: 160
  },
  title: {
    textAlign: 'center',
    color: '#1B4298',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Corbel'
  },
  logo: {
    width: 140
  },

  texto: {
    width: 220,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Corbel'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%'
  },
  btnEmail: {
    padding: 5,
    opacity: 5,
    borderRadius: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  button: {
    opacity: 5
  },

  buttonText: {
    textAlign: 'center',
    color: '#1B4298',
    fontSize: 16,
    fontFamily: 'Corbel',
    fontWeight: '600'
  },
  iconTouch: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '#8da1cc',
    width: 193
  },
  circle: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    position: 'relative'
  },
  messageFlex: {
    position: 'absolute',
    top: 10,
    color: '#acc7fe',
    fontSize: 18,
    fontFamily: 'Corbel',
    display: 'flex'
  },
  messageNone: {
    position: 'relative',
    top: 0,
    marginTop: 10,
    color: '#acc7fe',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    display: 'none'
  },
  doneIconFlex: {
    display: 'flex'
  },
  doneIconNone: {
    position: 'relative',
    top: 0,
    marginTop: 10,
    display: 'none'
  }
})

export default styles
