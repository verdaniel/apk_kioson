import React, { Component } from 'react'
import { StatusBar, WebView, View, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

// Styles
import styles from '../Styles/AboutKiosonStyle'

class AboutKioson extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render () {
    let jsCode = `
    document.getElementById("mk-header-1").remove();
    document.getElementById("layerslider_5").remove();
    document.getElementById("lhc_status_container").remove();
    document.getElementById("page-section-52").remove();
    document.getElementById("mk-footer-unfold-spacer").remove();
    document.getElementById("mk-footer").remove();
    document.getElementsByClassName("bottom-corner-btns js-bottom-corner-btns").remove();
    document.getElementsByClassName("mk-fullscreen-search-overlay").remove();
    document.getElementsByClassName("mk-page-section-wrapper").remove();
    document.getElementsByClassName("mk-main-wrapper-holder").remove();
    document.getElementsByClassName("mk-page-section-wPrapper").remove();
    document.getElementsByClassName("wpb_row vc_row vc_row-fluid mk-fullwidth-true attched-false js-master-row").remove();
    document.getElementsByClassName("vc_col-sm-12 wpb_column column_container_ height-full").remove();
    document.getElementsByClassName("ls-fullscreen-wrapper").remove();
    `

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <Image resizeMode='contain' source={Images.logoKioson} style={{height: ratioHeight(40), width: ratioWidth(158), marginLeft: ratioWidth(30), marginVertical: ratioHeight(25)}} />
        <WebView
          scrollEnabled={false}
          injectedJavaScript={jsCode}
          onLoadStart={() => this.setState({loading: true})}
          onLoadEnd={() => this.setState({loading: false})}
          renderLoading={() => { return (<ActivityIndicator style={styles.ActivityIndicatorStyle} color={Colors.squash} size='large' />) }}
          startInLoadingState
          source={{uri: 'https://www.kioson.com/about/'}}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutKioson)
