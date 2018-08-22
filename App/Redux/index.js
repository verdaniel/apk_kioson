import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  signUp: require('./SignUpRedux').reducer,
  otp: require('./OtpRedux').reducer,
  rechargeMobile: require('./RechargeMobileRedux').reducer,
  rechargeMobileData: require('./RechargeMobileDataRedux').reducer,
  pdam: require('./PdamRedux').reducer,
  chip: require('./ChipRedux').reducer,
  vouchergame: require('./VoucherGame').reducer,
  coupon: require('./CouponRedux').reducer,
  location: require('./LocationRedux').reducer,
  preset: require('./PresetRedux').reducer,
  news: require('./NewsRedux').reducer,
  history: require('./HistoryRedux').reducer,
  pln: require('./PlnRedux').reducer,
  account: require('./AccountRedux').reducer,
  profile: require('./ProfileRedux').reducer,
  version: require('./AppVersionRedux').reducer,
  error: require('./ErrorRedux').reducer,
  login: require('./UserLoginRedux').reducer,
  signIn: require('./SignInRedux').reducer,
  money: require('./MoneyRedux').reducer,
  media: require('./MediaRedux').reducer,
  kiosonpay: require('./KiosonPayRedux').reducer,
  bluetooth: require('./BluetoothRedux').reducer,
  banner: require('./BannerRedux').reducer,
  postpaid: require('./PostpaidRedux').reducer,
  phone: require('./PhoneRedux').reducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
