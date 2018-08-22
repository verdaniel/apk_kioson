import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/PlaceholderDropdownStyle'
import { moderateScale } from '../Transforms/Scaling'
import { Images } from '../Themes'
import { ratioWidth } from '../Transforms/Resize'

export default class PlaceholderDropdown extends Component {
  // Prop type warnings
  static propTypes = {
    leftIcon: PropTypes.string,
    isLeftVisible: PropTypes.bool,
    onLayoutDropdown: PropTypes.func,
    onPress: PropTypes.func,
    isDropDownDisable: PropTypes.bool,
    showDropDown: PropTypes.bool,
    value: PropTypes.string,
    title: PropTypes.string,
    marginTop: PropTypes.string,
    borderBottom: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    leftIcon: Images.ic_amount,
    isLeftVisible: true,
    onLayoutDropdown: () => {},
    onPress: () => {},
    isDropDownDisable: false,
    showDropDown: false,
    value: 'Items',
    title: 'Title',
    marginTop: 0,
    borderBottom: true
  }

  renderLeft (leftIcon, isLeftVisible) {
    if (isLeftVisible) {
      return (
        <Image source={leftIcon} style={[styles.iconSquare, {marginLeft: ratioWidth(5), marginRight: ratioWidth(15)}]} resizeMode='contain' />
      )
    }
    return null
  }

  render () {
    const {borderBottom, marginTop, leftIcon, isLeftVisible, onLayoutDropdown, onPress, isDropDownDisable, showDropDown, value, title, style} = this.props
    return (
      <View style={[styles.flexRowOne, {style}]}>
        {this.renderLeft(leftIcon, isLeftVisible)}
        <View style={[styles.flexColumn, {marginTop: marginTop}, borderBottom === true ? {borderBottomWidth: 0.5} : {borderBottomWidth: 0}]}>
          <Text style={styles.textBoldSmall}>
            {title}
          </Text>
          <TouchableOpacity
            onLayout={onLayoutDropdown}
            disabled={isDropDownDisable}
            style={styles.flexRowTwoDropDown}
            onPress={onPress}>
            <Text
              numberOfLines={1}
              style={styles.textDropDown}>
              {value}
            </Text>
            {showDropDown === true ? <Image source={Images.ic_dropdodwnActive} style={styles.iconSquare} resizeMode='contain' />
              : <Image source={Images.ic_dropdodwn} style={styles.iconSquare} resizeMode='contain' />}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
