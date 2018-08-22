import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/index'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexRowOne: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10)
  },
  iconSquare: {
    height: ratioHeight(16),
    width: ratioWidth(16)
  },
  flexColumn: {
    flex: 1,
    marginTop: ratioHeight(10)
  },
  textBoldSmall: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  flexRowTwo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: ratioWidth(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  flexRowTwoError: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: ratioWidth(11),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.red
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingVertical: ratioHeight(7),
    marginLeft: ratioWidth(10)
  },
  inputTextError: {
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.red,
    paddingVertical: ratioHeight(7),
    marginLeft: ratioWidth(10)
  },
  erroMessage: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(10),
    color: Colors.red,
    marginTop: ratioHeight(2),
    marginBottom: ratioHeight(5)
  }
})
