import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CartListStyle'
import { Images, Colors, Fonts } from '../Themes'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
import {RupiahFormat, ReadAbleText} from '../Lib/Formater'

export default class CartList extends Component {
  // Prop type warnings
  static propTypes = {
    count: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    count: 2
  }

  delete = () => {
    const { onDelete } = this.props
    onDelete()
  }

  added = () => {
    const { added } = this.props
    added()
  }

  subtract = () => {
    const { subtract } = this.props
    subtract()
  }

  render () {
    const {count} = this.props
    return (
      <ScrollView style={{marginTop: ratioHeight(10), flex: 1}}>
        <View style={[styles.flexList, {backgroundColor: Colors.white_two, marginBottom: ratioHeight(6), elevation: 3, borderRadius: 5}]}>
          <View style={[styles.listProduct]}>
            <Text style={[styles.textMedium, {flex: 1, textAlign: 'left', color: Colors.slate_grey, fontSize: moderateScale(16)}]}>{ReadAbleText('Samsung Galaxy J1 Ace')}</Text>
            <TouchableOpacity onPress={() => this.delete()} activeOpacity={0.8}>
              <Image source={Images.ic_delete_grey} style={{height: ratioHeight(16), width: ratioWidth(12.4)}} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={[styles.listProduct]}>
            <Image source={{uri: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png'}} style={{height: ratioHeight(65), width: ratioWidth(65), marginRight: ratioWidth(10)}} resizeMode='contain' />
            <View style={{flex: 1}}>
              <Text style={[styles.textBold]}>{RupiahFormat(3199000)}</Text>
              <Text style={[styles.textRegular, {paddingTop: ratioHeight(3)}]}>{RupiahFormat(7799000)}</Text>
              <View style={[styles.flexRowFlat, {paddingTop: ratioHeight(10)}]}>
                <View style={{flex: 1}}>
                  <Image source={Images.ic_discount_color} style={styles.imageDiscount} resizeMode='contain'>
                    <Text style={styles.textDiscount}>-20%</Text>
                  </Image>
                </View>
                <View style={styles.threeRow}>
                  <TouchableOpacity onPress={() => this.subtract()} activeOpacity={0.8}>
                    <Image source={Images.ic_min_grey} style={[styles.imageDiscount, {width: ratioWidth(24)}]} resizeMode='contain' />
                  </TouchableOpacity>
                  <Text style={[styles.textMedium, {paddingHorizontal: ratioWidth(28), color: Colors.slate_grey, fontSize: moderateScale(14)}]}>{count}</Text>
                  <TouchableOpacity onPress={() => this.added()} activeOpacity={0.8}>
                    <Image source={Images.ic_plus_grey} style={[styles.imageDiscount, {width: ratioWidth(24)}]} resizeMode='contain' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.listProduct, {borderBottomWidth: 0, paddingVertical: moderateScale(10)}]}>
            <View style={[styles.flexRowEnd]}>
              <Text style={[styles.textRegularFlat, {marginRight: ratioWidth(10)}]}>SUB TOTAL</Text>
              <Text style={[styles.textRegularFlat, {fontFamily: Fonts.type.robotoMedium}]}>{RupiahFormat(3199000)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
