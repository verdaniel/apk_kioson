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
import RechargeMobileRedux from '../Redux/RechargeMobileRedux'
import { ToastAndroid } from 'react-native'

export function * getRechargeMobile (api, action) {
  const { data } = action
  const response = yield call(api.getRechargeMobile, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileRedux.rechargeMobileSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileRedux.rechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileRedux.rechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileRedux.rechargeMobileFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * getConfirmationRechargeMobile (api, action) {
  const { data } = action
  const response = yield call(api.confirmationRechargeMobile, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileRedux.confirmationRechargeMobileSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileRedux.confirmationRechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileRedux.confirmationRechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileRedux.confirmationRechargeMobileFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * getOrderRechargeMobile (api, action) {
  const { data } = action
  const response = yield call(api.orderRechargeMobile, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileRedux.orderRechargeMobileSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileRedux.orderRechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileRedux.orderRechargeMobileFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileRedux.orderRechargeMobileFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}
