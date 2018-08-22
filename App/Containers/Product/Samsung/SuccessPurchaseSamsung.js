import React, { Component } from 'react'
import { View, ScrollView, StatusBar, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ButtonFooter from '../../../Components/ButtonFooter'
import StatusPayment from '../../../Components/StatusPayment'
import HeaderSuccessPayment from '../../../Components/HeaderSuccessPayment'
import MaskedImageSuccessPage from '../../../Components/MaskedImageSuccessPage'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from '../../Styles/SuccessPurchaseSamsungStyle'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'
import { Colors } from '../../../Themes'

class SuccessPurchaseSamsung extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 2
    }
  }

  goToHome () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'BottomNav' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  goHistory () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ screen: 'BottomNav' }),
        NavigationActions.navigate({ screen: 'History' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onPrint () {
    console.tron.log('print')
  }

  renderDetail = ({ item, index }) => {
    var data = item.product.map((data, i) => {
      var borderBottom = 0.5
      if (i === item.product.length - 1) {
        borderBottom = 0
      }
      return (
        <View style={{paddingTop: ratioHeight(7), borderBottomWidth: borderBottom, borderBottomColor: Colors.black_15}} >
          <Text numberOfLines={0} style={[styles.textRegularMedSlate, {textAlign: 'left', flex: 1}]}>#{i + 1}</Text>
          {data.map((value, i) => (
            <View style={styles.flexRow}>
              <Text numberOfLines={0} style={[styles.textRegularMedSlate, {textAlign: 'left', flex: 1}]}>{value.label}:</Text>
              <Text numberOfLines={0} style={[styles.textRegularMedSlate, {textAlign: 'center', marginRight: ratioWidth(6)}]}>:</Text>
              <Text numberOfLines={2} style={[styles.textRegularMedSlate, {textAlign: 'left', flex: 2}]}>{value.detail}</Text>
            </View>
          ))}
        </View>
      )
    }
    )
    var shippment = item.shippment.map((data, i) => {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text numberOfLines={0} style={[styles.textRegularMedSlate, {textAlign: 'left', flex: 1}]}>{data.label}</Text>
          <Text numberOfLines={0} style={[styles.textRegularMedSlate, {textAlign: 'center', marginRight: ratioWidth(6)}]}>:</Text>
          <Text numberOfLines={3} style={[styles.textRegularMedSlate, {textAlign: 'left', flex: 2}]}>{data.detail}</Text>
        </View>
      )
    })
    return (
      <View>
        {data}
        <Text style={[styles.textRegularLarge, {borderBottomWidth: 0.5, borderBottomColor: Colors.black_15}]}>Informasi Penerima</Text>
        {shippment}
      </View>
    )
  }

  render () {
    const { params } = this.props.navigation.state
    const { navigation } = this.props
    let isDisable = true
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <HeaderSuccessPayment loan={this.state.loan} navigates={'Help'} navigation={navigation} />
          <StatusPayment
            loan={this.state.loan}
            status={this.state.status}
            isDisable={isDisable}
            onPressPrint={() => this.onPrint()}
        />
          <View style={styles.flexBigColumn} >
            <View style={styles.viewInside}>
              <MaskedImageSuccessPage source={params.icon} />
              {params.component}
            </View>
            <View style={styles.header}>
              <View style={styles.borderBottom}>
                <Text style={styles.textRegularLarge}>Informasi Produk</Text>
              </View>
              <View style={[styles.borderBottom, {borderBottomWidth: 0}]}>
                <FlatList
                  data={params.dataDetail}
                  renderItem={this.renderDetail}
              />
              </View>
            </View>
            <ButtonFooter
              onPressHome={() => this.goToHome()}
              onPressHistory={() => this.props.navigation.navigate('History')} />
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPurchaseSamsung)
