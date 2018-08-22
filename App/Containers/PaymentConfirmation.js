import React, { Component } from 'react'
import { ScrollView, Text, FlatList, StatusBar, View, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// import { NavigationActions } from 'react-navigation'
import Coupon from '../Components/Coupon'
import ButtonForm from '../Components/ButtonForm'
import ModalOneButton from '../Components/ModalOneButton'
import ModalTwoButton from '../Components/ModalTwoButton'
import ModalInputPin from '../Components/ModalInputPin'
import PaymentMethod from '../Components/PaymentMethod'
import ThousandFormat from '../Services/ThousandFormat'
import LoadingModal from '../Components/Loading'
import accounting from 'accounting'
import I18n from '../I18n'
import {Colors, Fonts} from '../Themes/'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import Images from '../Themes/Images'
import RechargeMobileRedux from '../Redux/RechargeMobileRedux'
import RechargeMobileDataRedux from '../Redux/RechargeMobileDataRedux'
import voucherGameAction from '../Redux/VoucherGame'
import PostpaidRedux from '../Redux/PostpaidRedux'
import PhoneRedux from '../Redux/PhoneRedux'
import PdamRedux from '../Redux/PdamRedux'
import BankAction from '../Redux/MoneyRedux'

// Styles
import styles from './Styles/PaymentConfirmationStyle'
import { moderateScale } from '../Transforms/Scaling';

class PaymentConfirmation extends Component {
  constructor (props) {
    super(props)
    this.error = {
      coupon: true
    }
    this.submitting = {
      orderMobile: false,
      orderMobileData: false,
      orderPostpaid: false,
      orderPhone: false,
      orderPdam: false,
      orderVoucherGame: false,
      transferSaldo: false
    }
    const { params } = this.props.navigation.state
    this.state = {
      dataDetail: params.dataDetail,
      titleForm: params.titleForm,
      serviceType: params.serviceType,
      dataConfirmation: params.dataConfirmation,
      serviceProductId: params.serviceProductId,
      phoneNumber: params.phoneNumber,
      discount: false,
      discountAmount: 0,
      coupon: '',
      modalBalance: false,
      modalPin: false,
      modalInputPin: false,
      nextTime: false,
      totalPrice: '',
      modalLodaing: false,
      pinStatus: false,
      couponFocus: false,
      isKyc: this.props.dataLogin.kyc,
      isKiosTunai: true,
      isSaldo: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('pinStatus').then((value) => {
      if (value === 'true') {
        this.setState({ pinStatus: true })
      }
    })
  }

  passingComponent (value) {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>{value.fieldOne}</Text>
        <Text style={styles.robotoRegularSmallGrey}>{value.fieldTwo}</Text>
        <Text style={styles.robotoBoldSmallGrey}>{value.fieldThree}</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(value.fieldFour)}</Text>
      </View>
    )
  }

  navigateScreen (data) {
    const { navigate } = this.props.navigation
    navigate('SuccessPurchase',
      {
        component: data.component,
        icon: data.icon,
        print: data.print
      })
  }

  componentWillReceiveProps (nextProps) {
    const {orderMobile, orderMobileData, orderPostpaid, orderPhone, orderPdam, orderMoneyProps} = nextProps
    var dataComponent = {}
    var navigateData = {}
    if (nextProps.dataCoupon !== null) {
      if (nextProps.dataCoupon.code === 200 && nextProps.dataCoupon.status) {
        const { params } = this.props.navigation.state
        this.setState({
          modalLodaing: false,
          discount: true,
          discountAmount: nextProps.dataCoupon.data.amount,
          totalPrice: params.dataConfirmation.amount - nextProps.dataCoupon.data.amount
        })
        nextProps.dataCoupon.code = 0
      }
    }

    if (this.submitting.orderMobile === true) {
      if (this.props.orderMobile.fetching && !orderMobile.fetching) {
        if (orderMobile.payload && !orderMobile.error) {
          this.submitting = { ...this.submitting, orderMobile: false }
          dataComponent = {
            fieldOne: orderMobile.payload.data.order_id,
            fieldTwo: orderMobile.payload.data.service_product,
            fieldThree: orderMobile.payload.data.phone_number,
            fieldFour: orderMobile.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_pulsa,
            print: orderMobile.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }

    if (this.submitting.orderMobileData === true) {
      if (this.props.orderMobileData.fetching && !orderMobileData.fetching) {
        if (orderMobileData.payload && !orderMobileData.error) {
          this.submitting = { ...this.submitting, orderMobileData: false }
          dataComponent = {
            fieldOne: orderMobileData.payload.data.order_id,
            fieldTwo: orderMobileData.payload.data.service_product,
            fieldThree: orderMobileData.payload.data.phone_number,
            fieldFour: orderMobileData.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_pulsa,
            print: orderMobileData.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }

    if (this.submitting.orderPostpaid === true) {
      if (this.props.orderPostpaid.fetching && !orderPostpaid.fetching) {
        if (orderPostpaid.payload && !orderPostpaid.error) {
          this.submitting = { ...this.submitting, orderPostpaid: false }
          dataComponent = {
            fieldOne: orderPostpaid.payload.data.order_id,
            fieldTwo: orderPostpaid.payload.data.service_product,
            fieldThree: orderPostpaid.payload.data.phone_number,
            fieldFour: orderPostpaid.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_pascabayar,
            print: orderPostpaid.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }

    if (this.submitting.orderPhone === true) {
      if (this.props.orderPhone.fetching && !orderPhone.fetching) {
        if (orderPhone.payload && !orderPhone.error) {
          this.submitting = { ...this.submitting, orderPhone: false }
          dataComponent = {
            fieldOne: orderPhone.payload.data.order_id,
            fieldTwo: orderPhone.payload.data.service_product,
            fieldThree: I18n.t('l_phonenumber') + ': ' + orderPhone.payload.data.customer_id,
            fieldFour: orderPhone.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_telkom,
            print: orderPhone.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }

    if (this.submitting.orderPdam === true) {
      if (this.props.orderPdam.fetching && !orderPdam.fetching) {
        if (orderPdam.payload && !orderPdam.error) {
          this.submitting = { ...this.submitting, orderPdam: false }
          dataComponent = {
            fieldOne: orderPdam.payload.data.order_id,
            fieldTwo: orderPdam.payload.data.service_product,
            fieldThree: I18n.t('l_id') + ': ' + orderPdam.payload.data.customer_id,
            fieldFour: orderPdam.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_telkom,
            print: orderPdam.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }

    if (this.submitting.transferSaldo) {
      if (this.props.orderMoneyProps.fetching && !orderMoneyProps.fetching) {
        if (orderMoneyProps.payload && !orderMoneyProps.error) {
          this.submitting = { ...this.submitting, transferSaldo: false }
          dataComponent = {
            fieldOne: orderMoneyProps.payload.data.order_id,
            fieldTwo: orderMoneyProps.payload.data.service_product,
            fieldThree: this.state.dataConfirmation.holder_name + ' ' + this.state.dataConfirmation.phone_number,
            fieldFour: orderMoneyProps.payload.data.amount
          }
          navigateData = {
            component: this.passingComponent(dataComponent),
            icon: Images.ic_telkom,
            print: orderMoneyProps.payload.data.print
          }
          this.navigateScreen(navigateData)
        }
      }
    }
  }

  modalBalance () {
    return (
      <ModalOneButton
        isOpen={this.state.modalBalance}
        onClosed={() => this.setState({ modalBalance: false })}
        onPress={() => this.setState({ modalBalance: false })}
        title={'GAGAL'}
        desc={'Saldo tidak cukup\nuntuk melakukan transaksi!'}
        button={'OK'} />
    )
  }

  modalConfrimPin () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalPin}
        onClosed={() => this.setState({ modalPin: false })}
        onPressFalse={() => this.setState({ modalPin: false, nextTime: true })}
        onPressTrue={() => this.setState({ modalPin: false, modalInputPin: true })}
        title={'PIN TIDAK AKTIF'}
        desc={'Demi keamanan bertransaksi,\nsilahkan aktifkan PIN Anda.'}
        buttonFalse={'Lain Kali'}
        buttonTrue={'Aktifkan'} />
    )
  }

  modalInputPin () {
    return (
      <ModalInputPin
        isOpen={this.state.modalInputPin}
        onClosed={() => this.setState({ modalInputPin: false })}
        onPress={(pinNumber) => this.postOrder(pinNumber)}
        title={'MASUKKAN PIN ANDA'}
        button={'Konfirmasi'} />
    )
  }

  onChangeCoupon (discount, discountAmount) {
    this.setState({ discount: discount, discountAmount: discountAmount })
  }

  orderOnPress (totalPrice) {
    this.setState({ totalPrice: totalPrice })
    if (this.state.pinStatus) {
      this.setState({modalInputPin: true})
    } else {
      if (!this.state.nextTime) {
        this.setState({ modalPin: true })
      } else {
        this.postOrder()
      }
    }
  }

  postOrder (pinNumber) {
    const { serviceType, serviceProductId, phoneNumber, coupon, dataConfirmation } = this.state
    this.setState({ modalInputPin: false, modalLodaing: true })
    const { navigate } = this.props.navigation
    if (serviceType === 'mobileCharge') {
      this.props.postOrderRechargeMobile({
        pin: '123456',
        serviceProductId: serviceProductId,
        phoneNumber: phoneNumber,
        couponCode: coupon
      })
      this.submitting.orderMobile = true
    } else if (this.state.serviceType === 'mobileDataCharge') {
      this.props.postOrderRechargeMobileData({
        pin: '123456',
        serviceProductId: serviceProductId,
        phoneNumber: phoneNumber,
        couponCode: coupon
      })
      this.submitting.orderMobileData = true
    } else if (this.state.serviceType === 'postpaid') {
      this.props.postOrderPostpaid({
        pin: '123456',
        serviceProductId: serviceProductId,
        phoneNumber: phoneNumber,
        couponCode: coupon
      })
      this.submitting.orderPostpaid = true
    } else if (this.state.serviceType === 'phone') {
      this.props.postOrderPhone({
        pin: '123456',
        phoneNumber: dataConfirmation.customer_phone,
        customerId: dataConfirmation.customer_id,
        couponCode: coupon
      })
      this.submitting.orderPhone = true
    } else if (this.state.serviceType === 'water') {
      this.props.postOrderPdam({
        pin: '123456',
        serviceProductId: serviceProductId,
        customerId: dataConfirmation.customer_id,
        phoneNumber: phoneNumber,
        couponCode: coupon
      })
      this.submitting.orderPdam = true
    } else if (this.state.serviceType === 'installment') {
      var installment =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Bayar Angsuran Columbia - Januari 2017</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_id')}AJSH273HSBI</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: installment,
          icon: Images.ic_angsuran
        })
    } else if (this.state.serviceType === 'voucherGame') {
      // this.props.orderVoucherGame({
      //   pin: '123456',
      //   id: this.state.serviceProductId,
      //   phoneNumber: this.state.phoneNumber,
      //   couponCode: this.state.coupon
      // })
      // this.submitting.orderVoucherGame = true
      var voucherGame =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>GEMSCOOL 3000 G-Cash</Text>
        <Text style={styles.robotoBoldSmallGrey}>081295513746</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: voucherGame,
          icon: Images.ic_voucher_game
        })
    } else if (this.state.serviceType === 'bpjs') {
      var bpjs =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>BPJS Kesehatan - 2 Bulan</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_idCustomer')}12345678</Text>
        <Text style={styles.robotoRegularSmallGrey}>Adele Grande</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: bpjs,
          icon: Images.ic_asuransi
        })
    } else if (this.state.serviceType === 'kai') {
      var kai =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Malioboro Ekspres Malam / 18 Okt 2017 - 21:00 WIB</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_codePayment')}123989087900</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: kai,
          icon: Images.ic_kereta_api
        })
    } else if (this.state.serviceType === 'chips') {
      var chip =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>XL Dompul 5.000</Text>
        <Text style={styles.robotoBoldSmallGrey}>081295513746</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: chip,
          icon: Images.ic_top_up
        })
    } else if (this.state.serviceType === 'mediaTv') {
      var mediaTv =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>TV Kabel Orange TV - Januari 2017</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_idCustomer')}12345678</Text>
        <Text style={styles.robotoRegularSmallGrey}>Kiyosaki Teguh</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: mediaTv,
          icon: Images.ic_internet
        })
    } else if (this.state.serviceType === 'mediaInternet') {
      var mediaInternet =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Internet Speedy - Januari 2017</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_idCustomer')}12345678</Text>
        <Text style={styles.robotoRegularSmallGrey}>Kiyosaki Teguh</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: mediaInternet,
          icon: Images.ic_internet
        })
    } else if (this.state.serviceType === 'powerPostpaid') {
      var powerPostpaid =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Listrik PLN Pascabayar - Januari 2017</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_id')}0219295045</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: powerPostpaid,
          icon: Images.ic_pln
        })
    } else if (this.state.serviceType === 'powerPrepaid') {
      var powerPrepaid =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Token Listrik - 20.000</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_id')}0219295045</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(18300)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: powerPrepaid,
          icon: Images.ic_pln
        })
    } else if (this.state.serviceType === 'transferSaldo') {
      // const { dataDetail } = this.state
      // this.props.orderMoney({
      //   serviceProductId,
      //   destinationNumber: dataDetail[0]['detail'],
      //   destinationName: dataDetail[1]['detail'],
      //   transferAmount: dataDetail[2]['detail'],
      //   couponCode: coupon
      // })
      // this.submitting.transferSaldo = true

      const { dataDetail, totalPrice } = this.state
      var transferSaldo =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Transfer Saldo - {ThousandFormat(+dataDetail[2]['detail'])}</Text>
        <Text style={styles.robotoBoldSmallGrey}>{dataDetail[1]['detail'] + ' ' + dataDetail[0]['detail']}</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(totalPrice)}</Text>
      </View>)
      navigate('SuccessPurchase',
        {
          component: transferSaldo,
          icon: Images.ic_transfer_saldo
        })
    }
  }

  renderDetail = ({ item, index }) => {
    return (
      <View style={styles.flexRow}>
        <Text numberOfLines={0} style={[styles.textRegularMed, {textAlign: 'left', flex: 1}]}>{item.label}</Text>
        <Text numberOfLines={2} style={[styles.textMediumHeader, {textAlign: 'right', flex: 1}]}>{item.detail}</Text>
      </View>
    )
  }

  checkLabel (value) {
    if (value === 'mobileCharge' || value === 'mobileDataCharge' || value === 'mediaTv' || value === 'powerPrepaid') {
      return (
        <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_price')}</Text>
      )
    } else {
      return (
        <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_bill')}</Text>
      )
    }
  }

  render () {
    const { orderMobile, orderMobileData, orderPostpaid, orderPhone, orderPdam, orderMoneyProps, balance } = this.props
    const {serviceType, dataDetail, titleForm, discountAmount, dataConfirmation, discount, isKiosTunai, isSaldo, isKyc} = this.state
    var priceMasked = ThousandFormat(+dataConfirmation.actual_amount)
    var chargeMasked = ThousandFormat(+dataConfirmation.charge)
    var discountMasked = ThousandFormat(+discountAmount)
    var totalPrice = (+dataConfirmation.total_amount + +dataConfirmation.charge) - +this.state.discountAmount
    var totalPriceMasked = ThousandFormat(totalPrice)
    var tempBalance = balance.payload ? balance.payload.data.total_sales : 0
    var options = {
      symbol: 'Rp ',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var maskedMoney = accounting.formatMoney(tempBalance, options)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.borderBottom}>
              <Text style={styles.textRegularLarge}>{titleForm}</Text>
            </View>
            <View style={[styles.borderBottom, {borderBottomWidth: 0}]}>
              <FlatList
                data={dataDetail}
                renderItem={this.renderDetail}
              />
            </View>
          </View>
          <Coupon focus={(value) => this.setState({couponFocus: value})} price={this.state.price} onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)} />
          <View style={styles.footer}>
            <View style={[styles.headerIndside, {paddingTop: 0, paddingBottom: 0}]}>
              <View style={[styles.flexRowflat]}>
                {this.checkLabel(serviceType)}
                <Text style={[styles.textRegularMedGrey]}>Rp {priceMasked}</Text>
              </View>
              {dataConfirmation.charge !== 0 ? <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_adminFee')}</Text>
                <Text style={[styles.textRegularMedGrey]}>Rp {chargeMasked}</Text>
              </View> : <View />}
              {discount === true ? <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8), flex: 1 }]}>{I18n.t('l_discount')}</Text>
                <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8) }]}>- Rp {discountMasked}</Text>
              </View> : <View />}
              <View style={[styles.flexRowflat, {borderTopWidth: 0.5, borderTopColor: Colors.black_15}]}>
                <Text style={[styles.textMedium, { flex: 1 }]}>{I18n.t('l_totalPaid')}</Text>
                <Text style={[styles.textMedium]}>Rp {totalPriceMasked}</Text>
              </View>
            </View>
          </View>
          {isKyc && <PaymentMethod
          onPressKiosTunai={() => this.setState({isKiosTunai: true, isSaldo: false})}
          onPressSaldo={() => this.setState({isKiosTunai: false, isSaldo: true})}
          amountKiosTunai={maskedMoney}
          amountSaldo={maskedMoney}
          selectedKiosTunai={isKiosTunai}
          selectedSaldo={isSaldo}/>}
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15), backgroundColor: Colors.white}}>
          <ButtonForm
            onPress={() => this.orderOnPress(totalPrice)}
            lable={I18n.t('b_totalPaid')}
            disabled={false}
          />
        </View>
        {this.modalBalance()}
        {this.modalConfrimPin()}
        {this.modalInputPin()}
        <LoadingModal visible={
          orderMobile.fetching ||
          orderMobileData.fetching ||
          orderPostpaid.fetching ||
          orderPhone.fetching ||
          orderPdam.fetching ||
          orderMoneyProps.fetching
        } onRequestClose={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCoupon: state.coupon.payload,
    orderMobile: state.rechargeMobile.getOrderRechargeMobile,
    orderMobileData: state.rechargeMobileData.getOrderRechargeDataMobile,
    orderPostpaid: state.postpaid.postOrderPostpaid,
    orderPhone: state.phone.postOrderPhone,
    orderPdam: state.pdam.postOrderPdam,
    orderVoucherGame: state.vouchergame.getTopUp,
    orderMoneyProps: state.money.orderMoneys,
    balance: state.profile.getBalance,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postOrderRechargeMobile: (params) => dispatch(RechargeMobileRedux.orderRechargeMobileRequest(params)),
    postOrderRechargeMobileData: (params) => dispatch(RechargeMobileDataRedux.orderRechargeMobileDataRequest(params)),
    postOrderPostpaid: (params) => dispatch(PostpaidRedux.orderPostpaidRequest(params)),
    postOrderPhone: (params) => dispatch(PhoneRedux.orderPhoneRequest(params)),
    postOrderPdam: (param) => dispatch(PdamRedux.orderPdamRequest(param)),
    orderVoucherGame: (params) => dispatch(voucherGameAction.topupGameRequest(params)),
    orderMoney: (param) => dispatch(BankAction.orderMoneyRequest(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmation)
