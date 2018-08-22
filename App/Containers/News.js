import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import NoLoginTab from '../Components/NoLoginTab'
import { Images, Colors, Fonts } from '../Themes'
import Tabs from '../Components/Tabs'
import NewsInfo from './NewsInfo'
import NewsPromo from './NewsPromo'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
import I18n from '../I18n'

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countNotif: 0,
      isLogin: false
    }
  }

  static navigationOptions ({ navigation }) {
    return {
      tabBarLabel: ({ focused, tintColor }) => (
        <View style={styles.tabLabel}>
          <Text style={{fontFamily: focused ? Fonts.type.productSansBold : Fonts.type.productSansRegular, color: tintColor, fontSize: moderateScale(12)}}>
            Berita
          </Text>
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabIcon}>
          <Image source={Images.ic_berita} style={[styles.imgIcon, {tintColor: tintColor}]} />
          {navigation.state.badge !== 0 &&
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {navigation.state.badge}
            </Text>
          </View>
          }
        </View>
      )
    }
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
        <Tabs>
          <NewsInfo title={I18n.t('t_berita_informasi')} navigation={navigation} />
          <NewsPromo title={I18n.t('t_berita_promo')} navigation={navigation} />
        </Tabs>
      )
    } else {
      return <NoLoginTab type='news' onPress={() => this.props.navigation.navigate('SignIn')} />
      // return <NewsPromo title={I18n.t('')} navigation={navigation} />
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
  },
  imgIcon: {
    width: ratioWidth(24),
    height: ratioWidth(24),
    resizeMode: 'contain'
  },
  badge: {
    position: 'absolute',
    top: ratioHeight(12),
    right: ratioWidth(5),
    width: ratioWidth(15),
    height: ratioWidth(15),
    borderRadius: moderateScale(15),
    backgroundColor:
    Colors.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: Colors.white_two,
    fontFamily: Fonts.productSansBold,
    fontSize: moderateScale(8)
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.newsInfo.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
