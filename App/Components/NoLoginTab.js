import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import I18n from '../I18n'
import styles from './Styles/NoLoginTabStyle'

export default class NoLoginTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: this.props.type
    }
  }

  render () {
    const { type } = this.state
    let image, title, description
    switch (type) {
      case 'history':
        image = Images.historyNotLogin
        title = I18n.t('l_nohistory')
        description = I18n.t('l_nohistorydescription')
        break
      case 'performance':
        image = Images.performanceNotLogin
        title = I18n.t('l_noperformance')
        description = I18n.t('l_noperformancedescription')
        break
      case 'news':
        image = Images.newsNotLogin
        title = I18n.t('l_nonews')
        description = I18n.t('l_nonewsdescription')
        break
      case 'profile':
        image = Images.profileNotLogin
        title = I18n.t('l_noprofile')
        description = I18n.t('l_noprofiledescription')
        break
      default:
        break
    }
    return (
      <View style={styles.notLoginContainer}>
        <Image source={image} style={styles.banner} />
        <Text style={styles.textTitle}>
          {title}
        </Text>
        <Text style={styles.textDescription}>
          {description}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.buttonSignIn} onPress={() => this.props.onPress()}>
            <Text style={styles.textButton}>
              {I18n.t('b_signin')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
