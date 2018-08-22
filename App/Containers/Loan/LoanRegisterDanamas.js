import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../Themes'
import ModalTwoButton from '../../Components/ModalTwoButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/LoanRegisterDanamasStyle'

class LoanRegisterDanamas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRead: false,
      modalRegister: false
    }
  }

  renderNav () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.slate_grey_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {I18n.t('t_register_danamas')}
          </Text>
        </View>
        <View style={styles.viewRight} />
      </View>
    )
  }

  renderBottom () {
    const { isRead } = this.state
    const button = isRead ? (
      <TouchableOpacity style={styles.button} onPress={() => this.setState({ modalRegister: true })}>
        <Text style={styles.textButton}>
          {I18n.t('b_agree')}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={[styles.button, { backgroundColor: Colors.greyish }]}>
        <Text style={styles.textButton}>
          {I18n.t('b_agree')}
        </Text>
      </View>
    )
    return (
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          {button}
        </View>
      </View>
    )
  }

  modalRegister () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalRegister}
        onClosed={() => this.setState({ modalRegister: false })}
        onPressFalse={() => this.cancel()}
        onPressTrue={() => this.ok()}
        title={'Daftar Pinjaman'}
        desc={'Anda yakin ingin mendaftar pinjaman\nDanamas?'}
        buttonFalse={'Batal'}
        buttonTrue={'OK'} />
    )
  }

  cancel () {
    this.setState({
      modalRegister: false
    })
  }

  ok () {
    this.setState({
      modalRegister: false
    })
    this.props.navigation.navigate('LoanRegister')
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor={Colors.white_two} />
          {this.renderNav()}
          <ScrollView onMomentumScrollEnd={() => this.setState({ isRead: true })}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {'\t'}{'\t'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book. It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged.{'\n'}
                {'\t'}{'\t'}It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book.{'\n'}
                {'\t'}{'\t'}It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{'\n'}
                {'\t'}{'\t'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book. It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged.{'\n'}
                {'\t'}{'\t'}It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book.{'\n'}
                {'\t'}{'\t'}It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book. It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged.
              </Text>
            </View>
          </ScrollView>
          {this.renderBottom()}
        </View>
        {this.modalRegister()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanRegisterDanamas)
