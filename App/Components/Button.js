import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ButtonStyle'

export default class Button extends Component {
  static propTypes = {
    style: PropTypes.oneOfType(['object', 'array']),
    text: PropTypes.string,
    textStyle: PropTypes.PropTypes.oneOfType(['object', 'array'])
  }

  static defaultProps = {
    textStyle: styles.textStyles
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={this.props.style}>
          <Text style={this.props.textStyle}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
