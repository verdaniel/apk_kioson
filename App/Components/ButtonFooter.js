import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ButtonFooterStyle'
import { Colors } from '../Themes/'
import { ratioWidth } from '../Transforms/Resize'
import I18n from '../I18n'

export default class ButtonFooter extends Component {
  // Prop type warnings
  static propTypes = {
    onPressHome: PropTypes.func,
    onPressHistory: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    onPressHistory: () => {},
    onPressHome: () => { }
  }

  render () {
    const {onPressHome, onPressHistory} = this.props
    return (
      <View style={[styles.rowCenter, styles.flexOneMargin]}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressHome}>
          <Text style={styles.textRegularBig}>
            {I18n.t('b_goHome')}
          </Text>
        </TouchableOpacity>
        <View style={{ width: ratioWidth(10) }} />
        <TouchableOpacity
          onPress={onPressHistory}
          style={[styles.button, {backgroundColor: Colors.squash}]}>
          <Text style={styles.textRegularBig}>
            {I18n.t('b_goHistory')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
