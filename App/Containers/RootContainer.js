import React, { Component } from 'react'
import { View, StatusBar, AppState, AsyncStorage } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import FCM from 'react-native-fcm'
import { Colors } from '../Themes'

// Styles
import styles from './Styles/RootContainerStyles'
import SplashScreen from 'react-native-splash-screen'

class RootContainer extends Component {
  componentDidMount () {
    // if (!ReduxPersist.active) {
    //   this.props.startup()
    // }
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = async (nextAppState) => {
    SplashScreen.hide()
    const mode = await AsyncStorage.getItem('devmode')
    if (mode === 'dev') {
      // setting if apps in dev mode
      if (nextAppState.match(/background/)) {
        FCM.removeDeliveredNotification('devmode')
      } else if (nextAppState.match(/active/)) {
        FCM.presentLocalNotification({
          id: 'devmode',
          title: 'Developer Mode On',
          body: 'App in developer mode',
          sound: null,
          priority: 'high',
          ticker: 'My Notification Ticker',                   // Android only
          auto_cancel: false,
          icon: 'ic_launcher',
          color: Colors.slate_grey,
          vibrate: 300,
          ongoing: true,
          show_in_foreground: true
        })
      }
    } else {
      // setting if apps in dev production mode
    }
  }

  render () {
    console.disableYellowBox = true
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white_two} />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  // startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
