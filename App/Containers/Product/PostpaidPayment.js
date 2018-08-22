import React, { Component } from 'react'
import { ScrollView, PermissionsAndroid, Text, View, TouchableOpacity, StatusBar, ToastAndroid, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Images} from '../../Themes/'
import LoadingModal from '../../Components/Loading'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import I18n from '../../I18n'
import FormInput from '../../Components/FormInput'
import Validator from '../../Services/Validate'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import styles from '../Styles/PostpaidPaymentStyle'
import CashBalance from '../../Components/CashBalance'
import ModalListContact from '../../Components/ModalListContact'
import PostpaidRedux from '../../Redux/PostpaidRedux'
import { ratioHeight } from '../../Transforms/Resize'

var SelectContacts = require('react-native-select-contact-android')

class PostpaidPayment extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const phoneNumber = (params) ? params.item.extra.phone_number : ''

    this.submitting = {
      confirmation: false
    }
    this.state = {
      token: '',
      serviceProductChoose: I18n.t('p_chooseOperator'),
      serviceProductId: '',
      phoneNumber,
      errorMessage: {
        phoneNumber: ''
      },
      editable: {
        phoneNumber: false
      },
      keyboardShow: true,
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

    if (this.submitting.confirmation) {
      if (this.props.confirmation.fetching && !confirmation.fetching) {
        if (confirmation.payload && !confirmation.error) {
          this.submitting = { ...this.submitting, confirmation: false }
          const dataDetail = [
            { label: I18n.t('l_product'), detail: this.state.serviceProduct },
            { label: I18n.t('l_phonenumber'), detail: this.state.phoneNumber },
            { label: I18n.t('l_customername'), detail: confirmation.payload.data.customer_name }
          ]
          navigate('PaymentConfirmation',
            {
              dataDetail: dataDetail,
              serviceType: 'postpaid',
              titleForm: 'Pascabayar',
              dataConfirmation: confirmation.payload.data,
              serviceProductId: this.state.serviceProductId,
              phoneNumber: this.state.phoneNumber
            })
        }
      }
    }
  }

  onChangeTextNumberPhone = (text) => {
    this.setState({ phoneNumber: text, errorMessage: {phoneNumber: ''} })
  }

  onClickPresetTv (name, id) {
    const { editable } = this.state
    this.setState({
      serviceProductId: id,
      serviceProductChoose: name,
      editable: { ...editable, phoneNumber: true }
    })
  }

  checkField () {
    const { phoneNumber, errorMessage } = this.state
    if ((phoneNumber.length >= 10 && errorMessage.phoneNumber === '')) {
      return false
    }
    return true
  }

  confirmOrder (phoneNumber) {
    this.props.getConfirmation({
      serviceProductId: this.state.serviceProductId,
      phoneNumber: phoneNumber,
      token: this.state.token
    })
    this.submitting.confirmation = true
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textList]}>
          {rowData.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { operator, id } = rowData
    const { editable } = this.state
    this.setState({
      serviceProduct: operator,
      serviceProductId: id,
      editable: { ...editable, phoneNumber: true }

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
    const { errorMessage, editable, phoneNumber, serviceProductChoose } = this.state
    let isButtonDisable = this.checkField()
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.form}>
              <PlaceholderModalDropdown
                title={I18n.t('l_operator')}
                leftIcon={Images.ic_op_postpaid}
                isLeftVisible
                marginTop={9}
                disabled={false}
                options={preset.payload ? preset.payload.data : []}
                defaultValue={serviceProductChoose}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
              <FormInput
                value={phoneNumber}
                editable={editable.phoneNumber}
                isLeftVisible
                iconLeft={Images.ic_user}
                keyboardType='numeric'
                title={I18n.t('l_phonenumber')}
                placeholder={I18n.t('p_phoneNumber')}
                onBlur={() => {
                  this.setState({
                    errorMessage: {phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                  })
                }}
                isRightVisible
                iconRight={Images.ic_contact}
                messageError={errorMessage.phoneNumber}
                onChangeText={this.onChangeTextNumberPhone}
                onPressRight={() => this.requestContact()}
              />
            </View>
            <FooterFrom />
          </View>
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.confirmOrder(phoneNumber)}
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
    preset: state.postpaid.getPostpaid,
    confirmation: state.postpaid.postConfirmationPostpaid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreset: (params) => dispatch(PostpaidRedux.postpaidRequest(params)),
    getConfirmation: (params) => dispatch(PostpaidRedux.confirmationPostpaidRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostpaidPayment)
