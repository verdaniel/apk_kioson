import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics, Colors } from '../Themes/index'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import Button from '../Components/Button'

// Styles
import styles from './Styles/NewsPromoDetailStyle'

const moment = require('moment')

class NewsPromoDetail extends Component {
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
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView style={styles.container}>
          <Image
            style={{ width: Metrics.screenWidth, height: ratioHeight(150) }}
            source={{ uri: image }}
            resizeMode={'cover'} />
          <View style={styles.viewDesc}>
            <Text style={styles.textTitle}>
              {title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: ratioWidth(12), height: ratioWidth(12) }} source={Images.ic_clock} resizeMode={'stretch'} />
              <Text style={[styles.textDate, { flex: 1 }]}>
                {`Berlaku Hingga : ${date}`}
              </Text>
            </View>
            {/* <View style={{ height: ratioHeight(1), backgroundColor: Colors.black_15, marginTop: ratioHeight(10) }} /> */}
            <Text style={[styles.textContent, { marginTop: ratioHeight(15) }]}>
              {desc}
            </Text>
            <Text style={[styles.textContent, { marginTop: ratioHeight(10) }]}>
              Kode Kupon :
            </Text>
            <View style={styles.viewCoupon}>
              <Text style={styles.textCoupon}>
                MERDEKA
              </Text>
            </View>
            <Text style={[styles.textContent, { marginTop: ratioHeight(10) }]}>
              Caranya :
            </Text>
            <Text style={[styles.textContent, { marginTop: ratioHeight(10), marginBottom: ratioHeight(70) }]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book. It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spn book.
              It has survived not only five centuries, but also the leap into elec roniesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
          <View style={{ height: ratioHeight(1), backgroundColor: Colors.black_15, marginTop: ratioHeight(10) }} />
        </ScrollView>
        <View style={styles.viewButton}>
          <Button
            style={[styles.button, { backgroundColor: Colors.nice_blue }]}
            text={'Tutup'}
            textStyle={[styles.textBtn, { color: Colors.white_two }]}
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            style={[styles.button, { backgroundColor: Colors.squash }]}
            text={'Beli Sekarang'}
            textStyle={[styles.textBtn, { color: Colors.white_two }]}
            onPress={() => {}}
          />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsPromoDetail)
