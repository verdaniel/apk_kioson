import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import SelectionMenu from '../../Components/SelectionMenu'
import { Colors } from '../../Themes/'
import { ratioHeight } from '../../Transforms/Resize'

// Styles
import styles from '../Styles/CategoryHelpStyle'

class CategoryHelp extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      data: params.data || []
    }
  }

  onChangeText = (text) => {
    this.setState({ valueSearch: text })
  }

  render () {
    const { data } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <ScrollView keyboardShouldPersistTaps={'handled'} >
          <View style={[styles.bgColor, {backgroundColor: Colors.nice_blue, paddingBottom: ratioHeight(35), paddingTop: ratioHeight(22)}]} >
            <Text style={[styles.robotoMedium]}>
            Apa Yang Bisa Kami Bantu?
          </Text>
            <Text style={[styles.robotoRegular, {paddingBottom: ratioHeight(15)}]}>
            Cari permasalahan yang sedang Anda hadapi
          </Text>
          </View>
          <View style={styles.viewBottom}>
            <SelectionMenu data={data} navigation={navigation} />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHelp)
