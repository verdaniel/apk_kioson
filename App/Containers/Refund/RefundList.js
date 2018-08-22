import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../Themes'
import I18n from 'react-native-i18n'
import NoContentTab from '../../Components/NoContentTab'
import moment from 'moment'
import accounting from 'accounting'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/RefundListStyle'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

class RefundList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: '',
      errorPhone: false,
      data: [
        {
          'resi': '113WUJAQ',
          'date': 1511335876000,
          'product': 'Paket Xl 25 ribu',
          'phone': '081208120812',
          'total': 59000
        },
        {
          'resi': '113WUJAQ',
          'date': 1511335876000,
          'product': 'Paket Xl 25 ribu',
          'phone': '081208120812',
          'total': 59000
        },
        {
          'resi': '113WUJAQ',
          'date': 1511335876000,
          'product': 'Paket Xl 25 ribu',
          'phone': '081208120812',
          'total': 59000
        },
        {
          'resi': 'ABC123',
          'date': 1511335876000,
          'product': 'Paket Xl 25 ribu',
          'phone': '081208120812',
          'total': 59000
        }
      ],
      showModalOtp: false,
      showModalSuccess: false,
      indexRefund: 0,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      gettingOtp: true
    }
  }

  renderInput () {
    const { phone, errorPhone } = this.state
    const color = !errorPhone ? Colors.slate_grey : Colors.red
    const border = !errorPhone ? Colors.black_15 : Colors.red
    let button, errorMessage
    if (phone.length > 0) {
      button = (
        <TouchableOpacity style={styles.buttonSearch} onPress={() => this.search()}>
          <Text style={styles.buttonText}>
            {I18n.t('b_search')}
          </Text>
        </TouchableOpacity>
      )
    } else {
      button = (
        <TouchableOpacity
          style={[styles.buttonSearch, { backgroundColor: Colors.greyish }]}
          disabled
        >
          <Text style={styles.buttonText}>
            {I18n.t('b_search')}
          </Text>
        </TouchableOpacity>
      )
    }
    if (errorPhone) {
      errorMessage = (
        <Text style={styles.error}>
          {I18n.t('e_phonenumber')}
        </Text>
      )
    } else {
      errorMessage = null
    }
    return (
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.inputContainer, { borderBottomColor: border }]}>
            <TextInput
              ref='phone'
              style={[styles.inputText, { color: color, marginLeft: moderateScale(-2) }]}
              value={phone}
              keyboardType='numeric'
              maxLength={12}
              placeholderTextColor={Colors.greyish}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={this.textPhone}
              underlineColorAndroid='transparent'
              placeholder={I18n.t('p_phone')}
            />
          </View>
          {button}
        </View>
        {errorMessage}
      </View>
    )
  }

  renderData () {
    const { data } = this.state
    if (data.length > 0) {
      return (
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      )
    } else {
      return <NoContentTab type='refund' />
    }
  }

  renderItem = ({ item, index }) => {
    const time = moment(item.date).format('DD MMM YYYY - h:mm').toString()
    var options = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var money = accounting.formatMoney(item.total, options)
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.order}>{I18n.t('l_order')}: {item.resi}</Text>
        <Text style={styles.date}>{time} WIB</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.separator} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', marginRight: ratioWidth(30) }}>
            <Text style={styles.data}>{I18n.t('l_product')}</Text>
            <Text style={styles.data}>{I18n.t('l_ponsel')}</Text>
            <Text style={styles.data}>{I18n.t('l_jumlah')}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={[styles.data, { fontWeight: '500' }]}>: {item.product}</Text>
            <Text style={styles.data}>: {item.phone}</Text>
            <Text style={styles.data}>: Rp {money}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.buttonRefund} onPress={() => this.setState({ showModalOtp: true, indexRefund: index })}>
            <Text style={styles.textButton}>
              {I18n.t('l_refund')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderModalOTP () {
    const { data, indexRefund, otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    let button
    if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      button = (
        <TouchableOpacity style={styles.buttonConfirm} onPress={() => this.openModalSuccess()}>
          <Text style={styles.textButton}>
            {I18n.t('b_confirmation')}
          </Text>
        </TouchableOpacity>
      )
    } else {
      button = (
        <View style={[styles.buttonConfirm, { backgroundColor: Colors.greyish }]}>
          <Text style={styles.textButton}>
            {I18n.t('b_confirmation')}
          </Text>
        </View>
      )
    }
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.showModalOtp}
        onRequestClose={() => { this.setState({showModalOtp: false}) }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ showModalOtp: false })}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.boxModalContainer}>
                <Text style={[styles.modalTitle, { marginTop: ratioHeight(5), marginBottom: ratioHeight(20) }]}>{I18n.t('t_otpconfirmation')}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalContent}>
                    {I18n.t('l_refundLabel', {resi: data[indexRefund].resi, phone: data[indexRefund].phone})}
                  </Text>
                </View>
                {this.renderInputOTP()}
                <View style={{ flexDirection: 'row', marginTop: ratioHeight(20) }}>
                  {button}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderModalSuccess () {
    const { data, indexRefund } = this.state
    var options = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var amount = accounting.formatMoney(data[indexRefund].total, options)
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.showModalSuccess}
        onRequestClose={() => { this.setState({showModalSuccess: false}) }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ showModalSuccess: false })}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.boxModalContainer}>
                <Text style={[styles.modalTitle, { marginTop: ratioHeight(5), marginBottom: ratioHeight(20) }]}>{I18n.t('t_refundsuccess')}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalContent}>
                    {I18n.t('l_refundLabelSuccess', {amount: amount, resi: data[indexRefund].resi})}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: ratioHeight(20) }}>
                  <TouchableOpacity
                    style={[styles.buttonConfirm, { backgroundColor: Colors.snow, fontWeight: 'bold' }]}
                    onPress={() => this.openHome()}
                  >
                    <Text style={[styles.textButton, { color: Colors.nice_blue, fontWeight: 'bold' }]}>
                      {I18n.t('b_beranda')}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ height: ratioHeight(10), width: ratioWidth(10) }} />
                  <TouchableOpacity style={styles.buttonConfirm} onPress={() => this.setState({ showModalSuccess: false })}>
                    <Text style={styles.textButton}>
                      {I18n.t('t_ok')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderInputOTP () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.inputContainerOTP, { borderBottomWidth: 0 }]}>
          <TextInput
            ref='otp1'
            style={styles.inputTextOTP}
            value={otp1}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP1}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp2'
            style={styles.inputTextOTP}
            value={otp2}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP2}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp3'
            style={styles.inputTextOTP}
            value={otp3}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP3}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp4'
            style={styles.inputTextOTP}
            value={otp4}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP4}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp5'
            style={styles.inputTextOTP}
            value={otp5}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP5}
            underlineColorAndroid='transparent'
            placeholder=''
          />
          <TextInput
            ref='otp6'
            style={styles.inputTextOTP}
            value={otp6}
            maxLength={1}
            keyboardType='numeric'
            autoCapitalize='none'
            onChangeText={this.textOTP6}
            underlineColorAndroid='transparent'
            placeholder=''
          />
        </View>
      </View>
    )
  }

  renderSeparator () {
    return (
      <View style={{ height: ratioHeight(7) }} />
    )
  }

  textPhone = (text) => {
    this.setState({
      phone: text,
      errorPhone: false
    })
  }

  search () {
    const { phone } = this.state
    if (phone.length < 10) {
      this.setState({
        errorPhone: true
      })
    }
  }

  textOTP1 = (text) => {
    this.setState({ otp1: text })
    if (text !== '') {
      this.refs.otp2.focus()
    }
  }

  textOTP2 = (text) => {
    this.setState({ otp2: text })
    if (text !== '') {
      this.refs.otp3.focus()
    } else {
      this.refs.otp1.focus()
    }
  }

  textOTP3 = (text) => {
    this.setState({ otp3: text })
    if (text !== '') {
      this.refs.otp4.focus()
    } else {
      this.refs.otp2.focus()
    }
  }

  textOTP4 = (text) => {
    this.setState({ otp4: text })
    if (text !== '') {
      this.refs.otp5.focus()
    } else {
      this.refs.otp3.focus()
    }
  }

  textOTP5 = (text) => {
    this.setState({ otp5: text })
    if (text !== '') {
      this.refs.otp6.focus()
    } else {
      this.refs.otp4.focus()
    }
  }

  textOTP6 = (text) => {
    this.setState({ otp6: text })
    if (text === '') {
      this.refs.otp5.focus()
    }
  }

  openModalSuccess () {
    const { otp1, otp2, otp3, otp4, otp5, otp6 } = this.state
    if (otp1 !== '' && otp2 !== '' && otp3 !== '' && otp4 !== '' && otp5 !== '' && otp6 !== '') {
      this.setState({ showModalOtp: false, showModalSuccess: true, otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' })
    } else {
      ToastAndroid.show(I18n.t('toast_otp'), ToastAndroid.SHORT)
    }
  }

  openHome () {
    this.props.navigation.navigate('BottomNav')
    this.setState({
      showModalSuccess: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderInput()}
        <ScrollView style={styles.container}>
          {this.renderData()}
        </ScrollView>
        {this.renderModalOTP()}
        {this.renderModalSuccess()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RefundList)
