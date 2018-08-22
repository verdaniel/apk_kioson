import React, { Component } from 'react'
import { View, StatusBar, Text, Image,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import CashBalance from '../../../Components/CashBalance'
import ButtonForm from '../../../Components/ButtonForm'
// import LoadingModal from '../../../Components/Loading'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'
import {RupiahFormat, ReadAbleText} from '../../../Lib/Formater'
import { Images } from '../../../Themes'

// Styles
import styles from '../../Styles/ProductDetailStyle'

class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:
        { id: 0, image: ['https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png', 'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2015/galaxy-s6-topic.png'], name: 'asamsung galaxy j1', price: 2799000, isDiscount: true, discount: 20 }

    }
  }

  renderPagination = (index, total) => {
    return (
      <View style={styles.paginationStyle}>
        <Text style={styles.paginationText}>
          <Text style={styles.paginationTextNormal}>{index + 1}</Text>/{total}
        </Text>
      </View>
    )
  }

  render () {
    const {navigation} = this.props
    const {data} = this.state
    return (
      
      <View style={styles.container}>
         <CashBalance navigation={navigation} /> 
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        
        <View style={styles.flexAll} >
          <View style={styles.flexDetail} >
            <Swiper
              scrollEnabled
              autoPlayTimeout={1000}
              autoplay
              onIndexChanged={value => this.setState({ index: value })}
              renderPagination={this.renderPagination}>
              {data.image.map((data, i) => {
                return (
                  <View key={i} style={styles.slider}>
                    <Image style={styles.imageSlider} source={{ uri: data }} resizeMode='contain' />
                  </View>
                )
              })}
            </Swiper>
            <View style={styles.maskedLabelProduct}>
              <Text style={styles.textProduct}>{ReadAbleText(data.name)}</Text>
              <Image source={Images.ic_discount_color} style={styles.imageDiscount} resizeMode='contain'>
                <Text style={styles.textDiscount}>-{String(data.discount)}%</Text>
              </Image>
            </View>
            <View>
              <Text style={[styles.textPrice, {paddingTop: ratioHeight(7)}]}>{RupiahFormat(data.price - ((data.discount / 100) * data.price))}</Text>
              <Text style={[styles.textLabelDiscount, {paddingTop: ratioHeight(1)}]}>{RupiahFormat(data.price)}</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: ratioWidth(15)}}>
            <ButtonForm
              onPress={() => navigation.navigate('RecipientDetails')}
              disabled={false}
              lable='BELI'
        />
                 <CashBalance navigation={navigation} /> 

        {/* <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets</Text> */}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
