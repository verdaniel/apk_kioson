import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { convertNumberMonth } from '../Transforms/LocalConfig'
import { WheelPicker } from 'react-native-wheel-picker-android'
import Colors from '../Themes/Colors'

// Style
import styles from './Styles/CustomCalendarStyle'
import { moderateScale } from '../Transforms/Scaling'
import { Fonts } from '../Themes/index'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'

const moment = require('moment')
const _ = require('lodash')

export default class CustomCalendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: this.props.isShow,
      mode: this.props.mode,
      days: [],
      daysTemp: [],
      month: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      year: [],
      hour: [],
      minute: [],
      fromDateStr: {
        day: parseInt(moment(this.props.fromDate).format('D')),
        month: parseInt(moment(this.props.fromDate).format('M')),
        year: parseInt(moment(this.props.fromDate).format('YYYY')),
        hour: parseInt(moment(this.props.fromDate).format('HH')),
        minute: parseInt(moment(this.props.fromDate).format('mm')),
        indexMonth: parseInt(moment(this.props.fromDate).format('M')) - 1,
        indexYear: 0
      },
      toDateStr: {
        day: parseInt(moment(this.props.toDate).format('D')),
        month: parseInt(moment(this.props.toDate).format('M')),
        year: parseInt(moment(this.props.toDate).format('YYYY')),
        hour: parseInt(moment(this.props.toDate).format('HH')),
        minute: parseInt(moment(this.props.toDate).format('mm')),
        indexMonth: parseInt(moment(this.props.toDate).format('M')) - 1,
        indexYear: 0
      },
      fromDate: this.props.fromDate,
      toDate: this.props.toDate
    }
  }

  static propTypes = {
    isShow: PropTypes.bool,
    mode: PropTypes.string, // 'date', 'range', 'date-hour'
    fromDate: PropTypes.number,
    toDate: PropTypes.number
  }

  static defaultProps = {
    isShow: false,
    mode: 'date',
    fromDate: new Date().getTime(),
    toDate: new Date().getTime()
  }

  componentWillMount () {
    moment.locale()
    var { days, daysTemp, year, hour, minute, fromDateStr, toDateStr } = this.state

    var fromDate = new Date(this.props.fromDate)
    var maxDay = (this.props.fromDate)
      ? new Date(parseInt(moment(fromDate).format('YYYY')), parseInt(moment(fromDate).format('M')), 0)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    var toDates = new Date(this.props.toDate)
    var maxDayTo = new Date(parseInt(moment(toDates).format('YYYY')), parseInt(moment(toDates).format('M')), 0)

    // console.tron.warn({maxDay, maxDayTo})
    maxDay = moment(maxDay).format('D')
    maxDayTo = moment(maxDayTo).format('D')
    year = _.range(1960, new Date().getFullYear() + 1)
    days = _.range(1, parseInt(maxDay) + 1)
    daysTemp = _.range(1, parseInt(maxDayTo) + 1)
    minute = _.range(0, 60)
    hour = _.range(0, 25)
    fromDateStr = { ...fromDateStr, indexYear: year.findIndex(item => item === parseInt(fromDateStr.year)) }
    toDateStr = { ...toDateStr, indexYear: year.findIndex(item => item === parseInt(toDateStr.year)) }
    this.setState({ days, daysTemp, year, hour, minute, fromDateStr, toDateStr })
  }

  componentWillReceiveProps (newProps) {
    this.setState({ isShow: newProps.isShow })
  }

  onOK () {
    const { toDate, fromDate, toDateStr, fromDateStr } = this.state
    if (typeof this.props.onOK === 'function') {
      this.setState({ isShow: false })
      var data = { toDate, fromDate, toDateStr, fromDateStr }
      if (toDate < fromDate) {
        data.toDate = fromDate
        data.toDateStr = fromDateStr
        this.setState({toDate: fromDate, toDateStr: fromDateStr})
      }
      this.props.onOK(data)
    }
  }

  onCancel () {
    if (typeof this.props.onCancel === 'function') {
      this.setState({ isShow: false })
      this.props.onCancel()
    }
  }

  onSelectFromDate (event) {
    var { fromDate, fromDateStr } = this.state
    moment.locale()
    fromDate = parseInt(moment(`${fromDateStr.year}-${fromDateStr.month}-${event.data} ${fromDateStr.hour}:${fromDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
    fromDateStr = { ...fromDateStr, day: event.data }
    this.setState({ fromDateStr, fromDate })
  }

  onSelectFromMonth (event) {
    var { fromDate, fromDateStr, days } = this.state
    moment.locale()
    var fromDates = moment(`${fromDateStr.year}-${event.position + 1}-${1}`, 'YYYY-MM-DD')
    var maxDay = new Date(parseInt(moment(fromDates).format('YYYY')), parseInt(moment(fromDates).format('M')), 0)
    maxDay = moment(maxDay).format('D')
    days = _.range(1, parseInt(maxDay) + 1)

    if (fromDateStr.day > parseInt(maxDay)) {
      fromDate = parseInt(moment(`${fromDateStr.year}-${event.position + 1}-${1} ${fromDateStr.hour}:${fromDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
      fromDateStr = { ...fromDateStr, day: 1, month: parseInt(moment(fromDate).format('M')), indexMonth: parseInt(moment(fromDate).format('M')) - 1 }
    } else {
      fromDate = parseInt(moment(`${fromDateStr.year}-${event.position + 1}-${fromDateStr.day} ${fromDateStr.hour}:${fromDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
      fromDateStr = { ...fromDateStr, month: parseInt(moment(fromDate).format('M')), indexMonth: parseInt(moment(fromDate).format('M')) - 1 }
    }

    this.setState({ fromDateStr, fromDate, days })
  }

  onSelectFromYear (event) {
    var { fromDate, fromDateStr, year } = this.state
    moment.locale()
    fromDate = parseInt(moment(`${event.data}-${fromDateStr.month}-${fromDateStr.day} ${fromDateStr.hour}:${fromDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
    fromDateStr = { ...fromDateStr, year: event.data, indexYear: year.findIndex(item => item === parseInt(event.data)) }
    this.setState({ fromDateStr, fromDate })
  }

  onSelectFromHour (event) {
    var { fromDate, fromDateStr } = this.state
    moment.locale()
    fromDate = parseInt(moment(`${fromDateStr.year}-${fromDateStr.month}-${fromDateStr.day} ${event.data}:${fromDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
    fromDateStr = { ...fromDateStr, hour: event.data }
    this.setState({ fromDateStr, fromDate })
  }

  onSelectFromMinute (event) {
    var { fromDate, fromDateStr } = this.state
    moment.locale()
    fromDate = parseInt(moment(`${fromDateStr.year}-${fromDateStr.month}-${fromDateStr.day} ${fromDateStr.hour}:${event.data}`, 'YYYY-MM-DD HH:mm').format('x'))
    fromDateStr = { ...fromDateStr, minute: event.data }
    this.setState({ fromDateStr, fromDate })
  }

  onSelectToDate (event) {
    var { toDate, toDateStr } = this.state
    moment.locale()
    toDate = parseInt(moment(`${toDateStr.year}-${toDateStr.month}-${event.data} ${toDateStr.hour}:${toDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
    toDateStr = { ...toDateStr, day: event.data }
    this.setState({ toDateStr, toDate })
  }

  onSelectToMonth (event) {
    var { toDate, toDateStr, daysTemp } = this.state
    moment.locale()
    var toDates = moment(`${toDateStr.year}-${event.position + 1}-${1}`, 'YYYY-MM-DD')
    var maxDay = new Date(parseInt(moment(toDates).format('YYYY')), parseInt(moment(toDates).format('M')), 0)
    maxDay = moment(maxDay).format('D')
    daysTemp = _.range(1, parseInt(maxDay) + 1)

    if (toDateStr.day > parseInt(maxDay)) {
      toDate = parseInt(moment(`${toDateStr.year}-${event.position + 1}-${1} ${toDateStr.hour}:${toDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
      toDateStr = { ...toDateStr, day: 1, month: parseInt(moment(toDate).format('M')), indexMonth: parseInt(moment(toDate).format('M')) - 1 }
    } else {
      toDate = parseInt(moment(`${toDateStr.year}-${event.position + 1}-${toDateStr.day} ${toDateStr.hour}:${toDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
      toDateStr = { ...toDateStr, month: parseInt(moment(toDate).format('M')), indexMonth: parseInt(moment(toDate).format('M')) - 1 }
    }

    this.setState({ toDateStr, toDate, daysTemp })
  }

  onSelectToYear (event) {
    var { toDate, toDateStr, year } = this.state
    moment.locale()
    toDate = parseInt(moment(`${event.data}-${toDateStr.month}-${toDateStr.day} ${toDateStr.hour}:${toDateStr.minute}`, 'YYYY-MM-DD HH:mm').format('x'))
    toDateStr = { ...toDateStr, year: event.data, indexYear: year.findIndex(item => item === parseInt(event.data)) }
    this.setState({ toDateStr, toDate })
  }

  renderDate () {
    const { fromDateStr, year, month, days } = this.state
    return (
      <View style={{ backgroundColor: Colors.black, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.viewCalendar}>
          <Text style={[styles.textDate, { fontSize: moderateScale(16) }]}>
            {`${fromDateStr.day} ${convertNumberMonth(fromDateStr.month)} ${fromDateStr.year}`}
          </Text>
          <View style={styles.viewSeparator} />
          <View style={[styles.viewHeader, { marginTop: ratioHeight(37) }]}>
            <Text style={[styles.textDate, { fontFamily: Fonts.type.robotoMedium, paddingVertical: ratioHeight(8), fontSize: moderateScale(14) }]}>
              Tanggal
            </Text>
          </View>
          <View style={styles.viewWheel}>
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromDate(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={4}
                data={days}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={parseInt(fromDateStr.day) - 1}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromMonth(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={4}
                data={month}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexMonth}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromYear(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={4}
                data={year}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexYear}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.white_two }]} onPress={() => this.onCancel()}>
              <Text style={[styles.textCalendar, { color: Colors.nice_blue }]}>
                Batal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.nice_blue }]} onPress={() => this.onOK()}>
              <Text style={[styles.textCalendar, { color: Colors.white_two }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderRangeDate () {
    const { fromDateStr, toDateStr, year, month, days, daysTemp } = this.state
    var disable = true
    if ((toDateStr.day !== fromDateStr.day) && (fromDateStr.month <= toDateStr.month) && (fromDateStr.year <= toDateStr.year)) {
      disable = false
    }

    return (
      <View style={{ backgroundColor: Colors.black_35, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.viewCalendar}>
          <Text style={[styles.textDate, { fontSize: moderateScale(16) }]}>
            {`${fromDateStr.day} ${convertNumberMonth(fromDateStr.month)} ${fromDateStr.year} - ${toDateStr.day} ${convertNumberMonth(toDateStr.month)} ${toDateStr.year}`}
          </Text>
          <View style={styles.viewSeparator} />
          <View style={styles.viewHeader}>
            <Text style={[styles.textDate, { fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(14), paddingVertical: ratioHeight(8) }]}>
              Dari
            </Text>
          </View>
          <View style={styles.viewWheel}>
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromDate(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(20))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={days}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={parseInt(fromDateStr.day) - 1}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromMonth(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={month}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexMonth}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromYear(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={year}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexYear}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
          </View>
          <View style={[styles.viewHeader]}>
            <Text style={[styles.textDate, { fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(14), paddingVertical: ratioHeight(8) }]}>
              Sampai
            </Text>
          </View>
          <View style={styles.viewWheel}>
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectToDate(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={daysTemp}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={parseInt(toDateStr.day) - 1}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectToMonth(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={month}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={toDateStr.indexMonth}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectToYear(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(60))}
                visibleItemCount={2}
                data={year}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={toDateStr.indexYear}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.white_two }]} onPress={() => this.onCancel()}>
              <Text style={[styles.textCalendar, { color: Colors.nice_blue }]}>
                Batal
              </Text>
            </TouchableOpacity>
            <View style={{ width: ratioWidth(10) }} />
            <TouchableOpacity disabled={disable} style={[styles.buttonCalendar, { backgroundColor: disable ? Colors.greyish : Colors.nice_blue }]} onPress={() => this.onOK()}>
              <Text style={[styles.textCalendar, { color: Colors.white_two }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderDateHour () {
    const { fromDateStr, year, month, days, hour, minute } = this.state
    return (
      <View style={{ backgroundColor: Colors.black_35, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.viewCalendar}>
          <Text style={[styles.textDate, { fontSize: moderateScale(16) }]}>
            {`${fromDateStr.day} ${convertNumberMonth(fromDateStr.month)} ${fromDateStr.year}`}
          </Text>
          <View style={styles.viewSeparator} />
          <View style={[styles.viewHeader]}>
            <Text style={[styles.textDate, { fontFamily: Fonts.type.robotoMedium, paddingVertical: ratioHeight(8), fontSize: moderateScale(14) }]}>
              Tanggal
            </Text>
          </View>
          <View style={styles.viewWheel}>
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromDate(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={2}
                data={days}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={parseInt(fromDateStr.day) - 1}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromMonth(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={2}
                data={month}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexMonth}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={styles.borderWheel}>
              <WheelPicker
                isCyclic
                onItemSelected={(event) => this.onSelectFromYear(event)}
                selectedItemTextColor={Colors.slate_grey}
                itemTextColor={Colors.greyish}
                itemTextFontFamily={Fonts.type.robotoRegular}
                itemSpace={parseInt(ratioHeight(7))}
                itemTextSize={parseInt(moderateScale(45))}
                visibleItemCount={2}
                data={year}
                renderIndicator
                indicatorColor={Colors.nice_blue}
                curtainColor={Colors.nice_blue}
                isAtmospherice
                selectedItemPosition={fromDateStr.indexYear}
                style={{ flex: 1 }}
                backgroundColor={Colors.white_two} />
            </View>
          </View>
          <View style={styles.viewWheel}>
            <View style={{ flex: 1 }}>
              <View style={[styles.viewHeader, { marginTop: ratioHeight(10) }]}>
                <Text style={[styles.textDate, { fontFamily: Fonts.type.robotoMedium, paddingVertical: ratioHeight(8), fontSize: moderateScale(14) }]}>
                  Jam
                </Text>
              </View>
              <View style={[styles.borderWheel, {marginTop: ratioHeight(10)}]}>
                <WheelPicker
                  isCyclic
                  onItemSelected={(event) => this.onSelectFromHour(event)}
                  selectedItemTextColor={Colors.slate_grey}
                  itemTextColor={Colors.greyish}
                  itemTextFontFamily={Fonts.type.robotoRegular}
                  itemSpace={parseInt(ratioHeight(7))}
                  itemTextSize={parseInt(moderateScale(45))}
                  visibleItemCount={2}
                  data={hour}
                  renderIndicator
                  indicatorColor={Colors.nice_blue}
                  curtainColor={Colors.nice_blue}
                  isAtmospherice
                  selectedItemPosition={parseInt(fromDateStr.hour)}
                  style={{ flex: 1 }}
                  backgroundColor={Colors.white_two} />
              </View>
            </View>
            <View style={{ width: ratioWidth(10) }} />
            <View style={{ flex: 1 }}>
              <View style={[styles.viewHeader, { marginTop: ratioHeight(10) }]}>
                <Text style={[styles.textDate, { paddingVertical: ratioHeight(8), fontSize: moderateScale(14) }]}>
                  Menit
                </Text>
              </View>
              <View style={[styles.borderWheel, {marginTop: ratioHeight(10)}]}>
                <WheelPicker
                  isCyclic
                  onItemSelected={(event) => this.onSelectFromMinute(event)}
                  selectedItemTextColor={Colors.slate_grey}
                  itemTextColor={Colors.greyish}
                  itemTextFontFamily={Fonts.type.robotoRegular}
                  itemSpace={parseInt(ratioHeight(7))}
                  itemTextSize={parseInt(moderateScale(45))}
                  visibleItemCount={2}
                  data={minute}
                  renderIndicator
                  indicatorColor={Colors.nice_blue}
                  curtainColor={Colors.nice_blue}
                  isAtmospherice
                  selectedItemPosition={parseInt(fromDateStr.minute)}
                  style={{ flex: 1 }}
                  backgroundColor={Colors.white_two} />
              </View>
            </View>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.white_two }]} onPress={() => this.onCancel()}>
              <Text style={[styles.textCalendar, { color: Colors.nice_blue }]}>
                Batal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.nice_blue }]} onPress={() => this.onOK()}>
              <Text style={[styles.textCalendar, { color: Colors.white_two }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render () {
    var calendar
    const { mode } = this.state
    // console.tron.warn(this.state)
    if (mode === 'date') calendar = this.renderDate()
    else if (mode === 'range') calendar = this.renderRangeDate()
    else if (mode === 'date-hour') calendar = this.renderDateHour()
    return (
      <View>
        <Modal
          ref='modal'
          transparent
          animationType={'fade'}
          visible={this.state.isShow}
          onRequestClose={this.props.onCancel}>
          {calendar}
        </Modal>
      </View>
    )
  }
}
