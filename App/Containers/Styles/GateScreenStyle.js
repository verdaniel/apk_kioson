import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.squash
  },
  boardCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: ratioHeight(32)
  },
  banner: {
    height: ratioHeight(274),
    width: ratioWidth(274),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    marginBottom: ratioHeight(31)
  },
  title: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(Fonts.size.large),
    color: Colors.white_two
  },
  description: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(Fonts.size.medium),
    color: Colors.white_two,
    textAlign: 'center',
    marginBottom: ratioHeight(22)
  },
  footter: {
    flexDirection: 'row'
  },
  textButton: {
    color: Colors.squash,
    fontFamily: Fonts.type.productSansRegular,
    fontSize: moderateScale(Fonts.size.regularSmlall)
  },
  flexOne: {
    borderColor: Colors.white_two,
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    width: ratioWidth(150),
    height: ratioHeight(43),
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexOneNostyle: {
    width: ratioWidth(150),
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  flexOneNormal: {
    flex: 1,
    marginRight: ratioWidth(10)
  },
  line: {
    borderBottomWidth: 1,
    width: ratioWidth(67),
    borderBottomColor: Colors.white_two,
    marginBottom: ratioHeight(63)
  }
})
