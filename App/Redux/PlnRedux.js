import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  plnPrePaidRequest: ['token', 'id'],
  plnPrePaidSuccess: ['payload'],
  plnPrePaidFailure: ['payload'],

  orderPrePaidRequest: ['token', 'data'],
  orderPrePaidSuccess: ['payload'],
  orderPrePaidFailure: ['payload'],

  confirmPrePaidRequest: ['token', 'data'],
  confirmPrePaidSuccess: ['payload'],
  confirmPrePaidFailure: ['payload'],

  orderPostPaidRequest: ['token', 'data'],
  orderPostPaidSuccess: ['payload'],
  orderPostPaidFailure: ['payload'],

  confirmPostPaidRequest: ['token', 'data'],
  confirmPostPaidSuccess: ['payload'],
  confirmPostPaidFailure: ['payload']
})

export const PlnTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  plnPrePaid: { data: null, fetching: null, payload: null, error: null },
  orderPrePaid: { data: null, fetching: null, payload: null, error: null },
  confirmPrePaid: { data: null, fetching: null, payload: null, error: null },
  orderPostPaid: { data: null, fetching: null, payload: null, error: null },
  confirmPostPaid: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const plnPrePaidRequest = (state, data) =>
  state.merge({ ...state, plnPrePaid: { ...state.plnPrePaid, fetching: true, data } })
export const plnPrePaidSuccess = (state, { payload }) =>
  state.merge({ ...state, plnPrePaid: { ...state.plnPrePaid, fetching: false, error: null, payload } })
export const plnPrePaidFailure = (state, { payload }) =>
  state.merge({ ...state, plnPrePaid: { ...state.plnPrePaid, fetching: false, error: true, payload } })

export const orderPrePaidRequest = (state, data) =>
  state.merge({ ...state, orderPrePaid: { ...state.orderPrePaid, fetching: true, data } })
export const orderPrePaidSuccess = (state, { payload }) =>
  state.merge({ ...state, orderPrePaid: { ...state.orderPrePaid, fetching: false, error: null, payload } })
export const orderPrePaidFailure = (state, { payload }) =>
  state.merge({ ...state, orderPrePaid: { ...state.orderPrePaid, fetching: true, error: true, payload } })

export const confirmPrePaidRequest = (state, data) =>
  state.merge({ ...state, confirmPrePaid: { ...state.confirmPrePaid, fetching: true, data } })
export const confirmPrePaidSuccess = (state, { payload }) =>
  state.merge({ ...state, confirmPrePaid: { ...state.confirmPrePaid, fetching: false, error: null, payload } })
export const confirmPrePaidFailure = (state, { payload }) =>
  state.merge({ ...state, confirmPrePaid: { ...state.confirmPrePaid, fetching: false, error: true, payload } })

export const orderPostPaidRequest = (state, data) =>
  state.merge({ ...state, orderPostPaid: { ...state.orderPostPaid, fetching: true, data } })
export const orderPostPaidSuccess = (state, { payload }) =>
  state.merge({ ...state, orderPostPaid: { ...state.orderPostPaid, fetching: false, error: null, payload } })
export const orderPostPaidFailure = (state, { payload }) =>
  state.merge({ ...state, orderPostPaid: { ...state.orderPostPaid, fetching: false, error: true, payload } })

export const confirmPostPaidRequest = (state, data) =>
  state.merge({ ...state, confirmPostPaid: { ...state.confirmPostPaid, fetching: true, data } })
export const confirmPostPaidSuccess = (state, { payload }) =>
  state.merge({ ...state, confirmPostPaid: { ...state.confirmPostPaid, fetching: false, error: null, payload } })
export const confirmPostPaidFailure = (state, { payload }) =>
  state.merge({ ...state, confirmPostPaid: { ...state.confirmPostPaid, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PLN_PRE_PAID_REQUEST]: plnPrePaidRequest,
  [Types.PLN_PRE_PAID_SUCCESS]: plnPrePaidSuccess,
  [Types.PLN_PRE_PAID_FAILURE]: plnPrePaidFailure,

  [Types.ORDER_PRE_PAID_REQUEST]: orderPrePaidRequest,
  [Types.ORDER_PRE_PAID_SUCCESS]: orderPrePaidSuccess,
  [Types.ORDER_PRE_PAID_FAILURE]: orderPrePaidFailure,

  [Types.CONFIRM_PRE_PAID_REQUEST]: confirmPrePaidRequest,
  [Types.CONFIRM_PRE_PAID_SUCCESS]: confirmPrePaidSuccess,
  [Types.CONFIRM_PRE_PAID_FAILURE]: confirmPrePaidFailure,

  [Types.ORDER_POST_PAID_REQUEST]: orderPostPaidRequest,
  [Types.ORDER_POST_PAID_SUCCESS]: orderPostPaidSuccess,
  [Types.ORDER_POST_PAID_FAILURE]: orderPostPaidFailure,

  [Types.CONFIRM_POST_PAID_REQUEST]: confirmPostPaidRequest,
  [Types.CONFIRM_POST_PAID_SUCCESS]: confirmPostPaidSuccess,
  [Types.CONFIRM_POST_PAID_FAILURE]: confirmPostPaidFailure
})
