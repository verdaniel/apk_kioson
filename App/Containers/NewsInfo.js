import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import NoLoginTab from '../Components/NoLoginTab'
import NoContentTab from '../Components/NoContentTab'
import ModalTwoButton from '../Components/ModalTwoButton'
import { Fonts, Colors, Images } from '../Themes'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import ErrorNetwork from '../Components/ErrorNetwork'
import { maskedWithoutDay } from '../Transforms/LocalConfig'

// Actions
import NewsActions from '../Redux/NewsRedux'

// Styles
import styles from './Styles/NewsInfoStyle'

const moment = require('moment')

class NewsInfo extends Component {
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
      selectedMessage: {},
      _rows: {},
      page: 1,
      data: [],
      requestType: 'firstLoad'
    }
  }

  componentDidMount () {
    const { news } = this.props

    AsyncStorage.getItem('token').then((value) => {
      if (value === null || typeof value === 'undefined' || value === '') {
        this.setState({ isLogin: false })
      } else {
        this.setState({ token: value, isLogin: true })
        if (news === null) this.props.getNewsInfo(value)
        else {
          if (news.data.length > 0) {
            this.setState({ page: 1, data: news.data })
          } else this.setState({ showEmpty: true })
        }
      }
    })

    if (news) this.resetCheckTo(false)
  }

  _onCheckboxClick (newsId) {
    const {selectedMessage, _rows} = this.state

    if (newsId in selectedMessage) {
      delete selectedMessage[newsId]
      _rows[newsId] = {selectedText: false, checked: false}
      this.forceUpdate()

      if (_.size(selectedMessage) === 0) {
        this.setState({isSelected: false})
      }
    } else {
      selectedMessage[newsId] = newsId
      _rows[newsId] = {selectedText: true, checked: true}
      this.setState({isSelected: true})
    }
    // console.tron.warn({selectedMessage, _rows})
  }

  async _onCheckAll () {
    await this.setState({isSelected: true})
    this.resetCheckTo(true)
  }

  async onCancel () {
    await this.setState({selectActive: false, isSelected: false, selectedMessage: {}})
    this.resetCheckTo(false)
  }

  resetCheckTo (stateCheck, receiveNews) {
    const news = receiveNews || this.props.news
    const {selectedMessage} = this.state

    news.data.forEach((aNews) => {
      if (stateCheck) selectedMessage[aNews.id] = aNews.id
      this.state._rows[aNews.id] = {selectedText: stateCheck, checked: stateCheck}
    }, this)
    this.forceUpdate()
    // console.tron.warn({selectedMessage, _rows})
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

  onNewsRefresh () {
  }

  onNewsLoadMore () {
  }

  coba (id) {
    this.setState({selectActive: true})
    this._onCheckboxClick(id)
  }

  onInfoDetail (item) {
    const { navigate } = this.props.navigation
    navigate('NewsInfoDetail', {
      title: item.subject,
      image: item.image,
      date: `${moment(moment.unix(item.created_at)).format('HH:mm')} WIB - ${maskedWithoutDay(moment.unix(item.created_at))}`,
      desc: item.content
    })
  }

  renderItem = ({ item, index }) => {
    const { data, selectActive, _rows, isReadAll } = this.state
    return (
      <TouchableOpacity onPress={() => !selectActive ? this.onInfoDetail(item) : this._onCheckboxClick(item.id)}
        onLongPress={() => this.coba(item.id)}>
        <View style={[styles.viewItem, { marginBottom: index === data.length - 1 ? ratioHeight(25) : 0,
          backgroundColor: _rows[item.id].checked ? Colors.nice_blue10 : Colors.white_two }]}>
          <View style={{ flex: 1, marginRight: ratioWidth(15) }}>
            <Text style={[styles.textTitle,
              {fontFamily: item.is_read || isReadAll ? Fonts.type.robotoRegular : Fonts.type.robotoMedium}]}>
              {item.subject}
            </Text>
            <Text style={styles.textContent} numberOfLines={1} ellipsizeMode={'tail'}>
              {item.content}
            </Text>
            <Text style={styles.textDate}>
              {`${moment(moment.unix(item.created_at)).format('HH:mm')} WIB - ${maskedWithoutDay(moment.unix(item.created_at))}`}
            </Text>
          </View>
          { selectActive &&
          <Image
            style={styles.indicatorSelect}
            source={_rows[item.id].checked ? Images.ic_msg_selected : Images.ic_msg_unselected} resizeMode={'stretch'} />
          }
        </View>
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={{ height: ratioHeight(0.5), backgroundColor: Colors.red }} />
    )
  }

  renderView () {
    const { isRefreshing, isLogin, selectActive, isSelected, selectedMessage } = this.state
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
                this.onNewsLoadMore()
              }}
              onRefresh={() => this.onNewsRefresh()}
            />
            {isSelected && <View style={styles.selectedContainer}>
              <Text style={styles.selectedText}>{Object.keys(selectedMessage).length} Item terseleksi</Text>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <Text style={styles.selectedMark}>TANDAI TERBACA</Text>
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
    news: state.news.newsInfo.payload,
    dataLogin: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNewsInfo: (token) => dispatch(NewsActions.getNewsInfoRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfo)
