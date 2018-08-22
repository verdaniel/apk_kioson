import React, { Component } from 'react'
import { ScrollView, Image, Text, StatusBar, View, Easing, AsyncStorage, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import SearchBox from '../../../Components/SearchBox'
import Productlist from '../../../Components/Productlist'
import Modal from 'react-native-modalbox'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'
import { Images, Fonts, Colors } from '../../../Themes'
import { moderateScale } from '../../../Transforms/Scaling'

// Styles
import styles from '../../Styles/SamsungStyle'

class Samsung extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      valueSearch: '',
      keyboardShow: true,
      modalFilter: false,
      data: [
        { id: 0, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'asamsung galaxy j1', price: 2799000, isDiscount: true, discount: 20, stock: 5 },
        { id: 1, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'csamsung galaxy j1', price: 10799000, isDiscount: true, discount: 45, stock: 0 },
        { id: 2, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'ssamsung galaxy j1', price: 6799000, isDiscount: true, discount: 30, stock: 0 },
        { id: 3, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'dsamsung galaxy j1', price: 2799000, isDiscount: false, discount: 0, stock: 5 },
        { id: 4, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'fsamsung galaxy j1', price: 2799000, isDiscount: false, discount: 0, stock: 2 },
        { id: 5, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'gsamsung galaxy j1', price: 10799000, isDiscount: true, discount: 10, stock: 3 },
        { id: 6, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'hsamsung galaxy j1', price: 6799000, isDiscount: true, discount: 60, stock: 4 },
        { id: 7, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'asamsung galaxy j1', price: 7000000, isDiscount: false, discount: 0, stock: 5 },
        { id: 8, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'bsamsung galaxy j1', price: 2000000, isDiscount: false, discount: 0, stock: 5 },
        { id: 9, image: 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', name: 'dsamsung galaxy j1', price: 6799000, isDiscount: true, discount: 25, stock: 5 }
      ],
      filter: [
        {id: 0, title: 'A - Z', isActive: true},
        {id: 1, title: 'Z - A', isActive: false},
        {id: 2, title: 'Harga Tertinggi', isActive: false},
        {id: 3, title: 'Harga Terendah', isActive: false},
        {id: 4, title: 'Diskon Terbesar', isActive: false},
        {id: 5, title: 'Diskon Terkecil', isActive: false}
      ]
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.setState({ token: value })
      }
    })
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardShow: false }))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboardShow: true }))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  onChangeText = (text) => {
    this.setState({ valueSearch: text })
  }

  filterAction (index, type) {
    const { filter, data } = this.state
    filter.map((data, i) => { data.isActive = false })
    this.setState({ ...filter })

    if (filter[index].isActive) {
      filter[index].isActive = false
      let sortedData = this.sortFunction(data, type)
      this.setState({
        ...filter,
        data: sortedData,
        modalFilter: false
      })
    } else {
      filter[index].isActive = true
      let sortedData = this.sortFunction(data, type)
      this.setState({
        ...filter,
        data: sortedData,
        modalFilter: false
      })
    }
  }

  sortFunction (array, field) {
    switch (field) {
      case 'A - Z':
        return array.sort(function (a, b) {
          return b.name - a.name
        })
      case 'Z - A':
        return array.sort(function (a, b) {
          return b.name - a.name
        }).reverse()
      case 'Harga Tertinggi':
        return array.sort(function (a, b) {
          return b.price - a.price
        })
      case 'Harga Terendah':
        return array.sort(function (a, b) {
          return b.price - a.price
        }).reverse()
      case 'Diskon Terbesar':
        return array.sort(function (a, b) {
          return b.discount - a.discount
        })
      case 'Diskon Terkecil':
        return array.sort(function (a, b) {
          return b.discount - a.discount
        }).reverse()
      default:
        break
    }
  }

  renderItemFilter = (data) => {
    const item = data.item
    return (
      <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.listFilter} onPress={() => this.filterAction(item.id, item.title)} >
        <Text style={styles.textFilter}>{item.title}</Text>
        {item.isActive ? <Image source={Images.ic_check} style={{height: ratioHeight(14), width: ratioWidth(19)}} resizeMode='contain' /> : null}
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  modalFilter (filter, modalFilter) {
    return (
      <Modal
        backdropOpacity={100}
        style={styles.modalFix}
        backButtonClose
        position={'bottom'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.transparent}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={modalFilter}
        onClosed={() => this.setState({modalFilter: false})}>
        <FlatList
          data={filter}
          renderItem={this.renderItemFilter}
          keyExtractor={item => item.id}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
            />
      </Modal>
    )
  }

  render () {
    const {valueSearch, data, keyboardShow, modalFilter, filter} = this.state
    const {navigation} = this.props
    return (
      <View style={styles.container}>
      <View style={styles.absoluteView} />
          <View style={{paddingTop: ratioHeight(10)}} >
              <SearchBox
                onChangeText={(text) => this.onChangeText(text)}
                onPress={() => this.setState({ valueSearch: '' })}
                value={valueSearch}
                onSubmitEditing={() => navigation.navigate('SearchPage', {valueSearch: valueSearch})}
                placeholder={'Cari produk…'}
               />
           </View>
         <ScrollView keyboardShouldPersistTaps='handle' >
          <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
            <View style={{flex: 1}}>
              <Productlist data={data} extraData={this.state} navigation={navigation} />
            </View>
         </ScrollView>
        {keyboardShow === true ? <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({modalFilter: !modalFilter})} style={styles.placeFilter}>
          <Image source={Images.ic_filter_color} style={styles.imageFilter} resizeMode='contain' />
          <Text style={[styles.textPrice, {fontFamily: Fonts.type.robotoMedium, fontSize: moderateScale(14)}]}>URUTKAN</Text>
        </TouchableOpacity> : null}
        {this.modalFilter(filter, modalFilter)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Samsung)
