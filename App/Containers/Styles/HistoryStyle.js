import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    elevation: 1
  },
  imgLogo: {
    width: ratioWidth(95),
    height: ratioHeight(24)
  },
  btnTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  imgTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  list: {
    flex: 1
  },
  itemList: {
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(0.5),
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
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textTime: {
    fontFamily: Fonts.type.robotoMedium,
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
    fontFamily: Fonts.type.productSansBold,
    fontSize: moderateScale(10),
    color: Colors.squash,
    textAlign: 'center'
  },
  textLabel: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    width: ratioWidth(100),
    marginTop: ratioHeight(5)
  },
  textProduct: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginLeft: ratioWidth(5),
    marginTop: ratioHeight(5)
  },
  textDetail: {
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginTop: ratioHeight(5)
  },
  btnPrint: {
    width: ratioWidth(150),
    height: ratioHeight(32),
    backgroundColor: Colors.white_two,
    borderColor: Colors.nice_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3)
  },
  textPrint: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(14),
    color: Colors.nice_blue,
    textAlign: 'center'
  },
  btnBuy: {
    width: ratioWidth(150),
    height: ratioHeight(32),
    backgroundColor: Colors.nice_blue,
    borderColor: Colors.nice_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3)
  },
  textBuy: {
    fontFamily: Fonts.type.robotoSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    textAlign: 'center'
  },
  btnSearch: {
    alignSelf: 'center',
    elevation: 2,
    borderRadius: moderateScale(3),
    borderWidth: moderateScale(1),
    borderColor: Colors.black_15,
    position: 'absolute',
    bottom: ratioHeight(10),
    backgroundColor: Colors.white_two
  },
  viewSearch: {
    flexDirection: 'row',
    height: ratioHeight(32),
    width: ratioWidth(320),
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
    marginTop: ratioHeight(10),
    marginBottom: ratioHeight(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    textAlign: 'center',
    alignSelf: 'center'
  }
})
