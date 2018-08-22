import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import NoLoginTab from '../Components/NoLoginTab'
import NoContentTab from '../Components/NoContentTab'
import ModalTwoButton from '../Components/ModalTwoButton'
import { Images, Metrics } from '../Themes/index'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import Button from '../Components/Button'
import ErrorNetwork from '../Components/ErrorNetwork'
import Header from '../Components/Header'
import { maskedWithoutDay } from '../Transforms/LocalConfig'
import { Colors, Fonts } from '../Themes/'

// Actions
import NewsActions from '../Redux/NewsRedux'

// Styles
import styles from './Styles/NewsPromoStyle'

const moment = require('moment')

class NewsPromo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      isReadAll: false,
      errorNetwork: false,
      isRefreshing: false,
      isLogin: this.props.dataLogin.login,
      showEmpty: false,
      selectActive: false,
      isSelected: false,
      modalVisible: false,
      selectedPromo: {},
      _rows: {},
      page: 1,
      data: [],
      requestType: 'firstLoad'
    }
  }

  static navigationOptions ({ navigation }) {
    console.tron.warn(navigation)
    return {
      header: () => (<View>
        <Header title='Promo' navigation={navigation} />
        <StatusBar barStyle='light-content' backgroundColor={'#f7981d'} />
      </View>)
    }
  }

  componentDidMount () {
    const { news } = this.props

    AsyncStorage.getItem('token').then((value) => {
      if (value === null || typeof value === 'undefined' || value === '') {
        // this.setState({ isLogin: false })
        this.setState({ token: value, isLogin: true })
        if (this.props.news === null) this.props.getNewsPromo(value)
        else {
          if (this.props.news.data.length > 0) this.setState({ page: 1, data: this.props.news.data })
          else this.setState({ showEmpty: true })
        }
      } else {
        this.setState({ token: value, isLogin: true })
        if (this.props.news === null) this.props.getNewsPromo(value)
        else {
          if (this.props.news.data.length > 0) this.setState({ page: 1, data: this.props.news.data })
          else this.setState({ showEmpty: true })
        }
      }
    })

    if (news) this.resetCheckTo(false)
  }

  _onCheckboxClick (newsId) {
    const {selectedPromo, _rows} = this.state

    if (newsId in selectedPromo) {
      delete selectedPromo[newsId]
      _rows[newsId] = {selectedText: false, checked: false}
      this.forceUpdate()

      if (_.size(selectedPromo) === 0) {
        this.setState({isSelected: false})
      }
    } else {
      selectedPromo[newsId] = newsId
      _rows[newsId] = {selectedText: true, checked: true}
      this.setState({isSelected: true})
    }
    // console.tron.warn({selectedPromo, _rows})
  }

  async _onCheckAll () {
    await this.setState({isSelected: true})
    this.resetCheckTo(true)
  }

  async onCancel () {
    await this.setState({selectActive: false, isSelected: false, selectedPromo: {}})
    this.resetCheckTo(false)
  }

  resetCheckTo (stateCheck, receiveNews) {
    const news = receiveNews || this.props.news
    const {selectedPromo} = this.state

    news.data.forEach((aNews) => {
      if (stateCheck) selectedPromo[aNews.id] = aNews.id
      this.state._rows[aNews.id] = {selectedText: stateCheck, checked: stateCheck}
    }, this)
    this.forceUpdate()
    // console.tron.warn({selectedPromo, _rows})
  }

  componentWillReceiveProps (newProps) {
    const { isLogin, requestType } = this.state
    const { news } = newProps
    if (requestType === 'firstLoad') {
      if (isLogin) {
        if (news) {
          if (news.code === 200 && news.status) {
            if (news.data.length > 0) this.setState({ page: 1, data: news.data })
            else this.setState({ showEmpty: true })

            this.resetCheckTo(false, news)
          } else if (news.code) {
            console.tron.warn(news.code)
          } else {
            this.setState({ errorNetwork: true })
          }
        }
      }
    }
  }

  onPromoRefresh () {
  }

  onPromoLoadMore () {
  }

  onPromoDetail (item) {
    const { navigate } = this.props.navigation
    navigate('NewsPromoDetail', {
      title: item.subject,
      image: item.image,
      date: `${maskedWithoutDay(moment.unix(item.created_at))}`,
      desc: item.content
    })
  }

  renderItem = ({ item, index }) => {
    const { data, selectActive, _rows, isReadAll } = this.state
    return (
      <TouchableOpacity onPress={selectActive ? () => this._onCheckboxClick(item.id) : () => this.onPromoDetail(item)}
        onLongPress={() => this.setState({selectActive: true})}>
        <View style={styles.viewItem}>
          <View>
            <Image
              style={{ width: Metrics.screenWidth, height: ratioHeight(150) }}
              source={{ uri: item.image }}
              resizeMode={'cover'} />
            <View style={styles.viewClock}>
              <Image style={{ width: ratioWidth(10), height: ratioWidth(10) }} source={Images.ic_clock} resizeMode={'stretch'} />
              <Text style={[styles.textDate, { flex: 1 }]}>
                {`Berlaku Hingga : ${maskedWithoutDay(moment.unix(item.created_at))}`}
              </Text>
              {/* {item.isRead
                ? <View style={{ height: ratioWidth(10), width: ratioWidth(10) }} />
                : <Image
                  style={{ height: ratioWidth(10), width: ratioWidth(10) }}
                  source={Images.ic_expand} resizeMode={'stretch'} /> } */}
            </View>
            <View style={styles.viewTitle}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textTitle, {fontFamily: isReadAll ? Fonts.type.robotoRegular : Fonts.type.robotoMedium}]}>
                  {item.subject}
                </Text>
                {/* <Text style={styles.textContent}>
                  {item.content}
                </Text> */}
              </View>
              <Button
                style={styles.btnRead}
                text='BACA'
                textStyle={styles.textRead}
                onPress={() => this.onPromoDetail(item)}
              />
            </View>
          </View>
        </View>
        { selectActive && <View style={{position: 'absolute', backgroundColor: _rows[item.id].checked ? '#1594b940' : 'transparent', width: '100%', height: '100%'}} /> }
        { selectActive &&
          <View style={styles.indicatorSelect}>
            <Image
              style={{ height: ratioWidth(22), width: ratioWidth(22) }}
              source={_rows[item.id].checked ? Images.ic_promo_selected : Images.ic_promo_unselected} resizeMode={'stretch'} />
          </View>
        }
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={{ height: ratioHeight(10), backgroundColor: 'transparent' }} />
    )
  }

  renderView () {
    const { isRefreshing, isLogin, selectActive, isSelected, selectedPromo } = this.state
    if (isLogin) {
      if (this.state.data.length > 0) {
        return (
          <View style={{ flex: 1 }}>
            {selectActive && <View>
              <View style={styles.selectContainer}>
                <TouchableOpacity onPress={() => this.onCancel()}>
                  <Text style={styles.selectCancel}>BATAL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._onCheckAll()}>
                  <Text style={styles.selectAll}>PILIH SEMUA</Text>
                </TouchableOpacity>
              </View>
            </View>}
            <FlatList
              refreshing={isRefreshing}
              style={styles.list}
              data={this.state.data}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              onEndReachedThreshold={0.25}
              onEndReached={({ distanceFromEnd }) => {
                this.onPromoLoadMore()
              }}
              ListFooterComponent={() => <View style={{marginBottom: ratioHeight(25)}} />}
              onRefresh={() => this.onPromoRefresh()}
            />
            {isSelected && <View style={styles.selectedContainer}>
              <Text style={styles.selectedText}>{Object.keys(selectedPromo).length} Item terseleksi</Text>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <Text style={styles.selectMarked}>TANDAI TERBACA</Text>
              </TouchableOpacity>
            </View>}
          </View>
        )
      } else {
        return <NoContentTab type='news' />
      }
    } else {
      return <NoLoginTab type='news' onPress={() => this.props.navigation.navigate('SignIn')} />
    }
  }

  render () {
    const { errorNetwork, modalVisible } = this.state
    return (
      <View style={{ flex: 1 }}>
        {/* <StatusBar barStyle='light-content' backgroundColor='#f7981d' /> */}
        <ErrorNetwork position={'relative'} visible={errorNetwork} onPress={() => this.setState({ errorNetwork: false })} />
        {this.renderView()}
        <ModalTwoButton
          isOpen={modalVisible}
          onClosed={() => this.setState({ modalVisible: false })}
          onPressFalse={() => this.setState({ modalVisible: false })}
          onPressTrue={() => { this.setState({ modalVisible: false, isReadAll: true }); this.onCancel() }}
          title={'TANDAI TERBACA'}
          desc={'Anda yakin ingin menandai item ini menjadi terbaca?'}
          buttonFalse={'Batal'}
          buttonTrue={'OK'} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.newsPromo.payload,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNewsPromo: (token) => dispatch(NewsActions.getNewsPromoRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPromo)
