import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Transforms/Scaling'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  radioOut: {
    height: moderateScale(16), width: moderateScale(16), borderRadius: moderateScale(200), borderWidth: 1, justifyContent: 'center', alignItems: 'center'
  },
  radioIn: {
    height: moderateScale(8), width: moderateScale(8), borderRadius: moderateScale(200)
  }
})
