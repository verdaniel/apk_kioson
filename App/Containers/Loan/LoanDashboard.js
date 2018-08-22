import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  FlatList
} from 'react-native'
import * as Progress from 'react-native-progress'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import moment from 'moment'

import { price } from '../../Transforms/LocalConfig'
import NoContentTab from '../../Components/NoContentTab'
import ModalOneButton from '../../Components/ModalOneButton'
import ModalTwoButton from '../../Components/ModalTwoButton'
import { Colors, Images } from '../../Themes'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth } from '../../Transforms/Resize'
// Styles
import styles from '../Styles/LoanDashboardStyle'

class LoanDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'Beny Romero Sentosa Selamanya',
      data: [
        {
          'name': 'Pinjaman Saldo',
          'amount': '1000000',
          'item': '',
          'date': 1511335876000,
          'paid': '0',
          'timeLeft': 5
        },
        {
          'name': 'Pinjaman Gadget',
          'amount': '1000000',
          'item': 'Samsung J2 Prime',
          'date': 1511335876000,
          'paid': '250000',
          'timeLeft': 9
        }
      ],
      // data: [],
      isVerified: true,
      failed: false,
      register: false,
      image: 'http://static.businessinsider.sg/sites/2/2017/06/5852f17dca7f0c8c018b5f26.jpg'
      // image: null
    }
  }

  renderNav () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.viewLeft} onPress={() => this.props.navigation.goBack()}>
          <Image source={Images.ic_back} style={styles.imgBack} />
        </TouchableOpacity>
        <View style={styles.viewHeader}>
          <Text style={styles.textTitle}>
            {I18n.t('t_loan')}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderHeader () {
    const { image, name } = this.state
    let tempName
    if (name.length > 25) {
      tempName = name.substring(0, 22)
      tempName = tempName + '...'
    }
    let temp = name.split(' ')
    const renderImage = image === null ? (
      <Text style={styles.initialName}>
        {temp[0][0]}{temp[1][0]}
      </Text>
    ) : (
      <Image style={styles.image} source={{ uri: image }} />
    )
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonRegisterContainer}
          onPress={() => this.register()}
        >
          <View style={styles.imageContainer}>
            {renderImage}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{tempName}</Text>
            <Text style={styles.labelName}>{I18n.t('l_labelregisterdanamas')}</Text>
          </View>
          <Image style={styles.arrow} source={Images.ic_next_calendar} />
        </TouchableOpacity>
      </View>
    )
  }

  renderMenu () {
    const { isVerified } = this.state
    let imageGadget, imageLoan, colorText
    if (!isVerified) {
      imageGadget = Images.gadget_locked
      imageLoan = Images.loan_locked
      colorText = Colors.greyish
    } else {
      imageGadget = Images.gadget_unlocked
      imageLoan = Images.loan_unlocked
      colorText = Colors.nice_blue
    }
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menu} onPress={() => this.gadget()}>
          <Image source={imageGadget} style={styles.imageMenu} />
          <View style={styles.textMenuContainer}>
            <Text style={[styles.ajukan, { color: colorText }]}>{I18n.t('b_request')}</Text>
            <Text style={[styles.ajukan, {fontSize: moderateScale(16), color: colorText}]}>{I18n.t('l_gadget')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => this.loan()}>
          <Image source={imageLoan} style={styles.imageMenu} />
          <View style={styles.textMenuContainer}>
            <Text style={[styles.ajukan, { color: colorText }]}>{I18n.t('b_request')}</Text>
            <Text style={[styles.ajukan, {fontSize: moderateScale(16), color: colorText}]}>{I18n.t('t_riwayat_saldo')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderitem = ({ item }) => {
    const time = moment(item.date).format('DD MMMM YYYY').toString()
    const labelPrice = item.item !== '' ? item.item + ' - Rp ' + price(item.amount) : 'Rp ' + price(item.amount)
    let textPrice = item.paid === '0' ? 'Sudah Lunas' : 'Sisa Bayar ' + price(item.paid)
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.detail()}>
        <View style={{ flexDirection: 'row', marginBottom: moderateScale(10) }}>
          <View style={styles.imageItemContainer}>
            <Image style={styles.imageDanamas} source={Images.danamas} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.titleItem, { flex: 1 }]}>{item.name}</Text>
          <Text style={styles.rincian}>Rincian</Text>
          <Image style={[styles.arrow, { tintColor: Colors.squash, marginLeft: moderateScale(10) }]} source={Images.ic_next_calendar} />
        </View>
        <Text style={styles.amount}>{labelPrice}</Text>
        <View style={{ flexDirection: 'row', marginTop: moderateScale(15), marginBottom: moderateScale(10) }}>
          <Progress.Bar
            progress={item.timeLeft / 10}
            color={Colors.squash}
            borderRadius={moderateScale(5)}
            width={ratioWidth(330)}
            unfilledColor={Colors.white}
            borderColor={Colors.white}
            height={moderateScale(10)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.label, { flex: 1 }]}>{time}</Text>
          <Text style={styles.label}>{textPrice}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderData () {
    const { data } = this.state
    if (data.length > 0) {
      return (
        <View>
          <Text style={styles.labelData}>{I18n.t('l_isloaning')}</Text>
          <FlatList
            data={this.state.data}
            renderItem={this.renderitem}
            keyExtractor={item => item.id}
          />
        </View>
      )
    }
    return <NoContentTab type='loanhistory' />
  }

  buttonShowAll () {
    const { data } = this.state
    if (data.length > 0) {
      return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('LoanHistory')}>
          <Text style={styles.textButton}>{I18n.t('l_allloan')}</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  renderModalNotVerified () {
    return (
      <ModalOneButton
        isOpen={this.state.failed}
        onClosed={() => this.setState({ failed: false })}
        onPress={() => this.setState({ failed: false })}
        title={'GAGAL'}
        desc={'Pengajuan tidak bisa dilakukan. Status\npendaftaran sedang dalam verifikasi.'}
        button={'OK'} />
    )
  }

  renderModalRegister () {
    return (
      <ModalTwoButton
        isOpen={this.state.register}
        onClosed={() => this.setState({ register: false })}
        onPressFalse={() => this.setState({register: false})}
        onPressTrue={() => this.register()}
        title={'GAGAL'}
        desc={'Pengajuan tidak bisa dilakukan. Anda belum\nterdaftar dalam layanan pinjaman.'}
        buttonFalse={'Batal'}
        buttonTrue={'Daftar Sekarang'} />
    )
  }

  register () {
    this.setState({register: false})
    this.props.navigation.navigate('LoanRegisterDanamas')
  }

  gadget () {
    const { isVerified } = this.state
    if (!isVerified) {
      this.setState({ failed: true })
    } else {
      this.props.navigation.navigate('LoanGadget')
    }
  }

  loan () {
    const { isVerified } = this.state
    if (!isVerified) {
      this.setState({ register: true })
    } else {
      this.props.navigation.navigate('LoanBalance')
    }
  }

  detail () {
    this.props.navigation.navigate('LoanDetail')
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {this.renderNav()}
        <ScrollView>
          {this.renderHeader()}
          {this.renderMenu()}
          {this.renderData()}
        </ScrollView>
        {this.buttonShowAll()}
        {this.renderModalNotVerified()}
        {this.renderModalRegister()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanDashboard)
