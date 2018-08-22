import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images } from '../Themes/index'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import styles from './Styles/PaymentMethodStyle'

export default class PaymentMethod extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.kycPayment}>
        <View style={{padding: ratioHeight(10)}}>
          <Text style={styles.textKyc}>PILIH METODE PEMBAYARAN</Text>
        </View>
        <View style={styles.paymentContainer}>
          <TouchableOpacity onPress={this.props.onPressKiosTunai} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.imageKyc} source={Images.ic_isi_saldo_new} resizeMode={'stretch'} />
            <View style={styles.amountKyc}>
              <Text style={styles.textKycTop}>KIOSTUNAI</Text>
              <Text style={styles.textKycBottom}>Rp {this.props.amountKiosTunai}</Text>
            </View>
            <Image style={{width: ratioWidth(15), height: ratioHeight(15)}} source={this.props.selectedKiosTunai ? Images.radioOn : Images.radioOff} resizeMode={'stretch'} />
          </TouchableOpacity>
        </View>
        <View style={styles.separatorKyc} />
        <View style={styles.paymentContainer}>
          <TouchableOpacity onPress={this.props.onPressSaldo} style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.imageKyc} source={Images.ic_saldo_kyc} resizeMode={'stretch'} />
            <View style={styles.amountKyc}>
              <Text style={styles.textKycTop}>SALDO</Text>
              <Text style={styles.textKycBottom}>Rp {this.props.amountSaldo}</Text>
            </View>
            <Image style={{width: ratioWidth(15), height: ratioHeight(15)}} source={this.props.selectedSaldo ? Images.radioOn : Images.radioOff} resizeMode={'stretch'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
