import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bannerRequest: ['data'],
  bannerSuccess: ['payload'],
  bannerFailure: null
})

export const BannerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const BannerSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, data) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload })

// Something went wrong somewhere.
export const failure = (state, { payload }) =>
  state.merge({ fetching: false, error: true, payload })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANNER_REQUEST]: request,
  [Types.BANNER_SUCCESS]: success,
  [Types.BANNER_FAILURE]: failure
})
