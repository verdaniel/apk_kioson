import React from 'react'
import { StackNavigator } from 'react-navigation'
import SaldoTopUp from '../Containers/Balance/SaldoTopUp'
import CategoryHelp from '../Containers/HelpParent/CategoryHelp'
import FormPulsa from '../Containers/Product/FormPulsa'
import FormPaketData from '../Containers/Product/FormPaketData'
import BpjsPaymentConfirmation from '../Containers/Product/BPJS/BpjsPaymentConfirmation'
import BpjsRedirect from '../Containers/Product/BPJS/BpjsRedirect'
import SuccessPurchaseSamsung from '../Containers/Product/Samsung/SuccessPurchaseSamsung'
import PaymentConfirmationSamsung from '../Containers/Product/Samsung/PaymentConfirmationSamsung'
import RecipientDetails from '../Containers/Product/Samsung/RecipientDetails'
import ProductDetail from '../Containers/Product/Samsung/ProductDetail'
import ShoppingCart from '../Containers/Product/Samsung/ShoppingCart'
import Samsung from '../Containers/Product/Samsung/Samsung'
import PriecList from '../Containers/Product/Samsung/PriecList'
import LoanBalance from '../Containers/Loan/LoanBalance'
import LoanGadget from '../Containers/Loan/LoanGadget'
import LoanIncreaseLimitPhotoUpload from '../Containers/Loan/LoanIncreaseLimitPhotoUpload'
import LoanDetail from '../Containers/Loan/LoanDetail'
import LoanRegisterDanamas from '../Containers/Loan/LoanRegisterDanamas'
import HelpForm from '../Containers/HelpParent/HelpForm'
import SearchPage from '../Containers/HelpParent/SearchPage'
import ContactUs from '../Containers/HelpParent/ContactUs'
import AboutKioson from '../Containers/HelpParent/AboutKioson'
import Help from '../Containers/HelpParent/Help'
import LoanHistory from '../Containers/Loan/LoanHistory'
import LoanRepayment from '../Containers/Loan/LoanRepayment'
import LoanConfirmation from '../Containers/Loan/LoanConfirmation'
import LoanRegister from '../Containers/Loan/LoanRegister'
import PostpaidPayment from '../Containers/Product/PostpaidPayment'
import MenuBoardbandTv from '../Containers/Product/BroadbandTV/MenuBoardbandTv'
import LoanIncreaseLimit from '../Containers/Loan/LoanIncreaseLimit'
import LoanProfileConfirmation from '../Containers/Loan/LoanProfileConfirmation'
import LoanProfile from '../Containers/Loan/LoanProfile'
import LoanDashboard from '../Containers/Loan/LoanDashboard'
import BpjsPayment from '../Containers/Product/BPJS/BpjsPayment'
import RefundList from '../Containers/Refund/RefundList'
import I18n from '../I18n'
import ForgetPassword from '../Containers/UserLogin/ForgetPassword'
import ReferralAgencies from '../Containers/Account/ReferralAgencies'
import KiosonPaySuccess from '../Containers/KiosonPay/KiosonPaySuccess'
import KiosonPayConfirmation from '../Containers/KiosonPay/KiosonPayConfirmation'
import KiosonPay from '../Containers/KiosonPay/KiosonPay'
import InstallmentPayment from '../Containers/Product/InstallmentPayment'
import TelkomPayment from '../Containers/Product/TelkomPayment'
import KAIPayment from '../Containers/Product/KAIPayment'
import PDAMPayment from '../Containers/Product/PDAMPayment'

import SuccessPaymentTrasferMoney from '../Containers/Product/TransferMoney/SuccessPaymentTrasferMoney'
import PaymentConfirmationTransferMoney from '../Containers/Product/TransferMoney/PaymentConfirmationTransferMoney'
import TransferMoney from '../Containers/Product/TransferMoney/TransferMoney'

import TransferSaldo from '../Containers/Product/TransferSaldo/TransferSaldo'
import ConfirmationTransferSaldo from '../Containers/Product/TransferSaldo/ConfirmationTransferSaldo'
import SuccesTransferSaldo from '../Containers/Product/TransferSaldo/SuccesTransferSaldo'

import PlnPrePaid from '../Containers/Product/PLN/PlnPrePaid'
import PlnPostPaid from '../Containers/Product/PLN/PlnPostPaid'
import Pln from '../Containers/Product/PLN/Pln'

import Profile from '../Containers/Account/Profile'
import ChangePin from '../Containers/Account/ChangePin'
import NewsPromoDetail from '../Containers/NewsPromoDetail'
import NewsInfoDetail from '../Containers/NewsInfoDetail'
import NewsPromo from '../Containers/NewsPromo'
import NewsInfo from '../Containers/NewsInfo'
import CreatePin from '../Containers/Account/CreatePin'
import PinAccount from '../Containers/Account/PinAccount'
import SettingAccount from '../Containers/Account/SettingAccount'
import SettingSecurityQuestion from '../Containers/Account/SettingSecurityQuestion'
import SeeSecurityQuestion from '../Containers/Account/SeeSecurityQuestion'
import ChangeSecurityQuestion from '../Containers/Account/ChangeSecurityQuestion'
import ListPrinter from '../Containers/Account/ListPrinter'
import BalanceTransferCanvaserConfirmation from '../Containers/Balance/BalanceTransferCanvaserConfirmation'
import BalanceTransferBankConfirmation from '../Containers/Balance/BalanceTransferBankConfirmation'
import HistorySearch from '../Containers/HistorySearch'
import HistorySaldo from '../Containers/HistorySaldo'
import HistoryTransaction from '../Containers/HistoryTransaction'
import BalanceTransferBankThankPage from '../Containers/Balance/BalanceTransferBankThankPage'
import BalancePaymentMethod from '../Containers/Balance/BalancePaymentMethod'
import BalanceTopUp from '../Containers/Balance/BalanceTopUp'
import Cameras from '../Containers/Cameras'
import Geolokasi from '../Containers/Geolokasi'
import TopUpChip from '../Containers/Product/TopUpChip'
import VoucherGame from '../Containers/Product/VoucherGame'
import SuccessPurchase from '../Containers/SuccessPurchase'
import PaymentConfirmation from '../Containers/PaymentConfirmation'
import SignUpVerificationReminder from '../Containers/UserLogin/SignUpVerificationReminder'
import SignUpVerification from '../Containers/UserLogin/SignUpVerification'
import SignUp from '../Containers/UserLogin/SignUp'
import SignIn from '../Containers/UserLogin/SignIn'
import Splash from '../Containers/Splash'
import GateScreen from '../Containers/GateScreen'
import OnBoarding from '../Containers/OnBoarding'
import CompleteData from '../Containers/CompleteData'
import BottomNav from './BottomBarNavigation'
import Header from '../Components/Header'
import HeaderNavBar from '../Components/HeaderNavBar'
import getSlideFromRightTransition from '../Transforms/TransitionScreen'
import Images from '../Themes/Images'
import Colors from '../Themes/Colors'
//searchbox
import SearchBox from '../Components/SearchBox'

// Styles
// import styles from './Styles/NavigationStyles'

var trueString = true

const PrimaryNav = StackNavigator({
  CategoryHelp: { screen: CategoryHelp,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('b_help')} navigation={navigation} />
    })
  },
  FormPulsa: {
    screen: FormPulsa,
    navigationOptions: ({navigation}) => ({
      header: <Header
        title='Pulsa'
        navigation={navigation}
        rightVisible={trueString}
        iconRight={Images.ic_pricelist}
        actions={'PriecList'}
        params={navigation.state.params}
         />
    })
  },
  FormPaketData: {
    screen: FormPaketData,
    navigationOptions: ({navigation}) => ({
      header: <Header
        title='Paket Data'
        navigation={navigation}
        rightVisible={trueString}
        iconRight={Images.ic_pricelist}
        actions={'PriecList'}
        params={navigation.state.params}
         />
    })
  },
  BpjsPaymentConfirmation: { screen: BpjsPaymentConfirmation,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Konfirmasi Pembayaran' navigation={navigation} />
    })
  },
  BpjsRedirect: { screen: BpjsRedirect,
    navigationOptions: ({navigation}) => ({
      header: <Header title='BPJS Kesehatan' navigation={navigation} />
    })
  },
  SuccessPurchaseSamsung: { screen: SuccessPurchaseSamsung,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  PaymentConfirmationSamsung: { screen: PaymentConfirmationSamsung,
    navigationOptions: ({navigation}) => ({
      header: <Header title={'Konfirmasi Pembayaran'} navigation={navigation} />
    })
  },
  RecipientDetails: { screen: RecipientDetails,
    navigationOptions: ({navigation}) => ({
      header: <Header title={'Detail Penerima'} navigation={navigation} />
    })
  },
  ProductDetail: { screen: ProductDetail,
    navigationOptions: ({navigation}) => ({
      header: <Header
        title='Detail Produk'
        navigation={navigation}
        rightVisible={trueString}
        iconRight={Images.ic_chart}
        actions={'ShoppingCart'}
        isNotifVisible={trueString}
        countNotif={'22'}
        params={navigation.state.params}
         />
    })
  },
  ShoppingCart: { screen: ShoppingCart,
    navigationOptions: ({navigation}) => ({
      header: <Header title={'Keranjang'} navigation={navigation} />
    })
  },
  Samsung: { screen: Samsung,
    navigationOptions: ({navigation}) => ({
      header: <Header
        title='Samsung'
        navigation={navigation}
        rightVisible={trueString}
        iconRight={Images.ic_chart}
        actions={'ShoppingCart'}
        isNotifVisible={trueString}
        countNotif={'26'}
        params={navigation.state.params}
         />
    })
  },
  LoanBalance: {
    screen: LoanBalance,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_loanbalance')} navigation={navigation} />
    })
  },
  LoanGadget: {
    screen: LoanGadget,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_loangadget')} navigation={navigation} />
    })
  },
  LoanIncreaseLimitPhotoUpload: {
    screen: LoanIncreaseLimitPhotoUpload,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_uploadfamilycard')} navigation={navigation} />
    })
  },
  LoanDetail: {
    screen: LoanDetail,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_detailloan')} navigation={navigation} />
    })
  },
  LoanRegisterDanamas: {
    screen: LoanRegisterDanamas,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  PriecList: { screen: PriecList,
    navigationOptions: ({navigation}) => ({
      header: <Header
        title={I18n.t('b_pricelist')}
        bgColor={Colors.white_two}
        navigation={navigation}
        titleColor={Colors.slate_grey}
        iconLeft={Images.ic_close_camera}
        elevation={3}
        />
    })
  },
  HelpForm: { screen: HelpForm,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('b_help')} navigation={navigation} />
    })
  },
  SearchPage: { screen: SearchPage,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('b_help')} navigation={navigation} />
    })
  },
  ContactUs: { screen: ContactUs,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_callus')} navigation={navigation} />
    })
  },
  AboutKioson: { screen: AboutKioson,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_aboutkioson')} navigation={navigation} />
    })
  },
  Help: { screen: Help,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('b_help')} navigation={navigation} />
    })
  },
  LoanHistory: {
    screen: LoanHistory,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_allloan')} navigation={navigation} />
    })
  },
  LoanRepayment: {
    screen: LoanRepayment,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_confirmationrepayment')} navigation={navigation} />
    })
  },
  LoanConfirmation: {
    screen: LoanConfirmation,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_loanconfirmation')} navigation={navigation} />
    })
  },
  LoanRegister: {
    screen: LoanRegister,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_titleloanregister')} navigation={navigation} />
    })
  },
  PostpaidPayment: {
    screen: PostpaidPayment,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Pascabayar' navigation={navigation} />
    })
  },
  MenuBoardbandTv: {
    screen: MenuBoardbandTv,
    navigationOptions: ({navigation}) => ({
      header: <Header title='TV Kabel & Internet' navigation={navigation} />
    })
  },
  LoanIncreaseLimit: {
    screen: LoanIncreaseLimit,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  LoanProfileConfirmation: {
    screen: LoanProfileConfirmation,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  LoanProfile: {
    screen: LoanProfile,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('l_titleLoan')} navigation={navigation} />
    })
  },
  LoanDashboard: {
    screen: LoanDashboard,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  BpjsPayment: {
    screen: BpjsPayment,
    navigationOptions: ({navigation}) => ({
      header: <Header title='BPJS Kesehatan' navigation={navigation} />
    })
  },
  RefundList: {
    screen: RefundList,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_refundlist')} navigation={navigation} />
    })
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: ({navigation}) => ({
      header: <Header title={I18n.t('t_forgetpassword')} navigation={navigation} />
    })
  },
  ReferralAgencies: {
    screen: ReferralAgencies,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Konfirmasi Pembayaran' navigation={navigation} />
    })
  },
  KiosonPaySuccess: {
    screen: KiosonPaySuccess,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  KiosonPayConfirmation:
  { screen: KiosonPayConfirmation,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Konfirmasi Pembayaran' navigation={navigation} />
    })
  },
  KiosonPay:
  {
    screen: KiosonPay,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Kioson Pay' navigation={navigation} />
    })
  },
  InstallmentPayment: {
    screen: InstallmentPayment,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Bayar Angsuran' navigation={navigation} />
    })
  },
  TelkomPayment: {
    screen: TelkomPayment,
    key: 'TelkomPayment',
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Telkom' navigation={navigation} />
    })
  },
  KAIPayment: {
    screen: KAIPayment,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Kereta Api' navigation={navigation} />
    })
  },
  PlnPascaBayar: { screen: PlnPrePaid },
  PlnPraBayar: { screen: PlnPostPaid },
  Pln: {
    screen: Pln,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Listrik PLN' navigation={navigation} />
    })
  },
  PDAMPayment: {
    screen: PDAMPayment,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Air PDAM' navigation={navigation} />
    })
  },
  SuccessPaymentTrasferMoney: {
    screen: SuccessPaymentTrasferMoney,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  PaymentConfirmationTransferMoney: {
    screen: PaymentConfirmationTransferMoney,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Konfirmasi Pembayaran' navigation={navigation} />
    })
  },
  TransferMoney: { screen: TransferMoney,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Transfer Uang' navigation={navigation} />
    })
  },
  TransferSaldo: { screen: TransferSaldo,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Transfer Saldo' navigation={navigation} />
    })
  },
  ConfirmationTransferSaldo: { screen: ConfirmationTransferSaldo,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Konfirmasi Transfer' navigation={navigation} />
    })
  },
  SuccesTransferSaldo: { screen: SuccesTransferSaldo,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Profile: { screen: Profile,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Profil Anda' navigation={navigation} />
    })
  },
  ChangePin: { screen: ChangePin,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Ganti PIN' navigation={navigation} />
    })
  },
  NewsPromoDetail: { screen: NewsPromoDetail,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Promo' navigation={navigation} />
    })
  },
  NewsInfoDetail: { screen: NewsInfoDetail,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Informasi' navigation={navigation} />
    })
  },
  NewsPromo: { screen: NewsPromo },
  NewsInfo: { screen: NewsInfo },
  CreatePin: { screen: CreatePin,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Atur PIN Baru' navigation={navigation} />
    })
  },
  PinAccount: {
    screen: PinAccount,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Pengaturan PIN' navigation={navigation} />
    }) },

  SettingAccount: {
      screen: SettingAccount,
      navigationOptions: ({ navigation }) => ({
        header: <Header title='Pengaturan Keamanan' navigation={navigation} />
      }) },

  SettingSecurityQuestion: {
      screen: SettingSecurityQuestion,
      navigationOptions: ({ navigation }) => ({
        header: <Header title='Pengaturan Pertanyaan Keamanan' navigation={navigation} />
      }) },

  ChangeSecurityQuestion: {
      screen: ChangeSecurityQuestion,
      navigationOptions: ({ navigation }) => ({
        header: <Header title='Ganti Pertanyaan Keamanan' navigation={navigation} />
      }) },

  SeeSecurityQuestion: {
      screen: SeeSecurityQuestion,
      navigationOptions: ({ navigation }) => ({
        header: <Header title='Lihat Pertanyaan Keamanan' navigation={navigation} />
      }) },      




  ListPrinter: {
    screen: ListPrinter,
    navigationOptions: ({ navigation }) => ({
      header: <Header title='Printer Bluetooth' navigation={navigation} />
    })
  },
  BalanceTransferCanvaserConfirmation: { screen: BalanceTransferCanvaserConfirmation, navigationOptions: { header: null } },
  BalanceTransferBankConfirmation: { screen: BalanceTransferBankConfirmation, navigationOptions: { header: null } },
  HistorySearch: { screen: HistorySearch, navigationOptions: { header: null } },
  HistorySaldo: { screen: HistorySaldo },
  HistoryTransaction: { screen: HistoryTransaction },
  BalanceTransferBankThankPage: { screen: BalanceTransferBankThankPage, navigationOptions: { header: null } },
  BalancePaymentMethod: { screen: BalancePaymentMethod, navigationOptions: { header: null } },
  BalanceTopUp: { screen: BalanceTopUp, navigationOptions: { header: null } },
  SaldoTopUp: { screen: SaldoTopUp, navigationOptions: { header: null } },
  Cameras: { screen: Cameras, navigationOptions: { header: null } },
  TopUpChip: {
    screen: TopUpChip,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Top Up Chip' navigation={navigation} />
    })
  },
  VoucherGame: {
    screen: VoucherGame,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Voucher Game' navigation={navigation} />
    })
  },
  SuccessPurchase: {
    screen: SuccessPurchase,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  SignUpVerificationReminder: { screen: SignUpVerificationReminder, navigationOptions: { header: null } },
  SignUp: { screen: SignUpVerification, navigationOptions: { header: null } }, // dari Sign Up Verification di rename jadi Sign Up
  SignUpForm: { screen: SignUp, navigationOptions: { header: null } }, // dari Sign Up di rename jadi Sign Up Form
  SignIn: { screen: SignIn, navigationOptions: { header: null } },
  Splash: { screen: Splash, navigationOptions: { header: null } },
  GateScreen: { screen: GateScreen, navigationOptions: { header: null } },
  OnBoarding: { screen: OnBoarding, navigationOptions: { header: null } },
  BottomNav: {
    key: 'BottomNav',
    screen: BottomNav,
    navigationOptions: ({navigation}) => ({
      header: <HeaderNavBar navigation={navigation} />
    })
  },
  CompleteData: {
    screen: CompleteData,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Verifikasi Data' navigation={navigation} />
    })
  },
  PaymentConfirmation: {
    screen: PaymentConfirmation,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Konfirmasi Pembayaran' navigation={navigation} />
    })
  },
  Geolokasi: {
    screen: Geolokasi,
    navigationOptions: ({navigation}) => ({
      header: <Header title='Geolokasi' navigation={navigation} />
    })
  }
}, {
  headerMode: 'screen',
  initialRouteName: 'Splash',
  transitionConfig: getSlideFromRightTransition
})

export default PrimaryNav
