import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/EmptyStateStyle'

export default class EmptyState extends Component {
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
      <View style={styles.container}>
        <Image source={this.props.source} style={styles.image} resizeMode={'contain'} />
        <Text allowFontScaling style={styles.textState}>{this.props.title}</Text>
        <Text allowFontScaling style={styles.textDesc}>{this.props.description}</Text>
      </View>
    )
  }
}
