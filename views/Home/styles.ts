import { StyleSheet } from 'react-native'
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from 'recoil'
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
  buttonStyle: {
    backgroundColor: 'white',
    marginHorizontal: '25%',
    borderRadius: 20,
    color: '#000',
    marginVertical: 6.5
  },
  search: {
    width: '100%'
  },
  loginForm: {
    width: '100%',
    marginTop: 20
  },
  loginInput: {
    backgroundColor: '#fff',
    fontSize: 19,
    padding: 7,
    marginBottom: 15
  },

  loginButton: {
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 10,
    width: 163,
    marginLeft: 'auto',
    marginRight: 'auto'
    // backgroundColor: '#fff',
    // marginHorizontal: '25%',
    // borderRadius: 20,
    // marginVertical: 6.5,
    // paddingVertical: 3.5
  },
  loginButtonText: {
    fontSize: 16,
    color: '#1B4298',
    fontFamily: 'Corbel',
    fontWeight: 'bold'
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
  input: {
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
  carouselItemPopular: {
    marginLeft: 10,
    marginRight: 25,
    borderRadius: 10,

    flexDirection: 'row'
  },
  imgHotelPopular: {
    width: 65,
    height: 65
  },
  carouselItem: {
    borderRadius: 10
  },
  imgHotel: {
    width: 265,
    height: 265
  },
  card: {
    marginTop: 30
  },

  containerHotels: {
    padding: 15
  },
  title: {
    fontSize: 24,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Corbel'
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
  modalView: {
    width: '100%',
    height: '80%',
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
  modalViewTyping: {
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
  modalTitle: {
    marginBottom: 16,
    color: '#000',
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Corbel',
    alignSelf: 'flex-start'
  },
  modalText: {
    marginBottom: 16,
    color: '#5163B0',
    fontSize: 16,
    fontFamily: 'Corbel',
    alignSelf: 'flex-start'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalHeaderCloseText: {
    fontSize: 20,
    color: '#8296CA',
    marginRight: 10
  },
  modalHeaderContent: {
    flexGrow: 1
  },
  modalHeader: {
    flexDirection: 'row'
  },
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
  btnSearch: {
    marginTop: 30,
    textAlign: 'right',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
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
    width: 163,
    marginLeft: 'auto'
  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: '#DEE9FF',
    padding: 5,
    borderRadius: 25
  },
  switch: {
    width: 150,
    height: 100
  },
  inputBottom: {}
})

export default styles
