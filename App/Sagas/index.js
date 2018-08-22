import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { SignUpTypes } from '../Redux/SignUpRedux'
import { OtpTypes } from '../Redux/OtpRedux'
import { ChipTypes } from '../Redux/ChipRedux'
import { providerGameTypes } from '../Redux/VoucherGame'
import { CouponTypes } from '../Redux/CouponRedux'
import { RechargeMobileTypes } from '../Redux/RechargeMobileRedux'
import { RechargeMobileDataTypes } from '../Redux/RechargeMobileDataRedux'
import { PdamTypes } from '../Redux/PdamRedux'
import { LocationTypes } from '../Redux/LocationRedux'
import { PresetTypes } from '../Redux/PresetRedux'
import { NewsTypes } from '../Redux/NewsRedux'
import { HistoryTypes } from '../Redux/HistoryRedux'
import { PlnTypes } from '../Redux/PlnRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { AppVersionTypes } from '../Redux/AppVersionRedux'
import { SignInTypes } from '../Redux/SignInRedux'
import { MoneyTypes } from '../Redux/MoneyRedux'
import { MediaTypes } from '../Redux/MediaRedux'
import { KiosonPayTypes } from '../Redux/KiosonPayRedux'
import { BannerTypes } from '../Redux/BannerRedux'
import { PostpaidTypes } from '../Redux/PostpaidRedux'
import { PhoneTypes } from '../Redux/PhoneRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signUp } from './SignUpSagas'
import { getOtp } from './OtpSagas'
import { getChip, postConfirmationChip, postOrderChip } from './ChipSagas'
import { providerGame, serviceGame, billGame, topupGame } from './VoucherGame'
import { getCoupon } from './CouponSagas'
import { getRechargeMobile, getConfirmationRechargeMobile, getOrderRechargeMobile } from './RechargeMobileSagas'
import { getRechargeMobileData, getConfirmationRechargeMobileData, getOrderRechargeMobileData } from './RechargeMobileDataSagas'
import { getPdam, postConfirmationPdam, postOrderPdam } from './PdamSagas'
import { getState, getDistrict, getCity, getVillage } from './LocationSagas'
import { getWorkType, getStoreType } from './PresetSagas'
import { getNewsInfo, getNewsPromo } from './NewsSagas'
import { getTransaction } from './HistorySagas'
import { getPlnPrePaid, orderPrePaid, confirmPrePaid, orderPostPaid, confirmPostPaid } from './PlnSagas'
import { getProfile, updateProfile, getBalance } from './ProfileSagas'
import { logout } from './AccountSagas'
import { getAppVersion } from './AppVersionSagas'
import { getSignIn } from './SignInSagas'
import { getBankPreset, getConfirmationMoney, getOrderMoney } from './MoneySagas'
import { getPresetTv } from './MediaSagas'
import { getKiosonPay } from './KiosonPaySagas'
import { getBanner } from './BannerSagas'
import { getPostpaid, postConfirmationPostpaid, postOrderPostpaid } from './PostpaidSagas'
import { postConfirmationPhone, postOrderPhone } from './PhoneSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, signUp, api),
    takeLatest(OtpTypes.OTP_REQUEST, getOtp, api),
    takeLatest(LocationTypes.GET_STATE_REQUEST, getState, api),
    takeLatest(LocationTypes.GET_DISTRICT_REQUEST, getDistrict, api),
    takeLatest(LocationTypes.GET_CITY_REQUEST, getCity, api),
    takeLatest(LocationTypes.GET_VILLAGE_REQUEST, getVillage, api),
    takeLatest(ChipTypes.CHIP_REQUEST, getChip, api),
    takeLatest(ChipTypes.CONFIRMATION_CHIP_REQUEST, postConfirmationChip, api),
    takeLatest(ChipTypes.ORDER_CHIP_REQUEST, postOrderChip, api),
    takeLatest(providerGameTypes.PROVIDER_GAME_REQUEST, providerGame, api),
    takeLatest(providerGameTypes.SERVICE_GAME_REQUEST, serviceGame, api),
    takeLatest(providerGameTypes.BILL_GAME_REQUEST, billGame, api),
    takeLatest(providerGameTypes.TOPUP_GAME_REQUEST, topupGame, api),
    takeLatest(CouponTypes.COUPON_REQUEST, getCoupon, api),
    takeLatest(RechargeMobileTypes.RECHARGE_MOBILE_REQUEST, getRechargeMobile, api),
    takeLatest(RechargeMobileDataTypes.RECHARGE_MOBILE_DATA_REQUEST, getRechargeMobileData, api),
    takeLatest(PdamTypes.PDAM_REQUEST, getPdam, api),
    takeLatest(PdamTypes.CONFIRMATION_PDAM_REQUEST, postConfirmationPdam, api),
    takeLatest(PdamTypes.ORDER_PDAM_REQUEST, postOrderPdam, api),
    takeLatest(PresetTypes.GET_WORK_TYPE_REQUEST, getWorkType, api),
    takeLatest(PresetTypes.GET_STORE_TYPE_REQUEST, getStoreType, api),
    takeLatest(NewsTypes.GET_NEWS_INFO_REQUEST, getNewsInfo, api),
    takeLatest(NewsTypes.GET_NEWS_PROMO_REQUEST, getNewsPromo, api),
    takeLatest(HistoryTypes.GET_TRANSACTION_REQUEST, getTransaction, api),
    takeLatest(PlnTypes.PLN_PRE_PAID_REQUEST, getPlnPrePaid, api),
    takeLatest(PlnTypes.ORDER_PRE_PAID_REQUEST, orderPrePaid, api),
    takeLatest(PlnTypes.CONFIRM_PRE_PAID_REQUEST, confirmPrePaid, api),
    takeLatest(PlnTypes.ORDER_POST_PAID_REQUEST, orderPostPaid, api),
    takeLatest(PlnTypes.CONFIRM_POST_PAID_REQUEST, confirmPostPaid, api),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile, api),
    takeLatest(ProfileTypes.GET_BALANCE_REQUEST, getBalance, api),
    takeLatest(AccountTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RechargeMobileTypes.CONFIRMATION_RECHARGE_MOBILE_REQUEST, getConfirmationRechargeMobile, api),
    takeLatest(RechargeMobileTypes.ORDER_RECHARGE_MOBILE_REQUEST, getOrderRechargeMobile, api),
    takeLatest(RechargeMobileDataTypes.CONFIRMATION_RECHARGE_MOBILE_DATA_REQUEST, getConfirmationRechargeMobileData, api),
    takeLatest(RechargeMobileDataTypes.ORDER_RECHARGE_MOBILE_DATA_REQUEST, getOrderRechargeMobileData, api),
    takeLatest(AppVersionTypes.APP_VERSION_REQUEST, getAppVersion, api),
    takeLatest(SignInTypes.SIGN_IN_REQUEST, getSignIn, api),
    takeLatest(MoneyTypes.BANK_PRESET_REQUEST, getBankPreset, api),
    takeLatest(MoneyTypes.CONFIRMATION_MONEY_REQUEST, getConfirmationMoney, api),
    takeLatest(MoneyTypes.ORDER_MONEY_REQUEST, getOrderMoney, api),
    takeLatest(MediaTypes.PRESET_TV_REQUEST, getPresetTv, api),
    takeLatest(KiosonPayTypes.KIOSON_PAY_REQUEST, getKiosonPay, api),
    takeLatest(BannerTypes.BANNER_REQUEST, getBanner, api),
    takeLatest(PostpaidTypes.POSTPAID_REQUEST, getPostpaid, api),
    takeLatest(PostpaidTypes.CONFIRMATION_POSTPAID_REQUEST, postConfirmationPostpaid, api),
    takeLatest(PostpaidTypes.ORDER_POSTPAID_REQUEST, postOrderPostpaid, api),
    takeLatest(PhoneTypes.CONFIRMATION_PHONE_REQUEST, postConfirmationPhone, api),
    takeLatest(PhoneTypes.ORDER_PHONE_REQUEST, postOrderPhone, api)
  ])
}
