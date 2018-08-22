import { LocaleConfig } from 'react-native-calendars'
import I18n from '../I18n'
import { Images } from '../Themes/index'

const moment = require('moment')

function localConfig () {
  LocaleConfig.locales['ind'] = {
    monthNames: [I18n.t('f_january'), I18n.t('f_february'), I18n.t('f_march'), I18n.t('f_april'), I18n.t('f_may'), I18n.t('f_june'), I18n.t('f_july'), I18n.t('f_august'), I18n.t('f_september'), I18n.t('f_october'), I18n.t('f_november'), I18n.t('f_december')],
    monthNamesShort: [I18n.t('s_january'), I18n.t('s_february'), I18n.t('s_march'), I18n.t('s_april'), I18n.t('s_may'), I18n.t('s_june'), I18n.t('s_july'), I18n.t('s_august'), I18n.t('s_september'), I18n.t('s_october'), I18n.t('s_november'), I18n.t('s_december')],
    dayNames: [I18n.t('f_sunday'), I18n.t('f_monday'), I18n.t('f_tuesday'), I18n.t('f_wednesday'), I18n.t('f_thursday'), I18n.t('f_friday'), I18n.t('f_saturday')],
    dayNamesShort: [I18n.t('s_sunday'), I18n.t('s_monday'), I18n.t('s_tuesday'), I18n.t('s_wednesday'), I18n.t('s_thursday'), I18n.t('s_friday'), I18n.t('s_saturday')]
  }

  LocaleConfig.defaultLocale = 'ind'
}

function price (text) {
  let temp = text.replace(/\./g, '')
  let result = ''
  let panjang = temp.length
  var j = 0
  for (var i = panjang; i > 0; i--) {
    j = j + 1
    if (((j % 3) === 1) && (j !== 1)) {
      result = temp.substr(i - 1, 1) + '.' + result
    } else {
      result = temp.substr(i - 1, 1) + result
    }
  }
  return result
}

function maskedMoney (value) {
  var number = value.toString()
  var sisa = number.length % 3
  var rupiah = number.substr(0, sisa)
  var ribuan = number.substr(sisa).match(/\d{3}/g)

  if (ribuan) {
    var separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  return 'Rp ' + rupiah
}

function convertDayId (value) {
  var dayId = moment(value).format('dddd')
  if (dayId === 'Sunday') {
    return I18n.t('f_sunday') + ', '
  } else if (dayId === 'Monday') {
    return I18n.t('f_monday') + ', '
  } else if (dayId === 'Tuesday') {
    return I18n.t('f_tuesday') + ', '
  } else if (dayId === 'Wednesday') {
    return I18n.t('f_wednesday') + ', '
  } else if (dayId === 'Thursday') {
    return I18n.t('f_thursday') + ', '
  } else if (dayId === 'Friday') {
    return I18n.t('f_friday') + ', '
  } else if (dayId === 'Saturday') {
    return I18n.t('f_saturday') + ', '
  }
}

function convertMonthId (value) {
  var dayId = moment(value).format('MMMM')
  if (dayId === 'January') {
    return ' ' + I18n.t('f_january') + ' '
  } else if (dayId === 'February') {
    return ' ' + I18n.t('f_february') + ' '
  } else if (dayId === 'March') {
    return ' ' + I18n.t('f_march') + ' '
  } else if (dayId === 'April') {
    return ' ' + I18n.t('f_april') + ' '
  } else if (dayId === 'May') {
    return ' ' + I18n.t('f_may') + ' '
  } else if (dayId === 'June') {
    return ' ' + I18n.t('f_june') + ' '
  } else if (dayId === 'July') {
    return ' ' + I18n.t('f_july') + ' '
  } else if (dayId === 'August') {
    return ' ' + I18n.t('f_august') + ' '
  } else if (dayId === 'September') {
    return ' ' + I18n.t('f_september') + ' '
  } else if (dayId === 'October') {
    return ' ' + I18n.t('f_october') + ' '
  } else if (dayId === 'November') {
    return ' ' + I18n.t('f_november') + ' '
  } else if (dayId === 'December') {
    return ' ' + I18n.t('f_december') + ' '
  }
}

function convertShortMonthId (value) {
  var dayId = moment(value).format('MMMM')
  if (dayId === 'January') {
    return ' ' + I18n.t('s_january') + ' '
  } else if (dayId === 'February') {
    return ' ' + I18n.t('s_february') + ' '
  } else if (dayId === 'March') {
    return ' ' + I18n.t('s_march') + ' '
  } else if (dayId === 'April') {
    return ' ' + I18n.t('s_april') + ' '
  } else if (dayId === 'May') {
    return ' ' + I18n.t('s_may') + ' '
  } else if (dayId === 'June') {
    return ' ' + I18n.t('s_june') + ' '
  } else if (dayId === 'July') {
    return ' ' + I18n.t('s_july') + ' '
  } else if (dayId === 'August') {
    return ' ' + I18n.t('s_august') + ' '
  } else if (dayId === 'September') {
    return ' ' + I18n.t('s_september') + ' '
  } else if (dayId === 'October') {
    return ' ' + I18n.t('s_october') + ' '
  } else if (dayId === 'November') {
    return ' ' + I18n.t('s_november') + ' '
  } else if (dayId === 'December') {
    return ' ' + I18n.t('s_december') + ' '
  }
}

function convertNumberMonth (value) {
  if (value === 1) {
    return I18n.t('f_january')
  } else if (value === 2) {
    return I18n.t('f_february')
  } else if (value === 3) {
    return I18n.t('f_march')
  } else if (value === 4) {
    return I18n.t('f_april')
  } else if (value === 5) {
    return I18n.t('f_may')
  } else if (value === 6) {
    return I18n.t('f_june')
  } else if (value === 7) {
    return I18n.t('f_july')
  } else if (value === 8) {
    return I18n.t('f_august')
  } else if (value === 9) {
    return I18n.t('f_september')
  } else if (value === 10) {
    return I18n.t('f_october')
  } else if (value === 11) {
    return I18n.t('f_november')
  } else if (value === 12) {
    return I18n.t('f_december')
  }
}

function maskedDate (timestamp) {
  moment.locale()
  var day = moment(timestamp)
  var days = moment(day).format('D')
  var dayId = convertDayId(day)
  var monthId = convertMonthId(day)
  var yearStr = moment(day).format('YYYY')
  return dayId + days + monthId + yearStr
}

function maskedShortDate (timestamp) {
  moment.locale()
  var day = moment(timestamp)
  var days = moment(day).format('D')
  var dayId = convertDayId(day)
  var monthId = convertShortMonthId(day)
  var yearStr = moment(day).format('YYYY')
  return dayId + days + monthId + yearStr
}

function maskedWithoutDay (timestamp) {
  moment.locale()
  var day = moment(timestamp)
  var days = moment(day).format('D')
  var monthId = convertMonthId(day)
  var yearStr = moment(day).format('YYYY')
  return days + monthId + yearStr
}

function maskedWithoutDayWithHour (timestamp) {
  moment.locale()
  var day = moment(timestamp)
  var days = moment(day).format('D')
  var monthId = convertMonthId(day)
  var yearStr = moment(day).format('YYYY')
  return days + monthId + yearStr
}

function maskedRangeDate (end, start) {
  var starts = moment(start)
  var startDay = moment(starts).format('D')
  var startMonth = convertMonthId(starts)
  var startYear = moment(starts).format('YYYY')

  var ends = moment(end)
  var endDay = moment(ends).format('D')
  var endMonth = convertMonthId(ends)
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

function maskedMonth (timestamp) {
  moment.locale()
  var day = moment(timestamp)
  var monthId = convertMonthId(day)
  return monthId
}

function handleError (error) {
  switch (error) {
    case 'SERVER_ERROR' :
      return I18n.t('e_server')
    case 'TIMEOUT_ERROR' :
      return I18n.t('e_timeout')
    case 'CONNECTION_ERROR' :
      return I18n.t('e_connection')
    case 'NETWORK_ERROR' :
      return I18n.t('e_network')
    case 'CANCEL_ERROR' :
      return I18n.t('e_cancel')
  }
}

function logoIdentifier (value) {
  switch (value) {
    case 'Telkom' :
      return Images.ic_telkomsel
    case 'TELKOMSEL' :
      return Images.ic_telkomsel
    case 'INDOSAT' :
      return Images.ic_indosat
    case 'XL' :
      return Images.ic_xl
    case 'THREE' :
      return Images.ic_three
    case 'Axis' :
      return Images.ic_xl
    case 'Esia' :
      return Images.ic_xl
    case 'Flexi' :
      return Images.ic_telkomsel
    case 'SMARTFREN' :
      return Images.ic_smartfren
    case 'StarOne' :
      return Images.ic_indosat
    case 'Ceria' :
      return Images.ic_xl
    case 'Byru' :
      return Images.ic_xl
    case 'INDOSAT_DATA' :
      return Images.ic_indosat
    case 'THREE_DATA' :
      return Images.ic_three
    case 'XL_PAKET_DATA' :
      return Images.ic_xl
  }
}

export {
  localConfig,
  convertDayId,
  convertMonthId,
  convertShortMonthId,
  convertNumberMonth,
  maskedDate,
  maskedShortDate,
  maskedWithoutDay,
  maskedRangeDate,
  maskedMonth,
  handleError,
  price,
  maskedMoney,
  logoIdentifier,
  maskedWithoutDayWithHour
}
