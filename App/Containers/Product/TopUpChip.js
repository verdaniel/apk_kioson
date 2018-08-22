import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, AsyncStorage, StatusBar, Text, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import accounting from 'accounting'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ChipActions from '../../Redux/ChipRedux'
import CashBalance from '../../Components/CashBalance'
import ButtonForm from '../../Components/ButtonForm'
import FooterFrom from '../../Components/FooterFrom'
import LoadingModal from '../../Components/Loading'
import PhoneIdentifier from '../../Services/PhoneIdentifier'
import I18n from '../../I18n'
import FormInput from '../../Components/FormInput'
import Validator from '../../Services/Validate'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'

// Styles
import styles from '../Styles/TopUpChipStyle'
import { Images, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import ModalListContact from '../../Components/ModalListContact'
var SelectContacts = require('react-native-select-contact-android')

class TopUpChip extends Component {
  constructor (props) {
    super(props)
    this.submitting = {
      confirmation: false
    }
    this.isDisable = true
    this.state = {
      phoneNumber: '',
      unitNumber: '',
      nominalNumber: '',
      errorMessages: {
        phoneNumber: '',
        unitNumber: '',
        nominalNumber: ''
      },
      buttonDisable: true,
      isDropDownDisable: true,
      showDropDown: false,
      serviceProductId: '',
      serviceProduc: '',
      keyboardShow: true,
      serviceProductChoose: I18n.t('p_chooseProduct'),
      price: 0,
      presetChip: props.chip,
      serviceProductList: [],
      modalLodaing: true,
      providerCustomer: '',
      editablePhoneNumber: false,
      token: '',
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.getChip('')
      } else {
        this.props.getChip(value)
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (newProps) {
    const { chip, confrimChipProps } = newProps
    if (chip !== null) {
      if (chip.code === 200 && chip.status) {
        if (chip.data.length !== 0) {
          this.setState({
            presetChip: chip,
            modalLodaing: false,
            editablePhoneNumber: true
          })
        }
      } else if (!chip.status && chip.code !== 0) {
        ToastAndroid.show(chip.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        chip.code = 0
      }
    }

    if (confrimChipProps !== null) {
      if (confrimChipProps.code === 200 && confrimChipProps.status && this.submitting.confirmation) {
        this.submitting = { ...this.submitting, confirmation: false }
        if (confrimChipProps.data.length !== 0) {
          this.setState({
            modalLodaing: false
          })
        }
        this.setState({
          modalLodaing: false
        })
      } else if (!confrimChipProps.status && confrimChipProps.code !== 0) {
        ToastAndroid.show(confrimChipProps.message, ToastAndroid.SHORT)
        confrimChipProps.code = 0
      }
    }
  }

  resetFormNumberPhone () {
    const { errorMessages } = this.state
    this.setState({ errorMessages: { ...errorMessages, phoneNumber: '' } })
  }

  onChangeTextNumberPhone = (text) => {
    var providerCustomer = PhoneIdentifier(text, 'chip')
    this.setState({ phoneNumber: text, providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_AmountValueMobileRecharge'), serviceProductId: '' })
    this.resetFormNumberPhone()
  }

  onChangeTextUnit = (text) => {
    this.setState({ unitNumber: text })
  }

  onChangeTextNominal = (text) => {
    this.setState({ nominalNumber: accounting.formatNumber(text) })
  }

  onBlurUnit = () => {
    const { unitNumber, keyboardShow } = this.state
    if (unitNumber.length > 0) {
      this.setState({buttonDisable: false, keyboardShow: !keyboardShow})
    }
  }

  onBlurNominal = () => {
    const { nominalNumber, keyboardShow } = this.state
    if (nominalNumber.length > 6) {
      this.setState({buttonDisable: false, keyboardShow: !keyboardShow})
    }
  }

  formatValue (value) {
    return accounting.formatNumber(value)
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
    const { phoneNumber } = this.state
    const { id, description, amount } = rowData
    if (phoneNumber.length <= 10) {
      this.setState({ unitNumber: '', nominalNumber: '', serviceProductId: id, price: amount, serviceProduc: description, showDropDown: false, errorNumber: true, errorMessages: 'Masukkan nomor ponsel anda dengan benar', isDropDownDisable: true })
    } else {
      this.setState({ unitNumber: '', nominalNumber: '', serviceProductId: id, price: amount, serviceProduc: description, showDropDown: false })
    }
    return `${description}`
  }

  renderLogoProvider (value) {
    var providerCustomer = PhoneIdentifier(value)
    if (providerCustomer === 'Unknown') {
      return null
    } else {
      return (
        <Text style={{fontFamily: Fonts.type.productSansRegular, fontSize: moderateScale(Fonts.size.small), marginRight: moderateScale(15)}}>{providerCustomer}</Text>
      )
    }
    // return (
    //   <Image source={Images.ic_provider} style={styles.iconRectangle} resizeMode='contain' />
    // )
  }

  onBeliClick (phoneNumber, amountChoose) {
      // this.setState({
      //   modalLodaing: true
      // })
      // this.amount = +this.state.nominalNumber.replace(/,/g, '')
      // this.props.postConfirmChip({
      //   serviceProductId: this.state.serviceProductId,
      //   qty: this.state.unitNumber,
      //   amount: this.amount
      // })
      // this.submitting.confirmation = true
    const { navigate } = this.props.navigation
    const dataDetail = [
        { label: I18n.t('l_product'), detail: 'XL SALDO 125000' },
        { label: I18n.t('l_phoneNumberCustomer'), detail: phoneNumber }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'chips',
        titleForm: 'Top Up Chip',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
  }

  onRequestClose () {
    this.setState({modalLodaing: false})
    this.props.navigation.goBack()
  }

  renderUnit (serviceProductId, amount) {
    const { errorMessages, keyboardShow, editablePhoneNumber, nominalNumber, unitNumber } = this.state
    var border = false
    if (errorMessages.phoneNumber !== '') {
      border = true
    }

    if (serviceProductId !== '') {
      if (this.state.price === 0) {
        return (
          <FormInput
            value={nominalNumber}
            editable={editablePhoneNumber}
            iconLeft={Images.ic_currencyID}
            isLeftVisible
            keyboardType='numeric'
            title={I18n.t('l_amount')}
            placeholder={I18n.t('p_writeNominal')}
            maxLength={13}
            isRightVisible={false}
            onBlur={() => this.onBlurNominal()}
            onFocus={() => this.setState({keyboardShow: !keyboardShow})}
            messageError={errorMessages.nominalNumber}
            onChangeText={this.onChangeTextNominal}
            borderBottom={border}
          />
        )
      } else {
        return (
          <FormInput
            value={unitNumber}
            editable
            iconLeft={Images.ic_hastag}
            isLeftVisible
            keyboardType='numeric'
            title={I18n.t('l_unit')}
            placeholder={I18n.t('p_unitAmount')}
            maxLength={13}
            isRightVisible={false}
            onBlur={() => this.onBlurUnit()}
            onFocus={() => this.setState({keyboardShow: !keyboardShow})}
            messageError={errorMessages.unitNumber}
            onChangeText={this.onChangeTextUnit}
            borderBottom={border}
          />
        )
      }
    }
  }

  checkForm (phoneNumber, serviceProductId) {
    const { errorMessages, unitNumber, nominalNumber } = this.state
    if ((phoneNumber.length >= 10 && errorMessages.phoneNumber === '') || (unitNumber === '') || (nominalNumber === '')) {
      return false
    }
    return true
  }

  contact () {
    var listContact = []
    SelectContacts.pickContact({timeout: 45000}, (err, contact) => {
      if (contact.phoneNumbers) {
        listContact = contact.phoneNumbers.map((data, i) => {
          var number = data.number.replace('+62', '0').replace(/\D+/g, '')
          return number
        })
        if (listContact.length > 1) {
          this.setState({listContact: listContact, modalListContact: true})
        } else {
          var providerCustomer = PhoneIdentifier(String(listContact), 'chip')
          var serviceProductList = this.state.presetChip.data.find((item) => item.operator === providerCustomer)
          this.setState({ modalListContact: false, listContact: [], serviceProductList: serviceProductList, phoneNumber: String(listContact), providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_chooseProduct'), serviceProductId: '' })
        }
      }
    })
  }

  onSelect (number) {
    var providerCustomer = PhoneIdentifier(number, 'chip')
    var serviceProductList = this.state.presetChip.data.find((item) => item.operator === providerCustomer)
    this.setState({ modalListContact: false, listContact: [], serviceProductList: serviceProductList, phoneNumber: number, providerCustomer: providerCustomer, serviceProductChoose: I18n.t('p_chooseProduct'), serviceProductId: '' })
  }

  render () {
    const { navigation } = this.props
    const { presetChip, providerCustomer, keyboardShow, buttonDisable, amountValue, serviceProductChoose, phoneNumber, serviceProductId, modalLodaing, serviceProductList, errorMessages } = this.state
    var isDropDownDisable = true
    if (errorMessages.phoneNumber === '' && phoneNumber.length >= 10) {
      isDropDownDisable = false
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView stickyHeaderIndices={[0]}>
          <CashBalance navigation={navigation} />
          <View style={styles.form}>
            <FormInput
              value={phoneNumber}
              editable
              iconLeft={Images.ic_user}
              isLeftVisible
              keyboardType='numeric'
              title={I18n.t('l_chipNumber')}
              placeholder={I18n.t('p_phoneNumber')}
              isRightVisible
              onBlur={() => {
                var isValid = Validator(phoneNumber, 'customerPhoneNumberMobile')
                if (phoneNumber.length >= 10 && isValid === '') {
                  var serviceProductList = presetChip.data.find((item) => item.operator === providerCustomer)
                  this.setState({
                    serviceProductList: serviceProductList
                  })
                }
                this.setState({
                  errorMessages: {...errorMessages, phoneNumber: isValid},
                  keyboardShow: !keyboardShow
                })
              }}
              onFocus={() => this.setState({keyboardShow: !keyboardShow})}
              iconRight={Images.ic_contact}
              messageError={errorMessages.phoneNumber}
              label={this.renderLogoProvider(phoneNumber)}
              onChangeText={this.onChangeTextNumberPhone}
              onPressRight={() => this.contact()}
            />
            <PlaceholderModalDropdown
              title={'Produk'}
              leftIcon={Images.ic_amount}
              isLeftVisible
              marginTop={9}
              disabled={isDropDownDisable}
              options={serviceProductList.service_products}
              defaultValue={serviceProductChoose}
              renderRow={this.renderRow.bind(this)}
              renderButtonText={(rowData) => this.renderButtonText(rowData)}
              borderBottom={false}
            />
            {this.renderUnit(serviceProductId)}
          </View>
          <FooterFrom />
        </ScrollView>
        {keyboardShow === true ? <ButtonForm
          onPress={() => this.onBeliClick(phoneNumber, amountValue)}
          disabled={buttonDisable}
        /> : <View />}
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chip: state.chip.getChip.payload,
    confrimChipProps: state.chip.postConfirmationChip.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChip: (param) => dispatch(ChipActions.chipRequest(param)),
    postConfirmChip: (param) => dispatch(ChipActions.confirmationChipRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUpChip)
