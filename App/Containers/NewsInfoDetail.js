import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import { Metrics, Images } from '../Themes/index'

// Styles
import styles from './Styles/NewsInfoDetailStyle'

class NewsInfoDetail extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      title: params.title,
      image: params.image,
      date: params.date,
      desc: params.desc
    }
  }

  render () {
    const { date, title, image, desc } = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        {image && <Image
          style={{ width: Metrics.screenWidth, height: ratioHeight(150) }}
          source={{ uri: image }}
          resizeMode={'stretch'} />}
        <View style={styles.viewDesc}>
          <Text style={styles.textTitle}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: ratioWidth(12), height: ratioWidth(12) }} source={Images.ic_clock} resizeMode={'stretch'} />
            <Text style={[styles.textDate, { flex: 1 }]}>
              {date}
            </Text>
          </View>
          {/* <View style={{ height: ratioHeight(1), backgroundColor: Colors.black_15, marginTop: ratioHeight(10) }} /> */}
          <Text style={styles.textContent}>
            {`\t\t\t${desc}`}
          </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsInfoDetail)
