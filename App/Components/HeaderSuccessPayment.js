import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderSuccessPaymentStyle'
import { Images } from '../Themes/'

export default class HeaderSuccessPayment extends Component {
  // Prop type warnings
  static propTypes = {
    onPress: PropTypes.func,
    loan: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    onPress: () => {},
    loan: false
  }

  render () {
    const {navigates, loan} = this.props
    const image = loan ? Images.successpayment : Images.ic_lunas
    return (
      <Image source={Images.backgroundGradient} style={styles.banner} resizeMode='stretch' >
        <TouchableOpacity style={styles.iconAbsolute} onPress={() => this.props.navigation.navigate(navigates)}>
          <Image source={Images.ic_tanya_putih} style={styles.iconSquareLarge} resizeMode='contain' />
        </TouchableOpacity>
        <Image source={image} style={styles.logo} resizeMode='contain' />
      </Image>
    )
  }
}
