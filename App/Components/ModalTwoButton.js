import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Easing, TouchableOpacity } from 'react-native'
import styles from './Styles/ModalTwoButtonStyle'
import Modal from 'react-native-modalbox'
import { Colors } from '../Themes/'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling';

export default class ModalTwoButton extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <Modal
        backdropOpacity={100}
        style={styles.modal}
        backButtonClose
        position={'center'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.black_35}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={this.props.isOpen}
        onClosed={this.props.onClosed}>
        <Text allowFontScaling style={[styles.robotoMedBlue, { textAlign: 'center' }]}>{this.props.title}</Text>
        <Text allowFontScaling style={[styles.robotoRegSlateModal]}>{this.props.desc}</Text>
        <View style={[styles.flexOneRowModal, { bottom: ratioHeight(0) }]}>
          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.white_two, borderWidth: moderateScale(1), borderColor: Colors.nice_blue }]} onPress={this.props.onPressFalse}>
            <Text style={styles.ProductSansBoldFixed}>{this.props.buttonFalse}</Text>
          </TouchableOpacity>
          <View style={{ width: ratioWidth(10) }} />
          <TouchableOpacity style={styles.button} onPress={this.props.onPressTrue}>
            <Text style={[styles.ProductSansBoldFixed, { color: Colors.white_two }]}>{this.props.buttonTrue}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}
