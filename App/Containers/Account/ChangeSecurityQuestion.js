import React, { Component } from 'react'
import { Text, View, StatusBar, AsyncStorage, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ModalOneButton from '../../Components/ModalOneButton'
import Switchs from '../../Components/Switch'
import ModalTwoButton from '../../Components/ModalTwoButton'
import MakesureChangeSecurityQuestion from '../../Components/MakesureChangeSecurityQuestion'
import FormInput from '../../Components/FormInput'
import FloatingLabel from '../../Components/FloatingLabel'
import PlaceholderModalDropdown from '../../Components/PlaceholderModalDropdown'
import ButtonForm from '../../Components/ButtonForm'

import { moderateScale } from '../../Transforms/Scaling'


import I18n from '../../I18n'


// Styles
// import styles from '../Styles/SettingAccountStyle'
import styles from '../Styles/FormPulsaStyle'

import { Colors, Images, Fonts } from '../../Themes/index'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

class ChangeSecurityQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      serviceProductChoose: I18n.t('p_cableTVProvider'),
      presetTv: [
        {
          'operator': 'Siapa',
          'id': 299
        },
        {
          'operator': 'Apa',
          'id': 319
        },
        {
          'operator': 'Dimana',
          'id': 122
        },
        {
          'operator': 'Kemana',
          'id': 183
        },
        {
          'operator': 'Berapa',
          'id': 116
        }
      ],      
    }
  }
    navigate (route) {
        const navigate = NavigationActions.navigate({
          routeName: route,
          params: {},
          action: NavigationActions.navigate({ routeName: route })
        })
        this.props.navigation.dispatch(navigate)
      }
    
      

      renderRowPreset (rowData, rowID, highlighted) {
        return (
          <TouchableOpacity style={styles.list} underlayColor='cornflowerblue'>
            <Text style={[styles.textList]}>
              {rowData.operator}
            </Text>
          </TouchableOpacity>
        )
      }
    
      renderButtonTextPreset (rowData) {
        const { operator, id } = rowData
        this.setState({
          serviceProductId: id,
          serviceProductChoose: operator,
          serviceProductPreset: operator
        })
        return `${operator}`
      }

      checkField () {
        const { idCustomer, phoneNumber, errorMessage } = this.state
        if ((idCustomer.length >= 10 && errorMessage.idCustomer === '') && (phoneNumber.length >= 10 && errorMessage.phoneNumber === '')) {
          return false
        }
        return true
      }
    

      renderMenu (title, borderBottom = 1,  activeOpacity = 0.8, action) {
        return (
          <TouchableOpacity activeOpacity={activeOpacity} style={styles.flexOneRow} onPress={action}>
            <View style={[styles.flexColMenu, {borderBottomWidth: borderBottom}]}>
              <View style={styles.flexRowMenu}>
                <Text allowFontScaling style={[styles.robotoRegBigSlate, {flex: 1}]}>{title}</Text>
               <Image
                  style={styles.imageArrow}
                  source={Images.ic_next_calendar}
                  resizeMode={'contain'} />
              </View>
            </View>
          </TouchableOpacity>
        )
      }
    
    
      renderView () {
        const {  serviceProductChoose, presetTv } = this.state
          return (
            <View style={{ flex: 1 }}>
             <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.form}>
                  <PlaceholderModalDropdown
                          title={'Pilih Pertanyaan'}
                          isLeftVisible={false}
                          marginTop={9}
                          disabled={false}
                          options={presetTv}
                          defaultValue={'Pilih Pertanyaan'}
                          renderRow={this.renderRowPreset.bind(this)}
                          renderButtonText={(rowData) => this.renderButtonTextPreset(rowData)}
                        />  
                  <FloatingLabel
                  text='Jawaban Anda'
                  keyboardChange={false}
                  //  alert={alert.name}
                  style={{ fontFamily: Fonts.type.robotoRegular, color: Colors.slate_grey, fontSize: moderateScale(16) }}
                  //  value={name}
                  //  onFocus={() => this.setState({keyboardshow: true})}
                  //  onBlur={() => {
                  //    this.setState({
                  //      keyboardshow: false
                  //    })
                  //  }}
                  changeColor={[Colors.greyish, Colors.nice_blue]}
                  viewStyle={{ marginLeft: 0, marginRight: 0 }}
                  //  onChangeText={(text) => this.setState({ name: text, alert: {...alert, name: AlertMessage.non} })}
                  separatorColor={ Colors.black_15 }/>
                     

                </View>
                  <MakesureChangeSecurityQuestion/>
                  </ScrollView>
                <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
                  <ButtonForm
                    onPress={() => this.onBeliClick()}
                    disabled={false}
                  />
                </View>  
            </View>
          )
      }
    
      render () {
        let scrollw
          = (
            <ScrollView>
              {this.renderView()}
            </ScrollView>
          )
        return (
          <View style={{ flex: 1 }}>
            {scrollw}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSecurityQuestion)
