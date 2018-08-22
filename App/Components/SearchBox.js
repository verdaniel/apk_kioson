import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles/SearchBoxStyle'
import { Images, Colors } from '../Themes'
import { ratioWidth } from '../Transforms/Resize'

export default class SearchBox extends Component {
  // Prop type warnings
  static propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onPress: PropTypes.func,
    placeholder: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    value: '',
    placeholder: 'Placeholder'
  }

  state = {
    showClear: false
  }

  render () {
    const {value, onChangeText, onSubmitEditing, placeholder, onPress} = this.props
    return (
      <View style={styles.searchBox}>
        <Image
          source={Images.ic_search_grey}
          style={[styles.imageSquare, {marginRight: ratioWidth(15)}]} resizeMode='contain' />
        <TextInput
          onChangeText={(onChangeText)}
          value={value}
          placeholderStyle={styles.textboxfieldd}
          style={styles.textInput}
          onFocus={() => this.setState({showClear: true})}
          onBlur={() => this.setState({showClear: false})}
          onSubmitEditing={onSubmitEditing}
          underlineColorAndroid={Colors.transparent}
          placeholder={placeholder}
          placeholderTextColor={Colors.greyish} />
        {this.state.showClear
        ? <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Image
            source={Images.ic_close_camera_grey}
            style={styles.imageSquare} resizeMode='contain' />
        </TouchableOpacity> : null}
      </View>
    )
  }
}
