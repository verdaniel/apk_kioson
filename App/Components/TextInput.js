import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import styles from './Styles/TextInputStyle'
import { Colors } from '../Themes'

const textInputPropTypes = TextInput.propTypes
const textInputDefaultProps = TextInput.defaultProps

export default class TextInputs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: typeof this.props.value === 'undefined' ? styles.container : this.props.value
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({ value: newProps.value })
  }

  // Prop type warnings
  static propTypes = {
    ...textInputPropTypes,
    style: PropTypes.oneOfType(['func', 'object'])
  }

  // Defaults for props
  static defaultProps = {
    ...textInputDefaultProps,
    style: styles.container
  }

  onChangeText = (text) => {
    this.setState({ value: text })
  }

  render () {
    return (
      <View style={this.props.style}>
        <TextInput
          {...this.props}
          placeholderTextColor={Colors.greyish}
          style={styles.textInput}
          value={this.state.value}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.onChangeText(text)}
        />
      </View>
    )
  }
}
