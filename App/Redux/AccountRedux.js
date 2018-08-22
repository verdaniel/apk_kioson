import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  logoutRequest: [],
  logoutSuccess: ['payload'],
  logoutFailure: ['payload']
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  logout: {data: null, fetching: null, payload: null, error: null}
})

/* ------------- Reducers ------------- */

// request the data from an api
export const logoutRequest = (state, { data }) =>
  state.merge({ ...state, logout: { ...state.logout, fetching: true, data } })
export const logoutSuccess = (state, { payload }) =>
  state.merge({ ...state, logout: { ...state.logout, fetching: false, error: null, payload } })
export const logoutFailure = (state, { payload }) =>
  state.merge({ ...state, logout: { ...state.logout, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure
})
