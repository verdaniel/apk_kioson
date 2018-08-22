import { StyleSheet } from 'react-native'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { Fonts, Colors } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ratioWidth(10)
  },
  flexOneMargin: {
    marginTop: ratioHeight(20)
  },
  button: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: Colors.nice_blue
  },
  textRegularBig: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(14),
    color: Colors.white_two,
    paddingVertical: ratioHeight(8),
    textAlign: 'center'
  }
})
