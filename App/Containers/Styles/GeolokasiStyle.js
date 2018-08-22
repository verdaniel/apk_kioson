import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  map: {
    flex: 1
    // height: Metrics.screenHeight, // - (Metrics.navBarHeight + 66), // Metrics.screenHeight - (Metrics.navBarHeight + 66),
    // width: Metrics.screenWidth // Metrics.screenWidth
  },
  marker: {
    backgroundColor: Colors.white_two,
    padding: moderateScale(12),
    height: ratioHeight(60),
    width: ratioWidth(280),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.black_15,
    marginBottom: ratioHeight(10)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    fontSize: moderateScale(12),
    textAlign: 'center'
  },
  search: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_two,
    height: ratioHeight(50),
    width: ratioWidth(348),
    top: ratioHeight(6),
    padding: moderateScale(15),
    elevation: 5,
    borderRadius: 3
  },
  inputSearch: {
    flex: 1,
    height: ratioHeight(50),
    marginLeft: ratioWidth(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  dropDown: {
    position: 'absolute',
    width: ratioWidth(348),
    borderRadius: 3,
    paddingLeft: ratioWidth(12),
    paddingRight: ratioWidth(12),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: ratioHeight(12),
    paddingBottom: ratioHeight(12)
  },
  point: {
    height: ratioWidth(20),
    width: ratioWidth(20)
  },
  location: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.slate_grey
  },
  locationDetail: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  btnChoose: {
    height: ratioHeight(55),
    width: Metrics.screenWidth,
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textChoose: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(16),
    color: Colors.white_two,
    textAlign: 'center'
  }
})
