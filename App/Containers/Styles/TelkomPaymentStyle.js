import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import { ratioHeight } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  form: {
    backgroundColor: Colors.white_two,
    paddingBottom: ratioHeight(10)
  }
})
