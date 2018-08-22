import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/StatusPaymentStyle'
import I18n from '../I18n'
import { Colors, Images } from '../Themes/'

export default class StatusPayment extends Component {
  // Prop type warnings
  static propTypes = {
    status: PropTypes.string,
    onPressPrint: PropTypes.func,
    isDisable: PropTypes.bool,
    loan: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    status: 0,
    isDisable: true,
    loan: false,
    onPressPrint: () => { }
  }

  renderStatus (status) {
    if (status === 0) {
      const label = this.props.loan ? I18n.t('l_paymentLoanWait') : I18n.t('l_paymentWait')
      return (
        <View style={styles.statusBox} >
          <View style={[styles.rowCenter]}>
            <Text style={[styles.robotoRegularMedSquas, { flex: 1, flexWrap: 'nowrap' }]}>{I18n.t('l_procces')}</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, { flex: 2 }]}>{label}</Text>
          </View>
        </View>
      )
    }

    if (status === 1) {
      return (
        <View style={styles.statusBox} >
          <View style={styles.rowCenter}>
            <Text style={[styles.robotoRegularMedSquas, { flex: 1, flexWrap: 'nowrap' }]}>{I18n.t('l_balanceFail')}</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, { flex: 2 }]}>{I18n.t('l_paymentFail')}</Text>
          </View>
        </View>
      )
    }

    if (status === 2) {
      const label = this.props.loan ? I18n.t('l_accepted') : I18n.t('l_succes')
      return (
        <View style={[styles.statusBox, { backgroundColor: Colors.squash }]} >
          <Text style={styles.robotoRegularMedCenter}>{label}</Text>
        </View>
      )
    }
  }

  render () {
    const {status, onPressPrint, isDisable} = this.props
    return (
      <View style={styles.borderBottom} >
        {this.renderStatus(status)}
        {status !== 1 ? <TouchableOpacity onPress={onPressPrint} disabled={isDisable} style={styles.statusBox} >
          <View style={styles.rowCenter}>
            <Image source={Images.ic_printer} style={styles.iconSquareSmall} resizeMode='contain' />
            <Text style={styles.productSansBoldMed}>{I18n.t('b_printReceipt')}</Text>
          </View>
        </TouchableOpacity> : <View />}
      </View>
    )
  }
}
