import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  providerGameRequest: ['data'],
  providerGameSuccess: ['payload'],
  providerGameFailure: ['payload'],

  serviceGameRequest: ['data'],
  serviceGameSuccess: ['payload'],
  serviceGameFailure: ['payload'],

  billGameRequest: ['data'],
  billGameSuccess: ['payload'],
  billGameFailure: ['payload'],

  topupGameRequest: ['data'],
  topupGameSuccess: ['payload'],
  topupGameFailure: ['payload']
})

export const providerGameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getProvider: { data: null, fetching: null, payload: null, error: null },
  getService: { data: null, fetching: null, payload: null, error: null },
  getBill: { data: null, fetching: null, payload: null, error: null },
  getTopUp: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getProviderRequest = (state, { data }) =>
  state.merge({...state, getProvider: { ...state.getProvider, fetching: true, data }})
export const getProviderSuccess = (state, { payload }) =>
  state.merge({...state, getProvider: { ...state.getProvider, fetching: false, error: null, payload }})
export const getProviderFailure = (state, { payload }) =>
  state.merge({...state, getProvider: { ...state.getProvider, fetching: false, error: true, payload }})

export const getServiceRequest = (state, { data }) =>
  state.merge({...state, getService: { ...state.getService, fetching: true, data }})
export const getServiceSuccess = (state, { payload }) =>
  state.merge({...state, getService: { ...state.getService, fetching: false, error: null, payload }})
export const getServiceFailure = (state, { payload }) =>
  state.merge({...state, getService: { ...state.getService, fetching: false, error: true, payload }})

export const getBillRequest = (state, { data }) =>
  state.merge({...state, getBill: { ...state.getBill, fetching: true, data }})
export const getBillSuccess = (state, { payload }) =>
  state.merge({...state, getBill: { ...state.getBill, fetching: false, error: null, payload }})
export const getBillFailure = (state, { payload }) =>
  state.merge({...state, getBill: { ...state.getBill, fetching: false, error: true, payload }})

export const getTopUpRequest = (state, { data }) =>
  state.merge({...state, getBill: { ...state.getTopUp, fetching: true, data }})
export const getTopUpSuccess = (state, { payload }) =>
  state.merge({...state, getBill: { ...state.getTopUp, fetching: false, error: null, payload }})
export const getTopUpFailure = (state, { payload }) =>
  state.merge({...state, getBill: { ...state.getTopUp, fetching: false, error: true, payload }})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROVIDER_GAME_REQUEST]: getProviderRequest,
  [Types.PROVIDER_GAME_SUCCESS]: getProviderSuccess,
  [Types.PROVIDER_GAME_FAILURE]: getProviderFailure,

  [Types.SERVICE_GAME_REQUEST]: getServiceRequest,
  [Types.SERVICE_GAME_SUCCESS]: getServiceSuccess,
  [Types.SERVICE_GAME_FAILURE]: getServiceFailure,

  [Types.BILL_GAME_REQUEST]: getBillRequest,
  [Types.BILL_GAME_SUCCESS]: getBillSuccess,
  [Types.BILL_GAME_FAILURE]: getBillFailure,

  [Types.TOPUP_GAME_REQUEST]: getTopUpRequest,
  [Types.TOPUP_GAME_SUCCESS]: getTopUpSuccess,
  [Types.TOPUP_GAME_FAILURE]: getTopUpFailure
})
