import { TabNavigator } from 'react-navigation'
import React from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import Account from '../Containers/Account'
import News from '../Containers/News'
import Perform from '../Containers/Perform'
import History from '../Containers/History'
import Home from '../Containers/Home'
import { Images, Colors, Fonts } from '../Themes'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'

const BottomNav = TabNavigator({
  Home: {
    screen: Home
  },
  History: {
    screen: History
  },
  Perform: {
    screen: Perform
  },
  News: {
    screen: News
  },
  Account: {
    screen: Account
  }
}, {
  tabBarPosition: 'bottom',
  animatedEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    upperCaseLabel: false,
    activeTintColor: Colors.white_two,
    inactiveTintColor: Colors.white_65,
    showIcon: true,
    indicatorStyle: {
      height: ratioHeight(4),
      backgroundColor: Colors.white_two
    },
    style: {
      height: ratioHeight(57),
      backgroundColor: Colors.squash
    },
    iconStyle: {
      width: '100%',
      height: '100%',
      justifyContent: 'center'
      // backgroundColor: 'blue'
    },
    tabStyle: {
      height: ratioHeight(57),
      opacity: 1
    }
  }
})

export default BottomNav
