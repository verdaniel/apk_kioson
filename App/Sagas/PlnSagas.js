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
import PlnActions from '../Redux/PlnRedux'

export function * getPlnPrePaid (api, action) {
  const { token, id } = action
  const response = yield call(api.getPrePaid, token, id)

  if (response.ok) {
    yield put(PlnActions.plnPrePaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PlnActions.plnPrePaidFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(PlnActions.plnPrePaidFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(PlnActions.plnPrePaidFailure(data))
    }
  }
}

export function * orderPrePaid (api, action) {
  const { token, data } = action
  const response = yield call(api.orderPrePaid, token, data)

  if (response.ok) {
    yield put(PlnActions.orderPrePaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PlnActions.orderPrePaidFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(PlnActions.orderPrePaidFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(PlnActions.orderPrePaidFailure(data))
    }
  }
}

export function * confirmPrePaid (api, action) {
  const { token, data } = action
  const response = yield call(api.confirmPrePaid, token, data)

  if (response.ok) {
    yield put(PlnActions.confirmPrePaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PlnActions.confirmPrePaidFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(PlnActions.confirmPrePaidFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(PlnActions.confirmPrePaidFailure(data))
    }
  }
}

export function * orderPostPaid (api, action) {
  const { token, data } = action
  const response = yield call(api.orderPostPaid, token, data)

  if (response.ok) {
    yield put(PlnActions.orderPostPaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PlnActions.orderPostPaidFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(PlnActions.orderPostPaidFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(PlnActions.orderPostPaidFailure(data))
    }
  }
}

export function * confirmPostPaid (api, action) {
  const { token, data } = action
  const response = yield call(api.confirmPostPaid, token, data)

  if (response.ok) {
    yield put(PlnActions.confirmPostPaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PlnActions.confirmPostPaidFailure(data))
      } else {
        const data = { code: response.status, message: handleError(response.problem) }
        yield put(PlnActions.confirmPostPaidFailure(data))
      }
    } else {
      const data = { code: 600, message: handleError(response.problem) }
      yield put(PlnActions.confirmPostPaidFailure(data))
    }
  }
}
