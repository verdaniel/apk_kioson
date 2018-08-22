import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import couponAction from '../Redux/CouponRedux'
import styles from './Styles/CouponStyle'
import { Colors } from '../Themes/'

class Coupon extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coupon: '',
      notifCoupon: '',
      errorCoupon: false,
      discount: false,
      discountAmount: '',
      id: this.props.id,
      token: '',
      statusCoupon: -1,
      placeholder: this.props.placeholder || 'Ketik Kode Kupon',
      type: typeof this.props.type === 'undefined' ? null : this.props.type,
      keyboardFocus: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCoupon !== null) {
      if (nextProps.dataCoupon.code === 200 && nextProps.dataCoupon.status) {
        this.setState({
          notifCoupon: nextProps.dataCoupon.data.campaign_name,
          discount: true,
          discountAmount: nextProps.dataCoupon.data.amount,
          errorCoupon: false
        })
        this.props.resetCoupon()
        this.props.onPress(true, nextProps.dataCoupon.data.amount)
      } else if (!nextProps.dataCoupon.status && nextProps.dataCoupon.code !== 0) {
        this.setState({notifCoupon: nextProps.dataCoupon.message, errorCoupon: true, discount: false, discountAmount: 0})
        this.props.resetCoupon()
        this.props.onPress(false, 0)
      }
    }
  }

  onPakaiClik (value) {
    this.props.checkCoupon({
      id: this.state.id, // 756,
      coupon: value, // 'RMD10X'
      type: this.state.type,
      token: this.state.token
    })
  }

  onChangeTextCoupon = (text) => {
    this.setState({ coupon: text })
    if (text === '') {
      this.setState({ notifCoupon: '', errorCoupon: false, discount: false })
    }
  }

  onFocus () {
    // this.setState({keyboardFocus: true})
    if (this.props.onFocus === undefined) {} else {
      this.props.focus(true)
    }
  }

  onBlur () {
    // this.setState({keyboardFocus: false})
    if (this.props.onFocus === undefined) {} else {
      this.props.focus(false)
    }
  }

  render () {
    let disabled = true
    if (this.state.coupon.length > 0) {
      disabled = false
    }
    return (
      <View style={styles.form}>
        <View style={styles.padding}>
          <View style={[styles.flexRowflat]}>
            <TextInput
              style={[this.state.errorCoupon === false ? styles.inputText : styles.inputTextError]}
              value={this.state.coupon}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              maxLength={13}
              autoCorrect={false}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              onChangeText={this.onChangeTextCoupon}
              underlineColorAndroid='transparent'
              placeholder={this.state.placeholder}
              placeholderTextColor={Colors.greyish}
            />
            <TouchableOpacity
              disabled={disabled}
              style={[disabled === true ? styles.button : styles.buttonActive]}
              onPress={() => this.onPakaiClik(this.state.coupon)}>
              <Text style={[styles.textRegularBig]}>
                Pakai
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[this.state.errorCoupon === false ? styles.notifText : styles.notifTextError]}>{this.state.notifCoupon}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCoupon: state.coupon.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkCoupon: (data) => dispatch(couponAction.couponRequest(data)),
    resetCoupon: () => dispatch(couponAction.couponReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupon)
