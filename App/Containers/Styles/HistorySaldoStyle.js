import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ratioWidth, ratioHeight } from '../../Transforms/Resize'
import { moderateScale } from '../../Transforms/Scaling'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  list: {
    flex: 1
  },
  itemList: {
    backgroundColor: Colors.white_two,
    paddingLeft: ratioWidth(15),
    paddingRight: ratioWidth(15),
    paddingBottom: ratioHeight(10),
    paddingTop: ratioHeight(10)
  },
  textTitle: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.nice_blue
  },
  textID: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.slate_grey
  },
  textDate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(12),
    color: Colors.greyish,
    marginTop: ratioHeight(5)
  },
  textNominal: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(14),
    color: Colors.slate_grey,
    textAlign: 'right'
  },
  textSaldo: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: moderateScale(12),
    color: Colors.slate_grey,
    textAlign: 'right'
  },
  viewHeader: {
    height: ratioHeight(62),
    padding: moderateScale(15),
    backgroundColor: Colors.white_two,
    borderBottomWidth: moderateScale(1),
    borderColor: Colors.black_15
  },
  viewDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: ratioHeight(32),
    paddingLeft: ratioWidth(10),
    paddingRight: ratioWidth(10),
    borderRadius: 3,
    borderColor: Colors.black_15,
    borderWidth: 0.5
  },
  textInputDate: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: moderateScale(16),
    color: Colors.slate_grey
  }
})
