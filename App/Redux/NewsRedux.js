import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getNewsInfoRequest: ['token'],
  getNewsInfoSuccess: ['payload'],
  getNewsInfoFailure: ['payload'],

  getNewsPromoRequest: ['token'],
  getNewsPromoSuccess: ['payload'],
  getNewsPromoFailure: ['payload']
})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  newsInfo: { data: null, fetching: null, payload: null, error: null },
  newsPromo: { data: null, fetching: null, payload: null, error: null }
})

/* ------------- Reducers ------------- */

export const getNewsInfoRequest = (state, data) =>
  state.merge({ ...state, newsInfo: { ...state.newsInfo, fetching: true, data } })
export const getNewsInfoSuccess = (state, { payload }) =>
  state.merge({ ...state, newsInfo: { ...state.newsInfo, fetching: false, error: null, payload } })
export const getNewsInfoFailure = (state, { payload }) =>
  state.merge({ ...state, newsInfo: { ...state.newsInfo, fetching: false, error: true, payload } })

export const getNewsPromoRequest = (state, data) =>
  state.merge({ ...state, newsPromo: { ...state.newsPromo, fetching: true, data } })
export const getNewsPromoSuccess = (state, { payload }) =>
  state.merge({ ...state, newsPromo: { ...state.newsPromo, fetching: false, error: null, payload } })
export const getNewsPromoFailure = (state, { payload }) =>
  state.merge({ ...state, newsPromo: { ...state.newsPromo, fetching: false, error: true, payload } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NEWS_INFO_REQUEST]: getNewsInfoRequest,
  [Types.GET_NEWS_INFO_SUCCESS]: getNewsInfoSuccess,
  [Types.GET_NEWS_INFO_FAILURE]: getNewsInfoFailure,

  [Types.GET_NEWS_PROMO_REQUEST]: getNewsPromoRequest,
  [Types.GET_NEWS_PROMO_SUCCESS]: getNewsPromoSuccess,
  [Types.GET_NEWS_PROMO_FAILURE]: getNewsPromoFailure
})
