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
import MoneyActions from '../Redux/MoneyRedux'

export function * getBankPreset (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.bankPreset, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MoneyActions.bankPresetSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(MoneyActions.bankPresetFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(MoneyActions.bankPresetFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(MoneyActions.bankPresetFailure(data))
    }
  }
}

export function * getConfirmationMoney (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.confirmationMoney, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MoneyActions.confirmationMoneySuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(MoneyActions.confirmationMoneyFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(MoneyActions.confirmationMoneyFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(MoneyActions.confirmationMoneyFailure(data))
    }
  }
}

export function * getOrderMoney (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.orderMoney, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MoneyActions.orderMoneySuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(MoneyActions.orderMoneyFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(MoneyActions.orderMoneyFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(MoneyActions.orderMoneyFailure(data))
    }
  }
}
