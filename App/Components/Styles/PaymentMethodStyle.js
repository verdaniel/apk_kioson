import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import {moderateScale} from '../../Transforms/Scaling'
import { ratioHeight, ratioWidth } from '../../Transforms/Resize'

export default StyleSheet.create({
  kycPayment: {
    marginTop: ratioHeight(10),
    backgroundColor: Colors.white_two,
    marginBottom: ratioHeight(10)
  },
  textKyc: {
    fontSize: moderateScale(12),
    color: Colors.greyish,
    fontFamily: Fonts.type.robotoMedium
  },
  paymentContainer: {
    backgroundColor: Colors.white_two,
    paddingHorizontal: ratioWidth(15)
  },
  imageKyc: {
    width: ratioWidth(24),
    height: ratioHeight(20.8),
    marginRight: ratioWidth(15)
  },
  amountKyc: {
    flex:1,
    flexDirection: 'column',
    paddingTop: ratioHeight(13),
    paddingBottom: ratioHeight(11)
  },
  textKycTop: {
    color: Colors.squash,
    fontSize: moderateScale(10),
    fontFamily: Fonts.type.robotoBold
  },
  textKycBottom: {
    color: Colors.nice_blue,
    fontSize: moderateScale(14),
    fontFamily: Fonts.type.robotoMedium
  },
  separatorKyc: {
    height: ratioHeight(1),
    backgroundColor: Colors.black_15,
    marginHorizontal: ratioWidth(15)
  }
})
