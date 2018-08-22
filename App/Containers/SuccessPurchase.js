import React, { Component } from 'react'
import { View, Text, StatusBar, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ButtonFooter from '../Components/ButtonFooter'
import StatusPayment from '../Components/StatusPayment'
import HeaderSuccessPayment from '../Components/HeaderSuccessPayment'
import MaskedImageSuccessPage from '../Components/MaskedImageSuccessPage'
import BluetoothSerial from 'react-native-bluetooth-serial'

// Actions
import BluetoothActions from '../Redux/BluetoothRedux'

// Styles
import styles from './Styles/SuccessPurchaseStyle'

class SuccessPurchase extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      status: 0,
      loan: false,
      print: params.print
    }
  }

  componentDidMount () {
    const { params } = this.props.navigation.state
    if (params.loan !== undefined) {
      this.setState({
        loan: params.loan
      })
    }
    setTimeout(() => { this.setState({status: 2}) }, 4000)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.device) {
      BluetoothSerial.printToDevice(this.state.print).then((res) => console.tron.warn(res))
    }
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

  goHistory () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ screen: 'BottomNav' }),
        NavigationActions.navigate({ screen: 'History' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onPrint () {
    BluetoothSerial.isEnabled().then((response) => {
      if (response) {
        this.searchBluetooth()
      } else {
        BluetoothSerial.requestEnable().then((res) => {
          if (res) this.searchBluetooth()
          else ToastAndroid.show('Bluetooth tidak aktif', ToastAndroid.SHORT)
        })
      }
    })
  }

  searchBluetooth () {
    const value = this.props.device
    if (this.props.device) {
      BluetoothSerial.isConnected().then((res) => {
        if (res) BluetoothSerial.printToDevice(this.state.print).then((res) => console.tron.warn(res))
        else {
          BluetoothSerial.connect(value.id).then((response) => {
            if (response.message.includes('Connected')) {
              ToastAndroid.show(`Berhasil menghubung ke perangkat ${value.name}`, ToastAndroid.SHORT)
              this.props.connectDevice({ ...value, connected: true })
            } else ToastAndroid.show(`Gagal menghubung ke ${value.name}`, ToastAndroid.SHORT)
          })
        }
      })
    } else this.props.navigation.navigate('ListPrinter')
  }

  render () {
    const { params } = this.props.navigation.state
    const { navigation } = this.props
    let isDisable = true
    if (this.state.status === 2 || this.state.status === 0) {
      isDisable = false
    }
    // var maskedMoney = ThousandFormat(this.state.priceProps)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <HeaderSuccessPayment loan={this.state.loan} navigates={'Help'} navigation={navigation} />
        <StatusPayment
          loan={this.state.loan}
          status={this.state.status}
          isDisable={isDisable}
          onPressPrint={() => this.onPrint()}
        />
        <View style={styles.flexBigColumn} >
          <View style={styles.viewInside}>
            <MaskedImageSuccessPage source={params.icon} />
            {params.component}
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
    device: state.bluetooth.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectDevice: (device) => dispatch(BluetoothActions.connectedDevice(device))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPurchase)
