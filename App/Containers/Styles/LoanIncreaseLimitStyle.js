import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash
  },
  navbarContainer: {
    height: ratioHeight(Metrics.navBarHeight),
    width: Metrics.screenWidth,
    backgroundColor: Colors.squash,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  imgBack: {
    width: ratioWidth(18),
    height: ratioHeight(20),
    resizeMode: 'contain'
  },
  help: {
    width: ratioWidth(24),
    height: ratioHeight(24),
    alignSelf: 'flex-end',
    resizeMode: 'contain'
  },
  viewHeader: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  },
  title: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two
  },
  viewLeft: {
    flex: 1
  },
  viewRight: {
    flex: 1
  },
  limitContainer: {
    borderRadius: moderateScale(5),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: ratioHeight(123),
    width: Metrics.screenWidth - moderateScale(30)
  },
  titlePlafon: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.white_two
  },
  plafonContainer: {
    borderRadius: moderateScale(6),
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth - moderateScale(30),
    elevation: 2,
    marginTop: moderateScale(10),
    padding: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrow: {
    width: moderateScale(9),
    height: moderateScale(14),
    tintColor: Colors.nice_blue,
    resizeMode: 'contain'
  },
  labelPlafon: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: Colors.nice_blue
  },
  labelPlafonDes: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  }
})
