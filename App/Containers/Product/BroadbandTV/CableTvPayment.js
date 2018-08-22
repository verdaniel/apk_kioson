import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, PermissionsAndroid, AsyncStorage, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Images} from '../../../Themes/'
import LoadingModal from '../../../Components/Loading'
import FooterFrom from '../../../Components/FooterFrom'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import MediaRedux from '../../../Redux/MediaRedux'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'

// Styles
import styles from '../../Styles/CableTvPaymentStyle'
import ModalListContact from '../../../Components/ModalListContact'
import { ratioHeight } from '../../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class CableTvPayment extends Component {
  constructor (props) {
    super(props)
    this.submiting = {
      confirmation: false
    }
    this.state = {
      token: '',
      serviceProductChoose: I18n.t('p_cableTVProvider'),
      idCustomer: '',
      serviceProductId: '',
      nominal: '',
      phoneNumber: '',
      errorMessage: {
        idCustomer: '',
        phoneNumber: ''
      },
      editable: {
        idCustomer: false,
        phoneNumber: false
      },
      showDropDownNominal: false,
      modalLodaing: false,
      presetTv: [
        {
          'operator': 'INDOVISION/OK TV/TOP TV POSTPAID',
          'id': 299
        },
        {
          'operator': 'KVISION',
          'id': 319
        },
        {
          'operator': 'ORANGE TV POSTPAID',
          'id': 122
        },
        {
          'operator': 'ORANGE TV TOPUP',
          'id': 116
        }
      ],
      presetNominalTv: [
        {id: 1, desc: 'Orange TV Prepaid 50.000', amount: 50000},
        {id: 2, desc: 'Orange TV Prepaid 80.000', amount: 80000},
        {id: 3, desc: 'Orange TV Prepaid 100.000', amount: 100000},
        {id: 4, desc: 'Orange TV Prepaid 150.000', amount: 150000},
        {id: 6, desc: 'Orange TV Prepaid 300.000', amount: 300000}
      ],
      serviceProductIdNominal: '',
      serviceProductName: I18n.t('p_AmountValueMobileRecharge'),
      serviceProductPreset: '',
      serviceProductNameChoose: '',
      modalListContact: false,
      listContact: []
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        // this.props.getPreset('')
      } else {
        // this.props.getPreset(value)
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { presetTv } = nextProps
    // const { navigate } = this.props.navigation
    if (presetTv !== null) {
      if (presetTv.code === 200 && presetTv.status) {
        if (presetTv.data.length !== 0) {
          this.setState({
            presetTv: presetTv.data,
            modalLodaing: false
          })
        }
      } else if (!presetTv.status && presetTv.code !== 0) {
        ToastAndroid.show(presetTv.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        presetTv.code = 0
      }
    }
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
    // this.setState({modalLodaing: true})
    // this.props.postConfirmPdam({
    //   serviceProductId: this.state.idAreaChoose,
    //   customerId: this.state.customerId,
    //   phoneNumber: this.state.phoneNumber,
    //   tokens: this.state.token
    // })
    // this.submitting.confirmation = true
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
        serviceType: 'mediaTv',
        titleForm: 'TV Kabel',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
  }

  renderRowPreset (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textList]}>
          {rowData.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonTextPreset (rowData) {
    const { operator, id } = rowData
    this.setState({
      serviceProductId: id,
      serviceProductChoose: operator,
      serviceProductPreset: operator
    })
    return `${operator}`
  }

  renderRowNominal (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textList]}>
          {rowData.desc}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonTextNominal (rowData) {
    const { editable } = this.state
    const { desc, id, amount } = rowData
    this.setState({
      serviceProductIdNominal: id,
      serviceProductName: desc,
      serviceProductNameChoose: desc,
      nominal: amount,
      editable: { ...editable, idCustomer: true }
    })
    return `${desc}`
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
    const { presetNominalTv, serviceProductName, serviceProductId, errorMessage, editable, phoneNumber, idCustomer, serviceProductChoose, modalLodaing, presetTv } = this.state
    let isButtonDisable = this.checkField()
    return (
      <View style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <PlaceholderModalDropdown
              title={I18n.t('l_cableTVProvider')}
              leftIcon={Images.ic_cableTv}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={presetTv}
              defaultValue={serviceProductChoose}
              renderRow={this.renderRowPreset.bind(this)}
              renderButtonText={(rowData) => this.renderButtonTextPreset(rowData)}
            />
            {serviceProductId !== '' ? <PlaceholderModalDropdown
              title={I18n.t('l_amount')}
              leftIcon={Images.ic_currencyID}
              isLeftVisible
              marginTop={9}
              disabled={false}
              options={presetNominalTv}
              defaultValue={serviceProductName}
              renderRow={this.renderRowNominal.bind(this)}
              renderButtonText={(rowData) => this.renderButtonTextNominal(rowData)}
            /> : <View />}
            <FormInput
              editable={editable.idCustomer}
              value={idCustomer}
              isLeftVisible
              iconLeft={Images.ic_computer}
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
              editable={editable.phoneNumber}
              value={phoneNumber}
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
          <FooterFrom />
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.onBeliClick()}
            disabled={false}
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
    presetTv: state.media.presetTv.payload

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreset: (params) => dispatch(MediaRedux.presetTvRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CableTvPayment)
