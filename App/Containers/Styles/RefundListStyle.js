import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  box: {
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    marginBottom: ratioHeight(10),
    marginTop: ratioHeight(10),
    elevation: 2,
    padding: moderateScale(15),
    paddingBottom: moderateScale(5),
    width: Metrics.screenWidth
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: moderateScale(1)
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 14,
    paddingBottom: moderateScale(-4)
  },
  buttonSearch: {
    height: ratioHeight(32),
    width: ratioWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue,
    marginLeft: ratioWidth(15),
    marginTop: ratioHeight(4)
  },
  buttonText: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: 14,
    color: Colors.snow
  },
  error: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 10,
    letterSpacing: 0,
    color: Colors.red
  },
  itemContainer: {
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(3),
    padding: moderateScale(10)
  },
  order: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 14,
    color: Colors.slate_grey
  },
  date: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 12,
    marginTop: moderateScale(2),
    fontWeight: '500',
    letterSpacing: 0,
    color: Colors.greyish
  },
  separator: {
    flex: 1,
    height: ratioHeight(1),
    marginTop: ratioHeight(10),
    marginBottom: ratioHeight(15),
    backgroundColor: Colors.snow,
    borderTopWidth: moderateScale(1),
    borderTopColor: Colors.black_15
  },
  data: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 12,
    color: Colors.greyish,
    marginBottom: ratioHeight(2)
  },
  buttonRefund: {
    flex: 1,
    height: ratioHeight(32),
    backgroundColor: Colors.nice_blue,
    borderRadius: moderateScale(3),
    marginTop: ratioHeight(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: 14,
    color: Colors.white_two
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.black_35
  },
  boxModalContainer: {
    flex: 1,
    margin: moderateScale(20),
    padding: moderateScale(10),
    backgroundColor: Colors.snow,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  modalTitle: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(18),
    fontWeight: '300',
    letterSpacing: 0,
    color: Colors.nice_blue
  },
  modalContent: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.slate_grey
  },
  inputContainerOTP: {
    borderBottomWidth: moderateScale(1),
    flexDirection: 'row',
    justifyContent: 'center',
    margin: moderateScale(5),
    marginTop: moderateScale(10),
    flex: 1
  },
  inputTextOTP: {
    width: ratioWidth(30),
    marginRight: ratioWidth(5),
    marginLeft: ratioWidth(5),
    marginBottom: ratioWidth(0),
    paddingBottom: ratioHeight(2),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    letterSpacing: moderateScale(10),
    textAlign: 'center',
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.black_15
  },
  buttonConfirm: {
    flex: 1,
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(3),
    height: ratioHeight(36)
  }
})
