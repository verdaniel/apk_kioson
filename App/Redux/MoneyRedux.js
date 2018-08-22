import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bankPresetRequest: ['data'],
  bankPresetSuccess: ['payload'],
  bankPresetFailure: ['payload'],

  confirmationMoneyRequest: ['data'],
  confirmationMoneySuccess: ['payload'],
  confirmationMoneyFailure: ['payload'],

  orderMoneyRequest: ['data'],
  orderMoneySuccess: ['payload'],
  orderMoneyFailure: ['payload']
})

export const MoneyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  bankPreset: {data: null, fetching: false, payload: null, error: null},
  confirmationMoneys: {data: null, fetching: false, payload: null, error: null},
  orderMoneys: {data: null, fetching: false, payload: null, error: null}
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getBankPresetRequest = (state, { data }) =>
  state.merge({ ...state, bankPreset: { ...state.bankPreset, fetching: true, data } })
export const getBankPresetSuccess = (state, { payload }) =>
  state.merge({ ...state, bankPreset: { ...state.bankPreset, fetching: false, error: null, payload } })
export const getBankPresetFailure = (state, { payload }) =>
  state.merge({ ...state, bankPreset: { ...state.bankPreset, fetching: false, error: true, payload } })

export const postConfirmationMoneyRequest = (state, { data }) =>
  state.merge({ ...state, confirmationMoneys: { ...state.confirmationMoneys, fetching: true, data } })
export const postConfirmationMoneySuccess = (state, { payload }) =>
  state.merge({ ...state, confirmationMoneys: { ...state.confirmationMoneys, fetching: false, error: null, payload } })
export const postConfirmationMoneyFailure = (state, { payload }) =>
  state.merge({ ...state, confirmationMoneys: { ...state.confirmationMoneys, fetching: false, error: true, payload } })

export const postOrderMoneyRequest = (state, { data }) =>
  state.merge({ ...state, orderMoneys: { ...state.orderMoneys, fetching: true, data } })
export const postOrderMoneySuccess = (state, { payload }) =>
  state.merge({ ...state, orderMoneys: { ...state.orderMoneys, fetching: false, error: null, payload } })
export const postOrderMoneyFailure = (state, { payload }) =>
  state.merge({ ...state, orderMoneys: { ...state.orderMoneys, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANK_PRESET_REQUEST]: getBankPresetRequest,
  [Types.BANK_PRESET_SUCCESS]: getBankPresetSuccess,
  [Types.BANK_PRESET_FAILURE]: getBankPresetFailure,

  [Types.CONFIRMATION_MONEY_REQUEST]: postConfirmationMoneyRequest,
  [Types.CONFIRMATION_MONEY_SUCCESS]: postConfirmationMoneySuccess,
  [Types.CONFIRMATION_MONEY_FAILURE]: postConfirmationMoneyFailure,

  [Types.ORDER_MONEY_REQUEST]: postOrderMoneyRequest,
  [Types.ORDER_MONEY_SUCCESS]: postOrderMoneySuccess,
  [Types.ORDER_MONEY_FAILURE]: postOrderMoneyFailure
})
