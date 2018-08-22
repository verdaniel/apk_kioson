import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles/TextInputModStyle'
import { Colors, Images } from '../Themes'
import { ratioWidth } from '../Transforms/Resize'

export default class FormInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: this.props.text
    }
  }

  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    iconLeft: PropTypes.any,
    keyboardType: PropTypes.string,
    iconRight: PropTypes.any,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    isRightVisible: PropTypes.bool,
    isLeftVisible: PropTypes.bool,
    messageError: PropTypes.string,
    label: PropTypes.element,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChangeText: PropTypes.func,
    marginBottom: PropTypes.number,
    editable: PropTypes.bool,
    onPressRight: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    borderBottom: PropTypes.bool,
    currency: PropTypes.bool
  }

  // // Defaults for props
  static defaultProps = {
    title: 'Place Label here',
    iconLeft: Images.ic_user,
    keyboardType: 'numeric',
    iconRight: Images.ic_user,
    placeholder: 'xxx',
    maxLength: 13,
    isRightVisible: true,
    isLeftVisible: true,
    label: this.renderLabel,
    messageError: 'This is error message',
    marginBottom: 9,
    editable: true,
    onChangeText: () => {},
    onPressRight: () => {},
    onBlur: () => {},
    onFocus: () => {},
    secureTextEntry: false,
    borderBottom: true,
    currency: false
  }

  renderLabel () {
    return (
      <View />
    )
  }

  renderLeft (icon, visible) {
    if (visible) {
      return (
        <Image source={icon} style={[styles.iconSquare, { marginLeft: ratioWidth(5), marginRight: ratioWidth(15) }]} resizeMode='contain' />
      )
    }
    return null
  }

  renderRight (icon, visible, onPress) {
    if (visible) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Image source={icon} style={styles.iconSquare} resizeMode='contain' />
        </TouchableOpacity>
      )
    }
    return null
  }

  renderErrorNotif (errorMessage) {
    if (errorMessage) {
      return (
        <Text style={styles.erroMessage}>{errorMessage}</Text>
      )
    }
  }

  render () {
    const { borderBottom, secureTextEntry, onFocus, onChangeText, value, title, editable, iconLeft, isLeftVisible, onBlur, keyboardType, label, iconRight, placeholder, maxLength, isRightVisible, messageError, onPressRight, currency } = this.props
    if (borderBottom) {
      this.border = 0.5
    } else {
      this.border = 0
    }
    let viewCurrency, marginLeft
    if (currency) {
      viewCurrency = (
        <Text style={[messageError === '' ? [styles.inputText, { flex: 0 }] : [styles.inputTextError, { flex: 0 }]]}>
          Rp
        </Text>
      )
      marginLeft = { marginLeft: ratioWidth(3) }
    } else {
      viewCurrency = null
      marginLeft = null
    }
    return (
      <View style={[styles.flexRowOne]}>
        {this.renderLeft(iconLeft, isLeftVisible)}
        <View style={[styles.flexColumn]}>
          <Text style={styles.textBoldSmall}>
            {title}
          </Text>
          <View style={[messageError === '' ? [styles.flexRowTwo, {borderBottomWidth: this.border}] : [styles.flexRowTwoError, {borderBottomWidth: this.border}]]}>
            {viewCurrency}
            <TextInput
              style={[messageError === '' ? [styles.inputText, marginLeft] : [styles.inputTextError, marginLeft]]}
              value={value}
              editable={editable}
              keyboardType={keyboardType}
              returnKeyType='done'
              autoCapitalize='none'
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              onFocus={onFocus}
              maxLength={maxLength}
              autoCorrect
              onChangeText={onChangeText}
              underlineColorAndroid='transparent'
              placeholder={placeholder}
              placeholderTextColor={Colors.greyish}
            />
            {label}
            {this.renderRight(iconRight, isRightVisible, onPressRight)}
          </View>
          {this.renderErrorNotif(messageError)}
        </View>
      </View>
    )
  }
}
