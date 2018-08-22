import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    backgroundColor: Colors.white_two,
    borderRadius: 3,
    marginHorizontal: ratioWidth(10)
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: ratioHeight(7)
  },
  borderBottom: {
    marginHorizontal: ratioWidth(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black_15
  },
  textRegularLarge: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(8),
    paddingBottom: ratioHeight(7)
  },
  textRegularMed: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  textMediumHeader: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.greyish
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textFieldDropDown: {
    flex: 1,
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.slate_grey,
    paddingTop: ratioHeight(7),
    paddingBottom: ratioHeight(7),
    marginHorizontal: ratioWidth(10)
  }
})
