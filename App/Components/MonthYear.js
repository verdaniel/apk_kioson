import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native'
import styles from './Styles/MonthYearStyle'
import { WheelPicker } from 'react-native-wheel-picker-android'
import { Colors, Fonts } from '../Themes/index'
import { moderateScale } from '../Transforms/Scaling'

export default class MonthYear extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listMonth: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      listYear: [],
      listHour: [],
      listMinutes: [],
      year: new Date().getFullYear(),
      month: '',
      monthIndex: new Date().getMonth(),
      yearIndex: 0,
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      animationType: 'fade',
      modalVisible: false,
      transparent: false,
      showHour: this.props.showHour || false
    }
  }

  componentWillMount () {
    let firstYear = 1960
    /* let years = new Array(40).fill({ label: null }).map((item, id) => {
      return id + firstYear
    }) */
    let tempHour = []
    let tempMinutes = []
    let years = new Array(new Date().getFullYear() - 1960).fill({ label: null }).map((item, id) => {
      return id + 1 + firstYear
    })
    for (var i = 0; i < 24; i++) {
      tempHour[i] = i
    }
    for (var j = 0; j < 60; j++) {
      tempMinutes[j] = j
    }
    this.setState({ listYear: years, listHour: tempHour, listMinutes: tempMinutes })
  }

  onOkMonthYear () {
    const { monthIndex, year, showHour, hour, minute } = this.state
    const newMonth = monthIndex
    const newDate = new Date(year, newMonth, 1)
    const newTimestamp = newDate.getTime() + 68400000
    this.setState({modalVisible: false})
    this.props.onMonthYearChange(newTimestamp)
    if (showHour) {
      this.props.onHourChange(hour, minute)
    }
  }

  onPickerSelectMonth (event) {
    var addPosition = event.position
    this.setState({ month: event.data, monthIndex: addPosition })
  }

  onPickerSelectYear (event) {
    this.setState({ year: event.data, yearIndex: event.position })
  }

  onPickerSelectHour (event) {
    this.setState({ hour: event.position })
  }

  onPickerSelectMinute (event) {
    this.setState({ minute: event.position })
  }

  open () {
    this.setState({
      modalVisible: true
    })
  }

  close () {
    this.setState({
      modalVisible: false
    })
  }

  renderChildren () {
    if (this.props.children) {
      return this.props.children
    }
    return (
      <Text>Please Select an Item!</Text>
    )
  }

  renderPicker () {
    const { listMonth, listYear, monthIndex, year } = this.state
    const yearIndex = listYear.indexOf(year)
    const monthStr = listMonth[monthIndex]
    const monthYear = `${monthStr} ${year}`
    return (
      <View style={styles.viewModal}>
        <View style={styles.viewAllCalender}>
          <View style={{
            paddingVertical: moderateScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: Colors.nice_blue
          }}>
            <Text
              style={{ color: Colors.nice_blue, fontFamily: Fonts.type.robotoBold, fontSize: moderateScale(16) }}>
              {monthYear}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 3 }}>
            <Text style={styles.label}>Bulan</Text>
            <Text style={styles.label}>Tahun</Text>
          </View>
          <View style={styles.viewCalendar}>
            <WheelPicker
              isCyclic
              onItemSelected={(event) => this.onPickerSelectMonth(event)}
              selectedItemTextColor={Colors.slate_grey}
              itemTextColor={Colors.greyish}
              itemTextFontFamily={Fonts.type.robotoRegular}
              itemSpace={36}
              itemTextSize={50}
              visibleItemCount={4}
              data={listMonth}
              renderIndicator
              indicatorColor={Colors.nice_blue}
              curtainColor={Colors.nice_blue}
              isAtmospherice
              selectedItemPosition={monthIndex}
              style={{ flex: 1 }}
              backgroundColor={Colors.white_two} />
            <View style={{ width: 10 }} />
            <WheelPicker
              isCyclic
              onItemSelected={(event) => this.onPickerSelectYear(event)}
              selectedItemTextColor={Colors.slate_grey}
              itemTextColor={Colors.greyish}
              itemTextFontFamily={Fonts.type.robotoRegular}
              itemSpace={36}
              itemTextSize={50}
              visibleItemCount={4}
              data={listYear}
              renderIndicator
              indicatorColor={Colors.nice_blue}
              curtainColor={Colors.nice_blue}
              isAtmospherice
              selectedItemPosition={yearIndex}
              style={{ flex: 1 }}
              backgroundColor={Colors.white_two} />
          </View>
          {this.renderHour()}
          <TouchableOpacity style={styles.buttonActive} onPress={() => this.onOkMonthYear()}>
            <Text style={styles.textButton}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderHour () {
    const { listHour, listMinutes, hour, minute, showHour } = this.state
    if (showHour) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 3 }}>
            <Text style={styles.label}>Jam</Text>
            <Text style={styles.label}>Menit</Text>
          </View>
          <View style={styles.viewCalendar}>
            <WheelPicker
              isCyclic
              onItemSelected={(event) => this.onPickerSelectHour(event)}
              selectedItemTextColor={Colors.slate_grey}
              itemTextColor={Colors.greyish}
              itemTextFontFamily={Fonts.type.robotoRegular}
              itemSpace={36}
              itemTextSize={50}
              visibleItemCount={4}
              data={listHour}
              renderIndicator
              indicatorColor={Colors.nice_blue}
              curtainColor={Colors.nice_blue}
              isAtmospherice
              selectedItemPosition={hour}
              style={{ flex: 1 }}
              backgroundColor={Colors.white_two} />
            <View style={{ width: 10 }} />
            <WheelPicker
              isCyclic
              onItemSelected={(event) => this.onPickerSelectMinute(event)}
              selectedItemTextColor={Colors.slate_grey}
              itemTextColor={Colors.greyish}
              itemTextFontFamily={Fonts.type.robotoRegular}
              itemSpace={36}
              itemTextSize={50}
              visibleItemCount={4}
              data={listMinutes}
              renderIndicator
              indicatorColor={Colors.nice_blue}
              curtainColor={Colors.nice_blue}
              isAtmospherice
              selectedItemPosition={minute}
              style={{ flex: 1 }}
              backgroundColor={Colors.white_two} />
          </View>
        </View>
      )
    }
    return null
  }

  render () {
    const dp = (
      <Modal transparent ref='modal' visible={this.state.modalVisible} onRequestClose={() => this.close()}
        animationType={this.state.animationType}>
        <View style={{ backgroundColor: Colors.black_15, flex: 1 }}>
          {this.renderPicker()}
        </View>
      </Modal>
    )

    return (
      <View>
        {dp}
        <TouchableOpacity onPress={() => this.open()}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    )
  }
}
