import React, { Component } from 'react'
import { Text, View, StatusBar, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ModalOneButton from '../../Components/ModalOneButton'
import Switchs from '../../Components/Switch'
import ModalTwoButton from '../../Components/ModalTwoButton'

// Styles
import styles from '../Styles/PinAccountStyle'
import { Colors, Images } from '../../Themes/index'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

class PinAccount extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      textStatus: 'TIDAK AKTIF',
      statisPin: params.statisPin || false,
      modalForgotPin: false,
      modalDisablePin: false,
      SwitchOnValueHolder: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('pinStatus').then((value) => {
      if (value === 'true') {
        this.setState({ statisPin: true, textStatus: 'AKTIF' })
      }
    })
  }

  nextAction (title) {
    this.props.navigation.navigate(title, { onValueChange: this.onValueChange })
  }

  onValueChange = (value) => {
    if (value) {
      AsyncStorage.getItem('pinNumber').then((number) => {
        if (number === null || number === undefined || number === '') {
          this.setState({statisPin: false})
          this.nextAction('CreatePin')
        } else {
          AsyncStorage.setItem('pinStatus', JSON.stringify(true))
          this.setState({ statisPin: value, textStatus: 'AKTIF' })
        }
      })
    } else {
      this.setState({modalDisablePin: true})
    }
  }

  renderMenu (title, status = true) {
    let colorText = Colors.nice_blue
    if (!this.state.statisPin) {
      colorText = Colors.greyish
    }
    return (
      <View activeOpacity={0.8} style={styles.flexOneRow} >
        <View style={[styles.flexColMenu, {borderBottomWidth: 0}]}>
          <View style={styles.flexRowMenu}>
            <Text allowFontScaling style={[styles.robotoRegBigSlate]}>{title}</Text>
            <Text allowFontScaling style={[styles.robotoMedGrey, { color: colorText, flex: 1, marginLeft: ratioWidth(10) }]}>{this.state.textStatus}</Text>
            <View style={{marginRight: ratioWidth(10)}}>
              <Switchs
                height={ratioHeight(25)}
                width={ratioWidth(55)}
                value={this.state.statisPin}
                circleColorActive={Colors.nice_blue}
                circleColorInactive={Colors.greyish}
                backgroundInactive={Colors.white_two}
                backgroundActive={Colors.white_two}
                onSyncPress={(value) => this.onValueChange(value)} />
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderChangePin(title, borderBottom = 1, activeOpacity = 0.8, action ) {
    return(
      <View>
        <Text>
          
        </Text>
      </View>
    )
  }







  renderWarning () {
    return (
      <View style={styles.viewWarning}>
        <Image source={Images.ic_warning} style={styles.image} resizeMode={'contain'} />
        <Text style={[styles.robotoRegSmall, {marginLeft: ratioWidth(15), marginRight: ratioWidth(80)}]}>Harap aktifkan PIN untuk memberikan perlindungan lebih bagi akun Anda.</Text>
      </View>
    )
  }

  renderMenuPin (title, action) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={action}>
        <Text style={[styles.robotoRegLarge]}>{title}</Text>
        <Image source={Images.ic_next_calendar} style={styles.imageArrow} />
      </TouchableOpacity>
    )
  }

  disableAction () {
    this.setState({ modalDisablePin: false, statisPin: false, textStatus: 'TIDAK AKTIF' })
    AsyncStorage.setItem('pinStatus', JSON.stringify(false))
  }

  modalDisablePin () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalDisablePin}
        onClosed={() => this.setState({ modalDisablePin: false })}
        onPressFalse={() => this.disableAction()}
        onPressTrue={() => this.setState({modalDisablePin: false, statisPin: true, textStatus: 'AKTIF'})}
        title={'MATIKAN PIN'}
        desc={'Apakah Anda yakin ingin\nmematikan fitur PIN?'}
        buttonFalse={'Ya'}
        buttonTrue={'Tidak'} />
    )
  }

  modalConfrim () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalForgotPin}
        onClosed={() => this.setState({ modalForgotPin: false })}
        onPressTrue={() => this.setState({ modalForgotPin: false })}
        onPressFalse={() => this.setState({ modalForgotPin: false, modalSuccess: true })}
        title={'LUPA PIN'}
        desc={'PIN baru akan dikirim ke nomor\nHP terdaftar (0812xxxx3746).'}
        buttonFalse={'Reset'}
        buttonTrue={'Batal'} />
    )
  }

  modalSuccess () {
    return (
      <ModalOneButton
        isOpen={this.state.modalSuccess}
        onClosed={() => this.setState({ modalSuccess: false })}
        onPress={() => this.setState({ modalSuccess: false })}
        title={'BERHASIL'}
        desc={'PIN baru telah dikirim ke nomor\nHP terdaftar.'}
        button={'OK'} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderMenu('Status PIN', this.state.statisPin)}
        {/* {this.renderMenu('Status PIN')} */}
        {this.state.statisPin === false && this.renderWarning()}
        {this.state.statisPin === true && this.renderMenuPin('Ganti PIN', () => this.nextAction('ChangePin'))}
        {this.state.statisPin === true && this.renderMenuPin('Lupa PIN', () => this.setState({modalForgotPin: true}))}
        {this.modalConfrim()}
        {this.modalSuccess()}
        {this.modalDisablePin()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PinAccount)
