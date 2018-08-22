import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row',               // Arrange tabs in a row
    backgroundColor: Colors.white_two
  },
  // Individual tab container
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',            // Arrange tabs in a row
    alignSelf: 'center',
    paddingVertical: ratioHeight(10),
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  // Active tab container
  tabContainerActive: {
    borderBottomColor: Colors.squash       // White bottom border for active tabs
  },
  // Tab text
  tabText: {
    flex: 1,
    color: Colors.greyish,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    textAlign: 'center'
  },
  tabTextActive: {
    flex: 1,
    color: Colors.slate_grey,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    textAlign: 'center'
  },
  // Content container
  contentContainer: {
    // marginTop: ratioHeight(10),
    flex: 1
  },
  sparator: {
    height: ratioHeight(25),
    width: ratioWidth(1),
    backgroundColor: Colors.black_15
  }
})
