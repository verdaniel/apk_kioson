/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { handleError } from '../Transforms/LocalConfig'
import { call, put } from 'redux-saga/effects'
import BannerActions from '../Redux/BannerRedux'
// import { BannerSelectors } from '../Redux/BannerRedux'

export function * getBanner (api) {
  const response = yield call(api.getBanner)

  if (response.ok) {
    yield put(BannerActions.bannerSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(BannerActions.bannerFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(BannerActions.bannerFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(BannerActions.bannerFailure(data))
    }
  }
}
