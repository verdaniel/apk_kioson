import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Images, Colors, Fonts } from '../../Themes'
import otpActions from '../../Redux/OtpRedux'
import FloatingLabel from '../../Components/FloatingLabel'
import BackgroundTimer from 'react-native-background-timer'
import { NavigationActions } from 'react-navigation'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'
import AlertMessage from '../../Transforms/AlertMessage'
import signInAction from '../../Redux/SignInRedux'
import loginAction from '../../Redux/UserLoginRedux'
import profileActions from '../../Redux/ProfileRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/SignInStyle'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneEmail: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      disable: true,
      error: false,
      messageError: 'Nomor ponsel / alamat email yang Anda masukkan salah.',
      countDown: false,
      timer: 180,
      textTimer: '03:00',
      trialLeft: 5,
      gettingOTP: true,
      alert: {
        phone: ''
      },
      keyboardshow: false,
      attemptLogin: false
    }
  }

  intervalId

  componentWillReceiveProps (nextProps) {
    const { dataLogin, otp } = nextProps
    const { gettingOTP, attemptLogin, phoneEmail } = this.state
    if (attemptLogin) {
      if (dataLogin !== null) {
        this.setState({
          attemptLogin: false
        })
        if (dataLogin.code === 200 && dataLogin.status) {
          AsyncStorage.setItem('token', dataLogin.data.token)
          this.props.setLogin(true)
          if (phoneEmail === '08123456789') {
            this.props.setKyc(true)
          }
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'BottomNav'})
            ]
          })
          this.props.navigation.dispatch(resetAction)
          this.props.getBalance(dataLogin.data.token)
        } else if (!dataLogin.status) {
          // ToastAndroid.show(dataLogin.message, ToastAndroid.SHORT)
          dataLogin.code = 0
        }
      }
    }

    if (gettingOTP) {
      if (otp !== null) {
        if (otp.code === 200 && otp.status) {
          // ToastAndroid.show(otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false
          })
        } else if (!otp.status) {
          // ToastAndroid.show(otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false
          })
          otp.status = 0
        }
      }
    }
  }

  renderLogoAndTitle () {
    return (
      <View style={styles.titleContainer}>
        <Image source={Images.ic_kioson_white} style={styles.logo} />
        <Text style={styles.textTitle}>
          {I18n.t('t_signin')}
        </Text>
      </View>
    )
  }

  textOTP1 = (text) => {
    if (text.length > 1) {
      this.setState({ otp2: text[1] })
      this.refs.otp3.focus()
    } else {
      this.setState({ otp1: text })
      if (text !== '') {
        this.refs.otp2.focus()
      }
    }
  }

  textOTP2 = (text) => {
    if (text.length > 1) {
      this.setState({ otp3: text[1] })
      this.refs.otp4.focus()
    } else {
      this.setState({ otp2: text })
      if (text !== '') {
        this.refs.otp3.focus()
      } else {
        this.refs.otp1.focus()
      }
    }
  }

  textOTP3 = (text) => {
    if (text.length > 1) {
      this.setState({ otp4: text[1] })
      this.refs.otp5.focus()
    } else {
      this.setState({ otp3: text })
      if (text !== '') {
        this.refs.otp4.focus()
      } else {
        this.refs.otp2.focus()
      }
    }
  }

  textOTP4 = (text) => {
    if (text.length > 1) {
      this.setState({ otp5: text[1] })
      this.refs.otp6.focus()
    } else {
      this.setState({ otp4: text })
      if (text !== '') {
        this.refs.otp5.focus()
      } else {
        this.refs.otp3.focus()
      }
    }
  }

  textOTP5 = (text) => {
    if (text.length > 1) {
      this.setState({ otp6: text[1] })
      this.refs.otp6.focus()
    } else {
      this.setState({ otp5: text })
      if (text !== '') {
        this.refs.otp6.focus()
      } else {
        this.refs.otp4.focus()
      }
    }
  }

  textOTP6 = (text) => {
    this.setState({ otp6: text })
    if (text === '') {
      this.refs.otp5.focus()
    }
  }

  sendOTP () {
    const { timer, trialLeft, phoneEmail } = this.state
    if (phoneEmail.length < 10) {
      this.setState({
        error: true,
        alert: {...this.state.alert, phone: I18n.t('e_minimunCustomerPhoneNumber')}
      })
    } else if (phoneEmail[0] !== '0' || phoneEmail[1] !== '8') {
      this.setState({
        error: true,
        alert: {...this.state.alert, phone: I18n.t('e_phone')}
      })
    } else {
      if (trialLeft > 0) {
        this.props.getOtp(phoneEmail)
        let temp = timer
        let textTemp, minutes, second, textsecond
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
              textTimer: '03:00'
            })
            BackgroundTimer.clearInterval(this.intervalId)
          }
        }, 1000)
        this.setState({
          countDown: true,
          trialLeft: trialLeft - 1
        })
      }
    }
  }

  login () {
    const { phoneEmail, otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    const pin = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    this.setState({
      attemptLogin: true
    })
    this.props.login({ username: phoneEmail, password: pin })
    BackgroundTimer.clearInterval(this.intervalId)
  }

  renderForm () {
    const { phoneEmail, otp1, otp2, otp3, otp4, otp5, otp6, error, countDown, textTimer, trialLeft, alert } = this.state
    let color, disable, buttonOTP, requestLeft, otpSent, buttonSignIn
    if (phoneEmail.length > 9) {
      color = Colors.nice_blue
      disable = false
    } else {
      color = Colors.greyish
      disable = true
    }
    if (countDown) {
      buttonOTP = (
        <View style={[styles.buttonSignIn, { marginTop: ratioHeight(20) }]}>
          <Text style={[styles.textSignIn, { color: Colors.white }]}>
            KIRIM OTP ({textTimer})
          </Text>
        </View>
      )
      requestLeft = (
        <Text style={styles.textRequest}>Sisa Permintaan {trialLeft} OTP</Text>
      )
      otpSent = (
        <Text style={[styles.textRequest, { marginBottom: ratioHeight(10), textAlign: 'center' }]}>
          {I18n.t('l_otpsent', { phone: phoneEmail })}
        </Text>
      )
    } else {
      let teks = 'KIRIM OTP'
      if (trialLeft < 5) {
        teks = 'KIRIM ULANG OTP'
        requestLeft = (
          <Text style={styles.textRequest}>Sisa Permintaan {trialLeft} OTP</Text>
        )
      } else {
        requestLeft = null
      }
      buttonOTP = (
        <TouchableOpacity
          style={[styles.buttonOTP, { backgroundColor: color }]}
          disabled={disable}
          onPress={() => this.sendOTP()}
        >
          <Text style={styles.textOTP}>
            {teks}
          </Text>
        </TouchableOpacity>
      )
      otpSent = null
    }

    if (otp1.length > 0 && otp2.length > 0 && otp3.length > 0 && otp4.length > 0 && otp5.length > 0 && otp6.length > 0 && phoneEmail !== '') {
      buttonSignIn = (
        <TouchableOpacity style={styles.buttonSignOff} onPress={() => this.login()}>
          <Text style={styles.textTitle}>
            MASUK
          </Text>
        </TouchableOpacity>
      )
    } else if (countDown) {
      buttonSignIn = (
        <View style={styles.buttonSignOff2}>
          <Text style={[styles.textTitle, { fontSize: moderateScale(16), color: Colors.white }]}>
            MASUK
          </Text>
        </View>
      )
    } else {
      buttonSignIn = (
        <View style={styles.buttonSignIn}>
          <Text style={[styles.textTitle, { fontSize: moderateScale(16), color: Colors.white }]}>
            MASUK
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.formContainer}>
        <FloatingLabel
          ref='phone'
          alert={alert.phone}
          text={I18n.t('l_signin')}
          keyboardChange={false}
          changeColor={[Colors.greyish, Colors.nice_blue]}
          keyboardType='numeric'
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
          maxLength={13}
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={phoneEmail}
          onChangeText={(text) => this.setState({ phoneEmail: text, alert: {...alert, phone: AlertMessage.non}, error: false })}
          separatorColor={!error ? Colors.black_15 : Colors.red}
        />
        {requestLeft}
        {buttonOTP}
        <View style={[styles.inputContainer, { borderBottomWidth: 0 }]}>
          <TextInput
            ref='otp1'
            style={styles.inputTextOTP}
            value={otp1}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={2}
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
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={2}
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
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={2}
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
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={2}
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
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={2}
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
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP6}
            underlineColorAndroid='transparent'
            placeholder=''
          />
        </View>
        {otpSent}
        {buttonSignIn}
        <TouchableOpacity>
          <Text style={styles.textHelp}>
            Bantuan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderRegisterButton () {
    // const { keyboardshow } = this.state
    // if (keyboardshow) {
    //   return null
    // }
    return (
      <View style={styles.registerContainer}>
        <Text style={styles.textRegister}>
          Belum Punya Akun? {' '}
        </Text>
        <TouchableOpacity onPress={() => this.signUp()}>
          <Text style={styles.textRegisterButton}>
            DAFTAR
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  signUp = () => {
    this.props.navigation.navigate('SignUp')
    BackgroundTimer.clearInterval(this.intervalId)
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderLogoAndTitle()}
          {this.renderForm()}
        </ScrollView>
        {this.renderRegisterButton()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    otp: state.otp.payload,
    dataLogin: state.signIn.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOtp: (phone) => dispatch(otpActions.otpRequest(phone)),
    login: (params) => dispatch(signInAction.signInRequest(params)),
    setLogin: (param) => dispatch(loginAction.isLogin(param)),
    getBalance: (token) => dispatch(profileActions.getBalanceRequest(token)),
    setKyc: (param) => dispatch(loginAction.isKyc(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
