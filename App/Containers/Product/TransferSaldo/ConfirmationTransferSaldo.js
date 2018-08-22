import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import Coupon from '../../../Components/Coupon'
import ButtonForm from '../../../Components/ButtonForm'
import LoadingModal from '../../../Components/Loading'

import BankAction from '../../../Redux/MoneyRedux'

import I18n from '../../../I18n'
import ThousandFormat from '../../../Services/ThousandFormat'
import styles from '../../Styles/PaymentTransferMoneyStyle'
import { Colors } from '../../../Themes/'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'

class ConfirmationTransferSaldo extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state

    this.state = {
      modalLoading: false,
      discount: false,
      serviceProductId: params.data.serviceProductId,
      price: params.data.price,
      transferAmount: params.data.transferAmount,
      destinationNumber: params.data.destinationNumber,
      destinationName: params.data.destinationName,
      charge: params.data.charge,
      token: params.data.token,
      discountAmount: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    const { orderMoneyProps, dataCoupon } = nextProps
    const { price, destinationName, destinationNumber, transferAmount } = this.state
    if (dataCoupon !== this.props.dataCoupon && dataCoupon) {
      console.tron.warn(dataCoupon)
      if (dataCoupon.code === 200 && dataCoupon.status) {
        this.setState({
          modalLoading: false,
          discount: true,
          discountAmount: dataCoupon.data.amount,
          price: price - dataCoupon.data.amount
        })
        dataCoupon.code = 0
      }
    }
    if (orderMoneyProps !== this.props.orderMoneyProps && orderMoneyProps) {
      if (orderMoneyProps.code === 200 && orderMoneyProps.status) {
        if (orderMoneyProps.data.length !== 0) {
          this.setState({
            modalLoading: false
          })
          this.props.navigation.navigate('SuccesTransferSaldo',
            {
              data: orderMoneyProps.data,
              destinationNumber,
              destinationName,
              transferAmount,
              totalPrice: price
            }
          )
        }
      } else if (!orderMoneyProps.status && orderMoneyProps.code !== 0) {
        ToastAndroid.show(orderMoneyProps.message, ToastAndroid.SHORT)
        this.setState({
          modalLoading: false
        })
        orderMoneyProps.code = 0
      }
    }
  }

  onChangeCoupon (discount, discountAmount) {
    this.setState({discount: discount, discountAmount: discountAmount})
  }

  onSubmit () {
    const { serviceProductId, destinationNumber, destinationName, transferAmount, coupon, token } = this.state
    this.setState({ modalLoading: true })

    this.props.orderMoney({
      serviceProductId,
      destinationNumber,
      destinationName,
      transferAmount,
      coupon,
      token
    })
  }

  formReceiver () {
    const {destinationNumber, destinationName, transferAmount} = this.state
    var amountMasked = ThousandFormat(+transferAmount)
    return (
      <View style={styles.header}>
        <View style={styles.headerIndside}>
          <View style={[styles.borderBottom]}>
            <Text style={[styles.textRegularLarge, { flex: 1, paddingBottom: ratioHeight(7) }]}>Transfer Saldo</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={[styles.textRegularMed, { flex: 1 }]}>Nomor Ponsel Tujuan</Text>
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

  render () {
    const { modalLoading, transferAmount, discountAmount, charge } = this.state
    var priceMasked = ThousandFormat(+transferAmount)
    var chargeMasked = ThousandFormat(+charge)
    var discountMasked = ThousandFormat(+discountAmount)
    var totalPrice = (+transferAmount + +charge) - +this.state.discountAmount
    var totalPriceMasked = ThousandFormat(totalPrice)

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView>
          {this.formReceiver()}
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
        <LoadingModal visible={modalLoading} onRequestClose={() => this.onRequestClose()} />
        <ButtonForm
          onPress={() => this.onSubmit()}
          disabled={false}
          lable={'BAYAR'}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationTransferSaldo)
