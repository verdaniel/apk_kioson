import React, { Component } from 'react'
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  ToastAndroid
 } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images, Fonts } from '../../Themes'
import moment from 'moment'
import I18n from '../../I18n'
import { price } from '../../Transforms/LocalConfig'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import ModalOneButton from '../../Components/ModalOneButton'
import HistorySaldo from '../HistorySaldo'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/BalanceTopUpStyle'

class BalanceTopUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      balance: '1000000',
      // balance: this.props.balance.data.total_sales,
      isVerified: this.props.dataLogin.kyc, // false => kyc is not complete, true if kyc is complete
      amountTransaction: 9000000,
      limitTransaction: 20000000,
      amount: '',
      data: [
        {
          'id': 1,
          'type': 1,
          'resi': '113WMJAQ',
          'date': 1511335876000,
          'amount': 250000,
          'admin_fee': 1000,
          'discount': 0
        },
        {
          'id': 2,
          'type': 2,
          'resi': '113WMJAQ',
          'date': 1511335876000,
          'amount': 250000,
          'admin_fee': 1000,
          'discount': 10000
        },
        {
          'id': 3,
          'type': 3,
          'resi': '113WMJAQ',
          'date': 1511335876000,
          'amount': 250000,
          'admin_fee': 1000,
          'discount': 10000
        },
        {
          'id': 4,
          'type': 1,
          'resi': '113WMJAQ',
          'date': 1511335876000,
          'amount': 250000,
          'admin_fee': 1000,
          'discount': 0
        }
      ],
      lowValue: ['100000', '200000', '300000', '500000', '600000', '700000', '800000', '1000000'],
      highValue: ['150000', '300000', '500000', '1000000', '1500000', '2000000', '2500000', '5000000'],
      modalFailed: false
    }
  }

  componentWillMount () {
    const { isVerified } = this.state
    if (isVerified) {
      this.setState({
        balance: String(10000000)
      })
    }
  }

  renderNav () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.ic_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {I18n.t('l_titlebalance')}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader () {
    const { balance, amountTransaction, limitTransaction } = this.state

    const textBalance = 'Rp ' + this.maskedMoney(balance)
    const textAmount = 'Rp ' + this.maskedMoney(amountTransaction)
    const textLimit = 'Rp ' + this.maskedMoney(limitTransaction)
    return (
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {I18n.t('t_balance')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.whitebox} />
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>
            {textBalance}
          </Text>
        </View>
        {/* <View style={styles.transactionContainer}>
          <Text style={[styles.title, { flex: 1 }]}>
            {I18n.t('l_lasttransaction')}
          </Text>
          <Text style={styles.amount}>
            {textAmount}
          </Text>
        </View> */}
        <View style={[styles.barSaldo, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={[styles.barSaldo, {width: ratioWidth(130), backgroundColor: Colors.white_two}]} />
          <Text style={{fontFamily: Fonts.type.robotoRegular, fontSize: moderateScale(8), color: Colors.white_two, marginRight: ratioWidth(10)}}>LIMIT TRANSAKSI/BULAN</Text>
        </View>
        <View style={{width: ratioWidth(310), marginTop: ratioHeight(5), marginBottom: ratioHeight(15), flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(10), color: Colors.white_two}}>{textAmount}</Text>
          <Text style={{fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(10), color: Colors.white_two}}>{textLimit}</Text>
        </View>
      </View>
    )
  }

  changeText (text) {
    const result = price(text)
    this.setState({
      amount: String(result)
    })
  }

  renderInput () {
    const { amount } = this.state
    return (
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <View style={{ flexDirection: 'column', flex: 1, marginTop: moderateScale(10) }}>
            <Text style={styles.label}>
              {I18n.t('l_inputnominal')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: ratioWidth(10), marginTop: ratioHeight(-5), bottom: ratioHeight(3) }}>
              <Text style={styles.input}>
                Rp
              </Text>
              <TextInput
                ref='amount'
                style={[styles.input, { flex: 1 }]}
                value={amount}
                maxLength={10}
                keyboardType='numeric'
                autoCapitalize='none'
                onChangeText={(text) => this.changeText(text)}
                underlineColorAndroid='transparent'
                placeholder='0'
              />
            </View>
            <View style={{width: ratioWidth(196), height: moderateScale(0.5), backgroundColor: Colors.black_15, bottom: ratioHeight(12)}}/>
          </View>
          {this.renderButton()}
        </View>
      </View>
    )
  }

  renderQuickAmount () {
    const { lowValue, highValue, isVerified } = this.state
    const data = isVerified ? highValue : lowValue
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          {I18n.t('l_inputquicknominal')}
        </Text>
        <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setState({ amount: price(data[0]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[0] })
          }}>
            <Text style={styles.textButton}>
              {price(data[0])}
            </Text>
          </TouchableOpacity>
          <View style={styles.separatorBorder} />
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setState({ amount: price(data[1]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[1] })
          }}>
            <Text style={styles.textButton}>
              {price(data[1])}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.amountRow, {borderBottomWidth: 0}]}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setState({ amount: price(data[2]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[2] })
          }}>
            <Text style={styles.textButton}>
              {price(data[2])}
            </Text>
          </TouchableOpacity>
          <View style={styles.separatorBorder} />
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setState({ amount: price(data[3]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[3] })
          }}>
            <Text style={styles.textButton}>
              {price(data[3])}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setState({ amount: price(data[4]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[4] })
          }}>
            <Text style={styles.textButton}>
              {price(data[4])}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setState({ amount: price(data[5]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[5] })
          }}>
            <Text style={styles.textButton}>
              {price(data[5])}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setState({ amount: price(data[6]) })
            this.props.navigation.navigate('BalancePaymentMethod', { amount: data[6] })
          }}>
            <Text style={styles.textButton}>
              {price(data[6])}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setState({ amount: price(data[7]), modalFailed: true })
            // this.props.navigation.navigate('BalancePaymentMethod', { amount: data[7] })
          }}>
            <Text style={styles.textButton}>
              {price(data[7])}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }

  renderButton () {
    const { amount } = this.state
    if (amount !== '') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonBalance, { backgroundColor: Colors.nice_blue, borderRadius: moderateScale(4) }]}
            onPress={() => this.topUp()}
          >
            <Text style={[styles.textButton, { color: Colors.snow, fontSize: moderateScale(16), fontFamily: Fonts.type.productSansRegular }]}>
              {I18n.t('b_balancesmall')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonContainer}>
          <View style={[styles.buttonBalance, { backgroundColor: Colors.greyish, borderRadius: moderateScale(4) }]}>
            <Text style={[styles.textButton, { color: Colors.snow, fontSize: moderateScale(16), fontFamily: Fonts.type.productSansRegular }]}>
              {I18n.t('b_balancesmall')}
            </Text>
          </View>
        </View>
      )
    }
  }

  renderButtonScroll () {
    const { amount } = this.state
    if (amount !== '') {
      return (
        <View style={styles.buttonContainerScroll}>
          <TouchableOpacity
            style={[styles.buttonLeft, { backgroundColor: Colors.nice_blue, borderRadius: moderateScale(4) }]}
            onPress={() => this.topUp()}
          >
            <Text style={[styles.textButton, { color: Colors.snow }]}>
              {I18n.t('b_balance')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonContainerScroll}>
          <View style={[styles.buttonLeft, { backgroundColor: Colors.greyish, borderRadius: moderateScale(4) }]}>
            <Text style={[styles.textButton, { color: Colors.snow }]}>
              {I18n.t('b_balance')}
            </Text>
          </View>
        </View>
      )
    }
  }

  renderPendingRequest () {
    return (
      <View style={styles.listContainer}>
        <Text style={[styles.label, { marginBottom: ratioHeight(10), color: Colors.greyish }]}>
          {I18n.t('b_waitingpayment')}
        </Text>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    const time = moment(item.date).format('DD MMMM YYYY - h:mm').toString()
    const amount = this.maskedMoney(item.amount)
    const adminFee = this.maskedMoney(item.admin_fee)
    const discountText = this.maskedMoney(item.discount)
    const total = this.maskedMoney(item.amount + item.admin_fee - item.discount)

    let labelDiskon = null
    let separator = null
    let diskon = null
    if (item.discount > 0) {
      labelDiskon = <Text style={[styles.date, { marginTop: ratioHeight(3) }]}>{I18n.t('l_discount')}</Text>
      separator = <Text style={[styles.date, { marginTop: ratioHeight(3) }]}>:</Text>
      diskon = <Text style={[styles.date, { marginTop: ratioHeight(3), textAlign: 'right' }]}>- Rp {discountText}</Text>
    }

    let button, separatorButton, renderType
    switch (item.type) {
      case 1:
        separatorButton = <View style={{ width: ratioWidth(10) }} />
        renderType = I18n.t('transfer_bank_mandiri')
        button = (
          <TouchableOpacity
            style={[styles.buttonLeft, { backgroundColor: Colors.squash, height: ratioHeight(36), borderRadius: moderateScale(4) }]}
            onPress={() => this.props.navigation.navigate('BalancePaymentMethod', { amount: item.amount })}
          >
            <Text style={[styles.textButton, { color: Colors.snow }]}>
              {I18n.t('b_changeconfirmation')}
            </Text>
          </TouchableOpacity>
        )
        break
      case 2:
        separatorButton = <View style={{ width: ratioWidth(10) }} />
        renderType = I18n.t('offline_canvaser')
        button = (
          <TouchableOpacity
            style={[styles.buttonLeft, { backgroundColor: Colors.squash, height: ratioHeight(36), borderRadius: moderateScale(4) }]}
            onPress={() => this.props.navigation.navigate('BalancePaymentMethod', { amount: item.amount })}
          >
            <Text style={[styles.textButton, { color: Colors.snow }]}>
              {I18n.t('l_canvaser')}
            </Text>
          </TouchableOpacity>
        )
        break
      case 3:
        renderType = I18n.t('va_bri')
        separatorButton = null
        button = null
        break
      default:
        separatorButton = null
        button = null
    }
    return (
      <View style={styles.rowContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitle}>
            {renderType}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.resi}>{I18n.t('l_order')}: {item.resi}</Text>
          <Text style={[styles.date, { marginTop: ratioHeight(3) }]}>{time} WIB</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: ratioHeight(10) }}>
          <View style={{ flexDirection: 'column', marginRight: ratioWidth(40) }}>
            <Text style={styles.date}>{I18n.t('b_balancesmall')}</Text>
            <Text style={[styles.date, { marginTop: ratioHeight(3) }]}>{I18n.t('l_adminfee')}</Text>
            {labelDiskon}
            <Text style={[styles.total, { marginTop: ratioHeight(3) }]}>{I18n.t('l_paytotal')}</Text>
          </View>
          <View style={{ flexDirection: 'column', marginRight: ratioWidth(40) }}>
            <Text style={styles.date}>:</Text>
            <Text style={[styles.date, { marginTop: ratioHeight(3) }]}>:</Text>
            {separator}
            <Text style={[styles.total, { marginTop: ratioHeight(3) }]}>:</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.date, { textAlign: 'right' }]}>Rp {amount}</Text>
            <Text style={[styles.date, { marginTop: ratioHeight(3), textAlign: 'right' }]}>Rp {adminFee}</Text>
            {diskon}
            <Text style={[styles.total, { marginTop: ratioHeight(3), textAlign: 'right' }]}>Rp {total}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: ratioHeight(20) }}>
          <TouchableOpacity
            style={styles.buttonTutor}
            onPress={() => this.payment(item)}
          >
            <Text style={[styles.textButton, { color: Colors.snow }]}>
              {I18n.t('b_howtopay')}
            </Text>
          </TouchableOpacity>
          {separatorButton}
          {button}
        </View>
      </View>
    )
  }

  renderNote () {
    const { isVerified } = this.state
    if (!isVerified) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.noteContainer, {marginTop: 0}]}>
            <View style={[styles.round]}>
              <Text style={[styles.textRegularSmall, { color: Colors.white_two }]}>!</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: moderateScale(10) }}>
              <Text style={styles.textRegularSmall}>
              Jumlah saldo maksimal Rp 1.000.000. Lengkapi KYC{'\n'} untuk meningkatkan limitasi saldo Anda.
                <Text style={[styles.textRegularSmall, { fontWeight: '500' }]} onPress={() => this.toKYC()}>
                  {' '}Klik di sini
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.noteContainer, {marginTop: 0}]}>
          <View style={[styles.round]}>
            <Text style={[styles.textRegularSmall, { color: Colors.white_two }]}>!</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: moderateScale(10) }}>
            <Text style={styles.textRegularSmall}>
            Jumlah saldo maksimal Rp 10.000.000.
            </Text>
          </View>
        </View>
      </View>
    )
  }

  modalFailed () {
    const { isVerified } = this.state
    const nominal = isVerified ? '10.000.000' : '1.000.000'
    const text = 'Saldo maksimal setelah top up tidak boleh melebihi Rp ' + nominal
    return (
      <ModalOneButton
        isOpen={this.state.modalFailed}
        onClosed={() => this.setState({ modalFailed: false })}
        onPress={() => this.setState({ modalFailed: false })}
        title={'TOP UP SALDO GAGAL'}
        desc={text}
        button={'OK'} />
    )
  }

  payment (item) {
    switch (item.type) {
      case 1:
        this.props.navigation.navigate('BalanceTransferBankThankPage',
          {
            amount: item.amount,
            discount: item.discount,
            adminFee: item.admin_fee,
            activePayment: 1
          }
        )
        break
      case 2:
        this.props.navigation.navigate('BalanceTransferBankThankPage',
          {
            amount: item.amount,
            discount: item.discount,
            adminFee: item.admin_fee,
            activePayment: 5
          }
        )
        break
      case 3:
        this.props.navigation.navigate('BalanceTransferBankThankPage',
          {
            amount: item.amount,
            discount: item.discount,
            adminFee: item.admin_fee,
            activePayment: 3
          }
        )
        break
    }
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

    return rupiah
  }

  topUp () {
    const { amount, data } = this.state
    const temp = amount.replace(/\./g, '')
    // const temp2 = temp.replace('.', '')
    let errTransfer = false
    let countTransfer = 0
    data.map((data, i) => {
      if (data.type === 1) {
        countTransfer = countTransfer + 1
      }
      if (countTransfer > 2) {
        errTransfer = true
      }
    })
    if (parseInt(temp) < 10000) {
      ToastAndroid.show(I18n.t('toast_balance') + ' Rp 10.000', ToastAndroid.SHORT)
    } else if (errTransfer) {
      ToastAndroid.show(I18n.t('toast_requesttopup'), ToastAndroid.LONG)
    } else {
      this.props.navigation.navigate('BalancePaymentMethod', { amount: temp })
    }
  }

  toKYC () {
    this.props.navigation.navigate('CompleteData')
  }

  renderSaldo () {
    return (
      <HistorySaldo />
    )
  }

  render () {
    const { data } = this.state
    if (data.length === 0) {
      return (
        <ScrollView style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
          {this.renderNav()}
          {this.renderHeader()}
          {this.renderInput()}
          {this.renderNote()}
          {this.renderQuickAmount()}
        </ScrollView>
      )
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
          {this.renderNav()}
          <ScrollView>
            {this.renderHeader()}
            {this.renderInput()}
            {this.renderNote()}
            {this.renderQuickAmount()}
            {/* {this.renderPendingRequest()} */}
            <Text style={styles.riwayatText}>RIWAYAT SALDO</Text>
            {this.renderSaldo()}
          </ScrollView>
          {this.modalFailed()}
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.profile.getBalance.payload,
    dataLoginKyc: state.login.kyc,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTopUp)
