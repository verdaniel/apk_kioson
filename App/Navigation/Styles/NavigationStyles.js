import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.squash,
    height: ratioHeight(Metrics.navBarHeight),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewLeft: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewHeader: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewRight: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBack: {
    width: ratioWidth(16),
    height: ratioHeight(16)
  },
  textTitle: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontFamily: Fonts.type.productSansBold,
    color: Colors.white_two
  }
})
