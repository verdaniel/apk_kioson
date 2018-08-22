import React, { Component } from 'react'
import {
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  ToastAndroid,
  Modal,
  PermissionsAndroid
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import DropDown from '../../Components/DropDown'
import FloatingLabel from '../../Components/FloatingLabel'
// import CalendarModal from '../../Components/CalendarComponent'
import CustomCalendar from '../../Components/CustomCalendar'
import { ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'
import I18n from '../../I18n'
import { maskedWithoutDayWithHour } from '../../Transforms/LocalConfig'
// Styles
import styles from '../Styles/BalanceTransferBankConfirmationStyle'

class BalanceTransferBankConfirmation extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      y: 0
    }
    this.state = {
      resi: '113WMJAQ',
      date: 1511335876000,
      dateTransfer: I18n.t('l_datetransfer'),
      method: I18n.t('l_methodtransfer'),
      showDropdown: false,
      enableScrolling: true,
      methodArray: [
        { id: 1, name: 'Transfer ATM' },
        { id: 2, name: 'Tunai' },
        { id: 3, name: 'LLG' },
        { id: 4, name: 'RTGS' }
      ],
      alert: {
        name: '',
        bank: '',
        account: '',
        amount: ''
      },
      bank: '',
      name: '',
      account: '',
      amount: '',
      photo: I18n.t('l_uploadphoto'),
      path: '',
      calendarTimestamp: '',
      calendarMonthYear: Date.now(),
      hour: '',
      minute: '',
      modalSuccess: false,
      key: '',
      showCalendar: false
    }
  }

  componentWillMount () {
    try {
      const { params } = this.props.navigation.state
      const tempAmount = String(parseInt(params.amount) + parseInt(params.adminFee) - parseInt(params.discount))
      let temp = this.maskedMoney(tempAmount)
      this.setState({
        resi: params.resi,
        date: params.date,
        realAmount: tempAmount,
        amount: temp,
        key: params.key
      })
    } catch (e) {
      this.setState({
        resi: '113WMJAQ',
        date: 1511335876000,
        amount: ''
      })
    }
  }

  maskedMoney (value) {
    var number = value.toString()
    var sisa = number.length % 3
    var rupiah = number.substr(0, sisa)
    var ribuan = number.substr(sisa).match(/\d{3}/g)

    if (ribuan) {
      var separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    return rupiah
  }

  async changeText (text) {
    const { alert } = this.state
    let temp = await text.replace('.', '')
    let result = ''
    let panjang = temp.length
    var j = 0
    for (var i = panjang; i > 0; i--) {
      j = j + 1
      if (((j % 3) === 1) && (j !== 1)) {
        result = temp.substr(i - 1, 1) + '.' + result
      } else {
        result = temp.substr(i - 1, 1) + result
      }
    }
    this.setState({ amount: String(result), alert: {...alert, amount: ''} })
  }

  onLayoutDropDown = (e) => {
    this.layout.y = e.nativeEvent.layout.y + ratioHeight(180)
  }

  onItem = (item) => {
    console.tron.warn(item)
    this.setState({
      method: item.name, showDropdown: false, enableScrolling: true
    })
  }

  renderNav () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.ic_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {I18n.t('t_paymentconfirmation')}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderResi () {
    const { resi, date } = this.state
    const time = moment(date).format('DD MMM YYYY - h:mm').toString()
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          {I18n.t('l_order')}: {resi}
        </Text>
        <Text style={[styles.amount, { marginTop: 2 }]}>
          {time}
        </Text>
      </View>
    )
  }

  renderPaymentMethod () {
    const { method, showDropdown } = this.state
    let rotateDrop = '0deg'
    if (showDropdown) {
      rotateDrop = '180deg'
    }
    return (
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={styles.method}
          onLayout={this.onLayoutDropDown}
          onPress={() => this.openDropdown()}
        >
          <Text style={[styles.textDropdown, { flex: 1 }]}>
            {method}
          </Text>
          <Image source={Images.ic_dropdodwn} style={[styles.dropdownImage, { transform: [{ rotate: rotateDrop }] }]} />
        </TouchableOpacity>
      </View>
    )
  }

  renderInput () {
    const { alert, bank, name, account, amount } = this.state
    return (
      <View style={styles.inputContainer}>
        <FloatingLabel
          ref='bank'
          alert={alert.bank}
          text={I18n.t('p_senderbank')}
          keyboardType='default'
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={bank}
          onChangeText={(text) => this.setState({ bank: text, alert: {...alert, bank: ''} })}
          separatorColor={Colors.black_15}
        />
        <FloatingLabel
          ref='name'
          alert={alert.name}
          text={I18n.t('p_nameaccountbank')}
          keyboardType='default'
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: ratioHeight(10) }}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={name}
          onChangeText={(text) => this.setState({ name: text, alert: {...alert, name: ''} })}
          separatorColor={Colors.black_15}
        />
        <FloatingLabel
          ref='account'
          alert={alert.account}
          text={I18n.t('p_accountnumber')}
          keyboardType='numeric'
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: ratioHeight(10) }}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={account}
          onChangeText={(text) => this.setState({ account: text, alert: {...alert, account: ''} })}
          separatorColor={Colors.black_15}
        />
        <FloatingLabel
          ref='amount'
          alert={alert.amount}
          text={I18n.t('p_transferamount')}
          keyboardType='numeric'
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: ratioHeight(10) }}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={amount}
          onChangeText={(text) => this.changeText(text.replace('.', ''))}
          separatorColor={Colors.black_15}
        />
      </View>
    )
  }

  renderDateAndCamera () {
    const { dateTransfer, photo } = this.state
    let color
    if (!dateTransfer.includes('Pilih')) {
      color = Colors.slate_grey
    } else {
      color = Colors.greyish
    }
    return (
      <View style={[styles.inputContainer, { paddingBottom: ratioHeight(10) }]}>
        <Text style={[styles.label, { fontSize: moderateScale(12) }]}>
          {I18n.t('l_time')}
        </Text>
        <TouchableOpacity style={styles.buttonDate} onPress={() => this.setState({showCalendar: true})}>
          <Text style={[styles.date, { flex: 1, color: color }]}>
            {dateTransfer}
          </Text>
          <Image source={Images.ic_calendar} style={styles.imageCalender} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', padding: moderateScale(10), alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.uploadPhoto}
            onPress={() => this.checkCameraPermission(() => this.openCamera())}
          >
            <Text style={styles.textUpload}>
              {I18n.t('b_takephoto')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textUpload}>
            {photo}
          </Text>
        </View>
      </View>
    )
  }

  onDateChange (date) {
    const hour = ' ' + date.fromDateStr.hour + ' ' + date.fromDateStr.minute
    this.setState({ calendarTimestamp: date.fromDate, dateTransfer: maskedWithoutDayWithHour(date.fromDate) + ' ' + hour, showCalendar: false })
    console.tron.warn(date)
  }

  async checkCameraPermission (callback) {
    try {
      const responseCamera = await PermissionsAndroid.check('android.permission.CAMERA')
      const responseStorage = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')
      if (!responseCamera || !responseStorage) {
        this.requestCameraPermission(callback)
      } else {
        console.tron.log('Camera permission granted')
        callback()
      }
    } catch (err) {
      console.tron.warn(err)
    }
  }

  async requestCameraPermission (callback) {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
      )
      console.tron.log(granted)
      if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
        console.tron.log('Camera permission granted')
        callback()
      } else {
        console.tron.log('Camera permission denied')
      }
    } catch (err) {
      console.tron.warn(err)
    }
  }

  openCamera () {
    this.props.navigation.navigate('Cameras', {
      type: 'back',
      title: I18n.t('t_proofimage'),
      image: this.processPhoto
    })
  }

  renderNote () {
    return (
      <View style={[styles.inputContainer, { backgroundColor: Colors.white, marginTop: 0 }]}>
        <Text style={[styles.date, { alignSelf: 'center', fontSize: moderateScale(12), textAlign: 'center' }]}>
          {I18n.t('l_notetransfer')}
        </Text>
      </View>
    )
  }

  renderButton () {
    const { bank, name, account, amount, dateTransfer } = this.state
    if (bank !== '' && name !== '' && account !== '' && amount !== '' && !dateTransfer.includes('Pilih')) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.nice_blue }]}
            onPress={() => this.confirmation()}
          >
            <Text style={styles.textButton}>
              {I18n.t('t_confirmation')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.button, { backgroundColor: Colors.greyish }]}>
          <Text style={styles.textButton}>
            {I18n.t('t_confirmation')}
          </Text>
        </View>
      </View>
    )
  }

  renderModal () {
    const { amount } = this.state
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{I18n.t('l_successtransaction')}</Text>
          <Text style={styles.modalContent}>{I18n.t('b_balancesmall')} Rp {amount} {I18n.t('l_topupsuccess')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.modalButton} onPress={() => this.back()}>
              <Text style={[styles.textButton, { fontSize: moderateScale(14) }]}>
                {I18n.t('t_ok')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  back () {
    const { key } = this.state
    this.props.navigation.goBack(key)
    this.setState({ modalSuccess: false })
  }

  confirmation () {
    const { bank, name, account, amount } = this.state
    let temp = parseInt(amount.replace(/\./g, ''))
    if (name.length < 3) {
      ToastAndroid.show(I18n.t('toast_name'), ToastAndroid.SHORT)
    } else if (account.length < 5) {
      ToastAndroid.show(I18n.t('toast_account'), ToastAndroid.SHORT)
    } else if (bank.length < 2) {
      ToastAndroid.show(I18n.t('toast_bank'), ToastAndroid.SHORT)
    } else if (temp < 10000) {
      ToastAndroid.show(I18n.t('toast_amounttransfer'), ToastAndroid.SHORT)
    } else {
      this.setState({
        modalSuccess: true
      })
    }
  }

  changeDate (value) {
    this.setState({
      calendarTimestamp: value,
      dateTransfer: this.dateString(value)
    })
  }

  changeHour (hour, minute) {
    this.setState({
      hour: hour,
      minute: minute
    })
  }

  dateString (timestamp) {
    var day = moment(timestamp)
    var dateStr = moment(day).format('DD MMMM YYYY')
    return dateStr
  }

  openDropdown () {
    const { showDropdown } = this.state
    if (showDropdown) {
      this.setState({ showDropdown: false, enableScrolling: true })
    } else {
      this.setState({ showDropdown: true, enableScrolling: false })
    }
  }

  processPhoto = (image) => {
    this.setState({ path: image, photo: I18n.t('l_proof') + '.jpg' })
  }

  render () {
    const { methodArray, showDropdown, showCalendar, calendarMonthYear } = this.state
    return (
      <View style={styles.container}>
        {this.renderNav()}
        <ScrollView>
          <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
          {this.renderResi()}
          {this.renderPaymentMethod()}
          {this.renderInput()}
          {this.renderDateAndCamera()}
          {this.renderNote()}
          {this.renderButton()}
        </ScrollView>
        {showDropdown === true &&
        <DropDown
          ref='dropDown'
          onItemPress={(item) => this.onItem(item)}
          onBlur={(show) => this.setState({ showDropdown: false, enableScrolling: true })}
          style={[styles.dropDown, { top: this.layout.y }]}
          data={methodArray}
          backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.y }]} />}
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalSuccess}
          onRequestClose={() => { this.setState({modalSuccess: false}) }}>
          {this.renderModal()}
        </Modal>
        <CustomCalendar
          isShow={showCalendar}
          mode={'date-hour'}
          fromDate={calendarMonthYear}
          onCancel={() => this.setState({ showCalendar: false })}
          onOK={(data) => this.onDateChange(data)}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceTransferBankConfirmation)
