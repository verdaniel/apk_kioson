import { Component } from 'react'
import { PermissionsAndroid, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'

// Actions
import profileActions from '../Redux/ProfileRedux'
import loginAction from '../Redux/UserLoginRedux'
import bannerActions from '../Redux/BannerRedux'

// Styles
// import styles from './Styles/SplashStyle'

class Splash extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  componentWillMount () {
    // this.checkLocationAndroid()
    setTimeout(() => {
      SplashScreen.show()
    }, 1)
    this.props.getBanner()
  }

  checkLocationAndroid () {
    PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION').then(response => {
      if (!response) {
        this.requestLocationPermission()
      } else {
        console.tron.log('Location permission granted')
      }
    }).catch((err) => console.tron.warn(err))
  }

  hideSplash (route, data) {
    AsyncStorage.getItem('token').then((value) => {
      setTimeout(() => {
        if (value === null || value === undefined || value === '') {
          SplashScreen.hide()
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: route })
            ]
          })
          this.props.navigation.dispatch(resetAction)
        } else {
          SplashScreen.hide()
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              // NavigationActions.navigate({routeName: 'HistoryTransaction'})
              NavigationActions.navigate({ routeName: 'BottomNav' })
            ]
          })
          this.props.setLogin(true)
          this.props.getBalance(value)
          this.props.navigation.dispatch(resetAction)
          // AsyncStorage.removeItem('pinNumber')
          // AsyncStorage.setItem('pinStatus', JSON.stringify(false))
        }
      }, 2000)
    })
  }

  async _updateList () {
    const value = await AsyncStorage.getItem('@firstLaunch:key')
    if (value === null || value === undefined || value === '') {
      this.hideSplash('OnBoarding')
    } else {
      this.hideSplash('GateScreen')
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this._updateList()
    }, 1000)
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.tron.log('Permission Granted')
      } else {
        console.tron.log('Permission Denied')
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  requestContact = async () => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.tron.log('Read contact permission granted')
      } else {
        console.tron.log('Read contact permission denied')
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (token) => dispatch(profileActions.getBalanceRequest(token)),
    getBanner: () => dispatch(bannerActions.bannerRequest()),
    setLogin: (param) => dispatch(loginAction.isLogin(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
