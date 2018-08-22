import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/MenuBoardbandTvStyle'

import Tabs from '../../../Components/Tabs'
import CashBalance from '../../../Components/CashBalance'
import I18n from '../../../I18n'
import CableTvPayment from './CableTvPayment'
import FormInternet from './InternetPayment'

class MenuBoardbandTv extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <Tabs>
          <CableTvPayment title={I18n.t('l_cableTv')} navigation={navigation} />
          <FormInternet title={I18n.t('l_internet')} navigation={navigation} />
        </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBoardbandTv)
