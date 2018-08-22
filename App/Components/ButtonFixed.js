import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ButtonFormStyle'

export default class ButtonFixed extends Component {
  // // Prop type warnings
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    lable: PropTypes.string
  }
  //
  // Defaults for props
  static defaultProps = {
    disabled: true,
    lable: 'Place Label Please'
  }

  render () {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[this.props.disabled === true ? styles.buttonFix : styles.buttonActiveFix]}
        onPress={this.props.onPress}
        activeOpacity={0.8}>
        <Text style={[styles.textRegularBigFix]}>
          {this.props.lable}
        </Text>
      </TouchableOpacity>
    )
  }
}
