import React, { Component } from 'react'
import { ScrollView, Text, FlatList, StatusBar, View, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// import { NavigationActions } from 'react-navigation'
import Coupon from '../../../Components/Coupon'
import ButtonForm from '../../../Components/ButtonForm'
import ModalOneButton from '../../../Components/ModalOneButton'
import ModalTwoButton from '../../../Components/ModalTwoButton'
import ModalInputPin from '../../../Components/ModalInputPin'
import ThousandFormat from '../../../Services/ThousandFormat'
import LoadingModal from '../../../Components/Loading'
import I18n from '../../../I18n'
import {Colors, Images} from '../../../Themes/'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'

// Styles
import styles from '../../Styles/BpjsPaymentConfirmationStyle'
import { moderateScale } from '../../../Transforms/Scaling'

class BpjsPaymentConfirmation extends Component {
  constructor (props) {
    super(props)
    this.error = {
      coupon: true
    }
    this.submitting = {
      order: false
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
      metode: [
        {id: 0, label: I18n.t('l_balance'), value: 'Rp 199.000.000', isActive: false},
        {id: 1, label: I18n.t('l_kioscash'), value: 'Rp 199.000.000', isActive: false}
      ]
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
    this.setState({ modalInputPin: false, modalLodaing: true })
    const { navigate } = this.props.navigation
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

  methodClick (index) {
    const { metode } = this.state
    metode.map((data, i) => { data.isActive = false })
    this.setState({ ...metode })
    if (metode[index].isActive) {
      metode[index].isActive = false
      this.setState({
        ...metode
      })
    } else {
      metode[index].isActive = true
      this.setState({
        ...metode
      })
    }
  }

  render () {
    const {dataDetail, titleForm, discountAmount, dataConfirmation, discount, metode} = this.state
    var priceMasked = ThousandFormat(+dataConfirmation.actual_amount)
    var chargeMasked = ThousandFormat(+dataConfirmation.charge)
    var discountMasked = ThousandFormat(+discountAmount)
    var totalPrice = (+dataConfirmation.total_amount + +dataConfirmation.charge) - +this.state.discountAmount
    var totalPriceMasked = ThousandFormat(totalPrice)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
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
            <View style={styles.header}>
              <View style={[styles.borderBottom, {borderBottomWidth: 0}]}>
                <View style={styles.flexRow}>
                  <Text numberOfLines={0} style={[styles.textRegularMed, {textAlign: 'left', flex: 1}]}>{I18n.t('l_numberOfMonths')}</Text>
                  <Text numberOfLines={2} style={[styles.textMediumHeader, {textAlign: 'right', flex: 1}]}>10 Bulan</Text>
                </View>
              </View>
            </View>
            <Coupon focus={(value) => this.setState({couponFocus: value})} price={this.state.price} onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)} />
            <View style={styles.footer}>
              <View style={[styles.headerIndside, {paddingTop: 0, paddingBottom: 0}]}>
                <View style={[styles.flexRowflat]}>
                  <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_price')}</Text>
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
            <View style={[styles.footer, {marginTop: ratioHeight(10)}]}>
              <View style={[styles.headerIndside, {paddingTop: 0, paddingBottom: 0, marginHorizontal: ratioWidth(10)}]}>
                <View>
                  <Text style={[styles.textMedium, { paddingTop: ratioHeight(10), flex: 1, color: Colors.greyish, fontSize: moderateScale(12) }]}>{I18n.t('l_refillbalance').toUpperCase()}</Text>
                </View>
                <View>
                  {metode.map((data, i) => {
                    var borderBottom = 0.5
                    if (i === metode.length - 1) {
                      borderBottom = 0
                    }
                    return (
                      <TouchableOpacity
                        onPress={() => this.methodClick(i)}
                        style={[styles.flexColumnCustom, {borderBottomWidth: borderBottom}]}>
                        <Image source={Images.ic_saldo} style={styles.leftIcon} resizeMode='contain' />
                        <View style={{flex: 1}}>
                          <Text style={[styles.textBoldSquas, { flex: 1 }]}>{data.label}</Text>
                          <Text style={[styles.textMedium, { paddingVertical: ratioHeight(2), flex: 1 }]}>{data.value}</Text>
                        </View>
                        <Image source={data.isActive ? Images.radioOn : Images.radioOff} style={styles.rightIcon} resizeMode='contain' />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
          <ButtonForm
            onPress={() => this.orderOnPress(totalPrice)}
            lable={I18n.t('b_totalPaid')}
            disabled={false}
          />
        </View>
        {this.modalBalance()}
        {this.modalConfrimPin()}
        {this.modalInputPin()}
        <LoadingModal visible={false} onRequestClose={() => this.props.navigation.goBack()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BpjsPaymentConfirmation)
