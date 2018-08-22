import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View, FlatList, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/PaymentConfirmationSamsungStyle'
import { Colors, Images } from '../../../Themes'
import { ratioHeight, ratioWidth } from '../../../Transforms/Resize'
import Coupon from '../../../Components/Coupon'
import I18n from '../../../I18n'
import ButtonForm from '../../../Components/ButtonForm'
import ModalOneButton from '../../../Components/ModalOneButton'
import ModalTwoButton from '../../../Components/ModalTwoButton'
import ModalInputPin from '../../../Components/ModalInputPin'
import ThousandFormat from '../../../Services/ThousandFormat'
// import LoadingModal from '../../../Components/Loading'

class PaymentConfirmationSamsung extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataDetail: [
        {
          product: [
            [
              {label: 'Produk', detail: 'Samsung Galaxy J1 Ace'},
              {label: 'Harga', detail: 'Rp 3.199.000'},
              {label: 'Jumlah', detail: '2'},
              {label: 'Sub Total', detail: 'Rp 6.398.000'}
            ],
            [
              {label: 'Produk', detail: 'Samsung Galaxy J1 Ace'},
              {label: 'Harga', detail: 'Rp 3.199.000'},
              {label: 'Jumlah', detail: '2'},
              {label: 'Sub Total', detail: 'Rp 6.398.000'}
            ]
          ],
          shippment: [
            {label: 'Nama', detail: 'Novian Septian'},
            {label: 'Alamat', detail: 'Jl. Prof. Dr. Satrio Kav.18 Lantai 42, Karet Kuningan, Setiabudi, Jakarta Selatan, DKI Jakarta - 15962'},
            {label: 'No. Ponsel', detail: '081312345678'}
          ]
        }
      ],
      discount: false,
      discountAmount: '',
      price: '',
      couponFocus: '',
      totalPrice: '',
      pinStatus: false,
      modalInputPin: false,
      modalPin: false,
      nextTime: false
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('pinStatus').then((value) => {
      if (value === 'true') {
        this.setState({ pinStatus: true })
      }
    })
  }

  renderDetail = ({ item, index }) => {
    var data = item.product.map((data, i) => {
      var borderBottom = 0.5
      if (i === item.product.length - 1) {
        borderBottom = 0
      }
      return (
        <View style={{paddingTop: ratioHeight(7), borderBottomWidth: borderBottom, borderBottomColor: Colors.black_15}} >
          <Text numberOfLines={0} style={[styles.textRegularMedSquas, {textAlign: 'left', flex: 1}]}>#{i + 1}</Text>
          {data.map((value, i) => (
            <View style={styles.flexRow}>
              <Text numberOfLines={0} style={[styles.textRegularMed, {textAlign: 'left', flex: 1}]}>{value.label}</Text>
              <Text numberOfLines={2} style={[styles.textMediumHeader, {textAlign: 'right', flex: 1}]}>{value.detail}</Text>
            </View>
          ))}
        </View>
      )
    }
    )
    var shippment = item.shippment.map((data, i) => {
      return (
        <View style={styles.flexRow}>
          <Text numberOfLines={0} style={[styles.textRegularMed, {textAlign: 'left', paddingRight: ratioWidth(51)}]}>{data.label}</Text>
          <Text numberOfLines={3} style={[styles.textMediumHeader, {textAlign: 'right', flex: 1}]}>{data.detail}</Text>
        </View>
      )
    })
    return (
      <View>
        {data}
        <Text style={[styles.textRegularLarge, {borderBottomWidth: 0.5, borderBottomColor: Colors.black_15}]}>Informasi Penerima</Text>
        {shippment}
      </View>
    )
  }

  modalBalance () {
    return (
      <ModalOneButton
        isOpen={this.state.modalBalance}
        onClosed={() => this.setState({ modalBalance: false })}
        onPress={() => this.setState({ modalBalance: false })}
        title={'GAGAL'}
        desc={'Saldo tidak cukup\nuntuk melakukan transaksi!'}
        button={'OK'} />
    )
  }

  modalConfrimPin () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalPin}
        onClosed={() => this.setState({ modalPin: false })}
        onPressFalse={() => this.setState({ modalPin: false, nextTime: true })}
        onPressTrue={() => this.setState({ modalPin: false, modalInputPin: true })}
        title={'PIN TIDAK AKTIF'}
        desc={'Demi keamanan bertransaksi,\nsilahkan aktifkan PIN Anda.'}
        buttonFalse={'Lain Kali'}
        buttonTrue={'Aktifkan'} />
    )
  }

  modalInputPin () {
    return (
      <ModalInputPin
        isOpen={this.state.modalInputPin}
        onClosed={() => this.setState({ modalInputPin: false })}
        onPress={(pinNumber) => this.postOrder(pinNumber)}
        title={'MASUKKAN PIN ANDA'}
        button={'Konfirmasi'} />
    )
  }

  onChangeCoupon (discount, discountAmount) {
    this.setState({ discount: discount, discountAmount: discountAmount })
  }

  orderOnPress (totalPrice) {
    this.setState({ totalPrice: totalPrice })
    if (this.state.pinStatus) {
      this.setState({modalInputPin: true})
    } else {
      if (!this.state.nextTime) {
        this.setState({ modalPin: true })
      } else {
        this.postOrder()
      }
    }
  }

  postOrder (pinNumber) {
    this.setState({ modalInputPin: false, modalLodaing: true })
    const { navigate } = this.props.navigation
    var samsung =
      (<View style={{alignItems: 'center'}}>
        <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
        <Text style={styles.robotoRegularSmallGrey}>Samsung</Text>
        <Text style={styles.robotoBoldSmallGrey}>{I18n.t('l_id')} 123989087900</Text>
        <Text style={[styles.robotoRegularSmallGrey]}>Rp {ThousandFormat(3199000)}</Text>
      </View>)
    navigate('SuccessPurchaseSamsung',
      {
        component: samsung,
        icon: Images.ic_samsung,
        dataDetail: this.state.dataDetail
      })
  }

  render () {
    const {dataDetail, discount} = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView keyboardShouldPersistTaps='handle' contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.header}>
            <View style={styles.borderBottom}>
              <Text style={styles.textRegularLarge}>Informasi Produk</Text>
            </View>
            <View style={[styles.borderBottom, {borderBottomWidth: 0}]}>
              <FlatList
                data={dataDetail}
                renderItem={this.renderDetail}
              />
            </View>
          </View>
          <Coupon focus={(value) => this.setState({couponFocus: value})} price={this.state.price} onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)} />
          <View style={styles.footer}>
            <View style={[styles.headerIndside, {paddingTop: 0, paddingBottom: 0}]}>
              <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_price')}</Text>
                <Text style={[styles.textRegularMedGrey]}>Rp 3.199.000</Text>
              </View>
              <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { flex: 1 }]}>{I18n.t('l_adminFee')}</Text>
                <Text style={[styles.textRegularMedGrey]}>Rp 6.500</Text>
              </View>
              {discount === true ? <View style={[styles.flexRowflat]}>
                <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8), flex: 1 }]}>{I18n.t('l_discount')}</Text>
                <Text style={[styles.textRegularMedGrey, { paddingTop: ratioHeight(8) }]}>- Rp 100000</Text>
              </View> : <View />}
              <View style={[styles.flexRowflat, {borderTopWidth: 0.5, borderTopColor: Colors.black_15}]}>
                <Text style={[styles.textMedium, { flex: 1 }]}>{I18n.t('l_totalPaid')}</Text>
                <Text style={[styles.textMedium]}>Rp 15.598.000</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop: ratioHeight(15), paddingHorizontal: ratioHeight(15)}}>
            <ButtonForm
              onPress={() => this.orderOnPress()}
              lable={I18n.t('b_totalPaid')}
              disabled={false}
          />
          </View>
          {this.modalBalance()}
          {this.modalConfrimPin()}
          {this.modalInputPin()}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmationSamsung)
