import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  StatusBar,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts, Images, Metrics } from '../../Themes'
import FloatingLabel from '../../Components/FloatingLabel'
import { maskedDate } from '../../Transforms/LocalConfig'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'
import CalendarModal from '../../Components/CalendarComponent'
import DropDown from '../../Components/DropDown'
import I18n from 'react-native-i18n'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/LoanProfileStyle'

class LoanProfile extends Component {
  constructor (props) {
    super(props)
    this.layout = {
      yGender: 0,
      widthGender: 0
    }
    this.state = {
      calendarMonthYear: Date.now(),
      bornDate: I18n.t('l_borndate'),
      enableScrolling: false,
      alert: {
        ktp: '',
        bornplace: '',
        borndate: '',
        gender: ''
      },
      name: 'Beny Liantriana',
      email: 'beny@skyshi.com',
      ktp: '',
      bornplace: '',
      calendarTimestamp: -1,
      calendarDate: '',
      gender: I18n.t('l_gender'),
      showDropdown: {
        gender: false
      },
      dataGender: [
        {
          'description': I18n.t('l_man')
        },
        {
          'description': I18n.t('l_woman')
        }
      ],
      phone: '081208120812',
      address: 'Jln. Rawa Selatan 4, No 20, RT/RW 08/09',
      province: 'DKI Jakarta',
      city: 'Jakarta Pusat',
      district: 'Johar Baru',
      village: 'Tanah Tinggi',
      postalcode: '10998',
      storename: 'Warung Ibu Rini',
      storetype: 'Toko Kelontong',
      yearStore: '2018',
      storeAddress: 'Jln. Rawa Selatan 4, No 20, RT/RW 08/09',
      storeProvince: 'DKI Jakarta',
      storeCity: 'Jakarta Pusat',
      storeDistrict: 'Johar Baru',
      storeVillage: 'Tanah Tinggi',
      storePostalcode: '10998',
      errorDate: false,
      errorGender: false
    }
  }

  onLayoutGender = (e) => {
    this.layout.yGender = e.nativeEvent.layout.y + ratioHeight(20)
  }

  renderDataProfile () {
    const { alert, bornDate, calendarMonthYear, gender, errorDate, errorGender } = this.state
    let date, colorDate, colorTextDate, colorGender, colorTextGender, errorDateBorn, errorMessageGender
    if (String(bornDate).includes('Tanggal')) {
      date = bornDate
    } else {
      date = maskedDate(bornDate)
    }
    if (errorDate) {
      errorDateBorn = <Text style={styles.texterror}>{I18n.t('e_null')}</Text>
      colorDate = Colors.red
      colorTextDate = Colors.red
    } else {
      errorDateBorn = null
      colorDate = Colors.black_15
      colorTextDate = Colors.slate_grey
    }
    if (errorGender) {
      colorGender = Colors.red
      colorTextGender = Colors.red
      errorMessageGender = <Text style={styles.texterror}>{I18n.t('e_null')}</Text>
    } else {
      colorGender = Colors.black_15
      colorTextGender = Colors.slate_grey
      errorMessageGender = null
    }
    return (
      <View style={styles.box}>
        <Text style={styles.title}>{I18n.t('l_dataprofile')}</Text>
        <FloatingLabel
          text={I18n.t('l_completename')}
          alert=''
          keyboardChange={false}
          value={this.state.name}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_email')}
          alert=''
          keyboardChange={false}
          value={this.state.email}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_ktpid')}
          alert={alert.ktp}
          keyboardChange={false}
          value={this.state.ktp}
          separatorColor={alert.ktp === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeKtp(text)} />
        <FloatingLabel
          text={I18n.t('l_bornplace')}
          alert={alert.bornplace}
          keyboardChange={false}
          value={this.state.bornplace}
          separatorColor={alert.bornplace === '' ? Colors.black_15 : Colors.red}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          onChangeText={(text) => this.onChangeBornPlace(text)} />
        <CalendarModal
          openModal={(value) => console.tron.log(value)}
          closeModal={(value) => console.tron.log(value)}
          current={calendarMonthYear}
          rangeDateChoose={false}
          onChange={(value) => this.changeDate(value)}
          >
          <View style={[ styles.floatlabelContainer, {borderBottomColor: colorDate} ]}>
            <FloatingLabel
              editable={false}
              text='Tanggal Lahir'
              alert={alert.borddate}
              value={date}
              viewStyle={{ paddingLeft: 0 }}
              separatorColor={null}
              style={{ fontFamily: Fonts.type.robotoRegular, color: colorTextDate, fontSize: moderateScale(16) }} />
            <View
              style={styles.buttonTextInput}>
              <Image style={styles.imgRight} source={Images.ic_calendar} resizeMode='stretch' />
            </View>
          </View>
        </CalendarModal>
        <View style={{ flexDirection: 'row' }}>
          {errorDateBorn}
        </View>
        <TouchableOpacity
          style={[styles.floatlabelContainer, { borderBottomColor: colorGender }]}
          onLayout={this.onLayoutGender}
          onPress={() => this.setState({ showDropdown: {...this.state.showDropdown, gender: true} })}
        >
          <FloatingLabel
            editable={false}
            text={I18n.t('l_gender')}
            value={gender}
            viewStyle={{ paddingLeft: 0 }}
            separatorColor={null}
            style={{ fontFamily: Fonts.type.robotoRegular, color: colorTextGender, fontSize: moderateScale(16) }} />
          <View
            style={styles.buttonTextInput}>
            <Image style={styles.arrow} source={Images.ic_expand_dropdown} resizeMode='stretch' />
          </View>
        </TouchableOpacity>
        {errorMessageGender}
        <FloatingLabel
          text={I18n.t('l_phonenumber')}
          alert=''
          keyboardChange={false}
          value={this.state.phone}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_address')}
          alert=''
          keyboardChange={false}
          value={this.state.address}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_province')}
          alert=''
          keyboardChange={false}
          value={this.state.province}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_city')}
          alert=''
          keyboardChange={false}
          value={this.state.city}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_district')}
          alert=''
          keyboardChange={false}
          value={this.state.district}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_village')}
          alert=''
          keyboardChange={false}
          value={this.state.village}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_postalcode')}
          alert=''
          keyboardChange={false}
          value={this.state.postalcode}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <View style={{ height: moderateScale(15), width: moderateScale(10) }} />
      </View>
    )
  }

  renderDataStore () {
    return (
      <View style={[styles.box, { marginTop: 0 }]}>
        <Text style={styles.title}>{I18n.t('l_datastore')}</Text>
        <FloatingLabel
          text={I18n.t('l_storename')}
          alert=''
          keyboardChange={false}
          value={this.state.storename}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_storetype')}
          alert=''
          keyboardChange={false}
          value={this.state.storetype}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_yearstore')}
          alert=''
          keyboardChange={false}
          value={this.state.yearStore}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_address')}
          alert=''
          keyboardChange={false}
          value={this.state.storeAddress}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_province')}
          alert=''
          keyboardChange={false}
          value={this.state.storeProvince}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_city')}
          alert=''
          keyboardChange={false}
          value={this.state.storeCity}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_district')}
          alert=''
          keyboardChange={false}
          value={this.state.storeDistrict}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_village')}
          alert=''
          keyboardChange={false}
          value={this.state.storeVillage}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <FloatingLabel
          text={I18n.t('l_postalcode')}
          alert=''
          keyboardChange={false}
          value={this.state.storePostalcode}
          separatorColor={Colors.black_15}
          style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
          editable={false} />
        <View style={{ height: moderateScale(15), width: moderateScale(10) }} />
      </View>
    )
  }

  renderDataPhotos () {
    return (
      <View style={[styles.box, { marginTop: 0 }]}>
        <Text style={styles.title}>{I18n.t('l_dataphoto')}</Text>
        <View style={styles.photoContainer}>
          <Text style={styles.labelPhoto}>{I18n.t('l_ktpphoto')}</Text>
          <Image style={styles.image} source={Images.backgroundGradient} />
        </View>
        <View style={[styles.photoContainer, { borderBottomWidth: 0 }]}>
          <Text style={styles.labelPhoto}>{I18n.t('l_selfie')}</Text>
          <Image style={styles.image} source={Images.backgroundGradient} />
        </View>
      </View>
    )
  }

  renderButton () {
    const { ktp, bornplace } = this.state
    if (ktp !== '' && bornplace !== '') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.next()}>
            <Text style={styles.textButton}>
              {I18n.t('b_next')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: Colors.greyish}]}
            disabled
          >
            <Text style={styles.textButton}>
              {I18n.t('b_next')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderDropDownGender () {
    const { dataGender, showDropdown } = this.state
    return (
      showDropdown.gender === true &&
        <DropDown
          ref='gender'
          renderItem={this.renderItemGender}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          onBlur={(show) => this.setState({ showDropdown: {...showDropdown, gender: false}, enableScrolling: true })}
          style={[styles.dropDown, { top: this.layout.yGender }]}
          data={dataGender}
          backView={[styles.dropDownComp, { height: Metrics.screenHeight + this.layout.yGender }]} />
    )
  }

  renderItemGender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.genderPress(item.description, item.id, item.amount)}
        style={styles.list}>
        <Text style={styles.textFieldDropDown}>
          {item.description}
        </Text>
      </TouchableOpacity>
    )
  }

  genderPress (label, id) {
    this.setState({
      gender: label,
      showDropdown: {
        ...this.state.showDropdown, gender: false
      },
      errorGender: false
    })
  }

  onChangeKtp = (text) => {
    this.setState({
      ktp: text,
      alert: {...this.state.alert, ktp: ''}
    })
  }

  onChangeBornPlace = (text) => {
    this.setState({
      bornplace: text,
      alert: {...this.state.alert, bornplace: ''}
    })
  }

  changeDate (value) {
    this.setState({
      bornDate: value,
      calendarTimestamp: value,
      calendarDate: this.dateString(value),
      errorDate: false
    })
  }

  dateString (timestamp) {
    moment.locale()
    var day = moment(timestamp)
    var dateStr = moment(day).format('dddd, D MMMM YYYY')
    return dateStr
  }

  next () {
    const { bornDate, gender } = this.state
    if (String(bornDate) === I18n.t('l_borndate')) {
      this.setState({
        errorDate: true
      })
    } else if (String(gender) === I18n.t('l_gender')) {
      this.setState({
        errorGender: true
      })
    } else {
      this.props.navigation.navigate('LoanProfileConfirmation', {
        key: this.props.navigation.state.key
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderDataProfile()}
          {this.renderDataStore()}
          {this.renderDataPhotos()}
          {this.renderButton()}
          {this.renderDropDownGender()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanProfile)
