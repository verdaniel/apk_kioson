import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import ModalOneButton from '../../Components/ModalOneButton'
import TextInputMod from '../../Components/TextInputMod'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/ChangePinStyle'
import { Images } from '../../Themes/index'
import { ratioHeight } from '../../Transforms/Resize'
import ButtonForm from '../../Components/ButtonForm'

class ChangePin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPinTemp: '123456',
      errorOldPin: false,
      errorNewPin: false,
      errorConfrimPin: false,
      oldPin: '',
      newPin: '',
      confrimPin: '',
      buttonDisable: true,
      errorOldMessage: '',
      errorNewMessage: '',
      errorConfrimMessage: '',
      editableNew: false,
      editableConfrim: false,
      secureTextOldPin: true,
      secureTextNewPin: true,
      secureTextConfrimPin: true,
      modalSuccess: false
    }
  }

  onFocus = () => {
    this.setState({
      errorOldPin: false,
      errorNewPin: false,
      errorOldMessage: '',
      errorNewMessage: '',
      errorConfrimMessage: '',
      errorConfrimPin: false,
      secureTextOldPin: true,
      secureTextNewPin: true,
      secureTextConfrimPin: true
    })
  }

  clearErrorMessage () {
    this.setState({ errorNewPin: false, errorNewMessage: '', errorConfrimPin: false, errorConfrimMessage: '' })
  }

  onFocusOldPin = () => {
    this.setState({errorOldPin: false, errorOldMessage: ''})
    this.clearErrorMessage()
  }

  onFocusNewPin = () => {
    if (this.state.oldPin.length === 0) {
      this.setState({ errorOldPin: true, errorOldMessage: 'PIN saat ini tidak boleh kosong' })
    }
    this.clearErrorMessage()
  }

  onFocusConfrimPin = () => {
    if (this.state.oldPin.length === 0) {
      this.setState({ errorOldPin: true, errorOldMessage: 'PIN saat ini tidak boleh kosong' })
    }
    this.clearErrorMessage()
  }

  onBlurOldPin = () => {
    if (this.state.oldPin !== this.state.oldPinTemp) {
      this.setState({ errorOldPin: true, errorOldMessage: 'PIN Lama Anda tidak sesuai dengan yang di dalam sistem' })
    } else if (this.state.oldPin.length < 6) {
      this.setState({ errorOldPin: true, errorOldMessage: 'PIN harus 6 digit' })
    } else if (this.state.oldPin.length >= 6) {
      this.setState({ editableNew: true, buttonDisable: false })
    }
  }

  onBlurNewPin = () => {
    if (this.state.newPin.length < 6) {
      this.setState({ errorNewPin: true, errorNewMessage: 'PIN harus 6 digit' })
    } else if (this.state.newPin.length >= 6) {
      this.setState({ editableConfrim: true })
    }
  }

  onBlurConfrimPin = () => {
    if (this.state.confrimPin.length < 6) {
      this.setState({ errorConfrimPin: true, errorConfrimMessage: 'PIN harus 6 digit' })
    }
  }

  onChangeTextOldPin = (text) => {
    this.clearErrorMessage()
    this.setState({ oldPin: text })
  }

  onChangeTextNewPin = (text) => {
    this.clearErrorMessage()
    this.setState({ newPin: text })
  }

  onChangeTextConfrimPin = (text) => {
    this.clearErrorMessage()
    this.setState({ confrimPin: text })
  }

  manageOldPinVisibility = () => {
    this.setState({ secureTextOldPin: !this.state.secureTextOldPin })
  }

  manageNewPinVisibility = () => {
    this.setState({ secureTextNewPin: !this.state.secureTextNewPin })
  }

  manageConfrimPinVisibility = () => {
    this.setState({ secureTextConfrimPin: !this.state.secureTextConfrimPin })
  }

  confrimOnpress () {
    const {newPin, confrimPin} = this.state
    if (newPin.length === 0 && confrimPin.length === 0) {
      this.setState({ errorNewPin: true, errorNewMessage: 'PIN Baru Anda tidak boleh kosong.', errorConfrimPin: true, errorConfrimMessage: 'Konfirmasi PIN Baru tidak boleh kosong.' })
    } else if (newPin.length === 0) {
      this.setState({ errorNewPin: true, errorNewMessage: 'PIN Baru Anda tidak boleh kosong.' })
    } else if (confrimPin.length === 0) {
      this.setState({ errorConfrimPin: true, errorConfrimMessage: 'Konfirmasi PIN Baru tidak boleh kosong.' })
    } else if (newPin !== confrimPin) {
      this.setState({ errorConfrimPin: true, errorConfrimMessage: 'Pola PIN harus sama dengan sebelumnya.' })
    } else {
      this.setState({ modalSuccess: true })
    }
  }

  onPress () {
    this.setState({ modalSuccess: false })
    this.props.navigation.goBack()
  }

  modalSuccess () {
    return (
      <ModalOneButton
        isOpen={this.state.modalSuccess}
        onClosed={() => this.setState({ modalSuccess: false })}
        onPress={() => this.onPress()}
        title={'SUKSES'}
        desc={'PIN Anda berhasil diganti.'}
        button={'OK'} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.form, {marginBottom: ratioHeight(10)}]}>
            <TextInputMod
              value={this.state.oldPin}
              title={'PIN Lama Anda'}
              isLeftVisible
              iconLeft={Images.ic_pin}
              keyboardType='numeric'
              secureTextEntry={this.state.secureTextOldPin}
              placeholder='******'
              iconRight={(this.state.secureTextOldPin) ? Images.ic_eye : Images.ic_eye_active}
              isRightVisible
              onPressRight={this.manageOldPinVisibility}
              onFocus={() => this.onFocusOldPin()}
              onBlur={() => this.onBlurOldPin()}
              isError={this.state.errorOldPin}
              messageError={this.state.errorOldMessage}
              onChangeText={this.onChangeTextOldPin}
            />
            <TextInputMod
              value={this.state.newPin}
              title={'PIN Baru Anda'}
              isLeftVisible
              iconLeft={Images.ic_pin}
              keyboardType='numeric'
              secureTextEntry={this.state.secureTextNewPin}
              placeholder='******'
              iconRight={(this.state.secureTextNewPin) ? Images.ic_eye : Images.ic_eye_active}
              isRightVisible
              onPressRight={this.manageNewPinVisibility}
              onBlur={() => this.onBlurNewPin()}
              onFocus={() => this.onFocusNewPin()}
              isError={this.state.errorNewPin}
              messageError={this.state.errorNewMessage}
              onChangeText={this.onChangeTextNewPin}
            />
            <TextInputMod
              value={this.state.confrimPin}
              title={'Konfirmasi PIN Baru'}
              isLeftVisible
              iconLeft={Images.ic_pin}
              keyboardType='numeric'
              secureTextEntry={this.state.secureTextConfrimPin}
              placeholder='******'
              iconRight={(this.state.secureTextConfrimPin) ? Images.ic_eye : Images.ic_eye_active}
              isRightVisible
              onPressRight={this.manageConfrimPinVisibilityPinVisibility}
              onBlur={() => this.onBlurConfrimPin()}
              onFocus={() => this.onFocusConfrimPin()}
              isError={this.state.errorConfrimPin}
              messageError={this.state.errorConfrimMessage}
              onChangeText={this.onChangeTextConfrimPin}
            />
          </View>
          <View style={styles.fotter}>
            <Text style={styles.textfotter}>PIN ini sangat rahasia dan digunakan untuk memverifikasi transaksi Anda. Mohon diingat dengan baik dan jangan berikan PIN ini kepada siapapun.</Text>
          </View>
        </ScrollView>
        <ButtonForm
          onPress={() => this.confrimOnpress()}
          disabled={this.state.buttonDisable}
          lable={'KONFIRMASI'}
        />
        {this.modalSuccess()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin)
