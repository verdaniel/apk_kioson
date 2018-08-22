import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import styles from './Styles/HeaderNavBarStyle'
import { Images, Colors } from '../Themes/index'
import { ratioHeight } from '../Transforms/Resize'
import RNRestart from 'react-native-restart'
import FCM from 'react-native-fcm'

export default class HeaderNavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      mode: ''
    }
  }

  async componentDidMount () {
    const mode = await AsyncStorage.getItem('devmode')
    this.setState({
      mode: mode
    })
  }

  toDev () {
    const { count, mode } = this.state
    if (count + 1 === 5) {
      if (mode === 'dev') {
        AsyncStorage.setItem('devmode', 'production')
        FCM.removeAllDeliveredNotifications()
      } else {
        AsyncStorage.setItem('devmode', 'dev')
      }
      this.setState({
        count: 0
      })
      RNRestart.Restart()
    } else {
      this.setState({
        count: count + 1
      })
    }
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={[styles.viewRow, { backgroundColor: Colors.white_two, height: ratioHeight(50) }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.toDev()}>
          <Image
            style={styles.imgLogo}
            source={Images.logoKioson}
            resizeMode={'contain'}
            />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnTanya}
          onPress={() => navigation.navigate('Help')}>
          <Image
            style={styles.imgTanya}
            source={Images.ic_tanya}
            resizeMode={'contain'} />
        </TouchableOpacity>
      </View>
    )
  }
}
