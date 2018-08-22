import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/HeaderStyle'
import { Fonts, Images } from '../Themes'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import Colors from '../Themes/Colors'
import { moderateScale } from '../Transforms/Scaling'

class Header extends Component {
  static propTypes = {
    bgColor: PropTypes.string,
    titleColor: PropTypes.string,
    rightVisible: PropTypes.bool,
    iconRight: PropTypes.number,
    actions: PropTypes.func,
    iconLeft: PropTypes.number,
    elevation: PropTypes.number,
    params: PropTypes.string,
    isNotifVisible: PropTypes.bool,
    countNotif: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    bgColor: Colors.squash,
    rightVisible: false,
    iconRight: Images.ic_user,
    titleColor: Colors.white_two,
    iconLeft: Images.ic_back,
    elevation: 0,
    params: 'lol',
    isNotifVisible: false,
    countNotif: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      title: this.props.title,
      navigation: this.props.navigation,
      error: false
    }
  }

  componentWillMount () {
    if (this.props.dataError.error) {
      this.setState({
        error: true
      })
    } else if (!this.props.dataError.error) {
      this.setState({
        error: false
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataError.error) {
      this.setState({
        error: true
      })
    } else if (!nextProps.dataError.error) {
      this.setState({
        error: false
      })
    }
  }

  renderRight (visibele, iconRight, actions, isNotifVisible, countNotif) {
    if (visibele) {
      return (
        <TouchableOpacity style={styles.viewRight}
          onPress={() => this.props.navigation.navigate(actions, this.props.params)} >
          <Image source={iconRight} resizeMode={'contain'} style={{width: ratioWidth(24), height: ratioHeight(22)}} />
          {isNotifVisible ? <View style={styles.notif}>
            <Text style={styles.textNotif}>{countNotif}</Text>
          </View> : null}
        </TouchableOpacity>
      )
    }
  }

  render () {
    const {error} = this.state
    const { iconLeft, rightVisible, iconRight, actions, bgColor, titleColor, elevation, isNotifVisible, countNotif } = this.props
    let errorView
    if (error) {
      errorView = (
        <View style={styles.error}>
          <View style={styles.containerSign}>
            <Text style={styles.sign}>!</Text>
          </View>
          <Text style={styles.text}>Tidak terhubung dengan internet.</Text>
        </View>)
    }

    return (
      <View>
        <View style={[styles.header, {backgroundColor: bgColor, elevation}]}>
          <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
            <Image source={iconLeft} style={styles.imgBack} resizeMode='stretch' />
          </TouchableOpacity>
          <View style={styles.viewHeader}>
            <Text style={[styles.textTitle, {color: titleColor}]}>
              {this.state.title}
            </Text>
          </View>
          {this.renderRight(rightVisible, iconRight, actions, isNotifVisible, countNotif)}
        </View>
        {errorView}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataError: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
