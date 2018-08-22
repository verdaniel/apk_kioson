import React from 'react'
import {
  AppRegistry,
  ScrollView,
  I18nManager,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Fonts } from '../Themes/index'
import { moderateScale } from '../Transforms/Scaling'
import { VictoryAxis, VictoryScatter, VictoryArea, VictoryContainer, VictoryChart, VictoryLabel } from 'victory-native'
import { ratioHeight } from '../Transforms/Resize'

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      scrollEnabled: false
    }
  }

  // Prop type warnings
  static propTypes = {
    data: PropTypes.array,
    dataFormat: PropTypes.array,
    month: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    data: [
      {x: 0, y: 5},
      {x: 1, y: 18},
      {x: 2, y: 80},
      {x: 3, y: 12},
      {x: 4, y: 36},
      {x: 5, y: 16},
      {x: 6, y: 55},
      {x: 7, y: 27}
    ],
    dataFormat: ['8', '9', '10', '11', '12', '13', '14', '15'],
    month: ['Oktober']
  }

  mapLabel (dataList, month) {
    var mmonthLabel
    dataList.map((data, i) => {
      if (data === '1' || month.length === 1) {
        mmonthLabel = month.map((datas, i) => {
          if (i === 0) {
            return (
              <VictoryLabel x={25} y={0} style={{
                textAnchor: 'start',
                verticalAnchor: 'start',
                fill: Colors.greyish,
                fontFamily: Fonts.type.robotoMedium,
                fontSize: moderateScale(Fonts.size.medium)
              }}
                text={datas}
              />
            )
          } else {
            return (
              <VictoryLabel x={19 * 25} y={0} style={{
                textAnchor: 'start',
                verticalAnchor: 'start',
                fill: Colors.greyish,
                fontFamily: Fonts.type.robotoMedium,
                fontSize: moderateScale(Fonts.size.medium)
              }}
                text={datas}
              />
            )
          }
        })
      }
    })
    return mmonthLabel
  }

  render () {
    const { data, dataFormat, month } = this.props
    const label = this.mapLabel(dataFormat, month)
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.white_two, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
        scrollEnabled={this.state.scrollEnabled}
        >
        <VictoryChart
          height={ratioHeight(178 + 40)}
          width={data.length * 30}
          padding={{top: 50, bottom: 30, left: 26, right: 26}}
          containerComponent={
            <VictoryContainer
              onTouchStart={() => this.setState({ scrollEnabled: false })}
              onTouchEnd={() => this.setState({ scrollEnabled: true })}
            />
          }
          >
          {label}
          <VictoryArea
            data={data}
            labels={(datum) => datum.y}
            labelComponent={<VictoryLabel dx={-1} dy={25} renderInPortal verticalAnchor='middle' textAnchor='middle' />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            interpolation='catmullRom'
            style={{
              data: {
                fill: 'rgba(21, 148, 185, 0.5)',
                stroke: Colors.transparent
              },
              labels: {fill: Colors.slate_grey, fontSize: 8, fontFamily: Fonts.type.robotoRegular}
            }}
            standalone={false}
            />
          <VictoryAxis
            standalone={false}
            animate={{
              duration: 2000,
              easing: 'bounce'
            }}
            style={{
              axis: {stroke: Colors.transparent, strokeWidth: 0},
              ticks: {
                size: 6,
                stroke: 'rgba(174, 174, 174, 0.5)',
                strokeWidth: 0.5
              },
              tickLabels: {
                padding: moderateScale(5),
                fill: (t) => t === dataFormat.length - 1 || t === 0 ? Colors.nice_blue : Colors.slate_grey,
                fontFamily: Fonts.type.robotoRegular,
                fontSize: moderateScale(12)
              }
            }}
            tickValues={data.map(function (value, index) { return value.x })}
            tickFormat={dataFormat}
            />
          <VictoryScatter
            name='Scatter'
            data={data}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            symbol='circle'
            size={moderateScale(8)}
            style={{
              data: {
                fill: Colors.white_two,
                stroke: Colors.squash,
                strokeWidth: 0.8
              }
            }}
            />
        </VictoryChart>

      </ScrollView>
    )
  }
}

AppRegistry.registerComponent('Chart', () => Chart)

export default Chart
