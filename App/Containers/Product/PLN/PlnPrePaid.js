import React, { Component } from 'react'
import {
  View,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity,
  Text,
  PermissionsAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../../../Themes/index'
import LoadingModal from '../../../Components/Loading'
import FooterFrom from '../../../Components/FooterFrom'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'

// Actions
import PLNActions from '../../../Redux/PlnRedux'

// Styles
import styles from '../../Styles/PlnPrePaidStyle'
import ModalListContact from '../../../Components/ModalListContact'
import ThousandFormat from '../../../Services/ThousandFormat'
import { ratioHeight } from '../../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class PlnPrePaid extends Component {
  constructor (props) {
    super(props)
    const idCustomer = props.data ? props.data.extra.reference_number : ''

    this.submiting = {
      confirmation: false
    }
    this.state = {
      token: '',
      serviceProductChoose: I18n.t('p_AmountValueMobileRecharge'),
      idCustomer,
      amount: '',
      phoneNumber: '',
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: true,
        phoneNumber: false,
        dropdown: true
      },
      modalLodaing: false,
      presetToken: [],
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

  componentWillReceiveProps (nextProps) {
    const { prePaid } = nextProps
    const { editable } = this.state
    if (prePaid !== null) {
      if (prePaid.code === 200 && prePaid.status) {
        if (prePaid.data.length !== 0) {
          this.setState({
            presetToken: prePaid.data,
            modalLodaing: false,
            editable: {...editable, phoneNumber: true}
          })
        }
      } else if (!prePaid.status && prePaid.code !== 0) {
        ToastAndroid.show(prePaid.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        prePaid.code = 0
      }
    }
  }

  onChangeTextCustomerId = (text) => {
    const { errorMessage } = this.state
    this.setState({ idCustomer: text, errorMessage: { ...errorMessage, idCustomer: '' } })
  }

  onBlurCustomerID = () => {
    const { idCustomer, errorMessage, token } = this.state
    this.setState({
      errorMessage: {...errorMessage, idCustomer: Validator(idCustomer, 'idCustomer')}
    })
    if (idCustomer.length >= 10) {
      this.setState({modalLodaing: true})
      this.props.getPlnPrePaid(token, idCustomer)
    }
  }

  onBlurPhoneNumber = () => {
    const { phoneNumber, editable, errorMessage } = this.state
    this.setState({
      errorMessage: {...errorMessage, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
    })
    if (phoneNumber.length >= 10) {
      this.setState({
        editable: {...editable, dropdown: false}
      })
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
    const { idCustomer, phoneNumber, errorMessage, amount } = this.state
    if ((idCustomer.length >= 10 && errorMessage.idCustomer === '') && (phoneNumber.length >= 10 && errorMessage.phoneNumber === '') && amount !== '') {
      return false
    }
    return true
  }

  onBeliClick () {
    const { phoneNumber, idCustomer, amount } = this.state
    var makedPrice = ThousandFormat(+amount)
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_idCustomer'), detail: idCustomer },
      { label: I18n.t('l_name'), detail: 'Nur Ibrahim Rosyad' },
      { label: I18n.t('l_phonenumber'), detail: phoneNumber },
      { label: I18n.t('l_amount'), detail: makedPrice }
    ]
    const data = {
      charge: 6500,
      actual_amount: +amount,
      total_amount: (+amount)
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'powerPrepaid',
        titleForm: 'Token Listrik',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.description}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { description, amount } = rowData
    this.setState({
      amount: amount,
      serviceProductChoose: description
    })
    return `${description}`
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
    const { errorMessage, editable, phoneNumber, idCustomer, serviceProductChoose, modalLodaing, presetToken } = this.state
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
              onBlur={this.onBlurPhoneNumber}
              messageError={errorMessage.phoneNumber}
              onChangeText={this.onChangeTextNumberPhone}
              onPressRight={() => this.contact()}
            />
            <PlaceholderModalDropdown
              title={I18n.t('l_amount')}
              leftIcon={Images.ic_currencyID}
              isLeftVisible
              marginTop={9}
              disabled={editable.dropdown}
              options={presetToken}
              defaultValue={serviceProductChoose}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
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
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prePaid: state.pln.plnPrePaid.payload,
    confirmationPrePaid: state.pln.confirmPrePaid.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlnPrePaid: (token, id) => dispatch(PLNActions.plnPrePaidRequest(token, id)),
    confirmPrePaid: (token, data) => dispatch(PLNActions.confirmPrePaidRequest(token, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlnPrePaid)
