import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../../Themes/index'
import Tabs from '../../../Components/Tabs'
import PlnPrePaid from './PlnPrePaid'
import PlnPostPaid from './PlnPostPaid'
import CashBalance from '../../../Components/CashBalance'
import I18n from '../../../I18n'

// Styles
import styles from '../../Styles/PlnStyle'

class Pln extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    const isPostPaid = (params) && (params.item.type === 'power')

    this.state = {
      isPostPaid,
      activeTab: (params) && (isPostPaid ? 1 : 0),
      data: (params) && params.item
    }
  }

  render () {
    const { navigation } = this.props
    const { activeTab, isPostPaid, data } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <CashBalance navigation={navigation} />
        <Tabs activeTab={activeTab} >
          <PlnPrePaid data={!isPostPaid && data} title={I18n.t('t_token_listrik')} navigation={navigation} />
          <PlnPostPaid data={isPostPaid && data} title={I18n.t('t_tagihan_listrik')} navigation={navigation} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Pln)
