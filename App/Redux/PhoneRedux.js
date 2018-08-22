import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  confirmationPhoneRequest: ['data'],
  confirmationPhoneSuccess: ['payload'],
  confirmationPhoneFailure: ['payload'],

  orderPhoneRequest: ['data'],
  orderPhoneSuccess: ['payload'],
  orderPhoneFailure: ['payload']
})

export const PhoneTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  postConfirmationPhone: {data: null, fetching: false, payload: null, error: null},
  postOrderPhone: {data: null, fetching: false, payload: null, error: null}
})

/* ------------- Reducers ------------- */

// request the data from an api
export const postConfirmationPhoneRequest = (state, { data }) =>
  state.merge({ ...state, postConfirmationPhone: { ...state.postConfirmationPhone, fetching: true, data } })
export const postConfirmationPhoneSuccess = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPhone: { ...state.postConfirmationPhone, fetching: false, error: null, payload } })
export const postConfirmationPhoneFailure = (state, { payload }) =>
  state.merge({ ...state, postConfirmationPhone: { ...state.postConfirmationPhone, fetching: false, error: payload } })

export const postOrderPhoneRequest = (state, { data }) =>
  state.merge({ ...state, postOrderPhone: { ...state.postOrderPhone, fetching: true, data } })
export const postOrderPhoneSuccess = (state, { payload }) =>
  state.merge({ ...state, postOrderPhone: { ...state.postOrderPhone, fetching: false, error: null, payload } })
export const postOrderPhoneFailure = (state, { payload }) =>
  state.merge({ ...state, postOrderPhone: { ...state.postOrderPhone, fetching: false, error: payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFIRMATION_PHONE_REQUEST]: postConfirmationPhoneRequest,
  [Types.CONFIRMATION_PHONE_SUCCESS]: postConfirmationPhoneSuccess,
  [Types.CONFIRMATION_PHONE_FAILURE]: postConfirmationPhoneFailure,

  [Types.ORDER_PHONE_REQUEST]: postOrderPhoneRequest,
  [Types.ORDER_PHONE_SUCCESS]: postOrderPhoneSuccess,
  [Types.ORDER_PHONE_FAILURE]: postOrderPhoneFailure
})
