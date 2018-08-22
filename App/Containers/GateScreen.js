import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation'
import I18n from '../I18n'

// Styles
import styles from './Styles/GateScreenStyle'
import {Colors, Images, Fonts} from '../Themes/'
import {moderateScale} from '../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'

class GateScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'BottomNav'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  signIn = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'SignIn',
      params: {},
      action: NavigationActions.navigate({routeName: 'SignIn'})
    })
    this.props.navigation.dispatch(navigateAction)
  }

  signUp = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'SignUp',
      params: {},
      action: NavigationActions.navigate({routeName: 'SignUp'})
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <View style={styles.boardCenter}>
          <View style={styles.banner}>
            <Image source={Images.gatescreen} style={{height: ratioHeight(214), resizeMode: 'contain', width: ratioWidth(214)}} />
          </View>
          <Text allowFontScaling style={[styles.title, { marginBottom: ratioHeight(15) }]}>Bergabung dengan Kioson</Text>
          <Text allowFontScaling style={styles.description}>Kioson memudahkan kamu untuk{'\n'}menjual beragam produk online pulsa{'\n'}hingga pembayaran tagihan.</Text>
          <View style={styles.line} />
          <View style={styles.footter}>
            <TouchableOpacity style={[styles.flexOne, { alignItems: 'center' }]} onPress={() => this.signIn()}>
              <Text allowFontScaling style={[styles.textButton, { color: Colors.white_two }]}>{I18n.t('b_signin')}</Text>
            </TouchableOpacity>
            <View style={{width: ratioWidth(10)}} />
            <TouchableOpacity style={[styles.flexOne, { backgroundColor: Colors.white_two, alignItems: 'center' }]} onPress={() => this.signUp()}>
              <Text allowFontScaling style={[styles.textButton]}>{I18n.t('b_signup')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.footter, {paddingVertical: ratioHeight(20)}]}>
            <View style={[styles.flexOneNostyle]} />
            <View style={{width: ratioWidth(10)}} />
            <TouchableOpacity style={[styles.flexOneNostyle]} onPress={() => this.goToHome()}>
              <Text allowFontScaling style={[styles.textButton, { color: Colors.white_two, fontFamily: Fonts.type.productSansBold, fontSize: moderateScale(Fonts.size.small) }]}>{I18n.t('b_goApps')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GateScreen)
