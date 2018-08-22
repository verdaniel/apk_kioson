import React, { Component } from 'react'
import { ScrollView, View, StatusBar, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import StandardMenu from '../../Components/StandardMenu'
import ListGridMenu from '../../Components/ListGridMenu'
import SearchBox from '../../Components/SearchBox'
import {Images, Colors} from '../../Themes/'
import { ratioHeight } from '../../Transforms/Resize'

// Styles
import styles from '../Styles/HelpStyle'

class Help extends Component {
  constructor (props) {
    super(props)
    const { navigate } = this.props.navigation
    const datax = [{
      'akun': [
        'Kendala notifikasi pesanan',
        'Akun diblokir',
        'Lupa kata sandi',
        'Status Kioson ',
        'Perubahan profil',
        'Ubah email terdaftar',
        'Ubah nomor ponsel',
        'Ubah nama Akun',
        'Gagal Login',
        'Tidak bisa update',
        'Pengaturan PIN',
        'Pengaturan Printer',
        'Tidak mendapatkan OTP',
        'Mencapai batas maksimum',
        {'subakun': [
          'OTP Request',
          'OTP Danamas',
          'OTP top up saldo',
          'OTP lupa password',
          'OTP Request lainnya'
        ]}
      ],
      'saldo': [
        'Topup saldo gagal',
        'Topup saldo belum masuk',
        'Saldo berkurang tiba-tiba'
      ],
      'promo': [
        'Benefit promo tidak sesuai',
        'Tidak bisa menggunakan kode promo',
        'Ingin bertanya tentang promo',
        'Transaksi berhasil tapi tidak mendapatkan promo'
      ],
      'penyalahgunaan': [
        'Lapor indikasi penipuan',
        'Kerugian oleh canvasser'
      ],
      'fitur': [
        'Pulsa',
        'Paket Data',
        'PDAM',
        'Pascabayar',
        'Telkom',
        'Inetrnet TV Kabel',
        'Kioson Pay',
        'Transfer Uang',
        'Pinjaman',
        'PLN',
        {'subFitur': [
          'Tidak dapat melakukan trx',
          'Tidak dapat melakukan trx',
          'ID pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx',
          'Wlayah pembayaran tidak tersedia',
          'Nomor pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx',
          'ID pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx',
          'ID pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx',
          'ID pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx',
          'No.rekening & bank tidak ditemukan',
          'Tidak dapat melakukan transaksi',
          'Saya tidak tahu denda pinjaman saya',
          'Sudah melakukan pelunasan tapi status masih belum bayar',
          'Pinjaman ponsel disetujui tapi barang belum datang',
          'Pinjaman saldo belum masuk',
          'ID pelanggan tidak ditemukan',
          'Tidak dapat melakukan trx'
        ]
        }
      ]
    }
    ]

    const dataAccountOTP = [
      {id: 0, title: datax[0].akun[14].subakun[0], action: () => navigate('HelpForm', {topic: datax[0].akun[14].subakun[0]})},
      {id: 1, title: datax[0].akun[14].subakun[1], action: () => navigate('HelpForm', {topic: datax[0].akun[14].subakun[1]})},
      {id: 2, title: datax[0].akun[14].subakun[2], action: () => navigate('HelpForm', {topic: datax[0].akun[14].subakun[2]})},
      {id: 3, title: datax[0].akun[14].subakun[3], action: () => navigate('HelpForm', {topic: datax[0].akun[14].subakun[3]})},
      {id: 4, title: datax[0].akun[14].subakun[4], action: () => navigate('HelpForm', {topic: datax[0].akun[14].subakun[4]})}
    ]

    const dataAccount = [
      {id: 0, title: datax[0].akun[0], action: () => navigate('HelpForm', {topic: datax[0].akun[0]})},
      {id: 1, title: datax[0].akun[1], action: () => navigate('HelpForm', {topic: datax[0].akun[1]})},
      {id: 2, title: datax[0].akun[2], action: () => navigate('HelpForm', {topic: datax[0].akun[2]})},
      {id: 3, title: datax[0].akun[3], action: () => navigate('HelpForm', {topic: datax[0].akun[3]})},
      {id: 4, title: datax[0].akun[4], action: () => navigate('HelpForm', {topic: datax[0].akun[4]})},
      {id: 5, title: datax[0].akun[5], action: () => navigate('HelpForm', {topic: datax[0].akun[5]})},
      {id: 6, title: datax[0].akun[6], action: () => navigate('HelpForm', {topic: datax[0].akun[6]})},
      {id: 7, title: datax[0].akun[7], action: () => navigate('HelpForm', {topic: datax[0].akun[7]})},
      {id: 8, title: datax[0].akun[8], action: () => navigate('HelpForm', {topic: datax[0].akun[8]})},
      {id: 9, title: datax[0].akun[9], action: () => navigate('HelpForm', {topic: datax[0].akun[9]})},
      {id: 10, title: datax[0].akun[10], action: () => navigate('HelpForm', {topic: datax[0].akun[10]})},
      {id: 11, title: datax[0].akun[11], action: () => navigate('HelpForm', {topic: datax[0].akun[11]})},
      {id: 12, title: datax[0].akun[12], action: () => navigate('SearchPage', {data: dataAccountOTP, emptyState: false})},
      {id: 13, title: datax[0].akun[13], action: () => navigate('SearchPage', {data: dataAccountOTP, emptyState: false})}
    ]

    const dataSaldo = [
      {id: 0, title: datax[0].saldo[0], action: () => navigate('HelpForm', {topic: datax[0].saldo[0]})},
      {id: 1, title: datax[0].saldo[1], action: () => navigate('HelpForm', {topic: datax[0].saldo[1]})},
      {id: 2, title: datax[0].saldo[2], action: () => navigate('HelpForm', {topic: datax[0].saldo[2]})}
    ]

    const dataPromo = [
      {id: 0, title: datax[0].promo[0], action: () => navigate('HelpForm', {topic: datax[0].promo[0]})},
      {id: 1, title: datax[0].promo[1], action: () => navigate('HelpForm', {topic: datax[0].promo[1]})},
      {id: 2, title: datax[0].promo[2], action: () => navigate('HelpForm', {topic: datax[0].promo[2]})},
      {id: 2, title: datax[0].promo[3], action: () => navigate('HelpForm', {topic: datax[0].promo[3]})}
    ]

    const dataPenyalahgunaan = [
      {id: 0, title: datax[0].penyalahgunaan[0], action: () => navigate('HelpForm', {topic: datax[0].penyalahgunaan[0]})},
      {id: 1, title: datax[0].penyalahgunaan[1], action: () => navigate('HelpForm', {topic: datax[0].penyalahgunaan[1]})}
    ]

    const subFitur = [
      [
        {id: 0, title: datax[0].fitur[10].subFitur[0], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[0]})}
      ],
      [
        {id: 1, title: datax[0].fitur[10].subFitur[1], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[1]})}
      ],
      [
        {id: 2, title: datax[0].fitur[10].subFitur[2], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[2]})},
        {id: 3, title: datax[0].fitur[10].subFitur[3], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[3]})},
        {id: 4, title: datax[0].fitur[10].subFitur[4], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[4]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[5], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[5]})},
        {id: 4, title: datax[0].fitur[10].subFitur[6], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[6]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[7], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[7]})},
        {id: 4, title: datax[0].fitur[10].subFitur[8], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[8]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[9], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[9]})},
        {id: 4, title: datax[0].fitur[10].subFitur[10], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[10]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[11], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[11]})},
        {id: 4, title: datax[0].fitur[10].subFitur[12], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[12]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[13], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[13]})},
        {id: 4, title: datax[0].fitur[10].subFitur[14], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[14]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[15], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[15]})},
        {id: 4, title: datax[0].fitur[10].subFitur[16], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[16]})},
        {id: 4, title: datax[0].fitur[10].subFitur[17], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[17]})},
        {id: 4, title: datax[0].fitur[10].subFitur[18], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[18]})}
      ],
      [
        {id: 4, title: datax[0].fitur[10].subFitur[19], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[18]})},
        {id: 4, title: datax[0].fitur[10].subFitur[20], action: () => navigate('HelpForm', {topic: datax[0].fitur[10].subFitur[19]})}
      ]
    ]

    const dataFitur = [
      {id: 0, title: datax[0].fitur[0], action: () => navigate('SearchPage', {data: subFitur[0], emptyState: false})},
      {id: 1, title: datax[0].fitur[1], action: () => navigate('SearchPage', {data: subFitur[1], emptyState: false})},
      {id: 1, title: datax[0].fitur[2], action: () => navigate('SearchPage', {data: subFitur[2], emptyState: false})},
      {id: 1, title: datax[0].fitur[3], action: () => navigate('SearchPage', {data: subFitur[3], emptyState: false})},
      {id: 1, title: datax[0].fitur[4], action: () => navigate('SearchPage', {data: subFitur[4], emptyState: false})},
      {id: 1, title: datax[0].fitur[5], action: () => navigate('SearchPage', {data: subFitur[5], emptyState: false})},
      {id: 1, title: datax[0].fitur[6], action: () => navigate('SearchPage', {data: subFitur[6], emptyState: false})},
      {id: 1, title: datax[0].fitur[7], action: () => navigate('SearchPage', {data: subFitur[7], emptyState: false})},
      {id: 1, title: datax[0].fitur[8], action: () => navigate('SearchPage', {data: subFitur[8], emptyState: false})},
      {id: 1, title: datax[0].fitur[9], action: () => navigate('SearchPage', {data: subFitur[9], emptyState: false})}
    ]

    this.state = {
      emptyState: true,
      focusSearch: false,
      valueSearch: '',
      data: [
        {id: 0, icon: Images.ic_contac_us, title: I18n.t('l_callus'), desc: I18n.t('l_callusdescription'), action: () => navigate('ContactUs')},
        {id: 1, icon: Images.ic_guide, title: I18n.t('l_guide'), desc: I18n.t('l_guidedescription'), action: () => {}},
        {id: 2, icon: Images.ic_TC, title: I18n.t('l_tc'), desc: I18n.t('l_tcdescription'), action: () => {}},
        {id: 3, icon: Images.ic_about_kioson, title: I18n.t('l_aboutkioson'), desc: I18n.t('l_aboutkiosonescription'), action: () => navigate('AboutKioson')}
      ],
      helpMenu:
      [
        {id: 0, title: 'Akun', icon: Images.ic_account_color, onPress: () => navigate('CategoryHelp', {data: dataAccount, emptyState: false})},
        {id: 1, title: 'Saldo', icon: Images.ic_balance_color, onPress: () => navigate('CategoryHelp', {data: dataSaldo, emptyState: false})},
        {id: 2, title: 'Promo', icon: Images.ic_promotion_color, onPress: () => navigate('CategoryHelp', {data: dataPromo, emptyState: false})},
        {id: 3, title: 'Penyalahgunaan', icon: Images.ic_report_color, onPress: () => navigate('CategoryHelp', {data: dataPenyalahgunaan, emptyState: false})},
        {id: 4, title: 'Fitur', icon: Images.ic_feature_color, onPress: () => navigate('CategoryHelp', {data: dataFitur, emptyState: false})},
        {id: 5, title: 'Lainnya', icon: Images.ic_3dot_color, onPress: () => navigate('CategoryHelp', {topic: 'CategoryHelp', emptyState: false})}
      ]
    }
  }

  renderEmptyState (emptyState) {
    if (emptyState) {
      return (
        <View style={[styles.notLoginContainer]}>
          <Image source={Images.historyNoContent} style={styles.banner} />
          <Text style={styles.textTitle}>
            {I18n.t('l_nocontenthistoryshort')}
          </Text>
          <Text style={styles.textDescription}>
            {I18n.t('l_nocontenthistoryshortdescription')}
          </Text>
        </View>
      )
    }
  }

  onChangeText = (text) => {
    this.setState({ valueSearch: text })
  }

  renderHeader (emptyState) {
    if (emptyState) {
      return (
        <View style={[styles.bgColor, {backgroundColor: Colors.squash, paddingTop: ratioHeight(22)}]} >
          <Text style={styles.robotoMedium}>
            Hai Muhammad Abdur,
          </Text>
          <Text style={[styles.robotoRegular, {paddingBottom: ratioHeight(15)}]}>
            Silahkan pilih kategori di bawah ini
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.bgColor, {backgroundColor: Colors.squash, marginTop: ratioHeight(15), paddingTop: ratioHeight(14)}]} >
          <Text style={[styles.robotoRegular, {paddingBottom: ratioHeight(15)}]}>
            Jika masalah Anda bukan transaksi langsung, silahkan pilih kategori yang sesuai
          </Text>
        </View>
      )
    }
  }

  render () {
    const { data, helpMenu, emptyState, valueSearch } = this.state
    if (emptyState) {
      this.paddingBottom = 25
    } else {
      this.paddingBottom = 50
    }
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        {this.renderHeader(emptyState)}
        <View style={styles.flexOneMinus}>
          <View style={styles.absoluteView} />
          <SearchBox
            onChangeText={(text) => this.onChangeText(text)}
            onPress={() => this.setState({ valueSearch: '' })}
            value={valueSearch}
            onSubmitEditing={() => this.props.navigation.navigate('SearchPage', {valueSearch: valueSearch})}
            placeholder={'Apa yang bisa kami bantu?'}
          />
          <ListGridMenu data={helpMenu} />
        </View>
        <View style={styles.viewBottom}>
          <StandardMenu data={data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Help)
