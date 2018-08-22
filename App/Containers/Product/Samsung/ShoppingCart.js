import React, { Component } from 'react'
import { TouchableOpacity, Text, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import EmptyState from '../../../Components/EmptyState'
import CartList from '../../../Components/CartList'
import { Images, Colors } from '../../../Themes'
import { moderateScale } from '../../../Transforms/Scaling'
import {RupiahFormat} from '../../../Lib/Formater'
import { ratioHeight } from '../../../Transforms/Resize'
import ModalTwoButton from '../../../Components/ModalTwoButton'

// Styles
import styles from '../../Styles/ShoppingCartStyle'

class ShoppingCart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      emptyState: false,
      modalDelete: false,
      count: 3,
      price: 3199000
    }
  }

  renderEmptyState (emptyState) {
    if (emptyState) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <EmptyState source={Images.noContenCart} title={'Tidak Ada Belanjaan'} description={'Halaman ini akan menampilkan barang belanjaan dari transaksi yang Anda lakukan.'} />
        </View>
      )
    }
  }

  buttonNewOrder (emptyState) {
    const {navigation} = this.props
    return (
      <TouchableOpacity
        disabled={false}
        style={styles.buttonActive}
        onPress={() => navigation.navigate('Samsung')}
        activeOpacity={0.8}>
        <Text style={[styles.textRegularBig]}>
            MULAI BELANJA
          </Text>
      </TouchableOpacity>
    )
  }

  buttonChart () {
    const {count, price} = this.state
    const {navigation} = this.props
    return (
      <View style={styles.flexButton}>
        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={[styles.textMedium, {textAlign: 'left', fontSize: moderateScale(12), color: Colors.greyish}]}>
              Jumlah Barang : {count}
            </Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.textMedium}>TOTAL BAYAR</Text>
            <Text style={[styles.textMedium, {color: Colors.nice_blue, fontSize: moderateScale(16), paddingTop: ratioHeight(2)}]}>
              {RupiahFormat(+price * +count)}
            </Text>
          </View>
        </View>
        <View style={styles.flexRowPaddingTop}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Samsung')} style={styles.buttonCart}>
            <Text style={styles.textButtonCart}>KEMBALI BELANJA</Text>
          </TouchableOpacity>
          <View style={{width: ratioHeight(10)}} />
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('RecipientDetails')} style={[styles.buttonCart, {backgroundColor: Colors.squash}]}>
            <Text style={styles.textButtonCart}>LANJUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  modalDeletItems () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalDelete}
        onClosed={() => this.setState({ modalDelete: false })}
        onPressFalse={() => this.setState({ modalDelete: false })}
        onPressTrue={() => this.setState({ modalDelete: false })}
        title={'HAPUS ITEM'}
        desc={'Anda yakin ingin menghapus item ini dari keranjang?'}
        buttonFalse={'Hapus'}
        buttonTrue={'Batal'} />
    )
  }

  render () {
    const {emptyState, count} = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        {emptyState === false ? <CartList onDelete={() => this.setState({modalDelete: true})} count={count} added={() => this.setState({count: count + 1})} subtract={count !== 0 ? () => this.setState({count: count - 1}) : () => this.setState({count: 0})} /> : null}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {this.renderEmptyState(emptyState)}
          {emptyState ? this.buttonNewOrder(emptyState) : this.buttonChart(emptyState)}
        </View>
        {this.modalDeletItems()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
