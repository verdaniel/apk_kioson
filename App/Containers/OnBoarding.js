import React, { Component } from 'react'
import { View, AsyncStorage, Image, Text, TouchableOpacity, ViewPagerAndroid, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
// Styles
import styles from './Styles/OnBoardingStyle'
import { Colors, Images } from '../Themes/'
import {NavigationActions} from 'react-navigation'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'

class OnBoarding extends Component {
  constructor (props) {
    super(props)
    this.indexChange = 0
    this.state = {
      index: 0,
      selectedIndex: 0,
      size: 20,
      color: Colors.squash,
      loading: true
    }
  }

  componentDidMount () {
    SplashScreen.hide()
  }

  async _addTask () {
    await AsyncStorage.setItem('@firstLaunch:key', 'hello world')
  }

  updatePage (myPage) {
    const {navigate} = this.props.navigation
    if (this.state.selectedIndex === 2) {
      navigate('GateScreen')
      this._addTask()
    } else {
      let add = myPage + 1
      this.setState({ selectedIndex: add })
      this.viewPager.setPage(add)
    }
  }

  goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'GateScreen'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    this._addTask()
  }

  handleHorizontalScroll = (e) => {
    const selectedIndesx = e.nativeEvent.position
    this.setState({ selectedIndex: selectedIndesx })
  }

  renderActiveDot (index) {
    if (index === 0) {
      this.Colorszero = Colors.squash
      this.Colorsone = Colors.white_two
      this.Colorstwo = Colors.white_two
    } if (index === 1) {
      this.Colorszero = Colors.white_two
      this.Colorsone = Colors.squash
      this.Colorstwo = Colors.white_two
    } if (index === 2) {
      this.Colorszero = Colors.white_two
      this.Colorsone = Colors.white_two
      this.Colorstwo = Colors.squash
    }
    return (
      <View style={[styles.footter, { marginBottom: ratioHeight(25), alignSelf: 'center' }]}>
        <View style={[styles.dot, { backgroundColor: this.Colorszero }]} />
        <View style={[styles.dot, { backgroundColor: this.Colorsone }]} />
        <View style={[styles.dot, { backgroundColor: this.Colorstwo }]} />
      </View>
    )
  }

  next () {
    if (this.state.indexS++ >= this.state.types.length) {
      this.setState({indexS: 0})
    } else {
      this.setState({indexS: this.state.indexS++})
    }
  }

  render () {
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white_two} />
        <ViewPagerAndroid
          ref={(viewPager) => { this.viewPager = viewPager }}
          style={{flex: 1, paddingVertical: ratioHeight(20)}}
          initialPage={selectedIndex}
          onPageSelected={this.handleHorizontalScroll}
        >
          <View style={styles.boardCenter}>
            <View style={styles.banner}>
              <Image source={Images.slider1} style={styles.imageSlider} resizeMode={'contain'} />
            </View>
            <Text allowFontScaling style={[styles.title, { marginBottom: ratioHeight(15) }]}>Mulai Berdagang Online</Text>
            <Text allowFontScaling style={styles.description}>Kioson memudahkan kamu untuk{'\n'}menjual beragam produk online, pulsa{'\n'}hingga pembayaran tagihan.</Text>
          </View>
          <View style={styles.boardCenter}>
            <View style={styles.banner}>
              <Image source={Images.slider2} style={styles.imageSlider} />
            </View>
            <Text allowFontScaling style={[styles.title, { marginBottom: ratioHeight(15) }]}>Dapat Komisi & Bonus</Text>
            <Text allowFontScaling style={styles.description}>Setiap transaksi yang kamu lakukan{'\n'}akan mendapatkan komisi dan bonus{'\n'}hingga jutaan rupiah.</Text>
          </View>
          <View style={styles.boardCenter}>
            <View style={styles.banner}>
              <Image source={Images.slider3} style={styles.imageSlider} />
            </View>
            <Text allowFontScaling style={[styles.title, { marginBottom: ratioHeight(15) }]}>Fitur Produk Lengkap</Text>
            <Text allowFontScaling style={styles.description}>Sekarang transfer uang kemana pun dan{'\n'}kapan pun lebih mudah{'\n'}dengan aplikasi Kioson terbaru.</Text>
          </View>
        </ViewPagerAndroid>
        {this.renderActiveDot(selectedIndex)}
        <View style={styles.footter}>
          <TouchableOpacity style={[styles.flexOne, { alignItems: 'flex-start' }]} onPress={(this.goToHome)}>
            <Text allowFontScaling style={[styles.textButton, { paddingLeft: ratioWidth(23) }]}>LEWATI</Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity style={[styles.flexOne, { alignItems: 'flex-end' }]} onPress={() => this.updatePage(selectedIndex)}>
            <Text allowFontScaling style={[styles.textButton, { paddingRight: ratioWidth(23) }]}>LANJUT</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding)
