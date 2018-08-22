import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  Image,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import I18n from 'react-native-i18n'
import * as Progress from 'react-native-progress'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { price } from '../../Transforms/LocalConfig'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth } from '../../Transforms/Resize'
import { Colors, Images } from '../../Themes'
// Styles
import styles from '../Styles/LoanDetailStyle'

class LoanDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          item: 'Samsung J2 Prime',
          userName: 'Nur Ibrahim Rosyad',
          transactionCode: '989009',
          amount: '1630598',
          adminFee: '104080',
          date: 1511335876000,
          endDate: 1511335976000,
          fine: '0',
          tenor: 6,
          installment: '289113',
          month: 1,
          status: 2
        },
        {
          item: 'Samsung J2 Prime',
          userName: 'Nur Ibrahim Rosyad',
          transactionCode: '989009',
          amount: '1630598',
          adminFee: '104080',
          date: 1511335876000,
          endDate: 1511335976000,
          fine: '0',
          tenor: 6,
          installment: '289113',
          month: 2,
          status: 1
        },
        {
          item: 'Samsung J2 Prime',
          userName: 'Nur Ibrahim Rosyad',
          transactionCode: '989009',
          amount: '1630598',
          adminFee: '104080',
          date: 1511335876000,
          endDate: 1511335976000,
          fine: '0',
          tenor: 6,
          installment: '289113',
          month: 3,
          status: 0
        }
      ],
      isCompleted: false,
      timeLeft: 7,
      date: 1511335876000,
      amount: '1000000',
      item: 'Pinjaman - Samsung J2 Prime',
      name: 'PINJAMAN GADGET',
      paid: '200000',
      invoiceId: '433WSCJCX'
    }
  }

  renderBody () {
    const { date, amount, timeLeft, name, paid, item } = this.state
    const time = moment(date).format('DD MMMM YYYY').toString()
    const labelPrice = item !== '' ? item + ' - Rp ' + price(amount) : 'Rp ' + price(amount)
    let textPrice = paid === '0' ? 'Sudah Lunas' : 'Sisa Bayar ' + price(paid)
    return (
      <View style={styles.bodyContainer}>
        <View style={{ flexDirection: 'row', marginBottom: moderateScale(10) }}>
          <View style={styles.imageItemContainer}>
            <Image style={styles.imageDanamas} source={Images.danamas} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.titleItem, { flex: 1 }]}>{name}</Text>
        </View>
        <Text style={styles.amount}>{labelPrice}</Text>
        <View style={{ flexDirection: 'row', marginTop: moderateScale(15), marginBottom: moderateScale(10) }}>
          <Progress.Bar
            progress={timeLeft / 10}
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
        {this.renderList()}
      </View>
    )
  }

  renderList () {
    const { invoiceId, date } = this.state
    const time = moment(date).format('DD MMMM YYYY - h:mm').toString()
    return (
      <View style={styles.listContainer}>
        <View style={styles.detailContainer}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={[styles.titleItem, {fontWeight: '0'}]}>{I18n.t('l_order')} : {invoiceId}</Text>
            <Text style={[styles.label, {fontWeight: '500', marginTop: moderateScale(3)}]}>{time}</Text>
          </View>
          <View style={styles.approved}>
            <Text style={[styles.installment, { marginBottom: 0, fontSize: moderateScale(10) }]}>DISETUJUI</Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          style={this.props.style}
          renderItem={this.renderitem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  renderitem = ({ item }) => {
    const timeLoan = moment(item.date).format('DD/MM/YYYY').toString()
    const endDate = moment(item.endDate).format('DD/MM/YYYY').toString()
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.installment}>{I18n.t('l_installmentTo')} - {item.month}</Text>
        {this.renderData(I18n.t('l_product'), this.state.item)}
        {this.renderData(I18n.t('l_orperatorservice'), 'Danamas')}
        {this.renderData(I18n.t('l_name'), item.userName)}
        {this.renderData(I18n.t('l_transactioncode'), item.transactionCode)}
        {this.renderData(I18n.t('l_productprice'), 'Rp ' + price(item.amount))}
        {this.renderData(I18n.t('l_loandate'), timeLoan)}
        {this.renderData(I18n.t('l_adminfee'), 'Rp ' + price(item.adminFee))}
        {this.renderData(I18n.t('l_tenor'), item.tenor + ' ' + I18n.t('l_month'))}
        {this.renderData(I18n.t('l_limitpayment'), endDate)}
        {this.renderData(I18n.t('l_fine'), 'Rp ' + price(item.fine))}
        {this.renderData(I18n.t('l_installmentTo') + ' ' + item.month, 'Rp ' + price(item.installment))}
        {this.renderButton(item.status)}
      </View>
    )
  }

  renderData (label, data) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(3) }}>
        <Text style={[styles.label, {flex: 3}]}>{label}</Text>
        <Text style={[styles.label, {flex: 5}]}>: {data}</Text>
      </View>
    )
  }

  renderButton (status) {
    switch (status) {
      case 0:
        return (
          <View style={styles.buttonPaymentContainer}>
            <View style={styles.buttonOff}>
              <Text style={styles.textButton}>{I18n.t('b_printproof')}</Text>
            </View>
            <View style={styles.buttonOff}>
              <Text style={styles.textButton}>{I18n.t('l_payinstallment')}</Text>
            </View>
          </View>
        )
      case 1:
        return (
          <View style={styles.buttonPaymentContainer}>
            <TouchableOpacity
              style={[styles.buttonOff, {backgroundColor: Colors.nice_blue}]}
              onPress={() => this.print()}
            >
              <Text style={styles.textButton}>{I18n.t('b_printproof')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOff, {backgroundColor: Colors.squash}]}
              onPress={() => this.pay()}
            >
              <Text style={styles.textButton}>{I18n.t('l_payinstallment')}</Text>
            </TouchableOpacity>
          </View>
        )
      case 2:
        return (
          <View style={styles.buttonPaymentContainer}>
            <TouchableOpacity
              style={[styles.buttonOff, {backgroundColor: Colors.nice_blue}]}
              onPress={() => this.print()}
            >
              <Text style={styles.textButton}>{I18n.t('b_printproof')}</Text>
            </TouchableOpacity>
            <View style={styles.buttonOff}>
              <Text style={styles.textButton}>{I18n.t('b_paid')}</Text>
            </View>
          </View>
        )
      default:
        return (
          <View style={styles.buttonPaymentContainer}>
            <View style={styles.buttonOff}>
              <Text style={styles.textButton}>{I18n.t('b_printproof')}</Text>
            </View>
            <View style={styles.buttonOff}>
              <Text style={styles.textButton}>{I18n.t('l_payinstallment')}</Text>
            </View>
          </View>
        )
    }
  }

  print () {
    // do something
  }

  pay () {
    this.props.navigation.navigate('LoanRepayment')
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView style={styles.container}>
          {this.renderBody()}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetail)
