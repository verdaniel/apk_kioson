import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Fonts, Colors } from '../Themes'
import { moderateScale } from '../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import styles from './Styles/PerformStyle'
import WraperChart from '../Components/Chart'
import { convertShortMonthId, maskedMoney } from '../Transforms/LocalConfig'
import { extendMoment } from 'moment-range'
import NoLoginTab from '../Components/NoLoginTab'
import CustomCalendar from '../Components/CustomCalendar'

const moment = require('moment')
const momentRange = extendMoment(moment)

class Perform extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      yPosition: 0
    }
    this.state = {
      isLogin: false,
      modalSort: false,
      dateNow: '08 Okt - 06 Nov 2017',
      textSort: 'Transaksi Terkecil',
      textMonth: '',
      textYear: '',
      listProduct: [
        {id: 0, name: 'Pulsa & Paket Data', totalAmount: 12903000, totalTransaction: 13},
        {id: 1, name: 'Listrik PLN', totalAmount: 6234000, totalTransaction: 30},
        {id: 2, name: 'BPJS', totalAmount: 5200000, totalTransaction: 8},
        {id: 3, name: 'Bayar Angsuran', totalAmount: 4900600, totalTransaction: 20},
        {id: 4, name: 'Voucher Game', totalAmount: 2300000, totalTransaction: 21},
        {id: 5, name: 'Air PDAM', totalAmount: 2300000, totalTransaction: 22},
        {id: 6, name: 'Gadai', totalAmount: 1300000, totalTransaction: 33},
        {id: 7, name: 'Laku Pandai', totalAmount: 2300000, totalTransaction: 17},
        {id: 8, name: 'Voucher Game', totalAmount: 4100000, totalTransaction: 16},
        {id: 9, name: 'Angsuran', totalAmount: 5600000, totalTransaction: 13},
        {id: 10, name: 'Top Up Chip', totalAmount: 16903000, totalTransaction: 12},
        {id: 11, name: 'Pascabayar', totalAmount: 7903000, totalTransaction: 9},
        {id: 12, name: 'Internet & TV Kabel', totalAmount: 12003000, totalTransaction: 5},
        {id: 13, name: 'Transfer Uang', totalAmount: 10903000, totalTransaction: 5},
        {id: 14, name: 'Kereta Api', totalAmount: 10903000, totalTransaction: 14},
        {id: 15, name: 'Bayar Angsuran', totalAmount: 2560000, totalTransaction: 4},
        {id: 16, name: 'Asuransi', totalAmount: 1200000, totalTransaction: 4}
      ],
      data: [
        {x: 0, y: 5},
        {x: 1, y: 18},
        {x: 2, y: 80},
        {x: 3, y: 12},
        {x: 4, y: 36},
        {x: 5, y: 16},
        {x: 6, y: 55},
        {x: 7, y: 27}
      ],
      dataFormat: ['8', '9', '10', '11', '12', '13', '14', '15'],
      month: ['Oktober'],
      modalCalendar: false,
      showCalendar: false
    }
  }

  static navigationOptions = {
    tabBarLabel: ({ focused, tintColor }) => (
      <View style={styles.tabLabel}>
        <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12) }}>
          Performa
        </Text>
      </View>
    ),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.tabIcon}>
        <Image source={Images.ic_performa} style={{ width: ratioWidth(24), height: ratioWidth(24), tintColor: tintColor }} resizeMode={'contain'} />
      </View>
    )
  }

  componentDidMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || typeof value === 'undefined' || value === '') {
        this.setState({ isLogin: false })
      } else {
        this.setState({ isLogin: true })
      }
    })
  }

  onLayoutModal = (event) => {
    this.layout.yPosition = event.nativeEvent.layout.y
  }

  renderProduct = ({ item }) => {
    var maskedPrice = maskedMoney(item.totalAmount)
    return (
      <View style={styles.felxRowList}>
        <Text style={[styles.robotoRegularlarge, {flex: 1}]}>{item.name}</Text>
        <View style={styles.flexSmallCoumn}>
          <Text style={styles.robotoRegularMedBlue}>{maskedPrice}</Text>
          <Text style={styles.robotoRegularSmallGrey}>{item.totalTransaction} TRANSAKSI</Text>
        </View>
      </View>
    )
  }

  renderSeparator () {
    return (
      <View style={styles.borderBottom} />
    )
  }

  onClickModalSort () {
    if (this.state.modalSort) {
      this.setState({modalSort: false})
    } else {
      this.setState({modalSort: true})
    }
  }

  renderViewShort () {
    return (
      <TouchableOpacity onLayout={this.onLayoutModal} activeOpacity={0.8} style={styles.flexRowClear} onPress={() => this.onClickModalSort()}>
        <Text style={styles.robotoRegularsmallBlue}>{this.state.textSort}</Text>
        <Image
          style={styles.imgDropdown}
          source={Images.ic_dropdown_small}
          resizeMode={'stretch'} />
      </TouchableOpacity>
    )
  }

  onPressSort (value) {
    const {listProduct} = this.state
    this.setState({textSort: value, modalSort: false})
    let sortedData = this.sortArrayAsc(listProduct, value)
    this.setState({
      listProduct: sortedData
    })
  }

  sortArrayAsc (array, field) {
    switch (field) {
      case 'Transaksi Terbesar':
        return array.sort(function (a, b) {
          return b.totalAmount - a.totalAmount
        })
      case 'Transaksi Terkecil':
        return array.sort(function (a, b) {
          return b.totalAmount - a.totalAmount
        }).reverse()
      case 'Transaksi Terbanyak':
        return array.sort(function (a, b) {
          return b.totalTransaction - a.totalTransaction
        })
      case 'Transaksi Tersedikit':
        return array.sort(function (a, b) {
          return b.totalTransaction - a.totalTransaction
        }).reverse()
      default:
        break
    }
  }

  onBlur () {
    this.setState({modalSort: false})
  }

  modalSort () {
    const { textSort } = this.state
    const selectedStyle = {color: Colors.nice_blue}
    let tersedikit, terbanyak, terkecil, terbesar
    switch (textSort) {
      case 'Transaksi Terbanyak':
        terbanyak = selectedStyle
        break
      case 'Transaksi Terkecil':
        terkecil = selectedStyle
        break
      case 'Transaksi Terbesar':
        terbesar = selectedStyle
        break
      case 'Transaksi Tersedikit':
        tersedikit = selectedStyle
        break
      default:
        break
    }
    if (this.state.modalSort) {
      return (
        <View style={[styles.modalSort, {top: this.layout.yPosition + moderateScale(0)}]}>
          <TouchableOpacity
            onPress={() => this.onPressSort('Transaksi Terkecil')}
            activeOpacity={0.8}
            style={[styles.listSort, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text style={[styles.robotoRegularsmallSlateGrey, terkecil]}>Transaksi Terkecil</Text>
            {textSort === 'Transaksi Terkecil' && <Image
              style={[styles.imgDropdown, {width: ratioWidth(12), height: ratioHeight(8.8)}]}
              source={Images.checkbox_performance}
              resizeMode={'stretch'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressSort('Transaksi Terbesar')}
            activeOpacity={0.8} style={[styles.listSort, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text style={[styles.robotoRegularsmallSlateGrey, terbesar]}>Transaksi Terbesar</Text>
            {textSort === 'Transaksi Terbesar' && <Image
              style={[styles.imgDropdown, {width: ratioWidth(12), height: ratioHeight(8.8)}]}
              source={Images.checkbox_performance}
              resizeMode={'stretch'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressSort('Transaksi Tersedikit')}
            activeOpacity={0.8} style={[styles.listSort, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text style={[styles.robotoRegularsmallSlateGrey, tersedikit]}>Transaksi Tersedikit</Text>
            {textSort === 'Transaksi Tersedikit' && <Image
              style={[styles.imgDropdown, {width: ratioWidth(12), height: ratioHeight(8.8)}]}
              source={Images.checkbox_performance}
              resizeMode={'stretch'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressSort('Transaksi Terbanyak')}
            activeOpacity={0.8} style={[styles.listSort, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text style={[styles.robotoRegularsmallSlateGrey, terbanyak]}>Transaksi Terbanyak</Text>
            {textSort === 'Transaksi Terbanyak' && <Image
              style={[styles.imgDropdown, {width: ratioWidth(12), height: ratioHeight(8.8)}]}
              source={Images.checkbox_performance}
              resizeMode={'stretch'} />}
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  calculateTransaction (data) {
    var tempTransaction = data.map((obj, i) => {
      return obj.totalTransaction
    })

    var sum = tempTransaction.reduce((a, b) => a + b, 0)
    return (
      <View style={[styles.flexColumnWhite]}>
        <Text style={[styles.robotoMediumMedBlue, {fontSize: moderateScale(16), paddingBottom: ratioHeight(3)}]}>{sum}</Text>
        <Text style={[styles.robotoRegularSmallGrey, {fontSize: moderateScale(10)}]}>TOTAL TRANSAKSI</Text>
      </View>
    )
  }

  calculateIncoming (data) {
    var tempIncoming = data.map((obj, i) => {
      return obj.totalAmount
    })

    var sum = tempIncoming.reduce((a, b) => a + b, 0)
    var formatdMoney = maskedMoney(sum)
    return (
      <View style={[styles.flexColumnWhite]}>
        <Text style={[styles.robotoMediumMedBlue, {fontSize: moderateScale(16), paddingBottom: ratioHeight(3)}]}>{formatdMoney}</Text>
        <Text style={[styles.robotoRegularSmallGrey, {fontSize: moderateScale(10)}]}>NOMINAL TRANSAKSI</Text>
      </View>
    )
  }

  changeDate (value) {
    var {list, month, label} = []
    var startMasking = moment(value.fromDate).format('YYYY-MM-DD')
    var endMasking = moment(value.toDate).format('YYYY-MM-DD')

    const start = moment(String(startMasking), 'YYYY-MM-DD')
    const end = moment(String(endMasking), 'YYYY-MM-DD')

    const dates = [momentRange(start, 'YYYY-MM-DD'), momentRange(end, 'YYYY-MM-DD')]
    const ranges = momentRange.range(dates)
    const days = Array.from(ranges.by('day'))

    list = days.map((m, i) => {
      return {x: i, y: Math.ceil((Math.random(5) * 99))}
    })
    label = days.map(m => {
      return moment(m).format('D')
    })
    month = dates.map(m => {
      return moment(m).format('MMMM')
    })

    let daySt = parseInt(moment(value.fromDate).format('D'))
    let daySec = parseInt(moment(value.toDate).format('D'))
    let monthSt = convertShortMonthId(value.fromDate)
    let monthSec = convertShortMonthId(value.toDate)
    let year = moment(value.toDate).format('YYYY')
    let maskedDate = daySt + monthSt + ' - ' + daySec + monthSec + ' ' + year
    this.setState({
      dateNow: maskedDate,
      data: list,
      dataFormat: label,
      month: month,
      showCalendar: false
    })
  }

  renderView () {
    const {data, dataFormat, month, isLogin, modalCalendar, dateNow} = this.state
    if (isLogin) {
      return (
        <ScrollView style={styles.containers}>
          <TouchableOpacity
            onPress={() => this.onBlur()}
            activeOpacity={10}>
            <View style={[styles.flexRowWhite, {alignItems: 'center'}]}>
              <Text style={[styles.robotoMediumMedBlue, {flex: 1, fontSize: moderateScale(10)}]}>PERFORMA TRANSAKSI ANDA</Text>
              <TouchableOpacity onPress={() => this.setState({showCalendar: true})} style={[styles.flexRowBoxWhite]}>
                <Text style={[styles.productSndRegularSmallGrey, {marginRight: moderateScale(14)}]}>{dateNow}</Text>
                <Image
                  style={modalCalendar ? [styles.imgDropdown, {transform: [{rotate: '180deg'}]}] : [styles.imgDropdown, {transform: [{rotate: '0deg'}]}]}
                  source={Images.ic_drop_down_plain}
                  resizeMode={'stretch'} />
              </TouchableOpacity>
            </View>
            <WraperChart data={data} dataFormat={dataFormat} month={month} />
            <View style={[styles.flexRowWhite]}>
              {this.calculateTransaction(this.state.listProduct)}
              <View style={{width: ratioWidth(10)}} />
              {this.calculateIncoming(this.state.listProduct)}
            </View>
            {this.renderViewShort()}
            <FlatList
              data={this.state.listProduct}
              extraData={this.state}
              style={styles.container}
              renderItem={this.renderProduct}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
            />
            <View style={{marginBottom: ratioHeight(25)}} />
          </TouchableOpacity>
          {this.modalSort()}
        </ScrollView>
      )
    } else {
      return <NoLoginTab type='performance' onPress={() => this.props.navigation.navigate('SignIn')} />
    }
  }

  render () {
    const { showCalendar } = this.state
    return (
      <View style={{flex: 1}} >
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white_two} />
        {this.renderView()}
        <CustomCalendar
          isShow={showCalendar}
          mode={'range'}
          fromDate={new Date().getTime()}
          toDate={new Date().getTime()}
          onCancel={() => this.setState({ showCalendar: false })}
          onOK={(value) => this.changeDate(value)}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Perform)
