import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { Colors, Images } from '../../Themes'
import { price } from '../../Transforms/LocalConfig'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from '../Styles/LoanRepaymentStyle'

class LoanRepayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: '1000000',
      activePayment: 0,
      adminFee: 0,
      type: 1, // 1 gadget 2 balance
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
      }
    }
  }

  componentWillMount () {
    const temp = Math.floor(Math.random() * (1000 - 100)) + 100
    this.setState({
      adminFee: temp
    })
  }

  renderAmount () {
    const { amount } = this.state
    var maskedMoney = price(amount)
    return (
      <View style={styles.amountContainer}>
        <Text style={styles.label}>
          {I18n.t('l_bill')}
        </Text>
        <Text style={[styles.amount, { marginLeft: ratioWidth(10), marginTop: ratioHeight(7) }]}>
          Rp {maskedMoney}
        </Text>
      </View>
    )
  }

  renderVirtualAccount () {
    const { activePayment } = this.state
    let detailSinarmas = null
    if (activePayment === 4) {
      detailSinarmas = this.renderDetail()
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.detail(4)}>
          {this.renderData(I18n.t('bank_sinarmas'), Images.ic_bank_sinarmas)}
        </TouchableOpacity>
        {detailSinarmas}
      </View>
    )
  }

  renderCanvaser () {
    const { activePayment } = this.state
    let detailCanvaser = null
    if (activePayment === 5) {
      detailCanvaser = this.renderDetail()
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.detail(5)}>
          {this.renderData(I18n.t('t_canvaser'), null)}
        </TouchableOpacity>
        {detailCanvaser}
      </View>
    )
  }

  renderBalance () {
    const { activePayment } = this.state
    let defailBalance = null
    if (activePayment === 6) {
      defailBalance = this.renderDetail()
    }
    return (
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.detail(6)}>
          {this.renderData(I18n.t('t_paybalance'), null)}
        </TouchableOpacity>
        {defailBalance}
      </View>
    )
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

  renderLabel (label) {
    return (
      <Text style={styles.labelTitle}>
        {label}
      </Text>
    )
  }

  renderDetail () {
    const { amount } = this.state
    const money = 'Rp ' + price(amount)
    return (
      <View style={styles.detailContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textTotal, { flex: 1 }]}>
            {I18n.t('l_totalPaid')}
          </Text>
          <Text style={styles.textTotal}>
            {money}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.payment()}>
            <Text style={styles.textButton}>
              {I18n.t('b_totalPaidSmall')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  payment () {
    const { activePayment, adminFee, type, product, balance } = this.state
    if (type === 1) {
      this.props.navigation.navigate('BalanceTransferBankThankPage', {
        amount: product.payment,
        discount: 0,
        name: product.name,
        adminFee: adminFee,
        activePayment: activePayment,
        key: this.props.navigation.state.key,
        loan: true,
        product: product,
        type: 1
      })
    } else {
      this.props.navigation.navigate('BalanceTransferBankThankPage', {
        amount: balance.payment,
        discount: 0,
        name: balance.name,
        adminFee: adminFee,
        activePayment: activePayment,
        key: this.props.navigation.state.key,
        loan: true,
        balance: balance,
        type: 2
      })
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderAmount()}
          {this.renderLabel(I18n.t('t_va'))}
          {this.renderVirtualAccount()}
          {/* {this.renderLabel(I18n.t('t_offlinestore'))}
          {this.renderCanvaser()} */}
          {this.renderLabel(I18n.t('t_kioson'))}
          {this.renderBalance()}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanRepayment)
