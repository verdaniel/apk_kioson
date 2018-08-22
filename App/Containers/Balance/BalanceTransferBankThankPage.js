import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import I18n from 'react-native-i18n'
import BackgroundTimer from 'react-native-background-timer'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Fonts } from '../../Themes'
import ModalOneButton from '../../Components/ModalOneButton'
import ModalTwoButton from '../../Components/ModalTwoButton'
import ModalInputPin from '../../Components/ModalInputPin'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import { price } from '../../Transforms/LocalConfig'
// Styles
import styles from '../Styles/BalanceTransferBankThankPageStyle'

class BalanceTransferBankThankPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: 0,
      activePayment: 0,
      adminFee: 0,
      discount: 0,
      date: 1511335876000,
      hours: '03',
      minutes: '00',
      seconds: '00',
      timer: 10800,
      openTutorial: false,
      openVa: false,
      openVaSinarmas: false,
      resi: '113WMJAQ',
      key: -1,
      dateRequest: 1511508793000,
      loan: false,
      type: 0,
      product: {},
      balance: {},
      name: '',
      balanceUser: '10000',
      modal: false,
      modalInputPin: false,
      modalPin: false,
      pinNumber: ''
    }
  }

  intervalId

  componentWillMount () {
    try {
      const { params } = this.props.navigation.state
      if (params.type !== undefined) {
        this.setState({
          amount: params.amount,
          discount: params.discount,
          name: params.name,
          adminFee: params.adminFee,
          activePayment: params.activePayment,
          key: params.key,
          loan: params.loan,
          product: params.product,
          type: params.type
        })
      } else {
        this.setState({
          amount: params.amount,
          activePayment: params.activePayment,
          adminFee: params.adminFee,
          discount: params.discount,
          key: params.key
        })
      }
    } catch (e) {
      this.setState({
        amount: 10000,
        adminFee: 232,
        activePayment: 5
      })
    }
  }

  componentDidMount () {
    const { timer, activePayment } = this.state
    if (activePayment !== 6) {
      let temp = timer
      let hourTemp, minuteTemp, secondTemp, modHour, textSecond, textMinute, textHour
      this.intervalId = BackgroundTimer.setInterval(() => {
        temp = temp - 1
        hourTemp = parseInt(temp / 3600)
        modHour = parseInt(temp % 3600)
        minuteTemp = parseInt(modHour / 60)
        secondTemp = parseInt(modHour % 60)
        if (secondTemp < 10) {
          textSecond = '0' + secondTemp
        } else {
          textSecond = secondTemp
        }
        if (minuteTemp < 10) {
          textMinute = '0' + minuteTemp
        } else {
          textMinute = minuteTemp
        }
        if (hourTemp < 10) {
          textHour = '0' + hourTemp
        } else {
          textHour = hourTemp
        }
        this.setState({
          hours: textHour,
          minutes: textMinute,
          seconds: textSecond
        })
        if (temp === 0) {
          BackgroundTimer.clearInterval(this.intervalId)
        }
      }, 1000)
    }
  }

  renderNav () {
    const { key, loan, type } = this.state
    const back = loan ? () => this.props.navigation.goBack() : () => this.props.navigation.goBack(key)
    const label = type > 0 ? I18n.t('l_confirmationrepayment') : 'Pembayaran'
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

  renderDate () {
    const { dateRequest, activePayment } = this.state
    if (activePayment === 6) {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {I18n.t('l_installmentbalancenote')}
          </Text>
        </View>
      )
    } else if (activePayment === 5) {
      const time = moment(dateRequest).format('DD MMMM YYYY, h:mm').toString()
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {I18n.t('l_notecanvaser1')}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.date}>
              {I18n.t('l_notecanvaser2')}
            </Text>
            <Text style={[styles.date, { fontFamily: Fonts.type.robotoBold }]}>
              {time} WIB
            </Text>
          </View>
        </View>
      )
    }
    const time = moment(dateRequest).format('DD MMMM YYYY, h:mm').toString()
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          Transfer dana Anda sebelum tanggal
        </Text>
        <Text style={[styles.date, { fontFamily: Fonts.type.robotoBold }]}>
          {time} WIB
        </Text>
      </View>
    )
  }

  renderCountDown () {
    const { hours, minutes, seconds, activePayment } = this.state
    if (activePayment !== 6) {
      return (
        <View style={styles.countDownContainer}>
          <View style={{ flex: 1 }} />
          <View style={styles.countDownColumn}>
            <Text style={styles.textCountDown}>{hours}</Text>
            <Text style={styles.textLabelCountDown}>JAM</Text>
          </View>
          <View style={styles.countDownColumn}>
            <Text style={styles.textCountDown}>:</Text>
            <Text style={styles.textLabelCountDown}>{' '}</Text>
          </View>
          <View style={styles.countDownColumn}>
            <Text style={styles.textCountDown}>{minutes}</Text>
            <Text style={styles.textLabelCountDown}>MENIT</Text>
          </View>
          <View style={styles.countDownColumn}>
            <Text style={styles.textCountDown}>:</Text>
            <Text style={styles.textLabelCountDown}>{' '}</Text>
          </View>
          <View style={styles.countDownColumn}>
            <Text style={styles.textCountDown}>{seconds}</Text>
            <Text style={styles.textLabelCountDown}>DETIK</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      )
    }
  }

  renderbody () {
    return (
      <View style={styles.body}>
        {this.renderAccount()}
        {this.renderBalance()}
        {this.renderAmount()}
        {this.renderWarning()}
        {this.renderPayment()}
        {this.renderTutorial()}
        {this.renderResi()}
      </View>
    )
  }

  renderAccount () {
    const { activePayment } = this.state
    let textAccount, logo, accountNumber, transferCode
    if (activePayment === 1) {
      textAccount = 'TRANSFER BANK MANDIRI'
      logo = Images.ic_bank_mandiri
      accountNumber = '121-000-3622622'
      transferCode = (
        <Text style={styles.transferCode}>
          KODE TRANSFER ANTAR BANK 008
        </Text>
      )
    } else if (activePayment === 2) {
      textAccount = 'TRANSFER BANK BCA'
      logo = Images.ic_bank_bca
      accountNumber = '494-305-6776'
      transferCode = (
        <Text style={styles.transferCode}>
          KODE TRANSFER ANTAR BANK 014
        </Text>
      )
    } else if (activePayment === 3) {
      textAccount = 'VIRTUAL ACCOUNT BANK BRI'
      logo = Images.ic_bank_bri
      accountNumber = '8383-08129513746'
      transferCode = (
        null
      )
    } else if (activePayment === 4) {
      textAccount = 'VIRTUAL ACCOUNT BANK SINARMAS'
      logo = Images.ic_bank_sinarmas
      accountNumber = '8383-08129513746'
      transferCode = (
        null
      )
    }
    if (activePayment === 5) {
      return (
        <View style={styles.accountContainer}>
          <Text style={[styles.textTypeAccount, { marginTop: ratioHeight(-10) }]}>
            Gerai Offline: CANVASSER
          </Text>
        </View>
      )
    } else if (activePayment === 6) {
      return (
        <View style={styles.accountContainer}>
          <Text style={[styles.textTypeAccount, { marginTop: ratioHeight(-10) }]}>
            POTONG SALDO
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.accountContainer}>
        <Text style={styles.textTypeAccount}>
          {textAccount}
        </Text>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.textAccount}>
          {accountNumber}
        </Text>
        <Text style={[styles.textAccount, { fontSize: moderateScale(14), marginTop: ratioHeight(5) }]}>
          PT Kioson Komersial Indonesia Tbk
        </Text>
        {transferCode}
      </View>
    )
  }

  renderBalance () {
    const { activePayment, balanceUser } = this.state
    const text1 = 'Rp ' + price(balanceUser)
    if (activePayment === 6) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.amountContainerBalance}>
            <Text style={[styles.transfer, { flex: 1, color: Colors.greyish }]}>
              SALDO ANDA
            </Text>
            <Text style={[styles.transfer, { color: Colors.greyish }]}>
              {text1}
            </Text>
          </View>
        </View>
      )
    }
  }

  renderAmount () {
    const { amount, discount, adminFee, activePayment } = this.state
    const textAmount = this.maskedMoney(parseInt(amount) + parseInt(adminFee) - parseInt(discount))

    const leng = textAmount.length
    const text1 = textAmount.substr(0, (leng - 3))
    const text2 = textAmount.substr(leng - 3)

    let teks
    if (activePayment === 5) {
      teks = 'JUMLAH BAYAR'
    } else if (activePayment === 6) {
      teks = 'SALDO TERPOTONG'
    } else {
      teks = 'JUMLAH TRANSFER'
    }

    const styleLastDigit = activePayment === 1 || activePayment === 6 || activePayment === 2 ? [styles.transfer, {color: Colors.red}] : styles.transfer
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.amountContainer}>
          <Text style={[styles.transfer, { flex: 1 }]}>
            {teks}
          </Text>
          <Text style={styles.transfer}>
            {text1}
          </Text>
          <Text style={styleLastDigit}>
            {text2}
          </Text>
        </View>
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

  renderWarning () {
    const { activePayment, loan } = this.state
    if (activePayment === 1 || activePayment === 2 || (activePayment === 4 && loan)) {
      return (
        <View style={styles.warningContainer}>
          <Text style={[styles.date, { color: Colors.red, fontSize: moderateScale(12) }]}>
            Harap transfer sesuai jumlah pembayaran{'\n'}sampai tiga digit terakhir.
          </Text>
        </View>
      )
    } else if (activePayment === 6) {
      return (
        <View style={styles.warningContainer}>
          <Text style={[styles.date, { color: Colors.red }]}>
            {I18n.t('l_warningpaymentbalance')}
          </Text>
        </View>
      )
    }
    return (
      <View style={[styles.warningContainer, { padding: moderateScale(5), borderWidth: 0 }]} />
    )
  }

  renderPayment () {
    const { openTutorial, activePayment, openVa, openVaSinarmas } = this.state
    if (activePayment === 1 || activePayment === 2 || activePayment === 5) {
      let rotate
      if (openTutorial) {
        rotate = '180 deg'
      } else {
        rotate = '0 deg'
      }
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.paymentContainer} onPress={() => this.openTutorial()}>
            <Text style={[styles.labelPayment, { flex: 1 }]}>
              Cara Bayar
            </Text>
            <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate}] }]} />
          </TouchableOpacity>
        </View>
      )
    } else if (activePayment === 3) {
      let rotate1, rotate2, rotate3, rotate4, rotate5, rotate6
      switch (openVa) {
        case 0:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 1:
          rotate1 = '180 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 2:
          rotate1 = '0 deg'
          rotate2 = '180 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 3:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '180 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 4:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '180 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 5:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '180 deg'
          rotate6 = '0 deg'
          break
        case 6:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '180 deg'
          break
        default:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
      }
      return (
        <View style={{ flexDirection: 'column', borderColor: Colors.black_15, borderWidth: moderateScale(1) }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(1)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui ATM
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate1}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(1)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(2)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Mobile Banking
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate2}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(2)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(3)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Internet Banking
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate3}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(3)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(4)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Teller BRI
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate4}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(4)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(5)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Mini ATM BRI
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate5}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(5)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVa(6)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui ATM Bank Lain
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate6}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVa(6)}
        </View>
      )
    } else if (activePayment === 4) {
      let rotate1, rotate2, rotate3, rotate4, rotate5, rotate6
      switch (openVaSinarmas) {
        case 0:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 1:
          rotate1 = '180 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 2:
          rotate1 = '0 deg'
          rotate2 = '180 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 3:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '180 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 4:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '180 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
          break
        case 5:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '180 deg'
          rotate6 = '0 deg'
          break
        case 6:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '180 deg'
          break
        default:
          rotate1 = '0 deg'
          rotate2 = '0 deg'
          rotate3 = '0 deg'
          rotate4 = '0 deg'
          rotate5 = '0 deg'
          rotate6 = '0 deg'
      }
      return (
        <View style={{ flexDirection: 'column', borderColor: Colors.black_15, borderWidth: moderateScale(1) }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(1)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui ATM
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate1}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(1)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(2)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Mobile Banking
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate2}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(2)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(3)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Internet Banking
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate3}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(3)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(4)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Teller Sinarmas
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate4}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(4)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(5)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui Mini ATM Sinarmas
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate5}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(5)}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.paymentContainerNoBorder} onPress={() => this.openVaSinarmas(6)}>
              <Text style={[styles.labelPayment, { flex: 1 }]}>
                VA melalui ATM Bank Lain
              </Text>
              <Image source={Images.ic_arrow_black_up} style={[styles.arrow, { transform: [{rotate: rotate6}] }]} />
            </TouchableOpacity>
          </View>
          {this.renderVaSinarmas(6)}
        </View>
      )
    }
  }

  openTutorial () {
    const { openTutorial } = this.state
    if (openTutorial) {
      this.setState({
        openTutorial: false
      })
    } else {
      this.setState({
        openTutorial: true
      })
    }
  }

  openVa (active) {
    const { openVa } = this.state
    if (active === openVa) {
      this.setState({
        openVa: 0
      })
    } else {
      this.setState({
        openVa: active
      })
    }
  }

  openVaSinarmas (active) {
    const { openVaSinarmas } = this.state
    if (active === openVaSinarmas) {
      this.setState({
        openVaSinarmas: 0
      })
    } else {
      this.setState({
        openVaSinarmas: active
      })
    }
  }

  renderTutorial () {
    const { openTutorial, activePayment } = this.state
    if (openTutorial) {
      if (activePayment === 1) {
        return (
          <View style={styles.tutorialContainer}>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Bank MANDIRI Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu TRANSAKSI LAINNYA.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu TRANSFER.</Text>
            <Text style={styles.textTypeAccount}>4. Pilih KE REKENING MANDIRI</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan nomor rekening Bank MANDIRI Kioson {'\n'}    121-000-3622622 dan pilih BENAR.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan JUMLAH TRANSFER dan pilih BENAR.</Text>
            <Text style={styles.textTypeAccount}>7. Pastikan detail pembayaran di halaman konfirmasi {'\n'}    sudah sesuai, kemudian pilih BENAR.</Text>
            <Text style={styles.textTypeAccount}>8. Simpan bukti transfer, untuk proses konfirmasi.</Text>
          </View>
        )
      } else if (activePayment === 2) {
        return (
          <View style={styles.tutorialContainer}>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Bank BCA Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu TRANSAKSI LAINNYA.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu TRANSFER.</Text>
            <Text style={styles.textTypeAccount}>4. Pilih KE REK BCA.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan JUMLAH TRANSFER dan pilih YA.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan nomor rekening Bank BCA Kioson {'\n'}    494-305-6776 dan pilih BENAR.</Text>
            <Text style={styles.textTypeAccount}>7. Pastikan detail pembayaran di halaman konfirmasi {'\n'}    sudah sesuai, kemudian pilih BENAR.</Text>
            <Text style={styles.textTypeAccount}>8. Simpan bukti transfer, untuk proses konfirmasi.</Text>
          </View>
        )
      } else if (activePayment === 5) {
        return (
          <View style={styles.tutorialContainer}>
            <Text style={[styles.textTypeAccount, { fontFamily: Fonts.type.robotoBold }]}>Lakukan pembayaran melalui Canvasser :</Text>
            <Text style={styles.textTypeAccount}>1. Hubungi Canvasser (agen Kioson) di kota Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Minta Canvasser untuk memasukkan PIN.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih KIRIM OTP jika detil transaksi sudah sesuai.</Text>
            <Text style={styles.textTypeAccount}>4. Berikan uang tunai untuk melakukan Top Up sesuai yang dibutuhkan.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan OTP untuk menyelesaikan transaksi. </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textTypeAccount}>6. Bila terjadi kendala, dapat menghubungi kami</Text>
              <TouchableOpacity>
                <Text style={[styles.textTypeAccount, { color: Colors.squash }]}>{' '}disini.</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
    return null
  }

  renderVa (active) {
    const { activePayment, openVa } = this.state
    if (activePayment === 3) {
      if (openVa === active && openVa === 1) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui ATM Bank BRI :</Text>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Bank BRI Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu TRANSAKSI LAINNYA.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu PEMBAYARAN.</Text>
            <Text style={styles.textTypeAccount}>4. Pilih menu LAINNYA.</Text>
            <Text style={styles.textTypeAccount}>5. Pilih menu BRIVA.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>7. Pilih YA untuk memproses pembayaran.</Text>
          </View>
        )
      } else if (openVa === active && openVa === 2) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Mobile Banking :</Text>
            <Text style={styles.textTypeAccount}>1. Masuk ke aplikasi BRI Mobile dan pilih Mobile Banking BRI.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu Info.</Text>
            <Text style={styles.textTypeAccount}>3. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>4. Masukkan PIN Mobile/SMS Banking BRI.</Text>
            <Text style={styles.textTypeAccount}>5. Anda akan mendapatkan notifikasi pembayaran melalui SMS.</Text>
          </View>
        )
      } else if (openVa === active && openVa === 3) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>VA melalui Internet Banking BRI :</Text>
            <Text style={styles.textTypeAccount}>1. Login internet banking Bank BRI.</Text>
            <Text style={styles.textTypeAccount}>2. Masukkan username dan Password.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu PEMBAYARAN.</Text>
            <Text style={styles.textTypeAccount}>4. Pilih menu BRIVA.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan password Internet Banking BRI.</Text>
            <Text style={styles.textTypeAccount}>7. Masukkan mToken Internet Banking BRI.</Text>
            <Text style={styles.textTypeAccount}>8. Anda mendapatkan notifikasi pembayaran.</Text>
          </View>
        )
      } else if (openVa === active && openVa === 4) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Teller Bank BRI :</Text>
            <Text style={styles.textTypeAccount}>1. Ambil nomor antrian transaksi Teller dan isi slip setoran.</Text>
            <Text style={styles.textTypeAccount}>2. Serahkan slip dan jumlah setoran kepada Teller BRI.</Text>
            <Text style={styles.textTypeAccount}>3. Teller BRI akan melakukan validasi transaksi.</Text>
            <Text style={styles.textTypeAccount}>4. Simpan slip setoran hasil validasi sebagai bukti pembayaran.</Text>
          </View>
        )
      } else if (openVa === active && openVa === 5) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Mini ATM BRI :</Text>
            <Text style={styles.textTypeAccount}>1. Pilih menu Mini ATM.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu Pembayaran.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu BRIVA.</Text>
            <Text style={styles.textTypeAccount}>4. Swipe kartu ATM.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>6. Layar ATM akan menampilkan konfirmasi transaksi.</Text>
            <Text style={styles.textTypeAccount}>7. Masukkan pin ATM, jika detil transaksi sudah benar.</Text>
            <Text style={styles.textTypeAccount}>8. Klik YA untuk mencetak struk.</Text>
          </View>
        )
      } else if (openVa === active && openVa === 6) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui ATM lain :</Text>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu “TRANSAKSI LAINNYA”</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu “TRANSFER”</Text>
            <Text style={styles.textTypeAccount}>4. Pilih menu “KE REK BANK LAIN”.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan kode bank tujuan : BRI (kode bank : 002.{'\n'}    Lalu klik “ BENAR”.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan jumlah pembayaran sesuai tagihan. Klik “BENAR”.</Text>
            <Text style={styles.textTypeAccount}>7. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>8. Klik “BENAR”.</Text>
          </View>
        )
      } else if (active === 6) {
        return null
      } else {
        return (
          <View style={{ flex: 1, height: ratioHeight(1), marginRight: ratioWidth(15), marginLeft: ratioWidth(15), backgroundColor: Colors.black_15 }} />
        )
      }
    } else {
      return null
    }
  }

  renderVaSinarmas (active) {
    const { activePayment, openVaSinarmas } = this.state
    if (activePayment === 4) {
      if (openVaSinarmas === active && openVaSinarmas === 1) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui ATM Bank Sinarmas :</Text>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Bank BCA Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu TRANSFER.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih rekening Bank Sinarmas dan rekening nasabah lain.</Text>
            <Text style={styles.textTypeAccount}>4. Masukkan no rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>5. Layar ATM akan menampilkan informasi transaksi.</Text>
            <Text style={styles.textTypeAccount}>6. Jika data sudah benar, silahkan pilih YA.</Text>
          </View>
        )
      } else if (openVaSinarmas === active && openVaSinarmas === 2) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Simobi :</Text>
            <Text style={styles.textTypeAccount}>1. Masuk ke aplikasi Simobi dan masukkan PIN untuk login.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu TRANSFER.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu transfer VA/</Text>
            <Text style={styles.textTypeAccount}>4. Masukkan nomor rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan Pin Simobi Anda.</Text>
            <Text style={styles.textTypeAccount}>6. Anda akan mendapatkan notifikasi pembayaran{'/n'}    melalui SMS</Text>
          </View>
        )
      } else if (openVaSinarmas === active && openVaSinarmas === 3) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>VA melalui Internet Banking Sinarmas :</Text>
            <Text style={styles.textTypeAccount}>1. Login internet banking Bank Sinarmas.</Text>
            <Text style={styles.textTypeAccount}>2. Masukkan username dan Password.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu "PEMBAYARAN TAGIHAN".</Text>
            <Text style={styles.textTypeAccount}>4. Pilih menu "OTHER" pada menu "KATEGORI PEMBAYARAN".</Text>
            <Text style={styles.textTypeAccount}>5. Pilih "KIOSON" pada menu "Nama Biller"</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan 9 digit nomor ID Pelanggan: 62xxxxxxx, pada menu "IDPEL".</Text>
            <Text style={styles.textTypeAccount}>7. Klik "LIHAT TAGIHAN"</Text>
          </View>
        )
      } else if (openVaSinarmas === active && openVaSinarmas === 4) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Teller Sinarmas :</Text>
            <Text style={styles.textTypeAccount}>1. Ambil nomor antrian transaksi Teller dan isi slip setoran.</Text>
            <Text style={styles.textTypeAccount}>2. Serahkan slip dan jumlah setoran kepada Teller Sinarmas.</Text>
            <Text style={styles.textTypeAccount}>3. Teller Sinarmas akan melakukan validasi transaksi.</Text>
            <Text style={styles.textTypeAccount}>4. Simpan slip setoran hasil validasi sebagai bukti pembayaran.</Text>
          </View>
        )
      } else if (openVaSinarmas === active && openVaSinarmas === 5) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui Mini ATM Sinarmas :</Text>
            <Text style={styles.textTypeAccount}>1. Pilih menu Mini ATM.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu Pembayaran.</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu Sinarmas..</Text>
            <Text style={styles.textTypeAccount}>4. Swipe kartu ATM.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>6. Layar ATM akan menampilkan konfirmasi transaksi.</Text>
            <Text style={styles.textTypeAccount}>7. Masukkan pin ATM, jika detil transaksi sudah benar.</Text>
            <Text style={styles.textTypeAccount}>8. Klik Lanjut untuk memproses pembayaran.</Text>
          </View>
        )
      } else if (openVaSinarmas === active && openVaSinarmas === 6) {
        return (
          <View style={styles.tutorialContainerNoBorder}>
            <Text style={styles.textTypeAccount}>Lakukan pembayaran melalui ATM lain :</Text>
            <Text style={styles.textTypeAccount}>1. Masukkan kartu ATM dan PIN Anda.</Text>
            <Text style={styles.textTypeAccount}>2. Pilih menu “TRANSAKSI LAINNYA”</Text>
            <Text style={styles.textTypeAccount}>3. Pilih menu “TRANSFER”</Text>
            <Text style={styles.textTypeAccount}>4. Pilih menu “KE REK BANK LAIN”.</Text>
            <Text style={styles.textTypeAccount}>5. Masukkan kode bank tujuan : Sinarmas (kode bank : 153.{'\n'}    Lalu klik “ BENAR”.</Text>
            <Text style={styles.textTypeAccount}>6. Masukkan jumlah pembayaran sesuai tagihan. Klik “BENAR”.</Text>
            <Text style={styles.textTypeAccount}>7. Masukkan no. rekening tujuan.</Text>
            <Text style={styles.textTypeAccount}>8. Klik “BENAR”.</Text>
          </View>
        )
      } else if (active === 6) {
        return null
      } else {
        return (
          <View style={{ flex: 1, height: ratioHeight(1), marginRight: ratioWidth(15), marginLeft: ratioHeight(15), backgroundColor: Colors.black_15 }} />
        )
      }
    } else {
      return null
    }
  }

  renderResi () {
    const { resi, date } = this.state
    const time = moment(date).format('DD MMM YYYY, h:mm').toString()
    return (
      <View style={styles.resiContainer}>
        <Text style={[styles.transfer, {fontFamily: Fonts.type.robotoRegular}]}>
          No Pesanan : 
          <Text style={[styles.transfer, {fontFamily: Fonts.type.robotoMedium}]}>{resi}</Text>
        </Text>
        <Text style={[styles.labelPayment, { fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(12), marginTop: ratioHeight(4), color: Colors.greyish }]}>
          {time} WIB
        </Text>
      </View>
    )
  }

  renderButton () {
    const { activePayment } = this.state
    let teks
    if (activePayment === 1 || activePayment === 2) {
      teks = 'KONFIRMASI PEMBAYARAN'
    } else if (activePayment === 99) {
      teks = I18n.t('b_confirmcanvaser')
    } else if (activePayment === 3 || activePayment === 4 || activePayment === 5) {
      teks = 'LIHAT STATUS'
    } else if (activePayment === 6) {
      teks = I18n.t('b_usebalance')
    }
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.next()}>
        <Text style={styles.textButton}>
          {teks}
        </Text>
      </TouchableOpacity>
    )
  }

  next () {
    const { activePayment, key, date, resi, amount, adminFee, discount, name, loan } = this.state
    if (activePayment === 1 || activePayment === 2) {
      BackgroundTimer.clearInterval(this.intervalId)
      this.props.navigation.navigate('BalanceTransferBankConfirmation', { amount: amount, adminFee: adminFee, discount: discount, date: date, resi: resi, key: key })
    } else if (activePayment === 3 || activePayment === 4) {
      if (activePayment === 4 && loan) {
        const payment =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#{resi}</Text>
        <Text style={styles.robotoRegularSmallGrey}>{I18n.t('t_loan')} - Danamas</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_payinstallment') + ' - ' + name}</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {price(amount)}</Text>
      </View>)
        this.props.navigation.navigate('SuccessPurchase',
          {
            component: payment,
            icon: Images.ic_pinjaman
          })
      } else {
        BackgroundTimer.clearInterval(this.intervalId)
        this.props.navigation.goBack(key)
      }
    } else if (activePayment === 5) {
      BackgroundTimer.clearInterval(this.intervalId)
      this.props.navigation.navigate('BalanceTransferCanvaserConfirmation', { amount: amount, adminFee: adminFee, discount: discount, date: date, resi: resi, loan: loan, key: key })
    } else if (activePayment === 6) {
      this.setState({
        modalPin: true
      })
    }
  }

  renderModalBalance () {
    return (
      <ModalOneButton
        isOpen={this.state.modal}
        onClosed={() => this.setState({ modal: false })}
        onPress={() => this.setState({ modal: false })}
        title={'GAGAL'}
        desc={'Saldo tidak cukup\nuntuk melakukan transaksi'}
        button={'OK'} />
    )
  }

  modalConfirmPin () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalPin}
        onClosed={() => this.setState({ modalPin: false })}
        onPressFalse={() => this.setState({ modalPin: false })}
        onPressTrue={() => this.setState({ modalPin: false, modalInputPin: true })}
        title={'PIN TIDAK AKTIF'}
        desc={'Demi keamanan bertransaksi,\nsilahkan aktifkan PIN Anda.'}
        buttonFalse={'Lain Kali'}
        buttonTrue={'Aktifkan'} />
    )
  }

  modalInputPin () {
    return (
      <ModalInputPin
        isOpen={this.state.modalInputPin}
        onClosed={() => this.setState({ modalInputPin: false })}
        onPress={(pinNumber) => this.paymentBalance()}
        title={'MASUKKAN PIN ANDA'}
        button={'Konfirmasi'} />
    )
  }

  paymentBalance (pin) {
    const { amount, balanceUser, resi, name } = this.state
    this.setState({
      modalInputPin: false,
      pinNumber: pin
    })
    if (parseInt(amount) > parseInt(balanceUser)) {
      this.setState({
        modal: true,
        modalInputPin: false
      })
    } else {
      const payment =
    (<View style={{alignItems: 'center'}}>
      <Text style={styles.robotoMediumBlue}>#{resi}</Text>
      <Text style={styles.robotoRegularSmallGrey}>{I18n.t('t_loan')} - Danamas</Text>
      <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_payinstallment') + ' - ' + name}</Text>
      <Text style={[styles.robotoRegularSmallGrey]}>Rp {price(amount)}</Text>
    </View>)
      this.props.navigation.navigate('SuccessPurchase',
        {
          component: payment,
          icon: Images.ic_pinjaman
        })
    }
  }

  render () {
    const { activePayment } = this.state
    if (activePayment === 5) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
            {this.renderNav()}
            {this.renderDate()}
            {this.renderCountDown()}
            {this.renderbody()}
          </ScrollView>
          <View style={{ flex: 1 }} />
          {this.renderButton()}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderNav()}
        {this.renderDate()}
        {this.renderCountDown()}
        <ScrollView>
          {this.renderbody()}
        </ScrollView>
        {this.renderButton()}
        {this.renderModalBalance()}
        {this.modalConfirmPin()}
        {this.modalInputPin()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTransferBankThankPage)
