import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal, TouchableWithoutFeedback } from 'react-native'
import { CalendarList, LocaleConfig } from 'react-native-calendars'
import styles from './Styles/CalendarStyle'
import { Fonts, Colors } from '../Themes'
import BaseComponent from './BaseComponent'
import MonthYear from './MonthYear'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
const moment = require('moment')

LocaleConfig.locales['ind'] = {
  monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  monthNamesShort: ['Jan', 'Feb.', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agst', 'Sept', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  dayNamesShort: ['M', 'S', 'S', 'R', 'K', 'J', 'S']
}

const propTypes = {
  onChange: PropTypes.func,
  rangeDateChoose: PropTypes.bool
}

const defaultProps = {
  onChange: () => {}
}

export default class CalendarComponent extends BaseComponent {
  constructor (props) {
    super(props)
    this._bind(
        'onChange',
        'open',
        'close',
        'renderChildren'
    )
    this.state = {
      animationType: 'fade',
      modalVisible: false,
      transparent: false,
      monthLabel: '',
      yearLabel: '',
      calendarDate: this.props.current,
      calendarTimestamp: moment().format('YYYY-MM-DD'),
      textMonth: '',
      textYear: '',
      markedDay: {},
      markedDates: {},
      isFromDatePicked: false,
      isToDatePicked: false,
      FromDate: '',
      ToDate: '',
      rangeDate: false,
      selected: '',
      showHour: this.props.showHour || false,
      hour: '',
      minute: ''
    }
    this.onDayPress = this.onDayPress.bind(this)
  }

  componentDidMount () {
    LocaleConfig.defaultLocale = 'ind'
  }

  onChange = (timestamp) => {
    this.setState({
      calendarTimestamp: timestamp,
      calendarDate: this.dateString(timestamp)
    })
  }

  close () {
    if (this.props.initValue) {
      const initValue = this.props.initValue
      this.setState({selection: initValue})
    }

    this.setState({
      modalVisible: false
    })
    this.props.closeModal(this.state.modalVisible)
  }

  open () {
    this.setState({
      modalVisible: true
    })
    this.props.openModal(this.state.modalVisible)
  }

  renderChildren () {
    if (this.props.children) {
      return this.props.children
    }
    return (
      <Text>Please Select an Item!</Text>
    )
  }

  onOkCalendar (timestamp) {
    const { hour, minute, showHour } = this.state
    this.props.onChange(timestamp)

    if (showHour) {
      this.props.changeHour(hour, minute)
    }
    this.setState({
      modalVisible: false
    })
  }

  dateString (timestamp) {
    moment.locale()
    var day = moment(timestamp)
    var dateStr = moment(day).format('dddd, D MMMM YYYY')
    return dateStr
  }

  onDayPress (day) {
    if (this.props.rangeDateChoose) {
      let markedDates = this.state.markedDates
      if (this.state.isFromDatePicked === false) {
        markedDates[day.dateString] = {selected: true, startingDay: true, color: '#AED8D6'}
        this.setState({
          isFromDatePicked: true,
          rangeDate: true,
          FromDate: day.dateString,
          calendarTimestamp: [day.timestamp],
          markedDates: markedDates
        })
      } else {
        if (this.state.isToDatePicked === false) {
          let fromDate = moment(this.state.FromDate)
          let toDate = moment(day.dateString)
          let range = toDate.diff(fromDate, 'days')
          if (range > 0) {
            for (var i = 1; i <= range; i++) {
              let tempDate = fromDate.add(1, 'day').format('YYYY-MM-DD')
              if (i < range) {
                markedDates[tempDate] = {selected: true, color: '#AED8D6'}
              } else {
                markedDates[tempDate] = {selected: true, endingDay: true, color: '#AED8D6'}
              }
            }
            this.setState({
              isToDatePicked: true,
              ToDate: day.dateString,
              calendarTimestamp: [...this.state.calendarTimestamp, day.timestamp],
              markedDates: markedDates
            })
          } else {
          }
        } else {
          this.setState({
            markedDates: {},
            isFromDatePicked: false,
            isToDatePicked: false,
            rangeDate: false,
            FromDate: '',
            ToDate: ''
          })
        }
      }
    } else {
      this.setState({
        selected: day.dateString,
        calendarTimestamp: day.timestamp,
        calendarDate: this.dateString(day.timestamp)
      })
    }
  }

  endDateCheck (end, start) {
    if (end) {
      // var x = this.startDateReplace(start)
      // var day = moment(end)
      // var dayStr = moment(day).format('D')
      // var monthStr = this.convertMMMId(day)
      // var yearStr = moment(day).format('YYYY')
      // return x + ' - ' + dayStr + monthStr + yearStr

      var starts = moment(start)
      var startDay = moment(starts).format('D')
      var startMonth = this.convertMMMId(starts)
      var startYear = moment(starts).format('YYYY')

      var ends = moment(end)
      var endDay = moment(ends).format('D')
      var endMonth = this.convertMMMId(ends)
      var endYear = moment(ends).format('YYYY')

      if (startYear === endYear) {
        if (startMonth === endMonth) {
          return `${startDay} - ${endDay} ${endMonth} ${endYear}`
        } else {
          return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
        }
      } else {
        return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
      }
    }
    let date = this.maskedDate(start)
    return date
  }

  startDateReplace (data) {
    var day = moment(data)
    var dayStr = moment(day).format('D')
    var monthStr = this.convertMMMId(day)
    return dayStr + monthStr
  }

  formatHeaderCalendar (data) {
    // if (this.state.rangeDate) {
    //   var b = this.endDateCheck(this.state.ToDate, this.state.FromDate)
    //   return (
    //     <Text style={[styles.headerCalendar, {flex: 1}]}>
    //       {b}
    //     </Text>
    //   )
    // } else {
    //   let date = this.maskedDate(data)
    //   return (
    //     <Text style={[styles.headerCalendar, {flex: 1}]}>
    //       {date}
    //     </Text>
    //   )
    // }
    moment.locale()
    let date = this.maskedDate(data)
    let day = moment(data)
    let year = moment(day).format('YYYY')
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textDate}>
            {date}
          </Text>
          <Text style={styles.textYear}>
            {year}
          </Text>
        </View>
        <View style={{ height: ratioHeight(2), width: ratioWidth(12), backgroundColor: Colors.nice_blue }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.textDate}>
            {date}
          </Text>
          <Text style={styles.textYear}>
            {year}
          </Text>
        </View>
      </View>
    )
  }

  onChangeMonth (value) {
    this.setState({calendarTimestamp: value, calendarDate: this.dateString(value)})
  }

  onHourChange (hour, minute) {
    const { showHour } = this.state
    if (showHour) {
      this.setState({
        hour: hour,
        minute: minute
      })
    }
  }

  convertDayId (value) {
    var day = moment(value).format('dddd')
    if (day === 'Sunday') {
      return 'Minggu, '
    } else if (day === 'Monday') {
      return 'Senin, '
    } else if (day === 'Tuesday') {
      return 'Selasa, '
    } else if (day === 'Wednesday') {
      return 'Rabu, '
    } else if (day === 'Thursday') {
      return 'Kamis, '
    } else if (day === 'Friday') {
      return 'Jumat, '
    } else if (day === 'Saturday') {
      return 'Sabtu, '
    }
  }

  convertMonthId (value) {
    var month = moment(value).format('MMMM')
    if (month === 'January') {
      return ' Januari '
    } else if (month === 'February') {
      return ' Februari '
    } else if (month === 'March') {
      return ' Maret '
    } else if (month === 'April') {
      return ' April '
    } else if (month === 'May') {
      return ' Mei '
    } else if (month === 'June') {
      return ' Juni '
    } else if (month === 'July') {
      return ' Juli '
    } else if (month === 'August') {
      return ' Agustus '
    } else if (month === 'September') {
      return ' September '
    } else if (month === 'October') {
      return ' Oktober '
    } else if (month === 'November') {
      return ' November '
    } else if (month === 'December') {
      return ' Desember '
    }
  }

  convertMMMId (value) {
    var month = moment(value).format('MMM')
    if (month === 'Jan') {
      return ' Jan '
    } else if (month === 'Feb') {
      return ' Feb '
    } else if (month === 'Mar') {
      return ' Mar '
    } else if (month === 'Apr') {
      return ' Apr '
    } else if (month === 'May') {
      return ' Mei '
    } else if (month === 'Jun') {
      return ' Jun '
    } else if (month === 'Jul') {
      return ' Jul '
    } else if (month === 'Aug') {
      return ' Agu '
    } else if (month === 'Sep') {
      return ' Sep '
    } else if (month === 'Oct') {
      return ' Okt '
    } else if (month === 'Nov') {
      return ' Nov '
    } else if (month === 'Dec') {
      return ' Des '
    }
  }

  maskedDate (timestamp) {
    moment.locale()
    var day = moment(timestamp)
    var dayId = moment(day).format('D')
    var monthStr = this.convertMonthId(day)
    return dayId + monthStr
  }

  renderCalendar () {
    const { calendarTimestamp, calendarDate } = this.state
    const monthRange = (new Date().getFullYear() - 1960) * 12
    let markedDatess
    markedDatess = {[this.state.selected]: {selected: true}}
    // if (this.props.rangeDateChoose) {
    //   markedDatess = {...this.state.markedDates}
    // } else {
    //   markedDatess = {[this.state.selected]: {selected: true}}
    // }
    return (
      <View style={styles.viewModal} onPress={() => this.setState({ modalVisible: true })}>
        <View style={styles.viewAllCalender}>
          <MonthYear
            dateNow={this.state.calendarTimestamp}
            onMonthYearChange={(value) => this.onChangeMonth(value)}
            onHourChange={(hour, minute) => this.onHourChange(hour, minute)}
            showHour={this.state.showHour}
            >
            <View style={{marginHorizontal: ratioWidth(15), marginVertical: ratioHeight(12), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {this.formatHeaderCalendar(calendarDate)}
              {/* <Image source={Images.ic_arrow_blue_right} style={{width: ratioWidth(8), height: ratioHeight(12)}} resizeMode={'stretch'} /> */}
            </View>
          </MonthYear>
          <View style={styles.separator} />
          <View style={styles.viewCalendar}>
            <CalendarList
              current={calendarTimestamp}
              pastScrollRange={monthRange}
              futureScrollRange={1}
              onDayPress={this.onDayPress}
              style={styles.calendar}
              markedDates={markedDatess}
              hideArrows={false}
              hideExtraDays
              theme={{
                backgroundColor: Colors.white_two,
                selectedDayBackgroundColor: Colors.greyish,
                selectedDayTextColor: Colors.white_two,
                borderRadius: 0,
                arrowColor: Colors.squash,
                textSectionTitleColor: Colors.squash,
                todayTextColor: Colors.squash,
                dayTextColor: Colors.slate_grey,
                monthTextColor: Colors.greyish,
                textDisabledColor: Colors.greyish,
                textDayFontFamily: Fonts.type.robotoRegular,
                textMonthFontFamily: Fonts.type.robotoMedium,
                textDayHeaderFontFamily: Fonts.type.robotoRegular,
                textDayFontSize: moderateScale(12),
                textMonthFontSize: moderateScale(12),
                textDayHeaderFontSize: moderateScale(12),
                'stylesheet.calendar.header': {
                  header: {
                    borderTopColor: Colors.black_15,
                    borderTopWidth: 1,
                    marginTop: ratioHeight(10),
                    paddingVertical: ratioHeight(10),
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingHorizontal: 10
                  },
                  monthText: {
                    fontSize: moderateScale(12),
                    fontFamily: Fonts.type.robotoRegular,
                    color: Colors.greyish
                  }
                }
              }}
              monthFormat={'MMMM yyyy'}
              firstDay={1}
              markingType={'interactive'}
            />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.white_two }]} onPress={() => this.setState({ modalVisible: false })}>
              <Text style={[styles.textCalendar, { color: Colors.nice_blue }]}>
                Batal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonCalendar, { backgroundColor: Colors.nice_blue }]} onPress={() => this.onOkCalendar(calendarTimestamp)}>
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
    const dp = (
      <Modal
        ref='modal'
        transparent
        animationType={this.state.animationType}
        visible={this.state.modalVisible}
        onRequestClose={this.close}>
        <TouchableWithoutFeedback>
          <View style={{backgroundColor: Colors.black_15, flex: 1}}>
            {this.renderCalendar()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
    return (
      <View>
        {dp}
        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    )
  }
}

CalendarComponent.propTypes = propTypes
CalendarComponent.defaultProps = defaultProps
