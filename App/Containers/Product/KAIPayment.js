import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CashBalance from '../../Components/CashBalance'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import I18n from '../../I18n'
import Validator from '../../Services/Validate'
import FormInput from '../../Components/FormInput'

// Styles
import styles from '../Styles/KaiAccessPaymentStyle'
import { Images } from '../../Themes/index'
import ModalListContact from '../../Components/ModalListContact'
var SelectContacts = require('react-native-select-contact-android')

class KAIPayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codePayment: '',
      phoneNumber: '',
      message: {
        phoneNumber: '',
        codePayment: ''
      },
      keyboardShow: true,
      modalListContact: false,
      listContact: []
    }
  }

  onChangeTextNumberPhone = (text) => {
    const { message } = this.state
    this.setState({ phoneNumber: text, message: { ...message, phoneNumber: '' } })
  }

  onChangeTextCodePayment = (text) => {
    const { message } = this.state
    this.setState({ codePayment: text, message: { ...message, codePayment: '' } })
  }

  onBeliClick () {
    const { phoneNumber } = this.state
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_codePayment'), detail: 'XL SALDO 125000' },
      { label: I18n.t('l_trainName'), detail: 'Argo Parahyangan' },
      { label: I18n.t('l_rute'), detail: 'GMR-BDG' },
      { label: I18n.t('l_departuretime'), detail: '18 Okt 2017 - 21:00 WIB' },
      { label: I18n.t('l_totalPassenger'), detail: '1 Orang' },
      { label: I18n.t('l_passengerName'), detail: 'Nur Ibrahim Rosyad' }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('PaymentConfirmation',
      {
        dataDetail: dataDetail,
        serviceType: 'kai',
        titleForm: 'Tiket Kereta Api',
        dataConfirmation: data,
        serviceProductId: 1,
        phoneNumber: phoneNumber
      })
  }

  checkFrom (phoneNumber, codePayment) {
    const { message } = this.state
    if ((phoneNumber.length >= 10 && message.phoneNumber === '') && (codePayment.length >= 10 && message.codePayment === '')) {
      return false
    } else {
      return true
    }
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
          this.setState({ modalListContact: false, listContact: [], phoneNumber: String(listContact) })
        }
      }
    })
  }

  onSelect (number) {
    this.setState({ modalListContact: false, listContact: [], phoneNumber: number })
  }

  render () {
    const { navigation } = this.props
    const { keyboardShow, message, phoneNumber, codePayment } = this.state
    var isButtonDisable = this.checkFrom(phoneNumber, codePayment)
    var border = false
    if (message.phoneNumber !== '') {
      border = true
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView stickyHeaderIndices={[0]}>
          <CashBalance navigation={navigation} />
          <View style={styles.form}>
            <FormInput
              value={codePayment}
              title={I18n.t('l_codePayment')}
              isLeftVisible
              iconLeft={Images.ic_train}
              keyboardType='numeric'
              placeholder={I18n.t('p_idCustomer')}
              maxLength={25}
              iconRight={Images.ic_contact}
              isRightVisible={false}
              onBlur={() => {
                this.setState({
                  message: {...message, codePayment: Validator(codePayment, 'codePayment')},
                  keyboardShow: !keyboardShow
                })
              }}
              onFocus={() => this.setState({keyboardShow: !keyboardShow})}
              messageError={message.codePayment}
              onChangeText={this.onChangeTextCodePayment}
            />
            <FormInput
              value={phoneNumber}
              title={I18n.t('l_phoneNumberCustomer')}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              placeholder={I18n.t('p_phoneNumber')}
              maxLength={25}
              iconRight={Images.ic_contact}
              isRightVisible
              onBlur={() => {
                this.setState({
                  message: {...message, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')},
                  keyboardShow: !keyboardShow
                })
              }}
              onFocus={() => this.setState({keyboardShow: !keyboardShow})}
              messageError={message.phoneNumber}
              onChangeText={this.onChangeTextNumberPhone}
              borderBottom={border}
              onPressRight={() => this.contact()}
            />
          </View>
          <View style={styles.fotter}>
            <Text style={styles.textfotter}>Pembayaran Kereta Api dapat dilakukan lewat menu ini jika pemesanan dilakukan melalui KAI Access dengan metode pembayaran ATM Transfer.</Text>
          </View>
          <FooterFrom />
        </ScrollView>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        {keyboardShow === true ? <ButtonForm
          onPress={() => this.onBeliClick(this.state.phoneNumber, this.state.amountValue)}
          disabled={isButtonDisable}
        /> : <View />}
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

export default connect(mapStateToProps, mapDispatchToProps)(KAIPayment)
