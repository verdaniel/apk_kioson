import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../Themes'
import { price } from '../../Transforms/LocalConfig'
import FooterFrom from '../../Components/FooterFrom'
import CheckBox from '../../Components/CheckBox'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/LoanConfirmationStyle'

class LoanConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {
        name: 'Samsung J2 Prime',
        price: '1630598',
        adminFee: '104800',
        tenor: '6',
        payment: '289113'
      },
      balance: {
        name: 'Saldo',
        price: '1000000',
        adminFee: '10000',
        tenor: '14',
        payment: '1000000'
      },
      isChecked: false,
      type: 1,
      resi: '433WSJCX'
    }
  }

  // componentWillMount () {
  //   const { params } = this.props.navigation.state
  //   this.setState({
  //     type: params.type,
  //     balance: {
  //       ...this.state.balance,
  //       payment: String(params.price),
  //       price: String(params.price),
  //       adminFee: String(params.price / 100)
  //     }
  //   })
  // }

  renderBody () {
    const { product, balance, type } = this.state
    if (type === 1) {
      const moneyPrice = price(product.price)
      const moneyFee = price(product.adminFee)
      return (
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{I18n.t('t_loan')}</Text>
          </View>
          {this.renderData(I18n.t('l_orperatorservice'), 'Danamas')}
          {this.renderData(I18n.t('l_product'), product.name)}
          {this.renderData(I18n.t('l_productprice'), 'Rp ' + moneyPrice)}
          {this.renderData(I18n.t('l_adminFee'), 'Rp ' + moneyFee)}
          {this.renderData(I18n.t('l_tenor'), product.tenor + ' Bulan')}
        </View>
      )
    } else {
      const moneyPrice = price(balance.price)
      const moneyFee = price(balance.adminFee)
      return (
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{I18n.t('t_loan')}</Text>
          </View>
          {this.renderData(I18n.t('l_product'), balance.name)}
          {this.renderData(I18n.t('l_productprice'), 'Rp ' + moneyPrice)}
          {this.renderData(I18n.t('l_adminFee'), 'Rp ' + moneyFee)}
          {this.renderData(I18n.t('l_tenor'), balance.tenor + ' Hari')}
        </View>
      )
    }
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.label, { textAlign: 'right' }]}>{data}</Text>
      </View>
    )
  }

  renderpayment () {
    const { product, balance, type } = this.state
    if (type === 1) {
      const paymentMoney = price(product.payment)
      return (
        <View style={styles.paymentContainer}>
          <Text style={[styles.payment, { flex: 1 }]}>{I18n.t('l_monthlypayment')}</Text>
          <Text style={styles.payment}>Rp {paymentMoney}</Text>
        </View>
      )
    } else {
      const paymentMoney = price(balance.payment)
      return (
        <View style={styles.paymentContainer}>
          <Text style={[styles.payment, { flex: 1 }]}>{I18n.t('l_totalinstallmentbalance')}</Text>
          <Text style={styles.payment}>Rp {paymentMoney}</Text>
        </View>
      )
    }
  }

  renderButton () {
    const { isChecked } = this.state
    const background = isChecked ? Colors.nice_blue : Colors.greyish
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: background }]}
          disabled={!isChecked}
          onPress={() => this.payment()}
        >
          <Text style={styles.textButton}>
            {I18n.t('b_requestinstallment')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  payment () {
    const { type, balance, product, resi } = this.state
    let amount, name, pay
    if (type === 1) {
      amount = price(product.price)
      name = product.name
      pay = I18n.t('l_installment') + ' Rp ' + price(product.payment)
    } else {
      amount = price(balance.price)
      name = I18n.t('l_balance') + ' Rp ' + amount
      pay = ' Rp ' + amount
    }
    var payment =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#{resi}</Text>
        <Text style={styles.robotoRegularSmallGrey}>{I18n.t('t_loan')}</Text>
        <Text style={styles.robotoBoldSmallGrey}>{name}</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>{pay}</Text>
      </View>)
    this.props.navigation.navigate('SuccessPurchase',
      {
        component: payment,
        icon: Images.ic_pinjaman,
        loan: true
      })
  }

  check () {
    const { isChecked } = this.state
    if (isChecked) {
      this.setState({
        isChecked: false
      })
    } else {
      this.setState({
        isChecked: true
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderBody()}
          {this.renderpayment()}
          <FooterFrom title={I18n.t('l_installmentnotif')} />
          <CheckBox title={I18n.t('l_tncinstallment')} isChecked={false} onPress={() => this.check()} />
        </ScrollView>
        {this.renderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanConfirmation)
