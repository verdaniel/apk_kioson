import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize';

export default StyleSheet.create({
  maskedLogo: {
    marginTop: ratioHeight(15),
    marginBottom: ratioHeight(15),
    padding: moderateScale(13),
    borderWidth: 1,
    borderColor: Colors.nice_blue,
    borderRadius: 3
  },
  iconSquareMedium: {
    height: ratioHeight(35),
    width: ratioWidth(35)
  },
})
