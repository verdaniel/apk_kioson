import React, { Component } from 'react'
import { ScrollView, Text, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/ReferralAgenciesStyle'
import { Colors } from '../../Themes/index'
import ButtonForm from '../../Components/ButtonForm'

class ReferralAgencies extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <View style={styles.form}>
          <Text style={styles.robotoMed}>Kode Referal Anda adalah:</Text>
          <View style={styles.whiteBox}>
            <Text style={styles.robotoBig}>CDFK12</Text>
          </View>
        </View>
        <ButtonForm
          disabled={false}
          lable={'BERITAHU TEMAN'}
          onPress={() => {}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferralAgencies)
