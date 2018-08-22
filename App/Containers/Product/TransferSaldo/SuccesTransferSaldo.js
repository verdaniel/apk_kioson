import React, { Component } from 'react'
import { View, Image, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import StatusPayment from '../../../Components/StatusPayment'
import ButtonFooter from '../../../Components/ButtonFooter'

import ThousandFormat from '../../../Services/ThousandFormat'
import HeaderSuccessPayment from '../../../Components/HeaderSuccessPayment'
import { Images } from '../../../Themes/'

import styles from '../../Styles/SuccessTrasferMoneyStyle'

class SuccessPaymentTrasferMoney extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state

    this.state = {
      status: 0,
      destinationNumber: params.destinationNumber,
      destinationName: params.destinationName,
      transferAmount: params.transferAmount,
      totalPrice: params.totalPrice
    }
  }

  componentDidMount () {
    setTimeout(() => { this.setState({status: 2}) }, 4000)
  }

  goToHome () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'BottomNav' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goToHistory () {
    this.props.navigation.setParams({isHeaderShow: false})
    this.props.navigation.navigate('HistoryTransaction')
  }

  render () {
    const {navigation} = this.props
    let isDisable = true
    if (this.state.status === 2 || this.state.status === 0) {
      isDisable = false
    }
    var amountTransfer = ThousandFormat(+this.state.transferAmount)
    var totalPrice = ThousandFormat(+this.state.totalPrice)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <HeaderSuccessPayment loan navigates={'Help'} navigation={navigation} />
        <StatusPayment status={this.state.status} isDisable={isDisable} />
        <View style={styles.flexBigColumn} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maskedLogo} >
              <Image source={Images.ic_transfer} style={styles.iconSquareMedium} resizeMode='contain' />
            </View>
            <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
            <Text style={styles.robotoRegularSmallGrey}>Transfer Saldo - {amountTransfer}</Text>
            <Text style={styles.robotoBoldSmallGrey}>{this.state.destinationName} {this.state.destinationNumber}</Text>
            <Text style={[styles.robotoRegularSmallGrey]}>Rp {totalPrice}</Text>
          </View>
          <ButtonFooter
            onPressHome={() => this.goToHome()}
            onPressHistory={() => this.props.navigation.navigate('History')} />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPaymentTrasferMoney)
