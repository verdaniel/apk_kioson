import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chipRequest: ['data'],
  chipSuccess: ['payload'],
  chipFailure: ['payload'],

  confirmationChipRequest: ['data'],
  confirmationChipSuccess: ['payload'],
  confirmationChipFailure: ['payload'],

  orderChipRequest: ['data'],
  orderChipSuccess: ['payload'],
  orderChipFailure: ['payload']
})

export const ChipTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  getChip: { data: null, fetching: null, payload: null, error: null },
  postConfirmationChip: { data: null, fetching: null, payload: null, error: null },
  postOrderChip: { data: null, fetching: null, payload: null, error: null }

})

/* ------------- Reducers ------------- */

export const getChipRequest = (state, { data }) =>
  state.merge({ ...state, getChip: { ...state.getChip, fetching: true, data } })
export const getChipSuccess = (state, { payload }) =>
  state.merge({ ...state, getChip: { ...state.getChip, fetching: false, error: null, payload } })
export const getChipFailure = (state, { payload }) =>
  state.merge({ ...state, getChip: { ...state.getChip, fetching: false, error: true, payload } })

export const postConfirmationChipRequest = (state, { data }) =>
  state.merge({ ...state, postConfirmationChip: { ...state.postConfirmationChip, fetching: true, data } })
export const postConfirmationChipSuccess = (state, { payload }) =>
  state.merge({ ...state, postConfirmationChip: { ...state.postConfirmationChip, fetching: false, error: null, payload } })
export const postConfirmationChipFailure = (state, { payload }) =>
  state.merge({ ...state, postConfirmationChip: { ...state.postConfirmationChip, fetching: false, error: true, payload } })

export const postOrderChipRequest = (state, { data }) =>
  state.merge({ ...state, postOrderChip: { ...state.postOrderChip, fetching: true, data } })
export const postOrderChipSuccess = (state, { payload }) =>
  state.merge({ ...state, postOrderChip: { ...state.postOrderChip, fetching: false, error: null, payload } })
export const postOrderChipFailure = (state, { payload }) =>
  state.merge({ ...state, postOrderChip: { ...state.postOrderChip, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHIP_REQUEST]: getChipRequest,
  [Types.CHIP_SUCCESS]: getChipSuccess,
  [Types.CHIP_FAILURE]: getChipFailure,

  [Types.CONFIRMATION_CHIP_REQUEST]: postConfirmationChipRequest,
  [Types.CONFIRMATION_CHIP_SUCCESS]: postConfirmationChipSuccess,
  [Types.CONFIRMATION_CHIP_FAILURE]: postConfirmationChipFailure,

  [Types.ORDER_CHIP_REQUEST]: postOrderChipRequest,
  [Types.ORDER_CHIP_SUCCESS]: postOrderChipSuccess,
  [Types.ORDER_CHIP_FAILURE]: postOrderChipFailure
})
