import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pdamRequest: ['data'],
  pdamSuccess: ['payload'],
  pdamFailure: ['payload'],

  confirmationPdamRequest: ['data'],
  confirmationPdamSuccess: ['payload'],
  confirmationPdamFailure: ['payload'],

  orderPdamRequest: ['data'],
  orderPdamSuccess: ['payload'],
  orderPdamFailure: ['payload']
})

export const PdamTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getPdam: { data: null, fetching: false, payload: null, error: null },
  postConfirmationPdam: { data: null, fetching: false, payload: null, error: null },
  postOrderPdam: { data: null, fetching: false, payload: null, error: null }
})

/* ------------- Reducers ------------- */

// request the data from an api
export const getPdamRequest = (state, { data }) =>
  state.merge({ ...state, getPdam: { ...state.getPdam, fetching: true, data } })
export const getPdamSuccess = (state, { payload }) =>
  state.merge({ ...state, getPdam: { ...state.getPdam, fetching: false, error: null, payload } })
export const getPdamFailure = (state, { payload }) =>
  state.merge({ ...state, getPdam: { ...state.getPdam, fetching: false, error: payload } })

export const postConfirmationPdamRequest = (state, { data }) =>
  state.merge({ ...state, postConfirmationPdam: { ...state.postConfirmationPdam, fetching: true, data } })
export const postConfirmationPdamSuccess = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPdam: { ...state.postConfirmationPdam, fetching: false, error: null, payload } })
export const postConfirmationPdamFailure = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPdam: { ...state.postConfirmationPdam, fetching: false, error: payload } })

export const postOrderPdamRequest = (state, { data }) =>
  state.merge({ ...state, postOrderPdam: { ...state.postOrderPdam, fetching: true, data } })
export const postOrderPdamSuccess = (state, { payload }) =>
  state.merge({ ...state, postOrderPdam: { ...state.postOrderPdam, fetching: false, error: null, payload } })
export const postOrderPdamFailure = (state, { payload }) =>
  state.merge({ ...state, postOrderPdam: { ...state.postOrderPdam, fetching: false, error: payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PDAM_REQUEST]: getPdamRequest,
  [Types.PDAM_SUCCESS]: getPdamSuccess,
  [Types.PDAM_FAILURE]: getPdamFailure,

  [Types.CONFIRMATION_PDAM_REQUEST]: postConfirmationPdamRequest,
  [Types.CONFIRMATION_PDAM_SUCCESS]: postConfirmationPdamSuccess,
  [Types.CONFIRMATION_PDAM_FAILURE]: postConfirmationPdamFailure,

  [Types.ORDER_PDAM_REQUEST]: postOrderPdamRequest,
  [Types.ORDER_PDAM_SUCCESS]: postOrderPdamSuccess,
  [Types.ORDER_PDAM_FAILURE]: postOrderPdamFailure
})
