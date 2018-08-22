import React, { Component } from 'react'
import { ScrollView, StatusBar, View, PermissionsAndroid, AsyncStorage, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import CashBalance from '../../../Components/CashBalance'
import FooterFrom from '../../../Components/FooterFrom'
import ButtonForm from '../../../Components/ButtonForm'
import LoadingModal from '../../../Components/Loading'
import I18n from '../../../I18n'
import FormInput from '../../../Components/FormInput'
import Validator from '../../../Services/Validate'

// Styles
import styles from '../../Styles/BpjsPaymentStyle'
import { Images } from '../../../Themes/index'
import ModalListContact from '../../../Components/ModalListContact'
import { ratioHeight } from '../../../Transforms/Resize'
var SelectContacts = require('react-native-select-contact-android')

class BpjsPayment extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const participantsNumber = (params) ? '' + params.item.extra.reference_number : ''

    this.state = {
      participantsNumber,
      monthAmount: I18n.t('p_monthAmount'),
      monthValue: '',
      numberOfMonths: '',
      phoneNumber: '',
      editable: {
        phoneNumber: false
      },
      message: {
        participantsNumber: '',
        phoneNumber: ''
      },
      modalListContact: false,
      listContact: [],
      token: ''
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

  checkFrom (participantsNumber, numberOfMonths, phoneNumber) {
    const { message } = this.state
    if ((phoneNumber.length >= 10 && message.phoneNumber === '') && (participantsNumber.length >= 8 && message.participantsNumber === '')) {
      return false
    } else {
      return true
    }
  }

  onBeliClick () {
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_participantsNumber'), detail: '123333333' },
      { label: I18n.t('l_phonenumber'), detail: '081212345678' },
      { label: I18n.t('l_participantsName'), detail: 'Adele Grande' },
      { label: I18n.t('l_amountMember'), detail: '2 Anggota' },
      { label: I18n.t('l_premiprice'), detail: 'Rp. 50.000,-' },
      { label: I18n.t('l_branch'), detail: 'Martapura' }
    ]
    navigate('BpjsRedirect',
      {
        dataDetail: dataDetail
      })
  }

  render () {
    const { navigation } = this.props
    const { editable, modalLodaing, message, participantsNumber, numberOfMonths, phoneNumber } = this.state
    var isButtonDisable = this.checkFrom(participantsNumber, numberOfMonths, phoneNumber)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <FormInput
              value={participantsNumber}
              isLeftVisible
              iconLeft={Images.ic_participantsNumber}
              keyboardType='numeric'
              title={I18n.t('l_participantsNumber')}
              placeholder={I18n.t('p_12xxxx')}
              maxLength={20}
              iconRight={Images.ic_contact}
              isRightVisible={false}
              onBlur={() => {
                this.setState({
                  message: {...message, participantsNumber: Validator(participantsNumber, 'participantsNumber')}
                })
                if (message.participantsNumber === '') {
                  this.setState({
                    editable: {...editable, phoneNumber: true}
                  })
                }
              }}
              messageError={message.participantsNumber}
              onChangeText={(text) => this.setState({participantsNumber: text})}
            />
            <FormInput
              value={phoneNumber}
              editable={editable.phoneNumber}
              isLeftVisible
              iconLeft={Images.ic_user}
              keyboardType='numeric'
              title={I18n.t('l_phoneNumberCustomer')}
              placeholder={I18n.t('p_phoneNumber')}
              maxLength={15}
              iconRight={Images.ic_contact}
              isRightVisible
              onBlur={() => {
                this.setState({
                  message: {...message, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                })
              }}
              messageError={message.phoneNumber}
              onChangeText={(text) => this.setState({phoneNumber: text})}
              onPressRight={() => this.requestContact()}
            />
          </View>
          <FooterFrom />
        </ScrollView>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.onBeliClick()}
            disabled={isButtonDisable}
            />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BpjsPayment)
