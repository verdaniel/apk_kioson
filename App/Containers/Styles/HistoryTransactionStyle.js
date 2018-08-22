import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  list: {
    flex: 1
  },
  itemList: {
    flex: 1,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.black_15,
    backgroundColor: Colors.white_two,
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    paddingLeft: ratioWidth(14),
    paddingRight: ratioWidth(14),
    paddingBottom: ratioHeight(10),
    paddingTop: ratioHeight(14)
  },
  textLabelID: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textID: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.red
  },
  textTime: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  viewStatus: {
    right: 0,
    height: ratioHeight(24),
    width: ratioWidth(64),
    borderRadius: 3,
    borderColor: Colors.squash,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStatus: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(10),
    color: Colors.squash,
    textAlign: 'center'
  },
  textLabel: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    width: ratioWidth(100),
    marginTop: ratioHeight(5)
  },
  textProduct: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.red,
    marginLeft: ratioWidth(35),
    marginTop: ratioHeight(5)
  },
  textDetail: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    marginTop: ratioHeight(5)
  },
  btnPrint: {
    width: ratioWidth(150),
    height: ratioHeight(32),
    backgroundColor: Colors.nice_blue,
    borderColor: Colors.nice_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3
  },
  textPrint: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'center'
  },
  btnBuy: {
    width: ratioWidth(150),
    height: ratioHeight(32),
    backgroundColor: Colors.squash,
    borderColor: Colors.squash,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3
  },
  textBuy: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'center'
  },
  btnSearch: {
    elevation: moderateScale(2),
    borderRadius: ratioWidth(55),
    borderWidth: moderateScale(1),
    borderColor: Colors.black_15,
    position: 'absolute',
    right: ratioWidth(15),
    bottom: ratioHeight(15)
  },
  viewSearch: {
    borderRadius: ratioWidth(55),
    backgroundColor: Colors.squash,
    width: ratioWidth(55),
    height: ratioWidth(55),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSearch: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    marginLeft: ratioWidth(5)
  },
  viewEmpty: {
    backgroundColor: Colors.white_two,
    flexDirection: 'row',
    borderRadius: moderateScale(3),
    height: ratioHeight(43),
    marginTop: ratioHeight(15),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    alignItems: 'center'
  },
  textEmpty: {
    marginLeft: ratioWidth(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.red
  },
  textLastHistory: {
    marginBottom: ratioHeight(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    textAlign: 'center',
    alignSelf: 'center'
  },
  btnBantuan: {
    marginTop: ratioHeight(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBantuan: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.squash,
    textAlign: 'center'
  }
})
