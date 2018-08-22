import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Tabs from '../../../Components/Tabs'
import FormPulsa from './FormPulsa'
import FormPaketData from './FormPaketData'
import CashBalance from '../../../Components/CashBalance'
import I18n from '../../../I18n'

import styles from '../../Styles/MenuTopUpBalanceStyle'

class MenuTopUpBalance extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const isMobileData = (params) && (params.item.type === 'recharge-mobile-data')

    this.state = {
      visible: false,
      isMobileData,
      activeTab: (params) && (isMobileData ? 1 : 0),
      data: (params) && params.item
    }
  }

  render () {
    const { navigation } = this.props
    const { activeTab, isMobileData, data } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <Tabs activeTab={activeTab} >
          <FormPulsa data={!isMobileData && data} title={I18n.t('l_mobileRecharge')} navigation={navigation} />
          <FormPaketData data={isMobileData && data} title={I18n.t('l_mobileDataRecharge')} navigation={navigation} />
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    presetMobile: state.rechargeMobile.getRechargeMobile.payload,
    confirmationMobile: state.rechargeMobile.getConfirmationRechargeMobile.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTopUpBalance)
