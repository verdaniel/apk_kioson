import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewLeft: {
    flex: 1
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
  amountContainer: {
    margin: moderateScale(10),
    elevation: 2,
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    padding: moderateScale(13),
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  amount: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish
  },
  methodContainer: {
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    flexDirection: 'row'
  },
  method: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black_15,
    borderWidth: moderateScale(1),
    padding: moderateScale(10)
  },
  dropdownImage: {
    width: ratioWidth(16),
    height: ratioWidth(16),
    resizeMode: 'contain'
  },
  dropDown: {
    position: 'absolute',
    minHeight: ratioHeight(100),
    width: ratioWidth(320) + ratioWidth(14),
    right: ratioWidth(16),
    borderRadius: moderateScale(3),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  inputContainer: {
    backgroundColor: Colors.snow,
    padding: moderateScale(15),
    flexDirection: 'column',
    marginTop: ratioHeight(10)
  },
  buttonDate: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15,
    padding: moderateScale(10),
    alignItems: 'center',
    marginBottom: ratioHeight(10)
  },
  date: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16)
  },
  imageCalender: {
    height: ratioHeight(16),
    width: ratioHeight(14)
  },
  uploadPhoto: {
    width: ratioWidth(120),
    height: ratioHeight(36),
    marginRight: ratioHeight(20),
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(1),
    borderColor: Colors.nice_blue
  },
  textUpload: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(12),
    color: Colors.nice_blue
  },
  button: {
    height: ratioHeight(43),
    margin: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    flex: 1
  },
  textButton: {
    fontFamily: Fonts.type.pro,
    fontSize: moderateScale(16),
    color: Colors.white_two
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black_35
  },
  modal: {
    width: ratioWidth(320),
    flexDirection: 'column',
    backgroundColor: Colors.white_two,
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(15)
  },
  modalTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(18),
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.nice_blue
  },
  modalContent: {
    marginTop: ratioHeight(15),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.slate_grey,
    marginBottom: ratioHeight(25)
  },
  modalButton: {
    flex: 1,
    height: ratioHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue
  }
})
