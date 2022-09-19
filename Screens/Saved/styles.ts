import { StyleSheet } from 'react-native'
import COLORS from '../../Constants/styles'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    // resizeMode: 'cover',
    height: 'auto',
    padding: 20
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
  menuText: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
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
  carouselItemPopular: {
    marginLeft: 10,
    marginRight: 25,
    flexDirection: 'row'
  },
  imgHotelPopular: {
    width: 65,
    height: 65,
    borderRadius: 10
  },
  popularHotelTitle: {
    fontSize: 18,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginLeft: 5
  },
  popularHotelText: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 15
  }
})

export default styles
