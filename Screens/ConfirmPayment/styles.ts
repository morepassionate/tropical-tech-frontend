import { StyleSheet } from 'react-native'
import theme from '../../Constants/styles'
import COLORS from '../../Constants/styles'

const styles = StyleSheet.create({
  borderNav: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: COLORS.primary,
    height: 40,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 2
  },
  notMargin: {
    margin: 0
  },
  container: {
    marginHorizontal: 32
  },
  rowContainer: {
    flexDirection: 'row'
  },
  line: {
    height: 2,
    backgroundColor: COLORS.primary90
  },
  experiences: {
    marginTop: 24
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    marginTop: 5,
    borderRadius: 20,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    fontFamily: 'Corbel'
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 70,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Corbel',
    marginTop: 15,
    lineHeight: 29,
    fontWeight: 'bold'
  },
  boldText: {
    fontFamily: 'Corbel',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'bold'
  },
  info: {
    fontFamily: 'Corbel',
    fontSize: 16,
    lineHeight: 19
  },
  policy: {
    fontSize: 16,
    fontFamily: 'Corbel',
    marginTop: 24,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  vertical12: {
    marginVertical: 6
  },
  requiredCard: {
    marginLeft: 20,
    fontFamily: 'Corbel',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.error,
    textAlign: 'center'
  }
})

export default styles
