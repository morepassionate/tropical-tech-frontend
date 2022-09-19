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
    marginHorizontal: 18
  },
  corbel: {
    fontFamily: 'Corbel'
  },
  title: {
    fontSize: 24,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
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
    marginTop: 30
  },
  reservation: {
    fontSize: 24,
    marginTop: 26,
    marginBottom: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  startEnd: {
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginBottom: 7
  }
})

export default styles
