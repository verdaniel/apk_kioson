import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/DropDownStyle'

export default class DropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      enableScrolling: false,
      data: typeof this.props.data === 'undefined' ? [] : this.props.data,
      backView: typeof this.props.backView === 'undefined' ? styles.backView : this.props.backView
    }
  }

  static propTypes = {
    style: PropTypes.oneOfType(['func', 'object']),
    backView: PropTypes.oneOfType(['func', 'object']),
    data: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    data: [],
    backView: styles.backView
  }

  componentWillReceiveProps (newProps) {
    this.setState({ data: newProps.data, backView: newProps.backView })
  }

  onItemPress (item) {
    this.props.onItemPress(item, false)
  }

  onBlur () {
    this.props.onBlur(false)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => this.onItemPress(item)}>
        <Text style={styles.item}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  render () {
    let renderitem
    if (typeof this.props.renderItem === 'undefined') {
      renderitem = this.renderItem
    } else {
      renderitem = this.props.renderItem
    }
    return (
      <TouchableOpacity style={this.props.backView} onPress={() => this.onBlur()}>
        <FlatList
          data={this.state.data}
          style={this.props.style}
          renderItem={renderitem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </TouchableOpacity>
    )
  }
}
