import React, { Component } from 'react'
import { ScrollView, StatusBar, View, PermissionsAndroid, ToastAndroid, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import { Images } from '../../Themes/index'
import I18n from '../../I18n'
import FormInput from '../../Components/FormInput'
import Validator from '../../Services/Validate'
import ModalListContact from '../../Components/ModalListContact'
import PhoneRedux from '../../Redux/PhoneRedux'

// Styles
import styles from '../Styles/TelkomPaymentStyle'
import { ratioHeight } from '../../Transforms/Resize'

var SelectContacts = require('react-native-select-contact-android')

class TelkomPayment extends Component {
  constructor (props) {
    super(props)
    this.submitting = {
      confirmation: false
    }
    this.state = {
      phoneNumber: '',
      customerPhoneNumber: '',
      message: {
        customerPhoneNumber: '',
        phoneNumber: ''
      },
      modalListContact: false,
      listContact: [],
      token: '',
      modalListContactUser: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { confirmation } = nextProps
    const { navigate } = this.props.navigation

    if (this.submitting.confirmation) {
      if (this.props.confirmation.fetching && !confirmation.fetching) {
        if (confirmation.payload && !confirmation.error) {
          this.submitting = { ...this.submitting, confirmation: false }
          const dataDetail = [
            { label: I18n.t('l_telpNumber'), detail: confirmation.payload.data.customer_id },
            { label: I18n.t('l_customername'), detail: confirmation.payload.data.customer_name },
            { label: I18n.t('l_phonenumber'), detail: confirmation.payload.data.customer_phone },
            { label: I18n.t('l_period'), detail: confirmation.payload.data.due_date }
          ]
          navigate('PaymentConfirmation',
            {
              dataDetail: dataDetail,
              serviceType: 'phone',
              titleForm: 'Telkom',
              dataConfirmation: confirmation.payload.data,
              phoneNumber: confirmation.payload.data.customer_phone
            })
        }
      }
    }
  }

  onChangeTextPhoneNumber = (text) => {
    const {message} = this.state
    this.setState({ phoneNumber: text, message: { ...message, phoneNumber: '' } })
  }

  onChangeTextCustomerPhoneNumber = (text) => {
    const {message} = this.state
    this.setState({ customerPhoneNumber: text, message: { ...message, customerPhoneNumber: '' } })
  }

  onBeliClick () {
    const { phoneNumber, customerPhoneNumber, token } = this.state
    this.props.getConfirmation({
      phoneNumber: phoneNumber,
      customerId: customerPhoneNumber,
      token: token
    })
    this.submitting.confirmation = true
  }

  checkFrom (customerPhoneNumber, phoneNumber) {
    const { message } = this.state
    if ((phoneNumber.length >= 6 && message.phoneNumber === '') && (customerPhoneNumber.length >= 10 && message.customerPhoneNumber === '')) {
      return false
    }
    return true
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
            this.setState({ modalListContact: false, listContact: [], customerPhoneNumber: String(listContact) })
          }
        }
      }
    })
  }

  requestContactUser = async () => {
    try {
      const contactGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Kioson App Read Contact Permission',
          'message': 'Kioson App needs access to your contact'
        }
      )
      if (contactGranted === PermissionsAndroid.RESULTS.GRANTED) {
        this.contactUser()
      } else {
        ToastAndroid.show('Permission Denied', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.tron.log(err)
    }
  }

  contactUser () {
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
            this.setState({listContact: listContact, modalListContactUser: true})
          } else {
            this.setState({ modalListContactUser: false, listContact: [], phoneNumber: String(listContact) })
          }
        }
      }
    })
  }

  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], customerPhoneNumber: number })
  }

  onSelectUser (number) {
    this.setState({ modalListContactUser: false, listContact: [], phoneNumber: number })
  }

  render () {
    const { navigation, confirmation } = this.props
    const { message, customerPhoneNumber, phoneNumber } = this.state
    var isButtonDisable = this.checkFrom(customerPhoneNumber, phoneNumber)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <FormInput
              value={phoneNumber}
              isLeftVisible
              iconLeft={Images.ic_telkombw}
              keyboardType='numeric'
              title={I18n.t('l_telpNumber')}
              onBlur={() => {
                this.setState({ message: {...message, phoneNumber: Validator(phoneNumber, 'phoneNumber')} })
              }}
              placeholder={I18n.t('p_telpNumber')}
              iconRight={Images.ic_contact}
              isRightVisible
              messageError={message.phoneNumber}
              onChangeText={this.onChangeTextPhoneNumber}
              onPressRight={() => this.requestContactUser()}
            />
            <FormInput
              value={customerPhoneNumber}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              title={I18n.t('l_phoneNumberCustomer')}
              placeholder={I18n.t('p_phoneNumber')}
              onBlur={() => {
                this.setState({ message: {...message, customerPhoneNumber: Validator(customerPhoneNumber, 'customerPhoneNumber')} })
              }}
              iconRight={Images.ic_contact}
              isRightVisible
              messageError={message.customerPhoneNumber}
              onChangeText={this.onChangeTextCustomerPhoneNumber}
              onPressRight={() => this.requestContact()}
            />
          </View>
          <FooterFrom />
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.onBeliClick()}
            disabled={false}
            />
        </View>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <ModalListContact data={this.state.listContactUser} onSelect={(data) => this.onSelectUser(data)} isOpen={this.state.modalListContactUser} onClosed={() => this.setState({modalListContactUser: false})} />
        <LoadingModal visible={confirmation.fetching} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    confirmation: state.phone.postConfirmationPhone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConfirmation: (params) => dispatch(PhoneRedux.confirmationPhoneRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TelkomPayment)
