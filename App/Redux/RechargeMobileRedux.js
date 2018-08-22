import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  changeConnectionStatus: ['status'],
  rechargeMobileRequest: ['data'],
  rechargeMobileSuccess: ['payload'],
  rechargeMobileFailure: ['payload'],

  confirmationRechargeMobileRequest: ['data'],
  confirmationRechargeMobileSuccess: ['payload'],
  confirmationRechargeMobileFailure: ['payload'],

  orderRechargeMobileRequest: ['data'],
  orderRechargeMobileSuccess: ['payload'],
  orderRechargeMobileFailure: ['payload']
})

export const RechargeMobileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getRechargeMobile: { data: null, fetching: false, payload: null, error: null },
  getConfirmationRechargeMobile: { data: null, fetching: false, payload: null, error: null },
  getOrderRechargeMobile: { data: null, fetching: false, payload: null, error: null },
  isConnected: false
})

/* ------------- Reducers ------------- */
export const changeConnectionStatusRequest = (state, { data }) =>
  state.merge({ ...state, isConnected: data.isConnected })

// request the data from an api
export const getRechargeMobileRequest = (state, { data }) =>
  state.merge({...state, getRechargeMobile: { ...state.getRechargeMobile, fetching: true, data }})
export const getRechargeMobileSuccess = (state, { payload }) =>
  state.merge({...state, getRechargeMobile: { ...state.getRechargeMobile, fetching: false, error: null, payload }})
export const getRechargeMobileFailure = (state, { payload }) =>
  state.merge({...state, getRechargeMobile: { ...state.getRechargeMobile, fetching: false, error: payload }})

export const getConfirmationRechargeMobileRequest = (state, { data }) =>
  state.merge({ ...state, getConfirmationRechargeMobile: { ...state.getConfirmationRechargeMobile, fetching: true, data } })
export const getConfirmationRechargeMobileSuccess = (state, { payload }) =>
  state.merge({ ...state, getConfirmationRechargeMobile: { ...state.getConfirmationRechargeMobile, fetching: false, error: null, payload } })
export const getConfirmationRechargeMobileFailure = (state, { payload }) =>
  state.merge({ ...state, getConfirmationRechargeMobile: { ...state.getConfirmationRechargeMobile, fetching: false, error: payload } })

export const getOrderRechargeMobileRequest = (state, { data }) =>
  state.merge({ ...state, getOrderRechargeMobile: { ...state.getOrderRechargeMobile, fetching: true, data } })
export const getOrderRechargeMobileSuccess = (state, { payload }) =>
  state.merge({ ...state, getOrderRechargeMobile: { ...state.getOrderRechargeMobile, fetching: false, error: null, payload } })
export const getOrderRechargeMobileFailure = (state, { payload }) =>
  state.merge({ ...state, getOrderRechargeMobile: { ...state.getOrderRechargeMobile, fetching: false, error: payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.CHANGE_CONNECTION_STATUS]: getRechargeMobileRequest,

  [Types.RECHARGE_MOBILE_REQUEST]: getRechargeMobileRequest,
  [Types.RECHARGE_MOBILE_SUCCESS]: getRechargeMobileSuccess,
  [Types.RECHARGE_MOBILE_FAILURE]: getRechargeMobileFailure,

  [Types.CONFIRMATION_RECHARGE_MOBILE_REQUEST]: getConfirmationRechargeMobileRequest,
  [Types.CONFIRMATION_RECHARGE_MOBILE_SUCCESS]: getConfirmationRechargeMobileSuccess,
  [Types.CONFIRMATION_RECHARGE_MOBILE_FAILURE]: getConfirmationRechargeMobileFailure,

  [Types.ORDER_RECHARGE_MOBILE_REQUEST]: getOrderRechargeMobileRequest,
  [Types.ORDER_RECHARGE_MOBILE_SUCCESS]: getOrderRechargeMobileSuccess,
  [Types.ORDER_RECHARGE_MOBILE_FAILURE]: getOrderRechargeMobileFailure
})
