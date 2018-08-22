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
import PdamActions from '../Redux/PdamRedux'

export function * getPdam (api, action) {
  const { data } = action
  const response = yield call(api.getpdam, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PdamActions.pdamSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PdamActions.pdamFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PdamActions.pdamFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PdamActions.pdamFailure(data))
    }
  }
}

export function * postConfirmationPdam (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.confirmationPdam, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PdamActions.confirmationPdamSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PdamActions.confirmationPdamFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PdamActions.confirmationPdamFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PdamActions.confirmationPdamFailure(data))
    }
  }
}

export function * postOrderPdam (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.orderPdam, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PdamActions.orderPdamSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PdamActions.orderPdamFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PdamActions.orderPdamFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PdamActions.orderPdamFailure(data))
    }
  }
}
