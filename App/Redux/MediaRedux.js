import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  presetTvRequest: ['data'],
  presetTvSuccess: ['payload'],
  presetTvFailure: ['payload']
})

export const MediaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  presetTv: { data: null, fetching: null, payload: null, error: null }

})

/* ------------- Reducers ------------- */

// request the data from an api
export const getPresetTvRequest = (state, { data }) =>
  state.merge({...state, presetTv: { ...state.presetTv, fetching: true, data }})

// successful api lookup
export const getPresetTvSuccess = (state, { payload }) =>
  state.merge({...state, presetTv: { ...state.presetTv, fetching: false, error: null, payload }})

// Something went wrong somewhere.
export const getPresetTvFailure = (state, { payload }) =>
  state.merge({...state, presetTv: { ...state.presetTv, fetching: false, error: true, payload }})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRESET_TV_REQUEST]: getPresetTvRequest,
  [Types.PRESET_TV_SUCCESS]: getPresetTvSuccess,
  [Types.PRESET_TV_FAILURE]: getPresetTvFailure
})
