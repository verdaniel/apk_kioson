import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Modal, Text } from 'react-native'
import * as Progress from 'react-native-progress'
import {Colors, Fonts} from '../Themes/'
import { moderateScale } from '../Transforms/Scaling'
import PropTypes from 'prop-types'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'

export default class Loading extends Component {
  // // Prop type warnings
  static propTypes = {
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    lable: PropTypes.string
  }
  //
  // Defaults for props
  static defaultProps = {
    visible: false,
    onRequestClose: () => {}
  }
  render () {
    let indeterminate = true
    const dp = (
      <Modal
        transparent
        animationType={'fade'}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={{backgroundColor: Colors.black_30, alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View style={{borderRadius: moderateScale(6), padding: moderateScale(20), backgroundColor: Colors.white_two, alignItems: 'center'}}>
            <Text style={{ fontFamily: Fonts.type.robotoRegular, fontSize: moderateScale(14), color: Colors.slate_grey, paddingBottom: ratioHeight(15) }}>Mohon menunggu...</Text>
            <Progress.Bar
              borderWidth={1}
              borderColor={Colors.transparent}
              borderRadius={3}
              color={Colors.squash}
              height={ratioHeight(5)}
              unfilledColor={Colors.white}
              indeterminate={indeterminate}
              width={ratioWidth(163)} />
          </View>
        </View>
      </Modal>
    )
    return (
      <View>
        {dp}
      </View>
    )
  }
}
