import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    height: 43,
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.black_15,
    justifyContent: 'center'
  },
  textInput: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey
  }
})
