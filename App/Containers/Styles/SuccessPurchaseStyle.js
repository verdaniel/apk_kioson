import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  flexBigColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ratioHeight(15),
    marginHorizontal: ratioWidth(10)
  },
  viewInside: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})
