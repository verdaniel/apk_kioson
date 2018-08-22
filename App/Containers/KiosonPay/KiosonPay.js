import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../../Themes'
import kiosonPayAction from '../../Redux/KiosonPayRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/VoucherGameStyle'
import CashBalance from '../../Components/CashBalance'
import DropDown from '../../Components/DropDown'
import AlertMessage from '../../Transforms/AlertMessage'
import FooterFrom from '../../Components/FooterFrom'
import ButtonForm from '../../Components/ButtonForm'
import LoadingModal from '../../Components/Loading'
import TextInputMod from '../../Components/TextInputMod'
import PlaceholderDropdown from '../../Components/PlaceholderDropdown'
import { ratioHeight } from '../../Transforms/Resize'
import ModalListContact from '../../Components/ModalListContact'
var SelectContacts = require('react-native-select-contact-android')

class KiosonPay extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      yServicesSpeciality: 0,
      widthService: 0
    }
    this.state = {
      getService: true,
      service: 'Pilih E-Commerce Provider',
      code: '',
      disableCode: true,
      cellphone: '',
      enableScrolling: false,
      services: [],
      idServices: -1,
      errorPhone: false,
      token: '',
      isDisable: {
        service: false,
        code: true,
        cellphone: true
      },
      showDropdown: {
        service: false
      },
      errorMessage: {
        cellphone: ''
      },
      isError: {
        cellphone: false
      },
      modalLoading: true,
      attemptConfirm: false,
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
      this.props.getPay()
    })
  }

  componentWillReceiveProps (nextProps) {
    const { dataPay, dataConfirm } = nextProps
    const { getService, attemptConfirm } = this.state
    if (getService) {
      if (dataPay !== null) {
        if (dataPay.code === 200 && dataPay.status) {
          this.setState({
            modalLoading: false,
            services: dataPay.data,
            getService: false
          })
        } else if (!dataPay.status) {
          ToastAndroid.show(dataPay.message, ToastAndroid.SHORT)
          this.setState({
            modalLoading: false,
            getService: false
          })
          dataPay.code = 0
        }
      }
    }
    if (attemptConfirm) {
      if (dataConfirm !== null) {
        if (dataConfirm.code === 200 && dataConfirm.status) {
          this.setState({
            modalLoading: false,
            attemptConfirm: false
          })
        } else if (!dataConfirm.status) {
          ToastAndroid.show(dataConfirm.message, ToastAndroid.SHORT)
          this.setState({
            modalLoading: false,
            attemptConfirm: false
          })
          dataConfirm.code = 0
        }
      }
    }
  }

  onLayoutDropDownService = (e) => {
    this.layout.yServicesSpeciality = e.nativeEvent.layout.y + ratioHeight(95)
    this.layout.widthService = e.nativeEvent.layout.width
  }

  purchase = () => {
    const { token, idServices, cellphone, code, errorMessage, isError } = this.state
    if (code.length < 6) {
      this.setState({
        errorMessage: { ...errorMessage, code: 'Kode pembayaran minimal 6 karakter' },
        isError: { ...isError, code: true }
      })
    } else if (cellphone.charAt(0) !== '0' || cellphone.charAt(1) !== '8') {
      this.setState({
        isError: { ...isError, cellphone: true },
        errorMessage: { ...errorMessage, cellphone: 'Masukkan nomor ponsel anda dengan benar' }
      })
    } else if (cellphone.length < 10) {
      this.setState({
        isError: { ...isError, cellphone: true },
        errorMessage: { ...errorMessage, cellphone: 'No Ponsel Pelanggan Minimal 10 angka' }
      })
    } else {
      this.setState({
        isError: { ...isError, cellphone: false, code: false },
        errorMessage: { ...errorMessage, cellphone: AlertMessage.non, code: AlertMessage.non },
        attemptConfirm: true,
        modalLoading: true
      })
      this.props.getConfirm({
        id: idServices,
        phone: cellphone,
        code: code,
        token: token
      })
      // this.props.navigation.navigate('KiosonPayConfirmation',
      //   {
      //     phoneNumber: cellphone,
      //     provider: 'Tokopedia',
      //     code: code,
      //     id: '1'
      //   })
    }
  }

  onChangeTextNumberPhone = (text) => {
    const { errorMessage, isError } = this.state
    this.setState({ cellphone: text })
    var n1 = text[0]
    var n2 = text[8]
    if (n1 !== '0' && n2 !== '8') {
      this.setState({
        errorMessage: { ...errorMessage, cellphone: AlertMessage.wrongMobileNumber },
        isError: { ...isError, cellphone: true }
      })
    } else if (text.length <= 10) {
      this.setState({
        errorMessage: { ...errorMessage, cellphone: AlertMessage.minimunCustomerPhoneNumber },
        isError: { ...isError, cellphone: true }
      })
    } else {
      this.setState({
        errorMessage: { ...errorMessage, cellphone: AlertMessage.non },
        isError: { ...isError, cellphone: false }
      })
    }
  }

  onChangeCode = (text) => {
    const { errorMessage, isError } = this.state
    this.setState({
      errorMessage: { ...errorMessage, code: AlertMessage.non },
      isError: { ...isError, code: false },
      code: text
    })
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  onItemServicePress (name, id) {
    // this.setState({
    //   service: item.name, idServices: item.id, showDropdown: false, enableScrolling: true, disableAmount: false, amounts: [], amount: 'Pilih Nominal'
    // })
    this.setState({
      service: name,
      idServices: id,
      showDropdown: { service: false },
      enableScrolling: true
    })
  }

  renderItemServices = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onItemServicePress(item.operator, item.id)}
        style={styles.list}>
        <Text style={styles.textFieldDropDown}>
          {item.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  onRequestClose () {
    this.setState({ modalLoading: false })
    // this.props.navigation.goBack()
  }

  checkForm () {
    if (this.state.service.length === 0 || this.state.cellphone.length < 10 || this.state.code.length < 6) {
      return true
    } else {
      return false
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
    const { isDisable, showDropdown, service, code, isError, modalLoading, errorMessage, cellphone, services } = this.state
    var checkButton = this.checkForm()
    // var checkButton = false
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView>
          <CashBalance navigation={navigation} />
          <View style={styles.form}>
            <PlaceholderDropdown
              title={'E-Commerce Provider'}
              leftIcon={Images.ic_cart}
              isLeftVisible
              marginTop={9}
              onLayoutDropdown={this.onLayoutDropDownService}
              isDropDownDisable={isDisable.service}
              showDropDown={showDropdown.service}
              onPress={() => this.setState({showDropdown: {...showDropdown, service: true}})}
              value={service}
            />
            <TextInputMod
              value={code}
              title={'Kode Pembayaran'}
              editable={isDisable.code}
              iconLeft={Images.ic_wallet_grey}
              isLeftVisible
              keyboardType='default'
              placeholder='19xxxx'
              maxLength={20}
              isRightVisible
              onPressRight={() => { }}
              iconRight={null}
              isError={isError.code}
              messageError={errorMessage.code}
              onChangeText={this.onChangeCode}
            />
            <TextInputMod
              value={cellphone}
              title={'Nomor Ponsel Pelanggan'}
              editable={isDisable.cellphone}
              iconLeft={Images.ic_user}
              isLeftVisible
              keyboardType='numeric'
              placeholder='0812xxxxxxxx'
              isRightVisible
              iconRight={Images.ic_contact}
              isError={isError.cellphone}
              messageError={errorMessage.cellphone}
              onChangeText={this.onChangeTextNumberPhone}
              onPressRight={() => this.contact()}
            />
          </View>
          <FooterFrom title={'Pastikan data yang Anda isi benar'} />
        </ScrollView>
        <ModalListContact data={this.state.listContact} onSelect={(data) => this.onSelect(data)} isOpen={this.state.modalListContact} onClosed={() => this.setState({modalListContact: false})} />
        <ButtonForm
          disabled={checkButton}
          lable={'LANJUT'}
          onPress={() => this.purchase()} />
        <LoadingModal visible={modalLoading} onRequestClose={() => this.onRequestClose()} />
        {showDropdown.service === true &&
          <DropDown
            ref='dropDownServices'
            renderItem={this.renderItemServices}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            onBlur={(show) => this.setState({ showDropdown: {...showDropdown, service: false}, enableScrolling: true })}
            style={[styles.dropDown, { top: this.layout.yServicesSpeciality, width: this.layout.widthService }]}
            data={services}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yServicesSpeciality }]} />}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPay: state.kiosonpay.kiosonPay.payload,
    dataConfirm: state.kiosonpay.kiosonConfirm.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPay: () => dispatch(kiosonPayAction.kiosonPayRequest()),
    getConfirm: (data) => dispatch(kiosonPayAction.kiosonPayConfirmRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KiosonPay)
