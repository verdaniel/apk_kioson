import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  viewLeft: {
    flex: 1
  },
  navbarContainer: {
    height: ratioHeight(Metrics.navBarHeight),
    width: Metrics.screenWidth,
    backgroundColor: Colors.white_two,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    marginBottom: moderateScale(2),
    elevation: 2
  },
  imgBack: {
    width: ratioWidth(18),
    height: ratioHeight(20),
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
    color: Colors.slate_grey
  },
  viewRight: {
    flex: 1
  },
  textContainer: {
    padding: moderateScale(15)
  },
  text: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  bottomContainer: {
    height: ratioHeight(62),
    backgroundColor: Colors.white_two,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 10,
    marginTop: moderateScale(2)
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: moderateScale(15)
  },
  button: {
    flex: 1,
    height: ratioHeight(36),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  }
})
