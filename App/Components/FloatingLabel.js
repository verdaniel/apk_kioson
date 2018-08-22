import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Animated, Easing, TextInput } from 'react-native'
import styles from './Styles/FloatingLabelStyle'
import { Fonts, Colors } from '../Themes'
import { moderateScale } from '../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
// const AndroidKeyboardAdjust = require('NativeModules').AndroidKeyboardAdjust

const textInputPropTypes = TextInput.propTypes
const textInputDefaultProps = TextInput.defaultProps

export default class FloatingLabel extends PureComponent {
  constructor (props) {
    super(props)
    this.floating = { fontSize: moderateScale(12), marginLeft: 0, marginTop: 0 }
    this.placeholder = { fontSize: moderateScale(16), marginLeft: ratioWidth(10), marginTop: ratioHeight(22) }
    this.floatingAnimated = {
      fontSize: (typeof this.props.value === 'undefined' || this.props.value === '') ? new Animated.Value(moderateScale(16)) : new Animated.Value(moderateScale(12)),
      marginLeft: (typeof this.props.value === 'undefined' || this.props.value === '') ? new Animated.Value(ratioWidth(10)) : new Animated.Value(0),
      marginTop: (typeof this.props.value === 'undefined' || this.props.value === '') ? new Animated.Value(ratioHeight(22)) : new Animated.Value(0)
    }
    this.floatingColor = (typeof this.props.value === 'undefined' || this.props.value === '') ? new Animated.Value(0) : new Animated.Value(10)
    this.floatingFont = (typeof this.props.value === 'undefined' || this.props.value === '') ? new Animated.Value(0) : new Animated.Value(10)
    this.state = {
      isRef: this.props.isRef,
      isFocus: false,
      text: this.props.text,
      alert: this.props.alert,
      viewStyle: this.props.viewStyle,
      separatorColor: this.props.separatorColor,
      style: this.props.style,
      value: this.props.value,
      viewInputHeight: this.props.alert === '' ? ratioHeight(54) : ratioHeight(54),
      textInputHeight: ratioHeight(19),
      editable: this.props.editable,
      changeColor: this.props.changeColor,
      alertTextAlign: this.props.alertTextAlign,
      keyboardChange: this.props.keyboardChange === undefined
    }
  }

  static propTypes = {
    ...textInputPropTypes,
    style: PropTypes.oneOfType(['func', 'object']),
    viewStyle: PropTypes.oneOfType(['func', 'object']),
    separatorColor: PropTypes.string,
    alert: PropTypes.string,
    value: PropTypes.string,
    editable: PropTypes.boolean,
    changeColor: PropTypes.array,
    alertTextAlign: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  }

  static defaultProps = {
    ...textInputDefaultProps,
    style: styles.textInput,
    viewStyle: styles.viewInput,
    separatorColor: Colors.black_15,
    alert: '',
    value: '',
    editable: true,
    changeColor: ['#aeaeae', '#59595c'],
    alertTextAlign: 'right',
    keyboardChange: true
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      style: newProps.style,
      value: newProps.value,
      alert: newProps.alert,
      separatorColor: newProps.separatorColor
    })
  }

  createAnimation (value, toValue) {
    return (
      Animated.timing(
        value, {
          toValue: toValue,
          duration: 200
        },
        Easing.ease
      )
    )
  }

  animation (isFocus) {
    var newStyle = isFocus ? this.floating : this.placeholder
    var newColor = isFocus ? 10 : 0
    var newFont = isFocus ? 10 : 0
    Animated.parallel([
      this.createAnimation(this.floatingAnimated.fontSize, newStyle.fontSize),
      this.createAnimation(this.floatingAnimated.marginLeft, newStyle.marginLeft),
      this.createAnimation(this.floatingAnimated.marginTop, newStyle.marginTop),
      this.createAnimation(this.floatingColor, newColor),
      this.createAnimation(this.floatingFont, newFont)
    ]).start()
  }

  onBlur () {
    if (!this.state.value) {
      this.animation(false)
      // this.setState({ isFocus: false })
    }
    if (this.state.keyboardChange) {
      // AndroidKeyboardAdjust.setAdjustResize()
    }
    if (this.props.onBlur !== undefined) {
      this.props.onBlur()
    }
  }

  onFocus () {
    this.animation(true)
    if (this.state.keyboardChange) {
      // AndroidKeyboardAdjust.setAdjustNothing()
      // this.setState({ isFocus: true })
    }
    if (this.props.onFocus !== undefined) {
      this.props.onFocus()
    }
  }

  onChangeText = (text) => {
    this.setState({ value: text })
    this.props.onChangeText(text)
  }

  onContentSizeChange = (e) => {
    this.setState({
      viewInputHeight: e.nativeEvent.contentSize.height + ratioHeight(32),
      textInputHeight: e.nativeEvent.contentSize.height
    })
    if (typeof this.props.onContentSizeChange === 'function') {
      this.props.onContentSizeChange(e.nativeEvent.contentSize)
    }
  }

  /* onSetValue () {
    if (!this.state.value) {
      this.animation(false)
    } else {
      this.animation(true)
    }
    return this.state.value
  } */

  renderFloating () {
    var colors = this.floatingColor.interpolate({
      inputRange: [0, 10],
      outputRange: this.state.changeColor
    })
    /* var fonts = this.floatingFont.interpolate({
      inputRange: [0, 10],
      outputRange: ['400', '800']
    }) */

    return (
      <Animated.Text style={[this.floatingAnimated, { position: 'absolute', color: colors, fontFamily: Fonts.type.robotoRegular }]}>
        {this.state.text}
      </Animated.Text>
    )
  }

  render () {
    const { textInputHeight, alert, value, editable, keyboardChange, isRef } = this.state
    return (
      <View style={this.props.viewStyle}>
        {this.renderFloating()}
        <TextInput
          {...this.props}
          ref={isRef}
          editable={editable}
          value={value}
          autoCorrect={false}
          underlineColorAndroid='transparent'
          style={[styles.textInput, {
            height: textInputHeight,
            fontFamily: this.props.style.fontFamily,
            color: this.props.style.color,
            fontSize: this.props.style.fontSize
          }]}
          keyboardChange={keyboardChange}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          onContentSizeChange={(event) => this.onContentSizeChange(event)}
          onChangeText={(text) => this.onChangeText(text)}
        />
        <View style={[styles.separator, { backgroundColor: this.props.separatorColor }]} />
        {alert === '' ? <View />
        : <Text style={[styles.alert, {textAlign: this.props.alertTextAlign}]}>
          {alert}
        </Text>}
      </View>
    )
  }
}
