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
import RechargeMobileDataActions from '../Redux/RechargeMobileDataRedux'
import { ToastAndroid } from 'react-native'

export function * getRechargeMobileData (api, action) {
  const { data } = action
  const response = yield call(api.getrechargeMobileData, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileDataActions.rechargeMobileDataSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileDataActions.rechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileDataActions.rechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileDataActions.rechargeMobileDataFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * getConfirmationRechargeMobileData (api, action) {
  const { data } = action
  const response = yield call(api.confirmationRechargeMobileData, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileDataActions.confirmationRechargeMobileDataSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileDataActions.confirmationRechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileDataActions.confirmationRechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileDataActions.confirmationRechargeMobileDataFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * getOrderRechargeMobileData (api, action) {
  const { data } = action
  const response = yield call(api.orderRechargeMobileData, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RechargeMobileDataActions.orderRechargeMobileDataSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(RechargeMobileDataActions.orderRechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(RechargeMobileDataActions.orderRechargeMobileDataFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(RechargeMobileDataActions.orderRechargeMobileDataFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}
