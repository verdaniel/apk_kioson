import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  connectedDevice: ['device'],
  disconnectDevice: null
})

export const BluetoothTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null
})

/* ------------- Reducers ------------- */

export const connectedDevice = (state, { device }) =>
  state.merge({ payload: device })
export const disconnectDevice = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECTED_DEVICE]: connectedDevice,
  [Types.DISCONNECT_DEVICE]: disconnectDevice
})
