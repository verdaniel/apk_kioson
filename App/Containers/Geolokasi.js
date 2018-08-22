import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import { Images, Colors, Metrics } from '../Themes'
import DropDown from '../Components/DropDown'
import { ratioHeight, ratioWidth } from '../Transforms/Resize'

// Styles
import styles from './Styles/GeolokasiStyle'

const debounce = require('throttle-debounce/debounce')

class Geolokasi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiKey: 'AIzaSyByfKTCNAGfUpqMTBBFESaRQBD3A0o0h8w',
      data: [],
      showDropDown: false,
      addressSearch: '',
      address: this.props.navigation.state.params.address,
      region: {
        latitude: this.props.navigation.state.params.latitude,
        longitude: this.props.navigation.state.params.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
    }
    this.onSearch = this.onSearch.bind(this)
    this.onSearchDelay = debounce(500, this.onSearch)
  }

  getAddress = async (lat, long) => {
    const { apiKey } = this.state
    try {
      const res = await fetch(`https://maps.google.com/maps/api/geocode/json?key=${apiKey}&latlng=${lat},${long}`)
      const json = await res.json()

      if (json.results || json.status === 'OK') {
        this.setState({ address: json.results[0].formatted_address })
        this.refs.marker.showCallout()
        // return json.results[0]
      }
    } catch (e) {}
  }

  onDragStart () {
    this.refs.marker.hideCallout()
  }

  onBlur () {
    Keyboard.dismiss()
    this.refs.marker.hideCallout()
    this.setState({ showDropDown: false })
  }

  onDragEnd (e) {
    // this.getAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
  }

  onPress (e) {
    this.getAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
  }

  onSearch = async (text) => {
    const { apiKey } = this.state
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&language=id&key=${apiKey}`)
      const json = await res.json()

      if (json.results || json.status === 'OK') {
        this.setState({ data: json.predictions, showDropDown: true })
      }
    } catch (e) {}
  }

  onItemClick = async (item) => {
    const { apiKey, region } = this.state
    const placeID = item.place_id
    this.setState({ addressSearch: item.description })
    this.onBlur()

    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&language=id&key=${apiKey}`)
      const json = await res.json()

      if (json.results || json.status === 'OK') {
        const location = json.result.geometry.location
        this.setState({
          address: json.result.formatted_address,
          region: {...region, latitude: location.lat, longitude: location.lng}
        })
      }
    } catch (e) { console.tron.warn(e) }
  }

  onChangeText (text) {
    if (text.length !== 0) {
      this.setState({ addressSearch: text })
      this.onSearchDelay(text)
    } else {
      this.setState({
        addressSearch: text,
        showDropDown: false
      })
    }
  }

  onRegionChange (region) {
    this.refs.marker.hideCallout()
    const newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    }
    this.setState({ region: newRegion })
    // this.getAddress(newRegion.latitude, newRegion.longitude)
  }

  onRegionChangeComplete (region) {
    const newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    }
    this.setState({ region: newRegion })
    this.getAddress(newRegion.latitude, newRegion.longitude)
  }

  onChoose () {
    const { region, address } = this.state
    if (typeof this.props.navigation.state.params.geolocation === 'function') {
      this.props.navigation.state.params.geolocation(region.latitude, region.longitude, address)
      this.props.navigation.goBack()
    }
  }

  renderMarker () {
    return (
      <View style={styles.container}>
        <Image style={{ height: ratioHeight(40), width: ratioWidth(28) }} source={Images.ic_location} />
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.onItemClick(item)}>
        <View style={styles.itemList}>
          <Image
            style={styles.point}
            source={Images.ic_point_location}
            resizeMode={'stretch'}
          />
          <View style={{ marginLeft: ratioWidth(12) }}>
            <Text style={styles.location}>
              {item.structured_formatting.main_text}
            </Text>
            <Text
              style={styles.locationDetail}
              numberOfLines={1}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderSearch () {
    const { data } = this.state
    return (
      <DropDown
        renderItem={this.renderItem}
        onBlur={(show) => this.onBlur()}
        style={[styles.dropDown, { height: data * ratioHeight(54), top: ratioHeight(62) }]}
        data={data}
        backView={[styles.dropDownComp, { height: Metrics.screenHeight }]} />
    )
  }

  render () {
    const { region, address, addressSearch, showDropDown } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => this.onBlur()}>
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={(region) => this.onRegionChange(region)}
            onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}
            initialRegion={region}
            showsUserLocation>
            <MapView.Marker
              ref={'marker'}
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
              {/* onPress={(e) => this.onPress(e)} >
              onDragEnd={(e) => this.onDragEnd(e)}>
              draggable
              onDragStart={() => this.onDragStart() */}
              <Image
                style={{ height: ratioHeight(30), width: ratioWidth(18) }}
                source={Images.ic_location}
              />
              <MapView.Callout tooltip>
                <View style={styles.marker}>
                  <Text
                    style={styles.title}
                    numberOfLines={2}>
                    {address}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          </MapView>
          <View style={styles.search}>
            <Image
              style={{ height: ratioHeight(20), width: ratioWidth(14) }}
              source={Images.ic_location}
              resizeMode={'contain'}
              tintColor={Colors.greyish}
            />
            <TextInput
              style={styles.inputSearch}
              placeholder='Cari Alamat'
              autoCorrect={false}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={Colors.greyish}
              value={addressSearch}
              onChangeText={(text) => this.onChangeText(text)}
            />
          </View>
          {showDropDown ? this.renderSearch() : <View />}
          <TouchableOpacity onPress={() => this.onChoose()}>
            <View style={styles.btnChoose}>
              <Text style={styles.textChoose}>
                PILIH
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(Geolokasi)
