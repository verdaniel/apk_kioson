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
import PostpaidActions from '../Redux/PostpaidRedux'
import { ToastAndroid } from 'react-native'

export function * getPostpaid (api, action) {
  const { data } = action
  const response = yield call(api.getPostpaid, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostpaidActions.postpaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PostpaidActions.postpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PostpaidActions.postpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PostpaidActions.postpaidFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * postConfirmationPostpaid (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.confirmationPostpaid, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostpaidActions.confirmationPostpaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PostpaidActions.confirmationPostpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PostpaidActions.confirmationPostpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PostpaidActions.confirmationPostpaidFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}

export function * postOrderPostpaid (api, action) {
  const { data } = action
  // make the call to the api
  const response = yield call(api.orderPostpaid, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PostpaidActions.orderPostpaidSuccess(response.data))
  } else {
    if (response.status !== null) {
      if (response.status < 500) {
        const data = { code: response.status, message: response.data.message }
        yield put(PostpaidActions.orderPostpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      } else {
        const data = { code: response.status, message: response.problem }
        yield put(PostpaidActions.orderPostpaidFailure(data))
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
      }
    } else {
      const data = { code: 600, message: response.problem }
      yield put(PostpaidActions.orderPostpaidFailure(data))
      ToastAndroid.show(data.message, ToastAndroid.SHORT)
    }
  }
}
