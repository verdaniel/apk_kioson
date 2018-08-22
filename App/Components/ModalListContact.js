import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Easing, ScrollView } from 'react-native'
import {Colors, Fonts, Metrics} from '../Themes/'
import Modal from 'react-native-modalbox'
import { moderateScale } from '../Transforms/Scaling'
import PropTypes from 'prop-types'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'
import RadioGroup from './radioGroup'
import RadioButton from './radioButton'

export default class ModalListContact extends Component {
  // // Prop type warnings
  static propTypes = {
    isOpen: PropTypes.bool,
    onClosed: PropTypes.func,
    data: PropTypes.object,
    onSelect: PropTypes.func
  }
  //
  // Defaults for props
  static defaultProps = {
    isOpen: false,
    onClosed: () => {},
    data: [
      {number: '085743923462'},
      {number: '081287369749'}
    ]
  }

  constructor (props) {
    super(props)
    this.state = {
      onPressIn: false
    }
  }

  onSelect (data) {
    this.props.onSelect(data)
  }

  render () {
    var trues = true
    const dp = (
      <Modal
        backdropOpacity={100}
        coverScreen={trues}
        style={{
          justifyContent: 'center',
          borderRadius: 3,
          width: ratioWidth(Metrics.screenWidth - 60),
          height: ratioHeight(50) * this.props.data.length,
          maxHeight: ratioHeight(Metrics.screenHeight / 2),
          backgroundColor: Colors.white_two
        }}
        backButtonClose
        position={'center'}
        easing={Easing.elastic(1)}
        backdropColor={Colors.black_35}
        backdropPressToClose
        backdrop
        swipeToClose={false}
        isOpen={this.props.isOpen}
        onClosed={this.props.onClosed}>
        <ScrollView>
          <RadioGroup
            onSelect={(index, value) => this.onSelect(value)}
       >
            {this.props.data.map((data, i) => {
              return <RadioButton value={data} >
                <Text style={{fontFamily: Fonts.type.robotoRegular,
                  fontSize: moderateScale(16),
                  color: Colors.slate_grey}}>
                  {data}
                </Text>
              </RadioButton>
            })}
          </RadioGroup>
        </ScrollView>
      </Modal>
    )
    return (
      <View>
        {dp}
      </View>
    )
  }
}
