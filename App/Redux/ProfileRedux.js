import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProfileRequest: ['token'],
  getProfileSuccess: ['payload'],
  getProfileFailure: ['payload'],

  updateProfileRequest: ['token', 'data'],
  updateProfileSuccess: ['payload'],
  updateProfileFailure: ['payload'],

  getBalanceRequest: ['token'],
  getBalanceSuccess: ['payload'],
  getBalanceFailyre: ['payload']
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getProfile: { data: null, fetching: null, payload: null, error: null },
  updateProfile: { data: null, fetching: null, payload: null, error: null },
  getBalance: { data: null, fetching: false, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getProfileRequest = (state, data) =>
  state.merge({ ...state, getProfile: { ...state.getProfile, fetching: true, data } })
export const getProfileSuccess = (state, { payload }) =>
  state.merge({ ...state, getProfile: { ...state.getProfile, fetching: false, error: null, payload } })
export const getProfileFailure = (state, { payload }) =>
  state.merge({ ...state, getProfile: { ...state.getProfile, fetching: false, error: true, payload } })

export const updateProfileRequest = (state, data) =>
  state.merge({ ...state, updateProfile: { ...state.updateProfile, fetching: true, data } })
export const updateProfileSuccess = (state, { payload }) =>
  state.merge({ ...state, updateProfile: { ...state.updateProfile, fetching: false, error: null, payload } })
export const updateProfileFailure = (state, { payload }) =>
  state.merge({ ...state, updateProfile: { ...state.updateProfile, fetching: false, error: true, payload } })

export const getBalanceRequest = (state, data) =>
  state.merge({ ...state, getBalance: { ...state.getBalance, fetching: true, data } })
export const getBalanceSuccess = (state, { payload }) =>
  state.merge({ ...state, getBalance: { ...state.getBalance, fetching: false, error: null, payload } })
export const getBalanceFailure = (state, { payload }) =>
  state.merge({ ...state, getBalance: { ...state.getBalance, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,

  [Types.GET_BALANCE_REQUEST]: getBalanceRequest,
  [Types.GET_BALANCE_SUCCESS]: getBalanceSuccess,
  [Types.GET_BALANCE_FAILURE]: getBalanceFailure
})
