import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rechargeMobileDataRequest: ['data'],
  rechargeMobileDataSuccess: ['payload'],
  rechargeMobileDataFailure: ['payload'],

  confirmationRechargeMobileDataRequest: ['data'],
  confirmationRechargeMobileDataSuccess: ['payload'],
  confirmationRechargeMobileDataFailure: ['payload'],

  orderRechargeMobileDataRequest: ['data'],
  orderRechargeMobileDataSuccess: ['payload'],
  orderRechargeMobileDataFailure: ['payload']
})

export const RechargeMobileDataTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getRechargeMobileData: { data: null, fetching: false, payload: null, error: null },
  getConfirmationRechargeDataMobile: { data: null, fetching: false, payload: null, error: null },
  getOrderRechargeDataMobile: { data: null, fetching: false, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getRechargeMobileDataRequest = (state, { data }) =>
  state.merge({ ...state, getRechargeMobileData: { ...state.getRechargeMobileData, fetching: true, data } })
export const getRechargeMobileDataSuccess = (state, { payload }) =>
  state.merge({ ...state, getRechargeMobileData: { ...state.getRechargeMobileData, fetching: false, error: null, payload } })
export const getRechargeMobileDataFailure = (state, { payload }) =>
  state.merge({ ...state, getRechargeMobileData: { ...state.getRechargeMobileData, fetching: false, error: payload } })

export const getConfirmationRechargeMobileDataRequest = (state, { data }) =>
  state.merge({ ...state, getConfirmationRechargeDataMobile: { ...state.getConfirmationRechargeDataMobile, fetching: true, data } })
export const getConfirmationRechargeMobileDataSuccess = (state, { payload }) =>
  state.merge({ ...state, getConfirmationRechargeDataMobile: { ...state.getConfirmationRechargeDataMobile, fetching: false, error: null, payload } })
export const getConfirmationRechargeMobileDataFailure = (state, { payload }) =>
  state.merge({ ...state, getConfirmationRechargeDataMobile: { ...state.getConfirmationRechargeDataMobile, fetching: false, error: payload } })

export const getOrderRechargeMobileDataRequest = (state, { data }) =>
  state.merge({ ...state, getOrderRechargeDataMobile: { ...state.getOrderRechargeDataMobile, fetching: true, data } })
export const getOrderRechargeMobileDataSuccess = (state, { payload }) =>
  state.merge({ ...state, getOrderRechargeDataMobile: { ...state.getOrderRechargeDataMobile, fetching: false, error: null, payload } })
export const getOrderRechargeMobileDataFailure = (state, { payload }) =>
  state.merge({ ...state, getOrderRechargeDataMobile: { ...state.getOrderRechargeDataMobile, fetching: false, error: payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RECHARGE_MOBILE_DATA_REQUEST]: getRechargeMobileDataRequest,
  [Types.RECHARGE_MOBILE_DATA_SUCCESS]: getRechargeMobileDataSuccess,
  [Types.RECHARGE_MOBILE_DATA_FAILURE]: getRechargeMobileDataFailure,

  [Types.CONFIRMATION_RECHARGE_MOBILE_DATA_REQUEST]: getConfirmationRechargeMobileDataRequest,
  [Types.CONFIRMATION_RECHARGE_MOBILE_DATA_SUCCESS]: getConfirmationRechargeMobileDataSuccess,
  [Types.CONFIRMATION_RECHARGE_MOBILE_DATA_FAILURE]: getConfirmationRechargeMobileDataFailure,

  [Types.ORDER_RECHARGE_MOBILE_DATA_REQUEST]: getOrderRechargeMobileDataRequest,
  [Types.ORDER_RECHARGE_MOBILE_DATA_SUCCESS]: getOrderRechargeMobileDataSuccess,
  [Types.ORDER_RECHARGE_MOBILE_DATA_FAILURE]: getOrderRechargeMobileDataFailure
})
