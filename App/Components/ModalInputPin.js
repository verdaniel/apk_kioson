import React, { Component } from 'react'
import { Text, TouchableOpacity, Easing, View, TextInput, Image, AsyncStorage } from 'react-native'
import styles from './Styles/ModalInputPinStyle'
import Modal from 'react-native-modalbox'
import { Colors, Images } from '../Themes/'
import { ratioHeight } from '../Transforms/Resize'

export default class ModalInputPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pinNumberStorage: '',
      pinNumber: '',
      errorPin: false,
      errorMessagePin: '',
      secureTextPin: true
    }
  }

  componentDidMount () {
    // this.refs.pin.focus()
    AsyncStorage.getItem('pinNumber').then((number) => {
      if (number === null || number === undefined || number === '') {
      } else {
        this.setState({pinNumberStorage: number})
      }
    })
  }

  onChangeTextPin = (text) => {
    this.setState({ pinNumber: text })
    if (text.length < 6) {
      this.setState({ errorPin: true, errorMessagePin: 'PIN harus 6 digit' })
    } else {
      this.setState({ errorPin: false, errorMessagePin: '' })
    }
  }

  onSubmit (pinNumber) {
    if (this.state.pinNumberStorage === '') {
      this.props.onPress(pinNumber)
    } else {
      if (this.state.pinNumberStorage !== pinNumber) {
        this.setState({ errorPin: true, errorMessagePin: 'PIN anda salah' })
        console.tron.warn(this.state.pinNumberStorage)
      } else {
        this.props.onPress(pinNumber)
      }
    }
  }

  managePinVisibility = () => {
    this.setState({ secureTextPin: !this.state.secureTextPin })
  }

  render () {
    let disable = true
    if (this.state.pinNumber.length !== 0 && this.state.errorPin !== true) {
      disable = false
    }
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
        <View style={{paddingBottom: ratioHeight(12)}}>
          <View style={this.state.errorPin === false ? styles.borderBottom : styles.borderBottomError}>
            <TextInput
              ref='pin'
              style={this.state.errorPin === false ? styles.inputTextModal : styles.inputTextModalError}
              value={this.state.pinNumber}
              keyboardType='numeric'
              returnKeyType='done'
              autoCapitalize='none'
              secureTextEntry={this.state.secureTextPin}
              maxLength={13}
              autoCorrect
              autoFocus
              onChangeText={this.onChangeTextPin}
              underlineColorAndroid='transparent'
              placeholder={'******'}
              placeholderTextColor={Colors.greyish}
            />
            <TouchableOpacity
              activeOpacity={0.8} onPress={this.managePinVisibility}
              style={styles.buttonTextInput}>
              <Image style={styles.iconSquare} source={(this.state.secureTextPin) ? Images.ic_eye : Images.ic_eye_active} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <Text style={this.state.errorPin === false ? styles.erroMessage : styles.erroMessageActive}>{this.state.errorMessagePin}</Text>
        </View>
        <TouchableOpacity disabled={disable} style={disable === true ? styles.buttonModal : styles.buttonModalActive}
          onPress={() => this.onSubmit(this.state.pinNumber)}>
          <Text style={styles.textButton}>{this.props.button}</Text>
        </TouchableOpacity>
      </Modal>
    )
  }
}
