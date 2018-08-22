import React, { Component } from 'react'
import { ScrollView, ToastAndroid, Text, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import Coupon from '../../../Components/Coupon'
import ButtonForm from '../../../Components/ButtonForm'
import ModalOneButton from '../../../Components/ModalOneButton'
import ModalTwoButton from '../../../Components/ModalTwoButton'
import ModalInputPin from '../../../Components/ModalInputPin'
import ThousandFormat from '../../../Services/ThousandFormat'
import I18n from '../../../I18n'
import BankAction from '../../../Redux/MoneyRedux'
import LoadingModal from '../../../Components/Loading'

import styles from '../../Styles/PaymentTransferMoneyStyle'
import { Colors } from '../../../Themes/'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'

class PaymentConfirmationTransferMoney extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const time = moment().format('DD MMM YYYY, h:mm').toString()
    this.state = {
      data: params.data,
      serviceProductId: params.data.serviceProductId,
      transferAmount: params.data.actual_amount,
      senderName: params.data.sender_name,
      senderMobileNumber: params.data.phone_number,
      bankChoose: params.data.destination_bank,
      destinationNumber: params.data.holder_account_number,
      destinationName: params.data.holder_name,
      charge: params.data.charge,
      totalAmount: params.data.total_amount,
      orderId: params.data.order_id,
      discount: false,
      discountAmount: 0,
      modalBalance: false,
      modalPin: false,
      modalInputPin: false,
      date: time,
      totalPrice: '',
      nextTime: false,
      coupon: '',
      pin: '',
      modalLodaing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { orderMoneyProps, dataCoupon } = nextProps
    const { transferAmount, senderName, senderMobileNumber, bankChoose, destinationName, destinationNumber, totalPrice } = this.state
    if (dataCoupon !== this.props.dataCoupon && dataCoupon) {
      if (dataCoupon.code === 200 && dataCoupon.status) {
        const { params } = this.props.navigation.state
        this.setState({
          modalLodaing: false,
          discount: true,
          discountAmount: dataCoupon.data.amount,
          totalPrice: params.data.total_amount - dataCoupon.data.amount
        })
        dataCoupon.code = 0
      }
    }
    console.tron.warn(orderMoneyProps)
    if (orderMoneyProps !== this.props.orderMoneyProps && orderMoneyProps) {
      if (orderMoneyProps.code === 200 && orderMoneyProps.status) {
        if (orderMoneyProps.data.length !== 0) {
          this.setState({
            modalLodaing: false
          })
          this.props.navigation.navigate('SuccessPaymentTrasferMoney',
            {
              data: orderMoneyProps.data,
              transferAmount,
              senderName,
              senderMobileNumber,
              bankChoose,
              destinationNumber,
              destinationName,
              totalPrice
            })
        }
      } else if (!orderMoneyProps.status && orderMoneyProps.code !== 0) {
        ToastAndroid.show(orderMoneyProps.message, ToastAndroid.SHORT)
        this.setState({
          modalLodaing: false
        })
        orderMoneyProps.code = 0
      }
    }
  }

  renderDiscount (status, discountAmount) {
    if (status) {
      return (
        <View style={[styles.flexRowflat]}>
          <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8), flex: 1 }]}>{I18n.t('l_discount')}</Text>
          <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8) }]}>- Rp {discountAmount}</Text>
        </View>
      )
    }
    return null
  }

  modalBalance () {
    return (
      <ModalOneButton
        isOpen={this.state.modalBalance}
        onClosed={() => this.setState({ modalBalance: false })}
        onPress={() => this.setState({ modalBalance: false })}
        title={I18n.t('l_balanceFail')}
        desc={I18n.t('l_balanceDesc')}
        button={I18n.t('b_ok')} />
    )
  }

  modalConfrimPin () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalPin}
        onClosed={() => this.setState({ modalPin: false })}
        onPressFalse={() => this.setState({ modalPin: false, nextTime: true })}
        onPressTrue={() => this.setState({ modalPin: false, modalInputPin: true })}
        title={I18n.t('l_pinPopupNotActive')}
        desc={I18n.t('l_pinPopupNotActiveDesc')}
        buttonFalse={I18n.t('b_nextTimeSmall')}
        buttonTrue={I18n.t('b_activeSmall')} />
    )
  }

  modalInputPin () {
    return (
      <ModalInputPin
        isOpen={this.state.modalInputPin}
        onClosed={() => this.setState({ modalInputPin: false })}
        onPress={() => this.onPressPayment()}
        title={I18n.t('l_pinPopup')}
        button={I18n.t('b_confirmSmall')} />
    )
  }

  formSender () {
    const { senderMobileNumber, senderName } = this.state
    return (
      <View style={styles.header}>
        <View style={styles.headerIndside}>
          <View style={[styles.flexRow, { paddingTop: 0 }]}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('p_senderName')}</Text>
            <Text style={styles.textMediumHeader}>{senderName}</Text>
          </View>
          <View style={[styles.flexRow, { paddingBottom: 0 }]}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('p_phonNumbrSender')}</Text>
            <Text style={styles.textMediumHeader}>{senderMobileNumber}</Text>
          </View>
        </View>
      </View>
    )
  }

  formReceiver () {
    const {bankChoose, destinationName, destinationNumber, transferAmount} = this.state
    var amountMasked = ThousandFormat(+transferAmount)
    return (
      <View style={styles.header}>
        <View style={styles.headerIndside}>
          <View style={[styles.borderBottom]}>
            <Text style={[styles.textRegularLarge, { flex: 1, paddingBottom: ratioHeight(7) }]}>Transfer Uang</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('l_destinationBank')}</Text>
            <Text style={styles.textMediumHeader}>{bankChoose}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('l_accountnumber')}</Text>
            <Text style={styles.textMediumHeader}>{destinationNumber}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('l_recipientName')}</Text>
            <Text style={styles.textMediumHeader}>{destinationName}</Text>
          </View>
          <View style={[styles.flexRow, { paddingBottom: 0 }]}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>{I18n.t('p_transferamount')}</Text>
            <Text style={styles.textMediumHeader}>Rp {amountMasked}</Text>
          </View>
        </View>
      </View>
    )
  }

  onChangeCoupon (discount, discountAmount) {
    this.setState({discount: discount, discountAmount: discountAmount})
  }

  onPressPayment () {
    this.setState({ modalLodaing: true, modalInputPin: false })
    const { params } = this.props.navigation.state
    this.props.orderMoney({
      pin: '1234567',
      serviceProductId: params.serviceProductId,
      holderAccountNumber: this.state.destinationNumber,
      holderName: this.state.destinationName,
      phoneNumber: this.state.senderMobileNumber,
      senderName: this.state.senderName,
      amount: this.state.totalPrice,
      coupon: this.state.coupon,
      token: params.token
    }
    )
  }

  bayarOnPress (totalPrice) {
    if (!this.state.nextTime) {
      this.setState({ modalPin: true, totalPrice: totalPrice })
    } else {
      this.onPressPayment()
    }
  }

  onRequestClose () {
    this.setState({ modalLodaing: false })
    this.props.navigation.goBack()
  }

  render () {
    const { modalLodaing, transferAmount, discountAmount, totalAmount, charge } = this.state
    var priceMasked = ThousandFormat(+transferAmount)
    var chargeMasked = ThousandFormat(+charge)
    var discountMasked = ThousandFormat(+discountAmount)
    var totalPrice = (+transferAmount + +charge) - +this.state.discountAmount
    var totalPriceMasked = ThousandFormat(totalPrice)
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
          {this.formReceiver()}
          {this.formSender()}
          <Coupon price={this.state.price} onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)} />
          <View style={styles.footer}>
            <View style={[styles.headerIndside, {paddingTop: 0, paddingBottom: 0, marginHorizontal: ratioWidth(15, 0.2)}]}>
              <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('Harga')}</Text>
                <Text style={[styles.textRegularMedGrey]}>Rp {priceMasked}</Text>
              </View>
              <View style={[[styles.flexRowflat]]}>
                <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_adminFee')}</Text>
                <Text style={[styles.textRegularMedGrey]}>Rp {chargeMasked}</Text>
              </View>
              {this.renderDiscount(this.state.discount, discountMasked)}
              <View style={[styles.flexRowflat, { borderTopWidth: 0.5, borderTopColor: Colors.black_15 }]}>
                <Text style={[styles.textMedium, { flex: 1 }]}>{I18n.t('l_totalPaid')}</Text>
                <Text style={[styles.textMedium]}>Rp {totalPriceMasked}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
        <View style={{paddingHorizontal: ratioWidth(10)}}>
          <ButtonForm
            onPress={() => this.bayarOnPress(totalAmount)}
            disabled={false}
            lable={'BAYAR'}
          />
        </View>
        {this.modalBalance()}
        {this.modalConfrimPin()}
        {this.modalInputPin()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCoupon: state.coupon.payload,
    orderMoneyProps: state.money.orderMoneys.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderMoney: (param) => dispatch(BankAction.orderMoneyRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmationTransferMoney)
