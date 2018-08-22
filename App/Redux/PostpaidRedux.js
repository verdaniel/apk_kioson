import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postpaidRequest: ['data'],
  postpaidSuccess: ['payload'],
  postpaidFailure: ['payload'],

  confirmationPostpaidRequest: ['data'],
  confirmationPostpaidSuccess: ['payload'],
  confirmationPostpaidFailure: ['payload'],

  orderPostpaidRequest: ['data'],
  orderPostpaidSuccess: ['payload'],
  orderPostpaidFailure: ['payload']
})

export const PostpaidTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getPostpaid: {data: null, fetching: false, payload: null, error: null},
  postConfirmationPostpaid: {data: null, fetching: false, payload: null, error: null},
  postOrderPostpaid: {data: null, fetching: false, payload: null, error: null}
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getPostpaidRequest = (state, { data }) =>
  state.merge({ ...state, getPostpaid: { ...state.getPostpaid, fetching: true, data } })
export const getPostpaidSuccess = (state, { payload }) =>
  state.merge({ ...state, getPostpaid: { ...state.getPostpaid, fetching: false, error: null, payload } })
export const getPostpaidFailure = (state, { payload }) =>
  state.merge({ ...state, getPostpaid: { ...state.getPostpaid, fetching: false, error: payload } })

export const postConfirmationPostpaidRequest = (state, { data }) =>
  state.merge({ ...state, postConfirmationPostpaid: { ...state.postConfirmationPostpaid, fetching: true, data } })
export const postConfirmationPostpaidSuccess = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPostpaid: { ...state.postConfirmationPostpaid, fetching: false, error: null, payload } })
export const postConfirmationPostpaidFailure = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPostpaid: { ...state.postConfirmationPostpaid, fetching: false, error: payload } })

export const postOrderPostpaidRequest = (state, { data }) =>
  state.merge({ ...state, postOrderPostpaid: { ...state.postOrderPostpaid, fetching: true, data } })
export const postOrderPostpaidSuccess = (state, { payload }) =>
  state.merge({ ...state, postOrderPostpaid: { ...state.postOrderPostpaid, fetching: false, error: null, payload } })
export const postOrderPostpaidFailure = (state, { payload }) =>
  state.merge({ ...state, postOrderPostpaid: { ...state.postOrderPostpaid, fetching: false, error: payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POSTPAID_REQUEST]: getPostpaidRequest,
  [Types.POSTPAID_SUCCESS]: getPostpaidSuccess,
  [Types.POSTPAID_FAILURE]: getPostpaidFailure,

  [Types.CONFIRMATION_POSTPAID_REQUEST]: postConfirmationPostpaidRequest,
  [Types.CONFIRMATION_POSTPAID_SUCCESS]: postConfirmationPostpaidSuccess,
  [Types.CONFIRMATION_POSTPAID_FAILURE]: postConfirmationPostpaidFailure,

  [Types.ORDER_POSTPAID_REQUEST]: postOrderPostpaidRequest,
  [Types.ORDER_POSTPAID_SUCCESS]: postOrderPostpaidSuccess,
  [Types.ORDER_POSTPAID_FAILURE]: postOrderPostpaidFailure
})
