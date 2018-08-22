import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Fonts } from '../Themes/index'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import Button from '../Components/Button'
import HistorySearch from '../Containers/HistorySearch'
import NoLoginTab from '../Components/NoLoginTab'
import NoContentTab from '../Components/NoContentTab'
import ErrorNetwork from '../Components/ErrorNetwork'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Loading from '../Components/Loading'

// Actions
import BluetoothActions from '../Redux/BluetoothRedux'
import HistoryActions from '../Redux/HistoryRedux'

// Styles
import styles from './Styles/HistoryTransactionStyle'

const moment = require('moment')
const accounting = require('accounting')

class HistoryTransaction extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      print: '*************KIOSON*************~*********www.kioson.com*********~ID KCP       :R82T~--------------------------------~STRUK PEMBELIAN PULSA XL ~--------------------------------~TANGGAL     :2017-12-07 14:12:14~ID Pesanan       :113X67CQ~Operator         :XL~Nomer Handphone  :0818457475~Nilai Transaksi  :Rp.6.500~--------------------------------~Terima kasih telah bertransaksi di kioson~Untuk informasi lebih lanjut~silahkan hubungi~XL:0818-0721-8383~Indosat:0857-7625-8383~3 Three:0899-983-8383~Telkomsel:0812-9556-8383~================================~*********www.kioson.com**********~',
      errorNetwork: false,
      isRefreshing: false,
      isLoading: false,
      isLogin: this.props.dataLogin.login,
      showSearch: false,
      showEmpty: false,
      page: 1,
      data: [],
      requestType: 'firstLoad',
      search: { toDate: new Date().getTime(), fromDate: new Date().getTime(), dateStr: '', product: 'Semua Produk', status: 'Semua Status', phone: '', orderID: '' }
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || typeof value === 'undefined' || value === '') {
        this.setState({ isLogin: false })
      } else {
        this.setState({ token: value, isLogin: true })
        if (this.props.transaction === null) this.props.getTransaction(value, 1, 10, new Date().getTime(), new Date().getTime())
        else {
          if (this.props.transaction.data.length > 0) this.setState({ page: 1, data: this.props.transaction.data })
          else this.setState({ showEmpty: true })
        }
      }
    })
  }

  componentWillReceiveProps (newProps) {
    const { requestType, isLogin } = this.state
    const { transaction } = newProps
    if (requestType === 'firstLoad') {
      if (isLogin) {
        if (transaction) {
          if (transaction.code === 200 && transaction.status) {
            if (transaction.data.length > 0) this.setState({ page: 1, data: transaction.data })
            else this.setState({ showEmpty: true })
          } else if (transaction.code) {
            console.tron.warn(transaction.code)
          } else {
            this.setState({ errorNetwork: true })
          }
        }
      }
    } else if (requestType === 'print') {
      if (newProps.device) {
        this.setState({ isLoading: false })
        BluetoothSerial.printToDevice(this.state.print).then((res) => console.tron.warn(res))
      }
    }
  }

  onTransactionRefresh () {
  }

  onTransactionLoadMore () {
  }

  onNavigationBuy (item) {
    console.tron.warn(item)
    switch (item.type) {
      case 'recharge-mobile' :
        this.props.navigation.navigate('FormPulsa', {item})
        break
      case 'recharge-mobile-data' :
        this.props.navigation.navigate('FormPaketData', {item})
        break
      case 'postpaid' :
        this.props.navigation.navigate('PostpaidPayment', {item})
        break
      case 'media' :
        this.props.navigation.navigate('MenuBoardbandTv')
        break
      case 'pay' :
        // this.props.navigation.navigate('Home')
        break
      case 'money-transfer' :
        this.props.navigation.navigate('TransferMoney')
        break
      case 'power-prepaid' :
        this.props.navigation.navigate('Pln', {item})
        break
      case 'power' :
        this.props.navigation.navigate('Pln', {item})
        break
      case 'water' :
        this.props.navigation.navigate('PDAMPayment', {item})
        break
      case 'bpjs' :
        this.props.navigation.navigate('BpjsPayment', {item})
        break
      case 'multifinance' :
        this.props.navigation.navigate('InstallmentPayment', {item})
        break
      case 'game' :
        // this.props.navigation.navigate('Home')
        break
      case 'danamas' :
        // this.props.navigation.navigate('Home')
        break
      default :
        return ''
    }
  }

  searchTransaction = (search, showSearch) => {
    const { token } = this.state
    this.setState({
      search: {
        dateStr: search.dateStr,
        toDate: search.toDate,
        fromDate: search.fromDate,
        product: search.product,
        status: search.status,
        phone: search.phone,
        orderID: search.orderID
      },
      showSearch: showSearch
    })
    this.props.getTransaction(token, 1, 10, search.fromDate, search.toDate)
  }

  validationSearch () {
    const { search } = this.state
    if (search.date !== '' || search.product !== 'Semua Produk' || search.status !== 'Semua Status' || search.phone !== '' || search.orderID !== '') return true
    else return false
  }

  onPrint () {
    BluetoothSerial.isEnabled().then((response) => {
      if (response) {
        this.searchBluetooth()
      } else {
        BluetoothSerial.requestEnable().then((res) => {
          if (res) this.searchBluetooth()
          else ToastAndroid.show('Bluetooth tidak aktif', ToastAndroid.SHORT)
        })
      }
    })
  }

  searchBluetooth () {
    const value = this.props.device
    this.setState({ isLoading: true })
    if (this.props.device) {
      BluetoothSerial.isConnected().then((res) => {
        if (res) BluetoothSerial.printToDevice(this.state.print).then((res) => console.tron.warn(res))
        else {
          BluetoothSerial.connect(value.id).then((response) => {
            if (response.message.includes('Connected')) {
              ToastAndroid.show(`Berhasil menghubung ke perangkat ${value.name}`, ToastAndroid.SHORT)
              this.setState({ requestType: 'print' })
              this.props.connectDevice({ ...value, connected: true })
            } else ToastAndroid.show(`Gagal menghubung ke ${value.name}`, ToastAndroid.SHORT)
          })
        }
      })
    } else this.props.navigation.navigate('ListPrinter')
  }

  transactionType (item) {
    switch (item.type) {
      case 'recharge-mobile' :
      case 'recharge-mobile-data' :
        return Images.ic_pulsa
      case 'postpaid' :
        return Images.ic_pascabayar
      case 'media' :
        return Images.ic_internet
      case 'pay' :
        return Images.ic_kioson_pay
      case 'money-transfer' :
        return Images.ic_transfer
      case 'power-prepaid' :
      case 'power' :
        return Images.ic_pln
      case 'water' :
        return Images.ic_pdam
      case 'bpjs' :
        return Images.ic_bpjs
      case 'multifinance' :
        return Images.ic_angsuran
      case 'game' :
        return Images.ic_voucher_game
      case 'danamas' :
        return Images.ic_pinjaman
      default :
        return ''
    }
  }

  transactionDetail (item) {
    switch (item.type) {
      case 'recharge-mobile' :
      case 'recharge-mobile-data' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'No. Ponsel', detail: item.extra.phone_number },
          { label: 'Harga', detail: accounting.formatMoney(item.amount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
      case 'postpaid' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'No. Ponsel', detail: item.extra.phone_number },
          { label: 'Nama', detail: item.extra.name },
          { label: 'Periode', detail: item.extra.period },
          { label: 'Tagihan', detail: accounting.formatMoney(item.extra.tagihan, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'No. Referensi', detail: item.extra.reference_number }]
      case 'media' :
        var newProduct = item.product.toLowerCase()
        var detail = []
        if (newProduct.includes('aora')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'No. Reff', detail: item.extra.reff_number },
            { label: 'No. SOA', detail: item.extra.soa_number },
            { label: 'Tanggal Siklus', detail: item.extra.cycle_date },
            { label: 'Jatuh Tempo', detail: moment(moment.unix(item.extra.due_date)).format('DD MMM YYYY') },
            { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        } else if (newProduct.includes('indovision')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'Periode', detail: item.extra.period },
            { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        } else if (newProduct.includes('nexmedia')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'No. Reff', detail: item.extra.reff_number },
            { label: 'Paket', detail: item.extra.package },
            { label: 'Jatuh Tempo', detail: moment(moment.unix(item.extra.due_date)).format('DD MMM YYYY') },
            { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        } else if (newProduct.includes('orange')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'No. Reff', detail: item.extra.reff_number },
            { label: 'Denominasi', detail: item.extra.denomination },
            { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        } else if (newProduct.includes('topas')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'No. Reff', detail: item.extra.reff_number },
            { label: 'Periode', detail: item.extra.period },
            { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        }
        return detail
      case 'pay' :
        return [
          { label: 'E-Commerce', detail: item.extra.e_commerce },
          { label: 'Nama Pelanggan', detail: item.extra.name },
          { label: 'Kode Pembayaran', detail: item.extra.payment_code },
          { label: 'Harga', detail: accounting.formatMoney(item.extra.price, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
      case 'money-transfer' :
        return [
          { label: 'Nama Pengirim', detail: item.extra.sender_name },
          { label: 'No. Rekening', detail: item.extra.holder_account_number },
          { label: 'Nominal', detail: accounting.formatMoney(item.extra.nominal, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
      case 'power-prepaid' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'ID Pelanggan', detail: item.extra.customer_id },
          { label: 'Nama Pelanggan', detail: item.extra.name },
          { label: 'Tarif/Daya', detail: item.extra.fare },
          { label: 'Token', detail: item.extra.token },
          { label: 'Kwh', detail: item.extra.kwh },
          { label: 'Harga', detail: accounting.formatMoney(item.extra.price, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'No. Referensi', detail: item.extra.reference_number }]
      case 'power' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'ID Pelanggan', detail: item.extra.customer_id },
          { label: 'Nama Pelanggan', detail: item.extra.name },
          { label: 'Tarif/Daya', detail: item.extra.fare },
          { label: 'Periode', detail: item.extra.period },
          { label: 'Stand Meter', detail: item.extra.stand_meter },
          { label: 'Tagihan', detail: accounting.formatMoney(item.amount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'No. Referensi', detail: item.extra.reference_number }]
      case 'water' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'ID Pelanggan', detail: item.extra.customer_id },
          { label: 'Nama Pelanggan', detail: item.extra.name },
          { label: 'Periode', detail: item.extra.period },
          { label: 'Stand Meter', detail: item.extra.stand_meter },
          { label: 'Tagihan', detail: accounting.formatMoney(item.amount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
      case 'bpjs' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'No. VA', detail: item.extra.va_number },
          { label: 'Nama Pelanggan', detail: item.extra.name },
          { label: 'Jumlah Peserta', detail: item.extra.number_of_participants },
          { label: 'Periode', detail: item.extra.period },
          { label: 'Cabang', detail: item.extra.branch },
          { label: 'Tagihan', detail: accounting.formatMoney(item.extra.bill, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'No. Referensi', detail: item.extra.reference_number }]
      case 'multifinance' :
        newProduct = item.product.toLowerCase()
        if (newProduct.includes('baf')) {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'No. Polisi', detail: item.extra.licence_plate },
            { label: 'Tipe Motor', detail: item.extra.vehicle_type },
            { label: 'Angsuran Ke', detail: item.extra.installment_to },
            { label: 'Tenor', detail: item.extra.tenor },
            { label: 'Jatuh Tempo', detail: item.extra.due_date },
            { label: 'Angsuran Pokok', detail: item.extra.installment_amount },
            { label: 'Pinalti', detail: accounting.formatMoney(item.extra.pinalty, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        } else {
          detail = [
            { label: 'Produk', detail: item.product },
            { label: 'ID Pelanggan', detail: item.extra.customer_id },
            { label: 'Nama Pelanggan', detail: item.extra.name },
            { label: 'ID Reff', detail: item.extra.reff_id },
            { label: 'Angsuran Ke', detail: item.extra.installment_to },
            { label: 'Angsuran Pokok', detail: item.extra.installment_amount },
            { label: 'Pembayaran Minimum', detail: accounting.formatMoney(item.extra.minimum_payment, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Pinalti', detail: accounting.formatMoney(item.extra.pinalty, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Biaya Admin', detail: accounting.formatMoney(item.admin_fee, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
            { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
        }
        return detail
      case 'game' :
        return [
          { label: 'Produk', detail: item.product },
          { label: 'Kode Voucher', detail: item.extra.voucher_code },
          { label: 'Harga', detail: accounting.formatMoney(item.extra.price, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Diskon', detail: accounting.formatMoney(item.discount, 'Rp', '0', '.', '0', '%s %v') },
          { label: 'Total Bayar', detail: accounting.formatMoney(item.amount + item.admin_fee - item.discount, 'Rp', '0', '.', '0', '%s %v') }]
    }
  }

  renderEmpty () {
    return (
      <View style={styles.viewEmpty}>
        <Image style={{ width: ratioWidth(16), height: ratioWidth(16) }} source={Images.icInfo} resizeMode={'stretch'} />
        <Text style={styles.textEmpty}>
          Tidak ada riwayat transaksi.
        </Text>
      </View>
    )
  }

  renderDetail = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textLabel}>
          {item.label}
        </Text>
        <Text style={styles.textDetail}>
          {': '}
        </Text>
        <Text style={[styles.textDetail, { fontFamily: item.label === 'Produk' ? Fonts.type.robotoRegular : Fonts.type.robotoRegular }]}>
          {item.detail}
        </Text>
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    const { data } = this.state
    return (
      <View style={[styles.itemList, { marginBottom: index === data.length - 1 ? ratioHeight(52) : 0 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: ratioWidth(32), width: ratioWidth(32) }} source={this.transactionType(item)} resizeMode={'contain'} />
          <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: ratioWidth(14) }}>
              <Text style={styles.textLabelID}>
                {'No. Pesanan : '}
              </Text>
              <Text style={[styles.textLabelID, {fontFamily: Fonts.type.robotoMedium,}]}>
                {item.order_number}
              </Text>
            </Text>
            <Text style={[styles.textTime, { marginLeft: ratioWidth(14) }]}>
              {`${moment(moment.unix(item.transaction_at)).format('DD MMMM YYYY, HH:mm')} WIB`}
            </Text>
          </View>
          <View style={styles.viewStatus}>
            <Text style={styles.textStatus}>
              {item.status === 'SUCCESS' ? 'BERHASIL' : 'GAGAL'}
            </Text>
          </View>
        </View>
        <View style={{ height: ratioHeight(0.5), backgroundColor: Colors.black_15, marginTop: ratioHeight(11), marginBottom: ratioHeight(10) }} />
        <FlatList
          style={{ flex: 1 }}
          data={this.transactionDetail(item)}
          renderItem={this.renderDetail}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: ratioHeight(15) }}>
          <Button
            style={styles.btnPrint}
            text={'Cetak Bukti'}
            textStyle={styles.textPrint}
            onPress={() => this.onPrint()}
          />
          <Button
            style={styles.btnBuy}
            text={'Beli Lagi'}
            textStyle={styles.textBuy}
            onPress={() => this.onNavigationBuy(item)}
          />
        </View>
        <View style={{ marginTop: ratioHeight(9), backgroundColor: Colors.black_15, height: ratioHeight(0.5) }} />
        <Button
          style={styles.btnBantuan}
          text={'BANTUAN'}
          textStyle={styles.textBantuan}
          onPress={() => this.props.navigation.navigate('Help')}
        />
      </View>
    )
  }

  renderSeparator () {
    return (
      <View style={{ height: ratioHeight(6), backgroundColor: 'transparent' }} />
    )
  }

  renderView () {
    const { isRefreshing, isLogin } = this.state
    if (isLogin) {
      if (this.state.data.length > 0) {
        return (
          <View style={{ flex: 1 }}>
            <Text style={styles.textLastHistory}>
              {this.state.data.length} TRANSAKSI TERAKHIR
            </Text>
            <FlatList
              refreshing={isRefreshing}
              style={styles.list}
              data={this.state.data}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              onEndReachedThreshold={0.25}
              onEndReached={({ distanceFromEnd }) => {
                this.onTransactionLoadMore()
              }}
              onRefresh={() => this.onTransactionRefresh()}
            />
            <TouchableOpacity style={styles.btnSearch} onPress={() => this.setState({ showSearch: true })}>
              <View style={styles.viewSearch}>
                <Image style={{ width: ratioWidth(25), height: ratioWidth(25) }} source={this.validationSearch() ? Images.ic_search_off : Images.ic_search_off} resizeMode={'stretch'} />
              </View>
            </TouchableOpacity>
          </View>
        )
      } else {
        return <NoContentTab type='history' />
      }
    } else {
      return <NoLoginTab type='history' onPress={() => this.props.navigation.navigate('SignIn')} />
    }
  }

  render () {
    const { search, showSearch, errorNetwork, isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        <ErrorNetwork position={'relative'} visible={errorNetwork} onPress={() => this.setState({ errorNetwork: false })} />
        {this.renderView()}
        <Modal
          animationType='fade'
          transparent
          visible={showSearch}
          onRequestClose={() => this.setState({ showSearch: false })}>
          <HistorySearch
            data={search}
            onSearch={(search, showSearch) => this.searchTransaction(search, showSearch)} />
        </Modal>
        <Loading visible={isLoading} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.bluetooth.payload,
    transaction: state.history.transaction.payload,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectDevice: (device) => dispatch(BluetoothActions.connectedDevice(device)),
    getTransaction: (token, page, limit, start, end) => dispatch(HistoryActions.getTransactionRequest(token, page, limit, start, end))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransaction)
