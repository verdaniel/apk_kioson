import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/ErrorNetworkStyle'
import { Images } from '../Themes/index'
import { moderateScale } from '../Transforms/Scaling'

export default class ErrorNetwork extends Component {
  // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool,
    onPress: PropTypes.func,
    position: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    visible: false,
    position: 'absolute',
    onPress: () => {}
  }

  state = {
    visible: this.props.visible
  }

  onPress () {
    this.setState({visible: false})
  }

  renderModalAla (visible) {
    if (visible) {
      return (
        <View style={[styles.container, {position: this.props.position}]}>
          <Image source={Images.ic_exclamation_mark} style={{ height: moderateScale(12), width: moderateScale(12) }} />
          <Text style={styles.text}>Tidak terhubung dengan internet.</Text>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image source={Images.ic_close_clear} style={{ height: moderateScale(12), width: moderateScale(12) }} />
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  render () {
    return (
      this.renderModalAla(this.props.visible)
    )
  }
}
