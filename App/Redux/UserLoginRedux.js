import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  isLogin: ['login'],
  isKyc: ['kyc']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  login: false,
  kyc: false
})

/* ------------- Reducers ------------- */

// request the data from an api
export const isLogin = (state, { login }) =>
  state.merge({ login })

export const isKyc = (state, { kyc }) =>
  state.merge({ kyc })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IS_LOGIN]: isLogin,
  [Types.IS_KYC]: isKyc
})
