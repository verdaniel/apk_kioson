import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getStateRequest: [],
  getStateSuccess: ['payload'],
  getStateFailure: ['payload'],

  getDistrictRequest: ['id'],
  getDistrictSuccess: ['payload'],
  getDistrictFailure: ['payload'],

  getCityRequest: ['id'],
  getCitySuccess: ['payload'],
  getCityFailure: ['payload'],

  getVillageRequest: ['id'],
  getVillageSuccess: ['payload'],
  getVillageFailure: ['payload']
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  states: { data: null, fetching: false, payload: null, error: null },
  district: { data: null, fetching: false, payload: null, error: null },
  city: { data: null, fetching: false, payload: null, error: null },
  village: { data: null, fetching: false, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getStateRequest = (state, data) =>
  state.merge({ ...state, states: { ...state.states, fetching: true, data, payload: null } })
export const getStateSuccess = (state, { payload }) =>
  state.merge({ ...state, states: { ...state.states, fetching: false, error: null, payload } })
export const getStateFailure = (state, { payload }) =>
  state.merge({ ...state, states: { ...state.states, fetching: false, error: true, payload } })

export const getDistrictRequest = (state, data) =>
  state.merge({ ...state, district: { ...state.district, fetching: true, data, payload: null } })
export const getDistrictSuccess = (state, { payload }) =>
  state.merge({ ...state, district: { ...state.district, fetching: false, error: null, payload } })
export const getDistrictFailure = (state, { payload }) =>
  state.merge({ ...state, district: { ...state.district, fetching: false, error: true, payload } })

export const getCityRequest = (state, data) =>
  state.merge({ ...state, city: { ...state.city, fetching: true, data, payload: null } })
export const getCitySuccess = (state, { payload }) =>
  state.merge({ ...state, city: { ...state.city, fetching: false, error: null, payload } })
export const getCityFailure = (state, { payload }) =>
  state.merge({ ...state, city: { ...state.city, fetching: false, error: true, payload } })

export const getVillageRequest = (state, data) =>
  state.merge({ ...state, village: { ...state.village, fetching: true, data, payload: null } })
export const getVillageSuccess = (state, { payload }) =>
  state.merge({ ...state, village: { ...state.village, fetching: false, error: null, payload } })
export const getVillageFailure = (state, { payload }) =>
  state.merge({ ...state, village: { ...state.village, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATE_REQUEST]: getStateRequest,
  [Types.GET_STATE_SUCCESS]: getStateSuccess,
  [Types.GET_STATE_FAILURE]: getStateFailure,

  [Types.GET_DISTRICT_REQUEST]: getDistrictRequest,
  [Types.GET_DISTRICT_SUCCESS]: getDistrictSuccess,
  [Types.GET_DISTRICT_FAILURE]: getDistrictFailure,

  [Types.GET_CITY_REQUEST]: getCityRequest,
  [Types.GET_CITY_SUCCESS]: getCitySuccess,
  [Types.GET_CITY_FAILURE]: getCityFailure,

  [Types.GET_VILLAGE_REQUEST]: getVillageRequest,
  [Types.GET_VILLAGE_SUCCESS]: getVillageSuccess,
  [Types.GET_VILLAGE_FAILURE]: getVillageFailure
})
