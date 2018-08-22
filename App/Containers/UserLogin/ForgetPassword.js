import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer'
import FloatingLabel from '../../Components/FloatingLabel'
import I18n from '../../I18n'
import otpActions from '../../Redux/OtpRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/ForgetPasswordStyle'
import { Colors, Fonts, Images } from '../../Themes'
// import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import AlertMessage from '../../Transforms/AlertMessage'
import { ratioHeight } from '../../Transforms/Resize'

class ForgetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      password: '',
      confirmPassword: '',
      alert: {
        phone: '',
        password: '',
        confirmPassword: ''
      },
      errorPhone: false,
      errorPassword: false,
      errorConfirmPassword: false,
      showPassword: true,
      showConfirmPassword: true,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      countDown: false,
      timer: 180,
      textTimer: '03:00',
      gettingOTP: true,
      keyboardshow: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { gettingOTP } = this.state
    if (gettingOTP) {
      if (nextProps.otp !== null) {
        if (nextProps.otp.code === 200 && nextProps.otp.status) {
          // ToastAndroid.show(nextProps.otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false
          })
        } else if (!nextProps.otp.status) {
          ToastAndroid.show(nextProps.otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false,
            countDown: false
          })
          BackgroundTimer.clearInterval(this.intervalId)
          nextProps.otp.status = 0
        }
      }
    }
  }

  renderBox () {
    return (
      <View style={styles.boxContainer}>
        {this.renderInputPhone()}
        {this.renderInputNewPassword()}
        {this.renderInputNewPasswordConfirmation()}
        {this.renderButtonOtp()}
        {this.renderInputOtp()}
        {this.renderButtonCofirm()}
        {this.renderHelpButton()}
      </View>
    )
  }

  renderInputPhone () {
    const { alert, phone, errorPhone } = this.state
    return (
      <FloatingLabel
        ref='phone'
        alert={alert.phone}
        text={I18n.t('l_signin')}
        keyboardChange={false}
        onFocus={() => this.setState({keyboardshow: true})}
        onBlur={() => {
          this.setState({
            keyboardshow: false
          })
        }}
        changeColor={[Colors.greyish, Colors.nice_blue]}
        viewStyle={{ marginLeft: 0, marginRight: 0 }}
        keyboardType='default'
        style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
        value={phone}
        onChangeText={(text) => this.setState({ phone: text, alert: {...alert, phone: AlertMessage.non} })}
        separatorColor={!errorPhone ? Colors.black_15 : Colors.red}
      />
    )
  }

  renderInputNewPassword () {
    const { alert, password, errorPassword, showPassword } = this.state
    // const padding = !errorPassword ? moderateScale(10) : 0
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.passwordContainer}>
          <FloatingLabel
            ref='password'
            alert={alert.password}
            text={I18n.t('p_newpassword')}
            keyboardChange={false}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            secureTextEntry={showPassword}
            changeColor={[Colors.greyish, Colors.nice_blue]}
            viewStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
            keyboardType='default'
            style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
            value={password}
            onChangeText={(text) => this.setState({ password: text, errorPassword: false, alert: {...alert, password: AlertMessage.non} })}
            separatorColor={!errorPassword ? Colors.black_15 : Colors.red}
          />
          <TouchableOpacity
            activeOpacity={0.8} onPress={() => this.showPassword()}
            style={[styles.buttonPassword, { bottom: !errorPassword ? 10 : 35 }]}>
            <Image style={styles.iconSquare} source={(this.state.showPassword) ? Images.ic_eye : Images.ic_eye_active} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderInputNewPasswordConfirmation () {
    const { alert, confirmPassword, errorConfirmPassword, showConfirmPassword } = this.state
    // const padding = !errorConfirmPassword ? moderateScale(10) : 0
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.passwordContainer}>
          <FloatingLabel
            ref='confirmpassword'
            alert={alert.confirmPassword}
            text={I18n.t('p_confirmationpassword')}
            keyboardChange={false}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            secureTextEntry={showConfirmPassword}
            changeColor={[Colors.greyish, Colors.nice_blue]}
            viewStyle={{ marginLeft: 0, marginRight: 0, flex: 1 }}
            keyboardType='default'
            style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
            value={confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text, errorConfirmPassword: false, alert: {...alert, confirmPassword: AlertMessage.non} })}
            separatorColor={!errorConfirmPassword ? Colors.black_15 : Colors.red}
          />
          <TouchableOpacity
            activeOpacity={0.8} onPress={() => this.showConfirmPassword()}
            style={[styles.buttonPassword, { bottom: !errorConfirmPassword ? ratioHeight(9) : ratioHeight(35) }]}>
            <Image style={styles.iconSquare} source={(this.state.showPassword) ? Images.ic_eye : Images.ic_eye_active} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderButtonOtp () {
    const { password, phone, confirmPassword, countDown } = this.state
    let color, disable, teks, border
    let colorText = Colors.snow
    if (countDown) {
      disable = true
      teks = I18n.t('t_otp') + ' ' + this.state.textTimer
      color = Colors.snow
      colorText = Colors.nice_blue
      border = Colors.nice_blue
    } else if (password !== '' && phone !== '' && confirmPassword !== '') {
      color = Colors.nice_blue
      border = Colors.nice_blue
      disable = false
      teks = I18n.t('t_otp')
    } else {
      color = Colors.greyish
      border = Colors.greyish
      disable = true
      teks = I18n.t('t_otp')
    }
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonOTP, { backgroundColor: color, borderColor: border, borderWidth: moderateScale(1) }]}
          disabled={disable}
          onPress={() => this.sendOTP()}
        >
          <Text style={[styles.textOTP, { color: colorText }]}>
            {teks}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderInputOtp () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.inputContainer, { borderBottomWidth: 0 }]}>
          <TextInput
            ref='otp1'
            style={styles.inputTextOTP}
            value={otp1}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP1}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp2'
            style={styles.inputTextOTP}
            value={otp2}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP2}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp3'
            style={styles.inputTextOTP}
            value={otp3}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP3}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp4'
            style={styles.inputTextOTP}
            value={otp4}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP4}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp5'
            style={styles.inputTextOTP}
            value={otp5}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP5}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp6'
            style={styles.inputTextOTP}
            value={otp6}
            maxLength={1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP6}
            underlineColorAndroid='transparent'
            placeholder=''
          />
        </View>
      </View>
    )
  }

  renderButtonCofirm () {
    const { password, phone, confirmPassword, otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    let color, disable, teks, border
    let colorText = Colors.snow
    if (password !== '' && phone !== '' && confirmPassword !== '' && otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      color = Colors.nice_blue
      disable = false
      teks = I18n.t('t_confirmation')
      colorText = Colors.snow
      border = Colors.nice_blue
    } else {
      color = Colors.snow
      disable = true
      teks = I18n.t('t_confirmation')
      colorText = Colors.nice_blue
      border = Colors.nice_blue
    }
    return (
      <View style={[styles.buttonContainer, { marginTop: 0 }]}>
        <TouchableOpacity
          style={[styles.buttonOTP, { backgroundColor: color, borderColor: border, borderWidth: moderateScale(1) }]}
          disabled={disable}
        >
          <Text style={[styles.textOTP, { color: colorText }]}>
            {teks}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderHelpButton () {
    return (
      <TouchableOpacity style={{ marginTop: ratioHeight(15) }}>
        <Text style={styles.textHelp}>
          {I18n.t('b_help')}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSignUp () {
    const { keyboardshow } = this.state
    if (!keyboardshow) {
      return (
        <View style={styles.registerContainer}>
          <Text style={styles.textHelp}>{I18n.t('l_signup')} </Text>
          <TouchableOpacity>
            <Text style={[styles.textHelp, { textDecorationLine: 'underline', fontFamily: Fonts.type.productSansBold }]}>
              {I18n.t('b_signup')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  showPassword () {
    const { showPassword } = this.state
    if (showPassword) {
      this.setState({
        showPassword: false
      })
    } else {
      this.setState({
        showPassword: true
      })
    }
  }

  showConfirmPassword () {
    const { showConfirmPassword } = this.state
    if (showConfirmPassword) {
      this.setState({
        showConfirmPassword: false
      })
    } else {
      this.setState({
        showConfirmPassword: true
      })
    }
  }

  sendOTP () {
    const { phone, timer, password, confirmPassword, alert } = this.state
    let temp = timer
    let textTemp, minutes, second, textsecond
    if (password.length < 8) {
      this.setState({
        errorPassword: true,
        alert: {...alert, password: I18n.t('e_password')}
      })
    } else if (confirmPassword.length < 8) {
      this.setState({
        errorConfirmPassword: true,
        alert: {...alert, confirmPassword: I18n.t('e_password')}
      })
    } else if (password !== confirmPassword) {
      this.setState({
        errorConfirmPassword: true,
        alert: {...alert, confirmPassword: I18n.t('e_passwordnotmatch')}
      })
    } else {
      this.props.getOtp(phone)
      this.intervalId = BackgroundTimer.setInterval(() => {
        temp = temp - 1
        minutes = parseInt(temp / 60)
        second = temp % 60
        if (second < 10) {
          textsecond = '0' + second
        } else {
          textsecond = second
        }
        textTemp = '0' + minutes + ':' + textsecond
        this.setState({
          textTimer: textTemp
        })
        if (temp === 0) {
          this.setState({
            countDown: false,
            textTimer: '03:00',
            gettingOTP: true
          })
          BackgroundTimer.clearInterval(this.intervalId)
        }
      }, 1000)
      this.setState({
        countDown: true
      })
    }
  }

  textOTP1 = (text) => {
    this.setState({ otp1: text })
    if (text !== '') {
      this.refs.otp2.focus()
    }
  }

  textOTP2 = (text) => {
    this.setState({ otp2: text })
    if (text !== '') {
      this.refs.otp3.focus()
    } else {
      this.refs.otp1.focus()
    }
  }

  textOTP3 = (text) => {
    this.setState({ otp3: text })
    if (text !== '') {
      this.refs.otp4.focus()
    } else {
      this.refs.otp2.focus()
    }
  }

  textOTP4 = (text) => {
    this.setState({ otp4: text })
    if (text !== '') {
      this.refs.otp5.focus()
    } else {
      this.refs.otp3.focus()
    }
  }

  textOTP5 = (text) => {
    this.setState({ otp5: text })
    if (text !== '') {
      this.refs.otp6.focus()
    } else {
      this.refs.otp4.focus()
    }
  }

  textOTP6 = (text) => {
    this.setState({ otp6: text })
    if (text === '') {
      this.refs.otp5.focus()
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
          {this.renderBox()}
        </ScrollView>
        {this.renderSignUp()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    otp: state.otp.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOtp: (phone) => dispatch(otpActions.otpRequest(phone))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
