import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Images, Colors, Fonts } from '../Themes/index'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'

export default class SelectionMenu extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    data: [
      {id: 0, title: 'Pulsa', action: () => {}},
      {id: 1, title: 'PLN', action: () => {}},
      {id: 2, title: 'PLN', action: () => {}},
      {id: 3, title: 'PLN', action: () => {}},
      {id: 4, title: 'PLN', action: () => {}},
      {id: 5, title: 'PLN', action: () => {}},
      {id: 6, title: 'PLN', action: () => {}},
      {id: 7, title: 'PLN', action: () => {}}
    ]
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.action}
        style={{
          borderRadius: 3,
          backgroundColor: Colors.white_two,
          marginHorizontal: ratioWidth(10)
        }}
        activeOpacity={0.8} >
        <View style={{
          flexDirection: 'row',
          paddingVertical: ratioHeight(18),
          paddingLeft: ratioWidth(18),
          paddingRight: ratioWidth(15),
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text
            style={{
              flex: 1,
              fontSize: moderateScale(16),
              fontFamily: Fonts.type.robotoRegular
            }}
            allowFontScaling >{item.title}</Text>
          <Image
            style={{
              width: ratioWidth(7),
              height: ratioHeight(12)
            }}
            source={Images.ic_next_calendar}
            resizeMode={'contain'} />
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={{height: ratioHeight(6)}} />
    )
  }

  render () {
    return (
      <FlatList
          // style={{ marginTop: ratioHeight(10), marginBottom: ratioHeight(25) }}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        extraData
        ItemSeparatorComponent={this.renderSeparator}
          />
    )
  }
}
