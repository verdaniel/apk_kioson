import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/SignUpVerificationReminderStyle'

class SignUpVerificationReminder extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderBanner () {
    return (
      <View style={styles.bannerContainer}>
        <Image source={Images.successRegister} style={styles.banner} />
      </View>
    )
  }

  renderTitle () {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>
          Pendaftaran Akun Berhasil
        </Text>
        <Text style={styles.textSubTitle}>
          {'\n'}Sekarang kamu bisa menikmati berbagai
          {'\n'}transaksi digital hanya dalam genggaman.
          {'\n'}Ayo mulai bisnismu bersama kioson!
        </Text>
        <View style={styles.line} />
      </View>
    )
  }

  renderButton () {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonVerification} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.textButton}>
              MULAI TRANSAKSI
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonVerificationNext} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.textButton}>
              LAIN KALI
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.nice_blue} />
        {this.renderBanner()}
        {this.renderTitle()}
        {this.renderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerificationReminder)
