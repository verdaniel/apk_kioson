import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import Coupon from '../../Components/Coupon'
import ModalInputPin from '../../Components/ModalInputPin'
import ModalTwoButton from '../../Components/ModalTwoButton'
import ModalOneButton from '../../Components/ModalOneButton'
import LoadingModal from '../../Components/Loading'
import ButtonForm from '../../Components/ButtonForm'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/KiosonPayConfirmationStyle'
import Colors from '../../Themes/Colors'

class KiosonPayConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: '',
      phoneNumber: '',
      coupon: '',
      id: -1,
      bill: 100000,
      adminFee: 6500,
      modalInputPin: false,
      pin: '',
      pinActivated: false,
      openModalActivPin: false,
      modalFailed: false,
      balance: 1000000,
      loading: false
    }
  }

  componentWillMount () {
    try {
      const { params } = this.props.navigation.state
      this.setState({
        phoneNumber: params.phoneNumber,
        code: params.code,
        id: params.id
      })
    } catch (e) {
      this.setState({
        phoneNumber: '081212121212',
        code: 'AJSH273HSBI',
        id: 936
      })
    }
  }

  renderHeader () {
    const { code, phoneNumber } = this.state
    return (
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Kioson Pay
            </Text>
          </View>
        </View>
        {this.renderData('E-Commerse Penyedia', 'Tokopedia')}
        {this.renderData('Kode Pembayaran', code)}
        {this.renderData('Nomor Ponsel Pelanggan', phoneNumber)}
      </View>
    )
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={styles.label}>
          {label}
        </Text>
        <Text style={styles.data}>
          {data}
        </Text>
      </View>
    )
  }

  renderBill () {
    const { bill, adminFee } = this.state
    const billText = this.maskedMoney(bill)
    const adminFeeText = this.maskedMoney(adminFee)
    const totalText = this.maskedMoney(parseInt(bill) + parseInt(adminFee))
    return (
      <View style={styles.billContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.title, { flex: 1 }]}>
            Jumlah Tagihan
          </Text>
          <Text style={styles.title}>
            {billText}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.title, { flex: 1 }]}>
            Biaya Admin
          </Text>
          <Text style={styles.title}>
            {adminFeeText}
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={[styles.title, { flex: 1, marginBottom: 0, color: Colors.nice_blue }]}>
            Total Bayar
          </Text>
          <Text style={[styles.title, { marginBottom: 0, color: Colors.nice_blue }]}>
            {totalText}
          </Text>
        </View>
      </View>
    )
  }

  renderButton () {
    // return (
    //   <View style={styles.buttonContainer}>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => this.openModalPin()}
    //     >
    //       <Text style={styles.textButton}>BAYAR</Text>
    //     </TouchableOpacity>
    //   </View>
    // )
    return (
      <ButtonForm
        onPress={() => this.openModalPin()}
        disabled={false}
        lable={'BAYAR'}
      />
    )
  }

  openModalPin () {
    const { pinActivated } = this.state
    if (pinActivated) {
      this.setState({ modalInputPin: true })
    } else {
      this.setState({ openModalActivPin: true })
    }
  }

  modalInputPin () {
    return (
      <ModalInputPin
        isOpen={this.state.modalInputPin}
        onClosed={() => this.setState({ modalInputPin: false })}
        onPress={(pinNumber) => this.onPressPayment(pinNumber)}
        title={'MASUKKAN PIN ANDA'}
        button={'Konfirmasi'} />
    )
  }

  modalConfirmPin () {
    return (
      <ModalTwoButton
        isOpen={this.state.openModalActivPin}
        onClosed={() => this.setState({ openModalActivPin: false })}
        onPressFalse={() => this.setState({ openModalActivPin: false })}
        onPressTrue={() => this.setState({ openModalActivPin: false, modalInputPin: true })}
        title={'PIN TIDAK AKTIF'}
        desc={'Demi keamanan bertransaksi,\nsilahkan aktifkan PIN Anda.'}
        buttonFalse={'Lain Kali'}
        buttonTrue={'Aktifkan'} />
    )
  }

  modalBalance () {
    return (
      <ModalOneButton
        isOpen={this.state.modalFailed}
        onClosed={() => this.setState({ modalFailed: false })}
        onPress={() => this.setState({ modalFailed: false })}
        title={'GAGAL'}
        desc={'Saldo tidak cukup\nuntuk melakukan transaksi!'}
        button={'OK'} />
    )
  }

  onPressPayment (pin) {
    const { pinActivated, balance, bill, adminFee, phoneNumber, code } = this.state
    this.setState({ modalInputPin: false, pin: pin })
    if (pinActivated) {
      // do something
    } else {
      // create pin
    }
    const total = parseInt(bill) + parseInt(adminFee)
    if (balance > total) {
      // do payment
      this.setState({ loading: true, modalInputPin: false })
      setTimeout(() => {
        this.setState({ loading: false })
        this.props.navigation.navigate('KiosonPaySuccess',
          {
            transferAmount: total,
            code: code,
            senderName: 'Sender Name',
            senderMobileNumber: phoneNumber,
            bankChoose: 'Tokopedia',
            destinationNumber: 'destination number',
            destinationName: 'destination name',
            totalPrice: total
          })
      }, 2000)
    } else {
      this.setState({ modalFailed: true })
    }
  }

  maskedMoney (value) {
    var number = value.toString()
    var sisa = number.length % 3
    var rupiah = number.substr(0, sisa)
    var ribuan = number.substr(sisa).match(/\d{3}/g)

    if (ribuan) {
      var separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    return 'Rp ' + rupiah
  }

  onChangeCoupon (discount, discountAmount) {
  }

  onRequestClose () {
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        {this.renderHeader()}
        <ScrollView>
          <Coupon
            id={this.state.id}
            onPress={(discount, discountAmount) => this.onChangeCoupon(discount, discountAmount)}
          />
          {this.renderBill()}
        </ScrollView>
        {this.renderButton()}
        {this.modalInputPin()}
        {this.modalConfirmPin()}
        {this.modalBalance()}
        <LoadingModal size={10} color={Colors.squash} visible={this.state.loading} onRequestClose={() => this.onRequestClose()} />
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

export default connect(mapStateToProps, mapDispatchToProps)(KiosonPayConfirmation)
