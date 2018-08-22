import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Easing } from 'react-native'
import styles from './Styles/ModalOneButtonStyle'
import Modal from 'react-native-modalbox'
import { Colors } from '../Themes/'

export default class ModalOneButton extends Component {
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
        style={styles.modalFix}
        backButtonClose
        position={'center'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.black_35}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={this.props.isOpen}
        onClosed={this.props.onClosed}>
        <Text style={[styles.robotoMedBlue, { textAlign: 'center' }]}>{this.props.title}</Text>
        <Text style={styles.robotoRegSlateModalMod}>{this.props.desc}</Text>
        <TouchableOpacity style={styles.buttonModal}
          onPress={this.props.onPress}>
          <Text style={styles.textButton}>{this.props.button}</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
