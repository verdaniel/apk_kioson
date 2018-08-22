import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StatusBar, AsyncStorage, ToastAndroid, ScrollView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images } from '../../Themes'
import voucherGameAction from '../../Redux/VoucherGame'
import styles from '../Styles/VoucherGameStyle'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import I18n from '../../I18n'
import Validator from '../../Services/Validate'
import FormInput from '../../Components/FormInput'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import ModalListContact from '../../Components/ModalListContact'
var SelectContacts = require('react-native-select-contact-android')

class VoucherGame extends Component {
  constructor (props) {
    super(props)
    this.submiting = {
      confirmation: false
    }
    this.state = {
      presetVoucer: '',
      presetVoucerGame: I18n.t('p_selectVoucherProvider'),
      presetVoucerService: '',
      presetVoucerGameService: I18n.t('p_AmountValueMobileRecharge'),
      disableAmount: true,
      cellphone: '',
      enableScrolling: false,
      price: 0,
      listVoucerGame: [],
      listVoucerGameService: [],
      idVoucerGame: 0,
      idVoucerGameService: 0,
      token: '',
      isDisable: {
        presetVoucerGame: false,
        presetVoucerGameService: false,
        cellphone: false
      },
      showDropdownpresetVoucerGame: false,
      showDropdownpresetVoucerGameService: false,
      errorMessage: {
        cellphone: ''
      },
      modalLodaing: true,
      keyboardShow: true,
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.getProvider('')
      } else {
        this.props.getProvider(value)
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { dataProvider, dataServices, dataBill } = nextProps
    const { navigate } = this.props.navigation
    const { cellphone, idVoucerGameService, presetVoucerGame, presetVoucerGameService } = this.state

    if (dataProvider !== null) {
      if (dataProvider.code === 200 && dataProvider.status) {
        this.setState({
          listVoucerGame: dataProvider.data,
          modalLodaing: false
        })
      } else if (!dataProvider.status && dataProvider.code !== 0) {
        ToastAndroid.show(dataProvider.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        dataProvider.code = 0
      }
    }

    if (dataServices !== null) {
      if (dataServices.code === 200 && dataServices.status) {
        this.setState({
          listVoucerGameService: dataServices.data
        })
      } else if (dataServices.code !== undefined && dataServices.code !== 200) {
        ToastAndroid.show(dataServices.message, ToastAndroid.SHORT)
        dataServices.code = undefined
      }
    }

    if (dataBill !== null) {
      if (dataBill.code === 200 && dataBill.status && this.submiting.confirmation) {
        this.submitting = { ...this.submitting, confirmation: false }
        if (dataBill.data.length !== 0) {
          this.setState({modalLodaing: false})
          const dataDetail = [
            { label: I18n.t('l_product'), detail: presetVoucerGame + ' ' + presetVoucerGameService },
            { label: I18n.t('l_phoneNumberCustomer'), detail: cellphone }
          ]
          navigate('PaymentConfirmation',
            {
              dataDetail: dataDetail,
              serviceType: 'voucherGame',
              titleForm: 'Voucher Game',
              dataConfirmation: dataBill.data,
              serviceProductId: idVoucerGameService,
              phoneNumber: cellphone
            })
        }
      } else if (!dataBill.status && dataBill.code !== 0) {
        ToastAndroid.show(dataBill.message, ToastAndroid.SHORT)
        dataBill.code = 0
      }
    }
  }

  onChangeTextNumberPhone = (text) => {
    const { errorMessage } = this.state
    this.setState({ cellphone: text, errorMessage: { ...errorMessage, cellphone: '' } })
  }

  renderItemPresetVoucherGame (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  presetVoucherGamePress (rowData) {
    const { isDisable, token } = this.state
    const { operator, id } = rowData
    this.setState({
      presetVoucer: operator,
      presetVoucerGame: operator,
      idVoucerGame: id,
      isDisable: { ...isDisable, presetVoucerGameService: false },
      listVoucerGameService: [],
      presetVoucerGameService: I18n.t('p_selectVoucherProvider'),
      modalLodaing: true
    })
    this.props.getService({ id: id, token: token })
    return `${operator}`
  }

  renderItemPresetVoucherGameService (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.description}
        </Text>
      </TouchableOpacity>
    )
  }

  presetVoucherGameServicePress (rowData) {
    const { isDisable } = this.state
    const { description, id, amount } = rowData
    this.setState({
      presetVoucerService: description,
      presetVoucerGameService: description,
      price: amount,
      idVoucerGameService: id,
      isDisable: {...isDisable, cellphone: true}
    })
    return `${description}`
  }

  onRequestClose () {
    this.setState({ modalLodaing: false })
    this.props.navigation.goBack()
  }

  checkForm () {
    if (this.state.idVoucerGame === 0 || this.state.idVoucerGameService === 0 || this.state.cellphone.length < 10) {
      return true
    } else {
      return false
    }
  }

  purchase = () => {
    const { cellphone, idVoucerGameService, token } = this.state
    this.setState({modalLodaing: true})
    this.props.getBill({
      id: idVoucerGameService,
      phoneNumber: cellphone,
      token: token
    })
    this.submiting.confirmation = true
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
          this.setState({ modalListContact: false, listContact: [], cellphone: String(listContact) })
        }
      }
    })
  }

  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], cellphone: number })
  }

  render () {
    const { navigation } = this.props
    const { keyboardShow, presetVoucerGame, presetVoucerGameService, isDisable, modalLodaing, errorMessage, cellphone, listVoucerGame, listVoucerGameService } = this.state
    var checkButton = this.checkForm()
    var border = false
    if (errorMessage.cellphone !== '') {
      border = true
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView stickyHeaderIndices={[0]}>
          <CashBalance navigation={navigation} />
          <View style={styles.form}>
            <PlaceholderModalDropdown
              title={I18n.t('l_selectVoucherProvider')}
              leftIcon={Images.ic_gamepad}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={listVoucerGame}
              defaultValue={presetVoucerGame}
              renderRow={this.renderItemPresetVoucherGame.bind(this)}
              renderButtonText={(rowData) => this.presetVoucherGamePress(rowData)}
            />
            <PlaceholderModalDropdown
              title={I18n.t('l_amount')}
              leftIcon={Images.ic_amount}
              isLeftVisible
              marginTop={9}
              disabled={isDisable.presetVoucerGameService}
              options={listVoucerGameService}
              defaultValue={presetVoucerGameService}
              renderRow={this.renderItemPresetVoucherGameService.bind(this)}
              renderButtonText={(rowData) => this.presetVoucherGameServicePress(rowData)}
            />
            <FormInput
              value={cellphone}
              title={I18n.t('l_phoneNumberCustomer')}
              placeholder={I18n.t('p_phoneNumber')}
              editable={isDisable.cellphone}
              iconLeft={Images.ic_user}
              isLeftVisible
              keyboardType='numeric'
              isRightVisible
              iconRight={Images.ic_contact}
              onBlur={() => {
                this.setState({
                  errorMessage: {...errorMessage, cellphone: Validator(cellphone, 'customerPhoneNumber')},
                  keyboardShow: !keyboardShow
                })
              }}
              onFocus={() => this.setState({keyboardShow: !keyboardShow})}
              messageError={errorMessage.cellphone}
              onChangeText={this.onChangeTextNumberPhone}
              borderBottom={border}
              onPressRight={() => this.contact()}
            />
          </View>
          <FooterFrom title={'Pastikan data yang Anda isi benar'} />
        </ScrollView>
        {keyboardShow === true ? <ButtonForm
          onPress={() => this.purchase()}
          disabled={checkButton}
        /> : <View />}
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProvider: state.vouchergame.getProvider.payload,
    dataServices: state.vouchergame.getService.payload,
    dataBill: state.vouchergame.getBill.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProvider: (token) => dispatch(voucherGameAction.providerGameRequest(token)),
    getService: (params) => dispatch(voucherGameAction.serviceGameRequest(params)),
    getBill: (params) => dispatch(voucherGameAction.billGameRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoucherGame)
