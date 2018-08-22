import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../Themes/index'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { maskedWithoutDay, maskedRangeDate } from '../Transforms/LocalConfig'
import CustomCalendar from '../Components/CustomCalendar'

// Styles
import styles from './Styles/HistorySaldoStyle'
import { moderateScale } from '../Transforms/Scaling'

var accounting = require('accounting')
var moment = require('moment')

class HistorySaldo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCalendar: false,
      toDate: new Date().getTime(),
      fromDate: new Date().getTime(),
      data: [
        { name: 'Pulsa XL 89.000', id: '113WMJAQ', debit: 0, credit: 49000, commission: 2500, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Isi Saldo 200.000', id: '113WMJAQ', debit: 200000, credit: 0, commission: 2500, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Pulsa XL 10.000', id: '113WMJAQ', debit: 0, credit: 49000, commission: 2500, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Isi Saldo 200.000', id: '113WMJAQ', debit: 200000, credit: 0, commission: 0, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Pulsa XL 10.000', id: '113WMJAQ', debit: 0, credit: 49000, commission: 2250, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Isi Saldo 200.000', id: '113WMJAQ', debit: 200000, credit: 0, commission: 0, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Pulsa XL 10.000', id: '113WMJAQ', debit: 0, credit: 49000, commission: 2250, saldo: 300000, date: '2017-10-12 13:20:00' },
        { name: 'Isi Saldo 200.000', id: '113WMJAQ', debit: 200000, credit: 0, commission: 2500, saldo: 300000, date: '2017-10-12 13:20:00' }
      ],
      search: maskedWithoutDay(new Date().getTime())
    }
  }

  onChangeDate (value) {
    var newDate
    const {toDate, fromDate} = value
    if (toDate === fromDate) {
      newDate = maskedWithoutDay(fromDate)
      this.setState({ search: newDate, showCalendar: false, toDate, fromDate })
    } else {
      newDate = maskedRangeDate(toDate, fromDate)
      this.setState({ search: newDate, showCalendar: false, toDate, fromDate })
    }
  }

  renderItem = ({ item, index }) => {
    const { data } = this.state
    var debit = accounting.formatMoney(item.debit, 'Rp ', '0', '.')
    var credit = accounting.formatMoney(item.credit, 'Rp ', '0', '.')
    var saldo = accounting.formatMoney(item.saldo, 'Rp ', '0', '.')
    var commission = `+ ${accounting.formatMoney(item.commission, 'Rp ', '0', '.')}`
    var dateStr = moment(item.date).format('DD MMMM YYYY, HH:mm')
    var nominal = item.debit === 0 ? `- ${credit}` : `+ ${debit}`

    return (
      <View style={[styles.itemList, { marginBottom: index === data.length - 1 ? ratioHeight(25) : 0 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.textTitle}>
              {item.name}
            </Text>
            <Text style={styles.textID}>
              {`No. Pesanan : ${item.id}`}
            </Text>
            <Text style={styles.textDate}>
              {`${dateStr} WIB`}
            </Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={styles.textNominal}>
              {nominal}
            </Text>
            {(item.commission !== 0) &&
              <Text style={styles.textNominal}>
                {commission}
              </Text>
            }
            <Text style={styles.textDate}>
              {`Saldo : ${saldo}`}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderSeparator () {
    return (
      <View style={{ height: ratioHeight(0.5), backgroundColor: Colors.black_15 }} />
    )
  }

  render () {
    const { search, showCalendar, toDate, fromDate } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.viewHeader}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Text style={{fontSize: moderateScale(16)}}>Filter</Text>
            </View>
            <TouchableOpacity onPress={() => this.setState({showCalendar: true})} style={{flex: 5.5}}>
              <View style={styles.viewDate}>
                <Text style={styles.textInputDate}>
                  {search}
                </Text>
                <Image style={{ height: ratioWidth(16), width: ratioWidth(16) }} source={Images.ic_calendar} resizeMode={'stretch'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <CustomCalendar
          isShow={showCalendar}
          mode={'range'}
          toDate={toDate}
          fromDate={fromDate}
          onCancel={() => this.setState({ showCalendar: false })}
          onOK={(data) => this.onChangeDate(data)}
        />
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
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

export default connect(mapStateToProps, mapDispatchToProps)(HistorySaldo)
