import { StyleSheet } from 'react-native'
import { moderateScale } from '../../Transforms/Scaling'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  flexOneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imgTanya: {
    width: ratioWidth(22),
    height: ratioHeight(22),
    marginRight: ratioWidth(17)
  },
  flexColMenu: {
    flex: 1,
    marginVertical: ratioHeight(15)
  },
  flexRowMenu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
    // borderBottomWidth: 0.5,
    // borderBottomColor: Colors.black_15
  },
  robotoRegBigSlate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  },
  robotoLightBigSlate: {
    paddingTop: ratioHeight(2),
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  imageArrow: {
    width: ratioWidth(7),
    height: ratioHeight(12),
    marginRight: ratioWidth(15)
  },
  borderBottom: {
    marginLeft: ratioWidth(22 + 17),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.black_15
  }
})
