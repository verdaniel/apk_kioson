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
import ChipActions from '../Redux/ChipRedux'

export function * getChip (api, action) {
  const { data } = action
  const response = yield call(api.getChip, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ChipActions.chipSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(ChipActions.chipFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(ChipActions.chipFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(ChipActions.chipFailure(data))
    }
  }
}

export function * postConfirmationChip (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.confirmationChip, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ChipActions.confirmationChipSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(ChipActions.confirmationChipFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(ChipActions.confirmationChipFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(ChipActions.confirmationChipFailure(data))
    }
  }
}

export function * postOrderChip (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.orderChip, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ChipActions.orderChipSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(ChipActions.orderChipFailure(data))
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(ChipActions.orderChipFailure(data))
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(ChipActions.orderChipFailure(data))
    }
  }
}
