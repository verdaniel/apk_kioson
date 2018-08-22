import React, { Component } from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import FloatingLabel from '../../Components/FloatingLabel'
import AlertMessage from '../../Transforms/AlertMessage'
import { Images, Colors, Fonts } from '../../Themes'
import { moderateScale } from '../../Transforms/Scaling'
import I18n from 'react-native-i18n'
import {NavigationActions} from 'react-navigation'

// Styles
import styles from '../Styles/SignUpStyle'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      errorName: false,
      errorEmail: false,
      alert: {
        name: '',
        email: ''
      },
      data: {
        'name': '',
        'email': ''
      },
      keyboardshow: false
    }
  }

  renderLogoAndTitle () {
    return (
      <View style={styles.titleContainer}>
        <Image source={Images.ic_kioson_white} style={styles.logo} />
      </View>
    )
  }

  renderForm () {
    const { name, email, alert, errorName, errorEmail } = this.state
    let registerButton
    if (name !== '' && email !== '') {
      registerButton = (
        <TouchableOpacity style={styles.buttonSignIn} onPress={() => this.register()}>
          <Text style={[styles.textButton, { fontSize: moderateScale(16) }]}>
            DAFTAR
          </Text>
        </TouchableOpacity>
      )
    } else {
      registerButton = (
        <View style={styles.buttonSignInOff}>
          <Text style={[styles.textButton, { fontSize: moderateScale(16) }]}>
            DAFTAR
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.formContainer}>
        <FloatingLabel
          text='Nama Lengkap Sesuai KTP'
          keyboardChange={false}
          alert={alert.name}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={name}
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
          changeColor={[Colors.greyish, Colors.nice_blue]}
          viewStyle={{ marginLeft: 0, marginRight: 0 }}
          onChangeText={(text) => this.setState({ name: text, alert: {...alert, name: AlertMessage.non} })}
          separatorColor={!errorName ? Colors.black_15 : Colors.red}
        />
        <FloatingLabel
          ref='email'
          alert={alert.email}
          text='Alamat Email'
          keyboardChange={false}
          changeColor={[Colors.greyish, Colors.nice_blue]}
          viewStyle={{ marginLeft: 0, marginRight: 0, marginTop: moderateScale(10), marginBottom: moderateScale(10) }}
          keyboardType='email-address'
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          value={email}
          onFocus={() => this.setState({keyboardshow: true})}
          onBlur={() => {
            this.setState({
              keyboardshow: false
            })
          }}
          onChangeText={(text) => this.setState({ email: text, alert: {...alert, email: AlertMessage.non} })}
          separatorColor={!errorEmail ? Colors.black_15 : Colors.red}
        />
        <View style={styles.notificationContainer}>
          <Text style={styles.notification}>
            Dengan menekan tombol Daftar, Saya menyetujui
          </Text>
          <View style={styles.notificationContainerRow}>
            <TouchableOpacity>
              <Text style={styles.textTerm}>
                Syarat dan Ketentuan {' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.notification}>
              Kioson.
            </Text>
          </View>
        </View>
        {registerButton}
        <TouchableOpacity>
          <Text style={styles.textHelp}>
            Bantuan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSignInButton () {
    const { keyboardshow } = this.state
    if (!keyboardshow) {
      return (
        <View style={styles.registerContainer}>
          <Text style={styles.textRegister}>
            Sudah Punya Akun? {' '}
          </Text>
          <TouchableOpacity onPress={() => this.signIn()}>
            <Text style={styles.textRegisterButton}>
              MASUK
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  signIn = () => {
    this.props.navigation.navigate('SignIn')
  }

  register = () => {
    const { name, email, alert, data } = this.state
    if (name.length < 3) {
      // ToastAndroid.show('Nama minimal 3 karakter', ToastAndroid.SHORT)
      this.setState({
        errorName: true,
        alert: {...alert, name: I18n.t('e_fullname')}
      })
    } else if (email.length < 8 || !email.includes('@') || !email.includes('.')) {
      // ToastAndroid.show('Alamat email salah', ToastAndroid.SHORT)
      this.setState({
        errorName: false,
        errorEmail: true,
        alert: {...alert, email: 'Format alamat email Anda salah.'}
      })
    } else {
      this.setState({
        errorName: false,
        errorEmail: false
      })
      let dataTemp = data
      dataTemp.name = name
      dataTemp.email = email
      // this.props.navigation.navigate('SignUpVerificationReminder', { data: dataTemp })
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'SignUpVerificationReminder'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderLogoAndTitle()}
          {this.renderForm()}
        </ScrollView>
        {this.renderSignInButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
