import React, { Component } from 'react'
import { View, StatusBar, ScrollView, Text, TouchableOpacity, Keyboard, AsyncStorage, ToastAndroid, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
import SelectContacts from 'react-native-select-contact-android'

import CashBalance from '../../../Components/CashBalance'
import FooterFrom from '../../../Components/FooterFrom'
import ButtonForm from '../../../Components/ButtonForm'
import ModalOneButton from '../../../Components/ModalOneButton'
import AlertMessage from '../../../Transforms/AlertMessage'
import LoadingModal from '../../../Components/Loading'
import FormInput from '../../../Components/FormInput'
import ModalListContact from '../../../Components/ModalListContact'

import BankAction from '../../../Redux/MoneyRedux'
import BalanceAction from '../../../Redux/ProfileRedux'

import I18n from '../../../I18n'
import { Images, Colors } from '../../../Themes/index'
import { moderateScale } from '../../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'

import styles from '../../Styles/TransferSaldoStyle'

const TRANSFER_SALDO_SERVICE_ID = 'transfer_saldo'

class TransferSaldo extends Component {
  constructor (props) {
    super(props)
    this.submitting = {
      confirmation: false
    }
    this.state = {
      errVisible: false,
      keyboardShow: false,
      modalLoading: true,
      modalListContact: false,
      listContact: [],
      errMessage: '',
      destinationNumber: '',
      transferAmount: '',
      alert: {
        destinationNumber: '',
        transferAmount: ''
      },
      token: ''
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.getBalance('')
      } else {
        this.props.getBalance(value)
        this.setState({
          token: value
        })
      }
    })
  }

  componentDidMount () {
    Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardShow: true }))
    Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboardShow: false }))
  }

  componentWillUnmount () {
    Keyboard.removeListener('keyboardDidShow')
    Keyboard.removeListener('keyboardDidHide')
  }

  componentWillReceiveProps (nextProps) {
    const { balance, confirmationMoneytProps } = nextProps
    const { destinationNumber } = this.state
    if (balance !== this.props.balance && balance) {
      if (balance.code === 200 && balance.status) {
        if (balance.data.length !== 0) {
          this.setState({
            modalLoading: false
          })
        }
      } else if (!balance.status && balance.code !== 0) {
        ToastAndroid.show(balance.message, ToastAndroid.SHORT)
        this.setState({
          modalLoading: false
        })
        balance.code = 0
      }
    }

    if (confirmationMoneytProps !== this.props.confirmationMoneytProps && confirmationMoneytProps) {
      if (confirmationMoneytProps.code === 200 && confirmationMoneytProps.status && this.submitting.confirmation) {
        this.submitting = { ...this.submitting, confirmation: false }
        this.setState({
          modalLoading: false
        })
        // this.props.navigation.navigate('ConfirmationTransferSaldo', {
        //   data: {
        //     serviceProductId: TRANSFER_SALDO_SERVICE_ID,
        //     destinationNumber,
        //     destinationName: confirmationMoneytProps.data.holder_name,
        //     transferAmount: confirmationMoneytProps.data.amount,
        //     charge: confirmationMoneytProps.data.charge,
        //     price: confirmationMoneytProps.data.total_amount,
        //     token: this.state.token
        //   }
        // })
        const dataDetail = [
          { label: 'Nomor Ponsel Tujuan', detail: destinationNumber },
          { label: 'Nama Penerima', detail: confirmationMoneytProps.data.holder_name },
          { label: 'Jumlah Transfer', detail: confirmationMoneytProps.data.amount }
        ]
        this.props.navigation.navigate('PaymentConfirmation',
          {
            dataDetail: dataDetail,
            serviceType: 'transferSaldo',
            titleForm: 'Transfer Saldo',
            dataConfirmation: confirmationMoneytProps.data
          })
      } else if (!confirmationMoneytProps.status && confirmationMoneytProps.code !== 0) {
        ToastAndroid.show(confirmationMoneytProps.message, ToastAndroid.SHORT)
        confirmationMoneytProps.code = 0
      }
    }
  }

  checkFormAfterValidate () {
    const { transferAmount, destinationNumber, alert } = this.state
    if ((transferAmount === 0 || transferAmount === '' || alert.transferAmount !== '') ||
      (destinationNumber.length < 10 || alert.destinationNumber !== '')) {
      return true
    } else {
      return false
    }
  }

  onChangeTextDestinationNumber = (text) => {
    this.setState({ destinationNumber: text })
  }

  onChangeTextTransferAmount (text) {
    this.setState({ transferAmount: text })
  }

  onBlurDestinationNumber () {
    const { destinationNumber, alert } = this.state

    var n1 = destinationNumber[0]
    var n2 = destinationNumber[1]
    if (n1 !== '0' && n2 !== '8') {
      this.setState({ alert: { ...alert, destinationNumber: AlertMessage.wrongMobileNumber } })
    } else if (destinationNumber.length < 10) {
      this.setState({ alert: { ...alert, destinationNumber: AlertMessage.minimunCustomerPhoneNumber } })
    } else {
      this.setState({ alert: { ...alert, destinationNumber: AlertMessage.non } })
    }
  }

  onBlurTransferAmount () {
    const { transferAmount, alert } = this.state

    let numberText = parseInt(transferAmount)
    if (numberText >= 10000) {
      this.setState({ alert: { ...alert, transferAmount: AlertMessage.non } })
    } else {
      this.setState({ alert: { ...alert, transferAmount: AlertMessage.minimumTransfer } })
    }
  }

  async setQuickAmount (transferAmount) {
    await this.setState({ transferAmount })
    this.onBlurTransferAmount()
    // this._transfer.focus()
    Keyboard.dismiss()
  }

  onSubmit () {
    const { transferAmount } = this.state
    var tempBalance = this.props.balance.status ? this.props.balance.data.total_sales : 0
    Keyboard.dismiss()

    if (+transferAmount > tempBalance) {
      this.setState({errVisible: true, errMessage: 'Saldo tidak cukup\nuntuk melakukan transaksi'})
    } else {
      this.setState({modalLoading: true})
      this.props.confirmMoney({
        serviceProductId: TRANSFER_SALDO_SERVICE_ID,
        destinationNumber: this.state.destinationNumber,
        amount: this.state.transferAmount,
        token: this.state.token
      })
      this.submitting.confirmation = true
    }
  }

  onRequestClose () {
    this.setState({ modalLoading: false })
    this.props.navigation.goBack()
  }

  contact (preset) {
    var listContact = []
    SelectContacts.pickContact({timeout: 45000}, (err, contact) => {
      if (err) {
        if (typeof err === 'object') {
          if (err.message === 'user canceled') {
            console.tron.log('user hit back button in contact picker')
          } else if (err.message === 'timed out') {
            console.tron.log('timed out')
          } else if (err.message === 'android version not supported') {
            console.tron.log('invalid android version')
          }
        }
        console.tron.log(err)
      } else {
        if (contact.phoneNumbers) {
          listContact = contact.phoneNumbers.map((data, i) => {
            var number = data.number.replace('+62', '0').replace(/\D+/g, '')
            return number
          })
          if (listContact.length > 1) {
            this.setState({ listContact: listContact, modalListContact: true })
          } else {
            this.setState({ destinationNumber: String(listContact), modalListContact: false, listContact: [], alert: {...this.state.alert, transferAmount: ''} })
            this.onBlurDestinationNumber()
          }
        }
      }
    })
  }

  async onSelect (number) {
    await this.setState({ modalListContact: false, listContact: [], destinationNumber: number, alert: {...this.state.alert, destinationNumber: ''} })
    this.onBlurDestinationNumber()
  }

  requestContact = async (preset) => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        this.contact(preset)
      } else {
        ToastAndroid.show('Permission Denied', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  renderQuickAmount () {
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          {I18n.t('l_inputquicknominal')}
        </Text>
        <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setQuickAmount('50000')
          }}>
            <Text style={styles.textButton}>
              50.000
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setQuickAmount('100000')
          }}>
            <Text style={styles.textButton}>
              100.000
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setQuickAmount('150000')
          }}>
            <Text style={styles.textButton}>
              150.000
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setQuickAmount('200000')
          }}>
            <Text style={styles.textButton}>
              200.000
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.amountRow}>
          <TouchableOpacity style={[styles.buttonRight, { borderRightColor: Colors.black_15, borderRightWidth: moderateScale(0.5) }]} onPress={() => {
            this.setQuickAmount('250000')
          }}>
            <Text style={styles.textButton}>
              250.000
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight} onPress={() => {
            this.setQuickAmount('300000')
          }}>
            <Text style={styles.textButton}>
              300.000
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const { navigation, balance } = this.props

    const {alert, modalListContact, destinationNumber, transferAmount, errMessage, modalLoading, keyboardShow} = this.state
    let buttonSend = this.checkFormAfterValidate()

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView>
          <View style={{backgroundColor: Colors.white_two, paddingHorizontal: ratioWidth(5)}}>
            <View style={{marginBottom: !alert.destinationNumber ? 10 : 0}}>
              {/* <FloatingLabel
                text={'Nomor Ponsel Tujuan'}
                alertTextAlign={'left'}
                keyboardType={'numeric'}
                alert={alert.destinationNumber}
                value={destinationNumber}
                keyboardChange={false}
                separatorColor={alert.destinationNumber === '' ? Colors.black_15 : Colors.red}
                style={{ fontFamily: Fonts.type.robotoRegular, color: alert.destinationNumber === '' ? Colors.slate_grey : Colors.red, fontSize: moderateScale(16) }}
                onChangeText={(text) => this.onChangeTextDestinationNumber(text)} /> */}
              <FormInput
                value={destinationNumber}
                editable={!balance.fetching}
                isLeftVisible
                iconLeft={Images.ic_nomor_ponsel_tujuan}
                keyboardType='numeric'
                title='Nomor Ponsel Tujuan'
                placeholder={I18n.t('p_phoneNumber')}
                iconRight={Images.ic_contact}
                isRightVisible
                onBlur={() => this.onBlurDestinationNumber()}
                messageError={alert.destinationNumber}
                onChangeText={(text) => this.onChangeTextDestinationNumber(text)}
                onPressRight={() => this.requestContact()}
              />
            </View>
          </View>
          <View style={{height: ratioHeight(10)}} />
          <View style={{ backgroundColor: Colors.white_two, paddingHorizontal: ratioWidth(5) }}>
            <View style={{marginBottom: !alert.transferAmount ? 10 : 0}}>
              {/* <FloatingLabel
                isRef={(input) => { this._transfer = input }}
                text={I18n.t('p_transferamount')}
                alertTextAlign={'left'}
                keyboardType={'numeric'}
                alert={alert.transferAmount}
                value={transferAmount}
                keyboardChange={false}
                separatorColor={alert.transferAmount === '' ? Colors.black_15 : Colors.red}
                style={{ fontFamily: Fonts.type.robotoRegular, color: alert.transferAmount === '' ? Colors.slate_grey : Colors.red, fontSize: moderateScale(16) }}
                onChangeText={(text) => this.onChangeTextTransferAmount(text)} /> */}
              <FormInput
                value={transferAmount}
                editable={!balance.fetching}
                isLeftVisible
                iconLeft={Images.ic_currencyID}
                keyboardType='numeric'
                title='Jumlah Transfer'
                placeholder='123xxxxx'
                isRightVisible={false}
                onBlur={() => this.onBlurTransferAmount()}
                messageError={alert.transferAmount}
                // label={this.renderLogoProvider(destinationNumber)}
                onChangeText={(text) => this.onChangeTextTransferAmount(text)}
              />
            </View>
            {this.renderQuickAmount()}
          </View>
          <FooterFrom />
        </ScrollView>
        <ModalOneButton
          isOpen={this.state.errVisible}
          onClosed={() => this.setState({ errVisible: false })}
          onPress={() => this.setState({ errVisible: false })}
          title={'GAGAL'}
          desc={errMessage}
          button={'OK'} />
        <LoadingModal visible={modalLoading} onRequestClose={() => this.onRequestClose()} />
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={modalListContact} onClosed={() => this.setState({ modalListContact: false })} />
        {!keyboardShow === true && <View style={{paddingHorizontal: ratioWidth(10)}}>
          <ButtonForm
            disabled={buttonSend}
            lable={'LANJUT'}
            onPress={() => this.onSubmit()}
        />
        </View>}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.profile.getBalance.payload,
    confirmationMoneytProps: state.money.confirmationMoneys.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (param) => dispatch(BalanceAction.getBalanceRequest(param)),
    confirmMoney: (param) => dispatch(BankAction.confirmationMoneyRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferSaldo)
