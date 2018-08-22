import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  kiosonPayRequest: ['data'],
  kiosonPaySuccess: ['payload'],
  kiosonPayFailure: ['payload'],

  kiosonPayConfirmRequest: ['data'],
  kiosonPayConfirmSuccess: ['payload'],
  kiosonPayConfirmFailure: ['payload']
})

export const KiosonPayTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  kiosonPay: { data: null, fetching: null, payload: null, error: null },
  kiosonConfirm: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getPayRequest = (state, { data }) =>
  state.merge({...state, kiosonPay: { ...state.kiosonPay, fetching: true, data }})
export const getPaySuccess = (state, { payload }) =>
  state.merge({...state, kiosonPay: { ...state.kiosonPay, fetching: false, error: null, payload }})
export const getPayFailure = (state, { payload }) =>
  state.merge({...state, kiosonPay: { ...state.kiosonPay, fetching: false, error: true, payload }})

export const confirmRequest = (state, { data }) =>
  state.merge({...state, kiosonConfirm: { ...state.kiosonConfirm, fetching: true, data }})
export const confirmSuccess = (state, { payload }) =>
  state.merge({...state, kiosonConfirm: { ...state.kiosonConfirm, fetching: false, error: null, payload }})
export const confirmFailure = (state, { payload }) =>
  state.merge({...state, kiosonConfirm: { ...state.kiosonConfirm, fetching: false, error: true, payload }})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.KIOSON_PAY_REQUEST]: getPayRequest,
  [Types.KIOSON_PAY_SUCCESS]: getPaySuccess,
  [Types.KIOSON_PAY_FAILURE]: getPayFailure,

  [Types.KIOSON_CONFIRM_REQUEST]: confirmRequest,
  [Types.KIOSON_CONFIRM_SUCCESS]: confirmSuccess,
  [Types.KIOSON_CONFIRM_FAILURE]: confirmFailure
})
