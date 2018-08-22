import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getWorkTypeRequest: ['token'],
  getWorkTypeSuccess: ['payload'],
  getWorkTypeFailure: ['payload'],

  getStoreTypeRequest: ['token'],
  getStoreTypeSuccess: ['payload'],
  getStoreTypeFailure: ['payload']
})

export const PresetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  workType: { data: null, fetching: null, payload: null, error: null },
  storeType: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getWorkTypeRequest = (state, data) =>
  state.merge({ ...state, workType: { ...state.workType, fetching: true, data } })
export const getWorkTypeSuccess = (state, { payload }) =>
  state.merge({ ...state, workType: { ...state.workType, fetching: false, error: null, payload } })
export const getWorkTypeFailure = (state, { payload }) =>
  state.merge({ ...state, workType: { ...state.workType, fetching: false, error: true, payload } })

export const getStoreTypeRequest = (state, data) =>
  state.merge({ ...state, storeType: { ...state.storeType, fetching: true, data } })
export const getStoreTypeSuccess = (state, { payload }) =>
  state.merge({ ...state, storeType: { ...state.storeType, fetching: false, error: null, payload } })
export const getStoreTypeFailure = (state, { payload }) =>
  state.merge({ ...state, storeType: { ...state.storeType, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_WORK_TYPE_REQUEST]: getWorkTypeRequest,
  [Types.GET_WORK_TYPE_SUCCESS]: getWorkTypeSuccess,
  [Types.GET_WORK_TYPE_FAILURE]: getWorkTypeFailure,

  [Types.GET_STORE_TYPE_REQUEST]: getStoreTypeRequest,
  [Types.GET_STORE_TYPE_SUCCESS]: getStoreTypeSuccess,
  [Types.GET_STORE_TYPE_FAILURE]: getStoreTypeFailure
})
