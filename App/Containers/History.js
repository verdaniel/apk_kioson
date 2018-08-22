import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Fonts } from '../Themes'
import NoLoginTab from '../Components/NoLoginTab'
import Tabs from '../Components/Tabs'
import HistoryTransaction from './HistoryTransaction'
import HistorySaldo from './HistorySaldo'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
import I18n from '../I18n'

class History extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  static navigationOptions = {
    tabBarLabel: ({ focused, tintColor }) => (
      <View style={styles.tabLabel}>
        <Text style={{ fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12) }}>
          Riwayat
        </Text>
      </View>
    ),
    tabBarIcon: ({ tintColor }) => (
      <View style={styles.tabIcon}>
        <Image source={Images.ic_riwayat} style={{ width: ratioWidth(24), height: ratioWidth(24), tintColor: tintColor }} resizeMode={'contain'} />
      </View>
    )
  }

  componentDidMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || typeof value === 'undefined' || value === '') {
        this.setState({ isLogin: false })
      } else {
        this.setState({ isLogin: true })
      }
    })
  }

  renderView (navigation) {
    const { isLogin } = this.state
    if (isLogin) {
      return (
          <HistoryTransaction title={I18n.t('t_riwayat_transaksi')} navigation={navigation} />
      )
    } else {
      return <NoLoginTab type='history' onPress={() => this.props.navigation.navigate('SignIn')} />
    }
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.white_two} />
        {this.renderView(navigation)}
      </View>
    )
  }
}

const styles = {
  tabLabel: {
    marginBottom: ratioHeight(10),
    justifyContent: 'center'
  },
  tabIcon: {
    height: '100%',
    paddingHorizontal: ratioWidth(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: ratioHeight(5)
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

export default connect(mapStateToProps, mapDispatchToProps)(History)
