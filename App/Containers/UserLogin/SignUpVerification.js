import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import BackgroundTimer from 'react-native-background-timer'
import { Images, Colors } from '../../Themes'

// Actions
import signUpActions from '../../Redux/SignUpRedux'
import otpActions from '../../Redux/OtpRedux'
import LoadingModal from '../../Components/Loading'

// Styles
import styles from '../Styles/SignUpVerificationStyle'
import { moderateScale } from '../../Transforms/Scaling'

class SignUpVerification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      trialLeft: 5,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      timer: 180,
      textTimer: '03:00',
      gettingOTP: true,
      trySignUp: false,
      inputPhone: false,
      isRegistered: false,
      keyboardshow: false,
      message: '',
      error: false
    }
  }

  intervalId

  // componentWillMount () {
  //   const { params } = this.props.navigation.state
  //   const tempData = params.data
  //   this.setState({
  //     data: tempData
  //   })
  //   this.sendOTP()
  //   this.props.getOtp(params.data.phone_number)
  // }

  componentWillReceiveProps (nextProps) {
    const { gettingOTP, trySignUp } = this.state
    if (gettingOTP) {
      if (nextProps.otp !== null) {
        if (nextProps.otp.code === 200 && nextProps.otp.status) {
          // ToastAndroid.show(nextProps.otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false
          })
          nextProps.otp.status = 0
        } else if (!nextProps.otp.status) {
          ToastAndroid.show(nextProps.otp.message, ToastAndroid.SHORT)
          this.setState({
            gettingOTP: false
          })
          nextProps.otp.status = 0
        }
      }
    }
    if (trySignUp) {
      if (nextProps.signUp !== null) {
        if (nextProps.signUp.code === 200 && nextProps.signUp.status) {
          this.props.navigation.navigate('SignUpVerificationReminder')
          BackgroundTimer.clearInterval(this.intervalId)
          ToastAndroid.show(nextProps.signUp.message, ToastAndroid.SHORT)
          this.setState({
            trySignUp: false
          })
        } else if (!nextProps.signUp.status) {
          ToastAndroid.show(nextProps.signUp.message, ToastAndroid.SHORT)
          this.setState({
            trySignUp: false
          })
        }
      }
    }
  }

  renderLogoAndTitle () {
    const { phone, trialLeft, inputPhone } = this.state
    if (!inputPhone) {
      return (
        <View style={styles.titleContainer}>
          <Image source={Images.ic_kioson_white} style={styles.logo} />
          <Text style={styles.textPhone}>
            {I18n.t('l_inputphone')}
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.titleContainer}>
        <Image source={Images.ic_kioson_white} style={styles.logo} />
        <Text style={styles.textPhone}>
          {I18n.t('l_smsotpsent', { phone: phone })}
        </Text>
        <Text style={styles.textTrial}>Sisa Permintaan {trialLeft} OTP</Text>
      </View>
    )
  }

  renderHelpButton () {
    return (
      <TouchableOpacity style={styles.buttonHelp}>
        <Text style={styles.textHelp}>
          Bantuan
        </Text>
      </TouchableOpacity>
    )
  }

  renderNgeTest () {
    return(
      <View>
        <Text>asdasdasdadadasdasdadadadadadasda</Text>
      </View>
    )
  }

  renderOTP () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    return (
      <View style={[styles.inputContainer, { borderBottomWidth: 0 }]}>
        <TextInput
          ref='otp1'
          style={styles.inputTextOTP}
          value={otp1}
          maxLength={2}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP1}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
        <TextInput
          ref='otp2'
          style={styles.inputTextOTP}
          value={otp2}
          maxLength={2}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP2}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
        <TextInput
          ref='otp3'
          style={styles.inputTextOTP}
          value={otp3}
          maxLength={2}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP3}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
        <TextInput
          ref='otp4'
          style={styles.inputTextOTP}
          value={otp4}
          maxLength={2}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP4}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
        <TextInput
          ref='otp5'
          style={styles.inputTextOTP}
          value={otp5}
          maxLength={2}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP5}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
        <TextInput
          ref='otp6'
          style={styles.inputTextOTP}
          value={otp6}
          maxLength={1}
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP6}
          underlineColorAndroid='transparent'
          placeholder=''
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
        />
      </View>
    )
  }

  renderInputPhone () {
    const { phone, isRegistered, error, message } = this.state
    const viewError = error ? (
      <View style={styles.errorContainer}>
        <View style={styles.round}>
          <Text style={styles.textRound}>!</Text>
        </View>
        <Text style={styles.textRoundError}>{!isRegistered ? message : I18n.t('e_phoneRegistered')}</Text>
      </View>
    ) : <Text style={[styles.textRoundError, { color: Colors.squash }]}>{I18n.t('e_phoneRegistered')}</Text>
    const colorButton = phone.length < 10 ? Colors.greyish : Colors.nice_blue
    return (
      <View style={styles.renderInputContainer}>
        <View style={{ flexDirection: 'row', marginLeft: moderateScale(40), marginRight: moderateScale(40) }}>
          <TextInput
            ref='phone'
            style={[styles.inputTextOTP, { flex: 1, marginBottom: 0, fontSize: moderateScale(24) }]}
            value={phone}
            maxLength={13}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={(text) => this.setState({ phone: text, error: false })}
            underlineColorAndroid='transparent'
            placeholder={I18n.t('l_yourphonenumber')}
            placeholderTextColor={'rgba(255, 255, 255, 0.35)'}
            onFocus={() => this.setState({keyboardshow: true})}
            onBlur={() => {
              this.setState({
                keyboardshow: false
              })
            }}
          />
        </View>
        {viewError}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.buttonNext, { backgroundColor: colorButton }]}
            disabled={phone === ''}
            onPress={() => this.checkPhone()}
          >
            <Text style={styles.textButton}>
              LANJUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  checkPhone () {
    const { phone } = this.state
    if (phone.length < 10 || phone[0] !== '0' || phone[1] !== '8') {
      this.setState({
        error: true,
        message: I18n.t('e_phone')
      })
    } else {
      this.setState({
        inputPhone: true
      })
      this.sendOTP()
    }
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

  renderButtonConfirm () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    let button
    if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      button = (
        <TouchableOpacity style={styles.buttonConfirmationOn} onPress={() => this.confirm()}>
          <Text style={styles.textButton}>
            KONFIRMASI OTP
          </Text>
        </TouchableOpacity>
      )
    } else {
      button = (
        <View style={styles.buttonConfirmation}>
          <Text style={styles.textButton}>
            KONFIRMASI OTP
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        {button}
      </View>
    )
  }

  renderButtonResendOTP () {
    const { textTimer, countDown } = this.state
    let button
    if (!countDown) {
      button = (
        <TouchableOpacity style={styles.buttonConfirmationOn} onPress={() => this.sendOTP()}>
          <Text style={styles.textButton}>
            KIRIM ULANG OTP ({textTimer})
          </Text>
        </TouchableOpacity>
      )
    } else {
      button = (
        <View style={styles.buttonConfirmation}>
          <Text style={styles.textButton}>
            KIRIM ULANG OTP ({textTimer})
          </Text>
        </View>
      )
    }
    return (
      <View style={[styles.buttonContainer, { marginTop: moderateScale(-10), marginBottom: moderateScale(10) }]}>
        {button}
      </View>
    )
  }

  sendOTP () {
    const { timer, trialLeft, phone } = this.state
    // this.props.getOtp(phone)
    this.setState({
      gettingOTP: true
    })
    if (trialLeft > 0) {
      this.setState({
        textTimer: '03:00'
      })
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
            textTimer: '00:00'
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

  renderStatusOTP () {
    const { trialLeft, textTimer } = this.state
    if (textTimer === '00:00') {
      return null
    } else if (trialLeft < 4 && trialLeft > 0) {
      // return null
      return (
        <View style={styles.statusOTPContainer}>
          <Text style={styles.statusOTP}>
            OTP telah berhasil dikirim kembali
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderSignInButton () {
    // const { keyboardshow } = this.state
    // if (!keyboardshow) {
    // }
    // return null
    return (
      <View style={styles.registerContainer}>
        <Text style={styles.textRegister}>
          Sudah Punya Akun? {' '}
        </Text>
        <TouchableOpacity onPress={() => this.signIn()}>
          <Text style={styles.textRegisterButton}>
            MASUK
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  async confirm () {
    // const { data, otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    // const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    // let tempData = data
    // tempData.otp = otp
    // await this.setState({
    //   trySignUp: true
    // })
    // this.props.postSignUp(tempData)
    // Keyboard.dismiss()
    this.props.navigation.navigate('SignUpForm')
  }

  signIn = () => {
    this.props.navigation.navigate('SignIn')
  }

  render () {
    // const { trySignUp, inputPhone } = this.state
    const view = this.state.inputPhone ? (
      <View>
        {/* {this.renderNgeTest()} */}
        {this.renderOTP()}
        {this.renderButtonConfirm()}
        {this.renderButtonResendOTP()}
        {this.renderStatusOTP()}
      </View>
    ) : (
      this.renderInputPhone()
    )
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <KeyboardAvoidingView behavior='position'>
          {this.renderLogoAndTitle()}
          {view}
          {this.renderHelpButton()}
        </KeyboardAvoidingView>
        {this.renderSignInButton()}
        <LoadingModal visible={this.state.trySignUp} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUp: state.signUp.payload,
    otp: state.otp.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postSignUp: (data) => dispatch(signUpActions.signUpRequest(data)),
    getOtp: (phone) => dispatch(otpActions.otpRequest(phone))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification)
