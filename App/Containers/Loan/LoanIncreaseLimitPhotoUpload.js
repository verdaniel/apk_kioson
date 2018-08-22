import React, { Component } from 'react'
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  PermissionsAndroid
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Colors, Images } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/LoanIncreaseLimitPhotoUploadStyle'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

class LoanIncreaseLimitPhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: '',
      labelphoto: '',
      modalRequest: false
    }
  }

  // componentWillMount () {
  //   const { params } = this.props.navigation.state
  //   this.setState({
  //     key: params.key
  //   })
  // }

  renderPhotos () {
    const { photo } = this.state
    let image = photo === '' ? (
      <Image source={Images.backgroundGradient} style={styles.photo} />
    ) : (
      <Image source={{ uri: photo }} style={styles.photo} />
    )
    return (
      <View style={styles.box}>
        <Text style={styles.labelButton}>
          {I18n.t('l_uploadfamilycard')}
        </Text>
        <View style={{ flexDirection: 'column', marginTop: ratioHeight(25) }}>
          <Text style={styles.textLabel}>
            {I18n.t('l_familycard')}
          </Text>
          {image}
          <Text style={[styles.textLabel, { fontSize: moderateScale(10), marginLeft: ratioWidth(10) }]}>
            {I18n.t('l_notephoto')}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: ratioHeight(15) }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.buttonAddPhoto}
              onPress={() => this.checkCameraPermission(() => this.openCamera())}
            >
              <Text style={styles.textPhoto}>
                {I18n.t('b_takephoto')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderButton () {
    const { photo } = this.state
    const color = photo === '' ? Colors.greyish : Colors.nice_blue
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: color }]}
          disabled={photo === ''}
          onPress={() => this.setState({ modalRequest: true })}
        >
          <Text style={styles.textButton}>
            {I18n.t('b_request')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderModalRequest () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalRequest}
        onRequestClose={() => { this.setState({modalRequest: false}) }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ modalRequest: false })}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.boxModalContainer}>
                <Text style={[styles.modalTitle, { marginTop: ratioHeight(5), marginBottom: ratioHeight(20) }]}>
                  {I18n.t('l_increaselimit')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.modalContent}>
                    {I18n.t('l_increaselimitdescription')}
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
      console.tron.warn('here')
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

  openCamera () {
    this.props.navigation.navigate('Cameras', {
      type: 'back',
      title: I18n.t('l_familycard'),
      image: this.processPhoto,
      orientation: 'landscape'
    })
  }

  processPhoto = (image) => {
    this.setState({ photo: image, labelphoto: I18n.t('l_familycard') + '.jpg' })
  }

  finish () {
    this.setState({ modalRequest: false })
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
          {this.renderPhotos()}
        </ScrollView>
        {this.renderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanIncreaseLimitPhotoUpload)
