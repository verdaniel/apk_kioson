import React, { Component } from 'react'
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

import { price } from '../../Transforms/LocalConfig'
import ModalOneButton from '../../Components/ModalOneButton'
import { Colors, Images } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { moderateScale } from '../../Transforms/Scaling'
import styles from '../Styles/LoanRegisterStyle'

class LoanRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 2, // 0: not registered, 1: process, 2: verified, 3: denied
      limit: '1000000',
      modalProcess: false
    }
  }

  renderDanamas () {
    let title, description, textButton, style
    switch (this.state.status) {
      case 0:
        title = I18n.t('l_registerdanamas')
        description = I18n.t('l_registerdanamasdescription')
        textButton = <Text style={styles.textButtonGrey}>{I18n.t('e_notregistered')}</Text>
        style = { borderWidth: moderateScale(1), borderColor: Colors.greyish }
        break
      case 1:
        title = I18n.t('l_registerdanamas')
        description = I18n.t('l_waitingverification')
        textButton = <Text style={styles.textButtonGrey}>{I18n.t('l_procces')}</Text>
        style = { borderWidth: moderateScale(1), borderColor: Colors.greyish }
        break
      case 2:
        title = I18n.t('l_plafondanamas')
        description = I18n.t('l_plafondanamasdes', { limit: 'Rp ' + price(this.state.limit) })
        textButton = <Text style={[styles.textButtonGrey, { color: Colors.snow }]}>{I18n.t('l_verifed')}</Text>
        style = { backgroundColor: Colors.squash }
        break
      case 3:
        title = I18n.t('l_registerdanamas')
        description = I18n.t('l_denieddes')
        textButton = <Text style={styles.textButtonGrey}>{I18n.t('l_denied')}</Text>
        style = { borderWidth: moderateScale(1), borderColor: Colors.greyish }
        break
      default:
        break
    }
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.register()}>
        <View style={{ flexDirection: 'row', marginBottom: moderateScale(10) }}>
          <View style={styles.imageItemContainer}>
            <Image style={styles.imageDanamas} source={Images.danamas} />
            <View style={{ flex: 1 }} />
            <View style={[styles.buttonStatus, style]}>
              {textButton}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.amount}>{title}</Text>
            <Text style={[styles.label, { fontSize: moderateScale(14) }]}>{description}</Text>
          </View>
          <Image style={[styles.arrow, { tintColor: Colors.nice_blue, marginLeft: moderateScale(10) }]} source={Images.ic_next_calendar} />
        </View>
      </TouchableOpacity>
    )
  }

  renderModalProcess () {
    return (
      <ModalOneButton
        isOpen={this.state.modalProcess}
        onClosed={() => this.setState({ modalProcess: false })}
        onPress={() => this.setState({ modalProcess: false })}
        title={I18n.t('t_registerisprocessing')}
        desc={I18n.t('l_registerisprocessingdes')}
        button={'OK'} />
    )
  }

  register () {
    const { status } = this.state
    switch (status) {
      case 0:
        break
      case 1:
        this.setState({
          modalProcess: true
        })
        break
      case 2:
        this.props.navigation.navigate('LoanIncreaseLimit')
        break
      case 3:
        break
      default:
        break
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView style={styles.bodyContainer}>
          <Text style={styles.title}>{I18n.t('t_serviceprovider')}</Text>
          {this.renderDanamas()}
        </ScrollView>
        {this.renderModalProcess()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanRegister)
