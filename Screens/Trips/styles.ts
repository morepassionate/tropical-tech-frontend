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
  menu: {
    width: '70%',
    position: 'absolute',
    top: -30,
    zIndex: 2
  },
  rowNav: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  bordertop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  borderbottom: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  perfilImg: {
    width: 22,
    height: 22
  },
  imgContainer: {
    position: 'absolute',
    left: 24,
    borderWidth: 10,
    borderColor: COLORS.primary,
    borderRadius: 8
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  margin8: {
    marginHorizontal: 8
  },
  rowContent: {
    flexDirection: 'row'
  },
  completedMenu: {
    width: '50%'
  },
  cardTitle: {
    backgroundColor: '#B8D8EB',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  borderCard: {
    borderWidth: 1.75,
    borderColor: COLORS.primary,
    height: 205,
    width: '100%',
    borderRadius: 12
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    borderRadius: 10,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center'
  },
  rowContentLined: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.primary90,
    marginHorizontal: 0,
    marginTop: 20
  },
  startEnd: {
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginBottom: 7
  },
  leftBorder: {
    width: '45%',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primary90
  },
  corbel: {
    fontFamily: 'Corbel'
  }
})

export default styles
