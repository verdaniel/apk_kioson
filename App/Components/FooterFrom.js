import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/FooterFromStyle'
import { Colors } from '../Themes/index'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import I18n from '../I18n'

export default class FooterFrom extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    title: I18n.t('l_footer'),
    backgroundColor: Colors.nice_blue10
  }

  render () {
    return (
      <View>
        <View style={[styles.flexRowFlatCenter, { marginTop: ratioHeight(10), backgroundColor: this.props.backgroundColor }]}>
          <View style={[styles.round]}>
            <Text style={[styles.textRegularSmall, { color: Colors.white_two }]}>
            !
          </Text>
          </View>
          <Text style={[styles.textRegularSmall, { marginLeft: ratioWidth(10) }]}>
            {this.props.title}
          </Text>
        </View>
        <View style={{height: ratioHeight(10)}} />
      </View>
    )
  }
}
