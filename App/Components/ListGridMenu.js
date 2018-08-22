import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native'
import styles from './Styles/ListGridMenuStyle'
import { ratioHeight } from '../Transforms/Resize'
import { Images } from '../Themes/index'

export default class ListGridMenu extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    data:
    [
      {id: 0, title: 'Label', icon: Images.ic_user, onPress: () => {}},
      {id: 1, title: 'Label', icon: Images.ic_user, onPress: () => {}},
      {id: 2, title: 'Label', icon: Images.ic_user, onPress: () => {}},
      {id: 3, title: 'Label', icon: Images.ic_user, onPress: () => {}},
      {id: 4, title: 'Label', icon: Images.ic_user, onPress: () => {}},
      {id: 5, title: 'Label', icon: Images.ic_user, onPress: () => {}}
    ]
  }

  renderItem = (data) => {
    const item = data.item
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item.onPress}
        style={styles.container}
        >
        <View style={styles.tumb}>
          <View style={styles.maskedImage}>
            <Image style={[styles.imgIcon, {marginTop: ratioHeight(12 + 5)}]} source={item.icon} resizeMode={'contain'} />
          </View>
          <View style={styles.maskedText}>
            <Text style={[styles.textIcon]}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={this.props.data}
        renderItem={this.renderItem}
        numColumns={3}
            />
    )
  }
}
