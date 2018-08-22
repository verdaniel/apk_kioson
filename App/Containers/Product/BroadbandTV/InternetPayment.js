import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage, TouchableOpacity, PermissionsAndroid, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Images} from '../../../Themes/'
import LoadingModal from '../../../Components/Loading'
import FooterFrom from '../../../Components/FooterFrom'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'

// Styles
import styles from '../../Styles/InternetPaymentStyle'
import ModalListContact from '../../../Components/ModalListContact'
import { ratioHeight } from '../../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class InternetPayment extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      width: 0,
      height: 0
    }
    this.submiting = {
      confirmation: false
    }
    this.state = {
      token: '',
      serviceProductChoose: I18n.t('p_internetProvider'),
      idCustomer: '',
      serviceProduct: '',
      serviceProductId: '',
      phoneNumber: '',
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: false,
        phoneNumber: false
      },
      modalLodaing: false,
      presetInternet: [
        {id: 0, operator: 'Telkom Speedy'}
      ],
      borderBottom: false,
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.setState({ token: value })
      }
    })
  }

  onLayout = (e) => {
    console.tron.log(e)
    this.layout.height = e.nativeEvent.layout.height
    this.layout.width = e.nativeEvent.layout.width
  }

  onRequestClose () {
    this.setState({modalLodaing: false})
    this.props.navigation.goBack()
  }

  onChangeTextCustomerId = (text) => {
    const { errorMessage } = this.state
    this.setState({
      idCustomer: text,
      errorMessage: { ...errorMessage, idCustomer: '' }
    })
  }

  onChangeTextNumberPhone = (text) => {
    const { errorMessage } = this.state
    this.setState({
      phoneNumber: text,
      errorMessage: { ...errorMessage, phoneNumber: '' }
    })
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
      { label: I18n.t('ID Pelanggan'), detail: idCustomer },
      { label: I18n.t('l_name'), detail: 'Kiyosaki  Teguh' },
      { label: I18n.t('Nomor Ponsel Pelanggan'), detail: phoneNumber },
      { label: I18n.t('l_period'), detail: 'Januari 2017' }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'mediaInternet',
        titleForm: 'Internet',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
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
      serviceProduct: operator,
      serviceProductId: id,
      serviceProductChoose: operator,
      editable: { ...editable, idCustomer: true }
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
    const { errorMessage, editable, phoneNumber, idCustomer, serviceProductChoose, modalLodaing, presetInternet } = this.state
    let isButtonDisable = this.checkField()
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <PlaceholderModalDropdown
              title={I18n.t('l_internetrovider')}
              leftIcon={Images.ic_internetSmall}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={presetInternet}
              defaultValue={serviceProductChoose}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
            <FormInput
              value={idCustomer}
              editable={editable.idCustomer}
              isLeftVisible
              iconLeft={Images.ic_wireles}
              keyboardType='numeric'
              title={I18n.t('l_idCustomer')}
              placeholder={I18n.t('p_idCustomer')}
              isRightVisible={false}
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, idCustomer: Validator(idCustomer, 'idCustomer')}
                })
                if (errorMessage.idCustomer === '') {
                  this.setState({
                    editable: {...editable, phoneNumber: true}
                  })
                }
              }}
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
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                })
              }}
              iconRight={Images.ic_contact}
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

export default connect(mapStateToProps, mapDispatchToProps)(InternetPayment)
