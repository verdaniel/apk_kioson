import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  form: {
    marginTop: ratioHeight(10),
    marginBottom: ratioHeight(10),
    backgroundColor: Colors.white_two
  },
  padding: {
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    paddingBottom: ratioHeight(6),
    paddingTop: ratioHeight(15)
  },
  flexRowflat: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: ratioHeight(2)
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(0),
    paddingBottom: ratioHeight(2),
    paddingLeft: ratioWidth(-5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  inputTextError: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.red,
    paddingTop: ratioHeight(0),
    paddingBottom: ratioHeight(2),
    paddingLeft: ratioWidth(-5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.red
  },
  button: {
    marginLeft: ratioWidth(19),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.greyish,
    justifyContent: 'center'
  },
  buttonActive: {
    marginLeft: ratioWidth(19),
    borderRadius: moderateScale(3),
    backgroundColor: Colors.nice_blue,
    justifyContent: 'center'
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    paddingLeft: ratioWidth(38),
    paddingRight: ratioWidth(38),
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(8),
    textAlign: 'center'
  },
  notifText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.nice_blue
  },
  notifTextError: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red
  },
})
