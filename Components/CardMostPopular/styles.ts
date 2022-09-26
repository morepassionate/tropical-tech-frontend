import { StyleSheet } from 'react-native'
import COLORS from '../../Constants/styles'

const styles = StyleSheet.create({
  coverImage: {
    height: '49%',
    width: '49%',
    borderRadius: 12,
    marginHorizontal: '1%',
    marginTop: '1%'
  },
  moreBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.primary80,
    opacity: 0.9,
    zIndex: 2,
    alignItems: 'center'
  },
  container: {
    padding: 5
  },
  scrollview: {
    marginBottom: 25
  },

  containerCard: {
    marginRight: 10,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 220
  },
  imgCard: {
    borderRadius: 10,
    height: 65,
    width: 65
  },
  circle: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    position: 'relative'
  },
  progress: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Corbel',
    fontWeight: 'bold',
    color: '#05233A',
    padding: 5
  },
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 35,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 22,
    color: '#05233A',
    fontWeight: 'bold',
    flex: 1,
    fontFamily: 'Corbel',
    width: 170
  },
  subtext: {
    padding: 5,
    fontSize: 14,
    lineHeight: 17,
    color: '#05233A',
    flex: 1,
    fontWeight: 'normal',
    fontFamily: 'Corbel',
    width: 170
  }
})

export default styles
