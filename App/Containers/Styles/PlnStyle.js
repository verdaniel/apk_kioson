import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewSaldo: {
    flexDirection: 'row',
    backgroundColor: Colors.white_two,
    height: ratioHeight(32),
    alignItems: 'center',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    marginBottom: ratioHeight(6)
  },
  textSaldo: {
    marginLeft: ratioWidth(10),
    fontFamily: Fonts.type.robotoBold,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textNominal: {
    marginLeft: ratioWidth(7),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  }
})
