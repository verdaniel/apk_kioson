import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/TabsStyle'

export default class Tabs extends Component {
  state = {
    activeTab: this.props.activeTab || 0
  }

  render ({ children } = this.props) {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {children.map(({ props: { title } }, index) =>
            <TouchableOpacity onLayout={this.props.onLayout}
              style={[
                styles.tabContainer,
                index === this.state.activeTab ? styles.tabContainerActive : []
              ]}
              onPress={() => this.setState({ activeTab: index })}
              key={index}
            >
              <Text style={[
                styles.tabText,
                index === this.state.activeTab ? styles.tabTextActive : []
              ]}>
                {title}
              </Text>
              <View style={styles.sparator} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
      </View>
    )
  }
}
