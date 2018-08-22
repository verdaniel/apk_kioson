import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer'
// import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Fonts } from '../../Themes'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { price } from '../../Transforms/LocalConfig'
import { moderateScale } from '../../Transforms/Scaling'
import I18n from 'react-native-i18n'
import ModalOneButton from '../../Components/ModalOneButton'
import moment from 'moment'
// Styles
import styles from '../Styles/BalanceTransferCanvaserConfirmationStyle'

class BalanceTransferCanvaserConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resi: '113WMJAQ',
      date: 1511335876000,
      amount: 0,
      adminFee: 0,
      discount: 0,
      pin: '',
      errorPin: '',
      modal: false,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      trialLeft: 5,
      requestOTP: false,
      timer: 180,
      textTimer: '03:00',
      phone: '081208120812',
      loan: false,
      name: 'Pinjaman - Samsung J2 Prime',
      buyerName: 'Nur Ibrahim Rosyad',
      numberInstallment: 2,
      transactionCode: '989009',
      productPrice: '1630598',
      installmentDate: 1511335876000,
      paymentDate: 1511335876000,
      tenor: '6 Bulan',
      fine: '0',
      modalsuccess: false,
      showpassword: false,
      lastBalance: '200000',
      key: ''
    }
  }

  intervalId

  componentWillMount () {
    try {
      const { params } = this.props.navigation.state
      this.setState({
        resi: params.resi,
        date: params.date,
        amount: params.amount,
        adminFee: params.adminFee,
        discount: params.discount,
        loan: params.loan,
        key: params.key
      })
    } catch (e) {
      this.setState({
        resi: '113WMJAQ',
        date: 1511335876000,
        amount: 10000,
        adminFee: 231,
        discount: 0
      })
    }
  }

  renderNav () {
    const { loan } = this.state
    const back = () => this.props.navigation.goBack()
    const label = loan ? I18n.t('l_confirmationrepayment') : 'Pembayaran'
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={back}>
          <Image source={Images.ic_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {label}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderResi () {
    const { amount, adminFee, discount } = this.state
    let viewDiscount = null
    let tempDiscount, tempAdminFee, tempTotal, tempAmount
    if (discount > 0) {
      tempDiscount = this.maskedMoney(discount)
      viewDiscount = this.renderData('Diskon', tempDiscount)
    }
    tempAmount = this.maskedMoney(amount)
    tempAdminFee = this.maskedMoney(adminFee)
    tempTotal = this.maskedMoney(parseInt(amount) + parseInt(adminFee) - parseInt(discount))
    // const time = moment(date).format('DD MMM YYYY - h:mm').toString()
    return (
      <View style={styles.amountContainer}>
        <Text style={[styles.label, {color: Colors.nice_blue}]}>
          Isi Saldo
        </Text>
        {/* <Text style={[styles.amount, { marginTop: 2 }]}>
          {time}
        </Text> */}
        <View style={styles.detailPayment}>
          {this.renderData('Isi Saldo', tempAmount)}
          <View style={{ height: ratioHeight(10) }} />
          {this.renderData('Biaya Admin', tempAdminFee)}
          {viewDiscount}
        </View>
        {this.renderTotal('Total', tempTotal)}
      </View>
    )
  }

  maskedMoney (value) {
    var number = value.toString()
    var sisa = number.length % 3
    var rupiah = number.substr(0, sisa)
    var ribuan = number.substr(sisa).match(/\d{3}/g)

    if (ribuan) {
      var separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    return 'Rp ' + rupiah
  }

  renderData (label, data) {
    return (
      <View style={{ flexDirection: 'row', marginBottom: moderateScale(5), marginTop: moderateScale(5) }}>
        <Text style={[styles.amountBalance, { flex: 1, color: Colors.slate_grey }]}>
          {label}
        </Text>
        <Text style={styles.amountBalanceData}>
          {String(data)}
        </Text>
      </View>
    )
  }

  renderTotal (label, data) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.amountBalance, { flex: 1, color: Colors.nice_blue, fontFamily: Fonts.type.robotoMedium }]}>
          {label}
        </Text>
        <Text style={[styles.amountBalance, { color: Colors.nice_blue, fontFamily: Fonts.type.robotoMedium }]}>
          {data}
        </Text>
      </View>
    )
  }

  renderLabel () {
    return (
      <Text style={[styles.amountBalance, { marginLeft: moderateScale(15), marginVertical: moderateScale(10), fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(12) }]}>
        KONFIRMASI OLEH CANVASSER
      </Text>
    )
  }

  renderInputPin () {
    const { pin, errorPin, showpassword } = this.state
    let color, errorMessage
    if (errorPin === '') {
      color = Colors.black_15
      errorMessage = (
        <Text style={[styles.errorMessage, { color: Colors.snow }]}>
          placeholder
        </Text>
      )
    } else {
      color = Colors.red
      errorMessage = (
        <Text style={styles.errorMessage}>
          {errorPin}
        </Text>
      )
    }
    return (
      <View style={styles.pinContainer}>
        <Text style={[styles.label, { fontSize: moderateScale(12), marginleft: ratioWidth(-3) }]}>Masukkan PIN (Canvasser)</Text>
        <View style={[styles.inputContainer, { borderBottomColor: color, paddingLeft: ratioWidth(2) }]}>
          <TextInput
            ref='pin'
            style={styles.inputText}
            value={pin}
            maxLength={6}
            keyboardType='numeric'
            secureTextEntry={!showpassword}
            autoCapitalize='none'
            onChangeText={this.changePin}
            underlineColorAndroid='transparent'
            placeholder='******'
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => showpassword ? this.setState({ showpassword: false }) : this.setState({ showpassword: true })}
            style={styles.buttonPassword}>
            <Image style={styles.iconSquare} source={(!this.state.showpassword) ? Images.ic_eye : Images.ic_eye_active} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        {errorMessage}
      </View>
    )
  }

  renderButton () {
    const { pin } = this.state
    if (pin.length > 5) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.confirm()}>
            <Text style={styles.textButton}>
              KONFIRMASI
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonContainer}>
          <View style={[styles.button, { backgroundColor: Colors.greyish }]}>
            <Text style={styles.textButton}>
              KONFIRMASI
            </Text>
          </View>
        </View>
      )
    }
  }

  renderModal () {
    const { trialLeft, otp1, otp2, otp3, otp4, otp5, otp6, phone } = this.state
    let tempPhone = ''
    for (var i = 0; i < phone.length; i++) {
      if (i > 3 && i < 8) {
        tempPhone = tempPhone + 'x'
      } else {
        tempPhone = tempPhone + phone.charAt(i)
      }
    }
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>KONFIRMASI OTP</Text>
          <Text style={[styles.modalContent, { marginTop: ratioHeight(24) }]}>OTP telah dikirim ke nomor ponsel {'\n'}{tempPhone}</Text>
          <Text style={[styles.labelOTP, { color: Colors.slate_grey }]}>Sisa Permintaan {trialLeft} OTP</Text>
          <View style={[styles.inputContainerOTP, { borderBottomWidth: 0 }]}>
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
          <Text style={[styles.labelOTP, { marginTop: ratioHeight(-10) }]}>Kode OTP telah berhasil dikirim kembali.</Text>
          {this.renderConfirmationButton()}
          {this.renderResendOTP()}
        </View>
      </View>
    )
  }

  renderConfirmationButton () {
    const { otp1, otp2, otp3, otp4, otp5, otp6, requestOTP } = this.state
    // let codeOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.otpButton} onPress={() => this.confirmation()}>
            <Text style={styles.textButton}>
              Konfirmasi OTP
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (requestOTP) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.otpButtonBorder}>
            <Text style={[styles.textButton, { color: Colors.squash }]}>
              Konfirmasi OTP
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.otpButton, { backgroundColor: Colors.greyish }]}>
            <Text style={styles.textButton}>
              Konfirmasi OTP
            </Text>
          </View>
        </View>
      )
    }
  }

  renderResendOTP () {
    const { otp1, otp2, otp3, otp4, otp5, otp6, requestOTP, textTimer } = this.state
    if (!requestOTP || (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '')) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.otpButtonBorder, { marginTop: ratioHeight(10) }]}>
            <Text style={[styles.textButton, { color: Colors.squash }]}>
              Kirim Ulang OTP ({textTimer})
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.otpButton, { marginTop: ratioHeight(10) }]} onPress={() => this.sendOTP()}>
            <Text style={styles.textButton}>
              Kirim Ulang OTP ({textTimer})
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderInstallment () {
    const { name, numberInstallment, buyerName, transactionCode, amount, adminFee, productPrice, installmentDate, tenor, paymentDate, fine } = this.state
    const total = price(String(parseInt(amount) + parseInt(adminFee) + parseInt(fine)))
    const time = moment(installmentDate).format('DD/MM/YYYY').toString()
    const paymentTime = moment(paymentDate).format('DD/MM/YYYY').toString()
    const productPriceMoney = price(productPrice)
    const adminFeeMoney = price(String(adminFee))
    const fineMoney = price(String(fine))
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          Pinjaman
        </Text>
        <View style={styles.detailPayment}>
          <Text style={styles.installment}>{I18n.t('l_installmentnumber', { number: numberInstallment })}</Text>
          {this.renderData('Produk', name)}
          {this.renderData('Nama', buyerName)}
          {this.renderData('Kode Transaksi', transactionCode)}
          {this.renderData('Harga Produk', 'Rp ' + productPriceMoney)}
          {this.renderData('Tanggal Peminjaman', time)}
          {this.renderData('Biaya Admin', 'Rp ' + adminFeeMoney)}
          {this.renderData('Tenor', tenor)}
          {this.renderData('Jatuh Tempo', paymentTime)}
          {this.renderData('Denda', 'Rp ' + fineMoney)}
        </View>
        {this.renderTotal('Total', 'Rp ' + total)}
      </View>
    )
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

  confirm () {
    const { pin, trialLeft, requestOTP } = this.state
    if (pin === '999999') {
      this.setState({
        errorPin: 'PIN yang anda masukkan salah.'
      })
    } else {
      if (!requestOTP) {
        if (trialLeft > 4) {
          this.sendOTP()
        }
      }
      this.setState({
        modal: true
      })
    }
  }

  renderModalSuccess () {
    const { amount, modalsuccess, adminFee, loan, lastBalance, fine } = this.state
    const money = price(String(parseInt(amount) + parseInt(adminFee) + parseInt(fine)))
    if (loan) {
      return (
        <ModalOneButton
          isOpen={modalsuccess}
          onClosed={() => this.setState({ modalsuccess: false })}
          onPress={() => this.setState({ modalsuccess: false, otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' })}
          title={'TRANSAKSI BERHASIL'}
          desc={'Pembayaran pinjaman sejumlah Rp ' + money + '\nberhasil'}
          button={'OK'} />
      )
    }
    return (
      <ModalOneButton
        isOpen={modalsuccess}
        onClosed={() => this.setState({ modalsuccess: false })}
        onPress={() => this.back()}
        title={'TRANSAKSI BERHASIL'}
        desc={I18n.t('l_topupbalancecanvasersuccess', { amount: price(String(amount)), lastbalance: price(String(lastBalance)) })}
        button={'OK'} />
    )
  }

  back () {
    this.props.navigation.goBack(this.state.key)
    this.setState({ modalsuccess: false, otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' })
  }

  confirmation () {
    BackgroundTimer.clearInterval(this.intervalId)
    this.setState({ modalsuccess: true, modal: false })
  }

  changePin = (text) => {
    this.setState({ pin: text, errorPin: '' })
  }

  sendOTP () {
    const { timer, trialLeft } = this.state
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
            requestOTP: true,
            textTimer: '03:00'
          })
          BackgroundTimer.clearInterval(this.intervalId)
        }
      }, 1000)
      this.setState({
        requestOTP: false,
        trialLeft: trialLeft - 1
      })
    }
  }

  render () {
    const { loan } = this.state
    const view = loan ? (
      this.renderInstallment()
    ) : (
        this.renderResi()
    )
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderNav()}
        <ScrollView>
          {view}
          {this.renderLabel()}
          {this.renderInputPin()}
        </ScrollView>
        {this.renderButton()}
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modal}
          onRequestClose={() => { this.setState({modal: false}) }}>
          {this.renderModal()}
        </Modal>
        {this.renderModalSuccess()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTransferCanvaserConfirmation)
