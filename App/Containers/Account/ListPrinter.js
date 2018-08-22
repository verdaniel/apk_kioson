import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, StatusBar, ToastAndroid, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import EmptyState from '../../Components/EmptyState'
import BluetoothSerial from 'react-native-bluetooth-serial'
import BluetoothActions from '../../Redux/BluetoothRedux'

// Styles
import styles from '../Styles/ListPrinterStyle'
import { Images, Colors, Fonts } from '../../Themes/index'
import { moderateScale } from '../../Transforms/Scaling'
import LoadingModal from '../../Components/Loading'

class ListPrinter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searching: true,
      textButton: 'TAMBAH PERANGKAT',
      buttonDisable: false,
      showPrinter: false,
      showActivePrinter: false,
      listPrinterActive: [],
      listPrinterAvailable: [],
      modalLodaing: false
    }
  }

  componentWillMount () {
    BluetoothSerial.isEnabled().then((response) => {
      if (response) {
        this.searchBluetooth()
      } else {
        BluetoothSerial.requestEnable().then((res) => {
          if (res) this.searchBluetooth()
          else ToastAndroid.show('Bluetooth tidak aktif', ToastAndroid.SHORT)
        })
      }
    })
  }

  componentWillReceiveProps (newProps) {
    const { listPrinterActive } = this.state
    if (newProps.device) {
      const index = listPrinterActive.findIndex(item => item.id === newProps.device.id)
      var newListPrinter = [...listPrinterActive]
      newListPrinter.splice(index, 1, newProps.device)
      this.setState({ listPrinterActive: newListPrinter })
      BluetoothSerial.cancelDiscovery().then((res) => {
        if (res) {
          this.setState({
            textButton: 'TAMBAH PERANGKAT ...',
            buttonDisable: false
          })
        }
      })
    }
  }

  searchBluetooth () {
    var listPrinter = []
    this.setState({
      textButton: 'MENCARI PERANGKAT ...',
      buttonDisable: true
    })
    BluetoothSerial.list().then((paired) => {
      if (paired.length > 0) {
        listPrinter = [...paired]
        if (paired.length > 0 && this.props.device) {
          const index = listPrinter.findIndex(item => item.id === this.props.device.id)
          var newListPrinter = [...listPrinter]
          newListPrinter.splice(index, 1, this.props.device)
          this.setState({ showActivePrinter: true, listPrinterActive: newListPrinter })
        } else this.setState({ showActivePrinter: true, listPrinterActive: paired })
      } else this.setState({ listPrinterActive: [] })
    })
    BluetoothSerial.scanUnpairedDevices()
    DeviceEventEmitter.addListener('scanUnpairedDevice', (data) => {
      if (data.type === 'scan') {
        var count = 0
        listPrinter.map((value) => {
          if (value.id === data.id) count++
        })

        if (count === 0) {
          var newListPrinterAvailable = [...this.state.listPrinterAvailable]
          var newDevices = { ...data, connected: false }
          newListPrinterAvailable.push(newDevices)
          this.setState({ showPrinter: true, listPrinterAvailable: newListPrinterAvailable })
        }
      } else if (data.type === 'stop') {
        this.setState({
          textButton: 'TAMBAH PERANGKAT ...',
          buttonDisable: false
        })
      }
    })

    // BluetoothSerial.list().then((paired) => {
    //   if (paired.length > 0) this.setState({ showActivePrinter: true, listPrinterActive: paired })
    //   else this.setState({ listPrinterActive: [] })
    // })
    // BluetoothSerial.discoverUnpairedDevices().then((unpaired) => {
    //   this.setState({
    //     textButton: 'TAMBAH PERANGKAT',
    //     buttonDisable: false
    //   })
    //   if (unpaired.length > 0) {
    //     var newUnpaired = []
    //     if (listPrinterActive.length > 0) {
    //       unpaired.map((values) => {
    //         listPrinterActive.map((value, index) => {
    //           if (values.id !== value.id) newUnpaired.push({ ...values, connected: false })
    //         })
    //       })
    //     } else newUnpaired = unpaired
    //     this.setState({ showPrinter: true, listPrinterAvailable: newUnpaired })
    //   }
    // })
  }

  onConnectPrinter (value) {
    BluetoothSerial.isConnected().then((res) => {
      if (res) {
        BluetoothSerial.disconnect().then((value) => {
          if (value) {
            BluetoothSerial.list().then((paired) => {
              if (paired.length > 0) this.setState({ showActivePrinter: true, listPrinterActive: paired })
              else this.setState({ listPrinterActive: [] })
            })
            this.props.disconnectDevice()
          } else ToastAndroid.show(`Gagal memutus koneksi`, ToastAndroid.SHORT)
        })
      } else {
        BluetoothSerial.connect(value.id).then((response) => {
          if (response.message.includes('Connected')) {
            ToastAndroid.show(`Berhasil menghubung ke perangkat ${value.name}`, ToastAndroid.SHORT)
            this.props.connectDevice({ ...value, connected: true })
          } else ToastAndroid.show(`Gagal menghubung ke ${value.name}`, ToastAndroid.SHORT)
        })
      }
    })
  }

  onClickListPrinter (value) {
    const { listPrinterActive, listPrinterAvailable } = this.state
    BluetoothSerial.pairDevice(value.id).then((response) => {
      if (response) {
        ToastAndroid.show(`Perangkat ${value.name} sudah disandingkan`, ToastAndroid.SHORT)
        var newPrinter = []
        newPrinter = [...listPrinterActive]
        newPrinter.push({ ...value, connected: false })
        this.setState({
          showActivePrinter: true,
          listPrinterActive: newPrinter,
          listPrinterAvailable: listPrinterAvailable.filter(d => d.id !== value.id)
        })
      } else ToastAndroid.show(`Gagal menyandingkan perangkat ke ${value.name}`, ToastAndroid.SHORT)
    })
  }

  onClickAddPrinter () {
    this.setState({
      textButton: 'MENCARI PERANGKAT ...',
      buttonDisable: true
    })
    BluetoothSerial.discoverUnpairedDevices().then((values) => {
      this.setState({
        textButton: 'TAMBAH PERANGKAT',
        buttonDisable: false,
        listPrinterAvailable: values
      })
    })
  }

  renderSeparator () {
    return (
      <View style={{ borderBottomColor: Colors.black_15, borderBottomWidth: moderateScale(1) }} />
    )
  }

  renderEmptyState () {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EmptyState source={Images.emptyStatePrinter} title={'Tidak ada perangkat yang terhubung'} description={'Tekan “Tambah Perangkat” untuk menambahkan printer yang ingin digunakan.'} />
      </View>
    )
  }

  renderItemAvailablePrinter = data => {
    const item = data.item
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.menuRow} onPress={() => this.onClickListPrinter(item)}>
        <Text allowFontScaling style={[styles.textList, {flex: 1}]}>{item.name}</Text>
        <Image
          style={styles.imageArrow}
          source={Images.ic_next_calendar}
          resizeMode={'contain'} />
      </TouchableOpacity>
    )
  }

  renderAvailablePrinter (data) {
    return (
      <View>
        <Text allowFontScaling style={styles.titleForm}>PERANGKAT TERSEDIA</Text>
        <FlatList
          data={data}
          style={styles.listContainer}
          renderItem={this.renderItemAvailablePrinter}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }

  renderItemActivePrinter = data => {
    const item = data.item
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.menuRow} onPress={() => this.onConnectPrinter(item)}>
        <Text
          allowFontScaling
          style={{ fontFamily: item.connected ? Fonts.type.robotoMedium : Fonts.type.robotoRegular, color: item.connected ? Colors.nice_blue : Colors.slate_grey, fontSize: moderateScale(16), flex: 1 }}>
          {item.name}
        </Text>
        <Text
          allowFontScaling
          style={[styles.textListActive, { color: item.connected ? Colors.nice_blue : Colors.greyish }]}>
          {item.connected ? 'Terhubung' : 'Tersimpan'}
        </Text>
        <Image
          style={styles.imageArrow}
          source={Images.ic_next_calendar}
          resizeMode={'contain'} />
      </TouchableOpacity>
    )
  }

  renderActivePrinter (data) {
    return (
      <View>
        <Text allowFontScaling style={styles.titleForm}>PERANGKAT TERHUBUNG</Text>
        <FlatList
          data={data}
          style={styles.listContainer}
          renderItem={this.renderItemActivePrinter}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }

  onRequestClose () {
    this.setState({modalLodaing: false})
    this.props.navigation.goBack()
  }

  render () {
    let view
    if (!this.state.showPrinter && !this.state.showActivePrinter) {
      view = this.renderEmptyState()
    } else if (!this.state.showActivePrinter && this.state.showPrinter) {
      view = this.renderAvailablePrinter(this.state.listPrinterAvailable)
    } else if (!this.state.showPrinter && this.state.showActivePrinter) {
      view = this.renderActivePrinter(this.state.listPrinterActive)
    } else {
      view =
        <View>
          {this.renderActivePrinter(this.state.listPrinterActive)}
          {this.renderAvailablePrinter(this.state.listPrinterAvailable)}
        </View>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        {view}
        <TouchableOpacity
          disabled={this.state.buttonDisable}
          style={[this.state.buttonDisable === true ? [styles.button] : [styles.buttonActive, {}]]}
          onPress={() => this.onClickAddPrinter()}
          activeOpacity={0.8}>
          <Text style={[styles.textRegularBig]}>
            {this.state.textButton}
          </Text>
        </TouchableOpacity>
        <LoadingModal visible={this.state.modalLodaing} onRequestClose={() => this.onRequestClose()} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.bluetooth.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectDevice: (device) => dispatch(BluetoothActions.connectedDevice(device)),
    disconnectDevice: () => dispatch(BluetoothActions.disconnectDevice())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPrinter)
