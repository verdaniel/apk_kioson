import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import styles from './Styles/ProductlistStyle'
import {ReadAbleText, RupiahFormat} from '../Lib/Formater'
import { ratioHeight } from '../Transforms/Resize'
import { Images } from '../Themes'

export default class Productlist extends Component {
  // Prop type warnings
  static propTypes = {
    data: PropTypes.array,
    extraData: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    data: [
      { id: 0, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'asamsung galaxy j1', price: 2799000, isDiscount: true, discount: 20, stock: 5 },
      { id: 1, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'csamsung galaxy j1', price: 10799000, isDiscount: true, discount: 45, stock: 0 },
      { id: 2, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'ssamsung galaxy j1', price: 6799000, isDiscount: true, discount: 30, stock: 0 }
    ]
  }

  renderItem = (data) => {
    const item = data.item
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        style={styles.maskedList}
        onPress={
          () => item.stock <= 0 ? {} : this.props.navigation.navigate('ProductDetail')}
        >
        <View style={styles.imagePlaceholder}>
          <Image source={{uri: item.image}} style={styles.imageLogo} resizeMode='contain' />
          {item.stock <= 0 ? <View style={styles.labelEmpty} >
            <Text style={styles.emptyStock}>STOK KOSONG</Text>
          </View> : null}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start', paddingTop: ratioHeight(10)}}>
          <View style={styles.maskedLabelProduct}>
            <Text style={styles.textProduct}>{ReadAbleText(item.name)}</Text>
            {item.isDiscount ? <Image source={Images.ic_discount_color} style={styles.imageDiscount} resizeMode='contain'>
              <Text style={styles.textDiscount}>-{String(item.discount)}%</Text>
            </Image> : null}
          </View>
          <View>
            <Text style={[styles.textPrice, {paddingTop: ratioHeight(4)}]}>{RupiahFormat(item.price - ((item.discount / 100) * item.price))}</Text>
            {item.isDiscount ? <Text style={[styles.textLabelDiscount, {paddingTop: ratioHeight(1)}]}>{RupiahFormat(item.price)}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  render () {
    const {data, extraData} = this.props
    return (
      <View style={styles.listStyle} >
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          extraData={extraData}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={2}
            />
      </View>
    )
  }
}
