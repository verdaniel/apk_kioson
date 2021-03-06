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

import { call, put } from 'redux-saga/effects'
import VoucherGame from '../Redux/VoucherGame'
import { handleError } from '../Transforms/LocalConfig'

export function * providerGame (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.providerGame, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(VoucherGame.providerGameSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(VoucherGame.providerGameFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(VoucherGame.providerGameFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(VoucherGame.providerGameFailure(data))
    }
  }
}

export function * serviceGame (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.serviceGame, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(VoucherGame.serviceGameSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(VoucherGame.serviceGameFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(VoucherGame.serviceGameFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(VoucherGame.serviceGameFailure(data))
    }
  }
}

export function * billGame (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.billGame, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(VoucherGame.billGameSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(VoucherGame.billGameFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(VoucherGame.billGameFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(VoucherGame.billGameFailure(data))
    }
  }
}

export function * topupGame (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.topupGame, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(VoucherGame.topupGameSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(VoucherGame.topupGameFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(VoucherGame.topupGameFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(VoucherGame.topupGameFailure(data))
    }
  }
}
