import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Image } from 'react-native'
import styles from './Styles/MaskedImageSuccessPageStyle'
import { Images } from '../Themes/'

export default class MaskedImageSuccessPage extends Component {
  // Prop type warnings
  static propTypes = {
    source: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    source: Images.ic_pulsa
  }

  render () {
    return (
      <View style={styles.maskedLogo} >
        <Image source={this.props.source} style={styles.iconSquareMedium} resizeMode='contain' />
      </View>
    )
  }
}
