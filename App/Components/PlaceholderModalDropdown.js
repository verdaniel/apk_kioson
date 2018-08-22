import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from './Styles/PlaceholderModalDropdownStyle'
import { Images } from '../Themes'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import ComponentDropdown from './ComponentDropdown'

const DEMO_OPTIONS_2 = [
  {'name': 'Rex', 'age': 30},
  {'name': 'Mary', 'age': 25},
  {'name': 'John', 'age': 41},
  {'name': 'Jim', 'age': 22},
  {'name': 'Susan', 'age': 52},
  {'name': 'Brent', 'age': 33},
  {'name': 'Alex', 'age': 16},
  {'name': 'Ian', 'age': 20},
  {'name': 'Phil', 'age': 24}
]

function renderRow (rowData, rowID, highlighted) {
  return (
    <TouchableHighlight underlayColor='cornflowerblue'>
      <Text style={[styles.textList]}>
        {rowData.name}
      </Text>
    </TouchableHighlight>
  )
}

function renderButtonText (rowData) {
  const { name } = rowData
  return `${name}`
}

const layout = {
  width: 0,
  height: 0
}

export default class PlaceholderModalDropdown extends Component {
  // Prop type warnings
  static propTypes = {
    leftIcon: PropTypes.any,
    isLeftVisible: PropTypes.bool,
    title: PropTypes.string,
    marginTop: PropTypes.number,
    borderBottom: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    options: PropTypes.array,
    renderButtonTexts: PropTypes.func,
    renderRows: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    leftIcon: Images.ic_amount,
    isLeftVisible: true,
    title: 'Title',
    marginTop: 0,
    borderBottom: true,
    disabled: true,
    defaultValue: 'Please Select',
    options: DEMO_OPTIONS_2,
    renderButtonText: (rowData) => renderButtonText(rowData),
    renderRow: renderRow.bind(this)
  }

  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  renderLeft (leftIcon, isLeftVisible) {
    if (isLeftVisible) {
      return (
        <Image source={leftIcon} style={[styles.iconSquare, {marginLeft: ratioWidth(5), marginRight: ratioWidth(15)}]} resizeMode='contain' />
      )
    }
    return null
  }

  onLayout = (event) => {
    layout.width = event.nativeEvent.layout.width
    layout.height = event.nativeEvent.layout.height
  }

  renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    if (rowID === this.props.options.length - 1) return
    let key = `spr_${rowID}`
    return (<View style={styles.separator}
      key={key}
    />)
  }

  render () {
    const {disabled, defaultValue, options, renderButtonText, renderRow, borderBottom, marginTop, leftIcon, isLeftVisible, title} = this.props
    return (
      <View style={[styles.flexRowOne]}>
        {this.renderLeft(leftIcon, isLeftVisible)}
        <View style={[styles.flexColumn, {marginTop: marginTop}, borderBottom === true ? {borderBottomWidth: 0.5} : {borderBottomWidth: 0}]}>
          <Text style={styles.textBoldSmall}>
            {title}
          </Text>
          <View onLayout={this.onLayout} style={styles.flexRowTwoDropDown}>
            <ComponentDropdown style={{flex: 1}}
              disabled={disabled}
              defaultValue={defaultValue}
              options={options}
              renderButtonText={renderButtonText}
              renderRow={renderRow}
              textStyle={styles.textDropDown}
              onDropdownWillShow={() => this.setState({show: true})}
              onDropdownWillHide={() => this.setState({show: false})}
              dropdownStyle={[styles.dropdown_2_dropdown, {width: layout.width, height: ratioHeight(layout.height * options.length)}]}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
            />
          </View>
        </View>
      </View>
    )
  }
}
