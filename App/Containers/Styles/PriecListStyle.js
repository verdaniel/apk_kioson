import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_two
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  headerActive: {
    borderTopColor: Colors.black_15,
    borderTopWidth: 0.5,
    paddingVertical: ratioHeight(12),
    paddingLeft: ratioWidth(29),
    paddingRight: ratioWidth(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerInactive: {
    borderBottomColor: Colors.black_15,
    borderBottomWidth: 0.5,
    paddingVertical: ratioHeight(12),
    paddingLeft: ratioWidth(29),
    paddingRight: ratioWidth(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    borderBottomColor: Colors.black_15,
    borderBottomWidth: 0.5,
    paddingVertical: ratioHeight(12),
    paddingLeft: ratioWidth(29),
    paddingRight: ratioWidth(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerText: {
    flex: 1,
    marginLeft: ratioWidth(29),
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.slate_grey
  },
  content: {
    marginHorizontal: ratioHeight(10),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.black_15,
    marginBottom: ratioHeight(15)
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  }
})
