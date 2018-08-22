import React, { Component } from 'react'
import { ScrollView, Image, View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Fonts, Images, Colors, Metrics } from '../../../Themes/'
import { ratioWidth, ratioHeight } from '../../../Transforms/Resize/'
import I18n from 'react-native-i18n'
import DropDown from '../../../Components/DropDown'
import LocationActions from '../../../Redux/LocationRedux'
import LoadingModal from '../../../Components/Loading'

// Styles
import styles from '../../Styles/RecipientDetailsStyle'
import { moderateScale } from '../../../Transforms/Scaling'
import FloatingLabel from '../../../Components/FloatingLabel'
import ButtonForm from '../../../Components/ButtonForm'

class RecipientDetails extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      yWorkSpeciality: 0,
      ySex: 0,
      yIDKTP: 0,
      yMarketSpeciality: 0,
      yStateMarket: 0,
      yCityMarket: 0,
      yDistrictMarket: 0,
      yVillageMarket: 0,
      yStateKTP: 0,
      yCityKTP: 0,
      yDistrictKTP: 0,
      yVillageKTP: 0
    }
    this.state = {
      token: '',
      check: false,
      fullName: '',
      address: '',
      postlCode: '',
      rt: '',
      rw: '',
      phoneNumber: '',
      alert: {
        fullName: '',
        address: '',
        postlCode: '',
        rt: '',
        rw: '',
        phoneNumber: '',
        IDKTP: '',
        addressState: '',
        addressDistrict: '',
        addressCity: '',
        addressVillage: '',
        addressKTP: '',
        addressStateKTP: '',
        addressDistrictKTP: '',
        addressCityKTP: '',
        addressVillageKTP: ''
      },
      IDKTP: '',
      showDropDownStateKTP: false,
      showDropDownDistrictKTP: false,
      showDropDownCityKTP: false,
      showDropDownVillageKTP: false,
      addressStateID: I18n.t('state'),
      addressCityID: I18n.t('city'),
      addressDistrictID: I18n.t('district'),
      addressVillageID: I18n.t('village'),
      addressKTP: '',
      addressStateIDKTP: I18n.t('state'),
      addressCityIDKTP: I18n.t('city'),
      addressDistrictIDKTP: I18n.t('district'),
      addressVillageIDKTP: I18n.t('village'),
      addressHeight: {
        heightAddress: ratioHeight(21),
        heightAddressGeolocation: ratioHeight(21),
        heightAddressKTP: ratioHeight(21),
        heightAddressGeolocationKTP: ratioHeight(21)
      },
      addressState: [],
      addressDistrict: [],
      addressCity: [],
      addressVillage: [],
      addressStateKTP: [],
      addressDistrictKTP: [],
      addressCityKTP: [],
      addressVillageKTP: [],
      enableScrolling: true
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.getStates()
      } else {
        this.setState({
          token: value
        })
        this.props.getStates()
      }
    })
  }

  onItemStateKTPPress = (item, show) => {
    this.setState({
      enableScrolling: true,
      addressStateIDKTP: item.id,
      showDropDownStateKTP: show,
      addressDistrictIDKTP: I18n.t('district')
    })
    this.props.getDistrict(item.id)
  }

  onItemDistrictKTPPress = (item, show) => {
    this.setState({
      enableScrolling: true,
      addressDistrictIDKTP: item.id,
      showDropDownDistrictKTP: false,
      addressCityIDKTP: I18n.t('city')
    })
    this.props.getCity(item.id)
  }

  onItemCityKTPPress = (item, show) => {
    this.setState({
      typeRequest: 'getVillageKTP',
      enableScrolling: true,
      addressCityIDKTP: item.id,
      showDropDownCityKTP: false,
      addressVillageIDKTP: I18n.t('village')
    })
    this.props.getVillage(item.id)
  }

  onItemVillageKTPPress = (item, show) => {
    this.setState({
      enableScrolling: true,
      addressVillageIDKTP: item.id,
      showDropDownVillageKTP: false
    })
  }

  render () {
    const {states, district, city, village} = this.props
    const { check, fullName, address, addressCityIDKTP, addressVillageIDKTP, showDropDownCityKTP, showDropDownVillageKTP, alert, rt, rw, phoneNumber, postlCode, enableScrolling, addressStateIDKTP, showDropDownStateKTP, addressDistrictIDKTP, showDropDownDistrictKTP } = this.state
    var tempStates = states.payload ? states.payload.data : []
    var tempDistrict = district.payload ? district.payload.data : []
    var tempCity = city.payload ? city.payload.data : []
    var tempVillage = village.payload ? village.payload.data : []
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} keyboardDismissMode='handle' scrollEnabled={enableScrolling}>
          <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
          <View style={{margin: moderateScale(10)}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({check: !check})}
              style={[styles.flexRowPadding, {backgroundColor: Colors.nice_blue10, marginBottom: ratioHeight(10)}]}>
              <Image source={check ? Images.checkboxgrey : Images.uncheckboxgrey} style={styles.checkbox} resizeMode='contain' />
              <Text style={[styles.textRegularSlate, {marginLeft: ratioWidth(10)}]}>Detail Penerima sama dengan alamat terdaftar</Text>
            </TouchableOpacity>
            <View style={[styles.formData, {marginBottom: ratioHeight(25)}]}>
              <Text style={[styles.textPrice]}>Nama Penerima</Text>
              <FloatingLabel
                viewStyle={{flex: 1}}
                text={I18n.t('l_completename')}
                alert={alert.fullName}
                value={fullName}
                separatorColor={alert.fullName === '' ? Colors.black_15 : Colors.red}
                style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                onChangeText={(text) => this.setState({fullName: text})} />
              <Text style={[styles.textPrice, {marginTop: ratioHeight(35)}]}>{I18n.t('l_address')}</Text>
              <FloatingLabel
                viewStyle={{flex: 1}}
                text={I18n.t('l_street')}
                alert={alert.address}
                value={address}
                separatorColor={alert.address === '' ? Colors.black_15 : Colors.red}
                style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                onChangeText={(text) => this.setState({fullNaaddressme: text})} />
              <View style={[styles.flexRowflat, {paddingTop: ratioHeight(9)}]}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('l_rt')}
                  keyboardType={'numeric'}
                  alert={alert.rt}
                  value={rt}
                  separatorColor={alert.rt === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                  onChangeText={(text) => this.setState({rt: text})} />
                <View style={{width: ratioWidth(10)}} />
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('l_rw')}
                  keyboardType={'numeric'}
                  alert={alert.rw}
                  value={rw}
                  separatorColor={alert.rw === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                  onChangeText={(text) => this.setState({rw: text})} />
              </View>
              <View style={{paddingTop: ratioHeight(9)}}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('state')}
                  alert={alert.addressStateKTP}
                  value={addressStateIDKTP}
                  separatorColor={alert.addressStateKTP === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoRegular, color: addressStateIDKTP === I18n.t('state') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
                <TouchableOpacity
                  style={styles.buttonTextInput}
                  onLayout={(e) => { this.layout.yStateKTP = e.nativeEvent.layout.y + ratioHeight(394) }}
                  onPress={() => this.setState({ showDropDownStateKTP: true, enableScrolling: false })}>
                  <Image style={styles.imgRight} source={showDropDownStateKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: ratioHeight(9)}}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('district')}
                  alert={alert.workName}
                  value={addressDistrictIDKTP}
                  separatorColor={alert.addressDistrictKTP === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoRegular, color: addressDistrictIDKTP === I18n.t('district') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
                <TouchableOpacity
                  style={styles.buttonTextInput}
                  onLayout={(e) => { this.layout.yDistrictKTP = e.nativeEvent.layout.y + ratioHeight(459) }}
                  onPress={() => this.setState({ showDropDownDistrictKTP: true, enableScrolling: false })}>
                  <Image style={styles.imgRight} source={showDropDownDistrictKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: ratioHeight(9)}}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('city')}
                  alert={alert.addressCityKTP}
                  value={addressCityIDKTP}
                  separatorColor={alert.addressCityKTP === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoRegular, color: addressCityIDKTP === I18n.t('city') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
                <TouchableOpacity
                  style={styles.buttonTextInput}
                  onLayout={(e) => { this.layout.yCityKTP = e.nativeEvent.layout.y + ratioHeight(524) }}
                  onPress={() => this.setState({ showDropDownCityKTP: true, enableScrolling: false })}>
                  <Image style={styles.imgRight} source={showDropDownCityKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: ratioHeight(9)}}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('village')}
                  alert={alert.addressVillageKTP}
                  value={addressVillageIDKTP}
                  separatorColor={alert.addressVillageKTP === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoRegular, color: addressVillageIDKTP === I18n.t('village') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
                <TouchableOpacity
                  style={styles.buttonTextInput}
                  onLayout={(e) => { this.layout.yVillageKTP = e.nativeEvent.layout.y + ratioHeight(589) }}
                  onPress={() => this.setState({ showDropDownVillageKTP: true, enableScrolling: false })}>
                  <Image style={styles.imgRight} source={showDropDownVillageKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
                </TouchableOpacity>
              </View>
              <View style={{paddingTop: ratioHeight(9)}}>
                <FloatingLabel
                  viewStyle={{flex: 1}}
                  text={I18n.t('l_postalcode')}
                  alert={alert.postlCode}
                  value={postlCode}
                  keyboardType={'numeric'}
                  separatorColor={alert.postlCode === '' ? Colors.black_15 : Colors.red}
                  style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                  onChangeText={(text) => this.setState({postlCode: text})} />
              </View>
              <Text style={[styles.textPrice, {marginTop: ratioHeight(35)}]}>{I18n.t('l_contact')}</Text>
              <FloatingLabel
                viewStyle={{flex: 1}}
                text={I18n.t('l_phonenumber')}
                alert={alert.phoneNumber}
                keyboardType={'numeric'}
                value={phoneNumber}
                separatorColor={alert.phoneNumber === '' ? Colors.black_15 : Colors.red}
                style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                onChangeText={(text) => this.setState({phoneNumber: text})} />
            </View>
            <View style={{margin: moderateScale(-10), paddingTop: ratioHeight(15), paddingHorizontal: ratioWidth(15)}}>
              <ButtonForm
                onPress={() => this.props.navigation.navigate('PaymentConfirmationSamsung')}
                disabled={false}
            />
            </View>
          </View>
          {showDropDownStateKTP === true &&
          <DropDown
            ref='dropDownStateKTP'
            onBlur={(show) => this.setState({ showDropDownStateKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemStateKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yStateKTP, height: tempStates.length < 6 ? tempStates * ratioHeight(32) : ratioHeight(200) }]}
            data={tempStates}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yStateKTP }]} />}
          {showDropDownDistrictKTP === true &&
          <DropDown
            ref='dropDownDistrictKTP'
            onBlur={(show) => this.setState({ showDropDownDistrictKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemDistrictKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yDistrictKTP, height: tempDistrict.length < 6 ? tempDistrict * ratioHeight(32) : ratioHeight(200) }]}
            data={tempDistrict}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yDistrictKTP }]} />}
          {showDropDownCityKTP === true &&
            <DropDown
              ref='dropDownCityKTP'
              onBlur={(show) => this.setState({ showDropDownCityKTP: false, enableScrolling: true })}
              onItemPress={(item, show) => this.onItemCityKTPPress(item, false)}
              style={[styles.dropDown, { top: this.layout.yCityKTP, height: tempCity.length < 6 ? tempCity * ratioHeight(32) : ratioHeight(200) }]}
              data={tempCity}
              backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yCityKTP }]} />}
          {showDropDownVillageKTP === true &&
          <DropDown
            ref='dropDownVillageKTP'
            onBlur={(show) => this.setState({ showDropDownVillageKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemVillageKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yVillageKTP, height: tempVillage.length < 6 ? tempVillage * ratioHeight(32) : ratioHeight(200) }]}
            data={tempVillage}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yVillageKTP }]} />}

        </ScrollView>
        <LoadingModal visible={states.fetching || district.fetching || city.fetching || village.fetching} onRequestClose={() => this.props.navigation.goBack()} />
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.location.states,
    district: state.location.district,
    city: state.location.city,
    village: state.location.village
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(LocationActions.getStateRequest()),
    getDistrict: (id) => dispatch(LocationActions.getDistrictRequest(id)),
    getCity: (id) => dispatch(LocationActions.getCityRequest(id)),
    getVillage: (id) => dispatch(LocationActions.getVillageRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipientDetails)
