import { StyleSheet } from 'react-native'
import theme, { COLORS } from '../../Constants/styles'

const styles = StyleSheet.create({
  imgHotel: {
    width: 265,
    height: 265,
    borderRadius: 10
  },
  carouselItem: {
    borderRadius: 10
  },
  covidAlert: {
    marginHorizontal: 37,
    marginTop: 40,
    fontFamily: 'Corbel',
    fontSize: 16
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Corbel'
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
  },
  point: {
    fontSize: 24,
    lineHeight: 15,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    marginHorizontal: 8
  },
  notMargin: {
    margin: 0
  },
  navContainer: {
    height: 100,
    alignItems: 'center'
  },
  borderNav: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: COLORS.primary,
    height: 40,
    width: '100%',
    position: 'absolute'
  },
  filterBlueContainer: {
    width: '80%',
    backgroundColor: COLORS.blue,
    height: 50,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    top: 4,
    zIndex: 0,
    elevation: 5
  },
  normalText: {
    fontFamily: 'Corbel',
    fontSize: 16
  },
  filterWhiteContainer: {
    width: '80%',
    backgroundColor: 'white',
    height: 50,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    position: 'absolute',
    marginTop: 50,
    elevation: 5
  },
  filterButtons: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sortText: {
    marginLeft: 10,
    fontFamily: 'Corbel',
    fontSize: 16,
    color: COLORS.blue,
    bottom: 2
  },
  searchText: {
    paddingTop: 2,
    fontFamily: 'Corbel',
    fontSize: 16,
    color: 'white'
  },
  filterIconText: {
    marginLeft: 10,
    fontFamily: 'Corbel',
    fontSize: 16,
    color: COLORS.blue,
    bottom: 2
  },
  locationText: {
    marginLeft: 8,
    fontFamily: 'Corbel',
    fontSize: 16,
    color: COLORS.blue
  },
  innerFilterContainer: {
    width: '70%',
    backgroundColor: COLORS.primary70,
    height: 35,
    position: 'absolute',
    top: 30,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5
  },
  filterTexts: {
    flexDirection: 'row',
    marginLeft: 16,
    justifyContent: 'center'
  },
  loadMore: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 55
  },
  marginHorizontal15: {
    marginHorizontal: '1.5%'
  },
  mostPopularContainer: {
    marginHorizontal: 8,
    marginBottom: 50,
    marginTop: 30
  },
  mostPopularText: {
    fontFamily: 'Corbel',
    fontSize: 24,
    marginLeft: 16,
    marginBottom: 7
  },
  destinationIdeasContainer: {
    marginHorizontal: 16,
    marginBottom: 55
  },
  destinationIdeasText: {
    marginTop: 60,
    fontFamily: 'Corbel',
    fontSize: 24,
    marginLeft: 8
  },
  bestDealsContainer: {
    marginHorizontal: 16,
    marginBottom: 55
  },
  bestDealsText: {
    marginTop: 60,
    fontFamily: 'Corbel',
    fontSize: 24,
    marginLeft: 8
  },
  modalSearch: {
    elevation: 4,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    marginTop: 10
  },
  inputSearch: {
    height: 43,
    textAlign: 'center',
    backgroundColor: '#DEE9FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 16,
    marginVertical: 7,
    fontFamily: 'Corbel'
  },
  modalSearchContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '70%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 22
  },
  text16: {
    fontFamily: 'Corbel',
    fontSize: 16
  },
  sortTexts: {
    marginVertical: 8
  }
})

export default styles
