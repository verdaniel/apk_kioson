import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/StandardMenuStyle'
import { ratioWidth } from '../Transforms/Resize'
import { Images } from '../Themes/index'
import Colors from '../Themes/Colors'

export default class StandardMenu extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.array,
    menuType: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    data: [
      {id: 0, icon: Images.ic_user, title: 'Place Title please', desc: 'lorem ispsum lalala', action: () => {}}
    ],
    menuType: 'twoRow'
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.flexOneRow} onPress={item.action}>
        <Image
          style={[styles.imgTanya]}
          source={item.icon}
          resizeMode={'contain'} />
        <View style={styles.flexRowMenu}>
          <View style={[styles.flexColMenu]}>
            <Text allowFontScaling style={[styles.robotoRegBigSlate]}>{item.title}</Text>
            <Text allowFontScaling style={[styles.robotoLightBigSlate]}>{item.desc}</Text>
          </View>
          <Image
            style={styles.imageArrow}
            source={Images.ic_next_calendar}
            resizeMode={'contain'} />
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={styles.borderBottom} />
    )
  }

  render () {
    const { menuType } = this.props
    var view
    if (menuType === 'twoRow') {
      view = (
        <FlatList
          // style={{ marginTop: ratioHeight(10), marginBottom: ratioHeight(25) }}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          />
      )
    }
    return (
      <View style={{backgroundColor: Colors.white_two}} >
        {view}
      </View>
    )
  }
}
