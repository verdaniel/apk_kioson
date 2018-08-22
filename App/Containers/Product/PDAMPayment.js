import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, AsyncStorage, PermissionsAndroid, View, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import styles from '../Styles/InputPdamStyle'
import { Images } from '../../Themes/index'
import PdamRedux from '../../Redux/PdamRedux'
import I18n from '../../I18n'
import FormInput from '../../Components/FormInput'
import Validator from '../../Services/Validate'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import ModalListContact from '../../Components/ModalListContact'
import { ratioHeight } from '../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class PDAMPayment extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const idCustomer = (params) ? '' + params.item.transaction_at : ''

    this.submitting = {
      confirmation: false
    }
    this.state = {
      areaPdam: '',
      areaChoose: I18n.t('p_idCustomerArea'),
      idAreaChoose: '',
      idCustomer,
      phoneNumber: '',
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: false,
        phoneNumber: false
      },
      token: '',
      area: '',
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.getPreset(value)
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { confirmation } = nextProps
    const { navigate } = this.props.navigation

    if (this.submitting.confirmation === true) {
      if (this.props.confirmation.fetching && !confirmation.fetching) {
        if (confirmation.payload && !confirmation.error) {
          this.submitting = { ...this.submitting, confirmation: false }
          const dataDetail = [
              { label: I18n.t('l_orperatorservice'), detail: confirmation.payload.data.operator },
              { label: I18n.t('l_idCustomer'), detail: confirmation.payload.data.customer_id },
              { label: I18n.t('l_customername'), detail: confirmation.payload.data.customer_name },
              { label: I18n.t('l_phonenumber'), detail: confirmation.payload.data.customer_phone },
              { label: I18n.t('l_period'), detail: confirmation.payload.data.due_date },
              { label: I18n.t('l_standMeter'), detail: confirmation.payload.data.stand_meter }
          ]
          navigate('PaymentConfirmation',
            {
              dataDetail: dataDetail,
              serviceType: 'water',
              titleForm: 'Air PDAM',
              dataConfirmation: confirmation.payload.data,
              serviceProductId: this.state.idAreaChoose,
              phoneNumber: confirmation.payload.data.customer_phone
            })
        }
      }
    }
  }

  onChangeTextCustomerId = (text) => {
    const { isError } = this.state
    this.setState({ idCustomer: text, isError: { ...isError, idCustomer: true } })
  }

  onChangeTextNumberPhone = (text) => {
    const { isError } = this.state
    this.setState({ phoneNumber: text, isError: { ...isError, phoneNumber: true } })
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

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onClickAmount(item.id, item.operator)}
        style={styles.list}>
        <Text style={styles.textFieldDropDown}>
          {item.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  onClickAmount (id, name) {
    const { editable } = this.state
    this.setState({
      idAreaChoose: id,
      areaChoose: name,
      showDropDown: false,
      editable: { ...editable, idCustomer: true }
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
      area: operator,
      idAreaChoose: id,
      areaChoose: operator,
      showDropDown: false,
      editable: { ...editable, idCustomer: true }
    })
    return `${operator}`
  }

  checkField () {
    const { idCustomer, phoneNumber, errorMessage } = this.state
    if ((idCustomer.length >= 10 && errorMessage.idCustomer === '') && (phoneNumber.length >= 10 && errorMessage.phoneNumber === '')) {
      return false
    }
    return true
  }

  confirmOrder () {
    const { phoneNumber, idAreaChoose, idCustomer, token } = this.state
    this.props.postConfirm({
      serviceProductId: idAreaChoose,
      phoneNumber: phoneNumber,
      idCustomer: idCustomer,
      tokens: token
    })
    this.submitting.confirmation = true
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
    const { navigation, preset, confirmation } = this.props
    const {errorMessage, editable, phoneNumber, idCustomer, areaChoose} = this.state
    let isButtonDisable = this.checkField()
    var tempPreset = preset.payload ? preset.payload.data : []

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <PlaceholderModalDropdown
              title={I18n.t('l_areaWater')}
              leftIcon={Images.ic_area}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={tempPreset}
              defaultValue={areaChoose}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
              borderBottom={false}
            />
            <FormInput
              value={idCustomer}
              editable={editable.idCustomer}
              iconLeft={Images.ic_drop}
              isLeftVisible
              keyboardType='numeric'
              title={I18n.t('l_idCustomerPdam')}
              placeholder={I18n.t('p_idCustomer')}
              isRightVisible={false}
              onBlur={this.onBlurCustomerID}
              onPressRight={() => {}}
              iconRight={Images.ic_close_grey}
              messageError={errorMessage.idCustomer}
              onChangeText={this.onChangeTextCustomerId}
            />
            <FormInput
              value={phoneNumber}
              title={I18n.t('l_phoneNumberCustomer')}
              editable={editable.phoneNumber}
              iconLeft={Images.ic_user}
              isLeftVisible
              keyboardType='numeric'
              placeholder={I18n.t('p_phoneNumber')}
              isRightVisible
              iconRight={Images.ic_contact}
              messageError={errorMessage.phoneNumber}
              onChangeText={this.onChangeTextNumberPhone}
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                })
              }}
              onPressRight={() => this.requestContact()}
            />
          </View>
          <FooterFrom title={I18n.t('l_footer')} />
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.confirmOrder()}
            disabled={isButtonDisable}
            />
        </View>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={preset.fetching || confirmation.fetching} onRequestClose={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    preset: state.pdam.getPdam,
    confirmation: state.pdam.postConfirmationPdam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreset: (param) => dispatch(PdamRedux.pdamRequest(param)),
    postConfirm: (param) => dispatch(PdamRedux.confirmationPdamRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PDAMPayment)
