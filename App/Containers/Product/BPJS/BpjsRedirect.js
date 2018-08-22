import React, { Component } from 'react'
import { ScrollView, View, StatusBar, FlatList, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ButtonForm from '../../../Components/ButtonForm'
import I18n from '../../../I18n'
import {Colors} from '../../../Themes/'
import { ratioHeight } from '../../../Transforms/Resize'
import Images from '../../../Themes/Images'
import CashBalance from '../../../Components/CashBalance'
import LoadingModal from '../../../Components/Loading'
import PlaceholderModalDropdown from '../../../Components/PlaceholderModalDropdown'

// Styles
import styles from '../../Styles/BpjsRedirectStyle'

class BpjsRedirect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      monthAmount: I18n.t('p_monthAmount'),
      monthValue: '',
      listMonth: [
        {lable: '1 Bulan', value: 1},
        {lable: '2 Bulan', value: 2},
        {lable: '3 Bulan', value: 3},
        {lable: '4 Bulan', value: 4},
        {lable: '5 Bulan', value: 5},
        {lable: '6 Bulan', value: 6}
      ],
      month: ''
    }
  }

  renderDetail = ({ item, index }) => {
    return (
      <View style={styles.flexRow}>
        <Text numberOfLines={0} style={[styles.textRegularMed, {textAlign: 'left', flex: 1}]}>{item.label}</Text>
        <Text numberOfLines={2} style={[styles.textMediumHeader, {textAlign: 'right', flex: 1}]}>{item.detail}</Text>
      </View>
    )
  }

  renderRow (rowData, rowID, highlighted) {
    return (
      <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
        <Text style={[styles.textFieldDropDown]}>
          {rowData.lable}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtonText (rowData) {
    const { editable } = this.state
    const { lable, value } = rowData
    this.setState({
      monthAmount: lable,
      monthValue: value,
      editable: { ...editable, phoneNumber: true }
    })
    return `${lable}`
  }

  checkFrom (monthValue) {
    if (monthValue !== '') {
      return false
    } else {
      return true
    }
  }

  order () {
    const { navigate } = this.props.navigation
    const dataDetail = [
      { label: I18n.t('l_participantsNumber'), detail: '123333333' },
      { label: I18n.t('l_phonenumber'), detail: '081212345678' },
      { label: I18n.t('l_participantsName'), detail: 'Adele Grande' },
      { label: I18n.t('l_amountMember'), detail: '2 Anggota' },
      { label: I18n.t('l_premiprice'), detail: 'Rp. 50.000,-' },
      { label: I18n.t('l_branch'), detail: 'Martapura' }
    ]
    const data = {
      charge: 6500,
      actual_amount: 300000,
      total_amount: 365000
    }
    navigate('BpjsPaymentConfirmation',
      {
        dataDetail: dataDetail,
        titleForm: 'BPJS Kesehatan',
        dataConfirmation: data
      })
  }

  render () {
    const { params } = this.props.navigation.state
    const { monthAmount, listMonth, monthValue } = this.state
    const { navigation } = this.props
    var isButtonDisable = this.checkFrom(monthValue)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <View style={[styles.borderBottom, {borderBottomWidth: 0}]}>
                <FlatList
                  data={params.dataDetail}
                  renderItem={this.renderDetail}
              />
              </View>
            </View>
            <View style={{backgroundColor: Colors.white_two, marginTop: ratioHeight(10)}}>
              <PlaceholderModalDropdown
                title={I18n.t('l_numberOfMonths')}
                leftIcon={Images.ic_calendarSmall}
                isLeftVisible
                marginTop={9}
                disabled={false}
                options={listMonth}
                defaultValue={monthAmount}
                renderRow={this.renderRow.bind(this)}
                renderButtonText={(rowData) => this.renderButtonText(rowData)}
            />
            </View>
          </View>
          <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
            <ButtonForm
              onPress={() => this.order()}
              disabled={isButtonDisable}
            />
          </View>
          <LoadingModal visible={false} onRequestClose={() => this.props.navigation.goBack()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BpjsRedirect)
