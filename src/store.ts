import { compose, createStore } from '@reduxjs/toolkit';
import { install, combineReducers } from 'redux-loop';
import authReducer, { authState } from './modules/Auth/store'

export const rootReducer = combineReducers({
  authReducer
}) as any;

const enhancer = compose(
  install()
);

export type State = {
  authReducer: typeof authState
}

const initialState = {
  authReducer: authState
}

export default () =>
  createStore(rootReducer, initialState, enhancer);
