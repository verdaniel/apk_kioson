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
import NewsActions from '../Redux/NewsRedux'

export function * getNewsInfo (api, action) {
  const { token } = action
  const response = yield call(api.getNewsInfo, token)

  if (response.ok) {
    yield put(NewsActions.getNewsInfoSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(NewsActions.getNewsInfoFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(NewsActions.getNewsInfoFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(NewsActions.getNewsInfoFailure(data))
    }
  }
}

export function * getNewsPromo (api, action) {
  const { token } = action
  const response = yield call(api.getNewsPromo, token)

  if (response.ok) {
    yield put(NewsActions.getNewsPromoSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(NewsActions.getNewsPromoFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(NewsActions.getNewsPromoFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(NewsActions.getNewsPromoFailure(data))
    }
  }
}
