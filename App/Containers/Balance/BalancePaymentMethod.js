import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput
} from 'react-native'
import Coupon from '../../Components/Coupon'
import accounting from 'accounting'
import { connect } from 'react-redux'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { Colors, Images, Fonts } from '../../Themes'
import I18n from 'react-native-i18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/BalancePaymentMethodStyle'

class BalancePaymentMethod extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: 0,
      realAmount: 0,
      voucherValidity: 0,
      voucher: '',
      discount: 0,
      adminFee: 231,
      activePayment: 0,
      id: 756,
      totalPrice: ''
    }
  }

  componentWillMount () {
    try {
      const { params } = this.props.navigation.state
      this.setState({
        amount: params.amount,
        realAmount: params.amount
      })
    } catch (e) {
      this.setState({
        amount: 0
      })
    }
    const temp = Math.floor(Math.random() * (1000 - 100)) + 100
    this.setState({
      adminFee: temp
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCoupon !== null) {
      if (nextProps.dataCoupon.code === 200 && nextProps.dataCoupon.status) {
        const { params } = this.props.navigation.state
        this.setState({
          discount: nextProps.dataCoupon.data.coupon_value,
          totalPrice: params.price - nextProps.dataCoupon.data.coupon_value
        })
        nextProps.dataCoupon.code = 0
      }
    }
  }

  renderNav () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.ic_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {I18n.t('l_refillbalance')}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderAmount () {
    const { amount } = this.state
    var options = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var maskedMoney = accounting.formatMoney(amount, options)
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          {I18n.t('l_inputnominal')}
        </Text>
        <Text style={[styles.amount, { marginLeft: ratioWidth(10), marginTop: ratioHeight(7) }]}>
          Rp {maskedMoney}
        </Text>
      </View>
    )
  }

  renderVoucher () {
    const { voucherValidity, voucher, discount } = this.state
    let borderColor, renderDiscount

    switch (voucherValidity) {
      case 0:
        borderColor = Colors.black_15
        renderDiscount = null
        break
      case 1:
        renderDiscount = (
          <Text style={[styles.discount, { marginTop: ratioHeight(3), color: Colors.nice_blue }]}>
            {I18n.t('l_getdiscount')} {discount}
          </Text>
        )
        borderColor = Colors.black_15
        break
      case 2:
        renderDiscount = (
          <Text style={[styles.discount, { marginTop: ratioHeight(3), color: Colors.red }]}>
            {I18n.t('e_voucher')}
          </Text>
        )
        borderColor = Colors.red
        break
      default:
        borderColor = Colors.black_15
        renderDiscount = null
    }
    return (
      <View style={styles.voucherContainer}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={[styles.inputVoucherContainer, { borderBottomColor: borderColor }]}>
            <TextInput
              style={[styles.input, { marginTop: ratioHeight(2), flex: 1 }]}
              value={voucher}
              onChangeText={(text) => this.setState({ voucher: text.toUpperCase() })}
              underlineColorAndroid='transparent'
              placeholder={I18n.t('p_voucher')}
            />
          </View>
          {renderDiscount}
        </View>
        <TouchableOpacity style={styles.voucherButton} onPress={() => this.checkVoucher()}>
          <Text style={styles.textButton}>
            {I18n.t('b_use')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderLabel (label) {
    return (
      <Text style={styles.labelTitle}>
        {label}
      </Text>
    )
  }

  renderData (label, image) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.input, { flex: 1 }]}>
          {label}
        </Text>
        <Image source={image} style={styles.image} />
      </View>
    )
  }

  renderTransferBank () {
    const { activePayment } = this.state
    let detailMandiri = null
    let detailBCA = null
    if (activePayment === 1) {
      detailMandiri = this.renderDetail()
    } else if (activePayment === 2) {
      detailBCA = this.renderDetail()
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.detail(1)}>
          {this.renderData(I18n.t('bank_mandiri'), Images.ic_bank_mandiri)}
        </TouchableOpacity>
        {detailMandiri}
        <TouchableOpacity onPress={() => this.detail(2)}>
          {this.renderData(I18n.t('bank_bca'), Images.ic_bank_bca)}
        </TouchableOpacity>
        {detailBCA}
      </View>
    )
  }

  renderVirtualAccount () {
    const { activePayment } = this.state
    let detailBRI = null
    let detailSinarmas = null
    if (activePayment === 3) {
      detailBRI = this.renderDetail()
    } else if (activePayment === 4) {
      detailSinarmas = this.renderDetail()
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.detail(3)}>
          {this.renderData(I18n.t('bank_bri'), Images.ic_bank_bri)}
        </TouchableOpacity>
        {detailBRI}
        <TouchableOpacity onPress={() => this.detail(4)}>
          {this.renderData(I18n.t('bank_sinarmas'), Images.ic_bank_sinarmas)}
        </TouchableOpacity>
        {detailSinarmas}
      </View>
    )
  }

  renderDetail () {
    const { realAmount, discount, adminFee } = this.state
    let renderDiscount = null
    if (discount > 0) {
      var options = {
        symbol: '',
        decimal: ',',
        thousand: '.',
        precision: 0,
        format: '%s%v'
      }
      var maskedDiscount = accounting.formatMoney(discount, options)
      renderDiscount = (
        <View style={styles.dataDetailContainer}>
          <Text style={[styles.input, { flex: 1, color: Colors.greyish }]}>
            {I18n.t('l_discount')}
          </Text>
          <Text style={[styles.input, { color: Colors.greyish, textAlign: 'right' }]}>
            - Rp {maskedDiscount}
          </Text>
        </View>
      )
    }
    const total = parseInt(realAmount) + parseInt(adminFee) - parseInt(discount)
    var options1 = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var maskedTotal = accounting.formatMoney(total, options1)
    var options2 = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var maskedAmount = accounting.formatMoney(realAmount, options2)
    return (
      <View style={styles.detailContainer}>
        <View style={styles.dataDetailContainer}>
          <Text style={[styles.input, { flex: 1, color: Colors.greyish }]}>
            {I18n.t('b_balancesmall')}
          </Text>
          <Text style={[styles.input, { color: Colors.greyish, textAlign: 'right' }]}>
            Rp {maskedAmount}
          </Text>
        </View>
        <View style={styles.dataDetailContainer}>
          <Text style={[styles.input, { flex: 1, color: Colors.greyish }]}>
            {I18n.t('l_adminfee')}
          </Text>
          <Text style={[styles.input, { color: Colors.greyish, textAlign: 'right' }]}>
            Rp {adminFee}
          </Text>
        </View>
        {renderDiscount}
        <View style={styles.dataTotalDetailContainer}>
          <Text style={[styles.input, { flex: 1, color: Colors.nice_blue, fontFamily: Fonts.type.robotoBold }]}>
            {I18n.t('l_total')}
          </Text>
          <Text style={[styles.input, { color: Colors.nice_blue, textAlign: 'right', fontFamily: Fonts.type.robotoBold }]}>
            Rp {maskedTotal}
          </Text>
        </View>
        <View style={[styles.dataTotalDetailContainer, { borderTopWidth: 0, paddingBottom: ratioHeight(10) }]}>
          <TouchableOpacity style={styles.paidButton} onPress={() => this.payment()}>
            <Text style={styles.textButton}>
              {I18n.t('b_totalPaidSmall')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  payment () {
    const { realAmount, activePayment, adminFee, discount } = this.state
    this.props.navigation.navigate('BalanceTransferBankThankPage', {
      amount: realAmount,
      discount: discount,
      adminFee: adminFee,
      activePayment: activePayment,
      key: this.props.navigation.state.key
    })
  }

  detail (active) {
    const { activePayment } = this.state
    if (activePayment !== active) {
      this.setState({
        activePayment: active
      })
    } else {
      this.setState({
        activePayment: 0
      })
    }
  }

  checkVoucher () {
    const { voucher } = this.state
    if (voucher === 'MERDEKA') {
      this.setState({
        voucherValidity: 1,
        discount: 1000
      })
    } else {
      this.setState({
        voucherValidity: 2
      })
    }
  }

  onChangeCoupon (discount, discountAmount) {
  }

  render () {
    const { activePayment } = this.state
    let detailCanvaser = null
    if (activePayment === 5) {
      detailCanvaser = this.renderDetail()
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderNav()}
        <ScrollView>
          {this.renderAmount()}
          <Coupon id={this.state.id} onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)} placeholder='Kode Promo' />
          {this.renderLabel(I18n.t('t_transferbank'))}
          {this.renderTransferBank()}
          {this.renderLabel(I18n.t('t_va'))}
          {this.renderVirtualAccount()}
          {this.renderLabel(I18n.t('t_offlinestore'))}
          <TouchableOpacity onPress={() => this.detail(5)}>
            {this.renderData(I18n.t('t_canvaser'), null)}
          </TouchableOpacity>
          {detailCanvaser}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCoupon: state.coupon.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalancePaymentMethod)
