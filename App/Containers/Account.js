import React, { Component } from 'react'
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Fonts, Colors } from '../Themes'
import { NavigationActions } from 'react-navigation'
import ModalTwoButton from '../Components/ModalTwoButton'
import Switch from '../Components/Switch'
import LoadingModal from '../Components/Loading'
import NoLoginTab from '../Components/NoLoginTab'

// Actions
import AccountType from '../Redux/AccountRedux'
import ProfileTypes from '../Redux/ProfileRedux'
import loginAction from '../Redux/UserLoginRedux'

// Styles
import styles from './Styles/AccountStyle'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'

const accounting = require('accounting')

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      id: '',
      phone: '',
      balance: 0,
      statusKios: true,
      userVerify: true,
      textStatus: 'BUKA',
      modalCloseKios: false,
      modalLogout: false,
      modalLodaing: false,
      typeRequest: '',
      userLogin: this.props.dataLogin.login,
      statuVerify: 2 // 0: not verify, 1: procced verify, 2: verify, 3: failed verify
    }
  }

  static navigationOptions = {
    tabBarLabel: ({ focused, tintColor }) => (
      <View style={styles.tabLabel}>
        <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12) }}>
          Akun
        </Text>
      </View>
    ),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.tabIcon}>
        <Image source={Images.ic_akun} style={{ width: ratioWidth(24), height: ratioWidth(24), tintColor: tintColor }} resizeMode={'contain'} />
      </View>
    )
  }

  profileNavigate () {
    this.props.navigation.navigate('Profile',
      {
        name: this.state.name,
        id: this.state.id,
        phone: this.state.phone
      })
  }

  navigate (route) {
    const navigate = NavigationActions.navigate({
      routeName: route,
      params: {},
      action: NavigationActions.navigate({ routeName: route })
    })
    this.props.navigation.dispatch(navigate)
  }

  componentDidMount () {
    this.setState({ typeRequest: 'getProfile' })
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.getProfile(value)
      }
    })
    // this.props.getProfile('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW4iOiJlMmQzMDljY2RkODE3ZTY5Y2RiZjA2MGQzNGQzNTUzMCIsInNlc3Npb25faWQiOiI3YjFjN2Q2ZS1lNmZjLTExZTctYSIsInJldGFpbGVyX2lkIjoiUkhZWiIsImlhdCI6MTUxMzkzNTc3MywiZXhwIjoxNTE0NTQwNTczfQ.EvcJz_usaew_BNjdyGPoKSyXh2m-7GBhAI3RpJQcpv4')
  }

  componentWillReceiveProps (nextProps) {
    const { typeRequest } = this.state
    const { profile, balance, dataLogin } = nextProps
    // if (typeRequest === 'logout') {
    //   if (logoutProps !== null) {
    //     if (logoutProps.code === 200 && logoutProps.status) {
    //       this.setState({
    //         modalLodaing: false
    //       })
    //       const resetAction = NavigationActions.reset({
    //         index: 0,
    //         actions: [
    //           NavigationActions.navigate({ routeName: 'GateScreen' })
    //         ]
    //       })
    //       this.props.navigation.dispatch(resetAction)
    //     } else if (!logoutProps.status && logoutProps.code !== 0) {
    //       ToastAndroid.show(logoutProps.message, ToastAndroid.SHORT)
    //       logoutProps.code = 0
    //     }
    //   }
    // }
    if (typeRequest === 'getProfile') {
      if (profile && balance) {
        if (profile.status && balance.status) {
          this.setState({
            name: profile.data.name,
            id: profile.data.retailer_id,
            phone: profile.data.phone_number,
            balance: balance.data.total_sales
          })
        } else ToastAndroid.show(profile.message, ToastAndroid.SHORT)
      }
    }
    if (dataLogin.login) {
      this.setState({
        userLogin: true
      })
    } else {
      this.setState({
        userLogin: false
      })
    }
  }

  renderFooter () {
    return (
      <View style={styles.footer}>
        <Image
          style={styles.logo}
          source={Images.ic_logo_kioson}
          resizeMode={'contain'} />
        <Text style={styles.textFooter}>Versi 7.0</Text>
      </View>
    )
  }

  modalCloseKios () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalCloseKios}
        onClosed={() => this.setState({ modalCloseKios: false })}
        onPressFalse={() => this.onPressYes()}
        onPressTrue={() => this.onPressTidak()}
        title={'TUTUP'}
        desc={'Apakah Anda yakin ingin menutup\nkios Anda ?'}
        buttonFalse={'Ya'}
        buttonTrue={'Tidak'} />
    )
  }

  renderInVerify () {
    return (
      <View style={styles.containerBlueCol}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Mau mendapatkan
            <Text style={styles.productSansBold}> keuntungan </Text>
            lebih?{'\n'}daftar jadi{'\n'}
            <Text style={styles.productSansBold}>agen premium</Text>
          </Text>
        </View>
        <View style={{marginLeft: ratioWidth(13), marginRight: ratioWidth(10), borderLeftWidth: 1.5, borderLeftColor: Colors.white_two, height: moderateScale(94)}} />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.buttonSquas}>
            <Text style={[styles.productSansRegular, {padding: ratioWidth(7)}]}>Daftar</Text>
          </View>
        </View>
      </View>
    )
  }

  renderButtonVerify () {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.containerBlueCol}>
        <Image resizeMode={'contain'} source={Images.ic_exclamation_mark} style={{height: ratioHeight(14), width: ratioWidth(14)}} />
        <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Tekan di sini untuk verifikasi data Anda.</Text>
      </TouchableOpacity>
    )
  }

  renderButtonVerifyfail () {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.containerBlueCol}>
        <Image resizeMode={'contain'} source={Images.ic_exclamation_mark} style={{height: ratioHeight(14), width: ratioWidth(14)}} />
        <Text style={[styles.productSansRegular, {paddingLeft: ratioWidth(10)}]}>Verifikasi GAGAL. Tekan di sini untuk perbaiki data.</Text>
      </TouchableOpacity>
    )
  }

  actionLogout () {
    this.setState({ modalLogout: false, modalLodaing: true, typeRequest: 'logout' })
    // this.props.logout()
  }

  logout () {
    this.setState({ modalLogout: false })
    this.props.setLogin(false)
    this.props.setKyc(false)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('pinStatus')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'GateScreen'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  modalLogout () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalLogout}
        onClosed={() => this.setState({ modalLogout: false })}
        onPressFalse={() => this.logout()}
        onPressTrue={() => this.actionLogout()}
        title={'KELUAR'}
        desc={'Apakah Anda yakin ingin keluar dari\nakun Anda ?'}
        buttonFalse={'Ya'}
        buttonTrue={'Tidak'} />
    )
  }

  onValueChange (value) {
    if (!value) {
      this.setState({ modalCloseKios: true })
    } else {
      this.setState({ statusKios: true, textStatus: 'BUKA' })
    }
  }

  handleChange (statusKios) {
    this.setState({ statusKios })
  }

  onPressYes (value) {
    this.setState({modalCloseKios: false, statusKios: false, textStatus: 'TUTUP'})
  }

  onPressTidak (value) {
    this.setState({ modalCloseKios: false, statusKios: true, textStatus: 'BUKA' })
  }

  renderMenu (icon, title, borderBottom = 1, status = true, activeOpacity = 0.8, action) {
    let flex = 1
    let colorText = Colors.nice_blue
    if (!status) {
      flex = 0
    }
    if (this.state.textStatus === 'TUTUP') {
      colorText = Colors.greyish
    }
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={styles.flexOneRow} onPress={action}>
        <Image
          style={[styles.imgTanya, {marginLeft: ratioWidth(17)}]}
          source={icon}
          resizeMode={'contain'} />
        <View style={[styles.flexColMenu, {borderBottomWidth: borderBottom}]}>
          <View style={styles.flexRowMenu}>
            <Text allowFontScaling style={[styles.robotoRegBigSlate, {flex: flex}]}>{title}</Text>
            {status === false && <Text allowFontScaling style={[styles.robotoMedGrey, { color: colorText, flex: 1, marginLeft: ratioWidth(10) }]}>{this.state.textStatus}</Text>}
            {status === false &&
            <View style={{marginRight: ratioWidth(10)}}>
              <Switch
                height={ratioHeight(25)}
                width={ratioWidth(55)}
                value={this.state.statusKios}
                circleColorActive={Colors.nice_blue}
                circleColorInactive={Colors.greyish}
                backgroundInactive={Colors.white_two}
                backgroundActive={Colors.white_two}
                onSyncPress={(value) => this.onValueChange(value)} />
            </View>}
            {status === true && <Image
              style={styles.imageArrow}
              source={Images.ic_next_calendar}
              resizeMode={'contain'} />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeaderUser () {
    const { id, statuVerify, name, phone } = this.state
    return (
      <Image source={Images.profileBg} style={styles.banner}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile',
          {
            name: name,
            id: id,
            phone: phone
          })}>
          <View style={styles.flexRow}>
            <View >
              <Text style={styles.robotoBoldFF}>{name}</Text>
              <Text style={[styles.robotoRegSlate, {color: Colors.white_two, paddingTop: ratioHeight(2)}]}>ID Anda : {id}</Text>
              {this.lableVerify(statuVerify)}
            </View>
            <View style={{flex: 1}} />
            <Image source={Images.ic_arrow_blue_right} style={{tintColor: Colors.snow, width: ratioWidth(7), height: ratioHeight(12)}} />
          </View>
        </TouchableOpacity>
      </Image>
    )
  }

  lableVerify (statuVerify) {
    if (statuVerify === 0) {
      return (
        <View style={[styles.verify, {width: ratioWidth(86)}]}>
          <View style={{width: ratioWidth(6), height: ratioHeight(6), borderRadius: 200, backgroundColor: Colors.nice_blue, marginRight: ratioWidth(4)}} />
          <Text style={styles.textRegularBlue}>Pengguna</Text>
        </View>
      )
    } else if (statuVerify === 1) {
      return (
        <View style={[styles.verify, {width: ratioWidth(121)}]}>
          <View style={{width: ratioWidth(6), height: ratioHeight(6), borderRadius: 200, backgroundColor: Colors.nice_blue, marginRight: ratioWidth(4)}} />
          <Text allowFontScaling style={styles.textRegularBlue}>Proses Verifikasi</Text>
        </View>
      )
    } else if (statuVerify === 2) {
      return (
        <View style={[styles.verify, {width: ratioWidth(100)}]}>
          <View style={{width: ratioWidth(6), height: ratioHeight(6), borderRadius: 200, backgroundColor: Colors.nice_blue, marginRight: ratioWidth(4)}} />
          <Text allowFontScaling style={styles.textRegularBlue}>Mitra Kioson</Text>
        </View>
      )
    } else if (statuVerify === 3) {
      return (
        <View style={[styles.verify, {width: ratioWidth(114)}]}>
          <View style={{width: ratioWidth(6), height: ratioHeight(6), borderRadius: 200, backgroundColor: Colors.red, marginRight: ratioWidth(4)}} />
          <Text allowFontScaling style={[styles.textRegularBlue, {color: Colors.red}]}>Gagal Verifikasi</Text>
        </View>
      )
    }
  }

  renderView () {
    const { balance, userLogin } = this.state
    const { navigation } = this.props
    const saldo = accounting.formatMoney(balance, 'Rp', '0', '.', '0', '%s %v')
    if (userLogin) {
      return (
        <View style={{ flex: 1 }}>
          {this.renderHeaderUser()}
          {this.renderInVerify()}
          <View style={styles.viewElvation}>
            <View style={styles.viewShadow}>
              <View style={styles.flexRowBorderBotttom}>
                <Image source={Images.ic_saldo} style={[styles.icon, {marginRight: ratioHeight(15)}]} resizeMode='contain' />
                <View style={styles.flexOneCol}>
                  <Text allowFontScaling style={styles.robotoBoldSquas}>SALDO</Text>
                  <Text allowFontScaling style={styles.robotoRegSlate}>{saldo}</Text>
                </View>
                <View style={{borderLeftWidth: 0.5, borderLeftColor: Colors.black_15, height: ratioHeight(30)}} />
                <TouchableOpacity onPress={() => navigation.navigate('BalanceTopUp')}>
                  <View style={styles.btnIsiSaldo}>
                    <Image style={{ width: ratioWidth(10), height: ratioHeight(10) }} source={Images.ic_plus} resizeMode={'stretch'} />
                    <Text style={styles.textIsiSaldo}>
                      SALDO
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>  
          </View>
          <View style={[{backgroundColor: Colors.white_two}]}>
            {this.renderMenu(Images.ic_status_kios, 'Status Kios', 1, false, 10)}
            {/* {this.renderMenu(Images.ic_pin, 'Pengaturan PIN', 1, true, 0.8, () => this.navigate('PinAccount'))} */}
            {this.renderMenu(Images.ic_pin, 'Pengaturan Keamanan', 1, true, 0.8, () => this.navigate('SettingAccount'))}
            
            {this.renderMenu(Images.ic_printer_Active, 'Pengaturan Printer', 0, true, 0.8, () => this.navigate('Profile'))}
          </View>
          <View style={[{ backgroundColor: Colors.white_two, marginTop: ratioHeight(10) }]}>
            {this.renderMenu(Images.ic_logout, 'Keluar', 0, true, 0.5, () => this.setState({modalLogout: true}))}
          </View>
          {this.renderFooter()}
        </View>
      )
    } else {
      return <NoLoginTab type='profile' onPress={() => this.login()} />
    }
  }

  login () {
    this.props.navigation.navigate('SignIn')
  }

  render () {
    const { userLogin } = this.state
    let scroll
    if (userLogin) {
      scroll = (
        <ScrollView>
          {this.renderView()}
        </ScrollView>
      )
    } else {
      scroll = (
        <View style={{ flex: 1 }}>
          {this.renderView()}
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        {scroll}
        <LoadingModal size={10} color={Colors.squash} visible={this.state.modalLodaing} />
        {this.modalCloseKios()}
        {this.modalLogout()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logoutProps: state.account.logout.payload,
    profile: state.profile.getProfile.payload,
    balance: state.profile.getBalance.payload,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AccountType.logoutRequest()),
    getProfile: (token) => dispatch(ProfileTypes.getProfileRequest(token)),
    setLogin: (param) => dispatch(loginAction.isLogin(param)),
    setKyc: (param) => dispatch(loginAction.isKyc(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
