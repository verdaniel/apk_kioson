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
import LocationActions from '../Redux/LocationRedux'

export function * getState (api) {
  const response = yield call(api.getState)

  if (response.ok) {
    yield put(LocationActions.getStateSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(LocationActions.getStateFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(LocationActions.getStateFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(LocationActions.getStateFailure(data))
    }
  }
}

export function * getDistrict (api, action) {
  const { id } = action
  const response = yield call(api.getDistrict, id)

  if (response.ok) {
    yield put(LocationActions.getDistrictSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(LocationActions.getDistrictFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(LocationActions.getDistrictFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(LocationActions.getDistrictFailure(data))
    }
  }
}

export function * getCity (api, action) {
  const { id } = action
  const response = yield call(api.getCity, id)

  if (response.ok) {
    yield put(LocationActions.getCitySuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(LocationActions.getCityFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(LocationActions.getCityFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(LocationActions.getCityFailure(data))
    }
  }
}

export function * getVillage (api, action) {
  const { id } = action
  const response = yield call(api.getVillage, id)

  if (response.ok) {
    yield put(LocationActions.getVillageSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(LocationActions.getVillageFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(LocationActions.getVillageFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(LocationActions.getVillageFailure(data))
    }
  }
}