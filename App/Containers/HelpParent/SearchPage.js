import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import SelectionMenu from '../../Components/SelectionMenu'
import SearchBox from '../../Components/SearchBox'
import { Colors, Images } from '../../Themes/'
import { ratioHeight } from '../../Transforms/Resize'

// Styles
import styles from '../Styles/SearchPageStyle'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      valueSearch: params.valueSearch || '',
      emptyState: params.emptyState || true,
      data: params.data || []
    }
  }

  onChangeText = (text) => {
    this.setState({ valueSearch: text })
  }

  renderEmptyState (emptyState) {
    if (emptyState) {
      return (
        <View style={{ flex: 400 }}>
          <View style={[styles.notLoginContainer]}>
            <Image source={Images.ic_searchnotfound} style={styles.banner} />
            <View>
              <Text style={styles.textTitle}>
                {I18n.t('l_searchnotfound')}
              </Text>
              <Text style={styles.textDescription}>
                {I18n.t('l_searchnotfounddescription')}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpForm', {topic: this.state.valueSearch})}
            style={[styles.button]}
            activeOpacity={0.8}>
            <Text style={[styles.textRegularBig]}>
              Langsung Kirim Pesan
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    const { valueSearch, emptyState, data } = this.state
    const { navigation } = this.props
    if (emptyState) {
      this.paddingBottom = 15
    } else {
      this.paddingBottom = 50
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView keyboardShouldPersistTaps={'handled'} >
          <View style={[styles.bgColor, {backgroundColor: Colors.squash, paddingBottom: ratioHeight(this.paddingBottom), paddingTop: ratioHeight(14)}]} >
            <Text style={[styles.robotoMedium]}>
            Apa Yang Bisa Kami Bantu?
          </Text>
            <Text style={[styles.robotoRegular, {paddingBottom: ratioHeight(15)}]}>
            Cari permasalahan yang sedang Anda hadapi
          </Text>
            <SearchBox
              onChangeText={(text) => this.onChangeText(text)}
              onPress={() => this.setState({ valueSearch: '' })}
              value={valueSearch}
              onSubmitEditing={() => this.props.navigation.navigate('SearchPage', {valueSearch: valueSearch})}
              placeholder={'Apa yang bisa kami bantu?'}
          />
          </View>
          <View style={styles.viewBottom}>
            <SelectionMenu data={data} navigation={navigation} />
          </View>
        </ScrollView>
        {this.renderEmptyState(emptyState)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
