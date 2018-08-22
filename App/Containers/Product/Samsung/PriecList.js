import React, { Component } from 'react'
import {
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion'
import RechargeMobileRedux from '../../../Redux/RechargeMobileRedux'
import RechargeMobileDataRedux from '../../../Redux/RechargeMobileDataRedux'
import LoadingModal from '../../../Components/Loading'
import { moderateScale } from '../../../Transforms/Scaling'
import { Fonts, Images, Colors } from '../../../Themes/'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'
import ThousandFormat from '../../../Services/ThousandFormat'

import styles from '../../Styles/PriecListStyle'

class PriecList extends Component {
  constructor (props) {
    super(props)
    const {state} = this.props.navigation
    this.submitting = {
      confirmation: false,
      getPresetType: state.params.tabsActieve
    }
    this.state = {
      token: '',
      data: [],
      modalLodaing: true,
      activeSection: false,
      collapsed: true
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        if (this.submitting.getPresetType === 'pulsa') {
          this.props.getPresetRechargeMobile(value)
        } else {
          this.props.getPresetRechargeMobileData(value)
        }
        this.setState({
          token: value
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    const { presetMobile, presetMobileData } = nextProps
    const { getPresetType } = this.submitting

    if (getPresetType === 'pulsa') {
      if (presetMobile !== null) {
        if (presetMobile.code === 200 && presetMobile.status) {
          if (presetMobile.data.length !== 0) {
            this.setState({
              data: presetMobile.data,
              modalLodaing: false
            })
          }
        } else if (!presetMobile.status && presetMobile.code !== 0) {
          ToastAndroid.show(presetMobile.message, ToastAndroid.SHORT)
          this.setState({
            modalLodaing: false
          })
          presetMobile.code = 0
        }
      }
    } else {
      if (presetMobileData !== null) {
        if (presetMobileData.code === 200 && presetMobileData.status) {
          if (presetMobileData.data.length !== 0) {
            this.setState({
              data: presetMobileData.data,
              modalLodaing: false
            })
          }
        } else if (!presetMobileData.status && presetMobileData.code !== 0) {
          ToastAndroid.show(presetMobileData.message, ToastAndroid.SHORT)
          this.setState({
            modalLodaing: false
          })
          presetMobileData.code = 0
        }
      }
    }
  }

  onRequestClose () {
    this.setState({modalLodaing: false})
    this.props.navigation.goBack()
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  _setSection (section) {
    this.setState({ activeSection: section })
  }

  _renderHeader (section, i, isActive) {
    return (
      <View duration={400} style={[styles.headerActive, {borderBottomWidth: this.widthBorder}]} transition='backgroundColor'>
        <Image source={{ uri: section.logo }} style={{height: ratioHeight(30), width: ratioWidth(30)}} resizeMode='contain' />
        <Text style={styles.headerText}>{section.operator}</Text>
        <Image source={Images.ic_down_squas} style={{height: ratioHeight(12), width: ratioWidth(12)}} resizeMode='contain' />
      </View>
    )
  }

  _renderContent (section, i, isActive) {
    var maskedPrice
    return (
      <View style={styles.content}>
        {section.service_products.map(data => {
          maskedPrice = ThousandFormat(+data.amount)
          return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: ratioWidth(10), borderBottomColor: Colors.black_15, borderBottomWidth: 0.5, paddingVertical: ratioHeight(7)}}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: Fonts.type.robotoLight,
                  fontSize: moderateScale(12),
                  color: Colors.slate_grey
                }}
              >{data.description}</Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: Fonts.type.robotoLight,
                  fontSize: moderateScale(12),
                  color: Colors.nice_blue
                }}
              >Rp. {maskedPrice}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  render () {
    const { modalLodaing, data } = this.state
    return (
      <ScrollView style={styles.container}>
        <Accordion
          activeSection={this.state.activeSection}
          sections={data}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={400}
          onChange={this._setSection.bind(this)}
          />
        <View style={{borderBottomWidth: 0.5, borderBottomColor: Colors.black_15}} />
        <LoadingModal visible={modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    presetMobile: state.rechargeMobile.getRechargeMobile.payload,
    presetMobileData: state.rechargeMobileData.getRechargeMobileData.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPresetRechargeMobile: (params) => dispatch(RechargeMobileRedux.rechargeMobileRequest(params)),
    getPresetRechargeMobileData: (params) => dispatch(RechargeMobileDataRedux.rechargeMobileDataRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriecList)
