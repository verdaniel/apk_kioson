import React, { Component } from 'react'
import {
  View,
  ScrollView,
  AsyncStorage,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../../../Themes/index'
import Loading from '../../../Components/Loading'
import FooterFrom from '../../../Components/FooterFrom'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'

// Actions
import PLNActions from '../../../Redux/PlnRedux'

// Styles
import styles from '../../Styles/PlnPrePaidStyle'
import ModalListContact from '../../../Components/ModalListContact'
import { ratioHeight } from '../../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class PlnPostPaid extends Component {
  constructor (props) {
    super(props)
    const idCustomer = props.data ? props.data.extra.reference_number : ''

    this.layout = {
      WidthAmount: 0,
      yPosition: 0
    }
    this.submiting = {
      confirmation: false
    }
    this.state = {
      token: '',
      idCustomer,
      phoneNumber: '',
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: true,
        phoneNumber: false
      },
      modalLodaing: false,
      borderBottom: false,
      modalListContact: false,
      listContact: []
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

  onChangeTextCustomerId = (text) => {
    const { errorMessage } = this.state
    this.setState({
      idCustomer: text,
      errorMessage: { ...errorMessage, idCustomer: '' }
    })
  }

  onBlurCustomerID = () => {
    const { idCustomer, errorMessage, editable } = this.state
    this.setState({
      errorMessage: {...errorMessage, idCustomer: Validator(idCustomer, 'idCustomer')}
    })
    if (idCustomer.length >= 10) {
      this.setState({editable: {...editable, phoneNumber: true}})
    }
  }

  onChangeTextNumberPhone = (text) => {
    const { errorMessage } = this.state
    this.setState({
      phoneNumber: text,
      errorMessage: { ...errorMessage, phoneNumber: '' }
    })
  }

  onRequestClose () {
    this.setState({modalLodaing: false})
    this.props.navigation.goBack()
  }

  checkField () {
    const { idCustomer, phoneNumber, errorMessage } = this.state
    if ((idCustomer.length >= 10 && errorMessage.idCustomer === '') && (phoneNumber.length >= 10 && errorMessage.phoneNumber === '')) {
      return false
    }
    return true
  }

  onBeliClick () {
    const { idCustomer, phoneNumber } = this.state
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_idCustomer'), detail: idCustomer },
      { label: I18n.t('l_customername'), detail: 'Kiyosaki  Teguh' },
      { label: I18n.t('l_phonenumber'), detail: phoneNumber },
      { label: I18n.t('l_period'), detail: 'Januari 2017' },
      { label: I18n.t('l_standMeter'), detail: '100-200' }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'powerPostpaid',
        titleForm: 'Tagihan Listrik',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
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
            this.setState({ modalListContact: false, listContact: [], phoneNumber: String(listContact) })
          }
        }
      }
    })
  }

  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], phoneNumber: number })
  }

  render () {
    const { errorMessage, editable, phoneNumber, idCustomer, modalLodaing } = this.state
    let isButtonDisable = this.checkField()
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <FormInput
              value={idCustomer}
              editable={editable.idCustomer}
              isLeftVisible
              iconLeft={Images.ic_listrik}
              keyboardType='numeric'
              title={I18n.t('l_idCustomerPdam')}
              placeholder={I18n.t('p_idCustomer')}
              isRightVisible={false}
              onBlur={this.onBlurCustomerID}
              messageError={errorMessage.idCustomer}
              onChangeText={this.onChangeTextCustomerId}
            />
            <FormInput
              value={phoneNumber}
              editable={editable.phoneNumber}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              title={I18n.t('l_phonenumber')}
              placeholder={I18n.t('p_phoneNumber')}
              isRightVisible
              iconRight={Images.ic_contact}
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                })
              }}
              messageError={errorMessage.phoneNumber}
              onChangeText={this.onChangeTextNumberPhone}
              onPressRight={() => this.requestContact()}
            />
          </View>
          <FooterFrom title={I18n.t('l_footer')} />
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.onBeliClick()}
            disabled={isButtonDisable}
            />
        </View>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <Loading visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    confirmationPostPaid: state.pln.confirmPostPaid.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmPostPaid: (token, data) => dispatch(PLNActions.confirmPostPaidRequest(token, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlnPostPaid)
