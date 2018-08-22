import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View, TouchableOpacity, ToastAndroid, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/InstallmentPaymentStyle'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import { Images } from '../../Themes/index'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import I18n from '../../I18n'
import Validator from '../../Services/Validate'
import FormInput from '../../Components/FormInput'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import ModalListContact from '../../Components/ModalListContact'
import { ratioHeight } from '../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class InstallmentPayment extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const idCustomer = (params) ? '' + params.item.extra.customer_id : ''

    this.submiting = {
      confirmation: false
    }
    this.state = {
      installmentProvider: I18n.t('p_selectInstallmentProvider'),
      showDropDownProvider: false,
      idCustomer,
      phoneNumber: '',
      serviceProductList: [
        {name: 'Columbia'},
        {name: 'MAF'},
        {name: 'CAF'},
        {name: 'WOMFinance'}
      ],
      serviceProduct: I18n.t('p_selectInstallmentProvider'),
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: false,
        phoneNumber: false
      },
      modalLodaing: false,
      modalListContact: false,
      listContact: []
    }
  }

  onChangeTextCustomerId = (text) => {
    const { errorMessage } = this.state
    this.setState({ idCustomer: text, errorMessage: { ...errorMessage, idCustomer: '' } })
  }

  onChangeTextNumberPhone = (text) => {
    const { errorMessage } = this.state
    this.setState({ phoneNumber: text, errorMessage: { ...errorMessage, phoneNumber: '' } })
  }

  checkField () {
    const { serviceProduct, idCustomer, phoneNumber, errorMessage } = this.state
    if ((serviceProduct !== I18n.t('p_selectInstallmentProvider')) && (idCustomer.length >= 10 && errorMessage.idCustomer === '') && (phoneNumber.length >= 10 && errorMessage.phoneNumber === '')) {
      return false
    }
    return true
  }

  onRequestClose () {
    this.setState({ modalLodaing: false })
    this.props.navigation.goBack()
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.name}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { editable } = this.state
    const { name } = rowData
    this.setState({
      serviceProduct: name,
      editable: { ...editable, idCustomer: true }
    })
    return `${name}`
  }

  onBeliClick () {
    const { phoneNumber } = this.state
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_idCustomer'), detail: '1320990' },
      { label: I18n.t('l_name'), detail: 'Nur Ibrahim Rosyad' },
      { label: I18n.t('l_installmentTo'), detail: 'Columbia' }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'installment',
        titleForm: 'Bayar Angsuran',
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
    const { navigation } = this.props
    const { modalLodaing, serviceProductList, installmentProvider, idCustomer, phoneNumber, errorMessage } = this.state
    let isButtonDisable = this.checkField()
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <PlaceholderModalDropdown
              title={I18n.t('l_selectInstallmentProvider')}
              leftIcon={Images.ic_amount}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={serviceProductList}
              defaultValue={installmentProvider}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
            <FormInput
              value={idCustomer}
              title={I18n.t('l_idCustomer')}
              isLeftVisible
              iconLeft={Images.ic_angsuran_id}
              keyboardType='numeric'
              placeholder={I18n.t('p_idCustomer')}
              maxLength={25}
              iconRight={Images.ic_contact}
              isRightVisible={false}
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, idCustomer: Validator(idCustomer, 'idCustomer')}
                })
              }}
              messageError={errorMessage.idCustomer}
              onChangeText={this.onChangeTextCustomerId}
            />
            <FormInput
              value={phoneNumber}
              title={I18n.t('l_phoneNumberCustomer')}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              placeholder={I18n.t('p_phoneNumber')}
              iconRight={Images.ic_contact}
              isRightVisible
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
          <FooterFrom />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentPayment)
