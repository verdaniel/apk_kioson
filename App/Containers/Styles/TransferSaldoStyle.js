import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  amountContainer: {
    backgroundColor: Colors.snow,
    padding: moderateScale(20),
    paddingVertical: 0,
    flexDirection: 'column'
  },
  label: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.black_15
  },
  buttonRight: {
    flex: 1,
    marginBottom: ratioHeight(10),
    marginTop: ratioHeight(10),
    height: ratioHeight(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  }
})
