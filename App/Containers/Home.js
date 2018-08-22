import React, { Component } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  StatusBar,
  FlatList,
  AsyncStorage
} from 'react-native'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'
import Button from '../Components/Button'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
// import DeviceInfo from 'react-native-device-info'

// Actions
import appAction from '../Redux/AppVersionRedux'
import errorAction from '../Redux/ErrorRedux'

// Styles
import styles from './Styles/HomeStyle'

const accounting = require('accounting')

class Home extends Component {
  constructor (props) {
    super(props)
    const { navigate } = this.props.navigation
    this.state = {
      modalVerify: false,
      modalOnProcedVerify: false,
      data:
      [
        {title: 'Pulsa', icon: Images.ic_pulsa_new, onPress: () => this.props.dataLogin.login ? navigate('FormPulsa') : navigate('SignIn')},
        {title: 'Paket Data', icon: Images.ic_pulsa, onPress: () => this.props.dataLogin.login ? navigate('FormPaketData') : navigate('SignIn')},
        {title: 'Pascabayar', icon: Images.ic_pascabayar, onPress: () => this.props.dataLogin.login ? navigate('PostpaidPayment') : navigate('SignIn')},
        {title: 'Telkom', icon: Images.ic_telkom, onPress: () => this.props.dataLogin.login ? navigate('TelkomPayment') : navigate('SignIn')},
        {title: 'Internet &\nTV Kabel', icon: Images.ic_internet, onPress: () => this.props.dataLogin.login ? navigate('MenuBoardbandTv') : navigate('SignIn')},
        // {title: 'Kios Online', icon: Images.ic_kios_online, onPress: () => this.props.dataLogin.login ? navigate('') : navigate('SignIn')},
        // {title: 'Kioson Pay', icon: Images.ic_kioson_pay, onPress: () => this.props.dataLogin.login ? navigate('KiosonPay') : navigate('SignIn')},
        // {title: 'Transfer\nUang', icon: Images.ic_transfer, onPress: () => this.props.dataLogin.login ? navigate('TransferMoney') : navigate('SignIn')},
        // {title: 'Pinjaman', icon: Images.ic_pinjaman, onPress: () => this.props.dataLogin.login ? navigate('LoanDashboard') : navigate('SignIn')},
        {title: 'Listrik PLN', icon: Images.ic_pln, onPress: () => this.props.dataLogin.login ? navigate('Pln') : navigate('SignIn')},
        {title: 'Air PDAM', icon: Images.ic_pdam, onPress: () => this.props.dataLogin.login ? navigate('PDAMPayment') : navigate('SignIn')},
        {title: 'BPJS', icon: Images.ic_asuransi, onPress: () => this.props.dataLogin.login ? navigate('BpjsPayment') : navigate('SignIn')},
        {title: 'Angsuran', icon: Images.ic_angsuran, onPress: () => this.props.dataLogin.login ? navigate('InstallmentPayment') : navigate('SignIn')},
        {title: 'Samsung', icon: Images.ic_samsung, onPress: () => this.props.dataLogin.login ? navigate('Samsung') : navigate('SignIn')}
        // {title: 'Pos\nIndonesia', icon: Images.ic_pos, onPress: () => this.props.dataLogin.login ? navigate('') : navigate('SignIn')},
        // {title: 'Kereta Api', icon: Images.ic_kereta_api, onPress: () => this.props.dataLogin.login ? navigate('KAIPayment') : navigate('SignIn')},
        // {title: 'Voucher\nGame', icon: Images.ic_voucher_game, onPress: () => this.props.dataLogin.login ? navigate('VoucherGame') : navigate('SignIn')},
        // {title: 'Top Up Chip', icon: Images.ic_top_up, onPress: () => this.props.dataLogin.login ? navigate('TopUpChip') : navigate('SignIn')},
        // {title: 'Keagenan', icon: Images.ic_gadai, onPress: () => this.props.dataLogin.login ? navigate('') : navigate('SignIn')},
        // {title: 'Laku Pandai', icon: Images.ic_laku_pandai, onPress: () => this.props.dataLogin.login ? navigate('') : navigate('SignIn')}
      ],
      dataPremium:
      [
        {title: 'Transfer\nSaldo      ', icon: Images.ic_transfer_saldo, onPress: () => this.props.dataLogin.login ? navigate('TransferSaldo') : navigate('SignIn')},
        {title: 'Transfer\nUang        ', icon: Images.ic_transfer, onPress: () => this.props.dataLogin.login ? navigate('TransferMoney') : navigate('SignIn')},
        {title: 'Pinjaman', icon: Images.ic_pinjaman, onPress: () => this.props.dataLogin.login ? navigate('LoanDashboard') : navigate('SignIn')}
      ],
      index: 0,
      saldo: 0,
      userLogin: this.props.dataLogin.login,
      slider: this.props.banner === null ? [] : this.props.banner.data,
      showModal: false,
      swiperVisible: false,
      userKyc: this.props.dataLogin.kyc
    }
  }

  componentWillMount () {
    const { userKyc, userLogin } = this.state
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.getDataVersion(value)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { banner, dataLogin, balance } = nextProps
    if (banner) {
      if (banner.code === 200 && banner.status) {
        this.setState({ slider: banner.data })
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
    if (balance) {
      if (balance.code === 200 && balance.status) {
        this.setState({ saldo: balance.data.total_sales })
      }
    }
  }

  async componentDidMount () {
    SplashScreen.hide()
    const mode = await AsyncStorage.getItem('devmode')
    this.setState({
      mode: mode
    })
    setTimeout(() => { this.setState({swiperVisible: true}) }, 0)
    // this.props.errorAction(true)
    // const version = DeviceInfo.getVersion()
  }

  static navigationOptions = {
    tabBarLabel: ({ focused, tintColor }) => (
      <View style={styles.tabLabel}>
        <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12) }}>
          Beranda
        </Text>
      </View>
    ),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.tabIcon}>
        <Image source={Images.ic_beranda} style={{ width: ratioWidth(24), height: ratioWidth(24), tintColor: tintColor }} resizeMode={'contain'} />
      </View>
    )
  }

  onTanyaClick () {
  }

  navigate (route) {
    const navigate = NavigationActions.navigate({
      routeName: route,
      params: {},
      action: NavigationActions.navigate({ routeName: route })
    })
    this.props.navigation.dispatch(navigate)
  }

  onPressVerification () {
    this.props.navigation.navigate('CompleteData')
    this.setState({ modalVerify: false })
  }

  onBannerClick (value) {
    const { navigate } = this.props.navigation
    navigate('NewsPromoDetail', {
      title: 'Promo Banner',
      image: value.image,
      date: '1 Februari 2018',
      desc: 'Content banner'
    })
  }

  /* renderSaldo () {
    const saldo = accounting.formatMoney(this.state.saldo, 'Rp', '0', '.', '0', '%s %v')
    return (
      <View style={styles.viewSaldo}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.textTop} >
                  SALDO
                </Text>
                <Text style={styles.textBottom} numberOfLines={1}>
                  {saldo}
                </Text>
              </View>
              <Button
                onPress={() => this.props.navigation.navigate('BalanceTopUp')}
                style={styles.btnHeader}
                textStyle={styles.textBtnHeader}
                text={'ISI SALDO'} />
            </View>
          </View>
          <View style={{ width: ratioWidth(0.5), backgroundColor: Colors.black_15, marginLeft: ratioWidth(8), marginRight: ratioWidth(8) }} />
          <View style={{ flex: 1, alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.textTop} >
                  INFO
                </Text>
                <Text style={styles.textBottom} numberOfLines={1}>
                  PINJAMAN
                </Text>
              </View>
              <Button
                onPress={() => this.onPressVerification()}
                style={styles.btnHeader}
                textStyle={styles.textBtnHeader}
                text={'CEK DISINI'} />
            </View>
          </View>
        </View>
      </View>
    )
  } */

  renderNotLogin () {
    return (
      <View style={[styles.viewSaldo, { height: ratioHeight(52), alignItems: 'center', backgroundColor: Colors.squash, paddingHorizontal: ratioWidth(25) }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Button
              style={[styles.button, { marginRight: ratioWidth(5), backgroundColor: Colors.squash, borderWidth: moderateScale(1), borderColor: Colors.white_two }]}
              textStyle={{ color: Colors.white_two, fontFamily: Fonts.type.productSansBold, fontSize: moderateScale(12) }}
              text={'MASUK'}
              onPress={() => this.navigate('SignIn')} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              style={[styles.button, { marginLeft: ratioWidth(5), backgroundColor: Colors.white_two, borderWidth: moderateScale(1), borderColor: Colors.white_two }]}
              textStyle={{ color: Colors.squash, fontFamily: Fonts.type.productSansBold, fontSize: moderateScale(12) }}
              text={'DAFTAR'}
              onPress={() => this.navigate('SignUp')} />
          </View>
        </View>
      </View>
    )
  }

  renderSaldo () {
    const saldo = accounting.formatMoney(this.state.saldo, 'Rp', '0', '.', '0', '%s %v')
    const { userKyc } = this.state
    if (userKyc) {
      return (
        <View style={styles.viewSaldoNew}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('BalanceTopUp')}>
              <Image style={{ width: ratioWidth(24), height: ratioHeight(20.8), marginTop: ratioHeight(5) }} source={Images.ic_isi_saldo_new} resizeMode={'stretch'} />
              <View style={{ flex: 1, marginHorizontal: ratioWidth(8), width: ratioWidth(100) }}>
                <Text style={[styles.textTop, { fontSize: moderateScale(10) }]} >
                  KIOSTUNAI
                </Text>
                <Text style={[styles.textBottom, { width: ratioWidth(200), fontSize: moderateScale(14) }]} numberOfLines={1}>
                  {saldo}
                </Text>
              </View>
              <Image style={{ width: ratioWidth(10), height: ratioWidth(10), marginTop: ratioHeight(10), marginRight: ratioWidth(12) }} source={Images.ic_plus} resizeMode={'stretch'} />
            </TouchableOpacity>
            <View style={{ width: ratioWidth(1), height: ratioHeight(32), backgroundColor: Colors.black_15 }} />
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('SaldoTopUp')}>
              <Image style={{ width: ratioWidth(24), height: ratioHeight(20.8), marginTop: ratioWidth(5), marginLeft: ratioWidth(8) }} source={Images.ic_saldo_kyc} resizeMode={'stretch'} />
              <View style={{ flex: 1, marginHorizontal: ratioWidth(8) }}>
                <Text style={[styles.textTop, { fontSize: moderateScale(10) }]} >
                  SALDO
                </Text>
                <Text style={[styles.textBottom, { width: ratioWidth(200), fontSize: moderateScale(14) }]} numberOfLines={1}>
                  {saldo}
                </Text>
              </View>
              <Image style={{ width: ratioWidth(10), height: ratioWidth(10), marginTop: ratioHeight(10) }} source={Images.ic_plus} resizeMode={'stretch'} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.viewSaldoNew}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: ratioWidth(32), height: ratioHeight(24) }} source={Images.ic_isi_saldo_new} resizeMode={'stretch'} />
            <View style={{ flex: 1, marginHorizontal: ratioWidth(15) }}>
              <Text style={[styles.textTop, { fontSize: moderateScale(12) }]} >
                KIOSTUNAI
              </Text>
              <Text style={[styles.textBottom, { width: ratioWidth(200), fontSize: moderateScale(16) }]} numberOfLines={1}>
                {saldo}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BalanceTopUp')}>
              <View style={styles.btnIsiSaldo}>
                <Text style={styles.textIsiSaldo}>
                  Top Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderVerification () {
    return (
      <View style={styles.modalBackView}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.imgClose} onPress={() => this.setState({ modalVerify: false })}>
            <Image style={{ height: ratioWidth(24), width: ratioWidth(24) }} source={Images.closeBlue} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{width: ratioWidth(190), height: ratioHeight(190), alignItems: 'center', justifyContent: 'center'}}>
            <Image source={Images.kycVerify} style={{width: ratioWidth(134), height: ratioHeight(146)}} resizeMode={'contain'} />
          </View>
          <Text allowFontScaling style={[styles.textModal, { fontFamily: Fonts.type.robotoRegular }]}>
            {'Verifikasi data Anda untuk mendapatkan\nakses produk selengkapnya'}
          </Text>
          <Button
            onPress={() => this.onPressVerification()}
            style={styles.btnModal}
            textStyle={{ color: Colors.white_two, fontFamily: Fonts.type.productSansBold, fontSize: moderateScale(14) }}
            text={'Verifikasi Data'} />
        </View>
      </View>
    )
  }

  renderOnProcedVerification () {
    return (
      <View style={styles.modalBackView}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.imgClose} onPress={() => this.setState({ modalOnProcedVerify: false })}>
            <Image style={{ height: ratioWidth(24), width: ratioWidth(24) }} source={Images.closeBlue} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{width: ratioWidth(190), height: ratioHeight(190), alignItems: 'center', justifyContent: 'center'}}>
            <Image source={Images.kycOnProcedVerify} style={{width: ratioWidth(134), height: ratioHeight(146)}} resizeMode={'contain'} />
          </View>
          <Text allowFontScaling style={[styles.textModal, { fontFamily: Fonts.type.robotoRegular }]}>
            {'Verifikasi data Anda sedang\ndalam proses'}
          </Text>
          <Button
            onPress={() => this.setState({ modalOnProcedVerify: false })}
            style={styles.btnModal}
            textStyle={{ color: Colors.white_two, fontFamily: Fonts.type.productSansBold, fontSize: moderateScale(14) }}
            text={'OK'} />
        </View>
      </View>
    )
  }

  renderItem = (data) => {
    const item = data.item
    // const index = data.index
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item.onPress}>
        {/* style={{ borderBottomWidth: index < 16 ? ratioHeight(1) : 0, borderColor: Colors.white, alignItems: 'center', justifyContent: 'center' }}> */}
        <View style={[styles.viewIcon, { flexDirection: 'row' }]}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={[styles.imgIcon, { marginTop: ratioHeight(12), alignSelf: 'center', justifyContent: 'space-around' }]} source={item.icon} resizeMode={'contain'} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={[styles.textIcon, { marginTop: ratioHeight(6) }]}>
                {item.title.toUpperCase()}
              </Text>
            </View>
          </View>
          {/* {index % 4 < 3 ? <View style={{ width: ratioWidth(1), height: ratioHeight(40), backgroundColor: Colors.white }} /> : <View />} */}
        </View>
      </TouchableOpacity>
    )
  }

  renderItemPremium = (data) => {
    const item = data.item
    const index = data.index
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item.onPress}
        style={{ marginLeft: index === 0 ? ratioWidth(15) : 0, marginRight: index === 2 ? ratioWidth(5) : 0, paddingVertical: ratioHeight(5) }}>
        <View style={styles.viewPremium}>
          <Image style={styles.imgIcon} source={item.icon} resizeMode={'contain'} />
          <Text style={[styles.textIcon, { marginLeft: ratioWidth(15) }]}>
            {item.title.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderPagination = (index, total) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={styles.paginationText}>
          <Text style={styles.paginationTextNormal}>{index + 1}</Text>/{total}
        </Text>
      </View>
    )
  }

  renderPremium () {
    return (
      <View>
        <Text style={[styles.textBottom, { marginTop: ratioHeight(15), paddingHorizontal: ratioWidth(15), width: Metrics.screenWidth }]}>
          Produk Premium
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginTop: ratioHeight(10), marginBottom: ratioHeight(25) }}
          data={this.state.dataPremium}
          renderItem={this.renderItemPremium}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white_two} />
        <ScrollView style={styles.viewContainer} stickyHeaderIndices={[1]}>
          {this.state.swiperVisible &&
          <Swiper
            scrollEnabled
            width={Metrics.screenWidth}
            height={ratioHeight(150)}
            autoPlayTimeout={1000}
            autoplay
            onIndexChanged={value => this.setState({ index: value })}
            renderPagination={this.renderPagination}>
            {this.state.slider.map((value, index) => {
              return (
                <TouchableOpacity key={index} style={styles.banner} onPress={() => this.onBannerClick(value)}>
                  <Image style={{ height: ratioHeight(150), width: Metrics.screenWidth }} resizeMode={'cover'} source={{ uri: value.image }} />
                </TouchableOpacity>
              )
            })}
          </Swiper>}
          {this.state.userLogin ? this.renderSaldo() : this.renderNotLogin()}
          <TouchableOpacity style={styles.viewAllPromo} onPress={() => this.props.navigation.navigate('NewsPromo', { from: 'Home' })}>
            <Text style={styles.paginationText}>
              Semua Promo
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, marginBottom: ratioHeight(2) }}>
            <FlatList
              style={styles.listContainer}
              contentContainerStyle={{ justifyContent: 'flex-start' }}
              data={this.state.data}
              renderItem={this.renderItem}
              numColumns={4}
            />
          </View>
          <View style={{ height: ratioHeight(10), backgroundColor: Colors.white }} />
          {this.state.userLogin && this.renderPremium()}
          <Modal
            animationType={'fade'}
            transparent
            visible={this.state.modalVerify}
            onRequestClose={() => { this.setState({modalVerify: false}) }}>
            {this.renderVerification()}
          </Modal>
          <Modal
            animationType={'fade'}
            transparent
            visible={this.state.modalOnProcedVerify}
            onRequestClose={() => { this.setState({modalOnProcedVerify: false}) }}>
            {this.renderOnProcedVerification()}
          </Modal>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.profile.getBalance.payload,
    // dataVersion: state.version.payload,
    dataLogin: state.login,
    banner: state.banner.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataVersion: (token) => dispatch(appAction.appVersionRequest(token)),
    errorAction: (param) => dispatch(errorAction.setError(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
