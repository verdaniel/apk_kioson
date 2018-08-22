import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { NavigationActions } from 'react-navigation'
import ThousandFormat from '../../Services/ThousandFormat'

import styles from '../Styles/KiosonPaySuccessStyle'
import { Images, Colors } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'

class KiosonPaySuccess extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      status: 0,
      transferAmount: params.transferAmount,
      senderName: params.senderName,
      senderMobileNumber: params.senderMobileNumber,
      bankChoose: params.bankChoose,
      destinationNumber: params.destinationNumber,
      destinationName: params.destinationName,
      totalPrice: params.totalPrice,
      code: params.code
    }
  }

  componentDidMount () {
    setTimeout(() => { this.setState({status: 2}) }, 4000)
  }

  renderStatus (status) {
    if (status === 0) {
      return (
        <View style={styles.statusBox} >
          <View style={[styles.rowCenter]}>
            <Text style={[styles.robotoRegularMedSquas, {flex: 1, flexWrap: 'nowrap'}]}>PROSES</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, {flex: 2}]}>Menunggu konfirmasi dari operator.</Text>
          </View>
        </View>
      )
    }

    if (status === 1) {
      return (
        <View style={styles.statusBox} >
          <View style={styles.rowCenter}>
            <Text style={[styles.robotoRegularMedSquas, {flex: 1, flexWrap: 'nowrap'}]}>GAGAL</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, {flex: 2}]}>Dana telah dikembalikan ke saldo Kioson Anda.</Text>
          </View>
        </View>
      )
    }

    if (status === 2) {
      return (
        <View style={[styles.statusBox, {backgroundColor: Colors.squash}]} >
          <Text style={styles.robotoRegularMedCenter}>BERHASIL</Text>
        </View>
      )
    }
  }

  maskedMoney (value) {
    var number = value.toString()
    var sisa = number.length % 3
    var rupiah = number.substr(0, sisa)
    var ribuan = number.substr(sisa).match(/\d{3}/g)

    if (ribuan) {
      var separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    return rupiah
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

  render () {
    let isDisable = true
    if (this.state.status === 2 || this.state.status === 0) {
      isDisable = false
    }
    // var amountTransfer = ThousandFormat(+this.state.transferAmount)
    var totalPrice = ThousandFormat(+this.state.totalPrice)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <Image source={Images.backgroundGradient} style={styles.banner} resizeMode='stretch' >
          <TouchableOpacity style={styles.iconAbsolute}>
            <Image source={Images.ic_tanya_putih} style={styles.iconSquareLarge} resizeMode='contain' />
          </TouchableOpacity>
          <Image source={Images.ic_lunas} style={styles.logo} resizeMode='contain' />
        </Image>
        <View style={styles.borderBottom} >
          {this.renderStatus(this.state.status)}
          <TouchableOpacity disabled={isDisable} style={styles.statusBox} >
            <View style={styles.rowCenter}>
              <Image source={Images.ic_printer} style={styles.iconSquareSmall} resizeMode='contain' />
              <Text style={styles.productSansBoldMed}>CETAK STRUK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.flexBigColumn} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maskedLogo} >
              <Image source={Images.ic_kioson_pay} style={styles.iconSquareMedium} resizeMode='contain' />
            </View>
            <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
            <Text style={styles.robotoRegularSmallGrey}>Tokopedia</Text>
            <Text style={styles.robotoBoldSmallGrey}>Kode Pembayaran: {this.state.code}</Text>
            <Text style={[styles.robotoRegularSmallGrey]}>Rp {totalPrice}</Text>
          </View>
          <View style={[styles.rowCenter, styles.flexOneMargin]}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClear]}>
              <Text style={[styles.textRegularBig, { color: Colors.nice_blue }]}>
                Lihat Riwayat
              </Text>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: moderateScale(10) }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.goToHome()}>
              <Text style={styles.textRegularBig}>
                Beranda
              </Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(KiosonPaySuccess)
