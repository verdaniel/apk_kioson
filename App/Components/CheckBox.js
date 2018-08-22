import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/CheckBoxStyle'
import { Colors, Images } from '../Themes'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import I18n from '../I18n'

export default class CheckBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: this.props.isChecked || false
    }
  }
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    isChecked: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    title: I18n.t('l_footer'),
    backgroundColor: Colors.nice_blue10,
    isChecked: false
  }

  check () {
    if (this.state.isChecked) {
      this.setState({
        isChecked: false
      })
    } else {
      this.setState({
        isChecked: true
      })
    }
    this.props.onPress()
  }

  render () {
    const { isChecked } = this.state
    return (
      <View style={[styles.flexRowFlatCenter, { marginTop: ratioHeight(10), backgroundColor: this.props.backgroundColor }]}>
        <TouchableOpacity style={styles.button} onPress={() => this.check()}>
          <Image style={styles.image} source={isChecked ? Images.checkboxgrey : Images.uncheckboxgrey} />
        </TouchableOpacity>
        <Text style={[styles.textRegularSmall, { marginLeft: ratioWidth(10) }]}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}
