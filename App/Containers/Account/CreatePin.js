import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/CreatePinStyle'
import { Images, Colors } from '../../Themes/index'
import ModalOneButton from '../../Components/ModalOneButton'
import TextInputMod from '../../Components/TextInputMod'
import ButtonForm from '../../Components/ButtonForm'
import { ratioHeight } from '../../Transforms/Resize'

class CreatePin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorNewPin: false,
      errorConfrimPin: false,
      newPin: '',
      confrimPin: '',
      buttonDisable: true,
      errorNewMessage: '',
      errorConfrimMessage: '',
      editable: false,
      secureTextNewPin: true,
      secureTextConfrimPin: true,
      modalSuccess: false
    }
  }

  onBlur = (text) => {
    if (this.state.newPin.length < 6) {
      this.setState({ errorNewPin: true, errorNewMessage: 'PIN harus 6 digit' })
    } else if (this.state.newPin.length >= 6) {
      this.setState({ editable: true })
    }
  }

  onFocus = () => {
    this.setState({ errorNewPin: false, errorNewMessage: '', errorConfrimPin: false, errorConfrimMessage: '', secureTextNewPin: true, secureTextConfrimPin: true })
  }

  onChangeText = (text) => {
    this.setState({ newPin: text })
  }

  onBlurConfrimPin = (text) => {
    if (this.state.confrimPin.length < 6) {
      this.setState({ errorConfrimPin: true, errorConfrimMessage: 'PIN harus 6 digit' })
    }
  }

  onChangeTextConfrimPin = (text) => {
    this.setState({ confrimPin: text })
  }

  managePinVisibility = () => {
    this.setState({ secureTextNewPin: !this.state.secureTextNewPin })
  }

  manageConfrimPinVisibility = () => {
    this.setState({ secureTextConfrimPin: !this.state.secureTextConfrimPin })
  }

  confrimOnpress () {
    const {newPin, confrimPin} = this.state
    if (newPin !== confrimPin) {
      this.setState({ errorConfrimPin: true, errorConfrimMessage: 'Pola PIN harus sama dengan sebelumnya' })
    } else {
      AsyncStorage.setItem('pinStatus', JSON.stringify(true))
      AsyncStorage.setItem('pinNumber', this.state.confrimPin)
      this.setState({modalSuccess: true})
    }
  }

  onPress () {
    this.setState({ modalSuccess: false })
    this.props.navigation.goBack()
    this.props.navigation.state.params.onValueChange(true)
  }

  modalSuccess () {
    return (
      <ModalOneButton
        isOpen={this.state.modalSuccess}
        onClosed={() => this.setState({ modalSuccess: false })}
        onPress={() => this.onPress()}
        title={'SUKSES'}
        desc={'PIN Anda berhasil dibuat.\nSelamat bertransaksi.'}
        button={'OK'} />
    )
  }

  render () {
    let disabled = this.state.buttonDisable
    const { newPin, confrimPin } = this.state
    if (newPin.length >= 6 && confrimPin.length >= 6) {
      disabled = false
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.form}>
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
              onPressRight={this.managePinVisibility}
              onBlur={() => this.onBlur()}
              onFocus={() => this.onFocus()}
              isError={this.state.errorNewPin}
              messageError={this.state.errorNewMessage}
              onChangeText={this.onChangeText}
            />
            <TextInputMod
              value={this.state.confrimPin}
              title={'Konfirmasi PIN Baru'}
              isLeftVisible
              editable={this.state.editable}
              iconLeft={Images.ic_pin}
              keyboardType='numeric'
              secureTextEntry={this.state.secureTextConfrimPin}
              placeholder='******'
              iconRight={(this.state.secureTextConfrimPin) ? Images.ic_eye : Images.ic_eye_active}
              isRightVisible
              onPressRight={this.manageConfrimPinVisibility}
              onBlur={() => this.onBlur()}
              onFocus={() => this.onFocus()}
              isError={this.state.errorConfrimPin}
              messageError={this.state.errorConfrimMessage}
              onChangeText={this.onChangeTextConfrimPin}
            />
          </View>
          <View style={styles.fotter}>
            <Text style={styles.textfotter}>PIN ini sangat rahasia dan digunakan untuk memverifikasi transaksi Anda. Mohon diingat dengan baik dan jangan berikan PIN ini kepada siapapun.</Text>
          </View>
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15), backgroundColor: Colors.white}} >
          <ButtonForm
            onPress={() => this.confrimOnpress()}
            disabled={disabled}
            lable={'KONFIRMASI'}
        />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePin)
