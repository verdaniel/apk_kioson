import React, { Component } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import ModalOneButton from '../../Components/ModalOneButton'
import ModalTwoButton from '../../Components/ModalTwoButton'
import FooterFrom from '../../Components/FooterFrom'
import { price } from '../../Transforms/LocalConfig'
import { Images, Colors } from '../../Themes'
// Styles
import styles from '../Styles/LoanBalanceStyle'

class LoanBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actived: false,
      activeAmount: 0,
      modalFailed: false,
      modalUpPlafon: false,
      data: [
        {
          id: 1,
          amount: '500000'
        },
        {
          id: 2,
          amount: '1000000'
        },
        {
          id: 3,
          amount: '2000000'
        },
        {
          id: 4,
          amount: '3000000'
        },
        {
          id: 5,
          amount: '4000000'
        },
        {
          id: 6,
          amount: '5000000'
        }
      ],
      messageError: 'Pinjaman Anda sebelumnya belum dilunasi dan sudah mencapai batas maksimum plafon.'
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
      <View style={styles.dataContainer}>
        <Text style={styles.labelTitle}>{I18n.t('l_chooseamount')}</Text>
        <FlatList
          data={this.state.data}
          renderItem={this.renderitem}
          keyExtractor={item => item.id}
          extraData={[this.state.actived, this.state.activeAmount]}
          numColumns={2}
        />
      </View>
    )
  }

  renderitem = ({ item }) => {
    const { actived, activeAmount } = this.state
    const borderColor = activeAmount === item.id ? Colors.nice_blue : Colors.snow
    const textColor = activeAmount === item.id ? Colors.nice_blue : Colors.greyish
    return (
      <TouchableOpacity
        style={[styles.button, { borderColor: borderColor }]}
        disabled={!actived}
        onPress={() => this.setState({ activeAmount: item.id })}
      >
        <Text style={[styles.textButton, { color: textColor }]}>{price(item.amount)}</Text>
      </TouchableOpacity>
    )
  }

  renderNote () {
    return (
      <FooterFrom title={'Pinjaman saldo minimum 1.000.000'} />
    )
  }

  renderButton () {
    const { activeAmount } = this.state
    const backgroundColor = activeAmount !== 0 ? Colors.nice_blue : Colors.greyish
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonNext, { backgroundColor: backgroundColor }]}
          disabled={activeAmount === 0}
          onPress={() => activeAmount === 6 ? this.setState({modalUpPlafon: true}) : this.setState({ modalFailed: true })}
        >
          <Text style={styles.textButtonNext}>{I18n.t('b_next')}</Text>
        </TouchableOpacity>
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
        desc={this.state.messageError}
        button={'OK'} />
    )
  }

  modalUpPlafon () {
    return (
      <ModalTwoButton
        isOpen={this.state.modalUpPlafon}
        onClosed={() => this.setState({ modalUpPlafon: false })}
        onPressFalse={() => this.setState({ modalUpPlafon: false })}
        onPressTrue={() => this.setState({ modalUpPlafon: false })}
        title={'GAGAL'}
        desc={'Pengajuan pinjaman saldo melebihi nilai plafon Anda'}
        buttonFalse={'Batal'}
        buttonTrue={'Ajukan Naik Plafon'} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <View style={{ flex: 1 }}>
          <ScrollView>
            {this.renderService()}
            {this.renderData()}
            {this.renderNote()}
          </ScrollView>
        </View>
        {this.renderButton()}
        {this.renderModal()}
        {this.modalUpPlafon()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanBalance)
