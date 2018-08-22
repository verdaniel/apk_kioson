import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import accounting from 'accounting'
import { Colors, Images } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/LoanProfileConfirmationStyle'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

class LoanProfileConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expandProfile: false,
      expandStore: false,
      expandPhotos: false,
      profile: {
        name: 'Beny Liantriana',
        email: 'beny@skyshi.com',
        ktp: '3471901',
        bornPlace: 'Yogyakarta',
        bornDate: '11/12/2017',
        gender: 'Laki-laki',
        phone: '081208120812',
        address: 'Jl. Rawa Selatan 4, No. 20 RT/RW 08/09',
        province: 'DKI Jakarta',
        city: 'Jakarta Pusat',
        district: 'Johar Baru',
        village: 'Tanah Tinggi',
        postalCode: '10998'
      },
      stores: {
        name: 'Warung Bu Rini',
        type: 'Toko Kelontong',
        year: '2000',
        address: 'Jalan Mangga 12, No 1 RT/RW 05/01',
        province: 'DKI Jakarta',
        city: 'Jakarta Pusat',
        district: 'Menteng',
        village: 'Menteng Selatan',
        postalCode: '10998'
      },
      modalSuccess: false,
      // key: -1,
      type: 2, // 1 => loan confirmation profile, 2 => status profile loan
      isVerifying: false,
      canLoan: true,
      limit: 1000000
    }
  }

  componentWillMount () {
    // const { params } = this.props.navigation.state
    // this.setState({
    //   key: params.key
    // })
  }

  renderHeader () {
    const { type } = this.state
    let title
    if (type === 1) {
      title = I18n.t('t_loanprofileconfirmation')
    } else if (type === 2) {
      title = I18n.t('l_loanstatusprofile')
    }
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.ic_back} style={styles.imgBack} resizeMode='stretch' />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {title}
          </Text>
        </View>
        <View style={styles.viewRight} />
      </View>
    )
  }

  renderProfile () {
    const { expandProfile, profile } = this.state
    let image, dataProfile
    if (expandProfile) {
      image = Images.ic_collapse
      dataProfile = (
        <View style={{ flexDirection: 'column', marginTop: ratioHeight(25) }}>
          {this.renderData(I18n.t('l_completename'), profile.name)}
          {this.renderData(I18n.t('l_email'), profile.email)}
          {this.renderData(I18n.t('l_ktpid'), profile.ktp)}
          {this.renderData(I18n.t('l_bornplace'), profile.bornPlace)}
          {this.renderData(I18n.t('l_borndate'), profile.bornDate)}
          {this.renderData(I18n.t('l_gender'), profile.gender)}
          {this.renderData(I18n.t('l_phonenumber'), profile.phone)}
          {this.renderData(I18n.t('l_address'), profile.address)}
          {this.renderData(I18n.t('l_province'), profile.province)}
          {this.renderData(I18n.t('l_city'), profile.city)}
          {this.renderData(I18n.t('l_district'), profile.district)}
          {this.renderData(I18n.t('l_village'), profile.village)}
          {this.renderData(I18n.t('l_postalcode'), profile.postalCode)}
        </View>
      )
    } else {
      image = Images.ic_expand
      dataProfile = null
    }
    return (
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.rowButton}
          onPress={() => expandProfile ? this.setState({ expandProfile: false }) : this.setState({ expandProfile: true })}
        >
          <Text style={styles.labelButton}>
            {I18n.t('l_dataprofile')}
          </Text>
          <Image source={image} style={styles.dropdown} />
        </TouchableOpacity>
        {dataProfile}
      </View>
    )
  }

  renderStore () {
    const { expandStore, stores } = this.state
    let image, dataStore
    if (expandStore) {
      image = Images.ic_collapse
      dataStore = (
        <View style={{ flexDirection: 'column', marginTop: ratioHeight(25) }}>
          {this.renderData(I18n.t('l_storename'), stores.name)}
          {this.renderData(I18n.t('l_storetype'), stores.type)}
          {this.renderData(I18n.t('l_yearstore'), stores.year)}
          {this.renderData(I18n.t('l_address'), stores.address)}
          {this.renderData(I18n.t('l_province'), stores.province)}
          {this.renderData(I18n.t('l_city'), stores.city)}
          {this.renderData(I18n.t('l_district'), stores.district)}
          {this.renderData(I18n.t('l_village'), stores.village)}
          {this.renderData(I18n.t('l_postalcode'), stores.postalCode)}
        </View>
      )
    } else {
      image = Images.ic_expand
      dataStore = null
    }
    return (
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.rowButton}
          onPress={() => expandStore ? this.setState({ expandStore: false }) : this.setState({ expandStore: true })}
        >
          <Text style={styles.labelButton}>
            {I18n.t('l_datastore')}
          </Text>
          <Image source={image} style={styles.dropdown} />
        </TouchableOpacity>
        {dataStore}
      </View>
    )
  }

  renderPhotos () {
    const { expandPhotos } = this.state
    let image, dataPhotos
    if (expandPhotos) {
      image = Images.ic_collapse
      dataPhotos = (
        <View style={{ flexDirection: 'column', marginTop: ratioHeight(25) }}>
          <Text style={styles.textLabel}>
            {I18n.t('l_ktpphoto')}
          </Text>
          <Image source={Images.backgroundGradient} style={styles.photo} />
          <Text style={[styles.textLabel, { marginTop: ratioHeight(10) }]}>
            {I18n.t('l_selfie')}
          </Text>
          <Image source={Images.backgroundGradient} style={styles.photo} />
        </View>
      )
    } else {
      image = Images.ic_expand
      dataPhotos = null
    }
    return (
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.rowButton}
          onPress={() => expandPhotos ? this.setState({ expandPhotos: false }) : this.setState({ expandPhotos: true })}
        >
          <Text style={styles.labelButton}>
            {I18n.t('l_dataphoto')}
          </Text>
          <Image source={image} style={styles.dropdown} />
        </TouchableOpacity>
        {dataPhotos}
      </View>
    )
  }

  renderNote () {
    const { type, isVerifying } = this.state
    if (type === 2 && isVerifying) {
      return (
        <View style={styles.noteContainer}>
          <View style={styles.round}>
            <Text style={styles.textRound}>!</Text>
          </View>
          <Text style={styles.textNote}>
            {I18n.t('l_noteverifying')}
          </Text>
        </View>
      )
    }
    return null
  }

  renderLimit () {
    const { type, canLoan, limit } = this.state
    var options = {
      symbol: '',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var money = accounting.formatMoney(limit, options)
    if (type === 2 && canLoan) {
      return (
        <View style={styles.noteContainer}>
          <View style={styles.round}>
            <Text style={styles.textRound}>!</Text>
          </View>
          <Text style={styles.textNote}>
            {I18n.t('l_notelimit', { limit: money })}
          </Text>
        </View>
      )
    }
    return null
  }

  renderButton () {
    const { type, canLoan } = this.state
    if (type === 1) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.setState({ modalSuccess: true })}>
            <Text style={styles.textButton}>
              {I18n.t('b_signup')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (type === 2 && canLoan) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate(
              'LoanIncreaseLimit', { key: this.props.navigation.state.key
              })}
          >
            <Text style={styles.textButton}>
              {I18n.t('b_limitloan')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }

  renderData (label, data) {
    return (
      <View style={{ flexDirection: 'row', marginTop: ratioHeight(7) }}>
        <Text style={styles.textLabel}>
          {label}
        </Text>
        <View style={{ height: ratioHeight(2), width: ratioWidth(10) }} />
        <Text style={styles.textData}>
          {data}
        </Text>
      </View>
    )
  }

  renderModalConfirm () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalSuccess}
        onRequestClose={() => { this.setState({modalSuccess: false}) }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ modalSuccess: false })}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.boxModalContainer}>
                <Text style={[styles.modalTitle, { marginTop: ratioHeight(5), marginBottom: ratioHeight(20) }]}>
                  {I18n.t('l_finish')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalContent}>
                    {I18n.t('l_loanprofileverifying')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: ratioHeight(20) }}>
                  <TouchableOpacity style={styles.buttonConfirm} onPress={() => this.finish()}>
                    <Text style={styles.textButton}>
                      {I18n.t('t_ok')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  finish () {
    this.setState({ modalSuccess: false })
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderHeader()}
        <ScrollView>
          {this.renderProfile()}
          {this.renderStore()}
          {this.renderPhotos()}
          {this.renderNote()}
          {this.renderLimit()}
        </ScrollView>
        {this.renderButton()}
        {this.renderModalConfirm()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanProfileConfirmation)
