import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  btnIsiSaldo: {
    backgroundColor: Colors.squash,
    marginLeft: ratioWidth(24),
    flexDirection: 'row',
    borderRadius: moderateScale(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ratioHeight(32),
    width: ratioWidth(90)
  },
  textIsiSaldo: {
    marginLeft: moderateScale(21),
    // marginRight: moderateScale(23),
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.productSansRegular,
    color: Colors.white_two,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1,
    padding: 15
  },
  viewContainer: {
    backgroundColor: Colors.white_two
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
  banner: {
    width: Metrics.width,
    height: ratioHeight(150),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnHeader: {
    width: ratioWidth(64),
    height: ratioHeight(24),
    backgroundColor: Colors.squash,
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtnHeader: {
    color: Colors.white_two,
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10)
  },
  viewSaldo: {
    flexDirection: 'row',
    height: ratioHeight(43),
    width: ratioWidth(360),
    backgroundColor: Colors.white_two,
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    paddingTop: ratioHeight(4),
    paddingBottom: ratioHeight(4),
    borderBottomWidth: moderateScale(0.5),
    borderColor: Colors.black_15
  },
  textTop: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(10),
    color: Colors.squash
  },
  textBottom: {
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    width: ratioWidth(88)
  },
  viewIcon: {
    width: (Metrics.screenWidth - ratioWidth(30)) / 4,
    height: ratioHeight(95),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_two
  },
  imgIcon: {
    height: ratioHeight(35),
    width: ratioWidth(35)
  },
  textIcon: {
    color: Colors.slate_grey,
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(11),
    textAlign: 'center'
  },
  button: {
    height: ratioHeight(32),
    paddingVertical: ratioHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3)
  },
  modalBackView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black_15
  },
  modal: {
    width: ratioWidth(320),
    backgroundColor: Colors.white_two,
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgClose: {
    alignSelf: 'flex-end',
    height: ratioWidth(24),
    width: ratioWidth(24),
    right: ratioWidth(10),
    top: ratioHeight(10)
  },
  viewModalUp: {
    height: ratioHeight(200),
    width: ratioWidth(320),
    backgroundColor: Colors.nice_blue,
    borderTopLeftRadius: moderateScale(3),
    borderTopRightRadius: moderateScale(3)
  },
  textModal: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    marginTop: ratioHeight(15),
    textAlign: 'center',
    fontSize: moderateScale(14)
  },
  btnModal: {
    height: ratioHeight(32),
    width: ratioWidth(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    marginBottom: ratioHeight(10),
    backgroundColor: Colors.nice_blue,
    marginTop: ratioHeight(25)
  },
  text: {
    color: Colors.white_two,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.robotoRegular,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15)
  },
  paginationStyle: {
    borderRadius: moderateScale(3),
    backgroundColor: Colors.black_35,
    position: 'absolute',
    bottom: ratioHeight(10),
    left: ratioWidth(10)
  },
  paginationText: {
    color: Colors.white_two,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.robotoRegular,
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(7)
  },
  paginationTextNormal: {
    color: Colors.white_two,
    fontSize: moderateScale(12),
    fontFamily: Fonts.type.robotoRegular
  },
  viewSaldoNew: {
    paddingHorizontal: ratioWidth(15),
    flexDirection: 'row',
    height: ratioHeight(52),
    width: Metrics.screenWidth,
    alignItems: 'center',
    backgroundColor: Colors.white_two,
    elevation: 2,
    flex: 1
  },
  viewPremium: {
    backgroundColor: Colors.white_two,
    flexDirection: 'row',
    width: ratioWidth(135),
    height: ratioHeight(65),
    // alignItems: 'center',
    marginRight: ratioWidth(10),
    borderRadius: moderateScale(6),
    padding: moderateScale(15),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.black_15,
    elevation: 2
  },
  viewAllPromo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    backgroundColor: Colors.black_35,
    top: ratioHeight(115),
    right: ratioWidth(10)
  },
  tabLabel: {
    marginBottom: ratioHeight(10),
    justifyContent: 'center'
  },
  tabIcon: {
    height: '100%',
    paddingHorizontal: ratioWidth(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: ratioHeight(5)
  }
})
