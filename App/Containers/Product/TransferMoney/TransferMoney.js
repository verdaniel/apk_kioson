import React, { Component } from 'react'
import { ScrollView, Text, ToastAndroid, AsyncStorage, PermissionsAndroid, View, StatusBar, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CashBalance from '../../../Components/CashBalance'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import BankAction from '../../../Redux/MoneyRedux'
import LoadingModal from '../../../Components/Loading'
import FooterFrom from '../../../Components/FooterFrom'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'

// Styles
import styles from '../../Styles/TransferMoneyStyle'
import { Colors, Images } from '../../../Themes/index'
import { ratioHeight } from '../../../Transforms/Resize'
import ModalListContact from '../../../Components/ModalListContact'
var SelectContacts = require('react-native-select-contact-android')

class TransferMoney extends Component {
  constructor (props) {
    super(props)
    this.submitting = {
      confirmation: false
    }
    this.state = {
      showDropDownBank: false,
      keyboardShow: false,
      bankChoose: I18n.t('p_bankChoose'),
      idbankChoose: '',
      destinationNumber: '',
      destinationName: 'Nur Ibrahim Rosyad',
      editableAccountNumber: false,
      transferAmount: '',
      senderName: '',
      senderMobileNumber: '',
      listBank: [],
      alert: {
        destinationNumber: '',
        transferAmount: '',
        senderName: '',
        senderMobileNumber: ''
      },
      editable: {
        destinationNumber: false,
        transferAmount: false,
        senderName: false,
        senderMobileNumber: false
      },
      token: '',
      modalLodaing: true,
      modalListContact: false,
      listContact: []
    }
  }

  componentWillReceiveProps (nextProps) {
    const { bankPresetProps, confirmationMoneytProps } = nextProps
    if (bankPresetProps !== this.props.bankPresetProps && bankPresetProps) {
      if (bankPresetProps.code === 200 && bankPresetProps.status) {
        if (bankPresetProps.data.length !== 0) {
          this.setState({
            listBank: bankPresetProps.data,
            modalLodaing: false
          })
        }
      } else if (!bankPresetProps.status && bankPresetProps.code !== 0) {
        ToastAndroid.show(bankPresetProps.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        bankPresetProps.code = 0
      }
    }

    if (confirmationMoneytProps !== this.props.confirmationMoneytProps && confirmationMoneytProps) {
      if (confirmationMoneytProps.code === 200 && confirmationMoneytProps.status && this.submitting.confirmation) {
        this.submitting = { ...this.submitting, confirmation: false }
        this.setState({
          modalLodaing: false
        })
        this.props.navigation.navigate('PaymentConfirmationTransferMoney',
          {
            data: confirmationMoneytProps.data,
            serviceProductId: this.state.idbankChoose,
            token: this.state.token
          })
        // const dataDetail = [
        //   { label: 'Bank Tujuan', detail: destinationNumber },
        //   { label: 'Nomor Rekening', detail: confirmationMoneytProps.data.holder_name },
        //   { label: 'Nama Penerima', detail: confirmationMoneytProps.data.amount },
        //   { label: 'Jumlah Transfer', detail: confirmationMoneytProps.data.amount },
        //   { label: 'Nama Penerima', detail: confirmationMoneytProps.data.amount }
        // ]
        // this.props.navigation.navigate('PaymentConfirmation',
        //   {
        //     dataDetail: dataDetail,
        //     serviceType: 'transferSaldo',
        //     titleForm: 'Transfer Saldo',
        //     dataConfirmation: confirmationMoneytProps.data
        //   })
      } else if (!confirmationMoneytProps.status && confirmationMoneytProps.code !== 0) {
        ToastAndroid.show(confirmationMoneytProps.message, ToastAndroid.SHORT)
        confirmationMoneytProps.code = 0
      }
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.bankPreset('')
      } else {
        this.props.bankPreset(value)
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

  resetForm () {
    this.setState({
      showDropDownBank: false,
      alert: {
        destinationNumber: '',
        transferAmount: '',
        senderName: '',
        senderMobileNumber: ''
      },
      bankChoose: I18n.t('p_bankChoose'),
      idbankChoose: '',
      destinationNumber: '',
      destinationName: 'Nur Ibrahim Rosyad',
      editableAccountNumber: false,
      transferAmount: '',
      senderName: '',
      senderMobileNumber: '',
      marginBottom: {
        destinationNumber: 3,
        transferAmount: 3,
        senderName: 3,
        senderMobileNumber: 3
      },
      errorMessage: {
        destinationNumber: '',
        transferAmount: '',
        senderName: '',
        senderMobileNumber: ''
      },
      editable: {
        destinationNumber: false,
        transferAmount: false,
        senderName: false,
        senderMobileNumber: false
      }
    })
  }

  paymentProcces () {
    this.setState({modalLodaing: true})
    this.props.confirmMoney({
      serviceProductId: this.state.idbankChoose,
      holderAccountNumber: this.state.destinationNumber,
      holderName: this.state.destinationName,
      phoneNumber: this.state.senderMobileNumber,
      senderName: this.state.senderName,
      amount: this.state.transferAmount,
      token: this.state.token
    })
    this.submitting.confirmation = true
  }

  checkFormAfterValidate () {
    const { transferAmount, senderName, senderMobileNumber, alert } = this.state
    if ((transferAmount === 0 || transferAmount === '' || alert.transferAmount !== '') ||
      (senderName.length < 4 || alert.senderName !== '') ||
      (senderMobileNumber.length < 10 || alert.senderMobileNumber !== '')) {
      return true
    } else {
      return false
    }
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { editable } = this.state
    const { operator, id } = rowData
    this.setState({
      editable: {...editable, destinationNumber: true},
      bankChoose: operator,
      idbankChoose: id
    })
    return `${operator}`
  }

  requestContact = async () => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        this.contact()
      } else {
        ToastAndroid.show('Permission Denied', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  contact () {
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
            this.setState({listContact: listContact, modalListContact: true})
          } else {
            this.setState({ modalListContact: false, listContact: [], senderMobileNumber: String(listContact) })
          }
        }
      }
    })
  }
  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], senderMobileNumber: number })
  }

  render () {
    const { navigation } = this.props
    const {modalLodaing, editable, bankChoose, destinationNumber, alert, transferAmount, senderName, senderMobileNumber} = this.state
    // let buttonValidate = this.checkFormBeforeValidate()
    let buttonSend = this.checkFormAfterValidate()
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={{backgroundColor: Colors.white_two, paddingBottom: ratioHeight(10)}}>
              <PlaceholderModalDropdown
                isLeftVisible
                leftIcon={Images.ic_bank}
                marginTop={9}
                disabled={false}
                options={this.state.listBank}
                defaultValue={bankChoose}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                title={I18n.t('l_destinationBank')}
            />
              <FormInput
                value={destinationNumber}
                editable={editable.destinationNumber}
                isLeftVisible
                iconLeft={Images.ic_senderNumber}
                keyboardType='numeric'
                title={I18n.t('l_accountnumberDestination')}
                placeholder={I18n.t('p_accountNumber')}
                iconRight={Images.ic_contact}
                isRightVisible={false}
                onBlur={() => {
                  var isValid = Validator(destinationNumber, 'destinationNumber')
                  this.setState({ alert: {...alert, destinationNumber: isValid} })
                  if (isValid === '' && destinationNumber.length >= 10) {
                    this.setState({ editable: {...editable, transferAmount: true} })
                  }
                }}
                messageError={alert.destinationNumber}
                onChangeText={(text) => this.setState({destinationNumber: text})}
            />
            </View>
            <View style={{height: ratioHeight(10)}} />
            <View style={{backgroundColor: Colors.white_two, paddingBottom: ratioHeight(10)}}>
              <FormInput
                value={transferAmount}
                editable={editable.transferAmount}
                isLeftVisible
                iconLeft={Images.ic_amount_trasfer}
                keyboardType='numeric'
                title={I18n.t('p_transferamount')}
                placeholder={I18n.t('p_12xxxx')}
                iconRight={Images.ic_contact}
                isRightVisible={false}
                onBlur={() => {
                  var isValid = Validator(+transferAmount, 'trasferAmount')
                  this.setState({ alert: {...alert, transferAmount: isValid} })
                  if (isValid === '' && transferAmount >= 10000) {
                    this.setState({ editable: {...editable, senderName: true} })
                  }
                }}
                messageError={alert.transferAmount}
                onChangeText={(text) => this.setState({transferAmount: text})}
            />
              <FormInput
                value={senderName}
                editable={editable.senderName}
                isLeftVisible
                iconLeft={Images.ic_private}
                keyboardType='default'
                title={I18n.t('p_senderName')}
                placeholder={I18n.t('p_acdefg')}
                isRightVisible={false}
                onBlur={() => {
                  var isValid = Validator(senderName, 'senderName')
                  this.setState({ alert: {...alert, senderName: isValid} })
                  if (isValid === '' && senderName.length > 0) {
                    this.setState({ editable: {...editable, senderMobileNumber: true} })
                  }
                }}
                messageError={alert.senderName}
                onChangeText={(text) => this.setState({senderName: text})}
            />
              <FormInput
                value={senderMobileNumber}
                editable={editable.senderMobileNumber}
                isLeftVisible
                iconLeft={Images.ic_user}
                keyboardType='numeric'
                title={I18n.t('l_phonenumber')}
                placeholder={I18n.t('p_phoneNumber')}
                iconRight={Images.ic_contact}
                isRightVisible
                onBlur={() => {
                  var isValid = Validator(senderMobileNumber, 'customerPhoneNumber')
                  this.setState({ alert: {...alert, senderMobileNumber: isValid} })
                }}
                messageError={alert.senderMobileNumber}
                onPressRight={() => this.requestContact()}
                onChangeText={(text) => this.setState({senderMobileNumber: text})}
            />
            </View>
            <FooterFrom title={'Pastikan nama pengirim dan nomor hp pengirim benar'} />
          </View>
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15), backgroundColor: Colors.white}} >
          <ButtonForm
            onPress={() => this.paymentProcces()}
            disabled={buttonSend}
            />
        </View>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bankPresetProps: state.money.bankPreset.payload,
    confirmationMoneytProps: state.money.confirmationMoneys.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    bankPreset: (param) => dispatch(BankAction.bankPresetRequest(param)),
    confirmMoney: (param) => dispatch(BankAction.confirmationMoneyRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferMoney)
