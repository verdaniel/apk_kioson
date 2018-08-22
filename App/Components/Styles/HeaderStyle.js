import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.squash,
    height: moderateScale(Metrics.navBarHeight),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ratioWidth(15)
  },
  viewLeft: {
    left: ratioWidth(0),
    padding: moderateScale(15),
    position: 'absolute',
    justifyContent: 'flex-start'
  },
  viewRight: {
    right: ratioWidth(0),
    position: 'absolute',
    justifyContent: 'flex-start',
    padding: moderateScale(15)
  },
  viewHeader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBack: {
    width: ratioWidth(16),
    height: ratioWidth(16)
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  },
  error: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10)
  },
  containerSign: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.snow,
    marginRight: moderateScale(10)
  },
  sign: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.red
  },
  text: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(13),
    color: Colors.snow
  },
  notif: {
    top: 12,
    right: 10,
    position: 'absolute',
    height: ratioHeight(15),
    width: ratioWidth(15),
    borderRadius: 300,
    justifyContent: 'center',
    backgroundColor: Colors.red
  },
  textNotif: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(8),
    color: Colors.white_two,
    textAlign: 'center'
  }
})
