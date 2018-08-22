import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  PermissionsAndroid,
  ToastAndroid,
  AsyncStorage
} from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { Colors, Fonts, Images, Metrics } from '../Themes'
import { maskedWithoutDay } from '../Transforms/LocalConfig'
import FloatingLabel from '../Components/FloatingLabel'
import DropDown from '../Components/DropDown'
import Button from '../Components/Button'
import Loading from '../Components/Loading'
import CustomCalendar from '../Components/CustomCalendar'
import I18n from '../I18n'
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import { moderateScale } from '../Transforms/Scaling'
import { NavigationActions } from 'react-navigation'

// Actions
import LocationActions from '../Redux/LocationRedux'
import PresetActions from '../Redux/PresetRedux'
import ProfileActions from '../Redux/ProfileRedux'

// Styles
import styles from './Styles/CompleteDataStyle'

const moment = require('moment')

class CompleteData extends Component {
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
      isLoading: false,
      isPersonalExpand: true,
      isAddressExpand: false,
      isUploadExpand: false,
      isHaveMarket: true,
      isAddressSame: false,
      enableScrolling: true,
      showCalendar: false,
      showSuccess: false,
      showDropDownWork: false,
      showDropDownSex: false,
      showDropDownMarket: false,
      showDropDownStateMarket: false,
      showDropDownDistrictMarket: false,
      showDropDownCityMarket: false,
      showDropDownVillageMarket: false,
      showDropDownStateKTP: false,
      showDropDownDistrictKTP: false,
      showDropDownCityKTP: false,
      showDropDownVillageKTP: false,
      bornPlace: '',
      bornDate: new Date().getTime(),
      bornDateStr: maskedWithoutDay(new Date().getTime()),
      IDKTP: '',
      sex: [{ id: 0, name: I18n.t('l_man') }, { id: 1, name: I18n.t('l_woman') }],
      sexSelected: I18n.t('l_gender'),
      workName: I18n.t('l_work_name'),
      workNameEtc: '',
      workSpeciality: [],
      marketName: '',
      marketPhone: '',
      marketType: I18n.t('l_market_type'),
      marketTypeEtc: '',
      marketSpeciality: [],
      marketBuild: '',
      address: '',
      addressGeolocation: '',
      addressStateID: I18n.t('state'),
      addressCityID: I18n.t('city'),
      addressDistrictID: I18n.t('district'),
      addressVillageID: I18n.t('village'),
      addressKTP: '',
      addressGeolocationKTP: '',
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
      alert: {
        IDKTP: '',
        sexSelected: '',
        bornPlace: '',
        workName: '',
        marketName: '',
        marketPhone: '',
        marketType: '',
        marketBuild: '',
        address: '',
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
      marketLatitude: 0,
      marketLongitude: 0,
      KTPLatitude: 0,
      KTPLongitude: 0,
      imageKTP: 'http://www.royallepagesudbury.ca/images/no-image.png',
      imageSelfie: 'http://www.royallepagesudbury.ca/images/no-image.png',
      imageMarket: 'http://www.royallepagesudbury.ca/images/no-image.png',
      typeRequest: 'firstLoad',
      token: ''
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
        this.props.getStates()
        this.props.getWorkType('')
        this.props.getStoreType('')
      } else {
        this.setState({
          token: value
        })
        this.props.getStates()
        this.props.getWorkType(value)
        this.props.getStoreType(value)
      }
    })
  }

  componentDidMount () {
    this.checkLocationPermission()
  }

  componentWillReceiveProps (newProps) {
    var { typeRequest, token } = this.state
    if (typeRequest === 'firstLoad') {
      if (newProps.states && newProps.workType && newProps.storeType) {
        if (newProps.states.status === true && newProps.workType.status === true && newProps.storeType.status === true) {
          this.setState({
            addressState: newProps.states.data,
            addressStateKTP: newProps.states.data,
            workSpeciality: newProps.workType.data,
            marketSpeciality: newProps.storeType.data
          })

          if (!newProps.profile) {
            this.setState({ typeRequest: 'getProfile' })
            this.props.getProfile(token)
          } else {
            if (newProps.profile.status === true) {
              this.setState({
                addressKTP: newProps.profile.data.street,
                addressStateIDKTP: newProps.profile.data.state,
                addressDistrictIDKTP: newProps.profile.data.district,
                addressCityIDKTP: newProps.profile.data.city,
                addressVillageIDKTP: newProps.profile.data.village,
                address: newProps.profile.data.street,
                addressStateID: newProps.profile.data.state,
                addressDistrictID: newProps.profile.data.district,
                addressCityID: newProps.profile.data.city,
                addressVillageID: newProps.profile.data.village
              })
            }
          }
        } else ToastAndroid.show(newProps.states.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getProfile') {
      if (newProps.profile) {
        if (newProps.profile.status === true) {
          this.setState({
            addressKTP: newProps.profile.data.street,
            addressStateIDKTP: newProps.profile.data.state_id,
            addressDistrictIDKTP: newProps.profile.data.district,
            addressCityIDKTP: newProps.profile.data.city,
            addressVillageIDKTP: newProps.profile.data.village,
            address: newProps.profile.data.street,
            addressStateID: newProps.profile.data.state_id,
            addressDistrictID: newProps.profile.data.district,
            addressCityID: newProps.profile.data.city,
            addressVillageID: newProps.profile.data.village
          })
        } else ToastAndroid.show(newProps.profile.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getDistrictMarket') {
      if (newProps.district) {
        if (newProps.district.status === true) {
          this.setState({
            addressDistrict: newProps.district.data,
            addressCityID: I18n.t('city'),
            addressVillageID: I18n.t('village'),
            addressCity: [],
            addressVillage: []
          })
        } else ToastAndroid.show(newProps.district.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getCityMarket') {
      if (newProps.city) {
        if (newProps.city.status === true) {
          this.setState({
            addressCity: newProps.city.data,
            addressVillageID: I18n.t('village'),
            addressVillage: []
          })
        } else ToastAndroid.show(newProps.city.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getVillageMarket') {
      if (newProps.village) {
        if (newProps.village.status === true) {
          this.setState({ addressVillage: newProps.village.data })
        } else ToastAndroid.show(newProps.village.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getDistrictKTP') {
      if (newProps.district) {
        if (newProps.district.status === true) {
          this.setState({
            addressDistrictKTP: newProps.district.data,
            addressCityIDKTP: I18n.t('city'),
            addressVillageIDKTP: I18n.t('village'),
            addressCityKTP: [],
            addressVillageKTP: []
          })
        } else ToastAndroid.show(newProps.district.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getCityKTP') {
      if (newProps.city) {
        if (newProps.city.status === true) {
          this.setState({
            addressCityKTP: newProps.city.data,
            addressVillageIDKTP: I18n.t('village'),
            addressVillageKTP: []
          })
        } else ToastAndroid.show(newProps.city.message, ToastAndroid.SHORT)
      }
    } else if (typeRequest === 'getVillageKTP') {
      if (newProps.village) {
        if (newProps.village.status === true) {
          this.setState({ addressVillageKTP: newProps.village.data })
        } else ToastAndroid.show(newProps.village.message, ToastAndroid.SHORT)
      }
    }
  }

  async checkCameraPermission (callback) {
    try {
      const responseCamera = await PermissionsAndroid.check('android.permission.CAMERA')
      const responseStorage = await PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE')
      if (!responseCamera || !responseStorage) {
        this.requestCameraPermission(callback)
      } else {
        console.tron.log('Camera permission granted')
        callback()
      }
    } catch (err) {
      console.tron.warn(err)
    }
  }

  async checkLocationPermission () {
    try {
      const response = PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')
      if (!response) {
        this.requestLocationPermission()
      } else {
        console.tron.log('Location permission granted')
        this.currentPosition()
      }
    } catch (err) {
      console.tron.warn(err)
    }
  }

  async requestCameraPermission (callback) {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
      )
      console.tron.log(granted)
      if (granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
        console.tron.log('Camera permission granted')
        callback()
      } else {
        console.tron.log('Camera permission denied')
      }
    } catch (err) {
      console.tron.warn(err)
    }
  }

  requestLocationPermission () {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Kioson App Location Permission',
        'message': 'Kioson App needs access to your location'
      }
    ).then((response) => {
      if (response === PermissionsAndroid.RESULTS.GRANTED) {
        this.currentPosition()
      } else {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: '<h2>Use Location?</h2>This app wants to change your device settings:<br/>Use GPS for location<br/>',
          ok: 'Ya',
          cancel: 'Tidak'
        })
        .then((res) => {
          if (res.enabled === true) this.currentPosition()
        })
        .catch((e) => console.tron.error(e))
      }
    })
  }

  currentPosition () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.tron.warn(position.coords)
        const lastPostition = position.coords
        this.getAddress(lastPostition.latitude, lastPostition.longitude)
        this.setState({
          marketLatitude: lastPostition.latitude,
          marketLongitude: lastPostition.longitude,
          KTPLatitude: lastPostition.latitude,
          KTPLongitude: lastPostition.longitude
        })
      },
      (e) => {
        if (e.code === 1) {
          LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: '<h2>Use Location?</h2>This app wants to change your device settings:<br/>Use GPS for location<br/>',
            ok: 'Ya',
            cancel: 'Tidak'
          })
          .then((res) => {
            if (res.enabled === true) this.currentPosition()
          })
          .catch((e) => console.tron.error(e))
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: Number.Infinity }
    )
  }

  getAddress = async (lat, long) => {
    try {
      const res = await fetch(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyByfKTCNAGfUpqMTBBFESaRQBD3A0o0h8w&latlng=${lat},${long}`)
      const json = await res.json()

      if (json.results || json.status === 'OK') {
        this.setState({
          addressGeolocation: json.results[0].formatted_address,
          addressGeolocationKTP: json.results[0].formatted_address
        })
      }
    } catch (e) { console.tron.log(e) }
  }

  onDateChange (date) {
    this.setState({ bornDate: date.fromDate, bornDateStr: maskedWithoutDay(date.fromDate), showCalendar: false })
  }

  onItemWorkPress = (item, marketType) => {
    const { alert } = this.state
    if (item.name === I18n.t('p_lainlain')) {
      this.setState({
        workName: item.name, workNameEtc: '', showDropDownWork: false, enableScrolling: true
      })
    } else {
      this.setState({
        workName: item.name, workNameEtc: '', showDropDownWork: false, enableScrolling: true
      })
    }
    this.setState({ alert: {...alert, workName: ''} })
  }

  onItemMarketPress = (item, workName) => {
    const { alert } = this.state
    if (item.name === I18n.t('p_lainlain')) {
      this.setState({
        marketType: item.name, marketTypeEtc: '', showDropDownMarket: false, enableScrolling: true
      })
    } else {
      this.setState({
        marketType: item.name, marketTypeEtc: '', showDropDownMarket: false, enableScrolling: true
      })
    }
    this.setState({ alert: {...alert, marketType: ''} })
  }

  onItemSexPress = (item, show) => {
    this.setState({
      sexSelected: item.name,
      showDropDownSex: false,
      enableScrolling: true
    })
  }

  onItemStateMarketPress = (item, show) => {
    this.setState({
      typeRequest: 'getDistrictMarket',
      enableScrolling: true,
      addressStateID: item.id,
      showDropDownStateMarket: show,
      addressDistrictID: I18n.t('district')
    })
    this.props.getDistrict(item.id)
  }

  onItemDistrictMarketPress = (item, show) => {
    this.setState({
      typeRequest: 'getCityMarket',
      enableScrolling: true,
      addressDistrictID: item.id,
      showDropDownDistrictMarket: false,
      addressCityID: I18n.t('city')
    })
    this.props.getCity(item.id)
  }

  onItemCityMarketPress = (item, show) => {
    this.setState({
      typeRequest: 'getVillageMarket',
      enableScrolling: true,
      addressCityID: item.id,
      showDropDownCityMarket: false,
      addressVillageID: I18n.t('village')
    })
    this.props.getVillage(item.id)
  }

  onItemVillageMarketPress = (item, show) => {
    this.setState({
      enableScrolling: true,
      addressVillageID: item.id,
      showDropDownVillageMarket: false
    })
  }

  onItemStateKTPPress = (item, show) => {
    this.setState({
      typeRequest: 'getDistrictKTP',
      enableScrolling: true,
      addressStateIDKTP: item.id,
      showDropDownStateKTP: show,
      addressDistrictIDKTP: I18n.t('district')
    })
    this.props.getDistrict(item.id)
  }

  onItemDistrictKTPPress = (item, show) => {
    this.setState({
      typeRequest: 'getCityKTP',
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

  onContentSizeAddress = (contentSize) => {
    const { isAddressExpand, addressHeight } = this.state
    if (isAddressExpand) {
      this.setState({ addressHeight: {...addressHeight, heightAddress: contentSize.height} })
    }
  }

  onContentSizeAddressGeolocation = (contentSize) => {
    const { isAddressExpand, addressHeight } = this.state
    if (isAddressExpand) {
      this.setState({ addressHeight: {...addressHeight, heightAddressGeolocation: contentSize.height < ratioHeight(21) ? ratioHeight(21) : contentSize.height} })
    }
  }

  onContentSizeAddressKTP = (contentSize) => {
    const { isAddressSame, addressHeight } = this.state
    if (!isAddressSame) {
      this.setState({ addressHeight: {...addressHeight, heightAddressKTP: contentSize.height} })
    }
  }

  onContentSizeAddressGeolocationKTP = (contentSize) => {
    const { isAddressSame, addressHeight } = this.state
    if (!isAddressSame) {
      this.setState({ addressHeight: {...addressHeight, heightAddressGeolocationKTP: contentSize.height < ratioHeight(21) ? ratioHeight(21) : contentSize.height} })
    }
  }

  onChangeTextBornPlace (text) {
    const { alert } = this.state
    this.setState({ bornPlace: text })
    if (text.length >= 4 || text.length === 0) {
      this.setState({ alert: {...alert, bornPlace: I18n.t('toast_non')} })
    } else {
      this.setState({ alert: {...alert, bornPlace: I18n.t('toast_min_born_place')} })
    }
  }

  onChangeTextIDKTP (text) {
    const { alert } = this.state
    this.setState({ IDKTP: text })
    if (text.length === 16 || text.length === 0) {
      this.setState({ alert: {...alert, IDKTP: I18n.t('toast_non')} })
    } else {
      this.setState({ alert: {...alert, IDKTP: I18n.t('toast_min_ktp')} })
    }
  }

  onChangeTextMarketName (text) {
    const { alert } = this.state
    this.setState({ marketName: text })
    if (text.length === 0 || text.length > 0) {
      this.setState({ alert: {...alert, marketName: I18n.t('toast_non')} })
    }
  }

  onChangeTextMarketPhone (text) {
    const { alert } = this.state
    this.setState({ marketPhone: text })
    if (text.length === 0) {
      this.setState({ alert: {...alert, marketPhone: I18n.t('toast_non')} })
    } else if (text.length > 0) {
      if (isNaN(text)) {
        this.setState({ alert: {...alert, marketPhone: I18n.t('toast_number_not_valid')} })
      } else {
        this.setState({ alert: {...alert, marketPhone: I18n.t('toast_non')} })
      }
    }
  }

  onChangeTextMarketBuild (text) {
    const { alert } = this.state
    this.setState({ marketBuild: text })
    if (text.length === 0) {
      this.setState({ alert: {...alert, marketBuild: I18n.t('toast_non')} })
    } else if (text.length > 0) {
      if (isNaN(text)) {
        this.setState({ alert: {...alert, marketBuild: I18n.t('toast_number_not_valid')} })
      } else {
        this.setState({ alert: {...alert, marketBuild: I18n.t('toast_non')} })
      }
    }
  }

  onLayoutDropDownWork = (e) => {
    this.layout.yWorkSpeciality = e.nativeEvent.layout.y + ratioHeight(282)
  }

  onLayoutDropDownSex = (e) => {
    this.layout.ySex = e.nativeEvent.layout.y + ratioHeight(348)
  }

  onLayoutDropDownMarket = (e) => {
    this.layout.yMarketSpeciality = e.nativeEvent.layout.y + ratioHeight(700)
  }

  onLayoutDropDownStateMarket = (e) => {
    this.layout.yStateMarket = e.nativeEvent.layout.y + ratioHeight(868) // 850 - 267 = 583
  }

  onLayoutDropDownDistrictMarket = (e) => {
    this.layout.yDistrictMarket = e.nativeEvent.layout.y + ratioHeight(934)
  }

  onLayoutDropDownCityMarket = (e) => {
    this.layout.yCityMarket = e.nativeEvent.layout.y + ratioHeight(999)
  }

  onLayoutDropDownVillageMarket = (e) => {
    this.layout.yVillageMarket = e.nativeEvent.layout.y + ratioHeight(1066)
  }

  onLayoutDropDownStateKTP = (e) => {
    this.layout.yStateKTP = e.nativeEvent.layout.y + ratioHeight(274)
  }

  onLayoutDropDownDistrictKTP = (e) => {
    this.layout.yDistrictKTP = e.nativeEvent.layout.y + ratioHeight(341)
  }

  onLayoutDropDownCityKTP = (e) => {
    this.layout.yCityKTP = e.nativeEvent.layout.y + ratioHeight(407)
  }

  onLayoutDropDownVillageKTP = (e) => {
    this.layout.yVillageKTP = e.nativeEvent.layout.y + ratioHeight(474)
  }

  validationPersonal () {
    const { sexSelected, IDKTP, bornPlace, workName, workNameEtc, marketName, marketPhone, marketType, marketTypeEtc, marketBuild, isHaveMarket, imageMarket } = this.state
    if (sexSelected === I18n.t('l_gender')) return false
    else if (IDKTP === '') return false
    else if (bornPlace.length === 0) return false
    else if (bornPlace.length < 4) return false
    else if (workName === I18n.t('l_work_name')) return false
    else if (workName === I18n.t('p_lainlain')) {
      if (workNameEtc === '') return false
    } else {
      if (isHaveMarket) {
        if (marketName === '') return false
        else if (marketPhone === '') return false
        else if (isNaN(marketPhone)) return false
        else if (marketType === I18n.t('l_market_type')) return false
        else if (marketBuild === '') return false
        else if (imageMarket === 'http://www.royallepagesudbury.ca/images/no-image.png') return false
        else if (marketType === I18n.t('p_lainlain')) {
          if (marketTypeEtc === '') return false
        } else return true
      } else return true
    }
  }

  alertPersonal () {
    const { sexSelected, IDKTP, bornPlace, workName, workNameEtc, marketName, marketPhone
      , marketType, marketTypeEtc, marketBuild, isHaveMarket, alert } = this.state
    var newAlert = {
      sexSelected: alert.sexSelected,
      IDKTP: alert.IDKTP,
      bornPlace: alert.bornPlace,
      workName: alert.workName,
      marketName: alert.marketName,
      marketPhone: alert.marketPhone,
      marketType: alert.marketType,
      marketBuild: alert.marketBuild
    }
    if (sexSelected === I18n.t('l_gender')) newAlert.sexSelected = I18n.t('toast_gender')
    if (IDKTP.length === 0) newAlert.IDKTP = I18n.t('toast_ktp')
    if (IDKTP.length < 16 || IDKTP.length > 16) newAlert.IDKTP = I18n.t('toast_min_ktp')
    if (bornPlace.length === 0) newAlert.bornPlace = I18n.t('toast_fill')
    if (bornPlace.length < 4) newAlert.bornPlace = I18n.t('toast_min_born_place')
    if (workName === I18n.t('l_work_name')) newAlert.workName = I18n.t('toast_work_name')
    if (workName === I18n.t('p_lainlain')) {
      if (workNameEtc === '') newAlert.workName = I18n.t('toast_fill')
    } else {
      if (isHaveMarket) {
        if (marketName === '') newAlert.marketName = I18n.t('toast_fill')
        if (marketPhone === '') newAlert.marketPhone = I18n.t('toast_fill')
        if (isNaN(marketPhone)) newAlert.marketPhone = I18n.t('toast_number_not_valid')
        if (marketType === I18n.t('l_market_type')) newAlert.marketType = I18n.t('toast_market_type')
        if (marketBuild === '') newAlert.marketBuild = I18n.t('toast_fill')
        if (isNaN(marketBuild)) newAlert.marketBuild = I18n.t('toast_number_not_valid')
        if (marketType === I18n.t('p_lainlain')) {
          if (marketTypeEtc === '') newAlert.marketType = I18n.t('toast_fill')
        }
      }
    }

    this.setState({
      alert: {
        ...alert,
        sexSelected: newAlert.sexSelected,
        IDKTP: newAlert.IDKTP,
        bornPlace: newAlert.bornPlace,
        workName: newAlert.workName,
        marketName: newAlert.marketName,
        marketPhone: newAlert.marketPhone,
        marketType: newAlert.marketType,
        marketBuild: newAlert.marketBuild
      }
    })
  }

  onNextPersonalData () {
    const { alert } = this.state
    if (this.validationPersonal()) {
      this.setState({
        isPersonalExpand: false,
        isUploadExpand: false,
        isAddressExpand: true,
        alert: {
          ...alert,
          sexSelected: '',
          IDKTP: '',
          bornPlace: '',
          workName: '',
          marketName: '',
          marketPhone: '',
          marketType: '',
          marketBuild: ''
        }
      })
    } else {
      this.alertPersonal()
    }
  }

  onChangeTextAddress (text) {
    const { alert } = this.state
    this.setState({ address: text })
    if (text.length === 0 || text.length > 0) {
      this.setState({ alert: {...alert, address: I18n.t('toast_non')} })
    }
  }

  onChangeTextAddressKTP (text) {
    const { alert } = this.state
    this.setState({ addressKTP: text })
    if (text.length === 0 || text.length > 0) {
      this.setState({ alert: {...alert, addressKTP: I18n.t('toast_non')} })
    }
  }

  validationAddress () {
    const { addressKTP, addressStateIDKTP, addressDistrictIDKTP, addressCityIDKTP, addressVillageIDKTP,
      address, addressStateID, addressDistrictID, addressCityID, addressVillageID, isAddressSame } = this.state
    if (addressKTP === '') return false
    else if (addressStateIDKTP === I18n.t('state')) return false
    else if (addressDistrictIDKTP === I18n.t('district')) return false
    else if (addressCityIDKTP === I18n.t('city')) return false
    else if (addressVillageIDKTP === I18n.t('village')) return false
    else {
      if (!isAddressSame) {
        if (address === '') return false
        else if (addressStateID === I18n.t('state')) return false
        else if (addressDistrictID === I18n.t('district')) return false
        else if (addressCityID === I18n.t('city')) return false
        else if (addressVillageID === I18n.t('village')) return false
        else return true
      } else return true
    }
  }

  alertAddress () {
    const { address, addressKTP, isAddressSame, alert } = this.state
    var newAlert = {
      address: alert.address,
      addressKTP: alert.addressKTP
    }
    if (address === '') newAlert.address = I18n.t('toast_fill')
    if (!isAddressSame) {
      if (addressKTP === '') newAlert.addressKTP = I18n.t('toast_fill')
    }

    this.setState({
      alert: {
        ...alert,
        address: newAlert.address,
        addressKTP: newAlert.addressKTP
      }
    })
  }

  onNextAddress () {
    const { alert } = this.state
    if (this.validationAddress()) {
      this.setState({
        isPersonalExpand: false,
        isAddressExpand: false,
        isUploadExpand: true,
        alert: {
          ...alert,
          address: '',
          addressKTP: ''
        }
      })
    } else {
      this.alertAddress()
    }
  }

  validationUpload () {
    const { imageKTP, imageSelfie } = this.state
    if (imageKTP === 'http://www.royallepagesudbury.ca/images/no-image.png') {
      return false
    } else if (imageSelfie === 'http://www.royallepagesudbury.ca/images/no-image.png') {
      return false
    } else {
      return true
    }
  }

  onNextUpload () {
    if (this.validationUpload()) {
      this.setState({
        isPersonalExpand: false,
        isAddressExpand: false,
        isUploadExpand: false
      })
    }
  }

  onVerification = async () => {
    const { marketName, marketPhone, marketType,
        address, addressStateID, addressCityID, addressDistrictID, addressVillageID,
        addressKTP, addressStateIDKTP, addressCityIDKTP, addressDistrictIDKTP, addressVillageIDKTP, KTPLatitude, KTPLongitude,
        isHaveMarket, isAddressSame, imageKTP, imageMarket, imageSelfie, token } = this.state
    if (this.validationPersonal() && this.validationAddress() && this.validationUpload()) {
      this.setState({ isLoading: true })
      try {
        const postData = new FormData()
        postData.append('name', 'AAAA')
        postData.append('email', 'AAAA@gmail.com')
        postData.append('store_name', marketName)
        postData.append('store_phone', marketPhone)
        postData.append('store_type', marketType)
        postData.append('store_street', isAddressSame ? addressKTP : address)
        postData.append('store_province_id', isAddressSame ? addressStateIDKTP : addressStateID)
        postData.append('store_city_id', isAddressSame ? addressCityIDKTP : addressCityID)
        postData.append('store_district_id', isAddressSame ? addressDistrictIDKTP : addressDistrictID)
        postData.append('store_village_id', isAddressSame ? addressVillageIDKTP : addressVillageID)
        postData.append('store_zip_code', 123456)
        postData.append('latitude', KTPLatitude)
        postData.append('longitude', KTPLongitude)
        postData.append('street', addressKTP)
        postData.append('province_id', addressStateIDKTP)
        postData.append('city_id', addressCityIDKTP)
        postData.append('district_id', addressDistrictIDKTP)
        postData.append('village_id', addressVillageIDKTP)
        postData.append('zip_code', 123456)
        postData.append('isShop', isHaveMarket ? 1 : 0)
        postData.append('id_image', { uri: imageKTP, type: 'image/jpg', name: 'group.jpg' })
        postData.append('store_image', { uri: imageMarket, type: 'image/jpg', name: 'group.jpg' })
        postData.append('selfie_image', { uri: imageSelfie, type: 'image/jpg', name: 'group.jpg' })

        let response = await fetch('https://bridge.kioson.project.skyshi.com/user', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'JWT ' + token
          },
          body: postData
        })
        let responseJson = await response.json()
        return responseJson
      } catch (error) {
        console.tron.warn(error)
      }
    }
  }

  onRequestClose () {
    this.setState({ isLoading: false })
    this.props.navigation.goBack()
  }

  onNextSuccess () {
    this.onVerification().then((result) => {
      if (result.status) {
        this.setState({ isLoading: false, showSuccess: false })
      } else {
        this.setState({ isLoading: false })
        ToastAndroid.show(result.message, ToastAndroid.SHORT)
      }
    })
  }

  onMarketGeolocation () {
    const { marketLatitude, marketLongitude, addressGeolocation } = this.state
    this.props.navigation.navigate('Geolokasi', {
      latitude: marketLatitude,
      longitude: marketLongitude,
      address: addressGeolocation,
      geolocation: this.newMarketGeolocation
    })
  }

  newMarketGeolocation = (lat, long, address) => {
    this.setState({
      marketLatitude: lat,
      marketLongitude: long,
      addressGeolocation: address
    })
  }

  onKTPGeolocation () {
    const { KTPLatitude, KTPLongitude, addressGeolocationKTP } = this.state
    this.props.navigation.navigate('Geolokasi', {
      latitude: KTPLatitude,
      longitude: KTPLongitude,
      address: addressGeolocationKTP,
      geolocation: this.newKTPGeolocation
    })
  }

  newKTPGeolocation = (lat, long, address) => {
    this.setState({
      KTPLatitude: lat,
      KTPLongitude: long,
      addressGeolocationKTP: address
    })
  }

  onCameraKTP () {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Cameras',
      params: {
        type: 'back',
        title: I18n.t('l_foto_ktp'),
        image: this.imageKTP,
        orientation: 'landscape'
      },
      action: NavigationActions.navigate({ routeName: 'Cameras' })
    })
    this.props.navigation.dispatch(navigateAction)
  }

  imageKTP = (image) => {
    this.setState({ imageKTP: image })
  }

  onCameraSelfie () {
    this.props.navigation.navigate('Cameras', {
      type: 'front',
      title: I18n.t('l_foto_selfie'),
      image: this.imageSelfie,
      orientation: 'potrait'
    })
  }

  imageSelfie = (image) => {
    this.setState({ imageSelfie: image })
  }

  onCameraMarket () {
    this.props.navigation.navigate('Cameras', {
      type: 'back',
      title: I18n.t('l_foto_usaha'),
      image: this.imageMarket,
      orientation: 'landscape'
    })
  }

  imageMarket = (image) => {
    this.setState({ imageMarket: image })
  }

  dateString (timestamp) {
    moment.locale()
    var day = moment(timestamp)
    var dateStr = moment(day).format('dddd, D MMMM YYYY')
    return dateStr
  }

  changeDate (value) {
    this.setState({
      bornDate: value,
      calendarTimestamp: value,
      calendarDate: this.dateString(value)
    })
  }

  onExpandPersonal () {
    const { isPersonalExpand } = this.state
    if (isPersonalExpand) this.setState({ isPersonalExpand: false })
    else {
      this.setState({
        isPersonalExpand: true,
        isAddressExpand: false,
        isUploadExpand: false
      })
    }
  }

  onHaveMarket () {
    const { isHaveMarket } = this.state
    if (isHaveMarket) this.setState({ isHaveMarket: false })
    else this.setState({ isHaveMarket: true })
  }

  onExpandAddress () {
    const { isAddressExpand } = this.state
    if (isAddressExpand) this.setState({ isAddressExpand: false })
    else {
      this.setState({
        isAddressExpand: true,
        isPersonalExpand: false,
        isUploadExpand: false
      })
    }
  }

  onAddressSame () {
    const { isAddressSame } = this.state
    if (isAddressSame) this.setState({ isAddressSame: false })
    else this.setState({ isAddressSame: true })
  }

  onExpandUpload () {
    const { isUploadExpand } = this.state
    if (isUploadExpand) this.setState({ isUploadExpand: false })
    else {
      this.setState({
        isUploadExpand: true,
        isPersonalExpand: false,
        isAddressExpand: false
      })
    }
  }

  renderPersonalData () {
    const { isPersonalExpand } = this.state
    return (
      <View style={[styles.viewCollapse, { marginTop: ratioHeight(15) }]}>
        <TouchableOpacity
          style={{ height: ratioHeight(55), justifyContent: 'center' }}
          onPress={() => this.onExpandPersonal()}>
          <View style={[styles.viewRow, { height: ratioHeight(19) }]}>
            <Text style={styles.textTitle}>
              {I18n.t('t_data_pribadi_usaha')}
            </Text>
            {isPersonalExpand === false ? <Image style={styles.btnExpand} source={Images.ic_expand} resizeMode='stretch' />
            : <Image style={styles.btnExpand} source={Images.ic_collapse} resizeMode='stretch' /> }
          </View>
        </TouchableOpacity>
        {isPersonalExpand ? this.renderExpandPersonalData() : <View />}
      </View>
    )
  }

  renderExpandPersonalData () {
    const { sexSelected, IDKTP, bornPlace, bornDateStr, workName, workNameEtc, showDropDownWork, showDropDownSex, isHaveMarket, alert } = this.state
    return (
      <View>
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(18) }]}>
          {I18n.t('l_input_data_detail')}
        </Text>
        <FloatingLabel
          text={I18n.t('l_born_place')}
          alert={alert.bornPlace}
          value={bornPlace}
          separatorColor={alert.bornPlace === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextBornPlace(text)} />
        <View>
          <FloatingLabel
            editable={false}
            text={I18n.t('l_born_date')}
            value={bornDateStr}
            separatorColor={Colors.black_15}
            style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity style={styles.buttonTextInput} onPress={() => this.setState({ showCalendar: true })}>
            <View>
              <Image style={styles.imgRight} source={Images.ic_calendar} resizeMode='stretch' />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FloatingLabel
            text={I18n.t('l_work_name')}
            alert={alert.workName}
            value={workName}
            separatorColor={alert.workName === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: workName === I18n.t('l_work_name') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={this.onLayoutDropDownWork}
            onPress={() => this.setState({ showDropDownWork: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownWork === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>
          {workName.toLowerCase() === I18n.t('p_lainlain').toLowerCase() ? <TextInput
            autoCorrect={false}
            style={styles.formInput}
            underlineColorAndroid={'transparent'}
            value={workNameEtc}
            placeholder={I18n.t('p_work_name')}
            placeholderTextColor={Colors.greyish}
            onChangeText={(text) => this.setState({ workNameEtc: text })} /> : <View />}
        </View>
        <View>
          <FloatingLabel
            text={I18n.t('l_gender')}
            alert={alert.sexSelected}
            value={sexSelected}
            separatorColor={alert.sexSelected === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: sexSelected === I18n.t('l_gender') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={this.onLayoutDropDownSex}
            onPress={() => this.setState({ showDropDownSex: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownSex === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <FloatingLabel
          text={'ID KTP'}
          keyboardType={'numeric'}
          alert={alert.IDKTP}
          value={IDKTP}
          separatorColor={alert.IDKTP === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextIDKTP(text)} />
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(34) }]}>
          {I18n.t('l_input_market_detail')}
        </Text>
        <TouchableOpacity
          style={[styles.haveMarket, { marginTop: ratioHeight(18), marginRight: ratioWidth(15) }]}
          onPress={() => this.onHaveMarket()}>
          <View style={styles.haveMarket}>
            <Text style={[styles.textHaveMarket, { color: isHaveMarket ? Colors.greyish : Colors.squash, marginRight: ratioWidth(10) }]}>
              {I18n.t('l_not_have_market')}
            </Text>
            <Image source={isHaveMarket ? Images.ic_checkbox_off : Images.ic_checkbox_on} style={{ height: ratioWidth(16), width: ratioWidth(16) }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnNext, { backgroundColor: this.validationPersonal() ? Colors.squash : Colors.greyish, bottom: 10 }]}
          onPress={() => this.onNextPersonalData()}>
          <Text style={styles.textNext}>
            {I18n.t('b_next')}
          </Text>
        </TouchableOpacity>
        {isHaveMarket ? this.renderHaveMarket() : <View style={{ height: ratioHeight(68) }} />}
      </View>
    )
  }

  renderHaveMarket () {
    const { marketName, marketPhone, marketBuild, marketType, showDropDownMarket, imageMarket, alert } = this.state
    return (
      <View>
        <FloatingLabel
          text={I18n.t('l_market_name')}
          value={marketName}
          alert={alert.marketName}
          separatorColor={alert.marketName === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextMarketName(text)} />
        <FloatingLabel
          text={I18n.t('l_market_phone')}
          value={marketPhone}
          alert={alert.marketPhone}
          separatorColor={alert.marketPhone === '' ? Colors.black_15 : Colors.red}
          keyboardType={'numeric'}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextMarketPhone(text)} />
        <View>
          <FloatingLabel
            text={I18n.t('l_market_type')}
            alert={alert.marketType}
            value={marketType}
            separatorColor={alert.marketType === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: marketType === I18n.t('l_market_type') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={this.onLayoutDropDownMarket}
            onPress={() => this.setState({ showDropDownMarket: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownMarket === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>
          {marketType.toLowerCase() === I18n.t('p_lainlain').toLowerCase() ? <TextInput
            autoCorrect={false}
            style={styles.formInput}
            underlineColorAndroid={'transparent'}
            value={this.state.marketTypeEtc}
            placeholder={I18n.t('p_market_type')}
            placeholderTextColor={Colors.greyish}
            onChangeText={(text) => this.setState({ marketTypeEtc: text })} /> : <View />}
        </View>
        <FloatingLabel
          text={'Tahun Mulai Usaha'}
          value={marketBuild}
          alert={alert.marketBuild}
          separatorColor={alert.marketBuild === '' ? Colors.black_15 : Colors.red}
          keyboardType={'numeric'}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextMarketBuild(text)} />
        <Text style={[styles.titleTextInput, { marginTop: ratioHeight(10) }]}>
          {I18n.t('l_upload_photo_market')}
        </Text>
        <Image
          style={[styles.imageMarket, { marginTop: ratioHeight(11) }]}
          source={{ uri: imageMarket }}
          resizeMode={'contain'}
        />
        <Text style={[styles.imageDesc, { marginLeft: ratioWidth(25), marginRight: ratioWidth(25) }]}>
          {I18n.t('l_desc_photo_market')}
        </Text>
        <TouchableOpacity
          style={[styles.btnChangeImage, { marginTop: ratioHeight(11) }]}
          onPress={() => this.checkCameraPermission(() => this.onCameraMarket())}>
          <Text style={styles.textBtnChangeImage}>
            {imageMarket === 'http://www.royallepagesudbury.ca/images/no-image.png' ? I18n.t('b_takephoto') : I18n.t('b_changephoto')}
          </Text>
        </TouchableOpacity>
        <View style={{ height: 68 }} />
      </View>
    )
  }

  renderAddressData () {
    const { isAddressExpand } = this.state
    return (
      <View style={[styles.viewCollapse, { marginTop: ratioHeight(6) }]}>
        <TouchableOpacity
          style={{ height: ratioHeight(55), justifyContent: 'center' }}
          onPress={() => this.onExpandAddress()}>
          <View style={[styles.viewRow, { height: ratioHeight(19) }]}>
            <Text style={styles.textTitle}>
              {I18n.t('t_data_address')}
            </Text>
            {isAddressExpand === false ? <Image style={styles.btnExpand} source={Images.ic_expand} resizeMode='stretch' />
            : <Image style={styles.btnExpand} source={Images.ic_collapse} resizeMode='stretch' /> }
          </View>
        </TouchableOpacity>
        {isAddressExpand ? this.renderExpandAddress() : <View />}
      </View>
    )
  }

  renderExpandAddress () {
    const { isAddressSame, addressHeight, KTPLatitude, KTPLongitude, addressKTP, alert,
      addressStateIDKTP, addressDistrictIDKTP, addressCityIDKTP, addressVillageIDKTP,
      showDropDownStateKTP, showDropDownDistrictKTP, showDropDownCityKTP, showDropDownVillageKTP,
      addressDistrictKTP, addressCityKTP, addressVillageKTP } = this.state
    return (
      <View>
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(18) }]}>
          {I18n.t('l_input_address_detail')}
        </Text>
        <FloatingLabel
          text={I18n.t('l_street')}
          alert={alert.addressKTP}
          value={addressKTP}
          separatorColor={alert.addressKTP === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          viewStyle={{ height: addressHeight.heightAddressKTP + ratioHeight(32), marginTop: ratioHeight(12), marginLeft: ratioWidth(15), marginRight: ratioWidth(15) }}
          onContentSizeChange={this.onContentSizeAddressKTP}
          onChangeText={(text) => this.onChangeTextAddressKTP(text)} />
        <View>
          <FloatingLabel
            text={I18n.t('state')}
            alert={alert.addressStateKTP}
            value={addressStateIDKTP}
            separatorColor={alert.addressStateKTP === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressStateIDKTP === I18n.t('state') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownStateKTP(e)}
            onPress={() => this.setState({ showDropDownStateKTP: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownStateKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View>
          <FloatingLabel
            editable={addressDistrictKTP.length > 0}
            text={I18n.t('district')}
            alert={alert.workName}
            value={addressDistrictIDKTP}
            separatorColor={alert.addressDistrictKTP === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressDistrictIDKTP === I18n.t('district') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressDistrictKTP.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownDistrictKTP(e)}
            onPress={() => this.setState({ showDropDownDistrictKTP: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownDistrictKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <View>
          <FloatingLabel
            editable={addressCityKTP.length > 0}
            text={I18n.t('city')}
            alert={alert.addressCityKTP}
            value={addressCityIDKTP}
            separatorColor={alert.addressCityKTP === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressCityIDKTP === I18n.t('city') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressCityKTP.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownCityKTP(e)}
            onPress={() => this.setState({ showDropDownCityKTP: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownCityKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <View>
          <FloatingLabel
            editable={addressVillageKTP.length > 0}
            text={I18n.t('village')}
            alert={alert.addressVillageKTP}
            value={addressVillageIDKTP}
            separatorColor={alert.addressVillageKTP === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressVillageIDKTP === I18n.t('village') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressVillageKTP.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownVillageKTP(e)}
            onPress={() => this.setState({ showDropDownVillageKTP: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownVillageKTP === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <Text style={[styles.titleTextInput, { marginTop: ratioHeight(10) }]}>
          {I18n.t('l_geolocation')}
        </Text>
        <TouchableOpacity onPress={() => this.onKTPGeolocation()}>
          <MapView
            style={styles.map}
            region={{
              latitude: KTPLatitude,
              longitude: KTPLongitude,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025
            }}
            showsUserLocation
            showsMyLocationButton>
            <MapView.Marker
              coordinate={{ latitude: KTPLatitude, longitude: KTPLongitude }}
              image={Images.ic_location}
            />
          </MapView>
        </TouchableOpacity>
        <FloatingLabel
          text=''
          multiline
          editable={false}
          numberOfLines={4}
          value={this.state.addressGeolocationKTP}
          style={{ fontFamily: Fonts.type.robotoLight, color: Colors.greyish, fontSize: moderateScale(12) }}
          viewStyle={{ height: addressHeight.heightAddressGeolocationKTP + ratioHeight(32), marginTop: ratioHeight(-10), marginLeft: ratioWidth(15), marginRight: ratioWidth(15) }}
          onContentSizeChange={this.onContentSizeAddressGeolocationKTP}
          onChangeText={(text) => this.setState({ addressGeolocationKTP: text })} />
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(34) }]}>
          {I18n.t('l_input_address_market_detail')}
        </Text>
        <TouchableOpacity
          style={[styles.haveMarket, { marginTop: ratioHeight(18), marginRight: ratioWidth(15) }]}
          onPress={() => this.onAddressSame()}>
          <View style={styles.haveMarket}>
            <Text style={[styles.textHaveMarket, { color: isAddressSame ? Colors.squash : Colors.greyish, marginRight: ratioWidth(10) }]}>
              {I18n.t('l_address_market_address_same')}
            </Text>
            <Image source={isAddressSame ? Images.ic_checkbox_on : Images.ic_checkbox_off} style={{ height: ratioWidth(16), width: ratioWidth(16) }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnNext, { backgroundColor: this.validationAddress() ? Colors.squash : Colors.greyish, bottom: 10 }]}
          onPress={() => this.onNextAddress()}>
          <Text style={styles.textNext}>
            {I18n.t('b_next')}
          </Text>
        </TouchableOpacity>
        {isAddressSame ? <View style={{ height: ratioHeight(68) }} /> : this.renderAddressSame()}
      </View>
    )
  }

  renderAddressSame () {
    const { addressHeight, marketLatitude, marketLongitude, address, alert,
      addressStateID, addressDistrictID, addressCityID, addressVillageID,
      showDropDownStateMarket, showDropDownDistrictMarket, showDropDownCityMarket, showDropDownVillageMarket,
      addressDistrict, addressCity, addressVillage } = this.state
    return (
      <View>
        <FloatingLabel
          text={I18n.t('l_street')}
          alert={alert.address}
          value={address}
          separatorColor={alert.address === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoLight, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeTextAddress(text)} />
        <View>
          <FloatingLabel
            text={I18n.t('state')}
            alert={alert.addressState}
            value={addressStateID}
            separatorColor={alert.addressState === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressStateID === I18n.t('state') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownStateMarket(e)}
            onPress={() => this.setState({ showDropDownStateMarket: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownStateMarket === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>
        </View>
        <View>
          <FloatingLabel
            editable={addressDistrict.length > 0}
            text={I18n.t('district')}
            alert={alert.workName}
            value={addressDistrictID}
            separatorColor={alert.addressDistrict === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressDistrictID === I18n.t('district') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressDistrict.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownDistrictMarket(e)}
            onPress={() => this.setState({ showDropDownDistrictMarket: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownDistrictMarket === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <View>
          <FloatingLabel
            editable={addressCity.length > 0}
            text={I18n.t('city')}
            alert={alert.addressCity}
            value={addressCityID}
            separatorColor={alert.addressCity === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressCityID === I18n.t('city') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressCity.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownCityMarket(e)}
            onPress={() => this.setState({ showDropDownCityMarket: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownCityMarket === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <View>
          <FloatingLabel
            editable={addressVillage.length > 0}
            text={I18n.t('village')}
            alert={alert.addressVillage}
            value={addressVillageID}
            separatorColor={alert.addressVillage === '' ? Colors.black_15 : Colors.red}
            style={{ fontFamily: Fonts.type.robotoRegular, color: addressVillageID === I18n.t('village') ? Colors.greyish : Colors.slate_grey, fontSize: moderateScale(16) }} />
          {addressVillage.length > 0 && <TouchableOpacity
            style={styles.buttonTextInput}
            onLayout={(e) => this.onLayoutDropDownVillageMarket(e)}
            onPress={() => this.setState({ showDropDownVillageMarket: true, enableScrolling: false })}>
            <Image style={styles.imgRight} source={showDropDownVillageMarket === true ? Images.ic_collapse_dropdown : Images.ic_expand_dropdown} resizeMode='contain' />
          </TouchableOpacity>}
        </View>
        <Text style={[styles.titleTextInput, { marginTop: ratioHeight(10) }]}>
          {I18n.t('l_geolocation')}
        </Text>
        <TouchableOpacity onPress={() => this.onMarketGeolocation()}>
          <MapView
            style={styles.map}
            region={{
              latitude: marketLatitude,
              longitude: marketLongitude,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025
            }}
            showsUserLocation
            showsMyLocationButton>
            <MapView.Marker
              coordinate={{ latitude: marketLatitude, longitude: marketLongitude }}
              image={Images.ic_location}
            />
          </MapView>
        </TouchableOpacity>
        <FloatingLabel
          text=''
          multiline
          editable={false}
          numberOfLines={4}
          value={this.state.addressGeolocation}
          style={{ fontFamily: Fonts.type.robotoLight, color: Colors.greyish, fontSize: moderateScale(12) }}
          viewStyle={{ height: addressHeight.heightAddressGeolocation + ratioHeight(32), marginTop: ratioHeight(-10), marginLeft: ratioWidth(15), marginRight: ratioWidth(15) }}
          onContentSizeChange={this.onContentSizeAddressGeolocation}
          onChangeText={(text) => this.setState({ addressGeolocation: text })} />
        <View style={{ height: ratioHeight(68) }} />
      </View>
    )
  }

  renderUploadData () {
    const { isUploadExpand } = this.state
    return (
      <View style={[styles.viewCollapse, { marginTop: ratioHeight(6) }]}>
        <TouchableOpacity
          style={{ height: ratioHeight(55), justifyContent: 'center' }}
          onPress={() => this.onExpandUpload()}>
          <View style={[styles.viewRow, { height: ratioHeight(19) }]}>
            <Text style={styles.textTitle}>
              {I18n.t('t_upload_photo')}
            </Text>
            {isUploadExpand === false ? <Image style={styles.btnExpand} source={Images.ic_expand} resizeMode='stretch' />
            : <Image style={styles.btnExpand} source={Images.ic_collapse} resizeMode='stretch' /> }
          </View>
        </TouchableOpacity>
        {isUploadExpand ? this.renderExpandUpload() : <View />}
      </View>
    )
  }

  renderExpandUpload () {
    const { imageKTP, imageSelfie } = this.state
    return (
      <View>
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(18) }]}>
          {I18n.t('l_upload_photo_ktp')}
        </Text>
        <Image
          style={[styles.imageMarket, { marginTop: ratioHeight(11) }]}
          source={{ uri: imageKTP }}
          resizeMode={'contain'}
        />
        <Text style={[styles.imageDesc, { marginLeft: ratioWidth(25), marginRight: ratioWidth(25) }]}>
          {I18n.t('l_desc_photo_ktp')}
        </Text>
        <TouchableOpacity
          style={[styles.btnChangeImage, { marginTop: 11 }]}
          onPress={() => this.checkCameraPermission(() => this.onCameraKTP())}>
          <Text style={styles.textBtnChangeImage}>
            {imageKTP === 'http://www.royallepagesudbury.ca/images/no-image.png' ? I18n.t('b_takephoto') : I18n.t('b_changephoto')}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.textSubTitle, { marginTop: ratioHeight(32) }]}>
          {I18n.t('l_upload_photo_selfie')}
        </Text>
        <Image
          style={[styles.imageMarket, { marginTop: ratioHeight(11) }]}
          source={{ uri: imageSelfie }}
          resizeMode={'contain'}
        />
        <Text style={[styles.imageDesc, { marginLeft: ratioWidth(25), marginRight: ratioWidth(25) }]}>
          {I18n.t('l_desc_photo_selfie')}
        </Text>
        <TouchableOpacity
          style={[styles.btnChangeImage, { marginTop: ratioHeight(11) }]}
          onPress={() => this.checkCameraPermission(() => this.onCameraSelfie())}>
          <Text style={styles.textBtnChangeImage}>
            {imageSelfie === 'http://www.royallepagesudbury.ca/images/no-image.png' ? I18n.t('b_takephoto') : I18n.t('b_changephoto')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnNext, { bottom: 10, backgroundColor: this.validationUpload() ? Colors.squash : Colors.greyish }]}
          onPress={() => this.onNextUpload()}>
          <Text style={styles.textNext}>
            {I18n.t('b_next')}
          </Text>
        </TouchableOpacity>
        <View style={{ height: ratioHeight(68) }} />
      </View>
    )
  }

  renderSuccess () {
    return (
      <View style={styles.viewSuccess}>
        <View style={styles.modalSuccess}>
          <Text style={styles.textSuccess}>
            {I18n.t('t_success')}
          </Text>
          <Text style={styles.successDesc}>
            {I18n.t('l_success_kyc')}
          </Text>
          <Button
            style={styles.btnNextSuccess}
            text={I18n.t('b_next')}
            textStyle={styles.textNextSuccess}
            onPress={() => this.props.navigation.navigate('BottomNav')} />
        </View>
      </View>
    )
  }

  render () {
    const { showCalendar, showSuccess, showDropDownWork, showDropDownMarket, showDropDownSex
      , enableScrolling, isAddressExpand, isPersonalExpand, isUploadExpand
      , showDropDownStateMarket, showDropDownDistrictMarket, showDropDownCityMarket, showDropDownVillageMarket
      , showDropDownStateKTP, showDropDownDistrictKTP, showDropDownCityKTP, showDropDownVillageKTP, isLoading, bornDate } = this.state
    return (
      <ScrollView
        style={styles.container}
        scrollEnabled={enableScrolling}>
        <StatusBar barStyle='light-content' backgroundColor={showCalendar ? '#000000' : '#f7981d'} />
        {this.renderPersonalData()}
        {this.renderAddressData()}
        {this.renderUploadData()}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: ratioHeight(15) }}>
          <Image style={{ width: ratioWidth(12), height: ratioWidth(12) }} source={Images.icInfo} resizeMode={'stretch'} />
          <Text style={styles.textInfo}>
            Pastikan data yang Anda isi benar.
          </Text>
        </View>
        <View style={{ height: isAddressExpand === false && isPersonalExpand === false && isUploadExpand === false ? Metrics.screenHeight - (Metrics.navBarHeight + ratioHeight(250)) : ratioHeight(85) }} />
        <TouchableOpacity
          style={[styles.btnVerification, { backgroundColor: this.validationPersonal() && this.validationAddress() && this.validationUpload() ? Colors.nice_blue : Colors.greyish }]}
          onPress={() => this.onNextSuccess()}>
          <Text style={styles.textNext}>
            VERIFIKASI
          </Text>
        </TouchableOpacity>
        {showDropDownWork === true &&
          <DropDown
            ref='dropDownWork'
            onBlur={(show) => this.setState({ showDropDownWork: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemWorkPress(item, show)}
            style={[styles.dropDown, { top: this.layout.yWorkSpeciality, height: this.state.workSpeciality.length < 6 ? this.state.workSpeciality * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.workSpeciality}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yWorkSpeciality }]} />}
        {showDropDownSex === true &&
          <DropDown
            ref='dropDownSex'
            onBlur={(show) => this.setState({ showDropDownSex: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemSexPress(item, show)}
            style={[styles.dropDown, { top: this.layout.ySex, height: this.state.sex.length < 6 ? this.state.sex * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.sex}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.ySex }]} />}
        {showDropDownMarket === true &&
          <DropDown
            ref='dropDownMarket'
            onBlur={(show) => this.setState({ showDropDownMarket: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemMarketPress(item, show)}
            style={[styles.dropDown, { top: this.layout.yMarketSpeciality, height: this.state.marketSpeciality.length < 6 ? this.state.marketSpeciality * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.marketSpeciality}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yMarketSpeciality }]} />}
        {showDropDownStateKTP === true &&
          <DropDown
            ref='dropDownStateKTP'
            onBlur={(show) => this.setState({ showDropDownStateKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemStateKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yStateKTP, height: this.state.addressStateKTP.length < 6 ? this.state.addressStateKTP * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressStateKTP}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yStateKTP }]} />}
        {showDropDownDistrictKTP === true &&
          <DropDown
            ref='dropDownDistrictKTP'
            onBlur={(show) => this.setState({ showDropDownDistrictKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemDistrictKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yDistrictKTP, height: this.state.addressDistrictKTP.length < 6 ? this.state.addressDistrictKTP * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressDistrictKTP}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yDistrictKTP }]} />}
        {showDropDownCityKTP === true &&
          <DropDown
            ref='dropDownCityKTP'
            onBlur={(show) => this.setState({ showDropDownCityKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemCityKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yCityKTP, height: this.state.addressCityKTP.length < 6 ? this.state.addressCityKTP * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressCityKTP}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yCityKTP }]} />}
        {showDropDownVillageKTP === true &&
          <DropDown
            ref='dropDownVillageKTP'
            onBlur={(show) => this.setState({ showDropDownVillageKTP: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemVillageKTPPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yVillageKTP, height: this.state.addressVillageKTP.length < 6 ? this.state.addressVillageKTP * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressVillageKTP}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yVillageKTP }]} />}
        {showDropDownStateMarket === true &&
          <DropDown
            ref='dropDownStateMarket'
            onBlur={(show) => this.setState({ showDropDownStateMarket: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemStateMarketPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yStateMarket, height: this.state.addressState.length < 6 ? this.state.addressState * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressState}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yStateMarket }]} />}
        {showDropDownDistrictMarket === true &&
          <DropDown
            ref='dropDownDistrictMarket'
            onBlur={(show) => this.setState({ showDropDownDistrictMarket: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemDistrictMarketPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yDistrictMarket, height: this.state.addressDistrict.length < 6 ? this.state.addressDistrict * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressDistrict}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yDistrictMarket }]} />}
        {showDropDownCityMarket === true &&
          <DropDown
            ref='dropDownCityMarket'
            onBlur={(show) => this.setState({ showDropDownCityMarket: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemCityMarketPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yCityMarket, height: this.state.addressCity.length < 6 ? this.state.addressCity * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressCity}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yCityMarket }]} />}
        {showDropDownVillageMarket === true &&
          <DropDown
            ref='dropDownVillageMarket'
            onBlur={(show) => this.setState({ showDropDownVillageMarket: false, enableScrolling: true })}
            onItemPress={(item, show) => this.onItemVillageMarketPress(item, false)}
            style={[styles.dropDown, { top: this.layout.yVillageMarket, height: this.state.addressVillage.length < 6 ? this.state.addressVillage * ratioHeight(32) : ratioHeight(200) }]}
            data={this.state.addressVillage}
            backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yVillageMarket }]} />}
        <Modal
          animationType='fade'
          transparent
          visible={showSuccess}
          onRequestClose={() => {}}>
          {this.renderSuccess()}
        </Modal>
        <CustomCalendar
          isShow={showCalendar}
          mode={'date'}
          fromDate={bornDate}
          onCancel={() => this.setState({ showCalendar: false })}
          onOK={(data) => this.onDateChange(data)}
        />
        <Loading size={10} color={Colors.squash} visible={isLoading} onRequestClose={() => this.onRequestClose()} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.location.states.payload,
    district: state.location.district.payload,
    city: state.location.city.payload,
    village: state.location.village.payload,
    workType: state.preset.workType.payload,
    storeType: state.preset.storeType.payload,
    profile: state.profile.getProfile.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(LocationActions.getStateRequest()),
    getDistrict: (id) => dispatch(LocationActions.getDistrictRequest(id)),
    getCity: (id) => dispatch(LocationActions.getCityRequest(id)),
    getVillage: (id) => dispatch(LocationActions.getVillageRequest(id)),
    getWorkType: (token) => dispatch(PresetActions.getWorkTypeRequest(token)),
    getStoreType: (token) => dispatch(PresetActions.getStoreTypeRequest(token)),
    getProfile: (token) => dispatch(ProfileActions.getProfileRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteData)
