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
    zIndex: 2
  },
  hotelNameContainer: {
    alignSelf: 'center',
    width: '70%',
    backgroundColor: COLORS.primary,
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    height: 62,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgContainer: {
    maxHeight: 300
  },
  name: {
    fontSize: 24,
    fontFamily: 'Corbel',
    color: 'white'
  },
  city: {
    fontSize: 16,
    fontFamily: 'Corbel',
    color: COLORS.DarkFont
  },
  rowContent: {
    flexDirection: 'row'
  },
  pinCashback: {
    backgroundColor: COLORS.orange,
    width: 115,
    marginTop: 5,
    borderRadius: 10,
    height: 20
  },
  pinText: {
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center'
  },
  value: {
    fontSize: 32,
    fontFamily: 'Corbel'
  },
  person: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Corbel',
    alignSelf: 'flex-end',
    marginLeft: 8,
    paddingBottom: 5
  },
  ratings: {
    backgroundColor: COLORS.blue,
    color: 'white',
    fontFamily: 'Corbel',
    fontSize: 16,
    paddingBottom: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
    paddingTop: 4
  },
  line: {
    backgroundColor: COLORS.primary60,
    height: 1,
    width: '100%',
    opacity: 0.4
  },
  iconsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40
  },
  notMargin: {
    margin: 0
  },
  innerIconsContainer: {
    alignItems: 'center',
    paddingHorizontal: 15
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 25,
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 70
  },
  marginHorizontal: {
    marginHorizontal: 25
  },
  reviewsContent: {
    marginTop: 20,
    marginBottom: 35
  },
  font18: {
    fontSize: 18,
    fontFamily: 'Corbel',
    alignSelf: 'center'
  },
  font24: {
    fontFamily: 'Corbel',
    fontSize: 24
  },
  fullRefunds: {
    fontSize: 16,
    fontFamily: 'Corbel',
    marginBottom: 35
  },
  seeMoreButton: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 24,
    bottom: 5,
    height: 28,
    borderRadius: 12
  },
  seeMoreText: {
    lineHeight: 13,
    fontSize: 14,
    fontFamily: 'Corbel'
  },
  description: {
    fontSize: 16,
    fontFamily: 'Corbel',
    color: COLORS.primary,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12
  },
  galleryText: {
    fontSize: 16,
    fontFamily: 'Corbel',
    color: COLORS.primary
  },
  flexImgs: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 40,
    alignContent: 'space-between'
  },
  imgs: {
    width: 88,
    height: 72,
    borderRadius: 12,
    margin: 8
  }
})

export default styles
