import React, { Component } from 'react'
import {
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Colors, Images, Metrics } from '../../Themes'
import ModalTwoButton from '../../Components/ModalTwoButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { price } from '../../Transforms/LocalConfig'
// Styles
import styles from '../Styles/LoanIncreaseLimitStyle'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight } from '../../Transforms/Resize'

class LoanIncreaseLimit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      limit: '1000000',
      status: 2, // 0: idle, 1: waiting, 2: denied,
      showModalRequest: false,
      modalRequest: false
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
            {I18n.t('l_titleLoanIncreaseLimit')}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: ratioHeight(15) }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.buttonAddPhoto}
              onPress={() =>
                this.props.navigation.navigate('Cameras', {
                  type: 'back',
                  title: I18n.t('l_familycard'),
                  image: this.processPhoto,
                  orientation: 'landscape'
                })
              }
            >
              <Text style={styles.textPhoto}>
                {I18n.t('b_takephoto')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.viewRight}>
          <Image source={Images.ic_tanya_putih} style={styles.help} />
        </TouchableOpacity>
      </View>
    )
  }

  renderBody () {
    const { limit, status } = this.state
    let description
    switch (status) {
      case 0:
        description = I18n.t('l_increaselimitplafon')
        break
      case 1:
        description = I18n.t('l_waitingverification')
        break
      case 2:
        description = I18n.t('e_requestdenied')
        break
      default:
        description = I18n.t('l_increaselimitplafon')
        break
    }
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.limitContainer}>
            <Text style={styles.titlePlafon}>PLAFON DANAMAS ANDA</Text>
            <Text style={[styles.titlePlafon, { fontSize: moderateScale(36), fontWeight: '0', marginTop: moderateScale(10) }]}>Rp {price(limit)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.plafonContainer} onPress={() => this.request()}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.labelPlafon}>{I18n.t('l_titleLoanIncreaseLimit')}</Text>
            <Text style={styles.labelPlafonDes}>{description}</Text>
          </View>
          <Image style={styles.arrow} source={Images.ic_next_calendar} />
        </TouchableOpacity>
      </View>
    )
  }

  renderModalRequest () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalRequest}
        onClosed={() => this.setState({ modalRequest: false })}
        onPressFalse={() => this.setState({modalRequest: false})}
        onPressTrue={() => this.setState({modalRequest: false})}
        title={'NAIK PLAFON'}
        desc={'Anda ingin mengajukan kenaikan plafon lagi?\nSilahkan hubungi CS Kioson.'}
        buttonFalse={'Batal'}
        buttonTrue={'Hubungi CS'} />
    )
  }

  request () {
    const { showModalRequest } = this.state
    if (showModalRequest) {
      this.setState({ modalRequest: true })
    } else {
      // navigate to form request increase plafon
      this.props.navigation.navigate('LoanIncreaseLimitPhotoUpload')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNav()}
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <View style={{ height: Metrics.screenHeight / 2 - ratioHeight(200) }} />
        <ScrollView>
          {this.renderBody()}
        </ScrollView>
        {this.renderModalRequest()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanIncreaseLimit)
