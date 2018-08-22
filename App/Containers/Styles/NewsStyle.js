import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    elevation: 1
  },
  imgLogo: {
    width: ratioWidth(95),
    height: ratioHeight(24)
  },
  btnTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  imgTanya: {
    width: ratioWidth(24),
    height: ratioHeight(24)
  },
  list: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_two,
    height: ratioHeight(75),
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey
  },
  textContent: {
    fontFamily: Fonts.type.robotoLight,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  textDate: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(10),
    color: Colors.greyish
  },
  viewEmpty: {
    backgroundColor: Colors.white_two,
    flexDirection: 'row',
    borderRadius: moderateScale(3),
    height: ratioHeight(43),
    marginTop: ratioHeight(15),
    marginLeft: ratioWidth(10),
    marginRight: ratioWidth(10),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    alignItems: 'center'
  },
  textEmpty: {
    marginLeft: ratioWidth(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.red
  }
})
