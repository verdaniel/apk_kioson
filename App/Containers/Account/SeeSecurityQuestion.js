import React, { Component } from 'react'
import { Text, View, StatusBar, AsyncStorage, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import ModalOneButton from '../../Components/ModalOneButton'
import Switchs from '../../Components/Switch'
import ModalTwoButton from '../../Components/ModalTwoButton'

// Styles
import styles from '../Styles/SettingAccountStyle'
import { Colors, Images } from '../../Themes/index'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

class SeeSecurityQuestion extends Component {
    navigate (route) {
        const navigate = NavigationActions.navigate({
          routeName: route,
          params: {},
          action: NavigationActions.navigate({ routeName: route })
        })
        this.props.navigation.dispatch(navigate)
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
          return (
            <View style={{ flex: 1 }}>
              <View style={[{backgroundColor: Colors.white_two, marginVertical: ratioHeight(8)}]}>
                {/* {this.renderMenu( 'Ganti Pertanyaan Keamanan', 0, 0.8, () => this.navigate('SeeSecurityQuestion'))} */}
              </View>
              <View style={[{ backgroundColor: Colors.white_two, marginTop: ratioHeight(-6) }]}>
                {/* {this.renderMenu('Lihat Pertanyaan Keamanan', 0, 0.8, () => this.navigate('SettingAccount'))}   */}
                
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeSecurityQuestion)
