import React, { Component } from 'react'
import { Platform, BackHandler } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

// here is our redux-aware our smart component
/* function ReduxNavigation (props) {
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })

  return <AppNavigation navigation={navigation} />
} */

class ReduxNavigation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countNotif: 0
    }
  }

  componentWillMount () {
    if (Platform.OS !== 'android') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      if (nav.index === 0) {
        return false
      } else if (nav.routes[nav.routes.length - 1].routeName === 'SuccessPurchase') {
        const backAction = NavigationActions.back({
          key: nav.routes[2].key
        })
        dispatch(backAction)
        return true
      }
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress')
  }

  componentWillReceiveProps (newProps) {
    const { news } = newProps
    if (news) {
      if (news.code === 200 && news.status) {
        if (news.data.length > 0) {
          var count = 0
          news.data.map((value) => {
            if (value.is_read === true) count++
          })

          this.setState({ countNotif: count })
        }
      }
    }
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  };

  render () {
    var navNew
    const { dispatch, nav } = this.props
    if (nav.routes[0].routeName === 'BottomNav') {
      var routes = nav.routes
      var routess = nav.routes[0]
      var routesss = routess.routes
      routesss.splice(3, 1, { ...routesss[3], badge: this.state.countNotif })
      routes.splice(0, 1, { ...routess, route: routesss })
      navNew = { ...nav, routes: routes }
    } else {
      navNew = nav
    }

    const navigation = addNavigationHelpers({
      dispatch,
      state: navNew
    })

    return <AppNavigation navigation={navigation} /> // screenProps={{ badge: this.state.countNotif }} />
  }
}

// const mapStateToProps = ({ nav }) => ({ nav })
const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    news: state.news.newsInfo.payload
  }
}
export default connect(mapStateToProps)(ReduxNavigation)
