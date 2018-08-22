import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'
import { ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    height: Metrics.screenHeight - 74,
    backgroundColor: Colors.white
  },
  balanceContainer: {
    backgroundColor: Colors.snow,
    padding: 5,
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageBalance: {
    height: 16,
    marginRight: 15,
    resizeMode: 'contain',
    width: 18
  },
  textLabel: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: 14,
    color: Colors.slate_grey,
    marginRight: 10
  },
  textLabelProvider: {
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey,
    marginRight: 10,
    fontSize: 12,
    marginBottom: 3
  },
  textData: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: 14,
    color: Colors.slate_grey,
    marginRight: 10
  },
  dataContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  },
  boxDropdown: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginRight: 20,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: Colors.black_15,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  dropdownImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  inputContainer: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginLeft: -3,
    fontFamily: Fonts.type.robotoLight
  },
  dropDown: {
    position: 'absolute',
    minHeight: 30,
    maxHeight: 200,
    width: ratioWidth(320) - 25,
    right: 16,
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white_two,
    elevation: 5
  },
  dropDownComp: {
    flex: 1,
    position: 'absolute',
    width: Metrics.screenWidth
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: Metrics.screenWidth,
    padding: 20
  },
  button: {
    height: 43,
    flex: 1,
    borderRadius: 3,
    backgroundColor: Colors.greyish,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonActive: {
    height: 43,
    flex: 1,
    borderRadius: 3,
    backgroundColor: Colors.nice_blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.productSansRegular,
    fontSize: 16,
    color: Colors.white_two
  },
  errorContainer: {
    marginLeft: 50,
    marginRight: 20,
    padding: 5,
    paddingLeft: 0,
    borderTopColor: Colors.red,
    borderTopWidth: 1
  },
  note: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  exclamation: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.greyish,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNote: {
    fontFamily: Fonts.type.robotoRegular,
    marginLeft: 10,
    fontSize: 14,
    color: Colors.greyish
  }
})
