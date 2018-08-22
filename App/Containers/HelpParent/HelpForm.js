import React, { Component } from 'react'
import { ScrollView, StatusBar, View, TextInput, Text, Easing, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-customized-image-picker'
import Validator from '../../Services/Validate'
import I18n from 'react-native-i18n'
import Modal from 'react-native-modalbox'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { Colors, Images, Fonts } from '../../Themes/'
import ButtonForm from '../../Components/ButtonForm'
import { moderateScale } from '../../Transforms/Scaling'

// Styles
import styles from '../Styles/HelpFormStyle'

class HelpForm extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      topic: params.topic || '',
      description: '',
      phoneNumber: '',
      attachment: '',
      showLength: false,
      maxLine: 2000,
      height: 0,
      image: '',
      isError: {
        topic: '',
        description: '',
        phoneNumber: '',
        fileSize: 0
      },
      modal: false
    }
  }

  onChangeText (text, form) {
    switch (form) {
      case 'topic':
        this.setState({
          topic: text
        })
        break
      case 'description':
        this.setState({
          description: text,
          showLength: true
        })
        break
      case 'phoneNumber':
        this.setState({
          phoneNumber: text
        })
        break
      default:
        break
    }
  }

  pickImage () {
    ImagePicker.openPicker({
      multiple: false,
      title: 'Pilih Foto',
      compressQuality: 50
    }).then(image => {
      this.setState({image: image, fileSize: image[0].size})
    })
  }

  checkForm () {
    const {isError, topic, description, phoneNumber} = this.state
    if ((topic.length >= 6 && isError.topic === '') &&
    (description.length >= 100 && isError.description === '') &&
    (phoneNumber.length >= 10 && isError.phoneNumber === '')) {
      return false
    }
    return true
  }

  backHome () {
    this.setState({modal: false})
    this.props.navigation.navigate('BottomNav')
  }

  render () {
    const { isError, topic, description, phoneNumber, image, fileSize, showLength, maxLine, height } = this.state
    if (image) {
      this.fileName = image[0].path.split('/').pop()
      this.textButton = 'Ganti File'
    } else {
      this.fileName = ''
      this.textButton = 'Unggah File'
    }
    var isButtonDisable = this.checkForm()
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
          <View style={styles.form}>
            <View style={[isError.topic ? styles.maskedTextInputError : styles.maskedTextInput]}>
              <Text style={styles.lableText}>Topik Bantuan</Text>
              <TextInput
                value={topic}
                onChangeText={(text) => this.onChangeText(text, 'topic')}
                style={styles.textInput}
                placeholderTextColor={Colors.greyish}
                underlineColorAndroid={Colors.transparent}
                onBlur={() => {
                  this.setState({
                    isError: {...isError, topic: Validator(topic, 'topic')}
                  })
                }}
                  />
            </View>
            <View style={[isError.description ? styles.maskedTextInputError : styles.maskedTextInput]}>
              {isError.topic ? <Text style={styles.error}>{isError.topic}</Text> : null}
              <Text style={styles.lableText}>Deskripsi Bantuan</Text>
              <TextInput
                value={description}
                maxLength={maxLine}
                onChangeText={(text) => this.onChangeText(text, 'description')}
                style={[styles.textInput, {height: height}]}
                placeholderTextColor={Colors.greyish}
                underlineColorAndroid={Colors.transparent}
                multiline
                onContentSizeChange={(event) => {
                  this.setState({height: event.nativeEvent.contentSize.height + 7})
                }}
                onBlur={() => {
                  this.setState({
                    showLength: false,
                    isError: {...isError, description: Validator(description, 'description')}
                  })
                }}
                  />
              {showLength ? <Text style={[styles.lableText, {paddingVertical: ratioHeight(10), textAlign: 'right', color: Colors.greyish, fontFamily: Fonts.type.robotoRegular, fontSize: moderateScale(12)}]}>{maxLine - parseInt(description.length)}/2000</Text> : null}
            </View>
            <View style={[isError.phoneNumber ? styles.maskedTextInputError : styles.maskedTextInput]}>
              {isError.description ? <Text style={styles.error}>{isError.description}</Text> : null}
              <Text style={styles.lableText}>Nomor Ponsel</Text>
              <TextInput
                keyboardType={'numeric'}
                value={phoneNumber}
                onChangeText={(text) => this.onChangeText(text, 'phoneNumber')}
                style={styles.textInput}
                placeholderTextColor={Colors.greyish}
                underlineColorAndroid={Colors.transparent}
                onBlur={() => {
                  this.setState({
                    isError: {...isError, phoneNumber: Validator(phoneNumber, 'customerPhoneNumber')}
                  })
                }}
                  />
            </View>
            <View style={[fileSize > 6000 ? styles.maskedTextInputCustomError : styles.maskedTextInputCustom]}>
              {isError.phoneNumber ? <Text style={styles.error}>{isError.phoneNumber}</Text> : null}
              <Text style={styles.lableText}>Lampiran</Text>
              <View
                style={{marginTop: ratioHeight(9), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text style={[styles.lableText, {color: Colors.nice_blue, flex: 1, textAlign: 'right', marginRight: ratioWidth(15)}]}>{this.fileName}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.pickImage()} >
                  <Text style={styles.labelButton}>{this.textButton}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {fileSize > 6000 ? <Text style={[styles.errorCustom]}>{I18n.t('e_minimumfile')}</Text> : null}
          </View>
        </ScrollView>
        <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}} >
          <ButtonForm
            onPress={() => this.setState({modal: true})}
            disabled={isButtonDisable}
        />
        </View>
        <Modal
          backdropOpacity={100}
          style={styles.modalFix}
          backButtonClose
          position={'center'}
          easing={Easing.elastic(1)}
          backdropColor={Colors.black_35}
          backdropPressToClose
          backdrop
          swipeToClose={false}
          isOpen={this.state.modal}
          onClosed={() => this.setState({modal: false})}>
          <Image source={Images.ic_send_help} style={styles.images} resizeMode='contain' />
          <Text style={styles.textmodal}>CS kami akan segera menghubungi Anda.</Text>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={() => this.backHome()}
            >
            <Text style={styles.textButtonmodal}>Beranda</Text>
          </TouchableOpacity>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpForm)
