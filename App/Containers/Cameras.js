import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import KeyEvent from 'react-native-keyevent'
import { Images } from '../Themes'
import ImageResizer from 'react-native-image-resizer'
import Camera from 'react-native-camera'

// Styles
import styles from './Styles/CamerasStyle'

const KEYEVENT_CAMERA = 27

class Cameras extends Component {
  constructor (props) {
    super(props)

    var subTitle = (this.props.navigation.state.params.title === 'Foto KTP')
      ? 'Perhatian: Ambil foto dalam area kotak putih'
        : (this.props.navigation.state.params.title === 'Foto Selfie')
      ? 'Perhatian: Ambil foto dalam area garis putih'
      : 'Perhatian: Ambil foto dalam keadaan lanskap'

    this.state = {
      type: this.props.navigation.state.params.type,
      title: this.props.navigation.state.params.title,
      orientation: this.props.navigation.state.params.orientation,
      subTitle
    }
  }

  componentDidMount () {
    KeyEvent.onKeyDownListener((keyEvent) => {
      if (keyEvent.keyCode === KEYEVENT_CAMERA) {
        this.onCapture()
      }
    })
  }

  componentWillUnmount () {
    KeyEvent.removeKeyDownListener()
  }

  onCapture () {
    if (typeof this.props.navigation.state.params.image === 'function') {
      if (this.refs.camera) {
        this.refs.camera.capture()
          .then((data) => {
            ImageResizer.createResizedImage(data.path, 800, 600, 'JPEG', 10).then((response) => {
              this.props.navigation.state.params.image(response.uri)
              this.props.navigation.goBack()
            }).catch((err) => console.tron.error(err))
          })
          .catch(err => err)
      }
    }
  }

  renderHover () {
    const { title } = this.state
    if (title === 'Foto KTP' || title === 'Foto Kartu Keluarga') {
      return (
        <Image
          style={styles.hover}
          source={Images.hover_ktp}
          resizeMode={'stretch'} />
      )
    } else if (title === 'Foto Selfie') {
      return (
        <Image
          style={styles.hover}
          source={Images.hover_selfie}
          resizeMode={'stretch'} />
      )
    } else {
      return null
    }
  }

  render () {
    const { type, title, orientation, subTitle } = this.state
    const transformOrientation = (orientation === 'landscape') ? [{rotate: '90deg'}] : [{rotate: '0deg'}]
    const headerPosition = (orientation === 'landscape') ? styles.headerLandscape : styles.header
    const titlePosition = (orientation === 'landscape') ? styles.titleContainerLandscape : styles.titleContainer
    const titleStyle = (title === 'Foto KTP' || title === 'Foto Kartu Keluarga') ? {paddingLeft: 0, paddingTop: 0, backgroundColor: 'transparent'} : {}

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Camera
          ref={'camera'}
          style={styles.container}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
          captureQuality={Camera.constants.CaptureQuality['480p']}
          type={type}
          fixOrientation
        />
        {this.renderHover()}
        <View style={[headerPosition, {transform: transformOrientation}]}>
          <TouchableHighlight activeOpacity={0.5} underlayColor='transparent' onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ height: 43, width: 43 }}
              source={Images.ic_close_camera_grey}
              resizeMode={'stretch'}
            />
          </TouchableHighlight>
          <View style={[titlePosition, titleStyle]}>
            <Text style={styles.text}>
              {title}
            </Text>
            <View style={styles.iconTitleContainer}>
              <Text style={styles.subTitle}>
                {subTitle}
              </Text>
              {
              (orientation === 'landscape')
              ? <Image
                style={styles.subIconLandscape}
                source={Images.ic_orien_landscape}
                resizeMode={'stretch'}
              />
              : <Image
                style={styles.subIcon}
                source={Images.ic_orien_protrait}
                resizeMode={'stretch'}
              />
              }
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnCamera}
          onPress={() => this.onCapture()}>
          <Image
            style={{ height: 69, width: 69, transform: transformOrientation }}
            source={Images.ic_camera_round}
            resizeMode={'stretch'} />
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cameras)
