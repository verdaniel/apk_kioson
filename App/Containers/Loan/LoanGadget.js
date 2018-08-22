import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import ModalOneButton from '../../Components/ModalOneButton'
import { price } from '../../Transforms/LocalConfig'
import { moderateScale } from '../../Transforms/Scaling'
import { Colors, Images } from '../../Themes'
// Styles
import styles from '../Styles/LoanGadgetStyle'

class LoanGadget extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actived: false,
      modalFailed: false,
      data: [
        {
          name: 'Samsung J2 Prime',
          price: '1630698',
          image: 'https://files.btcbahamas.com/2016/12/15/fix-j2prime.png',
          description: 'Galaxy J2 Prime dengan layar 5 inci, prosesor quad-core MediaTek MT6737T, RAM 1,5 GB, media internal 8 GB, baterai 2.600 mAh, serta kamera 8 megapiksel dan 5 megapiksel.'
        }
      ]
    }
  }

  renderService () {
    const { actived } = this.state
    const image = actived ? Images.radioOn : Images.radioOff
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.labelTitle}>{I18n.t('l_selectServiceProvider')}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.serviceContainer}>
            <Text style={[styles.title, { flex: 1 }]}>Danamas</Text>
            <Image source={Images.danamas} style={styles.iconDanamas} />
            <TouchableOpacity onPress={() => this.setState({ actived: true })}>
              <Image source={image} style={styles.radio} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.border} />
      </View>
    )
  }

  renderData () {
    return (
      <View style={{ flexDirection: 'column', marginTop: moderateScale(10) }}>
        <Text style={styles.labelTitle}>{I18n.t('l_choosegadget')}</Text>
        <FlatList
          data={this.state.data}
          renderItem={this.renderitem}
          keyExtractor={item => item.id}
          extraData={this.state.actived}
        />
      </View>
    )
  }

  renderitem = ({ item }) => {
    const { actived } = this.state
    const background = actived ? Colors.nice_blue : Colors.greyish
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.serviceContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flexDirection: 'column', flex: 1, marginLeft: moderateScale(10) }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>Rp {price(item.price)}</Text>
            <View style={styles.borderTitleItem} />
            <Text style={styles.labelDescription}>{I18n.t('l_productdescription')}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.borderTitleItem} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: background }]}
                disabled={!actived}
                onPress={() => this.request(item.id)}
              >
                <Text style={styles.textButton}>{I18n.t('b_request')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderModal () {
    return (
      <ModalOneButton
        isOpen={this.state.modalFailed}
        onClosed={() => this.setState({ modalFailed: false })}
        onPress={() => this.setState({ modalFailed: false })}
        title={'GAGAL'}
        desc={'Pinjaman Anda sebelumnya belum dilunasi\ndan sudah mencapai batas maksimum plafon.'}
        button={'OK'} />
    )
  }

  request (id) {
    // this.setState({ modalFailed: true })
    this.props.navigation.navigate('LoanConfirmation')
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <ScrollView>
          {this.renderService()}
          {this.renderData()}
        </ScrollView>
        {this.renderModal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanGadget)
