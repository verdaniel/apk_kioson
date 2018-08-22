import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View, Linking, Image } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import StandardMenu from '../../Components/StandardMenu'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { Images } from '../../Themes/'

// Styles
import styles from '../Styles/ContactUsStyle'

class ContactUs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {id: 0, icon: Images.ic_call, title: I18n.t('l_callUs'), desc: I18n.t('l_callUsdescription'), action: () => Linking.openURL('tel:02130056255')},
        {id: 1, icon: Images.ic_email, title: I18n.t('l_email'), desc: I18n.t('l_emaildescription'), action: () => Linking.openURL('mailto:customer.service@kioson.com')}
      ]
    }
  }

  render () {
    const { data } = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <View style={styles.bgColor}>
          <View style={{
            flexDirection: 'row',
            paddingVertical: ratioHeight(15),
            paddingHorizontal: ratioWidth(22)
          }}>
            <Image source={Images.ic_headerContactUs} style={styles.maskedImage} resizeMode='contain' />
            <View style={{marginLeft: ratioWidth(20), justifyContent: 'center'}}>
              <Text style={[styles.robotoMedium]}>
                Layanan Pelanggan Kioson:
              </Text>
              <Text style={styles.robotoRegular}>
                Senin - Minggu{'\n'}
                Pukul 08.00 - 22.00
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.viewBottom}>
          <StandardMenu data={data} />
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)
