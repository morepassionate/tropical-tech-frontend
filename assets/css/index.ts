import { StyleSheet } from 'react-native'
import COLORS from '../../Constants/styles'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLogo: {
    backgroundColor: COLORS.primary
  },
  logo: {
    marginTop: 30,
    marginBottom: 0,
    width: 90,
    alignSelf: 'center'
  },
  margin_0: {
    margin: 0
  },
  headerRedCircle: {
    marginTop: -11,
    width: 11,
    height: 11,
    backgroundColor: COLORS.lightRed,
    borderRadius: 6
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    marginLeft: -30
  },
  headerText: {
    color: 'white',
    fontFamily: 'Corbel',
    fontWeight: '300',
    marginTop: 5
  },
  listIcon: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20
  }
})

export default styles
