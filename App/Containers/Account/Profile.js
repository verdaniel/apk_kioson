import React, { Component } from 'react'
import { Text, View, StatusBar, TextInput, Image, TouchableOpacity, Easing } from 'react-native'
import { connect } from 'react-redux'
import CompleteData from '../CompleteData'
import Modal from 'react-native-modalbox'

import styles from '../Styles/ProfileStyle'
import { Colors, Images } from '../../Themes/index'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'
import BackgroundTimer from 'react-native-background-timer'

class Profile extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      idUser: params.name,
      phoneNumber: params.phone,
      modalInputPhone: false,
      modalOtp: false,
      textPhone: '',
      errorNumber: false,
      errorMessage: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      timer: 180,
      textTimer: '03:00',
      trialLeft: 4,
      resendOtp: true
    }
  }

  intervalId

  onChangeTextInputPhone = (text) => {
    this.setState({ textPhone: text })
    if (text.length >= 2) {
      if (text[0] !== '0' || text[1] !== '8') {
        this.setState({ errorNumber: true, errorMessage: 'Masukkan nomor ponsel anda dengan benar' })
      }
    } else {
      this.setState({ errorNumber: false, errorMessage: '' })
    }
  }

  onBlur = () => {
    if (this.state.textPhone.length < 11) {
      this.setState({ errorNumber: true, errorMessage: 'Nomor ponsel minimal 10 angka' })
    }
  }

  onFocus = () => {
    this.setState({ errorNumber: false, errorMessage: '' })
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

  modalInputPhone () {
    let disable = true
    if (this.state.textPhone.length >= 11) {
      disable = false
    }
    return (
      <Modal
        backdropOpacity={100}
        style={styles.modal}
        backButtonClose
        position={'center'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.black_35}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={this.state.modalInputPhone}
        onClosed={() => this.setState({ modalInputPhone: false })}>
        <Text allowFontScaling style={[styles.robotoMedBlue, { textAlign: 'center' }]}>MASUKKAN NOMOR BARU</Text>
        <Text allowFontScaling style={[styles.robotoRegSlateModalMod]}>OTP akan dikirim ke nomor yang Anda{'\n'}masukkan dibawah ini</Text>
        <View>
          <View style={this.state.errorNumber === false ? styles.borderBottom : styles.borderBottomError}>
            <TextInput
              style={this.state.errorNumber === false ? styles.inputTextModal : styles.inputTextModalError}
              value={this.state.textPhone}
              keyboardType='numeric'
              returnKeyType='done'
              autoCapitalize='none'
              maxLength={13}
              onBlur={() => this.onBlur()}
              onFocus={() => this.onFocus()}
              autoCorrect
              onChangeText={this.onChangeTextInputPhone}
              underlineColorAndroid='transparent'
              placeholder={'0812xxxxxxxx'}
              placeholderTextColor={Colors.greyish}
            />
          </View>
          <Text style={this.state.errorNumber === false ? styles.erroMessage : styles.erroMessageActive}>{this.state.errorMessage}</Text>
        </View>
        <TouchableOpacity disabled={disable} activeOpacity={0.8} style={[disable !== false ? styles.buttonModal : styles.buttonModalActive]} onPress={() => this.sendOTP()} >
          <Text style={styles.ProductSansBoldFixedSingle}>Kirim OTP</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  sendOTP () {
    const { timer, trialLeft } = this.state
    this.setState({ modalInputPhone: false, modalOtp: true, notifOtp: '' })
    if (trialLeft > 0) {
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
            textTimer: '03:00',
            notifOtp: 'Kode OTP telah berhasil dikirim kembali.'
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

  renderViewOtp () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    return (
      <View style={[styles.inputContainer, { borderBottomWidth: 0 }]}>
        <TextInput
          ref='otp1'
          style={styles.inputTextOTP}
          value={otp1}
          maxLength={1}
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
          keyboardType='numeric'
          autoCapitalize='none'
          onChangeText={this.textOTP6}
          underlineColorAndroid='transparent'
          placeholder=''
        />
      </View>
    )
  }

  closeModalOTP () {
    this.setState({ modalOtp: false })
    BackgroundTimer.clearInterval(this.intervalId)
  }

  modalOtp () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    let disableConfrim = true
    let disableResendOtp = true

    if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      disableConfrim = false
    }

    if (this.state.textTimer === '03:00') {
      disableResendOtp = false
    }

    return (
      <Modal
        backdropOpacity={100}
        style={[styles.modal, {height: ratioHeight(300), width: moderateScale(320)}]}
        backButtonClose
        position={'center'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.black_35}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={this.state.modalOtp}
        onClosed={() => this.closeModalOTP()}>
        <Text allowFontScaling style={[styles.robotoMedBlue, { textAlign: 'center' }]}>KONFIRMASI OTP</Text>
        <Text allowFontScaling style={[styles.robotoRegSlateModalMod]}>OTP telah dikirim ke nomor ponsel{'\n'}0855-xxxx-x856</Text>
        <View>
          <Text allowFontScaling style={[styles.robotoMedGreyMod, {paddingBottom: moderateScale(5)}]}>Sisa Permintaan {this.state.trialLeft} OTP</Text>
          {this.renderViewOtp()}
          <Text allowFontScaling style={[styles.robotoRegSlateModalMod, { fontSize: moderateScale(12), color: Colors.greyish, paddingTop: moderateScale(7) }]}>{this.state.notifOtp}</Text>
        </View>
        <View style={{bottom: moderateScale(-10)}}>
          <TouchableOpacity disabled={disableConfrim} activeOpacity={0.8} style={[disableConfrim !== false ? styles.buttonModalOtp : styles.buttonModalOtpACtive]} onPress={() => this.closeModalOTP()} >
            <Text style={styles.ProductSansBoldFixedSingle}>Konfirmasi OTP</Text>
          </TouchableOpacity>
          <View style={{padding: moderateScale(5)}} />
          <TouchableOpacity disabled={disableResendOtp} activeOpacity={0.8} style={[disableResendOtp !== false ? styles.buttonModalResendOtp : styles.buttonModalResendOtpActiv]} onPress={() => this.sendOTP()} >
            <Text style={[disableResendOtp !== false ? styles.ProductSansBoldResendOtp : styles.ProductSansBoldResendOtpActiv]}>Kirim Ulang OTP ({this.state.textTimer})</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <View style={styles.formDataUser}>
          <Text style={[styles.regularLarge, {marginBottom: moderateScale(24)}]}>Data Anda</Text>
          <View style={styles.flexColumn}>
            <Text style={styles.regularSmall}>
              ID Anda
              </Text>
            <View style={styles.flexRowTwo}>
              <TextInput
                editable={false}
                style={styles.inputText}
                value={this.state.idUser}
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={13}
                autoCorrect
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={[styles.flexColumn, {paddingBottom: 0}]}>
            <Text style={styles.regularSmall}>
              No. Ponsel Terdaftar
              </Text>
            <View style={[styles.flexRowTwo, { borderBottomWidth: 0 }]}>
              <TextInput
                style={styles.inputText}
                editable={false}
                value={this.state.phoneNumber}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={13}
                autoCorrect
                underlineColorAndroid='transparent'
              />
              <TouchableOpacity onPress={() => this.setState({modalInputPhone: true})}>
                <Image source={Images.ic_edit} style={styles.iconSquare} resizeMode='contain' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CompleteData marginTop={false} screenProps={this.props.screenProps} navigation={this.props.navigation} />
        {this.modalInputPhone()}
        {this.modalOtp()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
