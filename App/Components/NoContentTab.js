import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import { Images, Colors } from '../Themes'
import I18n from '../I18n'
import styles from './Styles/NoContentTabStyle'
import { ratioHeight } from '../Transforms/Resize'

export default class NoContentTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: this.props.type
    }
  }

  render () {
    const { type } = this.state
    let image, title, description, style
    switch (type) {
      case 'history':
        image = Images.historyNoContent
        title = I18n.t('l_nocontenthistory')
        description = I18n.t('l_nocontenthistorydescription')
        style = null
        break
      case 'news':
        image = Images.newsNoContent
        title = I18n.t('l_nocontentnews')
        description = I18n.t('l_nocontentnewsdescription')
        style = null
        break
      case 'refund':
        image = Images.historyNoContent
        title = I18n.t('l_nocontentrefund')
        description = I18n.t('l_nocontentrefunddescription')
        style = { backgroundColor: Colors.white, marginTop: ratioHeight(50) }
        break
      case 'performa':
        image = Images.performanceNoContent
        title = I18n.t('l_nocontentperformance')
        description = I18n.t('l_nocontentperformancedescription')
        style = { backgroundColor: Colors.white, marginTop: ratioHeight(50) }
        break
      case 'loan':
        image = Images.historyNoContent
        title = I18n.t('l_nocontentloan')
        description = I18n.t('l_nocontentloandescription')
        style = { backgroundColor: Colors.white, marginTop: ratioHeight(50) }
        break
      case 'loanhistory':
        image = Images.empty_loan_history
        title = I18n.t('l_nocontentloan')
        description = I18n.t('l_noloanhistory')
        style = { backgroundColor: Colors.white, marginTop: ratioHeight(40) }
        break
      default:
        break
    }
    return (
      <View style={[styles.notLoginContainer, style]}>
        <Image source={image} style={styles.banner} />
        <Text style={styles.textTitle}>
          {title}
        </Text>
        <Text style={styles.textDescription}>
          {description}
        </Text>
      </View>
    )
  }
}
