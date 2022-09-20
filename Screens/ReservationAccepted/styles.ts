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
    marginHorizontal: 20
  },
  corbel: {
    fontFamily: 'Corbel',
    fontSize: 16,
    lineHeight: 19
  },
  title: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: 'bold',
    marginBottom: 10
  },
  rowContentLined: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary90
  },
  navContainer: {
    flexDirection: 'row',
    marginLeft: -30,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10
  },
  point: {
    fontSize: 20,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    lineHeight: 15
  },
  leftBorder: {
    width: '50%',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primary90
  },
  h1: {
    fontSize: 32,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginTop: 30,
    lineHeight: 39
  },
  reservation: {
    fontSize: 24,
    marginTop: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  startEnd: {
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 7
  }
})

export default styles
