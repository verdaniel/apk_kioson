import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTransactionRequest: ['token', 'page', 'limit', 'start', 'end'],
  getTransactionSuccess: ['payload'],
  getTransactionFailure: ['payload']
})

export const HistoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transaction: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getTransactionRequest = (state, data) =>
  state.merge({ ...state, transaction: { ...state.transaction, fetching: true, data } })
export const getTransactionSuccess = (state, { payload }) =>
  state.merge({ ...state, transaction: { ...state.transaction, fetching: false, error: null, payload } })
export const getTransactionFailure = (state, { payload }) =>
  state.merge({ ...state, transaction: { ...state.transaction, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TRANSACTION_REQUEST]: getTransactionRequest,
  [Types.GET_TRANSACTION_SUCCESS]: getTransactionSuccess,
  [Types.GET_TRANSACTION_FAILURE]: getTransactionFailure
})
