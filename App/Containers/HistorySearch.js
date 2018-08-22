import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import { Images } from '../Themes/index'
import { maskedWithoutDay, maskedRangeDate } from '../Transforms/LocalConfig'
import Button from '../Components/Button'
import DropDown from '../Components/DropDown'
import CustomCalendar from '../Components/CustomCalendar'

// Styles
import styles from './Styles/HistorySearchStyle'

class HistorySearch extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      yProduct: 0,
      yStatus: 0
    }
    this.state = {
      showDropDownProduct: false,
      showDropDownStatus: false,
      showCalendar: false,
      dateStr: this.props.data.dateStr === '' ? maskedWithoutDay(new Date().getTime()) : this.props.data.dateStr,
      toDate: this.props.data.toDate === '' ? new Date().getTime() : this.props.data.toDate,
      fromDate: this.props.data.fromDate === '' ? new Date().getTime() : this.props.data.fromDate,
      product: [
        { id: 0, name: 'Semua Produk' },
        { id: 1, name: 'Pulsa & Paket Data' },
        { id: 2, name: 'Pasca Bayar' },
        { id: 3, name: 'Telkom' },
        { id: 4, name: 'Kios Online' },
        { id: 5, name: 'Transfer Uang' },
        { id: 6, name: 'Kioson Pay' },
        { id: 7, name: 'Listrik PLN' },
        { id: 8, name: 'Air PDAM' },
        { id: 9, name: 'Internet & TV Kabel' },
        { id: 10, name: 'Bayar Angsuran' },
        { id: 11, name: 'Pinjaman' },
        { id: 12, name: 'Gadai' },
        { id: 13, name: 'Asuransi' },
        { id: 14, name: 'BPJS' },
        { id: 15, name: 'Kereta Api' },
        { id: 16, name: 'Voucher Game' },
        { id: 17, name: 'Top Up Chip' },
        { id: 18, name: 'Laku Pandai' }],
      status: [
        { id: 0, name: 'Semua Status' },
        { id: 1, name: 'Berhasil' },
        { id: 2, name: 'Proses' },
        { id: 3, name: 'Gagal' }],
      selectedProduct: this.props.data.product,
      selectedStatus: this.props.data.status,
      phone: this.props.data.phone,
      orderID: this.props.data.orderID
    }
  }

  onSearch () {
    const { toDate, fromDate, dateStr, selectedProduct, selectedStatus, phone, orderID } = this.state
    if (typeof this.props.onSearch === 'function') {
      var newSearch = {
        toDate: toDate,
        fromDate: fromDate,
        dateStr: dateStr,
        product: selectedProduct,
        status: selectedStatus,
        phone: phone,
        orderID: orderID
      }
      this.props.onSearch(newSearch, false)
    }
  }

  onClear () {
    this.setState({
      toDate: new Date().getTime(),
      fromDate: new Date().getTime(),
      dateStr: maskedWithoutDay(new Date().getTime()),
      selectedProduct: 'Semua Produk',
      selectedStatus: 'Semua Status',
      phone: '',
      orderID: ''
    })
    if (typeof this.props.onSearch === 'function') {
      var newSearch = {
        toDate: new Date().getTime(),
        fromDate: new Date().getTime(),
        dateStr: '',
        product: 'Semua Produk',
        status: 'Semua Status',
        phone: '',
        orderID: ''
      }
      this.props.onSearch(newSearch, true)
    }
  }

  onClose () {
    var newSearch = this.props.data
    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(newSearch, false)
    }
  }

  onChangeDate (date) {
    var newDateStr
    if (date.fromDate === date.toDate) newDateStr = maskedWithoutDay(date.fromDate)
    else newDateStr = maskedRangeDate(date.toDate, date.fromDate)

    this.setState({ toDate: date.toDate, fromDate: date.fromDate, dateStr: newDateStr, showCalendar: false })
  }

  onLayoutDropDownProduct = (e) => {
    this.layout.yProduct = e.nativeEvent.layout.y + ratioHeight(93)
  }

  onLayoutDropDownStatus = (e) => {
    this.layout.yStatus = e.nativeEvent.layout.y + ratioHeight(93)
  }

  render () {
    const { showDropDownProduct, showDropDownStatus, showCalendar, toDate, fromDate, dateStr,
      selectedProduct, selectedStatus, phone, orderID } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.viewHeader}>
            <TouchableOpacity onPress={() => this.onClose()}>
              <Image style={{ width: ratioWidth(16), height: ratioWidth(16) }}
                source={Images.ic_close_camera} resizeMode={'stretch'} />
            </TouchableOpacity>
            <Text style={styles.textSearch}>
              Pencarian
            </Text>
          </View>
          <View style={styles.viewContent}>
            <Text style={styles.textFilter}>
              RENTANG WAKTU
            </Text>
            <TouchableOpacity onPress={() => this.setState({ showCalendar: true })}>
              <View style={[styles.viewDate, { marginTop: ratioHeight(10) }]}>
                <Text style={styles.textInputDate}>
                  {dateStr}
                </Text>
                <Image style={{ height: ratioWidth(16), width: ratioWidth(16) }}
                  source={Images.ic_calendar} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.textFilter, { marginTop: ratioHeight(10) }]}>
              PRODUK
            </Text>
            <TouchableOpacity
              style={{ marginTop: ratioHeight(10) }}
              onLayout={this.onLayoutDropDownProduct}
              onPress={() => this.setState({ showDropDownProduct: true })}>
              <View style={styles.viewDate}>
                <Text style={styles.textInputDate}>
                  {selectedProduct}
                </Text>
                <Image style={{ height: ratioWidth(16), width: ratioWidth(16) }}
                  source={showDropDownProduct === true ? Images.ic_dropdodwnActive : Images.ic_dropdodwn} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.textFilter, { marginTop: ratioHeight(10) }]}>
              STATUS
            </Text>
            <TouchableOpacity
              style={{ marginTop: ratioHeight(10) }}
              onLayout={this.onLayoutDropDownStatus}
              onPress={() => this.setState({ showDropDownStatus: true })}>
              <View style={styles.viewDate}>
                <Text style={styles.textInputDate}>
                  {selectedStatus}
                </Text>
                <Image style={{ height: ratioWidth(16), width: ratioWidth(16) }}
                  source={showDropDownStatus === true ? Images.ic_dropdodwnActive : Images.ic_dropdodwn} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
            <Text style={[styles.textFilter, { marginTop: ratioHeight(10) }]}>
              NO. PELANGGAN / PONSEL
            </Text>
            <View style={[styles.viewTextInput, { marginTop: ratioHeight(10) }]}>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                value={phone}
                onChangeText={(text) => this.setState({ phone: text })}
              />
            </View>
            <Text style={[styles.textFilter, { marginTop: ratioHeight(10) }]}>
              NO. PESANAN
            </Text>
            <View style={[styles.viewTextInput, { marginTop: ratioHeight(10) }]}>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
                value={orderID}
                onChangeText={(text) => this.setState({ orderID: text })}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.viewBottom}>
          <Button
            style={styles.btnClear}
            text={'HAPUS FILTER'}
            textStyle={styles.textClear}
            onPress={() => this.onClear()}
          />
          <Button
            style={styles.btnCari}
            text={'CARI'}
            textStyle={styles.textCari}
            onPress={() => this.onSearch()}
          />
        </View>
        {showDropDownProduct === true &&
          <DropDown
            onBlur={(show) => this.setState({ showDropDownProduct: false })}
            onItemPress={(value => this.setState({ selectedProduct: value.name, showDropDownProduct: false }))}
            style={[styles.dropDown, { top: this.layout.yProduct, height: this.state.product.length < 5 ? this.state.product * ratioHeight(21) : 200 }]}
            data={this.state.product}
            backView={styles.dropDownComp} />}
        {showDropDownStatus === true &&
          <DropDown
            onBlur={(show) => this.setState({ showDropDownStatus: false })}
            onItemPress={(value => this.setState({ selectedStatus: value.name, showDropDownStatus: false }))}
            style={[styles.dropDown, { top: this.layout.yStatus, height: this.state.status.length < 5 ? this.state.status * ratioHeight(21) : 200 }]}
            data={this.state.status}
            backView={styles.dropDownComp} />}
        <CustomCalendar
          isShow={showCalendar}
          mode={'range'}
          toDate={toDate}
          fromDate={fromDate}
          onCancel={() => this.setState({ showCalendar: false })}
          onOK={(data) => this.onChangeDate(data)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HistorySearch)
