import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ButtonFormStyle'
import I18n from '../I18n'

export default class ButtonForm extends Component {
  // // Prop type warnings
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    lable: PropTypes.string,
    type: PropTypes.string
  }
  //
  // Defaults for props
  static defaultProps = {
    disabled: true,
    lable: I18n.t('b_next'),
    type: 'default'
  }

  render () {
    // var top = ratioHeight(518)
    // if (this.props.type === 'tabs') {
    //   top = ratioHeight(432)
    // }

    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[this.props.disabled === true ? [styles.button] : [styles.buttonActive, {}]]}
        // style={[this.props.disabled === true ? [styles.button, {top: top}] : [styles.buttonActive, {top: top}]]}
        onPress={this.props.onPress}
        activeOpacity={0.8}>
        <Text style={[styles.textRegularBig]}>
          {this.props.lable}
        </Text>
      </TouchableOpacity>
    )
  }
}
