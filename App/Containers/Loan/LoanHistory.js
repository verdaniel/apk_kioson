import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import * as Progress from 'react-native-progress'
import moment from 'moment'
import { extendMoment } from 'moment-range'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images } from '../../Themes'
import CustomCalendar from '../../Components/CustomCalendar'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import { price, convertShortMonthId } from '../../Transforms/LocalConfig'
import { moderateScale } from '../../Transforms/Scaling'
import NoContentTab from '../../Components/NoContentTab'
import { ratioWidth } from '../../Transforms/Resize'

// Styles
import styles from '../Styles/LoanHistoryStyle'
const momentRange = extendMoment(moment)

class LoanHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // data: []
      data: [
        {
          'name': 'Pinjaman Saldo',
          'amount': '1000000',
          'item': '',
          'date': 1511335876000,
          'paid': '250000',
          'timeLeft': 5
        },
        {
          'name': 'Pinjaman Gadget',
          'amount': '1000000',
          'item': 'Samsung J2 Prime',
          'date': 1511335876000,
          'paid': '250000',
          'timeLeft': 9
        }
      ],
      loanService: [
        {
          operator: 'DANAMAS',
          id: 1
        }
      ],
      loanStatus: [
        {
          operator: 'Berlangsung',
          id: 1
        },
        {
          operator: 'Lunas',
          id: 2
        }
      ],
      loanType: [
        {
          operator: 'Gadget',
          id: 1
        },
        {
          operator: 'Saldo',
          id: 2
        }
      ],
      search: false,
      showCalendar: false,
      calendarMonthYear: Date.now(),
      calendarTimestamp: -1,
      dateNow: '8 Oktober - 8 Oktober 2017',
      timeStampStart: 0,
      timeStampEnd: 0
    }
  }

  renderBody () {
    return (
      <ScrollView>
        <FlatList
          data={this.state.data}
          style={this.props.style}
          renderItem={this.renderitem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    )
  }

  renderEmpty () {
    return (
      <NoContentTab type='loan' />
    )
  }

  renderitem = ({ item }) => {
    const time = moment(item.date).format('DD MMMM YYYY').toString()
    const labelPrice = item.item !== '' ? item.item + ' - Rp ' + price(item.amount) : 'Rp ' + price(item.amount)
    let textPrice = item.paid === '0' ? 'Sudah Lunas' : 'Sisa Bayar ' + price(item.paid)
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.detail()}>
        <View style={{ flexDirection: 'row', marginBottom: moderateScale(10) }}>
          <View style={styles.imageItemContainer}>
            <Image style={styles.imageDanamas} source={Images.danamas} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.titleItem, { flex: 1 }]}>{item.name}</Text>
          <Text style={styles.rincian}>Rincian</Text>
          <Image style={[styles.arrow, { tintColor: Colors.squash, marginLeft: moderateScale(10) }]} source={Images.ic_next_calendar} />
        </View>
        <Text style={styles.amount}>{labelPrice}</Text>
        <View style={{ flexDirection: 'row', marginTop: moderateScale(15), marginBottom: moderateScale(10) }}>
          <Progress.Bar
            progress={item.timeLeft / 10}
            color={Colors.squash}
            borderRadius={moderateScale(5)}
            width={ratioWidth(330)}
            unfilledColor={Colors.white}
            borderColor={Colors.white}
            height={moderateScale(10)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.label, { flex: 1 }]}>{time}</Text>
          <Text style={styles.label}>{textPrice}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderSearch () {
    if (this.state.data.length > 0) {
      return (
        <View style={{ flexDirection: 'row', padding: moderateScale(10) }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => this.openModalSearch()}
          >
            <Image source={Images.ic_search_on} style={styles.imageSearch} />
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  renderModalSearch () {
    return (
      <Modal
        animationType='slide'
        visible={this.state.search}
        transparent
        onRequestClose={() => this.setState({ search: false })}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
        <View style={styles.modal}>
          <View style={styles.navBarSearch}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ search: false })}>
              <Image source={Images.ic_close_camera} style={styles.imageClose} />
            </TouchableOpacity>
            <View style={styles.titleSearchContainer}>
              <Text style={styles.title}>{I18n.t('t_search')}</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Text style={[styles.labelBox, { marginBottom: 0 }]}>RENTANG WAKTU</Text>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ showCalendar: true })}>
                <View style={styles.buttonDate}>
                  <Text style={[styles.date, { flex: 1, color: Colors.slate_grey }]}>
                    {this.state.dateNow}
                  </Text>
                  <Image source={Images.ic_calendar} style={styles.imageCalender} />
                </View>
              </TouchableOpacity>
              <View style={{ height: moderateScale(5) }} />
              <Text style={styles.labelBox}>OPERATOR LAYANAN</Text>
              <PlaceholderModalDropdown
                title={null}
                leftIcon={Images.ic_area}
                isLeftVisible={false}
                marginTop={9}
                disabled={false}
                options={this.state.loanService}
                defaultValue={'Semua Operator'}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                borderBottom={false}
              />
              <View style={{ height: moderateScale(15) }} />
              <Text style={styles.labelBox}>STATUS PINJAMAN</Text>
              <PlaceholderModalDropdown
                title={null}
                leftIcon={Images.ic_area}
                isLeftVisible={false}
                marginTop={9}
                disabled={false}
                options={this.state.loanStatus}
                defaultValue={'Semua Status'}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                borderBottom={false}
              />
              <View style={{ height: moderateScale(15) }} />
              <Text style={styles.labelBox}>JENIS PINJAMAN</Text>
              <PlaceholderModalDropdown
                title={null}
                leftIcon={Images.ic_area}
                isLeftVisible={false}
                marginTop={9}
                disabled={false}
                options={this.state.loanType}
                defaultValue={'Semua Jenis'}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
                borderBottom={false}
              />
            </ScrollView>
          </View>
          <View style={styles.buttonFilterContainer}>
            <TouchableOpacity style={[styles.buttonFilter, { backgroundColor: Colors.nice_blue }]}>
              <Text style={styles.textFilter}>Hapus Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonFilter, { backgroundColor: Colors.squash }]}>
              <Text style={styles.textFilter}>Cari</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textList]}>
          {rowData.operator}
        </Text>
      </TouchableOpacity>
    )
  }

  renderModalCalendar () {
    var toDate = new Date()
    var numberOfDaysToAdd = 2
    toDate.setDate(toDate.getDate() + numberOfDaysToAdd)
    return (
      <CustomCalendar
        isShow={this.state.showCalendar}
        mode={'range'}
        fromDate={new Date().getTime()}
        toDate={toDate.getTime()}
        onCancel={() => this.setState({ showCalendar: false })}
        onOK={(value) => this.changeDate(value)}
      />
    )
  }

  changeDate (value) {
    var {list, month, label} = []
    var startMasking = moment(value.fromDate).format('YYYY-MM-DD')
    var endMasking = moment(value.toDate).format('YYYY-MM-DD')
    console.tron.warn(value)

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
      showCalendar: false,
      timeStampStart: value.fromDate,
      timeStampEnd: value.toDate
    })
  }

  renderButtonText (rowData) {
    const { operator } = rowData
    this.setState({
      loanServiceLabel: operator
    })
    return `${operator}`
  }

  openModalSearch () {
    this.setState({ search: true })
  }

  detail () {
    this.props.navigation.navigate('LoanDetail')
  }

  render () {
    const { data } = this.state
    const view = data.length > 0 ? (
      this.renderBody()
    ) : (
      this.renderEmpty()
    )
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={Colors.squash}
        />
        {view}
        {this.renderModalCalendar()}
        {this.renderSearch()}
        {this.renderModalSearch()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanHistory)
