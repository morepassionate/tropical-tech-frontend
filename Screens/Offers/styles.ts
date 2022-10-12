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
    fontSize: 16,
    lineHeight: 20
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
    width: 150,
    marginTop: 10
  },
  inputSearch: {
    color: COLORS.grey,
    fontFamily: 'Corbel',
    marginBottom: 15,
    backgroundColor: '#DEE9FF',
    borderRadius: 18,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
    textAlign: 'center'
  },
  modalSearchContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 370,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingHorizontal: 22
  },
  text16: {
    fontFamily: 'Corbel',
    fontSize: 16
  },
  sortTexts: {
    marginVertical: 8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(18, 52, 123, 0.8)'
  },
  modalView: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row'
  },
  modalHeaderContent: {
    flexGrow: 1
  },
  modalTitle: {
    marginBottom: 16,
    color: '#000',
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    alignSelf: 'flex-start'
  },
  inputBottom: {},
  inputModal: {
    width: 350,
    marginBottom: 20,
    backgroundColor: '#DEE9FF',
    borderRadius: 25,
    paddingBottom: 12,
    height: 43,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    padding: 15,
    textAlign: 'center',
    alignSelf: 'flex-start',
    fontFamily: 'Corbel'
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  inputSearchStyle: {
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  modalText: {
    marginBottom: 16,
    color: '#5163B0',
    fontSize: 16,
    fontFamily: 'Corbel',
    alignSelf: 'flex-start'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 25
  },
  textIcons: {
    color: '#05233A',
    marginLeft: 15,
    fontFamily: 'Corbel',
    fontSize: 16
  },
  loginWhereModalButton: {
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10,
    width: 163,
    marginLeft: 'auto',
    marginRight: 25
  },
  btnSearch: {
    marginTop: 30,
    textAlign: 'right',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
  loginButtonText: {
    fontSize: 16,
    color: '#1B4298',
    fontFamily: 'Corbel',
    fontWeight: 'bold'
  },
  modalViewTyping: {
    width: '100%',
    height: '85%',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: '7%',
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  calendarBtnSearch: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
    width: 150,
    marginLeft: 'auto'
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  monthCard: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#1B4298',
    paddingHorizontal: 20,
    paddingBottom: 5
  },
  monthText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Corbel',
    alignItems: 'center',
    textAlign: 'center',
    color: '#1B4298'
  }
})

export default styles
