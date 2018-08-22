import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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
  viewRight: {
    flex: 1
  },
  viewLeft: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: Colors.squash,
    padding: moderateScale(25),
    paddingBottom: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    height: moderateScale(65),
    width: moderateScale(65),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initialName: {
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(29),
    color: Colors.snow
  },
  image: {
    height: moderateScale(65),
    width: moderateScale(65),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: Colors.snow,
    resizeMode: 'cover'
  },
  nameContainer: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    flexDirection: 'column'
  },
  name: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(18),
    color: Colors.white_two
  },
  labelName: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two
  },
  arrow: {
    width: moderateScale(9),
    height: moderateScale(14),
    tintColor: Colors.snow,
    resizeMode: 'contain'
  },
  buttonRegisterContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(25),
    paddingRight: moderateScale(25),
    marginTop: moderateScale(-25)
  },
  menu: {
    flexDirection: 'row',
    flex: 1,
    elevation: 2,
    borderRadius: moderateScale(6),
    padding: moderateScale(10),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    marginBottom: moderateScale(10),
    marginRight: moderateScale(5),
    marginLeft: moderateScale(5),
    marginTop: 0,
    backgroundColor: Colors.snow
  },
  imageMenu: {
    width: moderateScale(36),
    height: moderateScale(35),
    resizeMode: 'contain'
  },
  textMenuContainer: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(20),
    flexDirection: 'column'
  },
  ajukan: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    fontWeight: '500'
  },
  itemContainer: {
    elevation: 2,
    backgroundColor: Colors.snow,
    marginBottom: moderateScale(10),
    flexDirection: 'column',
    padding: moderateScale(15)
  },
  imageItemContainer: {
    flex: 1,
    borderRadius: moderateScale(5),
    padding: moderateScale(12),
    backgroundColor: Colors.white
  },
  imageDanamas: {
    width: moderateScale(111),
    height: moderateScale(28),
    resizeMode: 'contain'
  },
  titleItem: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.slate_grey
  },
  labelData: {
    alignSelf: 'center',
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    // fontWeight: '400',
    textAlign: 'center',
    color: Colors.greyish,
    marginBottom: moderateScale(10)
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginTop: moderateScale(3),
    color: Colors.nice_blue
  },
  rincian: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.squash
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  buttonContainer: {
    height: moderateScale(43),
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    borderTopWidth: moderateScale(1),
    borderTopColor: Colors.black_15
  },
  textButton: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Colors.nice_blue
  }
})
